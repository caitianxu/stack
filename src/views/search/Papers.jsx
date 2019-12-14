import React, { Component } from "react";
import { DatePicker, Select } from "antd";
import HTTP from "../../script/service";
import moment from "moment";
import qs from "qs";
import { withRouter } from "react-router-dom";
const { RangePicker } = DatePicker;
const { Option } = Select;
//paper_type/论文类型   （6:期刊论文，7:会议论文，8:学术论文）  *必选
class Papers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: [],
      param: {
        language: "", //语言
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
      }
    };
  }
  componentDidMount() {
    HTTP._get_web_dics({
      dictype: "language"
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          language: [...res.data]
        });
      }
    });
  }
  //值change
  onChange = (key, date, dateString) => {
    let { param } = this.state;
    param[key[0]] = dateString[0];
    param[key[1]] = dateString[1];
    this.setState({
      param: { ...param }
    });
  };
  //and or
  onChangeSelect = (name, sub) => {
    let { param } = this.state;
    param[name] = sub;
    this.setState({
      param: { ...param }
    });
  };
  onChangeForm = e => {
    let { param } = this.state;
    param[e.target.name] = e.target.value;
    this.setState({
      param: { ...this.state.param }
    });
  };
  //submit
  toSearch = () => {
    let param = qs.stringify(this.state.param);
    console.log(this.state.param);
    this.props.history.push(`/papers?${param}`);
  };
  toReset = () => {
    this.setState({
      param: {
        language: "", //语言
        foundation: null, //基金项目
        pubdate_start: null, //发布开始日期
        pubdate_end: null, //发布结束日期
        meettime_start: null, //会议时间开始时间
        meettime_end: null, //会议时间结束时间
        meetname: null, //会议名称
        graduatedate_start: null, //会议时间开始时间
        graduatedate_end: null, //会议时间结束时间
        graduateschool: null, //学位单位
        journal: null, //期刊
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
      }
    });
  };
  render() {
    const { language, param } = this.state;
    const getTime = key => {
      let ll = [
        param[key[0]] ? moment(param[key[0]], "YYYY-MM-DD") : null,
        param[key[1]] ? moment(param[key[1]], "YYYY-MM-DD") : null
      ];
      return ll;
    };

    return (
      <div className="search-form">
        <div className="search-row">
          <span className="search-label">
            <span className="group-title">
              <span className="g-actions">
                {/* <span className="action-reduce">-</span>
                <span className="action-plus">+</span> */}
              </span>
              <span className="g-type">
                <Select style={{ width: 190 }} defaultValue={"title"}>
                  <Option value="title">标题title</Option>
                </Select>
              </span>
            </span>
          </span>
          <div className="search-control" style={{ width: 850 }}>
            <div className="group-control">
              <span className="col-1">
                <input
                  type="text"
                  name="title"
                  value={param.title || ""}
                  onChange={this.onChangeForm}
                />
              </span>
              <span className="col-2">
                <Select
                  style={{ width: 180 }}
                  value={param.title_condition}
                  onChange={this.onChangeSelect.bind(this, "title_condition")}
                >
                  <Option value="and">并含included</Option>
                  <Option value="or">排除exclude</Option>
                </Select>
              </span>
              <span className="col-1">
                <input
                  type="text"
                  name="title2"
                  value={param.title2 || ""}
                  onChange={this.onChangeForm}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="search-row">
          <span className="search-label">
            <span className="group-title">
              <span className="g-and">
                <Select
                  style={{ width: 120 }}
                  value={param.keywords_and}
                  onChange={this.onChangeSelect.bind(this, "keywords_and")}
                >
                  <Option value="and">并且and</Option>
                  <Option value="or">或者or</Option>
                </Select>
              </span>
              <span className="g-type">
                <Select style={{ width: 190 }} defaultValue={"keywords"}>
                  <Option value="keywords">关键词keywords</Option>
                </Select>
              </span>
            </span>
          </span>
          <div className="search-control" style={{ width: 850 }}>
            <div className="group-control">
              <span className="col-1">
                <input
                  type="text"
                  name="keywords"
                  value={param.keywords || ""}
                  onChange={this.onChangeForm}
                />
              </span>
              <span className="col-2">
                <Select
                  style={{ width: 180 }}
                  defaultValue={"and"}
                  value={param.keywords_condition}
                  onChange={this.onChangeSelect.bind(this, "keywords_condition")}
                >
                  <Option value="and">并含included</Option>
                  <Option value="or">排除exclude</Option>
                </Select>
              </span>
              <span className="col-1">
                <input
                  type="text"
                  name="keywords2"
                  value={param.keywords2 || ""}
                  onChange={this.onChangeForm}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="search-row">
          <span className="search-label">
            <span className="group-title">
              <span className="g-and">
                <Select
                  style={{ width: 120 }}
                  value={param.author_and}
                  onChange={this.onChangeSelect.bind(this, "author_and")}
                >
                  <Option value="and">并且and</Option>
                  <Option value="or">或者or</Option>
                </Select>
              </span>
              <span className="g-type">
                <Select style={{ width: 190 }} defaultValue={"author"}>
                  <Option value="author">作者单位 Author Unit</Option>
                </Select>
              </span>
            </span>
          </span>
          <div className="search-control" style={{ width: 850 }}>
            <div className="group-control">
              <span className="col-1">
                <input
                  type="text"
                  name="author"
                  value={param.author || ""}
                  onChange={this.onChangeForm}
                />
              </span>
              <span className="col-2">
                <Select
                  style={{ width: 180 }}
                  defaultValue={"and"}
                  value={param.author_condition}
                  onChange={this.onChangeSelect.bind(this, "author_condition")}
                >
                  <Option value="and">并含included</Option>
                  <Option value="or">排除exclude</Option>
                </Select>
              </span>
              <span className="col-1">
                <input
                  type="text"
                  name="author2"
                  value={param.author2 || ""}
                  onChange={this.onChangeForm}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">来源刊物 Publication：</label>
          <div className="search-control" style={{ width: 320 }}>
            <input
              type="text"
              autoComplete="off"
              name="journal"
              value={param.journal || ""}
              onChange={this.onChangeForm}
            />
          </div>
          <div className="small-search-row">
            <label className="search-label">
              <label className="c-label">年 year：</label>
              <div className="c-control">
                <Select
                  style={{ width: 120 }}
                  value={param.pubyaer || ""}
                  onChange={this.onChangeSelect.bind(this, "pubyaer")}
                >
                  <Option value="">不限</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                </Select>
              </div>
            </label>
            <div className="search-control">
              <label className="c-label">期 period：</label>
              <div className="c-control">
                <input
                  type="text"
                  autoComplete="off"
                  name="issues"
                  value={param.issues || ""}
                  onChange={this.onChangeForm}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">学位年度 Degree Year：</label>
          <div className="search-control" style={{ width: 320 }}>
            <RangePicker
              onChange={this.onChange.bind(this, ["graduatedate_start", "graduatedate_end"])}
              value={getTime(["graduatedate_start", "graduatedate_end"])}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
          <div className="small-search-row">
            <label className="search-label">学位单位 School：</label>
            <div className="search-control">
              <input
                type="text"
                autoComplete="off"
                name="graduateschool"
                value={param.graduateschool || ""}
                onChange={this.onChangeForm}
              />
            </div>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">会议时间 Meeting Time：</label>
          <div className="search-control" style={{ width: 320 }}>
            <RangePicker
              onChange={this.onChange.bind(this, ["meettime_start", "meettime_end"])}
              value={getTime(["meettime_start", "meettime_end"])}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
          <div className="small-search-row">
            <label className="search-label">会议名称 Meeting Name：</label>
            <div className="search-control">
              <input
                type="text"
                autoComplete="off"
                name="meetname"
                value={param.meetname || ""}
                onChange={this.onChangeForm}
              />
            </div>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">语种 Language：</label>
          <div className="search-control">
            <Select
              style={{ width: 320 }}
              value={param.language}
              onChange={this.onChangeSelect.bind(this, "language")}
            >
              <Option value="">不限unlimited</Option>
              {language.map((item, index) => {
                return (
                  <Option key={`language-${index}`} value={item.dicname}>
                    {item.dicname}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">基金项目 Fund：</label>
          <div className="search-control" style={{ width: 320 }}>
            <input
              type="text"
              autoComplete="off"
              name="foundation"
              value={param.foundation || ""}
              onChange={this.onChangeForm}
            />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">出版时间 Published date：</label>
          <div className="search-control">
            <RangePicker
              onChange={this.onChange.bind(this, ["pubdate_start", "pubdate_end"])}
              value={getTime(["pubdate_start", "pubdate_end"])}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
        </div>
        <div className="search-actions">
          <button className="b1" onClick={this.toSearch}>
            检索Search
          </button>
          <button className="b2" onClick={this.toReset}>
            重置Reset
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Papers);
