import React, { Component } from "react";
import store from "../../store/store";
import "./Index.scss";

import Plan1 from "./Plan1";
import Plan2 from "./Plan2";
import Plan3 from "./Plan3";
import Plan4 from "./Plan4";
import Plan5 from "./Plan5";
import Plan6 from "./Plan6";
import Plan7 from "./Plan7";
import Plan8 from "./Plan8";
import Classly from "../../components/classly/Classly";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      width: 1920,
      height: 980,
      menuIndex: 0
    };
    store.subscribe(this.storeChange);
  }
  //更新store
  storeChange = () => {
    this.setState({
      base: store.getState()
    });
  };
  //销毁
  componentWillUnmount() {
    document.body.className = "";
    this.setState = () => {
      return;
    };
  }
  componentDidMount() {
    document.body.className = "mainPage";
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
        if (menuIndex > 7) {
          menuIndex = 7;
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
        if (menuIndex > 7) {
          menuIndex = 7;
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
        height}px)`;
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  };
  changeIndex = menuIndex => {
    if (this.loading) return;
    if (this.state.base.classly_visible) return;
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
    const { width, height, menuIndex, base } = this.state;
    return (
      <div
        className="main-page"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="main-page-content" style={{ height: `${height}px` }}>
          <div className="plans" ref={el => (this.plansElement = el)}>
            <Plan1
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan2
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan3
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan4
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan5
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan6
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan7
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
            <Plan8
              base={base}
              height={height}
              menuIndex={menuIndex}
              changeIndex={this.changeIndex}
            />
          </div>
          <Classly ref={el => (this.classlyElement = el)} base={base} />
        </div>
      </div>
    );
  }
}
