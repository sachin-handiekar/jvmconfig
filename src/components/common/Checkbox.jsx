import React, {Component} from "react";

import {Consumer} from "../../context";

class Checkbox extends Component {
    renderOptions = handleInput => {
        const {data} = this.props;

        return data.children.map(({id, text, value, tooltip}) => (
            <div key={id}>
                <label className="checkbox" htmlFor={id}>
                    <input
                        type="checkbox"
                        name={id.toLowerCase()}
                        id={id}
                        onChange={e => {
                            e.target.checked ? handleInput(id, value) : handleInput(id, "");
                        }}
                    />
                    <span className="checmark"/>
                    {text}
                    <p className="tooltip" tooltip={tooltip}>
                        !
                    </p>
                </label>
            </div>
        ));
    };

    render() {
        const {activeNavbar, type, data} = this.props;

        return (
            <Consumer>
                {mainState => {
                    const {handleInput} = mainState;

                    return (
                        <div
                            id={data.id}
                            className={`tab-pane  ${
                                activeNavbar === type ? "active" : "hide"
                                }`}
                        >
                            {this.renderOptions(handleInput)}
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Checkbox;
