import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import Share from "../../components/share/Share";
import { Breadcrumb, Skeleton, Icon } from "antd";
import { _get_url_search } from "../../store/Action";
import "./Mechanism.scss";
import HTTP from "../../script/service";
import Util from "../../script/util";

class Mechanism extends Component {
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
    this.scrollLeft = 0;
    _get_url_search(param => {
      HTTP._web_org_detail({
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
        console.log(res);
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
  //左移动
  changeScrollLeft = () => {
    if (!this.titleScrollElement) return false;
    let allWidth = (this.titleScrollElement.clientWidth - 1116) * -1;
    this.scrollLeft -= 1116;
    if (this.scrollLeft < allWidth) {
      this.scrollLeft = allWidth;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  //右移动
  changeScrollRight = () => {
    if (!this.titleScrollElement) return false;
    this.scrollLeft += 1116;
    if (this.scrollLeft > 0) {
      this.scrollLeft = 0;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  //展开 收起
  changeWorkListMore = () => {
    let { data } = this.state;
    data.worklistMore = !data.worklistMore;
    this.setState({
      data: { ...data }
    });
  };
  //
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
      <div className="mechanism-page">
        <Header base={base} />
        <DetailSearch tabIndex={4} />
        <div className="mechanism-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/mechanisms">机构</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.detail.org_name}</Breadcrumb.Item> : null}
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
                      <img src={Util.transImgUrl(data.detail.cover)} alt="" />
                    </div>
                    <div className="detail">
                      <h1>{data.detail.org_name}</h1>
                      <div className="c-row">
                        <div className="c-col">
                          【曾用名】:<label>{data.detail.former_name}</label>
                        </div>
                        <div className="c-col">
                          【成立时间】:<label>{data.detail.pubdate}</label>
                        </div>
                      </div>
                      <div className="c-row">
                        <div className="c-col">
                          【研究领域】:<label>{data.detail.field}</label>
                        </div>
                        <div className="c-col">
                          【地址】:<label>{data.detail.address}</label>
                        </div>
                      </div>
                      <div className="c-row">
                        <div className="c-col">
                          【国家】:<label>{data.detail.country}</label>
                        </div>
                        <div className="c-col">
                          【电话/传真】:<label>{data.detail.tel}</label>
                        </div>
                      </div>
                      <div className="c-row">
                        <div className="c-col">
                          【网址】:<label>{data.detail.website}</label>
                        </div>
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
                  <div className="detail-row-2">
                    <h3>【机构简介】：</h3>
                    <div className="remark">{data.detail.fulltxt}</div>
                  </div>
                </div>
              ) : null}
            </Skeleton>
          </div>
          {/* 科研成果 */}
          {data ? (
            <div className="child-plan">
              <div className="child-title">
                <label>专家学者 Scholar</label>
              </div>
              <div className="plan-scholar">
                <div className="scholar-left" onClick={this.changeScrollRight}>
                  <Icon type="left" />
                </div>
                <div className="scholar-scrolls">
                  <div className="expert-items" ref={el => (this.titleScrollElement = el)}>
                    {data.expert.map((item, index) => {
                      return (
                        <div className="expert" key={`expert-${index}`}>
                          <div className="cover">
                            <img alt="" src={Util.transImgUrl(item.cover)} />
                          </div>
                          <p>{item.name}</p>
                          <p>{item.position}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="scholar-right" onClick={this.changeScrollLeft}>
                  <Icon type="right" />
                </div>
              </div>
            </div>
          ) : null}
          {/* 科研成果 */}
          {data ? (
            <div className="child-plan">
              <div className="child-title">
                <label>科研成果 Research results</label>
              </div>
              <div
                className="child-worklist"
                ref={el => (this.workListContentEl = el)}
                style={{
                  overflow: data.worklistMore ? "auto" : "hidden",
                  height: data.worklistMore ? "auto" : "250px"
                }}
              >
                {data.worklist.map((item, index) => {
                  let html = item.replace(/[↵,\n]/g, "<span class='br'></span>");
                  return (
                    <div
                      className="worklist-p"
                      key={`worklist-${index}`}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                })}
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
          {/* 科研课题 */}
          {data ? (
            <div className="child-plan">
              <div className="child-title">
                <label>科研成果 Research project</label>
              </div>
              <div
                className="child-worklist"
                ref={el => (this.projectContentEl = el)}
                style={{
                  overflow: data.projectMore ? "auto" : "hidden",
                  maxHeight: data.projectMore ? "auto" : "250px"
                }}
              >
                {data.project.map((item, index) => {
                  let html = item.replace(/[↵,\n]/g, "<span class='br'></span>");
                  return (
                    <div
                      className="worklist-p"
                      key={`worklist-${index}`}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                })}
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
                {data.orglist.map((item, index) => {
                  return (
                    <div className="org" key={`org-${index}`}>
                      <div className="cover">
                        <img alt="" src={Util.transImgUrl(item.cover)} />
                      </div>
                      <p>{item.org_name}</p>
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

export default Mechanism;
