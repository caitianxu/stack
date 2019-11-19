import React, { Component } from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";

class TopSearch extends Component {
  render() {
    const { base } = this.props;
    return (
      <div className="plan-top">
        <span className="logo"></span>
        <div className="top-right-col">
          <div className="top-search">
            <input
              type="text"
              placeholder="请输入您要搜索的关键词 Please enter the search content"
            />
            <Icon type="search" />
          </div>
          <div className="master-search">
            高级搜索Advanced
            <Icon type="right" />
          </div>
          {base && base.userInfo ? (
            <div className="lr-col">
              <Link to="/center">你好，{base.userInfo.nick_name}</Link>
            </div>
          ) : (
            <div className="lr-col">
              <Link to="/login">登录 Login</Link>/
              <Link to="/regist">注册 Register</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TopSearch;
