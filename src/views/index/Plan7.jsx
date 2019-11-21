import React, { Component } from "react";
import Menus from "./Menus";
import G2 from "@antv/g2";
import TopSearch from "./TopSearch";

class Plan7 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    /* eslint-disable */
    fetch("/assets/json/scatter.json")
      .then(response => response.json())
      .then(res => {
        this.chart1 = new G2.Chart({
          container: "chart1",
          forceFit: true,
          width: 625,
          height: 500
        });
        this.chart1.source(res);
        this.chart1.tooltip({
          showTitle: false,
          crosshairs: {
            type: "cross"
          },
          itemTpl:
            '<li data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            "{name}<br/>" +
            "{value}" +
            "</li>"
        });
        this.chart1
          .point()
          .position("height*weight")
          .color("gender",["#c23531", "#61a0a8"])
          .size(4)
          .opacity(0.65)
          .shape("circle")
          .tooltip("gender*height*weight", function(gender, height, weight) {
            return {
              name: gender,
              value: height + "(cm), " + weight + "(kg)"
            };
          });
        this.chart1.render();
      });
    /* eslint-disable */

    /* eslint-disable */
    fetch("/assets/json/london.json")
      .then(response => response.json())
      .then(data => {
        this.chart2 = new G2.Chart({
          container: "chart2",
          forceFit: true,
          width: 625,
          height: 500
        });
        this.chart2.source(data);
        this.chart2
          .interval()
          .position("time*value")
          .color("type", ["#c23531", "#61a0a8", "#91c7ae", "#f19e81"])
          .opacity(1);
        this.chart2.render();
      });
    /* eslint-disable */
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    return (
      <div className="plan plan-7" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} />
            <div className="g2-map">
              <div className="map-col map-left">
                <div className="title">
                  <h3>研究趋势</h3>
                  <p>Research Trends</p>
                </div>
                <div className="map-content">
                  <div id="chart1"></div>
                </div>
              </div>
              <div className="map-col map-right">
                <div className="title">
                  <h3>文献收录</h3>
                  <p>Documentation Collection</p>
                </div>
                <div className="map-content">
                  <div id="chart2"></div>
                </div>
              </div>
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default Plan7;
