import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { Icon, message } from "antd";
import { _get_user_info, _get_orgInfo } from "../../store/Action";
import store from "../../store/store";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      account: null,
      password: null
    };
    store.subscribe(this.storeChange);
  }
  //更新store
  storeChange = () => {
    this.setState({
      base: store.getState()
    });
  };
  changeFormValue = e => {
    let ps = {};
    ps[e.target.name] = e.target.value;
    this.setState(ps);
  };  
  //销毁
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  loginIn = () => {
    const { account, password } = this.state;
    if (!account || account.length < 2) {
      message.error("请输入用户名");
      return false;
    }
    if (!password || password.length < 6) {
      message.error("请输入密码");
      return false;
    }
    _get_user_info({
      account: account,
      passwd: password
    }).then(res => {
      this.props.history.push("/index");
    }).catch(res => {
      message.error(res.message);
    });
  };
  loginIPIn = () => {
  	_get_orgInfo().then(res => {
  		this.props.history.push("/index");
  	}).catch(res => {
  		message.error(res.message);
  	})
  }
  render() {
    return (
      <div>
        <Header />
        <div className="page-main">
          <div className="login-content">
            <div className="login-form">
              <h1>会员登录</h1>
              <div className="form-row">
                <label className="icon">
                  <Icon type="user" />
                </label>
                <input
                  type="text"
                  name="account"
                  autoComplete="off"
                  value={this.state.account || ""}
                  onChange={this.changeFormValue}
                  maxLength="18"
                  placeholder="请输入用户名"
                />
              </div>
              <div className="form-row">
                <label className="icon">
                  <Icon type="lock" />
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={this.state.password || ""}
                  onChange={this.changeFormValue}
                  maxLength="18"
                  placeholder="请输入密码"
                />
              </div>
              <div className="ip-row">
                <span className="ip-action" onClick={this.loginIPIn}>IP一键登录</span>
              </div>
              <div className="form-action" onClick={this.loginIn}></div>
              <div className="link-row">
                <Link to="/regist" className="a1">
                  没有账号? 去注册
                </Link>
                <Link to="/a2" className="a2">
                  忘记密码?
                </Link>
              </div>
              <h3>第三方账号登录</h3>
              <div className="other-login">
                <div className="weixin"></div>
                <div className="weibo"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
