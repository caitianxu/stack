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
      menuIndex: 0
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
        let menuIndex = this.state.menuIndex - 1;
        if (menuIndex < 0) {
          menuIndex = 0;
        }
        this.changeIndex(menuIndex);
      }
      if (e.wheelDelta < 0) {
        let menuIndex = this.state.menuIndex + 1;
        if (menuIndex > 6) {
          menuIndex = 6;
        }
        this.changeIndex(menuIndex);
      }
    } else if (e.detail) {
      if (e.detail > 0) {
        let menuIndex = this.state.menuIndex - 1;
        if (menuIndex < 0) {
          menuIndex = 0;
        }
        this.changeIndex(menuIndex);
      }
      if (e.detail < 0) {
        let menuIndex = this.state.menuIndex + 1;
        if (menuIndex > 6) {
          menuIndex = 6;
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
    const { height, menuIndex } = this.state;
    if (this.plansElement) {
      if (move) {
        this.plansElement.style.transitionDuration = "0.5s";
      } else {
        this.plansElement.style.transitionDuration = "0s";
      }
      this.plansElement.style.transform = `translateY(-${menuIndex *
        (height + 50)}px)`;
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  };
  changeIndex = menuIndex => {
    if (this.loading) return;
    this.loading = true;
    this.setState(
      {
        menuIndex: menuIndex
      },
      () => {
        this.changeMove(true);
      }
    );
  };
  render() {
    const { width, height, menuIndex } = this.state;
    return (
      <div className="page-main">
        <div
          className="index-content"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="plans" ref={el => (this.plansElement = el)}>
            <Plan1
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan2
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan3
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan4
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan5
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan6
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan7
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
