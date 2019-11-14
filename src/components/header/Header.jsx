import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="com-header">
        <div className="content">
          <Link to="/index" className="logo">
            &nbsp;
          </Link>
          <ul className="menu">
            <li>
              <Link to="/index">首页Home</Link>
            </li>
            <li>
              <Link to="/index">论文Paper</Link>
            </li>
            <li>
              <Link to="/index">图书Book</Link>
            </li>
            <li>
              <Link to="/index">政策Policy</Link>
            </li>
            <li>
              <Link to="/index">专家Expert</Link>
            </li>
            <li>
              <Link to="/index">机构Mechanism</Link>
            </li>
            <li>
              <Link to="/index">专题Special Topic</Link>
            </li>
          </ul>

          <div className="actions">
            <Link to="/login">登录 Login</Link>/
            <Link to="/regist">注册 Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
