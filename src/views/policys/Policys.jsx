import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import { _get_url_search } from "../../store/Action";
import { Pagination, Checkbox, Icon, Select } from "antd";
import HTTP from "../../script/service";
import "./Policys.scss";
const { Option } = Select;

const KeyValue = {
  level: "公文级别",
  disagency: "发文机关",
  searchText: "关键词",
  subject_and: "and",
  language: "语种",
  writedate_start: "成立开始日期",
  writedate_end: "成立开始日期",
  impledate_start: "实施开始日期",
  impledate_end: "实施结束日期",
  pubdate_start: "发布开始日期",
  pubdate_end: "发布结束日期",
  title: "标题",
  title2: "标题",
  subjectwords: "主题词",
  subjectwords2: "主题词",
  policies_type_name: "政策类型"
};
class Policys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      policies_types: [
        {
          id: 4,
          name: "政策法规",
          count: 0
        },
        {
          id: 5,
          name: "政策解读",
          count: 0
        }
      ],
      disagencyParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      disagencys: [], //发布机关
      levelParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      levels: [], //公文级别
      searchParam: {
        searchText: null,
        title: null,
        title2: null,
        subjectwords: null,
        subjectwords2: null,
        language: null,
        writedate_start: null,
        writedate_end: null,
        impledate_start: null,
        impledate_end: null,
        pubdate_start: null,
        pubdate_end: null,
        level: null,
        disagency: null,
        policies_type: 4
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      },
      pageData: [],
      checkall: false
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
    this.getDisagencyList();
    this.getLevelList();
    HTTP._get_policies_type().then(res => {
      if (res.code == 0) {
        let { policies_types } = this.state;
        res.data.forEach((item, index) => {
          policies_types[index].count = item.count;
        });
        this.setState({
          policies_types: policies_types
        });
      }
    });
    _get_url_search(param => {
      this.setState(
        {
          searchParam: { ...this.state.searchParam, ...param }
        },
        () => {
          this.getPageData();
        }
      );
    });
  }
  //获取发布机关
  getDisagencyList = () => {
    let { disagencyParam } = this.state;
    HTTP._get_policies_disagency(disagencyParam).then(res => {
      if (res.code == 0) {
        this.setState({
          disagencys: res.data.rows,
          disagencyParam: { ...disagencyParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页发布机关数据
  changeDisagencyList = n => {
    let { pageNum, pages } = this.state.disagencyParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        disagencyParam: { ...this.state.disagencyParam, pageNum: pageNum + n }
      },
      () => {
        this.getDisagencyList();
      }
    );
  };
  //获取公文级别
  getLevelList = () => {
    let { levelParam } = this.state;
    HTTP._get_policies_level(levelParam).then(res => {
      if (res.code == 0) {
        this.setState({
          levels: res.data.rows,
          levelParam: { ...levelParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页公文级别数据
  changeLevelList = n => {
    let { pageNum, pages } = this.state.levelParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        levelParam: { ...this.state.levelParam, pageNum: pageNum + n }
      },
      () => {
        this.getLevelList();
      }
    );
  };
  //设置筛选条件
  setSearchParam = (key, value) => {
    let { searchParam, pageParam } = this.state;
    if (key == "title" && !value) {
      searchParam["title"] = null;
      searchParam["title2"] = null;
    } else if (key == "subjectwords" && !value) {
      searchParam["subjectwords"] = null;
      searchParam["subjectwords2"] = null;
    } else {
      searchParam[key] = value;
    }
    pageParam.pageNum = 1;
    this.setState(
      {
        searchParam: { ...searchParam },
        pageParam: { ...pageParam }
      },
      () => {
        this.getPageData();
      }
    );
  };
  //清空筛选条件
  searchReset = () => {
    let { pageParam } = this.state;
    pageParam.pageNum = 1;
    this.setState(
      {
        searchParam: {
          searchText: null,
          title: null,
          title2: null,
          subjectwords: null,
          subjectwords2: null,
          language: null,
          writedate_start: null,
          writedate_end: null,
          impledate_start: null,
          impledate_end: null,
          pubdate_start: null,
          pubdate_end: null,
          level: null,
          disagency: null
        },
        pageParam: { ...pageParam }
      },
      () => {
        this.getPageData();
      }
    );
  };
  //本页数据
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    HTTP._get_policies_list({
      ...searchParam,
      ...pageParam
    }).then(res => {
      if (res.code == 0) {
        pageParam.pages = res.data.pages;
        pageParam.total = res.data.total;
        this.setState({
          pageParam: pageParam,
          pageData: res.data.rows,
          checkall: false
        });
      }
    });
  };
  //分页回调
  onPagChange = page => {
    let { pageParam } = this.state;
    pageParam.pageNum = page;
    this.setState(
      {
        pageParam: pageParam
      },
      () => {
        this.getPageData();
      }
    );
  };
  //分页控件
  itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <span className="prev">上一页</span>;
    }
    if (type === "next") {
      return <span className="next">下一页</span>;
    }
    return originalElement;
  };
  //row - box
  changeBox = (item, e) => {
    item.checked = e.target.checked;
    let sels = this.state.pageData.filter(item => item.checked);
    let checkall = false;
    if (sels.length == this.state.pageData.length) {
      checkall = true;
    }
    this.setState({
      checkall: checkall,
      pageData: [...this.state.pageData]
    });
  };
  //全选
  setCheckAll = e => {
    let checkall = e.target.checked;
    this.state.pageData.forEach(item => (item.checked = checkall));
    this.setState({
      checkall: checkall,
      pageData: [...this.state.pageData]
    });
  };
  //设置关注
  changeFollow = item => {
    item.collect = !item.collect;
    HTTP._web_member_collect({
      res_id: item.book_id,
      type: 3,
      action_type: item.collect ? 1 : 2,
      res_title: item.title
    });
    this.setState({
      pageData: [...this.state.pageData]
    });
  };
  //更改本页数量
  changePapeSize = e => {
    this.setState(
      {
        pageParam: {
          pageNum: 1,
          pageSize: e,
          pages: 1,
          total: 0
        }
      },
      () => {
        this.getPageData();
      }
    );
  };
  //进入详情页面
  openDetail = item => {
    let id = item.inter_id;
    if (!id && item.policies_id) {
      id = item.policies_id;
    }
    this.props.history.push("/policy?id=" + id);
  };
  render() {
    const {
      base,
      disagencyParam,
      disagencys,
      levelParam,
      levels,
      searchParam,
      pageParam,
      pageData,
      checkall,
      policies_types
    } = this.state;
    let searchArray = [];
    for (let i in searchParam) {
      if (i == "subject_and" || i == "title2" || i == "subjectwords2" || i == "policies_type") {
        continue;
      } else if (i == "title" && searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: searchParam[i] + " 并含 " + searchParam["title2"]
        });
      } else if (i == "subjectwords" && searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: searchParam[i] + " 并含 " + searchParam["subjectwords2"]
        });
      } else if (searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: searchParam[i]
        });
      }
    }
    return (
      <div className="policys-page">
        <Header base={base} />
        <TopSearch
          base={base}
          tabIndex={3}
          searchArray={searchArray}
          searchReset={this.searchReset}
          setSearchParam={this.setSearchParam}
        />
        <div className="second-content">
          <div className="second-left">
            <div className="search-group">
              <div className="group-title">
                <h3>政策类型</h3>
                <p>Policy Types</p>
              </div>
              <div className="group-content">
                {policies_types.map((item, index) => {
                  return (
                    <dl
                      key={`country-${index}`}
                      className={searchParam.policies_type == item.id ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "policies_type", item.id)}
                    >
                      <dt>{item.name}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
            </div>

            <div className="search-group">
              <div className="group-title">
                <h3>发布机关</h3>
                <p>Publishing Authority</p>
              </div>
              <div className="group-content">
                {disagencys.map((item, index) => {
                  return (
                    <dl
                      key={`country-${index}`}
                      className={searchParam.disagency == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "disagency", item.name)}
                    >
                      <dt>{item.name}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
              <div className="group-pagination">
                <span className="page">
                  {disagencyParam.pageNum}/{disagencyParam.pages}
                </span>
                <span
                  className={disagencyParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeDisagencyList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={disagencyParam.pageNum >= disagencyParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeDisagencyList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
            <div className="search-group">
              <div className="group-title">
                <h3>公文级别</h3>
                <p>Policy Level</p>
              </div>
              <div className="group-content">
                {levels.map((item, index) => {
                  return (
                    <dl
                      key={`country-${index}`}
                      className={searchParam.level == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "level", item.name)}
                    >
                      <dt>{item.name}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
              <div className="group-pagination">
                <span className="page">
                  {levelParam.pageNum}/{levelParam.pages}
                </span>
                <span
                  className={levelParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeLevelList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={levelParam.pageNum >= levelParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeLevelList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
          </div>
          <div className="second-right">
            <div className="table-header">
              <div className="border">
                <div className="action-left">
                  <span className="acc">
                    <Checkbox checked={checkall} onClick={this.setCheckAll}>
                      全选
                    </Checkbox>
                  </span>
                  {/* <span className="ac">
                    <Icon type="export" /> 导出
                  </span>
                  <span className="ac">
                    <Icon type="star" /> 收藏
                  </span> */}
                </div>
                <div className="action-right">
                  <label className="l-text">
                    共搜索到<b>{pageParam.total}</b>个结果
                  </label>
                  <span className="sel-col">
                    <Select style={{ width: 160 }} defaultValue={""}>
                      <Option value="">按相关度排序</Option>
                      <Option value="1">或者or</Option>
                    </Select>
                  </span>
                  <span className="sel-col">
                    <Select
                      style={{ width: 80 }}
                      value={pageParam.pageSize}
                      onChange={this.changePapeSize}
                    >
                      <Option value="10">10</Option>
                      <Option value="20">20</Option>
                      <Option value="50">50</Option>
                      <Option value="100">100</Option>
                    </Select>
                  </span>
                </div>
              </div>
            </div>
            <div className="policy-items">
              {pageData.length > 0 ? (
                pageData.map((item, index) => {
                  return (
                    <div key={`map-${index}`} className="table-item">
                      <span className="box">
                        <Checkbox
                          checked={item.checked}
                          onChange={this.changeBox.bind(this, item)}
                        />
                      </span>
                      <div className="row-con">
                        <div className="d1" onClick={this.openDetail.bind(this, item)}>
                          {index + 1}、{item.title}
                        </div>
                        <div className="d2">
                          {item.disnum}
                          {item.disagency}
                          {item.pubdate}
                        </div>
                      </div>
                      {item.collect ? (
                        <div className="action follow" onClick={this.changeFollow.bind(this, item)}>
                          <Icon type="star" theme="filled" />
                        </div>
                      ) : (
                        <div className="action" onClick={this.changeFollow.bind(this, item)}>
                          <Icon type="star" />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="not-data">没有找到相关内容</div>
              )}
            </div>
            <div className={pageParam.pages <= 1 ? "page-papers none" : "page-papers"}>
              <span className="label">共{pageParam.total}个结果</span>
              <span className="pagination">
                <Pagination
                  pageSize={parseInt(pageParam.pageSize)}
                  hideOnSinglePage={true}
                  current={pageParam.pageNum}
                  total={pageParam.total}
                  onChange={this.onPagChange}
                  itemRender={this.itemRender}
                />
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Policys;
