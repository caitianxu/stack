import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../script/asyncComponent";
import store from "../store/store";
import { _get_url_search } from "../store/Action";

const Index = asyncComponent(() => import("./index/Index"));
const Login = asyncComponent(() => import("./login/Login"));
const Regist = asyncComponent(() => import("./regist/Regist"));
const Search = asyncComponent(() => import("./search/Search"));

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
  componentDidMount() {
    _get_url_search(res => {});
  }
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
            <Redirect exact from="/" to={path} />
            {/* 主页 */}
            <Route path="/index" component={Index} />
            {/* 登录 */}
            <Route path="/login" component={Login} />
            {/* 注册 */}
            <Route path="/regist" component={Regist} />
            {/* 搜索 */}
            <Route path="/search" component={Search} />

            <Route path="/:local" component={Index} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
