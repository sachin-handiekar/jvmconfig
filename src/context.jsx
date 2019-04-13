import React, {Component} from "react";

const Context = React.createContext();

export class Provider extends Component {
    state = {
        JDKVersion: "6/7",
        minHeapSize: "",
        maxHeapSize: "",
        heapSizeSelect: "",
        defaultPermSize: "",
        maxPermSize: "",
        permSizeSelect: "",
        defaultMetaSpace: "",
        maxMetaSpace: "",
        metaSpaceSelect: "",
        garbageCollector: "",
        g1: "",
        cms: "",
        parallel: "",
        additional: ""
    };

    handleJDKVersion = JDKVersion => {
        this.setState({JDKVersion});
    };

    handleInput = (type, value) => {
        this.setState({[type]: value});
    };

    render() {
        console.log("======== Main State =========");
        console.log(this.state);

        return (
            <Context.Provider
                value={{
                    ...this.state,
                    handleJDKVersion: this.handleJDKVersion,
                    handleInput: this.handleInput
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
