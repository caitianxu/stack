import React, { Component } from "react";
import Menus from "./Menus";
import { Link } from "react-router-dom";
import TopSearch from "./TopSearch";
import HTTP from "../../script/service";
import { withRouter } from "react-router-dom";
import Util from "../../script/util";

class Plan3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swIndex: 0,
      scrollIndex: 0,
      bottomContent: [],
      topContent: []
    };
  }
  //改变选中图书
  changeSwIndex = index => {
    this.setState({
      swIndex: index
    });
  };
  //修改图书定位
  changeBookScroll = index => {
    let { swIndex, bottomContent, scrollIndex } = this.state;
    if (scrollIndex + index < 0) {
      return false;
    }
    if (bottomContent.length < 5) return false;
    scrollIndex = Math.abs(scrollIndex + index);
    if (scrollIndex > bottomContent.length - 5) {
      scrollIndex = bottomContent.length - 5;
    }

    if (swIndex < scrollIndex) {
      swIndex = scrollIndex;
    } else if (swIndex - scrollIndex > 4) {
      swIndex -= 1;
    }
    this.setState({
      scrollIndex: scrollIndex,
      swIndex: swIndex
    });
  };
  //图书详情
  activeToBook = item => {
    this.props.history.push(`/book?id=${item.res_id}`);
  };
  componentDidMount() {
    HTTP._web_index_3().then(res => {
      let { topContent, bottomContent } = res.data;
      if (topContent.length > 3) {
        topContent = topContent.slice(-3);
      }
      console.log("plan3", topContent, bottomContent);
      this.setState({
        topContent: topContent,
        bottomContent: bottomContent
      });
    });
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { swIndex, scrollIndex, topContent, bottomContent } = this.state;
    return (
      <div className="plan plan-3" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="papers" />
            <div className="p3-content">
              <div className="p3-list">
                {topContent &&
                  topContent.length &&
                  topContent.map((top, index) => {
                    return (
                      <div className="con-row-item" key={`top-${index}`}>
                        <Link to={`/paper?id=${top.res_id}&type=6`} className="title">
                          {top.title}
                        </Link>
                        <div className="desc">
                          {top.author} {top.pubdate}
                        </div>
                        <div className="remark">{top.remark}</div>
                      </div>
                    );
                  })}
                {topContent && topContent.length ? (
                  <div className="row-more">
                    <Link to="/papers">MORE >></Link>
                  </div>
                ) : null}
              </div>
              <div className="p3-sw">
                <div className="sw-left">
                  <span onClick={this.changeBookScroll.bind(this, -1)}></span>
                </div>
                <div className="sw-content">
                  <div
                    className="books"
                    ref={el => (this.booksElement = el)}
                    style={{ transform: `translateX(${scrollIndex * -200}px)` }}
                  >
                    {bottomContent.map((item, index) => {
                      return (
                        <div
                          key={`sw-${index}`}
                          className={index == swIndex ? "book active" : "book"}
                          onMouseOver={this.changeSwIndex.bind(this, index)}
                        >
                          <div className="cover" onClick={this.activeToBook.bind(this, item)}>
                            <img alt="" src={Util.transImgUrl(item.cover)}/>
                            <div className="detail">
                              <h3>书名：{item.title}</h3>
                              {item.author ? <p>作者：{item.author}</p> : ''}
                              {item.isbn ? <p>ISBN：{item.isbn}</p> : ''}
                              {item.pubdate ? <p>出版日期：{item.pubdate}</p> : ''}
                              {item.bookcat ? <p>分类号：{item.bookcat}</p> : ''}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="sw-right">
                  <span onClick={this.changeBookScroll.bind(this, 1)}></span>
                </div>
              </div>
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default withRouter(Plan3);
