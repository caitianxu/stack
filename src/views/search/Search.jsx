import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HTTP from "../../script/service";
import { _get_url_search } from "../../store/Action";
import asyncComponent from "../../script/asyncComponent";
import "./Search.scss";

const Mechanism = asyncComponent(() => import("./Mechanism"));
const Expert = asyncComponent(() => import("./Expert"));
const Policy = asyncComponent(() => import("./Policy"));
const Book = asyncComponent(() => import("./Book"));
const Paper = asyncComponent(() => import("./Paper"));

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      index: 5
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
    this.setState = () => {
      return;
    };
  }
  componentDidMount() {
    _get_url_search(param => {
      if (param.type == "cooperation") {
        //document.documentElement.scrollTop = 1375;
      }
    });
  }
  //改变tab
  changeTab = index => {
    this.setState({
      index: index
    });
  };
  render() {
    const { base, index } = this.state;
    return (
      <div className="search-page">
        <Header base={base} />
        <div className="search-content">
          <ul className="menus">
            <li
              className={index == 1 ? "active" : ""}
              onClick={this.changeTab.bind(this, 1)}
            >
              论文 Paper
            </li>
            <li
              className={index == 2 ? "active" : ""}
              onClick={this.changeTab.bind(this, 2)}
            >
              图书 Book
            </li>
            <li
              className={index == 3 ? "active" : ""}
              onClick={this.changeTab.bind(this, 3)}
            >
              政策 Policy
            </li>
            <li
              className={index == 4 ? "active" : ""}
              onClick={this.changeTab.bind(this, 4)}
            >
              专家 Expert
            </li>
            <li
              className={index == 5 ? "active" : ""}
              onClick={this.changeTab.bind(this, 5)}
            >
              机构 Mechanism
            </li>
          </ul>
        </div>
        <div className="search-parent">
          {index == 1 ? <Paper base={base} /> : null}
          {index == 2 ? <Book base={base} /> : null}
          {index == 3 ? <Policy base={base} /> : null}
          {index == 4 ? <Expert base={base} /> : null}
          {index == 5 ? <Mechanism base={base} /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
