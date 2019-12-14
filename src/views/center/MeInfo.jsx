import React, { Component } from "react";
import { Icon, Radio, Modal } from "antd";
import Util from "../../script/util";

class MeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      bindPhoneVisible: false
    };
  }
  //修改性别
  onChangeSex = e => {
    console.log(e.target.value);
  };
  //绑定手机-隐藏
  hidePhoneModal = () => {
    this.setState({
      bindPhoneVisible: false
    });
  };
  //绑定手机-显示
  showPhoneModal = () => {
    this.setState({
      bindPhoneVisible: true
    });
  };
  render() {
    const { userInfo } = this.props.base;
    const { edit, bindPhoneVisible } = this.state;
    const defaultInfo = () => {
      if (!userInfo) {
        return null;
      }
      return (
        <span>
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
      );
    };
    const editInfo = () => {
      return (
        <span>
          <div className="center-meinfo-detail">
            <div className="me-info-row" style={{ paddingTop: "50px" }}>
              <label className="l-label">头像</label>
              <span className="l-value">
                <div className="user-cover-row">
                  <div className="cover">
                    <img src={Util.transImgUrl(userInfo.icon)} alt=""/>
                  </div>
                  <span className="link">更好头像</span>
                </div>
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">用户名</label>
              <span className="l-value">{userInfo.account}</span>
            </div>
            <div className="me-info-row">
              <label className="l-label">真实姓名</label>
              <span className="l-value">
                <input type="text" name="real_name" className="form-input" />
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">性别</label>
              <span className="l-value">
                <Radio.Group onChange={this.onChangeSex} value={userInfo.sex}>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">微信</label>
              <span className="l-value weixin">
                <span className="icon">
                  <Icon type="wechat" />
                </span>
                <span className="link">立即绑定</span>
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">手机</label>
              <span className="l-value phone">
                <span className="icon">
                  <Icon type="mobile" />
                </span>
                <span className="link" onClick={this.showPhoneModal}>立即绑定</span>
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">邮箱</label>
              <span className="l-value">
                <input type="text" name="mail" className="form-input" />
              </span>
            </div>
          </div>
          <div className="center-meinfo-actions">
            <button>提交 Submission</button>
            <button className="cancel">取消 Cancel</button>
          </div>
        </span>
      );
    };
    return (
      <div className="center-meinfo-page">
        <div className="center-page-title">个人信息 Personal information</div>
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
          <div className="meinfo-row-2">
            <span>账户包库时长： 2017.08.10 - 2019.10.10</span>
            <button className="recharge">充值 Recharge</button>
          </div>
        </div>
        {edit ? <span>{editInfo()}</span> : <span>{defaultInfo()}</span>}

        {/* 绑定手机 */}
        <Modal
          visible={bindPhoneVisible}
          wrapClassName="daidai-modal-style"
          centered={true}
          closable={false}
          footer={null}
          keyboard={false}
          maskClosable={true}
          width="650px"
          onCancel={this.hidePhoneModal}
        >
          <div className="modal-parent-plan change-phone-plan">
            <div className="style-border">
              <i className="style-1"></i>
              <i className="style-2"></i>
              <i className="style-3"></i>
              <i className="style-4"></i>
            </div>
            <div className="modal-parent-content">
              <div className="modal-content-header">
                <div className="header-title">
                  <h3>
                    验证手机号
                    <label>Verify phone number</label>
                  </h3>
                  <span className="close" onClick={this.hidePhoneModal}>
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="modal-content-conter">
                <div className="change-phone-content">
                  <div className="phone-row">
                    <div className="phone-label">
                      <p>手机</p>
                      <p>Mobile phone</p>
                    </div>
                    <div className="phone-control">
                      <input type="text" name="phone" placeholder="请输入正确的手机号码"/>
                    </div>
                  </div>
                  <div className="phone-row">
                    <div className="phone-label">
                      <p>短信验证码</p>
                      <p>get verification code</p>
                    </div>
                    <div className="phone-control">
                      <input type="text" name="code" placeholder="请输入验证码"/>
                      <div className="send-btn">
                        <p>获取验证码</p>
                        <p>get verification code</p>
                      </div>
                    </div>
                  </div>
                  <div className="phone-button">
                    <button>确定 Sure</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MeInfo;
