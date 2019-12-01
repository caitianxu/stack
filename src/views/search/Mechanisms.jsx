import React, { Component } from "react";
import qs from "qs";
import moment from "moment";
import { DatePicker } from "antd";
import { withRouter } from "react-router-dom";

class Mechanisms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org_name: null,
      field: null,
      area: null,
      country: null,
      pubdate: null
    };
  }
  onChange = (date, dateString) => {
    this.setState({
      pubdate: dateString
    });
  };
  changeFormValue = e => {
    let ps = {};
    ps[e.target.name] = e.target.value;
    this.setState(ps);
  };
  toSearch = () => {
    let param = qs.stringify(this.state);
    this.props.history.push(`/mechanisms?${param}`);
  };
  toReset = () => {
    this.setState({
      org_name: null,
      field: null,
      area: null,
      country: null,
      pubdate: null
    });
  };
  render() {
    const { org_name, field, area, country, pubdate } = this.state;
    return (
      <div className="search-form">
        <div className="search-row">
          <label className="search-label">名称 Name：</label>
          <div className="search-control">
            <input type="text" autoComplete="off" name="org_name" value={org_name || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">研究领域 Research areas：</label>
          <div className="search-control max">
            <input type="text" autoComplete="off" name="field" value={field || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在地区 Area：</label>
          <div className="search-control max">
            <input type="text" autoComplete="off" name="area" value={area || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在国家 Country：</label>
          <div className="search-control max">
            <input type="text" autoComplete="off" name="country" value={country || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">成立时间 Established year：</label>
          <div className="search-control min">
            <DatePicker onChange={this.onChange} value={pubdate ? moment(pubdate, 'YYYY-MM-DD') : null}  style={{ width: 200 }} showToday={false} placeholder="" />
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

export default withRouter(Mechanisms);
