import React, { Component } from "react";
import { DatePicker } from "antd";

class Mechanism extends Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  render() {
    return (
      <div className="search-form">
        <div className="search-row">
          <label className="search-label">名称 Name：</label>
          <div className="search-control">
            <input type="text" name="org_name" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">研究领域 Research areas：</label>
          <div className="search-control max">
            <input type="text" name="field" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在地区 Area：</label>
          <div className="search-control max">
            <input type="text" name="area" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在国家 Country：</label>
          <div className="search-control max">
            <input type="text" name="country" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">成立时间 Established year：</label>
          <div className="search-control min">
            {/* <input type="text" name="pubdate" /> */}
            <DatePicker
              onChange={this.onChange}
              style={{ width: 200 }}
              showToday={false}
              placeholder=""
            />
          </div>
        </div>
        <div className="search-actions">
          <button className="b1">检索Search</button>
          <button className="b2">重置Reset</button>
        </div>
      </div>
    );
  }
}

export default Mechanism;
