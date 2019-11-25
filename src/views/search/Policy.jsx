import React, { Component } from "react";
import { DatePicker, Select } from "antd";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

class Policy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  render() {
    return (
      <div className="search-form">
        <div className="search-row">
          <span className="search-label">
            <span className="group-title">
              <span className="g-actions">
                <span className="action-reduce">-</span>
                <span className="action-plus">+</span>
              </span>
              <span className="g-type">
                <Select style={{ width: 190 }} defaultValue={""}>
                  <Option value="">标题title</Option>
                </Select>
              </span>
            </span>
          </span>
          <div className="search-control" style={{ width: 850 }}>
            <div className="group-control">
              <span className="col-1">
                <input type="text" />
              </span>
              <span className="col-2">
                <Select style={{ width: 180 }} defaultValue={""}>
                  <Option value="">并含included</Option>
                  <Option value="">排除exclude</Option>
                </Select>
              </span>
              <span className="col-1">
                <input type="text" />
              </span>
            </div>
          </div>
        </div>
        <div className="search-row">
          <span className="search-label">
            <span className="group-title">
              <span className="g-and">
                <Select style={{ width: 120 }} defaultValue={""}>
                  <Option value="">并且and</Option>
                  <Option value="">或者or</Option>
                </Select>
              </span>
              <span className="g-type">
                <Select style={{ width: 190 }} defaultValue={""}>
                  <Option value="">标题title</Option>
                </Select>
              </span>
            </span>
          </span>
          <div className="search-control" style={{ width: 850 }}>
            <div className="group-control">
              <span className="col-1">
                <input type="text" />
              </span>
              <span className="col-2">
                <Select style={{ width: 180 }} defaultValue={""}>
                  <Option value="">并含included</Option>
                </Select>
              </span>
              <span className="col-1">
                <input type="text" />
              </span>
            </div>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">语种 Language：</label>
          <div className="search-control">
            <Select style={{ width: 320 }} defaultValue={""}>
              <Option value="">不限unlimited</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">成文日期 Written date：</label>
          <div className="search-control">
            <RangePicker onChange={this.onChange} separator="-" style={{ width: 320 }}/>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">发布日期 Release date：</label>
          <div className="search-control">
            <RangePicker onChange={this.onChange} separator="-" style={{ width: 320 }}/>
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">实施日期 Implementation date：</label>
          <div className="search-control">
            <RangePicker onChange={this.onChange} separator="-" style={{ width: 320 }}/>
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

export default Policy;
