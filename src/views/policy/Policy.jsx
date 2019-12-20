import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import { _get_url_search } from "../../store/Action";
import { Breadcrumb, Skeleton, Icon } from "antd";
import Share from "../../components/share/Share";
import "./Policy.scss";
import HTTP from "../../script/service";

class Policy extends Component {
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
      HTTP._web_policy_detail({
        id: param.id
      }).then(res => {
        if (res.code == 0) {
          this.setState({
            data: res.data
          });
        }
        console.log(res.data);
      });
    });
  }
  render() {
    const { base, data } = this.state;
    let html = "";
    if (data && data.detail && data.detail.fulltxt) {
      html = data.detail.fulltxt.replace(/[↵,\n]/g, "<span class='br'></span>");
    }
    return (
      <div className="policy-page">
        <Header base={base} />
        <DetailSearch tabIndex={3} />
        <div className="policy-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/policys">政策</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.detail.title}</Breadcrumb.Item> : null}
            </Breadcrumb>
          </div>
          {data ? <h1 className="first-title">{data.detail.title}</h1> : null}
          <div className="top-actions">
            <span className="action">
              <Icon type="link" />
              <span>引用</span>
            </span>
            <span className="action">
              <Icon type="star" />
              <span>收藏</span>
            </span>
            <span className="action">
              <Icon type="printer" />
              <span>打印</span>
            </span>
            <span className="action">
              <Share />
            </span>
          </div>
          <div className="page-detail-plan">
            <Skeleton loading={!data} paragraph={{ rows: 20 }}>
              {data ? (
                <div className="detail-content">
                  <div className="content-cols">
                    <div className="col-item">
                      索 引 号：<label>{data.detail.indexno}</label>
                    </div>
                    <div className="col-item">
                      主题分类：<label>{data.detail.cat_name}</label>
                    </div>
                    <div className="col-item">
                      发文机关：<label>{data.detail.disagency}</label>
                    </div>
                    <div className="col-item">
                      成文日期：<label>{data.detail.writedate}</label>
                    </div>
                    <div className="col-item">
                      发文字号：<label>{data.detail.disnum}</label>
                    </div>
                    <div className="col-item">
                      发布日期：<label>{data.detail.pubdate}</label>
                    </div>
                    <div className="col-item">
                      主 题 词：<label>{data.detail.subjectwords}</label>
                    </div>
                  </div>
                  <div className="mini-title">{data.detail.title}</div>
                  <div className="html" dangerouslySetInnerHTML={{ __html: html }}></div>
                </div>
              ) : null}
            </Skeleton>
          </div>
          {/* 相关推荐 */}
          {data ? (
            <div className="child-plan">
              <div className="child-title">
                <label>相关推荐 Relevant Recommendations</label>
              </div>
              <div className="msg-line">
                {data.commentList.map((item, index) => {
                  return (
                    <div className="comm-list" key={`comm-${index}`}>
                      <a href={`/policy?id=${item.id}`}>[{index + 1}] {item.title}</a>
                      <label>{item.pubdate}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Policy;
