import React, {Component} from "react";

import {Consumer} from "../../context";

class Select extends Component {
    state = {};

    renderOptions = () => {
        const {data} = this.props;

        return data.children.map(child => {
            return (
                <option key={child.id} value={child.value} disabled={child.disabled}>
                    {child.text}
                </option>
            );
        });
    };

    renderSuboptions = (data, mainState, configuration) => {
        const selectedChild = data.children.filter(
            child => child.id === (mainState.additional || mainState.garbageCollector)
        )[0];

        if (selectedChild && selectedChild.options) {
            return (
                <div className="sub-options">
                    <p>{selectedChild.optionsTitle}</p>
                    {selectedChild.options.map(({id, value, text, tooltip}) => {
                        return (
                            <div key={id}>
                                <label htmlFor={id}>
                                    {text}
                                    <p className="tooltip" tooltip={tooltip}>
                                        !
                                    </p>
                                </label>

                                <input
                                    type="text"
                                    name={id.toLowerCase()}
                                    id={id}
                                    onChange={e => {
                                        mainState.handleInput(
                                            [id],
                                            configuration[id] + e.target.value
                                        );
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            return [];
        }
    };

    render() {
        const {activeNavbar, type, data, configuration} = this.props;

        return (
            <Consumer>
                {mainState => {
                    return (
                        <div
                            id={data.id}
                            className={`tab-pane ${
                                activeNavbar === type ? "active" : "hide"
                                }`}
                        >
                            <label htmlFor={data.id}>{data.text} :</label>

                            <div className="select">
                                <select
                                    value={
                                        data.id === "additional"
                                            ? mainState.additional
                                            : mainState.garbageCollector
                                    }
                                    onChange={e => {
                                        mainState.handleInput(data.id, e.target.value);
                                    }}
                                >
                                    {this.renderOptions()}
                                </select>
                            </div>

                            {this.renderSuboptions(data, mainState, configuration)}
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Select;