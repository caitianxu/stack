import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import HTTP from "../../script/service";
import { Pagination } from "antd";
import { _get_url_search } from "../../store/Action";
import "./Experts.scss";
import Util from "../../script/util";

const KeyValue = {
  searchText: "关键词",
  name: "姓名",
  org_name: "所属单位",
  research: "研究领域",
  area: "地区",
  country: "所在国家",
  position: "职位"
};
class Experts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      positionParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      positions: [], //研究领域
      countryParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      countrys: [], //国家
      orgParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      orgs: [], //机构
      searchParam: {
        searchText: null,
        name: null,
        org_name: null,
        position: null,
        research: null,
        area: null,
        country: null
      },
      pageParam: {
        pageNum: 1,
        pageSize: 21,
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
    //所在地
    this.getCountryList();
    //所属机构
    this.getOrgList();
    //研究领域
    this.getPositionList();

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
  //获取所在地
  getCountryList = () => {
    let { countryParam } = this.state;
    HTTP._get_expert_country_list(countryParam).then(res => {
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
  //所属机构
  getOrgList = () => {
    let { orgParam } = this.state;
    HTTP._get_expert_org_list(orgParam).then(res => {
      if (res.code == 0) {
        this.setState({
          orgs: res.data.rows,
          orgParam: { ...orgParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页机构数据
  changeOrgList = n => {
    let { pageNum, pages } = this.state.orgParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        orgParam: { ...this.state.orgParam, pageNum: pageNum + n }
      },
      () => {
        this.getOrgList();
      }
    );
  };
  //研究领域
  getPositionList = () => {
    let { positionParam } = this.state;
    HTTP._get_expert_position_list(positionParam).then(res => {
      if (res.code == 0) {
        this.setState({
          positions: res.data.rows,
          positionParam: { ...positionParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页研究领域数据
  changePositionList = n => {
    let { pageNum, pages } = this.state.positionParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        positionParam: { ...this.state.positionParam, pageNum: pageNum + n }
      },
      () => {
        this.getPositionList();
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
          pageSize: 21,
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
          name: null,
          org_name: null,
          position: null,
          research: null,
          area: null,
          country: null
        },
        pageParam: {
          pageNum: 1,
          pageSize: 21,
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
    HTTP._get_expert_list({
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
    this.props.history.push("/expert?id=" + item.expert_id);
  };
  render() {
    const {
      base,
      countryParam,
      countrys,
      orgParam,
      orgs,
      searchParam,
      positions,
      positionParam,
      pageParam,
      pageData
    } = this.state;
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
      <div className="experts-page">
        <Header base={base} />
        <TopSearch
          base={base}
          tabIndex={5}
          searchArray={searchArray}
          searchReset={this.searchReset}
          setSearchParam={this.setSearchParam}
        />
        <div className="second-content">
          <div className="second-left">
            {/* 所在地区 */}
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
            {/* 研究领域 */}
            <div className="search-group">
              <div className="group-title">
                <h3>研究领域</h3>
                <p>research field</p>
              </div>
              <ul className="group-content">
                {positions.map((item, index) => {
                  return (
                    <li
                      key={`country-${index}`}
                      className={searchParam.position == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "position", item.name)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <div className="group-pagination">
                <span className="page">
                  {positionParam.pageNum}/{positionParam.pages}
                </span>
                <span
                  className={positionParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changePositionList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={positionParam.pageNum >= positionParam.pages ? "paper dis" : "paper"}
                  onClick={this.changePositionList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
            {/* 所属机构 */}
            <div className="search-group">
              <div className="group-title">
                <h3>所属机构</h3>
                <p>Subordinate institutions</p>
              </div>
              <ul className="group-content">
                {orgs.map((item, index) => {
                  return (
                    <li
                      key={`org-${index}`}
                      className={searchParam.org_name == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "org_name", item.name)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <div className="group-pagination">
                <span className="page">
                  {orgParam.pageNum}/{orgParam.pages}
                </span>
                <span
                  className={orgParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeOrgList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={orgParam.pageNum >= orgParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeOrgList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
          </div>
          <div className="second-right">
            <div className="expert-top">
              <label>字母索引：</label>
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
              <span>E</span>
              <span>F</span>
              <span>G</span>
              <span>H</span>
              <span>I</span>
              <span>J</span>
              <span>K</span>
              <span>L</span>
              <span>M</span>
              <span>N</span>
              <span>O</span>
              <span>P</span>
              <span>Q</span>
              <span>R</span>
              <span>S</span>
              <span>T</span>
              <span>U</span>
              <span>V</span>
              <span>W</span>
              <span>X</span>
              <span>Y</span>
              <span>Z</span>
            </div>
            <div className="expert-items">
              {pageData.length > 0 ? (
                pageData.map((item, index) => {
                  return (
                    <div
                      className="expert-item"
                      key={`expert-${index}`}
                      onClick={this.openDetail.bind(this, item)}
                    >
                      <div className="cover">
                        <img alt="" src={Util.transImgUrl(item.cover, "110x130")} />
                      </div>
                      <div className="detail">
                        <h1>{item.name}</h1>
                        {item.country ? <p>所在地：{item.country}</p> : null}
                        {item.org_name ? <p>工作单位：{item.org_name}</p> : null}
                        {item.research ? <p>研究领域：{item.research}</p> : null}
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

export default Experts;
