import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menus from "./Menus";

class Plan7 extends Component {
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
        <div className="plan-left">
          
        </div>
        <Menus index={index} changeIndex={changeIndex} />
      </div>
    );
  }
}

export default Plan7;
