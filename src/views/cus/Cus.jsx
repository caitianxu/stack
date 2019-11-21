import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./Cus.scss";
import { _get_url_search } from "../../store/Action";

class Cus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState()
    };
    store.subscribe(this.storeChange);
  }
  //更新store
  storeChange = () => {
    this.setState({
      base: store.getState()
    });
  };
  //销毁
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  componentDidMount() {
    _get_url_search(param => {
      if (param.type == "feeback") {
        document.documentElement.scrollTop = 1065;
      }
    });
  }
  render() {
    const { base } = this.state;
    return (
      <div className="cus-page">
        <div className="page-main page-main-1">
          <Header base={base} />
          <div className="cus-content">
            <ul className="menus">
              <li>
                <Link to="/about">
                  <h3>关于我们</h3>
                  <p>About us</p>
                </Link>
              </li>
              <li>
                <Link to="/des">
                  <h3>产品介绍</h3>
                  <p>Product description</p>
                </Link>
              </li>
              <li>
                <Link to="/help">
                  <h3>帮助中心</h3>
                  <p>Help</p>
                </Link>
              </li>
              <li className="active">
                <h3>联系我们</h3>
                <p>Contact us</p>
              </li>
            </ul>
            <div className="remark">
              <div className="title">
                <h3>联系方式</h3>
                <p>Contact information</p>
              </div>
              <div className="link-content">
                <div className="link-item">
                  <div className="style-border">
                    <i className="style-1"></i>
                    <i className="style-2"></i>
                    <i className="style-3"></i>
                    <i className="style-4"></i>
                  </div>
                  <div className="link-detail">
                    <h3>电话</h3>
                    <p>电话咨询：010-62515610</p>
                  </div>
                </div>
                <div className="link-item">
                  <div className="style-border">
                    <i className="style-1"></i>
                    <i className="style-2"></i>
                    <i className="style-3"></i>
                    <i className="style-4"></i>
                  </div>
                  <div className="link-detail">
                    <h3>QQ</h3>
                    <p>QQ：13607571</p>
                  </div>
                </div>
                <div className="link-item">
                  <div className="style-border">
                    <i className="style-1"></i>
                    <i className="style-2"></i>
                    <i className="style-3"></i>
                    <i className="style-4"></i>
                  </div>
                  <div className="link-detail">
                    <h3>邮箱</h3>
                    <p>邮箱咨询：rd100@crup.com.cn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-main page-main-2">
          <div className="cus-content">
            <div className="remark">
              <div className="title">
                <h3>意见反馈</h3>
                <p>Feedback</p>
              </div>
              <div className="detail">
                <div className="form-row">
                  <textarea placeholder=" 如果您在使用网站的过程中遇到疑问，或者有任何的意见或者建议，欢迎随时向我们反馈。我们会尽快回答您的问题，并依据您的反馈，不断完善网站。"></textarea>
                </div>
                <div className="form-control">
                  <label>
                    <em>*</em>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="建议留下常用的邮箱或手机号，方便我们及时回复您"
                  />
                </div>
                <div className="form-control">
                  <label>
                    <em>*</em>联系方式：
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="建议留下常用的邮箱或手机号，方便我们及时回复您"
                  />
                </div>
              </div>
              <div className="actions">
                <button>提交 Submit</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Cus;
