import React, { Component } from "react";
import Util from "../../script/util";

class OrgInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { orgInfo } = this.props.base;
    return (
      <div className="center-orginfo-page">
        <div className="center-page-title">机构信息 Organization information</div>
        <div className="center-orginfo-header">
          <div className="meinfo-row-1">
            <div className="cover">
              <img src={Util.transImgUrl(orgInfo.icon)} alt="" />
            </div>
            <div className="nickname">
              <label>{orgInfo.org_name}，</label>
              欢迎来到中国问题研究文献出版目录及服务平台！
            </div>
          </div>
        </div>
        <div className="center-orginfo-detail">
          <div className="me-info-row">
            <label className="l-label">机构名</label>
            <span className="l-value">{orgInfo.org_name}</span>
          </div>
          <div className="me-info-row">
            <label className="l-label">包库时长</label>
            <span className="l-value">
              {orgInfo.start_time && orgInfo.end_time ? (
                <span>
                  {orgInfo.start_time} - {orgInfo.end_time}
                </span>
              ) : (
                <span>无</span>
              )}
            </span>
          </div>
          <div className="me-info-row">
            <label className="l-label">IP地址</label>
            <span className="l-value">202.112.112.1 ~ 202.112.112.254</span>
          </div>
        </div>
      </div>
    );
  }
}

export default OrgInfo;
