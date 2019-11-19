import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "core-js";
import "./style/basic.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";

ReactDOM.render(<App />, document.getElementById("root"));
