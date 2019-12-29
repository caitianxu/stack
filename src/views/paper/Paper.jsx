import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import { _get_url_search } from "../../store/Action";
import { Breadcrumb, Icon } from "antd";
import HTTP from "../../script/service";
import { Link } from "react-router-dom";
import Share from "../../components/share/Share";
import "./Paper.scss";

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      data: null,
      type: 6
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
        id: param.id,
        type: param.type
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
    const { base, data, type } = this.state;
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
          {data && data.detail.entitle ? (
            <h1 className="first-title-1">{data.detail.entitle}</h1>
          ) : null}
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
            <span>
              <div className="all-detail-content">
                <div className="c-content-left">
                  {/* 会议论文 */}
                  {type == 7 ? (
                    <div>
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
                    </div>
                  ) : null}

                  {/* 期刊论文 */}
                  {type == 6 ? (
                    <div>
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
                    </div>
                  ) : null}

                  {/* 学术论文 */}
                  {type == 8 ? (
                    <div>
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
                  ) : null}
                </div>
                <div className="c-content-right">
                  <div className="c-p-con">
                    <div className="paper-item active">
                      <div className="row-title">中国公共卫生 Chinese Journal of Public Health</div>
                      <div className="row-detail">
                        <div className="cover">
                          <img src="/assets/img/book.png" alt="" />
                        </div>
                        <div className="p-detail">
                          <p>中国公共卫生</p>
                          <p>Chinese Journal of Public Health</p>
                          <p>ISSN：1001-0580</p>
                          <p>中文核心期刊</p>
                          <p>2019年第4期</p>
                        </div>
                      </div>
                    </div>
                    <div className="paper-item">
                      <div className="row-title">中国公共卫生 Chinese Journal of Public Health</div>
                      <div className="row-detail">
                        <div className="cover">
                          <img src="/assets/img/book.png" alt="" />
                        </div>
                        <div className="p-detail">
                          <p>中国公共卫生</p>
                          <p>Chinese Journal of Public Health</p>
                          <p>ISSN：1001-0580</p>
                          <p>中文核心期刊</p>
                          <p>2019年第4期</p>
                        </div>
                      </div>
                    </div>
                    <div className="paper-item">
                      <div className="row-title">中国公共卫生 Chinese Journal of Public Health</div>
                      <div className="row-detail">
                        <div className="cover">
                          <img src="/assets/img/book.png" alt="" />
                        </div>
                        <div className="p-detail">
                          <p>中国公共卫生</p>
                          <p>Chinese Journal of Public Health</p>
                          <p>ISSN：1001-0580</p>
                          <p>中文核心期刊</p>
                          <p>2019年第4期</p>
                        </div>
                      </div>
                    </div>
                    <div className="paper-item">
                      <div className="row-title">中国公共卫生 Chinese Journal of Public Health</div>
                      <div className="row-detail">
                        <div className="cover">
                          <img src="/assets/img/book.png" alt="" />
                        </div>
                        <div className="p-detail">
                          <p>中国公共卫生</p>
                          <p>Chinese Journal of Public Health</p>
                          <p>ISSN：1001-0580</p>
                          <p>中文核心期刊</p>
                          <p>2019年第4期</p>
                        </div>
                      </div>
                    </div>
                    <div className="paper-item">
                      <div className="row-title">中国公共卫生 Chinese Journal of Public Health</div>
                      <div className="row-detail">
                        <div className="cover">
                          <img src="/assets/img/book.png" alt="" />
                        </div>
                        <div className="p-detail">
                          <p>中国公共卫生</p>
                          <p>Chinese Journal of Public Health</p>
                          <p>ISSN：1001-0580</p>
                          <p>中文核心期刊</p>
                          <p>2019年第4期</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 相关推荐 */}
              <div className="child-plan">
                <div className="child-title">
                  <label>相关推荐 Relevant Recommendations</label>
                </div>
                <div className="plan-relevant">
                  {data.catList.map((item, index) => {
                    return (
                      <Link
                        className="link-rel"
                        key={`index-${index}`}
                        to={`/paper?id=${item.id}&type=${item.type}`}
                      >
                        [{index + 1}] {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 相关推荐 */}
              <div className="child-plan">
                <div className="child-title">
                  <label>相同主题论文 Papers on the same topic</label>
                </div>
                <div className="plan-relevant">
                  {data.authorList.map((item, index) => {
                    return (
                      <Link
                        className="link-rel"
                        key={`index-${index}`}
                        to={`/paper?id=${item.id}&type=${item.type}`}
                      >
                        [{index + 1}] {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </span>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Paper;
