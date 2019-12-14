import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import HTTP from "../../script/service";
import { withRouter } from "react-router-dom";
import Util from "../../script/util";

class Plan5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    HTTP._web_index_5().then(res => {
      console.log("plan5", res.data);
      this.setState({
        data: [...res.data]
      });
    });
  }
  //专家
  toExpert = item => {
    this.props.history.push(`./expert?id=${item.res_id}`);
  };
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { data } = this.state;
    return (
      <div className="plan plan-5" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="experts" />
            <div className="plan-content">
              {data.map((item, index) => {
                return (
                  <div
                    className="content-item"
                    key={`user-${index}`}
                    onClick={this.toExpert.bind(this, item)}
                  >
                    <div className="cover">
                      <img alt="" src={Util.transImgUrl(item.cover)} />
                    </div>
                    <div className="detail">
                      <h3>弗雷德·泰维斯</h3>
                      <p>国籍：{item.country}</p>
                      <p>单位：悉尼大学</p>
                      <p>研究领域：中国政治；中国当代史</p>
                      <p>毛泽东研究</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default withRouter(Plan5);
