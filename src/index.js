import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "core-js";
import "./style/basic.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.render(<ConfigProvider locale={zhCN}><App /></ConfigProvider>, document.getElementById("root"));
