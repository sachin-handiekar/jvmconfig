import React, {Component} from "react";
import {Link} from "react-router-dom";

class ConfigNavbar extends Component {
    render() {
        const {handleActiveNavbar, activeNavbar} = this.props;

        return (
            <ul className="config-navbar">
                <Link
                    to="#memory"
                    className={`${activeNavbar === "memory" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("memory");
                    }}
                >
                    Memory
                </Link>

                <Link
                    to="#garbageCollector"
                    className={`${activeNavbar === "garbageCollector" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("garbageCollector");
                    }}
                >
                    Garbage Collector
                </Link>

                <Link
                    to="#debugging"
                    className={`${activeNavbar === "debugging" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("debugging");
                    }}
                >
                    Debugging
                </Link>

                <Link
                    to="#performance"
                    className={`${activeNavbar === "performance" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("performance");
                    }}
                >
                    Performance
                </Link>

                <Link
                    to="#additional"
                    className={`${activeNavbar === "additional" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("additional");
                    }}
                >
                    Additional
                </Link>
            </ul>
        );
    }
}

export default ConfigNavbar;
