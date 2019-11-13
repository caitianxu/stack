import React, { Component } from "react";
import { _set_dicts, _get_url_search } from "../../store/Action";

class Index extends Component {
  componentDidMount() {
    _get_url_search().then(res => {
      console.log("参数：", res);
      _set_dicts();
    });
  }
  render() {
    return <div>Index</div>;
  }
}

export default Index;
