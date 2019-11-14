import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import "./Login.scss"

class Login extends Component {
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
                <input type="text" placeholder="请输入用户名" />
              </div>
              <div className="form-row">
                <label className="icon">
                  <Icon type="lock" />
                </label>
                <input type="text" placeholder="请输入密码" />
              </div>
              <div className="ip-row">
                <span className="ip-action">IP一键登录</span>
              </div>
              <div className="form-action"></div>
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
