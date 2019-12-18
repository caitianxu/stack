import React, { Component } from "react";
import { Icon, message } from "antd";
import Pay from "../../components/pay/Pay";
import HTTP from "../../script/service";

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pay_order_no: null,
      qr_code: null,
      visible: false,
      payType: 1, // 1支付宝 2微信
      payArray: [
        {
          id: 1,
          price: 150,
          label: "推荐",
          name: "1个月150元"
        },
        {
          id: 3,
          price: 360,
          label: "推荐",
          name: "3个月360元"
        },
        {
          id: 6,
          price: 630,
          label: "特惠",
          name: "6个月630元"
        },
        {
          id: 12,
          price: 960,
          label: "超值",
          name: "12个月960元"
        }
      ],
      selPrice: {
        id: 1,
        price: 150,
        label: "推荐",
        name: "1个月150元"
      }
    };
  }
  submitPay = () => {
    HTTP._pay_order().then(res => {
      if (res.code == 0) {
        this.setState(res.data);
        this.payElement.showModal(res.data);
      } else {
        message.warn(res.message);
      }
    });
  };
  //价格
  onChangePrice = item => {
    this.setState({
      selPrice: { ...item }
    });
  };
  //方式
  changePayType = n => {
    this.setState({
      payType: n
    });
  };
  paySuccess = () => {
    console.log("支付成功======================================>回调主页面");
  };
  render() {
    const { userInfo } = this.props.base;
    const { payArray, selPrice, payType } = this.state;
    return (
      <div className="center-purchase-detail">
        <div className="center-page-title">在线充值 Purchase permission</div>
        <div className="center-purchase-header">
          <div className="header-row">
            <label className="row-label">账户包库时长：</label>
            <div className="row-value">2017.08.10 - 2019.10.10</div>
          </div>
          {/* <div className="header-row">
            <label className="row-label">账户余额：</label>
            <div className="row-value">
              <span className="col">
                <label className="txt">0</label>元
              </span>
              <span className="link">充值卡充值</span>
            </div>
          </div> */}
        </div>
        <div className="center-meinfo-detail">
          <div className="me-info-row">
            <label className="l-label">当前账号</label>
            <span className="l-value">{userInfo.account}</span>
          </div>
          <div className="me-info-row">
            <label className="l-label">VIP畅读</label>
            <span className="l-value">
              <div className="prices-all">
                {payArray.map((item, index) => {
                  return (
                    <div
                      className={`price-col ${selPrice.id == item.id ? "active" : ""}`}
                      onClick={this.onChangePrice.bind(this, item)}
                      key={`acc-${index}`}
                    >
                      <label>{item.label}</label>
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </span>
          </div>
          <div className="me-info-row">
            <label className="l-label">应付金额</label>
            <span className="l-value">
              <div className="pay-value">
                <label>{selPrice.price}</label>
                <span>元</span>
              </div>
            </span>
          </div>
          <div className="me-info-row">
            <label className="l-label">支付方式</label>
            <span className="l-value">
              <div className="pay-types">
                <span
                  className={`pay-type alipay ${payType == 1 ? "active" : ""}`}
                  onClick={this.changePayType.bind(this, 1)}
                >
                  <label className="bg">
                    <Icon type="alipay-circle" />
                  </label>
                  支付宝
                </span>
                <span
                  className={`pay-type weixinpay ${payType == 2 ? "active" : ""}`}
                  onClick={this.changePayType.bind(this, 2)}
                >
                  <label className="bg">
                    <Icon type="wechat" />
                  </label>
                  微信
                </span>
                {/* <span className="pay-type yuepay">
                  <label className="bg">
                    <Icon type="pay-circle" theme="filled" />
                  </label>
                  余额
                </span> */}
              </div>
            </span>
          </div>
        </div>
        <div className="center-meinfo-actions">
          <button onClick={this.submitPay}>确认支付 Confirm payment</button>
        </div>
        <Pay ref={el => (this.payElement = el)} paySuccess={this.paySuccess} />
      </div>
    );
  }
}

export default Purchase;
