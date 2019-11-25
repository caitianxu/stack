import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../script/asyncComponent";
import store from "../store/store";
import Util from "../script/util";
import { _set_token, _get_userInfo } from "../store/Action";

const Index = asyncComponent(() => import("./index/Index"));
const Login = asyncComponent(() => import("./login/Login"));
const Regist = asyncComponent(() => import("./regist/Regist"));
const Search = asyncComponent(() => import("./search/Search"));
const About = asyncComponent(() => import("./about/About"));
const Description = asyncComponent(() => import("./description/Description"));
const Help = asyncComponent(() => import("./help/Help"));
const Cus = asyncComponent(() => import("./cus/Cus"));
const Mechanism = asyncComponent(() => import("./mechanism/Mechanism"));
const Expert = asyncComponent(() => import("./expert/Expert"));

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
    let token = Util.readCookie("token");
    if (token) {
      _set_token(token).then(res => {
        _get_userInfo(res);
      });
    }
  }
  //销毁
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
            {/* 关于我们 */}
            <Route path="/about" component={About} />
            {/* 产品介绍 */}
            <Route path="/des" component={Description} />
            {/* 帮助中心 */}
            <Route path="/help" component={Help} />
            {/* 联系我们 */}
            <Route path="/cus" component={Cus} />
            {/* 机构 */}
            <Route path="/mechanism" component={Mechanism} />
            {/* 专家 */}
            <Route path="/expert" component={Expert} />

            <Route path="/:local" component={Index} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
