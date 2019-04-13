import React, {Component} from "react";

import {Consumer} from "../context";

class JDKVersion extends Component {
    renderVersions = () => {
        const {versions} = this.props;

        return versions.children.map(version => {
            return (
                <option
                    id={`jdkVersion${version.value}`}
                    key={`jdkVersion${version.value}`}
                    value={version.value}
                    name="jdkVersionRadioGroup"
                >
                    {version.value}
                </option>
            );
        });
    };

    render() {
        return (
            <Consumer>
                {mainState => {
                    const {JDKVersion, handleJDKVersion} = mainState;
                    return (
                        <div id="jdkVersionSelection">
                            <label htmlFor="jdkVersion">JDK Version:</label>

                            <div className="select">
                                <select
                                    id="jdkVersion"
                                    value={JDKVersion}
                                    onChange={e => {
                                        handleJDKVersion(e.target.value);
                                    }}
                                >
                                    {this.renderVersions(JDKVersion, handleJDKVersion)}
                                </select>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default JDKVersion;
