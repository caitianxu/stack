import React, { Component } from "react";
import { Icon } from "antd";

class Menus extends Component {
  changeIndex = index => {
    this.props.changeIndex(index);
  };
  render() {
    const { index } = this.props;
    return (
      <div className="plan-right right-menus">
        <span className="title">
          <div className="t1">
            <Icon type="align-left" />
            分类
          </div>
          <p>Classification</p>
        </span>
        <span
          className={index == 0 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 0)}
        >
          壹
        </span>
        <span
          className={index == 1 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 1)}
        >
          贰
        </span>
        <span
          className={index == 2 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 2)}
        >
          叁
        </span>
        <span
          className={index == 3 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 3)}
        >
          肆
        </span>
        <span
          className={index == 4 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 4)}
        >
          伍
        </span>
        <span
          className={index == 5 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 5)}
        >
          陆
        </span>
        <span
          className={index == 6 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 6)}
        >
          柒
        </span>
      </div>
    );
  }
}

export default Menus;
