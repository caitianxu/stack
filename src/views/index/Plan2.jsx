import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";
import HTTP from "../../script/service";

class Plan2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleIndex: 0,
      bookIndex: 0,
      pData: []
    };
  }
  componentDidMount() {
    this.scrollLeft = 0;
    HTTP._web_index_2().then(res => {
      console.log("plan2", res.data);
      this.setState({
        titleIndex: 0,
        bookIndex: 0,
        pData: [...res.data]
      });
    });
  }
  //改变title
  changeTitleIndex = index => {
    this.setState({
      titleIndex: index,
      bookIndex: 0
    });
    //改变头部定位
    if (!this.titleScrollElement) return false;
    if (this.titleScrollElement.clientWidth < 1150) return false;
    let allWidth = (this.titleScrollElement.clientWidth - 1150) * -1;
    let dom = document.querySelectorAll(".scroll-content span")[index];
    if (Math.abs(dom.offsetLeft + this.scrollLeft) > 900) {
      this.scrollLeft -= 200;
      if (this.scrollLeft < allWidth) {
        this.scrollLeft = allWidth;
      }
      this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
    } else if (this.scrollLeft < 0 && this.scrollLeft + dom.offsetLeft < 200) {
      this.scrollLeft += 200;
      if (this.scrollLeft > 0) {
        this.scrollLeft = 0;
      }
      this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
    }
  };
  //左移动
  changeScrollLeft = () => {
    if (!this.titleScrollElement) return false;
    if (this.titleScrollElement.clientWidth < 1150) return false;
    let allWidth = (this.titleScrollElement.clientWidth - 1150) * -1;
    this.scrollLeft -= 1150;
    if (this.scrollLeft < allWidth) {
      this.scrollLeft = allWidth;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  //右移动
  changeScrollRight = () => {
    if (!this.titleScrollElement) return false;
    if (this.titleScrollElement.clientWidth < 1150) return false;
    this.scrollLeft += 1150;
    if (this.scrollLeft > 0) {
      this.scrollLeft = 0;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  //左移动/右移动
  changeBookIndex = n => {
    let { titleIndex, bookIndex, pData } = this.state;
    bookIndex = bookIndex + n;
    if (bookIndex >= pData[titleIndex].book.length) {
      bookIndex = pData[titleIndex].book.length - 1;
    }
    if (bookIndex < 0) {
      bookIndex = 0;
    }
    this.setState({
      bookIndex: bookIndex
    });
  };
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { titleIndex, bookIndex, pData } = this.state;
    return (
      <div className="plan plan-2" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="papers" />
            <div className="row-scroll">
              <span className="scroll-left"></span>
              <div className="scroll-plan">
                <span className="acc-left" onClick={this.changeScrollRight}></span>
                <div className="scroll-border">
                  <div className="scroll-content" ref={el => (this.titleScrollElement = el)}>
                    {pData.map((item, index) => {
                      return (
                        <span
                          key={`title-${index}`}
                          className={index == titleIndex ? "active" : null}
                          onClick={this.changeTitleIndex.bind(this, index)}
                        >
                          {item.country}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <span className="acc-right" onClick={this.changeScrollLeft}></span>
              </div>
              <span className="scroll-right"></span>
            </div>
            <div className="tab-content-plan">
              <div className="content-left">
                {pData.length &&
                  pData[titleIndex].journal &&
                  pData[titleIndex].journal.map((item, index) => {
                    return (
                      <Link
                        to={`/paper?id=${item.res_id}&type=6`}
                        key={`row-${index}`}
                        className="link-item"
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                {/* 更多操作 */}
                {pData.length &&
                pData[titleIndex].journal &&
                pData[titleIndex].journal &&
                pData[titleIndex].journal.length >= 10 ? (
                  <div className="more-action">
                    <Link to="/papers">MORE>></Link>
                  </div>
                ) : null}
              </div>
              {pData.length && pData[titleIndex].book && pData[titleIndex].book.length ? (
                <div className="content-right">
                  <div className="sw-left">
                    <span onClick={this.changeBookIndex.bind(this, -1)}></span>
                  </div>
                  <div className="sw-content">
                    <div className="sw-html">
                      <h3>{pData[titleIndex].country}</h3>
                      <div className="sw-scroll">
                        <div
                          className="sw-scroll-list"
                          style={{ transform: `translateX(${bookIndex * -300}px)` }}
                        >
                          {pData[titleIndex].book.map((book, index) => {
                            return (
                              <Link to={`/book?id=${book.res_id}`} className="sw-book" key={`book-${index}`}>
                                <div className="cover">
                                  <img alt="" src="/assets/img/book.png" />
                                </div>
                                <div className="name">书名：{book.title}</div>
                                <p>作者：{book.author}</p>
                                <p>ISBN：{book.isbn}</p>
                                <p>出版日期：{book.pubdate}</p>
                                <p>分类号：{book.bookcat}</p>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sw-right">
                    <span onClick={this.changeBookIndex.bind(this, 1)}></span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default Plan2;
