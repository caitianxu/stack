import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../script/asyncComponent";
import store from "../store/store";

const Index = asyncComponent(() => import("./index/Index"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState()
    };
    store.subscribe(this.storeChange);
  }
  //更新store
  storeChange = () => {
    this.setState({
      base: store.getState()
    });
  };
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
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
