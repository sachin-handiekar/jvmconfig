import React, {Component} from "react";

class Memory extends Component {
    render() {
        const {activeNavbar, mainState} = this.props;
        const {
            JDKVersion,
            handleInput,
            minHeapSize,
            maxHeapSize,
            heapSizeSelect,
            defaultPermSize,
            maxPermSize,
            permSizeSelect,
            defaultMetaSpace,
            maxMetaSpace,
            metaSpaceSelect
        } = mainState;

        return (
            <div
                id="memory"
                className={`tab-pane ${activeNavbar === "memory" ? "active" : "hide"}`}
            >
                <div>
                    <label htmlFor="jdkVersion">Heap Size</label>

                    <div>
                        <div>
                            <input
                                className="form-control"
                                id="minHeapSize"
                                placeholder="min"
                                type="text"
                                value={minHeapSize}
                                onChange={e => {
                                    handleInput("minHeapSize", e.target.value);
                                }}
                            />
                        </div>

                        <div>
                            <input
                                className="form-control"
                                id="maxHeapSize"
                                placeholder="max"
                                type="text"
                                value={maxHeapSize}
                                onChange={e => {
                                    handleInput("maxHeapSize", e.target.value);
                                }}
                            />
                        </div>

                        <div className="select">
                            <select
                                className="form-control"
                                id="heapSizeSelect"
                                value={heapSizeSelect}
                                onChange={e => {
                                    handleInput("heapSizeSelect", e.target.value);
                                }}
                            >
                                <option value="">Kb</option>
                                <option value="M">Mb</option>
                                <option value="G">Gb</option>
                            </select>
                        </div>
                    </div>
                </div>

                {JDKVersion === "6/7" && (
                    <div id="permSize">
                        <label htmlFor="permSize">Perm Size</label>

                        <div>
                            <div>
                                <input
                                    className="form-control"
                                    id="defaultPermSize"
                                    placeholder="default"
                                    type="text"
                                    value={defaultPermSize}
                                    onChange={e => {
                                        handleInput("defaultPermSize", e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <input
                                    className="form-control"
                                    id="maxPermSize"
                                    placeholder="max"
                                    type="text"
                                    value={maxPermSize}
                                    onChange={e => {
                                        handleInput("maxPermSize", e.target.value);
                                    }}
                                />
                            </div>

                            <div className="select">
                                <select
                                    className="form-control"
                                    id="permSizeSelect"
                                    value={permSizeSelect}
                                    onChange={e => {
                                        handleInput("permSizeSelect", e.target.value);
                                    }}
                                >
                                    <option value="">Kb</option>
                                    <option value="M">Mb</option>
                                    <option value="G">Gb</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {JDKVersion === "8" && (
                    <div id="metaSpace">
                        <label htmlFor="metaspace">Metaspace</label>

                        <div>
                            <div>
                                <input
                                    className="form-control"
                                    id="defaultMetaSpace"
                                    placeholder="default"
                                    type="text"
                                    value={defaultMetaSpace}
                                    onChange={e => {
                                        handleInput("defaultMetaSpace", e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <input
                                    className="form-control"
                                    id="maxMetaSpace"
                                    placeholder="max"
                                    type="text"
                                    value={maxMetaSpace}
                                    onChange={e => {
                                        handleInput("maxMetaSpace", e.target.value);
                                    }}
                                />
                            </div>

                            <div className="select">
                                <select
                                    className="form-control"
                                    id="metaSpaceSelect"
                                    value={metaSpaceSelect}
                                    onChange={e => {
                                        handleInput("metaSpaceSelect", e.target.value);
                                    }}
                                >
                                    <option value="">Kb</option>
                                    <option value="M">Mb</option>
                                    <option value="G">Gb</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Memory;
