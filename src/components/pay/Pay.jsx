import React, { Component } from "react";
import { Modal, Icon } from "antd";
import QRCode from "qrcode-react";
import "./Pay.scss";
import HTTP from "../../script/service";
import { message } from "antd";

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  showModal = param => {
    this.setState(
      {
        visible: true,
        ...param
      },
      () => {
        this.getPayState();
      }
    );
  };
  hideModal = () => {
    clearTimeout(this.timeout);
    this.setState({
      visible: false
    });
  };
  getPayState = () => {
    clearTimeout(this.timeout);
    if (!this.state.visible) {
      return;
    }
    HTTP._pay_order_state({
      order_no: this.state.pay_order_no
    }).then(res => {
      if (res.code == 0) {
        message.success("支付成功");
        this.hideModal();
        this.props.paySuccess();
      } else {
        this.timeout = setTimeout(this.getPayState, 2000);
      }
    });
  };
  render() {
    const { visible, qr_code } = this.state;
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
          width="350px"
          onCancel={this.hideModal}
        >
          <div className="modal-parent-plan weixin-pay-plan">
            <div className="style-border">
              <i className="style-1"></i>
              <i className="style-2"></i>
              <i className="style-3"></i>
              <i className="style-4"></i>
            </div>
            <div className="modal-parent-content">
              <div className="modal-content-header">
                <div className="header-title">
                  {this.props.payType == 1 ? (
                    <h3>
                      阿里支付 <label>AliPay</label>
                    </h3>
                  ) : (
                    <h3>
                      微信支付 <label>WechatPay</label>
                    </h3>
                  )}
                  <span className="close" onClick={this.hideModal}>
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="weixin-pay-con">
                <div className="qcode">
                  <QRCode value={qr_code} size={268} fgColor={"#7e332e"} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Pay;
