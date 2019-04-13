import React, {Component} from "react";

import {Consumer} from "../context";

class Summery extends Component {
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
        link.download = "filename.txt";
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
                        garbageCollector,
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
                        stringCache,
                        compressedStrings,
                        optimizeStringConcat
                    } = mainState;

                    minHeapSize = minHeapSize
                        ? configuration.minHeapSize + minHeapSize + heapSizeSelect
                        : "";

                    maxHeapSize = maxHeapSize
                        ? configuration.maxHeapSize + maxHeapSize + heapSizeSelect
                        : "";

                    defaultPermSize = defaultPermSize
                        ? configuration.defaultPermSize + defaultPermSize + permSizeSelect
                        : "";

                    maxPermSize = maxPermSize
                        ? configuration.maxPermSize + maxPermSize + permSizeSelect
                        : "";

                    defaultMetaSpace = defaultMetaSpace
                        ? configuration.defaultMetaspace +
                        defaultMetaSpace +
                        metaSpaceSelect
                        : "";

                    maxMetaSpace = maxMetaSpace
                        ? configuration.maxMetaSpace + maxMetaSpace + metaSpaceSelect
                        : "";

                    // Get options of garbage collector
                    let elem = this.props.data.garbageCollector.children.filter(x => {
                        return x.id === garbageCollector;
                    })[0];

                    let options = [];
                    if (elem && elem.options) {
                        options = elem.options.map(x => mainState[x.id]);
                    }

                    if (garbageCollector === "g1") {
                        garbageCollector = configuration.g1;
                    } else if (garbageCollector === "cms") {
                        garbageCollector = configuration.cms;
                    } else if (garbageCollector === "parallel") {
                        garbageCollector = configuration.parallel;
                    } else {
                        garbageCollector = "";
                    }

                    let arrStr = [
                        minHeapSize,
                        maxHeapSize,
                        JDKVersion === "6/7" ? defaultPermSize : defaultMetaSpace,
                        JDKVersion === "6/7" ? maxPermSize : maxMetaSpace,
                        garbageCollector,
                        ...options,
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
                        additional ? configuration.hashCodeAlgo + additional : "",
                        aggressiveOpts,
                        largePages,
                        stringCache,
                        compressedStrings,
                        optimizeStringConcat
                    ];

                    return (
                        <div id="summary">
                            <label htmlFor="jvmFlagResult">JVM Flags</label>

                            <textarea
                                id="jvmFlagResult"
                                className="form-control"
                                placeholder="JVM Options Summary"
                                value={`-server ${arrStr.filter(str => str).join(" ")}`}
                                readOnly
                            />

                            <div>
                                <button
                                    id="copy"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.copyToClipboard(
                                            `-server ${arrStr.filter(str => str).join(" ")}`
                                        );
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
                                            value: `-server ${arrStr.filter(str => str).join(" ")}`
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

export default Summery;
