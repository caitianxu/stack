import React, { Component } from "react";
import { Icon } from "antd";
import { _set_classly_visible } from "../../store/Action";

class Menus extends Component {
  changeIndex = menuIndex => {
    this.props.changeIndex(menuIndex);
  };
  render() {
    const { menuIndex } = this.props;
    return (
      <div className="plan-right right-menus">
        <span className="title" onClick={_set_classly_visible.bind(this, true)}>
          <div className="t1">
            <Icon type="align-left" />
            分类
          </div>
          <p>Classification</p>
        </span>
        <span
          className={menuIndex == 0 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 0)}
        >
          壹
        </span>
        <span
          className={menuIndex == 1 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 1)}
        >
          {menuIndex == 1 ? (
            <span>
              <h4>国际研究</h4>
              <p>International Research</p>
            </span>
          ) : (
            <span>贰</span>
          )}
        </span>
        <span
          className={menuIndex == 2 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 2)}
        >
          {menuIndex == 2 ? (
            <span>
              <h4>国内研究</h4>
              <p>Domestic Research</p>
            </span>
          ) : (
            <span>叁</span>
          )}
        </span>
        <span
          className={menuIndex == 3 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 3)}
        >
          {menuIndex == 3 ? (
            <span>
              <h4>政策/丛书</h4>
              <p>Policy/Series book</p>
            </span>
          ) : (
            <span>肆</span>
          )}
        </span>
        <span
          className={menuIndex == 4 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 4)}
        >
          {menuIndex == 4 ? (
            <span>
              <h4>研究学者</h4>
              <p>Scholars</p>
            </span>
          ) : (
            <span>伍</span>
          )}
        </span>
        <span
          className={menuIndex == 5 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 5)}
        >
          {menuIndex == 5 ? (
            <span>
              <h4>研究机构</h4>
              <p>Institutions</p>
            </span>
          ) : (
            <span>陆</span>
          )}
        </span>
        <span
          className={menuIndex == 6 ? "tab active" : "tab"}
          onClick={this.changeIndex.bind(this, 6)}
        >
          柒
        </span>
      </div>
    );
  }
}

export default Menus;
