import React, { Component } from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";

class TopSearch extends Component {
  render() {
    let { base, url } = this.props;
    if (!url) {
      url = "paper";
    }
    return (
      <div className="plan-top">
        <span className="logo"></span>
        <div className="top-right-col">
          <div className="top-search">
            <input type="text" placeholder="请输入您要搜索的关键词 Please enter the search content" />
            <Icon type="search" />
          </div>
          <Link className="master-search" to={`/search?type=${url}`}>
            高级搜索Advanced
            <Icon type="right" />
          </Link>
          {base && base.userInfo ? (
            <div className="lr-col">
              <Link to="/center">你好，{base.userInfo.nick_name}</Link>
            </div>
          ) : (
            <div className="lr-col">
              <Link to="/login">登录 Login</Link>/<Link to="/regist">注册 Register</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TopSearch;
