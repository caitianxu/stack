import React, { Component } from "react";
import { DatePicker } from "antd";
import G2 from "@antv/g2";
import Util from "../../script/util";
import moment from "moment";

const { MonthPicker } = DatePicker;

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: Util.dateFormat(+new Date(), "yyyy-MM")
    };
  }
  onChange(date, dateString) {
    console.log("时间", dateString);
  }
  componentDidMount() {
    /* eslint-disable */
    fetch("/assets/json/statistics.json")
      .then(response => response.json())
      .then(res => {
        this.chart1 = new G2.Chart({
          container: "chart1",
          forceFit: true,
          width: 840,
          height: 400,
          padding: [10, 10, 30, 40]
        });
        this.chart1.source(res, {
          date: {
            range: [0, 1, 2]
          }
        });
        this.chart1.tooltip({
          crosshairs: {
            type: "line"
          }
        });
        this.chart1
          .line()
          .position("date*temperature")
          .color("name")
          .shape("smooth");
        this.chart1
          .point()
          .position("date*temperature")
          .color("name")
          .size(4)
          .shape("circle")
          .style({
            stroke: "#fff",
            lineWidth: 1
          });
        this.chart1.render();
      });
  }
  render() {
    const { month } = this.state;
    return (
      <div className="center-statistics-detail">
        <div className="center-page-title">统计数据 Statistical value</div>
        <div className="search-header">
          <span className="c-left">
            <label className="time-label">网站概况：</label>
            <span className="time-control">
              <MonthPicker
                onChange={this.onChange}
                placeholder="查询月份"
                defaultValue={moment(month, "YYYY-MM")}
              />
            </span>
          </span>
          <span className="c-right">
            <label className="b1">
              <i></i>访问次数
            </label>
            <label className="b2">
              <i></i>浏览次数
            </label>
            <label className="b3">
              <i></i>IP
            </label>
          </span>
        </div>
        <div className="page-g2-map" id="chart1"></div>
        <div className="total-data">
            <span>访问次数：25</span>
            <span>浏览次数：25</span>
            <span>IP记录：25</span>
        </div>
      </div>
    );
  }
}

export default Statistics;
