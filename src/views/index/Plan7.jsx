import React, { Component } from "react";
import Menus from "./Menus";

class Plan7 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { height, menuIndex, changeIndex } = this.props;
    return (
      <div className="plan plan-7" style={{ height: `${height}px` }}>
        <div className="plan-bg">
          <div className="plan-left"></div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} />
        </div>
      </div>
    );
  }
}

export default Plan7;
