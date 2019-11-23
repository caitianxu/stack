import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { _get_url_search } from "../../store/Action";
import "./Search.scss";

import Mechanism from "./Mechanism";
import Expert from "./Expert";
import Policy from "./Policy";
import Book from "./Book";
import Paper from "./Paper";

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
      if (param.type == "paper" || param.type == "book" || param.type == "policy" || param.type == "expert" || param.type == "mechanism") {
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
            <li className={index == "paper" ? "active" : ""} onClick={this.changeTab.bind(this, "paper")}>
              论文 Paper
            </li>
            <li className={index == "book" ? "active" : ""} onClick={this.changeTab.bind(this, "book")}>
              图书 Book
            </li>
            <li className={index == "policy" ? "active" : ""} onClick={this.changeTab.bind(this, "policy")}>
              政策 Policy
            </li>
            <li className={index == "expert" ? "active" : ""} onClick={this.changeTab.bind(this, "expert")}>
              专家 Expert
            </li>
            <li className={index == "mechanism" ? "active" : ""} onClick={this.changeTab.bind(this, "mechanism")}>
              机构 Mechanism
            </li>
          </ul>
        </div>
        <div className="search-parent">
          {index == "paper" ? <Paper base={base} /> : null}
          {index == "book" ? <Book base={base} /> : null}
          {index == "policy" ? <Policy base={base} /> : null}
          {index == "expert" ? <Expert base={base} /> : null}
          {index == "mechanism" ? <Mechanism base={base} /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
