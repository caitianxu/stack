import React, { Component } from "react";
import Util from "../../script/util";
import HTTP from "../../script/service";
import { message } from "antd";

class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwd: null,
      new_passwd: null,
      new_passwd1: null
    };
  }
  changeFormValue = e => {
    let ps = {};
    ps[e.target.name] = e.target.value;
    this.setState(ps);
  };
  submitForm = () => {
    const { passwd, new_passwd, new_passwd1 } = this.state;
    const { token } = this.props.base;
    if (!passwd) {
      message.warn("请输入旧密码");
      return;
    }
    if (!new_passwd) {
      message.warn("请输入新密码");
      return;
    }
    if (passwd == new_passwd) {
      message.warn("新密码不能与旧密码一致");
      return;
    }
    let reg = /(?=^.{6,20}$)(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d])/;
    if (!reg.test(new_passwd)) {
      message.warn("密码不小于6位，需包含数字与字母");
      return;
    }
    if (new_passwd != new_passwd1) {
      message.warn("新密码和确认密码两次输入不一致");
      return;
    }
    HTTP._update_pwd({ token, passwd, new_passwd }).then(res => {
      if (res.code == 0) {
        message.success("密码修改成功!");
        this.props.changeType("meinfo");
      } else {
        message.error(res.message);
      }
    });
  };
  render() {
    const { userInfo } = this.props.base;
    const { passwd, new_passwd, new_passwd1 } = this.state;
    return (
      <div className="center-changepwd-detail">
        <div className="center-page-title">修改密码 Modify the password</div>
        <div className="center-meinfo-header">
          <div className="meinfo-row-1">
            <div className="cover">
              <img src={Util.transImgUrl(userInfo.icon)} alt=""/>
            </div>
            <div className="nickname">
              <label>您好，{userInfo.nick_name}</label>
              欢迎来到中国问题研究文献出版目录及服务平台！
            </div>
          </div>
        </div>
        <div className="center-meinfo-detail">
          <div className="me-info-row">
            <label className="l-label">原密码</label>
            <span className="l-value">
              <input
                type="password"
                name="passwd"
                value={passwd || ""}
                className="form-input"
                placeholder="请输入原密码"
                onChange={this.changeFormValue}
              />
            </span>
          </div>
          <div className="me-info-row">
            <label className="l-label">新密码</label>
            <span className="l-value">
              <input
                type="password"
                name="new_passwd"
                value={new_passwd || ""}
                className="form-input"
                placeholder="密码不小于6位，需包含数字与字母"
                maxLength="20"
                onChange={this.changeFormValue}
              />
            </span>
          </div>
          <div className="me-info-row">
            <label className="l-label">确认密码</label>
            <span className="l-value">
              <input
                type="password"
                name="new_passwd1"
                value={new_passwd1 || ""}
                className="form-input"
                placeholder="密码不小于6位，需包含数字与字母"
                maxLength="20"
                onChange={this.changeFormValue}
              />
            </span>
          </div>
        </div>
        <div className="center-meinfo-actions">
          <button onClick={this.submitForm}>确认 Sure</button>
          <button className="cancel" onClick={this.props.changeType.bind(this, "meinfo")}>
            取消 Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ChangePwd;
