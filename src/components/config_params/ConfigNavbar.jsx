import React, {Component} from "react";

class ConfigNavbar extends Component {
    render() {
        const {handleActiveNavbar, activeNavbar} = this.props;

        return (
            <ul className="config-navbar">
                <a
                    href="#memory"
                    className={`${activeNavbar === "memory" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("memory");
                    }}
                >
                    Memory
                </a>

                <a
                    href="#garbageCollector"
                    className={`${activeNavbar === "garbageCollector" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("garbageCollector");
                    }}
                >
                    Garbage Collector
                </a>

                <a
                    href="#debugging"
                    className={`${activeNavbar === "debugging" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("debugging");
                    }}
                >
                    Debugging
                </a>

                <a
                    href="#performance"
                    className={`${activeNavbar === "performance" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("performance");
                    }}
                >
                    Performance
                </a>

                <a
                    href="#additional"
                    className={`${activeNavbar === "additional" && "active"}`}
                    onClick={() => {
                        handleActiveNavbar("additional");
                    }}
                >
                    Additional
                </a>
            </ul>
        );
    }
}

export default ConfigNavbar;
