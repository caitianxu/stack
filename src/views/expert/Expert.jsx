import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import { _get_url_search } from "../../store/Action";
import { Breadcrumb, Skeleton, Icon } from "antd";
import HTTP from "../../script/service";
import Share from "../../components/share/Share";
import "./Expert.scss";
import Util from "../../script/util";

class Expert extends Component {
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
      HTTP._web_expert_detail({
        id: param.id
      }).then(res => {
        if (res.code == 0) {
          this.setState(
            {
              data: res.data
            },
            () => {
              setTimeout(() => {
                if (this.workListContentEl && this.workListContentEl.clientHeight >= 250) {
                  this.workListMoreEl.style.display = "block";
                }
                if (this.projectContentEl && this.projectContentEl.clientHeight >= 250) {
                  this.projectMoreEl.style.display = "block";
                }
              }, 500);
            }
          );
        }
        console.log(res.data);
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
  //展开 收起
  changeWorkListMore = () => {
    let { data } = this.state;
    data.worklistMore = !data.worklistMore;
    this.setState({
      data: { ...data }
    });
  };
  //展开 收起
  changeProjectMore = () => {
    let { data } = this.state;
    data.projectMore = !data.projectMore;
    this.setState({
      data: { ...data }
    });
  };
  render() {
    const { base, data } = this.state;
    return (
      <div className="expert-page">
        <Header base={base} />
        <DetailSearch tabIndex={5} />
        <div className="expert-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/experts">专家</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.expert.name}</Breadcrumb.Item> : null}
            </Breadcrumb>
          </div>
          <div className="page-detail-plan">
            <Skeleton
              loading={!data}
              avatar={{ size: 210, shape: "square" }}
              paragraph={{ rows: 5 }}
            >
              {data ? (
                <div className="detail-content">
                  <div className="detail-row-1">
                    <div className="cover">
                      <img src={Util.transImgUrl(data.expert.cover)} alt="" />
                    </div>
                    <div className="detail">
                      <h1>{data.expert.name}</h1>
                      <div className="c-row">
                        {data.expert.enname ? (
                          <div className="c-col">
                            【曾 用 名 used name】:<label>{data.expert.enname}</label>
                          </div>
                        ) : null}
                        {data.expert.birthday ? (
                          <div className="c-col">
                            【出生日期 Birth Data】:<label>{data.expert.birthday}</label>
                          </div>
                        ) : null}
                        {data.expert.country ? (
                          <div className="c-col">
                            【所在地 Location】:<label>{data.expert.country}</label>
                          </div>
                        ) : null}
                        {data.expert.org_name ? (
                          <div className="c-col">
                            【所属机构 Unit】:<label>{data.expert.org_name}</label>
                          </div>
                        ) : null}
                        {data.expert.position ? (
                          <div className="c-col">
                            【职务 Position】:<label>{data.expert.position}</label>
                          </div>
                        ) : null}
                        {data.expert.background ? (
                          <div className="c-col">
                            【教育背景 Education background】:
                            <label>{data.expert.background}</label>
                          </div>
                        ) : null}
                        {data.expert.research ? (
                          <div className="c-col">
                            【研究领域 Research areas】:<label>{data.expert.research}</label>
                          </div>
                        ) : null}
                        {data.expert.website ? (
                          <div className="c-col">
                            【个人主页 Homepage】:
                            <label>
                              <a href={data.expert.website} target="_blank" rel="noopener noreferrer">
                                {data.expert.website}
                              </a>
                            </label>
                          </div>
                        ) : null}
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
                  {data.expert.fulltxt ? (
                    <div className="detail-row-2">
                      <h3>【个人简介】：</h3>
                      <div
                        className="remark"
                        dangerouslySetInnerHTML={{ __html: data.expert.fulltxt }}
                      ></div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </Skeleton>
          </div>
          {/* 科研成果 */}
          {data && data.expert.worklist ? (
            <div className="child-plan">
              <div className="child-title">
                <label>科研成果 Research results</label>
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
                  dangerouslySetInnerHTML={{ __html: data.expert.worklist }}
                ></div>
              </div>
              <div className="show-more" ref={el => (this.workListMoreEl = el)}>
                {data.worklistMore ? (
                  <span onClick={this.changeWorkListMore}>收起 ></span>
                ) : (
                  <span onClick={this.changeWorkListMore}>展开 ></span>
                )}
              </div>
            </div>
          ) : null}
          {/* 研究课题 */}
          {data && data.expert.project ? (
            <div className="child-plan">
              <div className="child-title">
                <label>研究课题 Research project</label>
              </div>
              <div
                className="child-worklist"
                ref={el => (this.projectContentEl = el)}
                style={{
                  overflow: data.projectMore ? "auto" : "hidden",
                  maxHeight: data.projectMore ? "inherit" : "250px"
                }}
              >
                <div
                  className="worklist-p"
                  dangerouslySetInnerHTML={{ __html: data.expert.project }}
                ></div>
              </div>
              <div className="show-more" ref={el => (this.projectMoreEl = el)}>
                {data.projectMore ? (
                  <span onClick={this.changeProjectMore}>收起 ></span>
                ) : (
                  <span onClick={this.changeProjectMore}>展开 ></span>
                )}
              </div>
            </div>
          ) : null}
          {/* 相关推荐 */}
          {data ? (
            <div className="child-plan">
              <div className="child-title">
                <label>相关推荐 Relevant Recommendations</label>
              </div>
              <div className="org-list">
                {data.expertlist.map((item, index) => {
                  return (
                    <a href={`expert?id=${item.expert_id}`} key={`expert-${index}`}>
                      <div className="org">
                        <div className="cover">
                          <img alt="" src={Util.transImgUrl(item.cover)} />
                        </div>
                        <p>{item.name}</p>
                      </div>
                    </a>
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

export default Expert;
