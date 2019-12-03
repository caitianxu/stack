import React, { Component } from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./DetailSearch.scss";

const urls = [
  "/search?type=papers",
  "/search?type=books",
  "/search?type=policys",
  "/search?type=mechanisms",
  "/search?type=experts"
];
const purls = ["/papers", "/books", "/policys", "/mechanisms", "/experts"];
class DetailSearch extends Component {
  keywordSearch = e => {
    if (e.nativeEvent.keyCode && e.nativeEvent.keyCode != 13) return false;
    this.props.history.push(
      `${purls[this.props.tabIndex - 1]}?searchText=${this.searchElement.value}`
    );
  };
  render() {
    const { tabIndex } = this.props;
    return (
      <div className="detail-search">
        <div className="search-header">
          <div className="search-input">
            <input
              type="search"
              ref={el => (this.searchElement = el)}
              placeholder="请输入您要搜索的关键词 Please enter the search content"
              onKeyPress={this.keywordSearch}
            />
            <Icon type="search" onClick={this.keywordSearch} />
          </div>
          <Link to={urls[tabIndex - 1]} className="link">
            高级搜索Advanced >
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(DetailSearch);
