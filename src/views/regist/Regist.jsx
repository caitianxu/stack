import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import "./Regist.scss";

class Regist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: false
    };
  }
  changeBox = () => {
    this.setState({
      box: !this.state.box
    });
  };
  showXieyi = e => {
    e.stopPropagation();
    e.preventDefault();
  };
  render() {
    const { box } = this.state;
    return (
      <div>
        <Header />
        <div className="page-main">
          <div className="regist-content">
            <h1>请填写以下信息注册成为会员：</h1>
            <div className="form-row">
              <label className="form-label">手机号：</label>
              <div className="form-control">
                <input type="text" name="iphone" className="ip1" />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">验证码：</label>
              <div className="form-control">
                <input type="text" name="code" className="ip2" />
                <button className="send-code">点击发送验证码</button>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">用户名：</label>
              <div className="form-control">
                <input
                  type="text"
                  name="username"
                  className="ip3"
                  placeholder="用户名可包含大写、小写英文字母，数字，中文，长度为2至18位"
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">密码：</label>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  className="ip3"
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
                  placeholder="和密码保持一致"
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">&nbsp;</label>
              <div className="form-control">
                <div className="xieyi" onClick={this.changeBox}>
                  {box ? (
                    <Icon type="check-circle" theme="filled" />
                  ) : (
                    <i className="box"></i>
                  )}
                  已阅读并同意平台的
                  <span onClick={this.showXieyi}>《服务协议》</span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">&nbsp;</label>
              <div className="form-control">
                <button className="form-btn">立即注册 Sign up now</button>
                <span className="form-other">
                  已注册? <Link className="to-login" to="/login">请登录</Link>
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

export default Regist;
