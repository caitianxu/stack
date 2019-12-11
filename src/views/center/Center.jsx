import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Util from "../../script/util";
import { _get_url_search } from "../../store/Action";
import "./Center.scss";

import Message from "./Message";
import MeInfo from "./MeInfo";

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
                <div className={`menu-parent ${type == "meinfo" ? "active" : ""}`}>
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
                    <div className={`menu-item`}>账户关联</div>
                    <div className={`menu-item`}>修改密码</div>
                  </div>
                </div>
                <div className="menu-parent">
                  <div className="one-menu">
                    <div className="one-t1">
                      <span className="icon f3"></span>
                      <label>我的订单</label>
                    </div>
                    <div className="one-t2">My order</div>
                  </div>
                  <div className="two-menus">
                    <div className="menu-item">在线充值</div>
                    <div className="menu-item">订单列表</div>
                  </div>
                </div>
                <div className="menu-parent">
                  <div className="one-menu">
                    <div className="one-t1">
                      <span className="icon f4"></span>
                      <label>我的足迹</label>
                    </div>
                    <div className="one-t2">Full record</div>
                  </div>
                  <div className="two-menus">
                    <div className="menu-item">我的收藏</div>
                    <div className="menu-item">检索历史</div>
                    <div className="menu-item">浏览历史</div>
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
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    );
  }
}

export default Center;
