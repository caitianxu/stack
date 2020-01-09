import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Util from "../../script/util";
import { _get_url_search, _get_orgInfo } from "../../store/Action";
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
import OrgInfo from "./OrgInfo";
import UserManage from "./UserManage";
import Statistics from "./Statistics";
import RelationMsg from "./RelationMsg";
import RelationUser from "./RelationUser";

class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      type: null,
      managePwd: "123456"
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
    const { member_id, token, orgInfo } = this.state.base;
    if (!member_id && !token && !orgInfo) {
      _get_orgInfo()
        .then(res => {
          _get_url_search(param => {
            this.setState({
              type: param.type || "message"
            });
          });
        })
        .catch(e => {
          this.props.history.push("/login");
        });
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
    document.documentElement.scrollTo(0, 0);
  };
  //设置管理密码
  setSystemPwd = pwd => {
    this.setState({
      managePwd: pwd,
      type: "relationmsg"
    });
  };
  render() {
    const { base, type, managePwd } = this.state;
    //消息中心
    const messageMenu = () => {
      return (
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
      );
    };
    //账户管理
    const accountMenu = () => {
      if (base.userInfo) {
        return (
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
        );
      }
      if (base.orgInfo) {
        return (
          <div className={`menu-parent ${type == "orginfo" ? "active" : ""}`}>
            <div className="one-menu">
              <div className="one-t1">
                <span className="icon f2"></span>
                <label>账户管理</label>
              </div>
              <div className="one-t2">Account management</div>
            </div>
            <div className="two-menus">
              <div
                className={`menu-item ${type == "orginfo" ? "active" : ""}`}
                onClick={this.changeType.bind(this, "orginfo")}
              >
                机构信息
              </div>
            </div>
          </div>
        );
      }
      return null;
    };
    //我的订单
    const orderMenu = () => {
      if (base.userInfo) {
        return (
          <div className={`menu-parent ${type == "purchase" || type == "orders" ? "active" : ""}`}>
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
        );
      }
      return null;
    };
    //我的足迹
    const recordMenu = () => {
      if (base.userInfo) {
        return (
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
        );
      } else if (base.orgInfo) {
        return (
          <div
            className={`menu-parent ${
              type == "statistics" || type == "search" || type == "browse" ? "active" : ""
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
                className={`menu-item ${type == "statistics" ? "active" : ""}`}
                onClick={this.changeType.bind(this, "statistics")}
              >
                数据统计
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
        );
      }
      return null;
    };
    //用户管理
    const userManageMenu = () => {
      if (base.orgInfo) {
        return (
          <div
            className={`menu-parent ${
              type == "usermanage" || type == "relationmsg" || type == "relationuser"
                ? "active"
                : ""
            }`}
          >
            <div className="one-menu">
              <div className="one-t1">
                <span className="icon f5"></span>
                <label>用户管理</label>
              </div>
              <div className="one-t2">User management</div>
            </div>
            {managePwd ? (
              <div className="two-menus">
                <div
                  className={`menu-item ${type == "relationmsg" ? "active" : ""}`}
                  onClick={this.changeType.bind(this, "relationmsg")}
                >
                  关联通知
                </div>
                <div
                  className={`menu-item ${type == "relationuser" ? "active" : ""}`}
                  onClick={this.changeType.bind(this, "relationuser")}
                >
                  关联用户管理
                </div>
              </div>
            ) : (
              <div className="two-menus">
                <div
                  className={`menu-item ${type == "usermanage" ? "active" : ""}`}
                  onClick={this.changeType.bind(this, "usermanage")}
                >
                  管理员管理
                </div>
              </div>
            )}
          </div>
        );
      }
      return null;
    };
    return (
      <div className="center-page">
        <Header base={base} />
        {base && (base.userInfo || base.orgInfo) ? (
          <div className="center-content">
            <div className="center-menu">
              <div className="menu-bg">
                {base.userInfo ? (
                  <div className="user">
                    <div className="cover">
                      <img src={Util.transImgUrl(base.userInfo.icon)} alt="" />
                    </div>
                    <div className="nick">{base.userInfo.nick_name}</div>
                  </div>
                ) : null}
                {base.orgInfo ? (
                  <div className="user">
                    <div className="cover">
                      <img src={Util.transImgUrl(base.orgInfo.icon)} alt="" />
                    </div>
                    <div className="nick">{base.orgInfo.org_name}</div>
                  </div>
                ) : null}
                {/* 消息中心 */}
                {messageMenu()}
                {/* 账户管理 */}
                {accountMenu()}
                {/* 我的足迹 */}
                {orderMenu()}
                {/* 我的足迹 */}
                {recordMenu()}
                {/* 用户管理 */}
                {userManageMenu()}
              </div>
            </div>
            {/* {base && base.userInfo ? ( */}
            <div className="center-right-all">
              {/* 消息中心 */}
              {type == "message" ? <Message base={base} /> : null}
              {/* 个人信息 */}
              {type == "meinfo" && base.userInfo ? (
                <MeInfo base={base} changeType={this.changeType} />
              ) : null}
              {/* 账户关联 */}
              {type == "account" && base.userInfo ? <Account base={base} /> : null}
              {/* 修改密码 */}
              {type == "changepwd" && base.userInfo ? (
                <ChangePwd base={base} changeType={this.changeType} />
              ) : null}
              {/* 在线充值 */}
              {type == "purchase" && base.userInfo ? <Purchase base={base} /> : null}
              {/* 订单列表 */}
              {type == "orders" && base.userInfo ? <Orders base={base} /> : null}
              {/* 我的收藏 */}
              {type == "collect" && base.userInfo ? <Collect base={base} /> : null}
              {/* 检索历史 */}
              {type == "search" ? <Search base={base} /> : null}
              {/* 浏览历史 */}
              {type == "browse" ? <Browse base={base} /> : null}
              {/* 机构信息 */}
              {type == "orginfo" && base.orgInfo ? <OrgInfo base={base} /> : null}
              {/* 管理员管理 */}
              {type == "usermanage" && base.orgInfo ? (
                <UserManage base={base} setSystemPwd={this.setSystemPwd} />
              ) : null}
              {/* 数据统计 */}
              {type == "statistics" && base.orgInfo ? <Statistics base={base} /> : null}
              {/* 关联通知 */}
              {type == "relationmsg" && base.orgInfo ? (
                <RelationMsg base={base} managePwd={managePwd} />
              ) : null}
              {/* 关联用户管理*/}
              {type == "relationuser" && base.orgInfo ? (
                <RelationUser base={base} managePwd={managePwd} />
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
