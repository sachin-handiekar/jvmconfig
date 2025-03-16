import React, {Component} from "react";
import {Consumer} from "../context";

class Summary extends Component {
    state = {
        download: false,
        value: ""
    };

    copyToClipboard = str => {
        const el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    };

    handleSaveToPC = jsonData => {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "jvm-config.txt";
        document.body.appendChild(link);
        link.href = url;
        link.click();
        setTimeout(function () {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    componentDidUpdate() {
        if (this.state.download) {
            this.handleSaveToPC(this.state.value);
            this.setState({download: false});
        }
    }

    getVersionSpecificFlags = (JDKVersion, configuration, flags) => {
        // Extract the base version number for comparison
        const baseVersion = parseInt(JDKVersion.split(/[\s/]/)[0]);
        
        // Memory management flags changed significantly across versions
        if (baseVersion <= 7) {
            return {
                usePermSize: true,
                useMetaspace: false,
                useG1AsDefault: false,
                useNewLogging: false,
                deprecatedFlags: [],
                flags: flags
            };
        } else if (baseVersion === 8) {
            return {
                usePermSize: false,
                useMetaspace: true,
                useG1AsDefault: false,
                useNewLogging: false,
                deprecatedFlags: ["UseStringCache", "UseCompressedStrings"],
                flags: flags
            };
        } else {
            // For JDK 9+, use new unified logging system
            const newFlags = {...flags};
            if (baseVersion >= 9) {
                // Convert old logging flags to new unified logging format
                if (flags.printGCDetails) newFlags.printGCDetails = "-Xlog:gc*";
                if (flags.enableGCLogRotation) newFlags.enableGCLogRotation = "-Xlog:gc*:file=gc_%t.log::filecount=5,filesize=100M";
                if (flags.verboseJNI) newFlags.verboseJNI = "-Xlog:jni+resolve=debug";
                if (flags.verboseGC) newFlags.verboseGC = "-Xlog:gc";
                if (flags.verboseClass) newFlags.verboseClass = "-Xlog:class+load=info";
                if (flags.printGCApplicationConcurrentTime || flags.printGCApplicationStoppedTime) {
                    newFlags.printGCApplicationConcurrentTime = "-Xlog:safepoint";
                    newFlags.printGCApplicationStoppedTime = "-Xlog:safepoint";
                }
            }

            return {
                usePermSize: false,
                useMetaspace: true,
                useG1AsDefault: true,
                useNewLogging: true,
                deprecatedFlags: [
                    "UseStringCache",
                    "UseCompressedStrings",
                    ...(baseVersion >= 11 ? ["AggressiveOpts"] : []),
                    ...(baseVersion >= 14 ? ["UseConcMarkSweepGC"] : [])
                ],
                flags: newFlags
            };
        }
    };

    getGCOptions = (mainState, data, baseVersion) => {
        let {garbageCollector} = mainState;
        const gcConfig = data.garbageCollector;

        // Set G1 as default for JDK 9+
        if (!garbageCollector && baseVersion >= 9) {
            garbageCollector = "g1";
        }

        // Find the selected GC configuration
        const selectedGC = gcConfig.children.find(gc => gc.id === garbageCollector);
        
        if (!selectedGC) return { gcFlag: "", options: [] };

        // Check version compatibility
        if (selectedGC.minVersion && baseVersion < selectedGC.minVersion) {
            return { gcFlag: "", options: [] };
        }
        if (selectedGC.maxVersion && baseVersion > selectedGC.maxVersion) {
            return { gcFlag: "", options: [] };
        }

        // Get GC-specific options
        let options = [];
        if (selectedGC.options) {
            options = selectedGC.options
                .filter(opt => {
                    if (opt.minVersion && baseVersion < opt.minVersion) return false;
                    if (opt.maxVersion && baseVersion > opt.maxVersion) return false;
                    return true;
                })
                .map(opt => mainState[opt.id])
                .filter(Boolean);
        }

        return {
            gcFlag: data.configuration[garbageCollector] || "",
            options
        };
    };

    render() {
        const {configuration} = this.props.data;

        return (
            <Consumer>
                {mainState => {
                    let {
                        JDKVersion,
                        minHeapSize,
                        maxHeapSize,
                        heapSizeSelect,
                        defaultPermSize,
                        maxPermSize,
                        permSizeSelect,
                        defaultMetaSpace,
                        maxMetaSpace,
                        metaSpaceSelect,
                        printGCDetails,
                        enableGCLogRotation,
                        heapDumpOnOOMemory,
                        enableErrorFile,
                        verboseJNI,
                        verboseGC,
                        verboseClass,
                        printGCApplicationConcurrentTime,
                        printGCApplicationStoppedTime,
                        printAssembly,
                        printClassHistogram,
                        printConcurrentLocks,
                        additional,
                        aggressiveOpts,
                        largePages,
                        stringDeduplication,
                        compactStrings,
                        enableDynamicAgentLoading,
                        useZGC,
                        useShenandoahGC,
                        enablePreview,
                        jfrStartFlight,
                        enableCDS
                    } = mainState;

                    const baseVersion = parseInt(JDKVersion.split(/[\s/]/)[0]);

                    // Get version-specific configurations
                    const versionConfig = this.getVersionSpecificFlags(JDKVersion, configuration, {
                        printGCDetails,
                        enableGCLogRotation,
                        verboseJNI,
                        verboseGC,
                        verboseClass,
                        printGCApplicationConcurrentTime,
                        printGCApplicationStoppedTime
                    });

                    // Handle memory flags
                    minHeapSize = minHeapSize
                        ? configuration.minHeapSize + minHeapSize + heapSizeSelect
                        : "";

                    maxHeapSize = maxHeapSize
                        ? configuration.maxHeapSize + maxHeapSize + heapSizeSelect
                        : "";

                    // Handle memory-related flags based on JDK version
                    let memoryFlags = [];
                    if (versionConfig.usePermSize) {
                        if (defaultPermSize) {
                            memoryFlags.push(configuration.defaultPermSize + defaultPermSize + permSizeSelect);
                        }
                        if (maxPermSize) {
                            memoryFlags.push(configuration.maxPermSize + maxPermSize + permSizeSelect);
                        }
                    } else if (versionConfig.useMetaspace) {
                        if (defaultMetaSpace) {
                            memoryFlags.push(configuration.defaultMetaspace + defaultMetaSpace + metaSpaceSelect);
                        }
                        if (maxMetaSpace) {
                            memoryFlags.push(configuration.maxMetaSpace + maxMetaSpace + metaSpaceSelect);
                        }
                    }

                    // Get garbage collector configuration
                    const {gcFlag, options: gcOptions} = this.getGCOptions(mainState, this.props.data, baseVersion);

                    // Collect all debugging flags
                    const debuggingFlags = [
                        versionConfig.flags.printGCDetails,
                        versionConfig.flags.enableGCLogRotation,
                        heapDumpOnOOMemory && configuration.heapDumpOnOOMemory,
                        enableErrorFile && configuration.enableErrorFile,
                        versionConfig.flags.verboseJNI,
                        versionConfig.flags.verboseGC,
                        versionConfig.flags.verboseClass,
                        versionConfig.flags.printGCApplicationConcurrentTime,
                        versionConfig.flags.printGCApplicationStoppedTime,
                        printAssembly && configuration.printAssembly,
                        printClassHistogram && configuration.printClassHistogram,
                        printConcurrentLocks && configuration.printConcurrentLocks,
                        baseVersion >= 11 && jfrStartFlight && configuration.jfrStartFlight,
                        baseVersion >= 10 && enableCDS && configuration.enableCDS
                    ].filter(Boolean);

                    // Collect all performance flags
                    const performanceFlags = [
                        baseVersion <= 10 && aggressiveOpts && configuration.aggressiveOpts,
                        largePages && configuration.largePages,
                        baseVersion >= 8 && stringDeduplication && configuration.stringDeduplication,
                        baseVersion >= 9 && compactStrings && configuration.compactStrings,
                        baseVersion >= 10 && enableDynamicAgentLoading && configuration.enableDynamicAgentLoading,
                        baseVersion >= 11 && useZGC && configuration.useZGC,
                        baseVersion >= 12 && useShenandoahGC && configuration.useShenandoahGC,
                        baseVersion >= 12 && enablePreview && configuration.enablePreview
                    ].filter(Boolean);

                    // Combine all flags
                    let arrStr = [
                        minHeapSize,
                        maxHeapSize,
                        ...memoryFlags,
                        gcFlag,
                        ...gcOptions,
                        ...debuggingFlags,
                        ...performanceFlags,
                        additional ? configuration.hashCodeAlgo + additional : ""
                    ];

                    const jvmFlags = `-server ${arrStr.filter(str => str).join(" ")}`;

                    return (
                        <div id="summary">
                            <label htmlFor="jvmFlagResult">JVM Flags</label>

                            <textarea
                                id="jvmFlagResult"
                                className="form-control"
                                placeholder="JVM Options Summary"
                                value={jvmFlags}
                                readOnly
                            />

                            <div>
                                <button
                                    id="copy"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.copyToClipboard(jvmFlags);
                                    }}
                                >
                                    Copy To Clipboard
                                </button>

                                <button
                                    id="download"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({
                                            download: true,
                                            value: jvmFlags
                                        });
                                    }}
                                >
                                    Download as text
                                </button>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Summary;
