import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import { _get_url_search } from "../../store/Action";
import { Pagination, Checkbox, Icon, Select, Spin } from "antd";
import HTTP from "../../script/service";
import "./Books.scss";
import Util from "../../script/util";
const { Option } = Select;

const KeyValue = {
  cat: "分类",
  cat_id: "分类id",
  isfull: "权限",
  searchText: "关键词",
  subject_and: "and",
  language: "语种",
  pubyear: "出版时间",
  special: "专题",
  pubdate_start: "出版开始日期",
  pubdate_end: "出版结束日期",
  title: "标题",
  title2: "标题",
  series: "丛书名",
  series2: "丛书名"
};
const isfulls = ["题录", "全文"];
class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      childCats: null,
      cats: [], //分类
      catParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      specials: [], //专题
      specialParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      fulls: [],
      languageParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      languages: [], //语种
      pubyearParam: {
        pageNum: 1,
        pageSize: 6,
        pages: 1
      },
      pubyears: [], //年限
      searchParam: {
        searchText: null,
        title: null,
        title2: null,
        series: null,
        series2: null,
        language: null,
        pubdate_start: null,
        pubdate_end: null,
        cat: null,
        cat_id: null,
        pubyear: null,
        isfull: null,
        special: null
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
    this.getCatList();
    this.getBookFull();
    this.getLanguageList();
    this.getPubyearList();
    this.getSpecialList();
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
  //获取所有一级分类
  getCatList = () => {
    let { catParam } = this.state;
    HTTP._get_book_cats(catParam).then(res => {
      if (res.code == 0) {
        this.setState({
          cats: res.data.rows,
          catParam: { ...catParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页语种数据
  changeCatList = n => {
    let { pageNum, pages } = this.state.catParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        catParam: { ...this.state.catParam, pageNum: pageNum + n }
      },
      () => {
        this.getCatList();
      }
    );
  };
  //获取内容权限
  getBookFull = () => {
    HTTP._get_book_full().then(res => {
      if (res.code == 0) {
        this.setState({
          fulls: [...res.data]
        });
      }
    });
  };
  //获取语种
  getLanguageList = () => {
    let { languageParam } = this.state;
    HTTP._get_book_language(languageParam).then(res => {
      if (res.code == 0) {
        this.setState({
          languages: res.data.rows,
          languageParam: { ...languageParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页语种数据
  changeLanguageList = n => {
    let { pageNum, pages } = this.state.languageParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        languageParam: { ...this.state.languageParam, pageNum: pageNum + n }
      },
      () => {
        this.getLanguageList();
      }
    );
  };
  //获取出版日期
  getPubyearList = () => {
    let { pubyearParam } = this.state;
    HTTP._get_book_pubdate(pubyearParam).then(res => {
      if (res.code == 0) {
        this.setState({
          pubyears: res.data.rows,
          pubyearParam: { ...pubyearParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页出版日期数据
  changePubyearList = n => {
    let { pageNum, pages } = this.state.pubyearParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        pubyearParam: { ...this.state.pubyearParam, pageNum: pageNum + n }
      },
      () => {
        this.getPubyearList();
      }
    );
  };
  //获取专题日期
  getSpecialList = () => {
    let { specialParam } = this.state;
    HTTP._get_book_series(specialParam).then(res => {
      if (res.code == 0) {
        this.setState({
          specials: res.data.rows,
          specialParam: { ...specialParam, pages: res.data.pages }
        });
      }
    });
  };
  //分页专题数据
  changeSpecialList = n => {
    let { pageNum, pages } = this.state.specialParam;
    if (pageNum + n < 1) return;
    if (pageNum + n > pages) return;
    this.setState(
      {
        specialParam: { ...this.state.specialParam, pageNum: pageNum + n }
      },
      () => {
        this.getSpecialList();
      }
    );
  };
  //设置筛选条件
  setSearchParam = (key, value) => {
    let { searchParam, pageParam } = this.state;
    if (key == "title" && !value) {
      searchParam["title"] = null;
      searchParam["title2"] = null;
    } else if (key == "series" && !value) {
      searchParam["series"] = null;
      searchParam["series2"] = null;
    } else if (key == "cat") {
      if (value) {
        searchParam["cat"] = value.name;
        searchParam["cat_id"] = value.id;
      } else {
        searchParam["cat"] = null;
        searchParam["cat_id"] = null;
      }
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
          series: null,
          series2: null,
          language: null,
          pubdate_start: null,
          pubdate_end: null,
          cat: null,
          cat_id: null,
          pubyear: null,
          isfull: null,
          special: null
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
    HTTP._get_book_list({
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
  //设置收藏 取消收藏
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
  //展开、收起分类
  changeCatType = (item, e) => {
    let { cats } = this.state;
    item.plus = !item.plus;
    cats.forEach(citem => {
      if (citem.id == item.id) {
        citem.plus = item.plus;
      } else {
        citem.plus = false;
      }
    });
    this.setState(
      {
        childCats: null,
        cats: [...cats]
      },
      () => {
        if (item.plus) {
          this.geiCatChilds(item);
        }
      }
    );
    e.stopPropagation();
    e.preventDefault();
  };
  //获取分类子项
  geiCatChilds = item => {
    HTTP._get_book_cats({
      cat_pid: item.id,
      pageSize: 1000
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          childCats: [...res.data.rows]
        });
      }
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
    this.props.history.push("/book?id=" + item.book_id);
  };
  render() {
    const {
      base,
      childCats,
      cats,
      catParam,
      fulls,
      specials,
      specialParam,
      languageParam,
      languages,
      pubyearParam,
      pubyears,
      searchParam,
      pageParam,
      pageData,
      checkall
    } = this.state;
    let searchArray = [];
    for (let i in searchParam) {
      if (i == "subject_and" || i == "title2" || i == "series2" || i == "cat_id") {
        continue;
      } else if (i == "title" && searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: searchParam[i] + " 并含 " + searchParam["title2"]
        });
      } else if (i == "series" && searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: searchParam[i] + " 并含 " + searchParam["series2"]
        });
      } else if (i == "isfull" && searchParam[i]) {
        searchArray.push({
          key: i,
          name: KeyValue[i],
          value: isfulls[searchParam[i]]
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
      <div className="books-page">
        <Header base={base} />
        <TopSearch
          base={base}
          tabIndex={2}
          searchArray={searchArray}
          searchReset={this.searchReset}
          setSearchParam={this.setSearchParam}
        />
        <div className="second-content">
          <div className="second-left">
            <div className="search-group">
              <div className="group-title">
                <h3>学科分类</h3>
                <p>Subject classification</p>
              </div>
              <div className="group-content">
                {cats.map((item, index) => {
                  return (
                    <div className="group-child" key={`cat-${index}`}>
                      <dl onClick={this.setSearchParam.bind(this, "cat", item)}>
                        <dt>
                          {item.plus ? (
                            <span className="plus" onClick={this.changeCatType.bind(this, item)}>
                              <Icon type="minus" />
                            </span>
                          ) : (
                            <span className="plus" onClick={this.changeCatType.bind(this, item)}>
                              <Icon type="plus" />
                            </span>
                          )}
                          {item.name}
                        </dt>
                        <dd>{item.count}</dd>
                      </dl>
                      {item.plus ? (
                        <div className="group-child-list">
                          <Spin
                            spinning={!childCats}
                            indicator={<Icon type="sync" style={{ fontSize: 24 }} spin />}
                          >
                            <div className="group-child-scroll">
                              {childCats && childCats.length ? (
                                childCats.map((citem, cindex) => {
                                  return (
                                    <dl
                                      key={`ccat-${cindex}`}
                                      onClick={this.setSearchParam.bind(this, "cat", citem)}
                                    >
                                      <dt>{citem.name}</dt>
                                      <dd>{citem.count}</dd>
                                    </dl>
                                  );
                                })
                              ) : (
                                <div className="not-child-data">
                                  {!childCats || childCats.length ? null : "没有内容"}
                                </div>
                              )}
                            </div>
                          </Spin>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className="group-pagination">
                <span className="page">
                  {catParam.pageNum}/{catParam.pages}
                </span>
                <span
                  className={catParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeCatList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={catParam.pageNum >= catParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeCatList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
            <div className="search-group">
              <div className="group-title">
                <h3>内容权限</h3>
                <p>Content permissions</p>
              </div>
              <div className="group-content">
                {fulls.map((item, index) => {
                  return (
                    <dl
                      key={`isfull-${index}`}
                      className={searchParam.isfull == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "isfull", item.name)}
                    >
                      <dt>{isfulls[item.name]}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
            </div>
            <div className="search-group">
              <div className="group-title">
                <h3>语种</h3>
                <p>Languages</p>
              </div>
              <div className="group-content">
                {languages.map((item, index) => {
                  return (
                    <dl
                      key={`country-${index}`}
                      className={searchParam.language == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "language", item.name)}
                    >
                      <dt>{item.name}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
              <div className="group-pagination">
                <span className="page">
                  {languageParam.pageNum}/{languageParam.pages}
                </span>
                <span
                  className={languageParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeLanguageList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={languageParam.pageNum >= languageParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeLanguageList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
            <div className="search-group">
              <div className="group-title">
                <h3>出版时间</h3>
                <p>Publication time</p>
              </div>
              <div className="group-content">
                {pubyears.map((item, index) => {
                  return (
                    <dl
                      key={`country-${index}`}
                      className={searchParam.pubyear == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "pubyear", item.name)}
                    >
                      <dt>{item.name}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
              <div className="group-pagination">
                <span className="page">
                  {pubyearParam.pageNum}/{pubyearParam.pages}
                </span>
                <span
                  className={pubyearParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changePubyearList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={pubyearParam.pageNum >= pubyearParam.pages ? "paper dis" : "paper"}
                  onClick={this.changePubyearList.bind(this, 1)}
                >
                  下一页
                </span>
              </div>
            </div>
            <div className="search-group">
              <div className="group-title">
                <h3>专题</h3>
                <p>special</p>
              </div>
              <div className="group-content">
                {specials.map((item, index) => {
                  return (
                    <dl
                      key={`country-${index}`}
                      className={searchParam.special == item.name ? "active" : ""}
                      onClick={this.setSearchParam.bind(this, "special", item.name)}
                    >
                      <dt>{item.name}</dt>
                      <dd>{item.count}</dd>
                    </dl>
                  );
                })}
              </div>
              <div className="group-pagination">
                <span className="page">
                  {specialParam.pageNum}/{specialParam.pages}
                </span>
                <span
                  className={specialParam.pageNum == 1 ? "paper dis" : "paper"}
                  onClick={this.changeSpecialList.bind(this, -1)}
                >
                  上一页
                </span>
                <span
                  className={specialParam.pageNum >= specialParam.pages ? "paper dis" : "paper"}
                  onClick={this.changeSpecialList.bind(this, 1)}
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
            <div className="books-items">
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
                        <div className="d1">{index + 1}、</div>
                        <div className="cover" onClick={this.openDetail.bind(this, item)}>
                          <img alt="" src={Util.transImgUrl(item.cover)} />
                        </div>
                        <div className="detail">
                          <div className="title" onClick={this.openDetail.bind(this, item)}>
                            {item.title}
                          </div>
                          {item.authors ? <p>作者：{item.authors}</p> : null}
                          {item.press ? <p>出版社：{item.press}</p> : null}
                          {item.isbn ? <p>ISBN：{item.isbn}</p> : null}
                          <div className="book-icons">
                            {/* pdf full_path */}
                            <span className="pdf">
                              <Icon type="file-pdf" />
                              <label>PDF</label>
                            </span>
                            <span className="link">
                              <Icon type="link" />
                              <label>全文链接</label>
                            </span>
                          </div>
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

export default Books;
