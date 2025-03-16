import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";
// Import data
import data from "./data/data.json";
// Import Provider
import {Provider} from "./context";
// Import Components
import JVMVendor from "./components/JVMVendor";
import JDKVersion from "./components/JDKVersion";
import ConfigContainer from "./components/config_params/ConfigContainer";
import Summary from "./components/Summary";
import {GithubForkBanner} from 'react-github-fork-banner';

function App() {
    return (
        <Provider>
            <Router>
                <div className="App">
                    <div className="container">
                        <h4>JVM Options Configuration Tool</h4>

                        <p className="description">
                            A JVM config tool which can be used to configure various
                            flags/parameters used in changing behaviour & debugging features
                            within the JVM
                        </p>

                        <form id="form" action="">
                            <div>
                                <JVMVendor vendors={data.JVMVendor}/>
                                <JDKVersion versions={data.JDKVersion}/>
                            </div>

                            <ConfigContainer data={data}/>

                            <Summary data={data}/>
                        </form>

                        <GithubForkBanner
                            position="right"
                            animation="all"
                            customHref="https://github.com/sachin-handiekar/jvmconfig"

                        />


                        <footer id="footer">
                            Developed by{" "}
                            <a href="https://sachinhandiekar.com/">Sachin Handiekar</a>
                        </footer>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;