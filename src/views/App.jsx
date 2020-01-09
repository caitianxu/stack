import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../script/asyncComponent";
import store from "../store/store";
import Util from "../script/util";
import { _get_url_search, _set_token, _get_userInfo, _get_orgInfo } from "../store/Action";

const Index = asyncComponent(() => import("./index/Index"));
const Login = asyncComponent(() => import("./login/Login"));
const ForgotPwd = asyncComponent(() => import("./forgotpwd/ForgotPwd"));
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
const Paper = asyncComponent(() => import("./paper/Paper"));
const Center = asyncComponent(() => import("./center/Center"));
const Subjects = asyncComponent(() => import("./subjects/Subjects"));
const Subject = asyncComponent(() => import("./subject/Subject"));

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
    _get_url_search(param => {
      if (param.token) {
        token = param.token;
      }
    });
    if (token) {
      _set_token(token).then(res => {
        _get_userInfo(res)
          .then(res => {
            //用户登录
          })
          .catch(res => {
            _get_orgInfo();
          });
      });
    } else {
      _get_orgInfo();
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
            {/* 找回密码 */}
            <Route path="/forgotpwd" component={ForgotPwd} />
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
            {/* 论文详情 */}
            <Route path="/paper" component={Paper} />
            {/* 个人中心 */}
            <Route path="/center" component={Center} />
            {/* 专题 */}
            <Subjects path="/subjects" component={Center} />
            {/* 专题详情 */}
            <Subject path="/subject" component={Center} />

            <Route path="/:local" component={Index} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
