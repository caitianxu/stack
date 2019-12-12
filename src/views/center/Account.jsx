import React, { Component } from "react";
import Util from "../../script/util";

class Account extends Component {
  render() {
    const { userInfo } = this.props.base;
    return (
      <div className="center-account-detail">
        <div className="center-page-title">账户关联 Account association</div>
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
          <div className="meinfo-row-3">您尚未关联账户</div>
        </div>
      </div>
    );
  }
}

export default Account;
