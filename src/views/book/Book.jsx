import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import HTTP from "../../script/service";
import Share from "../../components/share/Share";
import { _get_url_search } from "../../store/Action";
import { Breadcrumb, Skeleton, Icon } from "antd";

import "./Book.scss";
import Util from "../../script/util";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      data: null
    };
    store.subscribe(this.storeChange);
  }
  //更新store
  storeChange = () => {
    this.setState({
      base: store.getState()
    });
  };
  //销毁
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  //初始化
  componentDidMount() {
    _get_url_search(param => {
      HTTP._web_book_detail({
        id: param.id
      }).then(res => {
        if (res.code == 0) {
          this.setState({
            data: res.data
          });
        }
        console.log(res.data);
      });

      HTTP._book_read({
        book_id: param.id
      }).then(res => {
        console.log("xxx", res);
      });
    });
  }

  //添加,取消收藏
  addCollect = () => {
    let { data } = this.state;
    data.collect = !data.collect;
    this.setState({
      data: { ...data }
    });
  };
  render() {
    const { base, data } = this.state;
    return (
      <div className="book-page">
        <Header base={base} />
        <DetailSearch tabIndex={2} />
        <div className="book-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/books">图书</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.book.title}</Breadcrumb.Item> : null}
            </Breadcrumb>
          </div>
          <div className="page-detail-plan">
            <Skeleton
              loading={!data}
              avatar={{ size: 300, shape: "square" }}
              paragraph={{ rows: 5 }}
            >
              {data ? (
                <div className="detail-content">
                  <div className="detail-row-1">
                    <div className="cover">
                      <img src={Util.transImgUrl(data.book.cover)} alt="" />
                    </div>
                    <div className="detail">
                      <h1>{data.book.title}</h1>
                      <div className="c-row">
                        {data.book.authors ? (
                          <div className="c-col">
                            【作者 Author】:<label>{data.book.authors}</label>
                          </div>
                        ) : null}
                        {data.book.pagecount ? (
                          <div className="c-col">
                            【页数 Pages】:<label>{data.book.pagecount}</label>
                          </div>
                        ) : null}
                        {data.book.pubunit ? (
                          <div className="c-col">
                            【出版社 Publisher】:<label>{data.book.pubunit}</label>
                          </div>
                        ) : null}
                        {data.book.clc ? (
                          <div className="c-col">
                            【分类号 CLC】:<label>{data.book.clc}</label>
                          </div>
                        ) : null}
                        {data.book.pubdate ? (
                          <div className="c-col">
                            【出版日期 Date】:<label>{data.book.pubdate}</label>
                          </div>
                        ) : null}
                        {data.book.language ? (
                          <div className="c-col">
                            【语种 Language】:<label>{data.book.language}</label>
                          </div>
                        ) : null}
                        {data.book.isbn ? (
                          <div className="c-col">
                            【ISBN】:<label>{data.book.isbn}</label>
                          </div>
                        ) : null}
                        {data.book.keywords ? (
                          <div className="c-col">
                            【关键词 Keywords】:<label>{data.book.keywords}</label>
                          </div>
                        ) : null}
                        {data.book.price ? (
                          <div className="c-col">
                            【定价 Price】:<label>{data.book.price}</label>
                          </div>
                        ) : null}
                      </div>
                      <div className="b-action">
                        <button className="b1">立即购买 Buy immediately</button>
                        <button className="b2">在线阅读 Online Trial Reading</button>
                      </div>
                    </div>
                  </div>
                  <div className="detail-actions">
                    <div className="de-acc">
                      {data.collect ? (
                        <span className="action collect" onClick={this.addCollect}>
                          <span className="icon">
                            <Icon type="star" theme="filled" />
                          </span>
                          已收藏
                        </span>
                      ) : (
                        <span className="action" onClick={this.addCollect}>
                          <span className="icon">
                            <Icon type="star" />
                          </span>
                          收藏
                        </span>
                      )}
                      <span className="action">
                        <Share />
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </Skeleton>
          </div>
          {/* 目录 */}
          {data && data.book.menus ? (
            <div className="child-plan">
              <div className="child-title">
                <label>目录 Catalogue</label>
              </div>
              <div
                className="child-worklist"
                ref={el => (this.workListContentEl = el)}
                style={{
                  overflow: data.worklistMore ? "auto" : "hidden",
                  maxHeight: data.worklistMore ? "inherit" : "250px"
                }}
              >
                <div
                  className="worklist-p"
                  dangerouslySetInnerHTML={{ __html: data.book.menus }}
                ></div>
              </div>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Book;
