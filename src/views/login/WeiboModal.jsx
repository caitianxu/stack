import React, { Component } from "react";
import { Modal, Icon } from "antd";
import { _set_token } from "../../store/Action";
import Util from "../../script/util";

class WeiboModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      url: ""
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
      url:
        `https://api.weibo.com/oauth2/authorize?client_id=297740094&response_type=code&redirect_uri=rds.abcvote.cn/api/web/weibo/login&time=` +
        new Date()
    });
    window.loginSuccess = token => {
      if (typeof token === "string") {
        console.log("token", token);
        Util.setCookie("token", token);
        _set_token(token).then(res => {
          this.props.loginSuccess();
        });
      }
    };
    if (window.addEventListener) {
      window.addEventListener("message", window.loginSuccess);
    } else {
      window.attachEvent("onmessage", window.loginSuccess);
    }
  };
  hideModal = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { visible, url } = this.state;
    return (
      <div>
        {/* 绑定手机 */}
        <Modal
          visible={visible}
          wrapClassName="daidai-modal-style"
          centered={true}
          closable={false}
          footer={null}
          keyboard={false}
          maskClosable={true}
          width="700px"
          onCancel={this.hideModal}
        >
          <div className="modal-parent-plan weixin-login-plan">
            <div className="style-border">
              <i className="style-1"></i>
              <i className="style-2"></i>
              <i className="style-3"></i>
              <i className="style-4"></i>
            </div>
            <div className="modal-parent-content">
              <div className="modal-content-header">
                <div className="header-title">
                  <h3>微博登录</h3>
                  <span className="close" onClick={this.hideModal}>
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="weixin-login-con">
                {visible ? (
                  <iframe
                    src={url}
                    title="微博登录"
                    scrolling="no"
                    frameBorder="0"
                    width="684px"
                    height="350px"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default WeiboModal;
