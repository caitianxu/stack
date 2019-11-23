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
                to="/pager"
                isActive={this.oddEvent.bind(this, "/pager")}
              >
                论文Paper
              </NavLink>
            </li>
            <li>
              <NavLink to="/book" isActive={this.oddEvent.bind(this, "/book")}>
                图书Book
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/policy"
                isActive={this.oddEvent.bind(this, "/policy")}
              >
                政策Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/expert"
                isActive={this.oddEvent.bind(this, "/expert")}
              >
                专家Expert
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mechanism"
                isActive={this.oddEvent.bind(this, "/mechanism")}
              >
                机构Mechanism
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/topic"
                isActive={this.oddEvent.bind(this, "/topic")}
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
