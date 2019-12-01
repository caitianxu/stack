import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menus from "./Menus";
import TopSearch from "./TopSearch";

class Plan1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "papers"
    };
  }
  changeType = type => {
    this.setState({
      type: type
    });
  };
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { type } = this.state;
    return (
      <div className="plan plan-1" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url={type} />
            <div className="banner">
              <img alt="" src="/assets/img/bann1.png" />
            </div>
            <div className="classly">
              <span className="classly-link" onMouseOver={this.changeType.bind(this, "paper")}>
                <Link to="/index">
                  <div className={type == "paper" ? "cover paper active" : "cover paper"}></div>
                  <p>3,800,200+</p>
                  <p>论文</p>
                  <p>Academic Paper</p>
                </Link>
              </span>
              <span className="classly-link" onMouseOver={this.changeType.bind(this, "book")}>
                <Link to="/index">
                  <div className={type == "book" ? "cover book active" : "cover book"}></div>
                  <p>800,200+</p>
                  <p>图书</p>
                  <p>Books</p>
                </Link>
              </span>
              <span className="classly-link" onMouseOver={this.changeType.bind(this, "policy")}>
                <Link to="/index">
                  <div className={type == "policy" ? "cover policy active" : "cover policy"}></div>
                  <p>300,200+</p>
                  <p>政策</p>
                  <p>Policy</p>
                </Link>
              </span>
              <span className="classly-link" onMouseOver={this.changeType.bind(this, "expert")}>
                <Link to="/index">
                  <div className={type == "expert" ? "cover expert active" : "cover expert"}></div>
                  <p>6200+</p>
                  <p>专家</p>
                  <p>Experts</p>
                </Link>
              </span>
              <span className="classly-link" onMouseOver={this.changeType.bind(this, "mechanism")}>
                <Link to="/index">
                  <div className={type == "mechanism" ? "cover mechanism active" : "cover mechanism"}></div>
                  <p>600+</p>
                  <p>机构</p>
                  <p>Organization</p>
                </Link>
              </span>
              <span className="classly-link" onMouseOver={this.changeType.bind(this, "topic")}>
                <Link to="/index">
                  <div className={type == "topic" ? "cover topic active" : "cover topic"}></div>
                  <p>10+</p>
                  <p>专题</p>
                  <p>Topics</p>
                </Link>
              </span>
            </div>
            <span className="special-icon">
              <Link to="/specials" />
            </span>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default Plan1;
