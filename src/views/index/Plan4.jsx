import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";

class Plan4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    return (
      <div className="plan plan-4" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="books"/>
            <div className="plan-content">
              <div className="content-left">
                <dl className="content-item">
                  <dt>08-12</dt>
                  <dd>
                    国办印发《全国深化“放管服”改革优化营商环境电视电话会议重点任务
                  </dd>
                </dl>
                <dl className="content-item">
                  <dt>08-11</dt>
                  <dd>国务院关于修改《烈士褒扬条例》的决定</dd>
                </dl>
                <dl className="content-item">
                  <dt>08-08</dt>
                  <dd>国务院办公厅关于促进平台经济规范健康发展的指导意见</dd>
                </dl>
                <dl className="content-item">
                  <dt>08-07</dt>
                  <dd>
                    国务院关于印发中国（上海）自由贸易试验区临港新片区总体方案的通知
                  </dd>
                </dl>
                <dl className="content-item">
                  <dt>08-05</dt>
                  <dd>国务院办公厅关于同意建立养老服务部际联席会议制度的函</dd>
                </dl>
                <dl className="content-item">
                  <dt>08-01</dt>
                  <dd>
                    国务院推进政府职能转变和“放管服”改革协调小组组成人员调整
                  </dd>
                </dl>
                <dl className="content-item">
                  <dt>07-29</dt>
                  <dd>
                    中共中央办公厅印发《关于贯彻实施公务员法建设高素质专业化公务员
                  </dd>
                </dl>
                <dl className="content-item">
                  <dt>07-29</dt>
                  <dd>
                    中共中央办公厅印发《关于贯彻实施公务员法建设高素质专业化公务员
                  </dd>
                </dl>
                <div className="content-more">
                  <Link to="/index">MORE >></Link>
                </div>
              </div>
              <div className="content-right">
                <div className="cm1">
                  <div className="cm1-border">
                    <p className="p1">江苏人民出版社</p>
                    <p className="p2">海外中国研究丛书</p>
                  </div>
                  <div className="cm1-footer">
                    <span className="cm1-left"></span>
                    <span className="cm1-right"></span>
                  </div>
                </div>
                <div className="cm2">
                  <div className="book">
                    <img alt="" src="/assets/img/book.png" />
                  </div>
                  <div className="book">
                    <img alt="" src="/assets/img/book.png" />
                  </div>
                  <div className="book">
                    <img alt="" src="/assets/img/book.png" />
                  </div>
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

export default Plan4;
