import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  //地址匹配
  oddEvent = (name, match, location) => {
    if (window.location.href.indexOf(name) != -1) {
      return true;
    }
    return false;
  };
  render() {
    const { base } = this.props;
    return (
      <div className="com-header">
        <div className="content">
          <Link to="/index" className="logo">
            &nbsp;
          </Link>
          <ul className="menu">
            <li>
              <NavLink
                to="/index"
                isActive={this.oddEvent.bind(this, "/index")}
              >
                首页Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pagers"
                isActive={this.oddEvent.bind(this, "/pagers")}
              >
                论文Paper
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" isActive={this.oddEvent.bind(this, "/books")}>
                图书Book
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/policys"
                isActive={this.oddEvent.bind(this, "/policys")}
              >
                政策Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/experts"
                isActive={this.oddEvent.bind(this, "/experts")}
              >
                专家Expert
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mechanisms"
                isActive={this.oddEvent.bind(this, "/mechanisms")}
              >
                机构Mechanism
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/topics"
                isActive={this.oddEvent.bind(this, "/topics")}
              >
                专题Special Topic
              </NavLink>
            </li>
          </ul>
          {base && base.userInfo ? (
            <div className="actions">
              <Link to="/center">你好，{base.userInfo.nick_name}</Link>
            </div>
          ) : (
            <div className="actions">
              <Link to="/login">登录 Login</Link>/
              <Link to="/regist">注册 Register</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
