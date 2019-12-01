import React, { Component } from "react";
import Menus from "./Menus";
import { Link } from "react-router-dom";
import TopSearch from "./TopSearch";

class Plan3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swIndex: 2,
      scrollIndex: 0,
      swData: [
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        },
        {
          title: "书名：利维坦美国捕鲸史"
        }
      ]
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
    let { swIndex, swData, scrollIndex } = this.state;
    if (scrollIndex + index < 0) {
      return false;
    }
    scrollIndex = Math.abs(scrollIndex + index);
    if (scrollIndex > swData.length - 5) {
      scrollIndex = swData.length - 5;
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
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { swIndex, swData, scrollIndex } = this.state;
    return (
      <div className="plan plan-3" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="papers"/>
            <div className="p3-content">
              <div className="p3-list">
                <div className="con-row-item has-footer">
                  <div className="title">
                    超越经学,回归子学:现代儒学的思想形态选择
                  </div>
                  <div className="desc">郑小军.文史哲:1-13[2019-07-10]</div>
                  <div className="remark">
                    儒学现代发展落定在经学形态的两个理由,一是儒家经典的政治权威性,二是经学曾经发挥的政治整合作用.这两个理由既有事实依据,也有内在限制:它经学曾经发挥的政治整合作用符合经学的历史真实,但它与儒学的现实处境相左儒的政
                  </div>
                </div>
                <div className="con-row-item has-footer">
                  <div className="title">
                    上博简《孔子诗论》的论诗特色及其作者问题
                  </div>
                  <div className="desc">
                    高华平.华中师范大学学报(人文社会科学版),2019
                  </div>
                  <div className="remark">
                    儒学现代发展落定在经学形态的两个理由,一是儒家经典的政治权威性,二是经学曾经发挥的政治整合作用.这两个理由既有事实依据,也有内在限制:它经学曾经发挥的政治整合作用符合经学的历史真实,但它与儒学的现实处境相左儒的政
                  </div>
                </div>
                <div className="con-row-item">
                  <div className="title">
                    儒家伦理思想融入高校“思政”课教学研究——以“思修”课为例
                  </div>
                  <div className="desc">廖孝英.科教文汇(下旬刊) 2019年06期</div>
                  <div className="remark">
                    儒学现代发展落定在经学形态的两个理由,一是儒家经典的政治权威性,二是经学曾经发挥的政治整合作用.这两个理由既有事实依据,也有内在限制:它经学曾经发挥的政治整合作用符合经学的历史真实,但它与儒学的现实处境相左儒的政
                  </div>
                </div>
                <div className="row-more">
                  <Link to="/index">MORE >></Link>
                </div>
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
                    {swData.map((item, index) => {
                      return (
                        <div
                          key={`sw-${index}`}
                          className={index == swIndex ? "book active" : "book"}
                          onMouseOver={this.changeSwIndex.bind(this, index)}
                        >
                          <div className="cover">
                            <img alt="" src="/assets/img/book.png" />
                            <div className="detail">
                              <h3>书名：利维坦美国捕鲸史</h3>
                              <p>作者：埃里克·杰·多林</p>
                              <p>ISBN：978-7-300-2677</p>
                              <p>出版日期：2019-6-30</p>
                              <p>分类号：D669</p>
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

export default Plan3;
