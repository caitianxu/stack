import React, { Component } from "react";
import Util from "../../script/util";
import { message } from "antd";
import HTTP from "../../script/service";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: null
    };
  }
  changeForm = e => {
    this.setState({
      pwd: e.target.value
    });
  };
  pwdConfirm = () => {
    const { orgInfo } = this.props.base;
    const { pwd } = this.state;
    if (!pwd) {
      message.warn("请输入管理员密码");
      return;
    }
    HTTP._memberorg_checkpwd({
      org_id: orgInfo.org_id,
      manage_pwd: pwd
    }).then(res => {
      if (res.code == 0) {
        this.props.setSystemPwd(pwd);
      } else {
        message.warn(res.message);
      }
    });
  };
  render() {
    const { orgInfo } = this.props.base;
    const { pwd } = this.state;
    return (
      <div className="center-userManage-detail">
        <div className="center-page-title">用户管理 User management</div>
        <div className="center-userManage-header">
          <div className="meinfo-row-1">
            <div className="cover">
              <img src={Util.transImgUrl(orgInfo.icon)} alt="" />
            </div>
            <div className="nickname">
              <label>{orgInfo.org_name}，</label>
              欢迎来到中国问题研究文献出版目录及服务平台！
            </div>
          </div>
        </div>
        <div className="center-userManage-detail">
          <div className="me-info-row">
            <label className="l-label">请输入管理员密码</label>
            <span className="l-value">
              <input
                type="text"
                className="form-input"
                value={pwd || ""}
                onChange={this.changeForm}
                placeholder="请输入密码"
              />
              <button className="cs-btn" onClick={this.pwdConfirm}>
                确定 Sure
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManage;
