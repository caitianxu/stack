import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../script/asyncComponent";

const Index = asyncComponent(() => import("./index/Index"));

class App extends Component {
  render() {
    const path = {
      pathname: "/index",
      search: window.location.search
    };
    return (
      <div className="app-fix">
        <BrowserRouter>
          <Switch>
            {/* 主页 */}
            <Redirect exact from="/" to={path} />
            <Route path="/index" component={Index} />
            <Route path="/:local" component={Index} />
            {/* 登录 */}
            {/* 注册 */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
