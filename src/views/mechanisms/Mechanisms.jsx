import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import { _get_url_search } from "../../store/Action";
import HTTP from "../../script/service";
import { Pagination } from "antd";
import Util from "../../script/util";
import "./Mechanisms.scss";

const KeyValue = {
  searchText: "关键词",
  org_name: "名称",
  field: "研究领域",
  area: "地区",
  country: "国家",
  pubdate: "成立日期"
};
class Mechanisms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      countryParam: {
        pageNum: 1,
        pageSize: 12,
        pages: 1
      },
      countrys: [], //国家
      searchParam: {
        searchText: null,
        org_name: null,
        field: null,
        area: null,
        country: null,
        pubdate: null
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
    this.getCountryList();
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
  //获取国家
  getCountryList = () => {
    let { countryParam } = this.state;
    HTTP._get_country_list(countryParam).then(res => {
      if (res.code == 0) {
        this.setState({
          countrys: res.data.rows,
          countryParam: { ...countryParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页国家数据
  changeCountryList = n => {
    let { pageNum, pages } = this.state.countryParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        countryParam: { ...this.state.countryParam, pageNum: pageNum + n }
      },
      () => {
        this.getCountryList();
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
          org_name: null,
          field: null,
          area: null,
          country: null,
          pubdate: null
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
    HTTP._get_org_list({
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
  //进入详情页面
  openDetail = item => {
    this.props.history.push("/mechanism?id=" + item.org_id);
  };
  render() {
    const { base, countryParam, countrys, searchParam, pageParam, pageData } = this.state;
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
      <div className="mechanisms-page">
        <Header base={base} />
        <TopSearch
          base={base}
          tabIndex={4}
          searchArray={searchArray}
          searchReset={this.searchReset}
          setSearchParam={this.setSearchParam}
        />
        <div className="second-content">
          <div className="second-left">
            <div className="search-group">
              <div className="group-title">
                <h3>所在地区</h3>
                <p>Location</p>
              </div>
              <ul className="group-content">
                {countrys.map((item, index) => {
                  return (
                    <li
                      key={`country-${index}`}
                      className={searchParam.country == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "country", item.name)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <div className="group-pagination">
                <span className="page">
                  {countryParam.pageNum}/{countryParam.pages}
                </span>
                <span
                  className={countryParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeCountryList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={countryParam.pageNum >= countryParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeCountryList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
          </div>
          <div className="second-right">
            <div className="mechanism-items">
              {pageData.length > 0 ? (
                pageData.map((item, index) => {
                  return (
                    <div
                      className="mechanism-item"
                      key={`me-${index}`}
                      onClick={this.openDetail.bind(this, item)}
                    >
                      <div className="cover">
                        <img src={Util.transImgUrl(item.cover, "130x110")} alt="" />
                      </div>
                      <div className="detail">
                        <h3>{item.org_name}</h3>
                        <dl>
                          {item.en_name || item.field ? <dt>简介</dt> : ''}
                          <dd>
                            {item.en_name ? <p>英文名称：{item.en_name} </p> : ''}
                            {item.field ? <p>研究领域：{item.field}</p> : ''}
                          </dd>
                        </dl>
                      </div>
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

export default Mechanisms;
