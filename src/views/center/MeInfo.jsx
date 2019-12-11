import React, { Component } from "react";
import { Icon } from "antd";
import Util from "../../script/util";

class MeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { userInfo } = this.props.base;
    return (
      <div className="center-meinfo-page">
        <div className="center-page-title">个人信息 Personal information</div>
        {userInfo ? (
          <span>
            <div className="center-meinfo-header">
              <div className="meinfo-row-1">
                <div className="cover">
                  <img src={Util.transImgUrl(userInfo.icon)} />
                </div>
                <div className="nickname">
                  <label>您好，{userInfo.nick_name}</label>
                  欢迎来到中国问题研究文献出版目录及服务平台！
                </div>
              </div>
              <div className="meinfo-row-2">
                <span>账户包库时长： 2017.08.10 - 2019.10.10</span>
                <button className="recharge">充值 Recharge</button>
              </div>
            </div>
            <div className="center-meinfo-detail">
              <div className="me-info-row">
                <label className="l-label">用户名</label>
                <span className="l-value">{userInfo.account}</span>
              </div>
              <div className="me-info-row">
                <label className="l-label">真实姓名</label>
                <span className="l-value">{userInfo.real_name}</span>
              </div>
              <div className="me-info-row">
                <label className="l-label">性别</label>
                <span className="l-value">
                  {userInfo.sex == 1 ? (
                    <label className="woman">
                      <Icon type="woman" />女
                    </label>
                  ) : (
                    <label className="man">
                      <Icon type="man" />男
                    </label>
                  )}
                </span>
              </div>
              <div className="me-info-row">
                <label className="l-label">微信</label>
                <span className="l-value weixin">
                  <span className="icon">
                    <Icon type="wechat" />
                  </span>
                  绑定微信后可以直接微信登录
                </span>
              </div>
              <div className="me-info-row">
                <label className="l-label">手机</label>
                <span className="l-value phone">
                  <span className="icon">
                    <Icon type="mobile" />
                  </span>
                  绑定手机后可以直接使用手机号码登录
                </span>
              </div>
              <div className="me-info-row">
                <label className="l-label">邮箱</label>
                <span className="l-value email">
                  <span className="icon">
                    <Icon type="mail" />
                  </span>
                  绑定邮箱后可以直接使用邮箱登录
                </span>
              </div>
            </div>
            <div className="center-meinfo-actions">
              <button>编辑 Edit</button>
            </div>
          </span>
        ) : null}
      </div>
    );
  }
}

export default MeInfo;
