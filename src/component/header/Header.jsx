import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="com-header">
        <div className="content">
          <a href="/index" className="logo">&nbsp;</a>
          <ul className="menu">
            <li>
              <a href="/index">首页Home</a>
            </li>
            <li>
              <a href="/index">论文Paper</a>
            </li>
            <li>
              <a href="/index">图书Book</a>
            </li>
            <li>
              <a href="/index">政策Policy</a>
            </li>
            <li>
              <a href="/index">专家Expert</a>
            </li>
            <li>
              <a href="/index">机构Mechanism</a>
            </li>
            <li>
              <a href="/index">专题Special Topic</a>
            </li>
          </ul>

          <div className="actions">
            <a href="/login">登录 Login</a>/<a href="/register">注册 Register</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
