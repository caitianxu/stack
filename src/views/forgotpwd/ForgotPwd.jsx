import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { message } from "antd";
import "./ForgotPwd.scss";
import HTTP from "../../script/service";

export default class ForgotPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      code: null,
      username: null,
      password: null,
      password1: null,
      time: 0
    };
  }
  showXieyi = e => {
    message.info("补全协议内容");
    e.stopPropagation();
    e.preventDefault();
  };
  //发送验证码
  sendCode = () => {
    if (this.state.time > 0) return false;
    const myreg = /^[1][3-9][0-9]{9}$/;
    if (!myreg.test(this.state.phone)) {
      message.error("请输入正确的手机号码");
      return false;
    }
    HTTP._send_phone_code({
      phone: this.state.phone,
      code_type: 2
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          time: 60
        }, () => {
          this.changeTime();
        });
      } else {
        message.error(res.message);
      }
    });
  };
  //验证码时间监控
  changeTime = () => {
    let { time } = this.state;
    clearTimeout(this.timeOut);
    if (time > 0) {
      this.setState({
        time: time - 1
      });
      this.timeOut = setTimeout(this.changeTime, 1000);
    }
  };
  changeFormValue = e => {
    let ps = {};
    ps[e.target.name] = e.target.value;
    this.setState(ps);
  };
  //注册
  formSubmit = () => {
    const { phone, code, password, password1 } = this.state;
    const myreg = /^[1][3-9][0-9]{9}$/;
    if (!myreg.test(phone)) {
      message.error("请输入正确的手机号码");
      return false;
    }
    if (!code || code.length != 6) {
      message.error("请输入验证码");
      return false;
    }
    if (!password || password.length < 6) {
      message.error("请输入密码");
      return false;
    }
    if (password != password1) {
      message.error("两次的密码输入不一致");
      return false;
    }
    HTTP._forgetpwd({
      phone: phone,
      passwd: password,
      code: code
    }).then(res => {
      if (res.code == 0) {
        this.props.history.push("/login");
      } else {
        message.error(res.message);
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="page-main">
          <div className="forgotpwd-content">
            <h1>请填写以下信息重置登录密码：</h1>
            <div className="form-row">
              <label className="form-label">手机号：</label>
              <div className="form-control">
                <input
                  className="ip1"
                  type="text"
                  name="phone"
                  autoComplete="off"
                  value={this.state.phone || ""}
                  onChange={this.changeFormValue}
                  placeholder="请输入手机号"
                  maxLength="11"
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">验证码：</label>
              <div className="form-control">
                <input
                  className="ip2"
                  type="text"
                  name="code"
                  autoComplete="off"
                  value={this.state.code || ""}
                  onChange={this.changeFormValue}
                  placeholder="请输入验证码"
                  maxLength="6"
                />
                {this.state.time ? (
                  <button className="send-code disabled" disabled>
                    {this.state.time}s后重试
                  </button>
                ) : (
                  <button className="send-code" onClick={this.sendCode}>
                    点击发送验证码
                  </button>
                )}
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">密码：</label>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  className="ip3"
                  autoComplete="off"
                  value={this.state.password || ""}
                  onChange={this.changeFormValue}
                  maxLength="16"
                  placeholder="密码可包含大写、小写英文字母，数字，长度为6至16位"
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">确认密码：</label>
              <div className="form-control">
                <input
                  type="password"
                  name="password1"
                  className="ip3"
                  autoComplete="off"
                  value={this.state.password1 || ""}
                  onChange={this.changeFormValue}
                  maxLength="16"
                  placeholder="和密码保持一致"
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">&nbsp;</label>
              <div className="form-control">
                <button className="form-btn" onClick={this.formSubmit}>
                  找回密码 Forgot Password
                </button>
                <span className="form-other">
                  已注册?{" "}
                  <Link className="to-login" to="/login">
                    请登录
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
