import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";
import HTTP from "../../script/service";
import Util from "../../script/util";

class Plan4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftContent: [],
      rightContent: [],
      rindex: 0
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
  changeRindex = n => {
    let { rindex, rightContent } = this.state;
    rindex = rindex + n;
    if (rindex > rightContent.length - 1) {
      rindex = 0;
    }
    if (rindex < 0) {
      rindex = rightContent.length - 1;
    }
    this.setState({
      rindex: rindex
    });
  };
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { leftContent, rightContent, rindex } = this.state;
    let rightItem = null;
    if (rightContent.length) {
      rightItem = rightContent[rindex];
    }
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
                        <Link to={`/policy?id=${item.res_id}`}>
                          {item.title}
                        </Link>
                      </dd>
                    </dl>
                  );
                })}
                <div className="content-more">
                  <Link to="/policys">MORE >></Link>
                </div>
              </div>
              {rightItem ? (
                <div className="content-right">
                  <div className="cm1">
                    <div className="cm1-border">
                      <p className="p1">{rightContent.pubunit}</p>
                      <p className="p2">{rightItem.title}</p>
                    </div>
                    <div className="cm1-footer">
                      <span
                        className="cm1-left"
                        onClick={this.changeRindex.bind(this, -1)}
                      ></span>
                      <span
                        className="cm1-right"
                        onClick={this.changeRindex.bind(this, 1)}
                      ></span>
                    </div>
                  </div>
                  <div className="cm2">
                    {rightItem.bookList &&
                      rightItem.bookList.map((item, index) => {
                        return (
                          <Link
                            to={`/book?id=${item.book_id}`}
                            className="book"
                            key={`book-${index}`}
                          >
                            <img alt="" src={Util.transImgUrl(item.cover)} />
                          </Link>
                        );
                      })}
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

export default Plan4;
