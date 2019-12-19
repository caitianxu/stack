import React, {Component} from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopSearch from "../../components/topSearch/TopSearch";
import {_get_url_search} from "../../store/Action";
import {Pagination, Checkbox, Icon, Select, Spin} from "antd";
import "./Papers.scss";
import HTTP from "../../script/service";

const {Option} = Select;

const KeyValue = {
    cat: "分类",
    searchText: "关键词",
    language: "语种",
    paper_type: "论文类型",
    foundation: "基金项目",
    pubdate_start: "发布日期",
    meettime_start: "会议时间",
    meetname: "会议名称",
    graduatedate_start: "学位年度",
    graduateschool: "学位单位",
    journal: "期刊",
    pubyaer: "年",
    issues: "期",
    author: "作者",
    keywords: "关键词",
    title: "标题"
};

class Papers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base: store.getState(),
            childCats: null,
            cats: [], //分类
            catParam: {
                type: 6, // （6:期刊论文，7:会议论文，8:学术论文）
                pageNum: 1,
                pageSize: 6,
                pages: 1
            },
            types: [], //类型
            languages: [], //语种
            languageParam: {
                pageNum: 1,
                pageSize: 6,
                pages: 1
            },
            journals: [], //期刊
            journalParam: {
                pageNum: 1,
                pageSize: 6,
                pages: 1
            },
            searchParam: {
                searchText: null,
                cat: null, //分类
                language: "", //语言
                paper_type: null, //类型
                foundation: null, //基金项目
                pubdate_start: null, //发布开始日期
                pubdate_end: null, //发布结束日期
                meettime_start: null, //会议时间开始时间
                meettime_end: null, //会议时间结束时间
                meetname: null, //会议名称
                graduatedate_start: null, //学位年度开始时间
                graduatedate_end: null, //学位年度束时间
                graduateschool: null, //学位单位
                journal: null, //期刊
                journal_id: null, //期刊id
                pubyaer: null, //年 year
                issues: null, //期 period
                author_and: "and", //并含作者（and/or）
                author: null, //作者
                author_condition: "and", //作者并含条件   （and/or）
                author2: null, //并含作者
                keywords_and: "and", //并含作者（and/or）
                keywords: null, //作者
                keywords_condition: "and", //作者并含条件   （and/or）
                keywords2: null, //并含作者
                title: null, //作者
                title_condition: "and", //作者并含条件   （and/or）
                title2: null //并含作者
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
        this.getLanguageList();
        this.getPaperTypes();
        this.getJournalList();
        _get_url_search(param => {
            this.setState(
                {
                    searchParam: {...this.state.searchParam, ...param}
                },
                () => {
                    this.getPageData();
                }
            );
        });
    }

    //清空筛选条件
    searchReset = () => {
        let {pageParam} = this.state;
        pageParam.pageNum = 1;
        this.setState(
            {
                searchParam: {
                    searchText: null,
                    cat: null, //分类
                    language: "", //语言
                    paper_type: null, //类型
                    foundation: null, //基金项目
                    pubdate_start: null, //发布开始日期
                    pubdate_end: null, //发布结束日期
                    meettime_start: null, //会议时间开始时间
                    meettime_end: null, //会议时间结束时间
                    meetname: null, //会议名称
                    graduatedate_start: null, //学位年度开始时间
                    graduatedate_end: null, //学位年度束时间
                    graduateschool: null, //学位单位
                    journal: null, //期刊
                    journal_id: null, //期刊id
                    pubyaer: null, //年 year
                    issues: null, //期 period
                    author_and: "and", //并含作者（and/or）
                    author: null, //作者
                    author_condition: "and", //作者并含条件   （and/or）
                    author2: null, //并含作者
                    keywords_and: "and", //并含作者（and/or）
                    keywords: null, //作者
                    keywords_condition: "and", //作者并含条件   （and/or）
                    keywords2: null, //并含作者
                    title: null, //作者
                    title_condition: "and", //作者并含条件   （and/or）
                    title2: null //并含作者
                },
                pageParam: {...pageParam}
            },
            () => {
                this.getPageData();
            }
        );
    };
    //获取所有一级分类
    getCatList = () => {
        let {catParam} = this.state;
        HTTP._get_paper_cat_list(catParam).then(res => {
            if (res.code == 0) {
                this.setState({
                    cats: res.data.rows,
                    catParam: {...catParam, pages: res.data.pages}
                });
            }
        });
    };
    //展开、收起分类
    changeCatType = (item, e) => {
        let {cats} = this.state;
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
        let {catParam} = this.state;
        catParam.pageSize = 1000;
        catParam.cat_pid = item.id
        HTTP._get_paper_cat_list(catParam).then(res => {
            if (res.code == 0) {
                this.setState({
                    childCats: [...res.data.rows]
                });
            }
        });
    };
    //设置筛选条件
    setSearchParam = (key, value) => {
        let {searchParam, pageParam, catParam} = this.state;
        if (key == "title" && !value) {
            searchParam["title"] = null;
            searchParam["title2"] = null;
        } else if (key == "keywords" && !value) {
            searchParam["keywords"] = null;
            searchParam["keywords2"] = null;
        } else if (key == "author" && !value) {
            searchParam["author"] = null;
            searchParam["author2"] = null;
        } else if (key == "cat") {
            if (value) {
                searchParam["cat"] = value.name;
                searchParam["cat_id"] = value.id;
            } else {
                searchParam["cat"] = null;
                searchParam["cat_id"] = null;
            }
        } else if (key == "journal") {
            if (value) {
                searchParam["journal"] = value.name;
                searchParam["journal_id"] = value.id;
            } else {
                searchParam["journal"] = null;
                searchParam["journal_id"] = null;
            }
        } else if (key == "paper_type") {
            if (value) {
                searchParam["paper_type"] = value.name;
                catParam.type = value.id;
            } else {
                searchParam["paper_type"] = null;
                catParam.type = 6;
            }
            catParam.pageNum = 1;
            catParam.pageSize = 6;
            this.setState(
                {
                    catParam: {...catParam}
                },
                () => {
                    this.getCatList();
                }
            );
        } else {
            searchParam[key] = value;
        }
        pageParam.pageNum = 1;
        this.setState(
            {
                searchParam: {...searchParam},
                pageParam: {...pageParam}
            },
            () => {
                this.getPageData();
            }
        );
    };
    //分页语种数据
    changeCatList = n => {
        let {pageNum, pages} = this.state.catParam;
        if (pageNum + n < 1) return;
        if (pageNum + n > pages) return;
        this.setState(
            {
                catParam: {...this.state.catParam, pageNum: pageNum + n}
            },
            () => {
                this.getCatList();
            }
        );
    };
    //本页数据
    getPageData = () => {
        let {searchParam, pageParam} = this.state;
        HTTP._get_paper_list({
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
        let {pageParam} = this.state;
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
    //获取语种
    getLanguageList = () => {
        let {languageParam} = this.state;
        HTTP._get_paper_language_list(languageParam).then(res => {
            if (res.code == 0) {
                this.setState({
                    languages: res.data.rows,
                    languageParam: {...languageParam, pages: res.data.pages}
                });
            }
        });
    };
    //分页语种数据
    changeLanguageList = n => {
        let {pageNum, pages} = this.state.languageParam;
        if (pageNum + n < 1) return;
        if (pageNum + n > pages) return;
        this.setState(
            {
                languageParam: {...this.state.languageParam, pageNum: pageNum + n}
            },
            () => {
                this.getLanguageList();
            }
        );
    };
    //获取期刊
    getJournalList = () => {
        let {journalParam} = this.state;
        HTTP._get_paper_journal_list(journalParam).then(res => {
            if (res.code == 0) {
                this.setState({
                    journals: res.data.rows,
                    journalParam: {...journalParam, pages: res.data.pages}
                });
            }
        });
    };
    //分页期刊数据
    changeJournalList = n => {
        let {pageNum, pages} = this.state.journalParam;
        if (pageNum + n < 1) return;
        if (pageNum + n > pages) return;
        this.setState(
            {
                journalParam: {...this.state.journalParam, pageNum: pageNum + n}
            },
            () => {
                this.getJournalList();
            }
        );
    };
    //获取类型
    getPaperTypes = () => {
        HTTP._get_paper_type_list().then(res => {
            if (res.code == 0) {
                this.setState({
                    types: res.data
                });
            }
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
    changeFollow = (item, e) => {
        e.stopPropagation();
        e.preventDefault();
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
    stopParent = e => {
        e.stopPropagation();
        e.preventDefault();
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
    //进入详情页面
    openDetail = item => {
        this.props.history.push("/paper?id=" + item.res_id);
    };

    render() {
        const {
            base,
            pageParam,
            searchParam,
            pageData,
            catParam,
            cats,
            childCats,
            languages,
            languageParam,
            types,
            journals,
            journalParam,
            checkall
        } = this.state;

        let searchArray = [];
        for (let i in searchParam) {
            if (
                i == "pubdate_end" ||
                i == "meettime_end" ||
                i == "graduatedate_end" ||
                i == "author_and" ||
                i == "author_condition" ||
                i == "keywords_and" ||
                i == "keywords_condition" ||
                i == "title_condition" ||
                i == "author2" ||
                i == "keywords2" ||
                i == "title2" ||
                i == "journal_id" ||
                i == "cat_id"
            ) {
                continue;
            } else if (i == "title" && searchParam[i]) {
                searchArray.push({
                    key: i,
                    name: KeyValue[i],
                    value: searchParam[i] + " 并含 " + searchParam["title2"]
                });
            } else if (i == "keywords" && searchParam[i]) {
                searchArray.push({
                    key: i,
                    name: KeyValue[i],
                    value: searchParam[i] + " 并含 " + searchParam["keywords2"]
                });
            } else if (i == "author" && searchParam[i]) {
                searchArray.push({
                    key: i,
                    name: KeyValue[i],
                    value: searchParam[i] + " 并含 " + searchParam["author2"]
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
            <div className="papers-page">
                <Header base={base}/>
                <TopSearch
                    base={base}
                    tabIndex={1}
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
                                                        <span className="plus"
                                                              onClick={this.changeCatType.bind(this, item)}>
                              <Icon type="minus"/>
                            </span>
                                                    ) : (
                                                        <span className="plus"
                                                              onClick={this.changeCatType.bind(this, item)}>
                              <Icon type="plus"/>
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
                                                        indicator={<Icon type="sync" style={{fontSize: 24}} spin/>}
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
                                <h3>语种</h3>
                                <p>Languages</p>
                            </div>
                            <div className="group-content">
                                {languages.map((item, index) => {
                                    return (
                                        <dl
                                            key={`country-${index}`}
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
                                <h3>论文类型</h3>
                                <p>Types of papers</p>
                            </div>
                            <div className="group-content">
                                {types.map((item, index) => {
                                    return (
                                        <dl
                                            key={`country-${index}`}
                                            onClick={this.setSearchParam.bind(this, "paper_type", item)}
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
                                <h3>来源刊物</h3>
                                <p>Source journals</p>
                            </div>
                            <div className="group-content">
                                {journals.map((item, index) => {
                                    return (
                                        <dl
                                            key={`country-${index}`}
                                            onClick={this.setSearchParam.bind(this, "journal", item)}
                                        >
                                            <dt>{item.name}</dt>
                                            <dd>{item.count}</dd>
                                        </dl>
                                    );
                                })}
                            </div>
                            <div className="group-pagination">
                <span className="page">
                  {journalParam.pageNum}/{journalParam.pages}
                </span>
                                <span
                                    className={journalParam.pageNum == 1 ? "paper dis" : "paper"}
                                    onClick={this.changeJournalList.bind(this, -1)}
                                >
                  上一页
                </span>
                                <span
                                    className={journalParam.pageNum >= journalParam.pages ? "paper dis" : "paper"}
                                    onClick={this.changeJournalList.bind(this, 1)}
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
                                    <span className="ac">
                    <Icon type="export"/> 导出
                  </span>
                                    <span className="ac">
                    <Icon type="star"/> 收藏
                  </span>
                                </div>
                                <div className="action-right">
                                    <label className="l-text">
                                        共搜索到<b>{pageParam.total}</b>个结果
                                    </label>
                                    <span className="sel-col">
                    <Select style={{width: 160}} defaultValue={""}>
                      <Option value="">按相关度排序</Option>
                      <Option value="1">或者or</Option>
                    </Select>
                  </span>
                                    <span className="sel-col">
                    <Select
                        style={{width: 80}}
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
                        <div className="papers-items">
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
                                                {item.abstracts ? <p>{item.abstracts}</p> : null}
                                                {item.issues ? <p>{item.issues}</p> : null}
                                                {item.journal ? <p>{item.journal}</p> : null}
                                            </div>
                                            {item.collect ? (
                                                <div className="action follow"
                                                     onClick={this.changeFollow.bind(this, item)}>
                                                    <Icon type="star" theme="filled"/>
                                                </div>
                                            ) : (
                                                <div className="action" onClick={this.changeFollow.bind(this, item)}>
                                                    <Icon type="star"/>
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
                <Footer/>
            </div>
        );
    }
}

export default Papers;
