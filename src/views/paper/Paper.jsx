import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import { _get_url_search } from "../../store/Action";
import { Breadcrumb, Skeleton, Icon } from "antd";
import HTTP from "../../script/service";
import Share from "../../components/share/Share";
import "./Paper.scss";

class Paper extends Component {
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
      HTTP._web_paper_detail({
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
    return (
      <div className="paper-page">
        <Header base={base} />
        <DetailSearch tabIndex={1} />
        <div className="paper-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/papers">论文</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.detail.title}</Breadcrumb.Item> : null}
            </Breadcrumb>
          </div>
          {data ? <h1 className="first-title">{data.detail.title}</h1> : null}
          {data && data.detail.entitle ? <h1 className="first-title-1">{data.detail.entitle}</h1> : null}
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
          {data ? (
            <div className="all-detail-content">
              <div className="c-content-left">
                {/* 会议论文 */}
                <dl className="detail-row">
                  <dt>简介：</dt>
                  <dd>{data.detail.abstracts}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>作者：</dt>
                  <dd>{data.detail.author}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>作者单位：</dt>
                  <dd>{data.detail.institution}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>关键词：</dt>
                  <dd>{data.detail.keywords}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>会议名称：</dt>
                  <dd>{data.detail.meetname}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>会议地点：</dt>
                  <dd>{data.detail.meetplace}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>会议时间：</dt>
                  <dd>{data.detail.meettime}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>页码：</dt>
                  <dd>{data.detail.pagenum}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>母体文献：</dt>
                  <dd>{data.detail.parliterature}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>出版时间：</dt>
                  <dd>{data.detail.pubdate}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>主办单位：</dt>
                  <dd>{data.detail.sponsor}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>标签：</dt>
                  <dd>{data.detail.tag}</dd>
                </dl>

                {/* 期刊论文 */}
                <dl className="detail-row">
                  <dt>摘要：</dt>
                  <dd>{data.detail.abstracts}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>作者：</dt>
                  <dd>{data.detail.authors}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>核心期刊：</dt>
                  <dd>{data.detail.corejournal}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>国籍：</dt>
                  <dd>{data.detail.country}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>doi：</dt>
                  <dd>{data.detail.doi}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>英文摘要：</dt>
                  <dd>{data.detail.enabstracts}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>基金：</dt>
                  <dd>{data.detail.foundation}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>国籍标准刊号：</dt>
                  <dd>{data.detail.issn}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>刊期：</dt>
                  <dd>{data.detail.issues}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>期刊名称：</dt>
                  <dd>{data.detail.journal}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>关键词：</dt>
                  <dd>{data.detail.keywords}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>语言：</dt>
                  <dd>{data.detail.language}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>页码：</dt>
                  <dd>{data.detail.pagenum}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>出版时间：</dt>
                  <dd>{data.detail.pubdate}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>出版单位：</dt>
                  <dd>{data.detail.pubunit}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>出版年：</dt>
                  <dd>{data.detail.pubyear}</dd>
                </dl>

                {/* 学术论文 */}
                <dl className="detail-row">
                  <dt>摘要：</dt>
                  <dd>{data.detail.abstracts}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>作者：</dt>
                  <dd>{data.detail.author}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>中图分类号：</dt>
                  <dd>{data.detail.clc}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>学位年度：</dt>
                  <dd>{data.detail.degreeyear}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>英文摘要：</dt>
                  <dd>{data.detail.enabstracts}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>英文关键词：</dt>
                  <dd>{data.detail.enkeyword}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>学位授予日期：</dt>
                  <dd>{data.detail.graduatedate}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>学位授予单位：</dt>
                  <dd>{data.detail.graduateschool}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>关键词：</dt>
                  <dd>{data.detail.keywords}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>语言：</dt>
                  <dd>{data.detail.language}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>学科专业：</dt>
                  <dd>{data.detail.major}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>页码：</dt>
                  <dd>{data.detail.pagenum}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>发表时间：</dt>
                  <dd>{data.detail.pubdate}</dd>
                </dl>
                <dl className="detail-row">
                  <dt>导师：</dt>
                  <dd>{data.detail.tutor}</dd>
                </dl>

              </div>
              <div className="c-content-right">
                <div className="c-p-con">接口~~~~</div>
              </div>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Paper;
