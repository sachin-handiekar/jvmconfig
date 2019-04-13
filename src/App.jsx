import React, {Component} from "react";
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

class App extends Component {
    render() {
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

                            <a
                                className="github"
                                href="https://github.com/sachin-handiekar/jvmconfig"
                            >
                                <img
                                    src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                                    alt="Fork me on GitHub"
                                    data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                                />
                            </a>
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
}

export default App;
