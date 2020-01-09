import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";
import HTTP from "../../script/service";

class Plan6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    HTTP._web_index_6().then(res => {
      this.setState({
        data: [...res.data]
      });
    });
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { data } = this.state;
    return (
      <div className="plan plan-6" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url="mechanisms" />
            <div className="plan-content">
              <div className="ml-list">
                {data.map((item, index) => {
                  return (
                    <div className="ml-item" key={`item-${index}`}>
                      <Link to={`/mechanism?id=${item.res_id}`}>{item.title}</Link>
                    </div>
                  );
                })}
                <div className="content-more">
                  <Link to="/mechanisms">MORE >></Link>
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
