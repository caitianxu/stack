import React, { Component } from "react";
import Plan1 from "./Plan1";
import Plan2 from "./Plan2";
import Plan3 from "./Plan3";
import Plan4 from "./Plan4";
import Plan5 from "./Plan5";
import Plan6 from "./Plan6";
import Plan7 from "./Plan7";
import "./Index.scss";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1920,
      height: 980,
      index: 0
    };
  }
  componentDidMount() {
    this.resize();
    this.loading = false;
    window.addEventListener("resize", this.resize);
    window.addEventListener("mousewheel", this.scrollFunc);
  }
  scrollFunc = e => {
    e = e || window.event;
    if (e.wheelDelta) {
      if (e.wheelDelta > 0) {
        let index = this.state.index - 1;
        if (index < 0) {
          index = 0;
        }
        this.changeIndex(index);
      }
      if (e.wheelDelta < 0) {
        let index = this.state.index + 1;
        if (index > 6) {
          index = 6;
        }
        this.changeIndex(index);
      }
    } else if (e.detail) {
      if (e.detail > 0) {
        let index = this.state.index - 1;
        if (index < 0) {
          index = 0;
        }
        this.changeIndex(index);
      }
      if (e.detail < 0) {
        let index = this.state.index + 1;
        if (index > 6) {
          index = 6;
        }
      }
    }
  };
  resize = () => {
    this.setState(
      {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      },
      () => {
        this.changeMove();
      }
    );
  };
  changeMove = move => {
    const { height, index } = this.state;
    if (this.plansElement) {
      if (move) {
        this.plansElement.style.transitionDuration = "0.5s";
      } else {
        this.plansElement.style.transitionDuration = "0s";
      }
      this.plansElement.style.transform = `translateY(-${index * height}px)`;
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  };
  changeIndex = index => {
    if (this.loading) return;
    this.loading = true;
    this.setState(
      {
        index: index
      },
      () => {
        this.changeMove(true);
      }
    );
  };
  render() {
    const { width, height, index } = this.state;
    return (
      <div className="page-main">
        <div
          className="index-content"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="plans" ref={el => (this.plansElement = el)}>
            <Plan1
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
            <Plan2
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
            <Plan3
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
            <Plan4
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
            <Plan5
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
            <Plan6
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
            <Plan7
              height={height}
              index={index}
              changeIndex={this.changeIndex}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
