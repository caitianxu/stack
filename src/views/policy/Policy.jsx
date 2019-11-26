import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import { _get_url_search } from "../../store/Action";
import HTTP from "../../script/service";
import { Pagination } from "antd";
import Util from "../../script/util";
import "./Policy.scss";

const KeyValue = {
  searchText: "关键词",
  title: "标题",
  title2: "标题",
  subjectwords: "主题词",
  subjectwords2: "主题词",
  language: "语种",
  writedate_start: "成立开始日期",
  writedate_end: "成立开始日期",
  impledate_start: "实施开始日期",
  impledate_end: "实施结束日期",
  pubdate_start: "发布开始日期",
  pubdate_end: "发布结束日期",
  level: "公文级别",
  disagency: "发文机关"
};
class Policy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
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
        disagency: null
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      },
      pageData: []
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
    let { searchParam } = this.state;
    searchParam[key] = value;
    this.setState(
      {
        searchParam: { ...searchParam },
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 0
        }
      },
      () => {
        this.getPageData();
      }
    );
  };
  //清空筛选条件
  searchReset = () => {
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
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 0
        }
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
          pageData: res.data.rows
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
  render() {
    const { base, disagencyParam, disagencys, levelParam, levels, searchParam, pageParam, pageData } = this.state;
    let searchArray = [];
    for (let i in searchParam) {
      if (searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: searchParam[i]
        });
      }
    }
    return (
      <div className="policy-page">
        <Header base={base} />
        <TopSearch base={base} tabIndex={4} searchArray={searchArray} searchReset={this.searchReset} setSearchParam={this.setSearchParam} />
        <div className="second-content">
          <div className="second-left">
            <div className="search-group">
              <div className="group-title">
                <h3>发布机关</h3>
                <p>Publishing Authority</p>
              </div>
              <div className="group-content">
                {disagencys.map((item, index) => {
                  return (
                    <dl key={`country-${index}`} onClick={this.setSearchParam.bind(this, "disagency", item.name)}>
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
                <span className={disagencyParam.pageNum == 1 ? "paper dis" : "paper"} onClick={this.changeDisagencyList.bind(this, -1)}>
                  上一页
                </span>
                <span className={disagencyParam.pageNum >= disagencyParam.pages ? "paper dis" : "paper"} onClick={this.changeDisagencyList.bind(this, 1)}>
                  下一页
                </span>
              </div>
            </div>
            <div className="search-group">
              <div className="group-title">
                <h3>政策类型</h3>
                <p>Policy types</p>
              </div>
              <div className="group-content">
                {levels.map((item, index) => {
                  return (
                    <dl key={`country-${index}`} onClick={this.setSearchParam.bind(this, "level", item.name)}>
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
                <span className={levelParam.pageNum == 1 ? "paper dis" : "paper"} onClick={this.changeLevelList.bind(this, -1)}>
                  上一页
                </span>
                <span className={levelParam.pageNum >= levelParam.pages ? "paper dis" : "paper"} onClick={this.changeLevelList.bind(this, 1)}>
                  下一页
                </span>
              </div>
            </div>
          </div>
          <div className="second-right"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Policy;
