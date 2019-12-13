import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Util from "../../script/util";
import { _get_url_search } from "../../store/Action";
import "./Center.scss";

import Message from "./Message";
import MeInfo from "./MeInfo";
import Account from "./Account";
import ChangePwd from "./ChangePwd";
import Purchase from "./Purchase";
import Orders from "./Orders";
import Browse from "./Browse";
import Collect from "./Collect";
import Search from "./Search";

class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      type: "message"
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
  //初始化
  componentDidMount() {
    const { member_id, token } = this.state.base;
    if (!member_id && !token) {
      this.props.history.push("/login");
    } else {
      _get_url_search(param => {
        this.setState({
          type: param.type || "message"
        });
      });
    }
  }
  //修改类型
  changeType = t => {
    this.setState({
      type: t
    });
  };
  render() {
    const { base, type } = this.state;
    console.log(base);
    return (
      <div className="center-page">
        <Header base={base} />
        {base && base.userInfo ? (
          <div className="center-content">
            <div className="center-menu">
              <div className="menu-bg">
                <div className="user">
                  <div className="cover">
                    <img src={Util.transImgUrl(base.userInfo.icon)} alt="" />
                  </div>
                  <div className="nick">{base.userInfo.nick_name}</div>
                </div>
                <div className={`menu-parent ${type == "message" ? "active" : ""}`}>
                  <div className="one-menu">
                    <div className="one-t1">
                      <span className="icon f1"></span>
                      <label>通知</label>
                    </div>
                    <div className="one-t2">Message</div>
                  </div>
                  <div className="two-menus">
                    <div
                      className={`menu-item ${type == "message" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "message")}
                    >
                      消息中心
                    </div>
                  </div>
                </div>
                <div
                  className={`menu-parent ${
                    type == "meinfo" || type == "account" || type == "changepwd" ? "active" : ""
                  }`}
                >
                  <div className="one-menu">
                    <div className="one-t1">
                      <span className="icon f2"></span>
                      <label>账户管理</label>
                    </div>
                    <div className="one-t2">Account management</div>
                  </div>
                  <div className="two-menus">
                    <div
                      className={`menu-item ${type == "meinfo" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "meinfo")}
                    >
                      个人信息
                    </div>
                    <div
                      className={`menu-item ${type == "account" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "account")}
                    >
                      账户关联
                    </div>
                    <div
                      className={`menu-item ${type == "changepwd" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "changepwd")}
                    >
                      修改密码
                    </div>
                  </div>
                </div>
                <div
                  className={`menu-parent ${
                    type == "purchase" || type == "orders" ? "active" : ""
                  }`}
                >
                  <div className="one-menu">
                    <div className="one-t1">
                      <span className="icon f3"></span>
                      <label>我的订单</label>
                    </div>
                    <div className="one-t2">My order</div>
                  </div>
                  <div className="two-menus">
                    <div
                      className={`menu-item ${type == "purchase" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "purchase")}
                    >
                      在线充值
                    </div>
                    <div
                      className={`menu-item ${type == "orders" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "orders")}
                    >
                      订单列表
                    </div>
                  </div>
                </div>
                <div
                  className={`menu-parent ${
                    type == "collect" || type == "search" || type == "browse" ? "active" : ""
                  }`}
                >
                  <div className="one-menu">
                    <div className="one-t1">
                      <span className="icon f4"></span>
                      <label>我的足迹</label>
                    </div>
                    <div className="one-t2">Full record</div>
                  </div>
                  <div className="two-menus">
                    <div
                      className={`menu-item ${type == "collect" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "collect")}
                    >
                      我的收藏
                    </div>
                    <div
                      className={`menu-item ${type == "search" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "search")}
                    >
                      检索历史
                    </div>
                    <div
                      className={`menu-item ${type == "browse" ? "active" : ""}`}
                      onClick={this.changeType.bind(this, "browse")}
                    >
                      浏览历史
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="center-right-all">
              {/* 消息中心 */}
              {type == "message" ? (
                <Message ref={el => (this.messageElement = el)} base={base} />
              ) : null}
              {/* 个人信息 */}
              {type == "meinfo" ? (
                <MeInfo ref={el => (this.meinfoElement = el)} base={base} />
              ) : null}
              {/* 账户关联 */}
              {type == "account" ? (
                <Account ref={el => (this.accountElement = el)} base={base} />
              ) : null}
              {/* 修改密码 */}
              {type == "changepwd" ? (
                <ChangePwd
                  ref={el => (this.changepwdElement = el)}
                  base={base}
                  changeType={this.changeType}
                />
              ) : null}
              {/* 在线充值 */}
              {type == "purchase" ? (
                <Purchase ref={el => (this.purchaseElement = el)} base={base} />
              ) : null}
              {/* 订单列表 */}
              {type == "orders" ? (
                <Orders ref={el => (this.ordersElement = el)} base={base} />
              ) : null}
              {/* 我的收藏 */}
              {type == "collect" ? (
                <Collect ref={el => (this.collectElement = el)} base={base} />
              ) : null}
              {/* 检索历史 */}
              {type == "search" ? (
                <Search ref={el => (this.searchElement = el)} base={base} />
              ) : null}
              {/* 浏览历史 */}
              {type == "browse" ? (
                <Browse ref={el => (this.browseElement = el)} base={base} />
              ) : null}
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    );
  }
}

export default Center;
