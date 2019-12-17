import React, { Component } from "react";
import { Icon, Radio, Modal, Upload, message } from "antd";
import Util from "../../script/util";
import HTTP from "../../script/service";
import { _get_userInfo } from "../../store/Action";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
class MeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      bindPhoneVisible: false,
      param: {},
      bindPhoneParam: {
        phone: null,
        code: null
      }
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
  //修改性别
  onChangeSex = e => {
    let { param } = this.state;
    param.sex = e.target.value;
    this.setState({
      param: { ...param }
    });
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
  //修改资料
  editForm = b => {
    this.setState({
      edit: b,
      param: b ? { ...this.props.base.userInfo } : {}
    });
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code == 0) {
        let { param } = this.state;
        param.icon = info.file.response.data.cover_path;
        this.setState({
          icon: { ...param }
        });
      } else {
        message.error(info.file.response.message);
      }
    }
  };
  changeForm = e => {
    let { param } = this.state;
    param[e.target.name] = e.target.value;
    this.setState({
      param: { ...param }
    });
  };
  //修改个人资料
  changeMeinfo = () => {
    const { param } = this.state;
    HTTP._member_update({
      icon: param.icon,
      real_name: param.real_name,
      sex: param.sex
    }).then(res => {
      if (res.code == 0) {
        message.success("用户信息修改成功");
        _get_userInfo().then(c => {
          this.editForm(false);
        });
      } else {
        message.warn(res.message);
      }
    });
  };
  //更新资料
  changePhoneForm = e => {
    let { bindPhoneParam } = this.state;
    bindPhoneParam[e.target.name] = e.target.value;
    this.setState({
      bindPhoneParam: { ...bindPhoneParam }
    });
  };
  //获取验证码
  getPhoneCode = () => {
    let { bindPhoneParam } = this.state;
    if (this.state.time > 0) return false;
    const myreg = /^[1][3-9][0-9]{9}$/;
    if (!myreg.test(bindPhoneParam.phone)) {
      message.error("请输入正确的手机号码");
      return false;
    }
    HTTP._send_phone_code({
      phone: bindPhoneParam.phone,
      code_type: 3
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          time: 60
        });
      } else {
        message.error(res.message);
      }
    });
  };
  //验证码时间监控
  changeTime = () => {
    let { time } = this.state;
    clearTimeout(this.timeOut);
    if (time > 0) {
      this.setState({
        time: time - 1
      });
      this.timeOut = setTimeout(this.changeTime, 1000);
    }
  };
  //绑定手机
  changeMyPhone = () => {
    message.info("没有绑定手机接口");
  };
  render() {
    const { userInfo } = this.props.base;
    let { edit, bindPhoneVisible, param, bindPhoneParam } = this.state;
    let icon = param.icon;
    if (!icon && userInfo) {
      icon = userInfo.icon;
    }
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
              <span className="l-value">{userInfo.real_name || "未填写"}</span>
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
            {/* <div className="me-info-row">
              <label className="l-label">微信</label>
              <span className="l-value weixin">
                <span className="icon">
                  <Icon type="wechat" />
                </span>
                绑定微信后可以直接微信登录
              </span>
            </div> */}
            <div className="me-info-row">
              <label className="l-label">手机</label>
              <span className="l-value phone">
                <span className="icon">
                  <Icon type="mobile" />
                </span>
                {userInfo.phone ? (
                  <label>{userInfo.phone}</label>
                ) : (
                  <label>绑定手机后可以直接使用手机号码登录</label>
                )}
              </span>
            </div>
            {/* <div className="me-info-row">
              <label className="l-label">邮箱</label>
              <span className="l-value email">
                <span className="icon">
                  <Icon type="mail" />
                </span>
                绑定邮箱后可以直接使用邮箱登录
              </span>
            </div> */}
          </div>
          <div className="center-meinfo-actions">
            <button onClick={this.editForm.bind(this, true)}>编辑 Edit</button>
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
                <div className="user-cover-parent">
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://rds.abcvote.cn/api/system/file/upload"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    <div className="user-cover-row">
                      <div className="cover">
                        <img src={Util.transImgUrl(icon)} alt="avatar" style={{ width: "100%" }} />
                      </div>
                      <span className="link">更换头像</span>
                    </div>
                  </Upload>
                </div>
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">用户名</label>
              <span className="l-value">{param.account}</span>
            </div>
            <div className="me-info-row">
              <label className="l-label">真实姓名</label>
              <span className="l-value">
                <input
                  type="text"
                  name="real_name"
                  value={param.real_name || ""}
                  onChange={this.changeForm}
                  className="form-input"
                />
              </span>
            </div>
            <div className="me-info-row">
              <label className="l-label">性别</label>
              <span className="l-value">
                <Radio.Group onChange={this.onChangeSex} value={param.sex || 0}>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              </span>
            </div>
            {/* <div className="me-info-row">
              <label className="l-label">微信</label>
              <span className="l-value weixin">
                <span className="icon">
                  <Icon type="wechat" />
                </span>
                <span className="link">立即绑定</span>
              </span>
            </div> */}
            <div className="me-info-row">
              <label className="l-label">手机</label>
              <span className="l-value phone">
                <span className="icon">
                  <Icon type="mobile" />
                </span>
                {param.phone ? (
                  <span>
                    <label style={{ marginRight: "10px" }}>{param.phone}</label>
                    <span className="link" onClick={this.showPhoneModal}>
                      修改手机
                    </span>
                  </span>
                ) : (
                  <span className="link" onClick={this.showPhoneModal}>
                    立即绑定
                  </span>
                )}
              </span>
            </div>
            {/* <div className="me-info-row">
              <label className="l-label">邮箱</label>
              <span className="l-value">
                <input type="text" name="mail" className="form-input" />
              </span>
            </div> */}
          </div>
          <div className="center-meinfo-actions">
            <button onClick={this.changeMeinfo}>提交 Submission</button>
            <button className="cancel" onClick={this.editForm.bind(this, false)}>
              取消 Cancel
            </button>
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
              <img src={Util.transImgUrl(userInfo.icon)} alt="" />
            </div>
            <div className="nickname">
              <label>您好，{userInfo.nick_name}</label>
              欢迎来到中国问题研究文献出版目录及服务平台！
            </div>
          </div>
          <div className="meinfo-row-2">
            {userInfo.start_time && userInfo.end_time ? (
              <span>
                账户包库时长： {userInfo.start_time} - {userInfo.end_time}
              </span>
            ) : (
              <span>账户包库时长： 无</span>
            )}
            <button className="recharge" onClick={this.props.changeType.bind(this, "purchase")}>
              充值 Recharge
            </button>
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
                      <input
                        type="text"
                        name="phone"
                        value={bindPhoneParam.phone || ""}
                        onChange={this.changePhoneForm}
                        placeholder="请输入正确的手机号码"
                      />
                    </div>
                  </div>
                  <div className="phone-row">
                    <div className="phone-label">
                      <p>短信验证码</p>
                      <p>get verification code</p>
                    </div>
                    <div className="phone-control">
                      <input
                        type="text"
                        name="code"
                        value={bindPhoneParam.code || ""}
                        onChange={this.changePhoneForm}
                        placeholder="请输入验证码"
                      />

                      {this.state.time ? (
                        <div className="send-btn dis">
                          <p>验证码已发送</p>
                          <p>{this.state.time}s</p>
                        </div>
                      ) : (
                        <div className="send-btn" onClick={this.getPhoneCode}>
                          <p>获取验证码</p>
                          <p>get verification code</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="phone-button">
                    <button onClick={this.changeMyPhone}>确定 Sure</button>
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
