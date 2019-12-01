import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { _get_url_search } from "../../store/Action";
import "./Search.scss";

import Mechanisms from "./Mechanisms";
import Experts from "./Experts";
import Policys from "./Policys";
import Books from "./Books";
import Papers from "./Papers";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      index: "paper"
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
      if (param.type == "papers" || param.type == "books" || param.type == "policys" || param.type == "experts" || param.type == "mechanisms") {
        this.setState({
          index: param.type
        });
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
            <li className={index == "papers" ? "active" : ""} onClick={this.changeTab.bind(this, "papers")}>
              论文 Paper
            </li>
            <li className={index == "books" ? "active" : ""} onClick={this.changeTab.bind(this, "books")}>
              图书 Book
            </li>
            <li className={index == "policys" ? "active" : ""} onClick={this.changeTab.bind(this, "policys")}>
              政策 Policy
            </li>
            <li className={index == "experts" ? "active" : ""} onClick={this.changeTab.bind(this, "experts")}>
              专家 Expert
            </li>
            <li className={index == "mechanisms" ? "active" : ""} onClick={this.changeTab.bind(this, "mechanisms")}>
              机构 Mechanism
            </li>
          </ul>
        </div>
        <div className="search-parent">
          {index == "papers" ? <Papers base={base} /> : null}
          {index == "books" ? <Books base={base} /> : null}
          {index == "policys" ? <Policys base={base} /> : null}
          {index == "experts" ? <Experts base={base} /> : null}
          {index == "mechanisms" ? <Mechanisms base={base} /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
