"use client";

import React from "react";
// Import data
import data from "../data/data.json";
// Import Provider
import { Provider } from "../context";
// Import Components
import JVMVendor from "../components/JVMVendor";
import JDKVersion from "../components/JDKVersion";
import ConfigContainer from "../components/config_params/ConfigContainer";
import Summary from "../components/Summary";

export default function Home() {
    return (
        <Provider>
            <div className="App">
                <div className="container">
                    <h4>JVM Options Configuration Tool</h4>

                    <p className="description">
                        A JVM config tool which can be used to configure various
                        flags/parameters used in changing behaviour & debugging features
                        within the JVM
                    </p>

                    <form id="form">
                        <div>
                            <JVMVendor vendors={data.JVMVendor}/>
                            <JDKVersion versions={data.JDKVersion}/>
                        </div>

                        <ConfigContainer data={data}/>

                        <Summary data={data}/>
                    </form>

                    <a
                        className="github-fork-ribbon right-top fixed"
                        href="https://github.com/sachin-handiekar/jvmconfig"
                        data-ribbon="Fork me on GitHub"
                        title="Fork me on GitHub"
                    >
                        Fork me on GitHub
                    </a>

                    <footer id="footer">
                        Developed by{" "}
                        <a href="https://sachinhandiekar.com/">Sachin Handiekar</a>
                    </footer>
                </div>
            </div>
        </Provider>
    );
}
