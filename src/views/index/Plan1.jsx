import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menus from "./Menus";

class Plan1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "lunwen"
    };
  }
  changeType = type => {
    this.setState({
      type: type
    });
  };
  render() {
    const { height, index, changeIndex } = this.props;
    const { type } = this.state;
    return (
      <div className="plan" style={{ height: `${height}px` }}>
        <div className="plan-left plan-1">
          <div className="banner">
            <img alt="" src="/assets/img/bann1.png" />
          </div>
          <div className="classly">
            <span
              className="classly-link"
              onMouseOver={this.changeType.bind(this, "lunwen")}
            >
              <Link to="/index">
                <div
                  className={
                    type == "lunwen" ? "cover lunwen active" : "cover lunwen"
                  }
                ></div>
                <p>3,800,200+</p>
                <p>论文</p>
                <p>Academic Paper</p>
              </Link>
            </span>
            <span
              className="classly-link"
              onMouseOver={this.changeType.bind(this, "tushu")}
            >
              <Link to="/index">
                <div
                  className={
                    type == "tushu" ? "cover tushu active" : "cover tushu"
                  }
                ></div>
                <p>800,200+</p>
                <p>图书</p>
                <p>Books</p>
              </Link>
            </span>
            <span
              className="classly-link"
              onMouseOver={this.changeType.bind(this, "zhengce")}
            >
              <Link to="/index">
                <div
                  className={
                    type == "zhengce" ? "cover zhengce active" : "cover zhengce"
                  }
                ></div>
                <p>300,200+</p>
                <p>政策</p>
                <p>Policy</p>
              </Link>
            </span>
            <span
              className="classly-link"
              onMouseOver={this.changeType.bind(this, "expert")}
            >
              <Link to="/index">
                <div
                  className={
                    type == "expert" ? "cover expert active" : "cover expert"
                  }
                ></div>
                <p>6200+</p>
                <p>专家</p>
                <p>Experts</p>
              </Link>
            </span>
            <span
              className="classly-link"
              onMouseOver={this.changeType.bind(this, "jigou")}
            >
              <Link to="/index">
                <div
                  className={
                    type == "jigou" ? "cover jigou active" : "cover jigou"
                  }
                ></div>
                <p>600+</p>
                <p>机构</p>
                <p>Organization</p>
              </Link>
            </span>
            <span
              className="classly-link"
              onMouseOver={this.changeType.bind(this, "special")}
            >
              <Link to="/index">
                <div
                  className={
                    type == "special" ? "cover special active" : "cover special"
                  }
                ></div>
                <p>10+</p>
                <p>专题</p>
                <p>Topics</p>
              </Link>
            </span>
          </div>
          <span className="special-icon">
            <Link to="/index" />
          </span>
        </div>
        <Menus index={index} changeIndex={changeIndex} />
      </div>
    );
  }
}

export default Plan1;
