import React, { Component } from "react";
import { DatePicker, Select } from "antd";
import HTTP from "../../script/service";
import moment from "moment";
import qs from "qs";
import { withRouter } from "react-router-dom";
const { RangePicker } = DatePicker;
const { Option } = Select;

class Policys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: [],
      policies_types:[{
        id: 4,
        name: "政策法规"
      },{
        id: 5,
        name: "政策解读"
      }],
      param: {
        subject_and: "and", //subject_and/主题词条件（and/or）
        language: "", //语言
        policies_type: 4, //政策类型 4:政策法规，5:政策解读
        pubdate_start: null, //发布开始日期
        pubdate_end: null, //发布结束日期
        writedate_start: null, //成文开始日期
        writedate_end: null, //成文结束日期
        impledate_start: null, //实施开始日期
        impledate_end: null, //实施结束日期
        title: null, //标题
        title2: null, //并含标题
        subjectwords: null, //主题词
        subjectwords2: null //并含主题词
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
    this.props.history.push(`/policys?${param}`);
  };
  toReset = () => {
    this.setState({
      param: {
        subject_and: "and", //subject_and/主题词条件（and/or）
        language: "", //语言
        policies_type: 4, //政策类型 4:政策法规，5:政策解读
        pubdate_start: null, //发布开始日期
        pubdate_end: null, //发布结束日期
        writedate_start: null, //成文开始日期
        writedate_end: null, //成文结束日期
        impledate_start: null, //实施开始日期
        impledate_end: null, //实施结束日期
        title: null, //标题
        title2: null, //并含标题
        subjectwords: null, //主题词
        subjectwords2: null //并含主题词
      }
    });
  };
  render() {
    const { language, param, policies_types } = this.state;
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
                <Select style={{ width: 180 }} defaultValue={"included"}>
                  <Option value="included">并含included</Option>
                  {/* <Option value="">排除exclude</Option> */}
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
                  value={param.subject_and}
                  onChange={this.onChangeSelect.bind(this, "subject_and")}
                >
                  <Option value="and">并且and</Option>
                  <Option value="or">或者or</Option>
                </Select>
              </span>
              <span className="g-type">
                <Select style={{ width: 190 }} defaultValue={"subject"}>
                  <Option value="subject">主题词subject headings</Option>
                </Select>
              </span>
            </span>
          </span>
          <div className="search-control" style={{ width: 850 }}>
            <div className="group-control">
              <span className="col-1">
                <input
                  type="text"
                  name="subjectwords"
                  value={param.subjectwords || ""}
                  onChange={this.onChangeForm}
                />
              </span>
              <span className="col-2">
                <Select style={{ width: 180 }} defaultValue={"included"}>
                  <Option value="included">并含included</Option>
                  {/* <Option value="">排除exclude</Option> */}
                </Select>
              </span>
              <span className="col-1">
                <input
                  type="text"
                  name="subjectwords2"
                  value={param.subjectwords2 || ""}
                  onChange={this.onChangeForm}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">政策类型 Types</label>
          <div className="search-control">
            <Select
              style={{ width: 320 }}
              value={param.policies_type}
              onChange={this.onChangeSelect.bind(this, "policies_type")}
            >
              {policies_types.map((item, index) => {
                return (
                  <Option key={`language-${index}`} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
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
                  <Option key={`language-${index}`} value={item.dicvalue}>
                    {item.dicname}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">成文日期 Written date：</label>
          <div className="search-control">
            <RangePicker
              onChange={this.onChange.bind(this, ["writedate_start", "writedate_end"])}
              value={getTime(["writedate_start", "writedate_end"])}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">发布日期 Release date：</label>
          <div className="search-control">
            <RangePicker
              onChange={this.onChange.bind(this, ["pubdate_start", "pubdate_end"])}
              value={getTime(["pubdate_start", "pubdate_end"])}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">实施日期 Implementation date：</label>
          <div className="search-control">
            <RangePicker
              onChange={this.onChange.bind(this, ["impledate_start", "impledate_end"])}
              value={getTime(["impledate_start", "impledate_end"])}
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

export default withRouter(Policys);
