import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";

class Plan5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { height, menuIndex, changeIndex } = this.props;
    return (
      <div className="plan plan-5" style={{ height: `${height}px` }}>
        <div className="plan-bg">
          <div className="plan-left">
            <TopSearch />
            <div className="plan-content">
              <div className="content-item">
                <div className="cover">
                  <img alt="" src="/assets/img/user.png" />
                </div>
                <div className="detail">
                  <h3>弗雷德·泰维斯</h3>
                  <p>国籍：澳大利亚</p>
                  <p>单位：悉尼大学</p>
                  <p>研究领域：中国政治；中国当代史</p>
                  <p>毛泽东研究</p>
                </div>
              </div>
              <div className="content-item">
                <div className="cover">
                  <img alt="" src="/assets/img/user.png" />
                </div>
                <div className="detail">
                  <h3>弗雷德·泰维斯</h3>
                  <p>国籍：澳大利亚</p>
                  <p>单位：悉尼大学</p>
                  <p>研究领域：中国政治；中国当代史</p>
                  <p>毛泽东研究</p>
                </div>
              </div>
              <div className="content-item">
                <div className="cover">
                  <img alt="" src="/assets/img/user.png" />
                </div>
                <div className="detail">
                  <h3>弗雷德·泰维斯</h3>
                  <p>国籍：澳大利亚</p>
                  <p>单位：悉尼大学</p>
                  <p>研究领域：中国政治；中国当代史</p>
                  <p>毛泽东研究</p>
                </div>
              </div>
              <div className="content-item">
                <div className="cover">
                  <img alt="" src="/assets/img/user.png" />
                </div>
                <div className="detail">
                  <h3>弗雷德·泰维斯</h3>
                  <p>国籍：澳大利亚</p>
                  <p>单位：悉尼大学</p>
                  <p>研究领域：中国政治；中国当代史</p>
                  <p>毛泽东研究</p>
                </div>
              </div>
              <div className="content-item">
                <div className="cover">
                  <img alt="" src="/assets/img/user.png" />
                </div>
                <div className="detail">
                  <h3>弗雷德·泰维斯</h3>
                  <p>国籍：澳大利亚</p>
                  <p>单位：悉尼大学</p>
                  <p>研究领域：中国政治；中国当代史</p>
                  <p>毛泽东研究</p>
                </div>
              </div>
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} />
        </div>
      </div>
    );
  }
}

export default Plan5;
