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
    this.setState({
      visible: false
    });
  };
  getPayState = () => {
    HTTP._pay_order_state({
      order_no: this.state.pay_order_no
    }).then(res => {
      console.log("支付状态", res);
      if (res.code == 0) {
        message.success("支付成功");
        this.hideModal();
        this.props.paySuccess();
      } else {
        setTimeout(this.getPayState, 2000);
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
          width="500px"
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
                  <h3>
                    微信支付 <label>WechatPay</label>
                  </h3>
                  <span className="close" onClick={this.hideModal}>
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="weixin-pay-con">
                <div className="qcode">
                  <QRCode
                    value={qr_code}
                    size={200}
                    bgColor={"#d5d5ff"}
                    fgColor={"#2f2765"}
                  />
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
