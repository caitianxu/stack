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
const Mechanisms = asyncComponent(() => import("./mechanisms/Mechanisms"));
const Mechanism = asyncComponent(() => import("./mechanism/Mechanism"));
const Experts = asyncComponent(() => import("./experts/Experts"));
const Expert = asyncComponent(() => import("./expert/Expert"));
const Policys = asyncComponent(() => import("./policys/Policys"));
const Policy = asyncComponent(() => import("./policy/Policy"));
const Books = asyncComponent(() => import("./books/Books"));
const Book = asyncComponent(() => import("./book/Book"));
const Papers = asyncComponent(() => import("./papers/Papers"));

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
            <Route path="/mechanisms" component={Mechanisms} />
            {/* 机构详情 */}
            <Route path="/mechanism" component={Mechanism} />
            {/* 专家 */}
            <Route path="/experts" component={Experts} />
            {/* 专家详情 */}
            <Route path="/expert" component={Expert} />
            {/* 政策 */}
            <Route path="/policys" component={Policys} />
            {/* 政策详情 */}
            <Route path="/policy" component={Policy} />
            {/* 图书 */}
            <Route path="/books" component={Books} />
            {/* 图书详情 */}
            <Route path="/book" component={Book} />
            {/* 论文 */}
            <Route path="/papers" component={Papers} />

            <Route path="/:local" component={Index} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
