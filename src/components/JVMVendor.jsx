import React, {Component} from "react";

class Vendor extends Component {
    state = {
        selected: ""
    };

    renderVendors = () => {
        const {vendors} = this.props;

        return vendors.children.map((vend, ind) => {
            return (
                <option
                    key={ind} // If you will add ids for vendor, use it as a key. It will be better
                    value={vend.value.split(" ")[0].toLowerCase()}
                    disabled={vend.disabled}
                >
                    {vend.value}
                </option>
            );
        });
    };

    onSelectVendor = e => {
        e.preventDefault();

        this.setState({
            selected: e.target.value
        });
    };

    render() {
        return (
            <div>
                <label htmlFor="jvmVendor">JVM Vendor:</label>

                <div className="select">
                    <select
                        id="jvmVendor"
                        value={this.state.selected}
                        onChange={this.onSelectVendor}
                    >
                        {this.renderVendors()}
                    </select>
                </div>
            </div>
        );
    }
}

export default Vendor;
