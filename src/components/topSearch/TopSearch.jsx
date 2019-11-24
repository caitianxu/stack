import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import Share from "../share/Share";
import "./TopSearch.scss";

const urls = ["/search?type=paper", "/search?type=book", "/search?type=policy", "/search?type=mechanism", "/search?type=expert"];
class TopSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  keywordSearch = e => {
    if (e.nativeEvent.keyCode && e.nativeEvent.keyCode != 13) return false;
    this.props.setSearchParam("keyword", this.searchElement.value);
  };
  searchReset = () => {
    this.searchElement.value = "";
    this.props.searchReset();
  };
  render() {
    const { tabIndex, searchArray, setSearchParam } = this.props;
    return (
      <div className="top-search-com">
        <div className="search-header">
          <div className="search-input">
            <input type="search" ref={el => (this.searchElement = el)} placeholder="请输入您要搜索的关键词 Please enter the search content" onKeyPress={this.keywordSearch} />
            <Icon type="search" onClick={this.keywordSearch} />
          </div>
          <Link to={urls[tabIndex - 1]} className="link">
            高级搜索Advanced >
          </Link>
        </div>
        <div className="search-footer">
          <dl>
            <dt>检索条件：</dt>
            <dd>
              {searchArray.map((item, index) => {
                return (
                  <div className="s-item" key={`search-${index}`}>
                    <span className="name">
                      {item.name}：{item.value}
                    </span>
                    <span className="close" onClick={setSearchParam.bind(this, item.key, null)}>
                      <Icon type="close" />
                    </span>
                  </div>
                );
              })}
            </dd>
          </dl>
          <div className="search-actions">
            <span className="action" onClick={this.searchReset}>
              <span className="icon">
                <Icon type="delete" />
              </span>
              清空
            </span>
            <span className="action">
              <Share />
            </span>
          </div>
        </div>
        <div className="search-tabs">
          <Link className={tabIndex == 1 ? "tab active" : "tab"} to="/paper">
            论文Paper
          </Link>
          <Link className={tabIndex == 2 ? "tab active" : "tab"} to="/book">
            图书Books
          </Link>
          <Link className={tabIndex == 3 ? "tab active" : "tab"} to="/policy">
            政策Policy
          </Link>
          <Link className={tabIndex == 4 ? "tab active" : "tab"} to="/mechanism">
            机构Mechanism
          </Link>
          <Link className={tabIndex == 5 ? "tab active" : "tab"} to="/expert">
            专家Expert
          </Link>
        </div>
      </div>
    );
  }
}

export default TopSearch;
