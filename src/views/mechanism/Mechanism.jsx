import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import { _get_url_search } from "../../store/Action";
import HTTP from "../../script/service";
import { Pagination } from "antd";
import "./Mechanism.scss";

const KeyValue = {
  org_name: "名称",
  field: "研究领域",
  area: "地区",
  country: "国家",
  pubdate: "成立日期"
};
class Mechanism extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      countryParam: {
        pageNum: 1,
        pageSize: 10,
        pages: 1
      },
      countrys: [], //国家
      searchParam: {
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
  //本页数据
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    HTTP._get_org_list({
      ...searchParam,
      ...pageParam
    }).then(res => {
      if (res.code == 0) {
        pageParam = {
          pageNum: 1,
          pageSize: 10,
          pages: res.data.pages,
          total: res.data.total
        };
        this.setState({
          pageParam: pageParam,
          pageData: res.data.rows
        });
      }
    });
  };
  //分页回调
  onPagChange = page => {
    this.setState(
      {
        pageParam: {
          pageNum: page,
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
    console.log(pageParam, pageData);
    return (
      <div className="mechanism-page">
        <Header base={base} />
        <TopSearch base={base} tabIndex={4} searchArray={searchArray} setSearchParam={this.setSearchParam} />
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
                    <li key={`country-${index}`} onClick={this.setSearchParam.bind(this, "country", item.name)}>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <div className="group-pagination">
                <span className="page">
                  {countryParam.pageNum}/{countryParam.pages}
                </span>
                <span className={countryParam.pageNum == 1 ? "paper dis" : "paper"} onClick={this.changeCountryList.bind(this, -1)}>
                  上一页
                </span>
                <span className={countryParam.pageNum >= countryParam.pages ? "paper dis" : "paper"} onClick={this.changeCountryList.bind(this, 1)}>
                  下一页
                </span>
                <span className="paper">全部</span>
              </div>
            </div>
          </div>
          <div className="second-right">
            <div className="mechanism-items">
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center </p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mechanism-item">
                <div className="cover">
                  <img src="/assets/img/mechanism.png" alt="" />
                </div>
                <div className="detail">
                  <h3>顾立雅中国古文字学中心</h3>
                  <dl>
                    <dt>简介</dt>
                    <dd>
                      <p>英文名称：Creel Center for Chinese Paleography</p>
                      <p>研究领域：study of early Chinese textual</p>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="page-papers">
              <span className="label">共61389个结果</span>
              <span className="pagination">
                <Pagination defaultCurrent={6} hideOnSinglePage={true} total={500} pageSize={pageParam.pageSize} onChange={this.onPagChange} itemRender={this.itemRender} />
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Mechanism;
