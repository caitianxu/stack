import React, { Component } from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className="com-footer">
        <div className="content">
          <ul className="col-1">
            <div className="logo"></div>
            <p>电话：010-62515610</p>
            <p>邮箱：rd100@crup.com.cn</p>
            <p>地址：北京市海淀区中关村大街31号</p>
            <p>备案号：京ICP备10054422号-16</p>
          </ul>
          <ul className="col-2">
            <Link className="h3" to="/about">关于我们 About Us</Link>
            <p>
              <a href="/">中国问题研究文献出版目录及服务平台</a>
            </p>
            <p>
              <a href="/">中国审判案例数据库</a>
            </p>
            <p>
              <a href="/">中国思想与文化名家数据库</a>
            </p>
            <p>
              <a href="/">中国哲学社科文库</a>
            </p>
            <p>
              <a href="/">中国人民大学出版社</a>
            </p>
            <p>
              <a href="/">中国人大数字科技有限公司</a>
            </p>
          </ul>
          <ul className="col-3">
            <Link className="h3" to="/help">帮助中心 Help center</Link>
            <p>
              <a href="/des">使用手册</a>
            </p>
            <p>
              <a href="/cus">联系我们</a>
            </p>
            <p>
              <a href="/cus?type=feeback">意见反馈</a>
            </p>
          </ul>
          <ul className="col-4">
            <h3>关注我们 Follow us</h3>
            <p></p>
          </ul>
          <a href="link" className="friendly-link" target="_blank">
            友情链接 Friendly Link
            <span>
              <Icon type="right" />
            </span>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
