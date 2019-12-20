import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HTTP from "../../script/service";
import { Link } from "react-router-dom";
import { Icon, Pagination } from "antd";
import "./Subjects.scss";
import Util from "../../script/util";

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      cats: [],
      searchText: null,
      searchParam: {
        searchText: null,
        cat_id: null,
        sort_type: "desc", //desc/asc
        sort_name: null // click time
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
    HTTP._get_web_cat({
      cat_pid: 0
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          cats: res.data
        });
      }
    });
    this.getPageData();
  }
  //设置分类
  changeCatType = item => {
    let { searchParam } = this.state;
    searchParam.cat_id = item ? item.cat_id : null;
    this.setState(
      {
        searchParam: { ...searchParam }
      },
      () => {
        this.getPageData();
      }
    );
  };
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    HTTP._get_subject_list({
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
  onChangeForm = e => {
    this.setState({
      searchText: e.target.value
    });
  };
  toSearch = () => {
    let { searchParam, searchText, pageParam } = this.state;
    searchParam.searchText = searchText;
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
  changeOrderBy = name => {
    let { searchParam, pageParam } = this.state;
    if (searchParam.sort_name != name) {
      searchParam.sort_name = name;
      searchParam.sort_type = "desc";
    } else {
      searchParam.sort_type = searchParam.sort_type == "desc" ? "asc" : "desc";
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
  render() {
    const { base, cats, searchParam, pageData, pageParam } = this.state;
    return (
      <div className="subjects-page">
        <Header base={base} />
        <div className="subjects-page-content">
          <div className="page-banner">
            <img alt="" src="/assets/img/subjects-banner.jpg" />
          </div>
          <div className="page-search">
            <dl>
              <dt>主题分类：</dt>
              <dd>
                <span
                  className={!searchParam.cat_id ? "c-item active" : "c-item"}
                  onClick={this.changeCatType.bind(this, null)}
                >
                  全部
                </span>
                {cats.map((item, index) => {
                  return (
                    <span
                      key={`key-${index}`}
                      onClick={this.changeCatType.bind(this, item)}
                      className={searchParam.cat_id == item.cat_id ? "c-item active" : "c-item"}
                    >
                      {item.cat_name}
                    </span>
                  );
                })}
              </dd>
            </dl>
            <dl className="border">
              <dt style={{ lineHeight: "40px" }}>检索：</dt>
              <dd>
                <div className="search-control">
                  <input type="text" placeholder="在结果中搜索" onChange={this.onChangeForm} />
                  <span className="icon" onClick={this.toSearch}>
                    <Icon type="search" />
                  </span>
                </div>
              </dd>
            </dl>
          </div>
          <div className="page-orderby">
            <span className="c-left">
              <label className="orderby-label">排序方式：</label>
              <span
                className={
                  searchParam.sort_name == "click" ? "orderby-item active" : "orderby-item"
                }
                onClick={this.changeOrderBy.bind(this, "click")}
              >
                点击量
                <span className="icon">
                  {searchParam.sort_type == "asc" && searchParam.sort_name == "click" ? (
                    <Icon type="caret-up" theme="filled" />
                  ) : (
                    <Icon type="caret-down" theme="filled" />
                  )}
                </span>
              </span>
              <span
                className={searchParam.sort_name == "time" ? "orderby-item active" : "orderby-item"}
                onClick={this.changeOrderBy.bind(this, "time")}
              >
                时间
                <span className="icon">
                  {searchParam.sort_type == "asc" && searchParam.sort_name == "time" ? (
                    <Icon type="caret-up" theme="filled" />
                  ) : (
                    <Icon type="caret-down" theme="filled" />
                  )}
                </span>
              </span>
            </span>
            <span className="c-right">共搜索到{pageParam.total}条相关结果</span>
          </div>

          <div className="page-data-list">
            {pageData.map((item, index) => {
              return (
                <div className="data-row" key={`row-${index}`}>
                  <div className="cover">
                    <Link to={`/subject?id=${item.sub_id}`}>
                      <img alt="" src={Util.transImgUrl(item.cover)} />
                    </Link>
                  </div>
                  <div className="detail">
                    <h3>
                      <Link to={`/subject?id=${item.sub_id}`}>{item.title}</Link>
                    </h3>
                    <dl>
                      <dt>简介：</dt>
                      <dd dangerouslySetInnerHTML={{ __html: item.fulltxt }}></dd>
                    </dl>
                  </div>
                </div>
              );
            })}

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

export default Subjects;
