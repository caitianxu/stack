import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./Help.scss";

class Help extends Component {
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
  //销毁
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  render() {
    const { base } = this.state;
    return (
      <div className="help-page">
        <div className="page-main">
          <Header base={base} />
          <div className="help-content">
            <ul className="menus">
              <li>
                <Link to="/about">
                  <h3>关于我们</h3>
                  <p>About us</p>
                </Link>
              </li>
              <li>
                <Link to="/des">
                  <h3>产品介绍</h3>
                  <p>Product description</p>
                </Link>
              </li>
              <li className="active">
                <h3>帮助中心</h3>
                <p>Help</p>
              </li>
              <li>
                <Link to="/cus">
                  <h3>联系我们</h3>
                  <p>Contact us</p>
                </Link>
              </li>
            </ul>
            <div className="remark">
              <div className="title">
                <h3>帮助中心</h3>
                <p>Help</p>
              </div>
              <div className="content">
                <div className="content-left">
                  <dl>
                    <dt>登录注册</dt>
                    <dd>注册登录步骤</dd>
                    <dd>忘记用户名如何登录</dd>
                    <dd>微信绑定登录</dd>
                  </dl>
                  <dl>
                    <dt>登录注册</dt>
                    <dd>注册登录步骤</dd>
                    <dd>忘记用户名如何登录</dd>
                    <dd>微信绑定登录</dd>
                  </dl>
                  <dl>
                    <dt>登录注册</dt>
                    <dd>注册登录步骤</dd>
                    <dd>忘记用户名如何登录</dd>
                    <dd>微信绑定登录</dd>
                  </dl>
                  <dl>
                    <dt>登录注册</dt>
                    <dd>注册登录步骤</dd>
                    <dd>忘记用户名如何登录</dd>
                    <dd>微信绑定登录</dd>
                  </dl>
                </div>
                <div className="content-right">
                  <p>
                  1、如何注册、登录网站？
                  点击登录框“注册”按钮进入注册流程。。目前网站仅支持邮箱注册。用户可使用用户名登录、IP登录和第三方账
                  号登录三种登录方式。
                  </p>
                  <p>
                  1、如何注册、登录网站？
                  点击登录框“注册”按钮进入注册流程。。目前网站仅支持邮箱注册。用户可使用用户名登录、IP登录和第三方账
                  号登录三种登录方式。
                  </p>
                  <p>
                  1、如何注册、登录网站？
                  点击登录框“注册”按钮进入注册流程。。目前网站仅支持邮箱注册。用户可使用用户名登录、IP登录和第三方账
                  号登录三种登录方式。
                  </p>
                  <p>
                  1、如何注册、登录网站？
                  点击登录框“注册”按钮进入注册流程。。目前网站仅支持邮箱注册。用户可使用用户名登录、IP登录和第三方账
                  号登录三种登录方式。
                  </p>
                  <p>
                  1、如何注册、登录网站？
                  点击登录框“注册”按钮进入注册流程。。目前网站仅支持邮箱注册。用户可使用用户名登录、IP登录和第三方账
                  号登录三种登录方式。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Help;
