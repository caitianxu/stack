import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";

class Plan6 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    return (
      <div className="plan plan-6" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="mechanisms"/>
            <div className="plan-content">
              <div className="ml-list">
                <div className="ml-item">哈佛大学东亚语言文明系</div>
                <div className="ml-item">顾立雅中国古文字学中心</div>
                <div className="ml-item">宾夕法尼亚大学东亚系</div>
                <div className="ml-item">芝加哥大学东亚艺术中心</div>
                <div className="ml-item">耶鲁大学法学院蔡中曾中国中心</div>
                <div className="ml-item">布朗大学东亚系</div>
                <div className="ml-item">加州大学洛杉矶分校中国研究中心</div>
                <div className="ml-item">芝加哥大学东亚语言文明系</div>
                <div className="ml-item">Council on East Asian Studies at </div>
                <div className="ml-item">Yale University(CEAS)</div>
                <div className="ml-item">哈佛大学费正清中国研究中心</div>
                <div className="ml-item">哈佛燕京学社</div>
                <div className="ml-item">普林斯顿大学东亚系</div>
                <div className="ml-item">耶鲁大学东亚语言文学系</div>
                <div className="ml-item">耶鲁大学东亚语言文学系</div>
                <div className="content-more">
                  <Link to="/index">MORE >></Link>
                </div>
              </div>
              <div className="ml-map">
                <img alt="" src="/assets/img/map.png" />
              </div>
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default Plan6;
