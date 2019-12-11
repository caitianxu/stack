import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";
import HTTP from "../../script/service";

class Plan4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftContent: [],
      rightContent: []
    };
  }
  componentDidMount() {
    HTTP._web_index_4().then(res => {
      console.log("plan4", res.data);
      let { leftContent, rightContent } = res.data;
      this.setState({
        leftContent: leftContent,
        rightContent: rightContent
      });
    });
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { leftContent } = this.state;
    return (
      <div className="plan plan-4" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="books" />
            <div className="plan-content">
              <div className="content-left">
                {leftContent.map((item, index) => {
                  return (
                    <dl className="content-item" key={`item-${index}`}>
                      <dt>{item.pubdate}</dt>
                      <dd>
                        <Link to={`/policy?id=${item.res_id}`}>{item.title}</Link>
                      </dd>
                    </dl>
                  );
                })}
                <div className="content-more">
                  <Link to="/policys">MORE >></Link>
                </div>
              </div>
              <div className="content-right">
                <div className="cm1">
                  <div className="cm1-border">
                    <p className="p1">江苏人民出版社</p>
                    <p className="p2">海外中国研究丛书</p>
                  </div>
                  <div className="cm1-footer">
                    <span className="cm1-left"></span>
                    <span className="cm1-right"></span>
                  </div>
                </div>
                <div className="cm2">
                  <div className="book">
                    <img alt="" src="/assets/img/book.png" />
                  </div>
                  <div className="book">
                    <img alt="" src="/assets/img/book.png" />
                  </div>
                  <div className="book">
                    <img alt="" src="/assets/img/book.png" />
                  </div>
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

export default Plan4;
