import React, { Component } from "react";
import Footer from "../../components/footer/Footer";

class Plan8 extends Component {
  render() {
    const { height } = this.props;
    return (
      <div className="plan plan-8" style={{ height: `${height}px` }}>
        <div className="plan-bg">
          <div className="plan-content">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Plan8;
