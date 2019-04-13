import React, {Component} from "react";

import {Consumer} from "../../context";

// Components
import ConfigNavbar from "./ConfigNavbar";
import Memory from "./Memory";
import Checkbox from "../common/Checkbox";
import Select from "../common/Select";

class ConfigContainer extends Component {
    state = {
        activeNavbar: "memory"
    };

    handleActiveNavbar = activeNavbar => {
        this.setState({activeNavbar});
    };

    render() {
        const {activeNavbar} = this.state;
        const {data} = this.props;

        return (
            <Consumer>
                {mainState => {
                    return (
                        <div id="config-container">
                            <ConfigNavbar
                                activeNavbar={activeNavbar}
                                handleActiveNavbar={this.handleActiveNavbar}
                            />

                            <div>
                                <Memory
                                    configuration={data.configuration}
                                    activeNavbar={activeNavbar}
                                    mainState={mainState}
                                />

                                <Select
                                    type="garbageCollector"
                                    data={data.garbageCollector}
                                    configuration={data.configuration}
                                    activeNavbar={activeNavbar}
                                    mainState={mainState}
                                />

                                <Checkbox
                                    type="debugging"
                                    data={data.debugging}
                                    activeNavbar={activeNavbar}
                                    mainState={mainState}
                                />

                                <Checkbox
                                    type="performance"
                                    data={data.performance}
                                    activeNavbar={activeNavbar}
                                    mainState={mainState}
                                />

                                <Select
                                    type="additional"
                                    data={data.additional}
                                    activeNavbar={activeNavbar}
                                    mainState={mainState}
                                />
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default ConfigContainer;