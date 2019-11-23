import React, { Component } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";

class Expert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      org_name: null,
      position: null,
      research: null,
      area: null,
      country: null
    };
  }

  changeFormValue = e => {
    let ps = {};
    ps[e.target.name] = e.target.value;
    this.setState(ps);
  };
  toSearch = () => {
    let param = qs.stringify(this.state);
    this.props.history.push(`/expert?${param}`);
  };
  toReset = () => {
    this.setState({
      name: null,
      org_name: null,
      position: null,
      research: null,
      area: null,
      country: null
    });
  };
  render() {
    const { name, org_name, position, research, area, country } = this.state;
    return (
      <div className="search-form">
        <div className="search-row">
          <label className="search-label">姓名 Name：</label>
          <div className="search-control">
            <input type="text" name="name" value={name || ""} onChange={this.changeFormValue} placeholder="姓名/译名/曾用名" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">单位 Unit：</label>
          <div className="search-control">
            <input type="text" name="org_name" value={org_name || ""} onChange={this.changeFormValue} placeholder="所在单位/曾供职" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">职位 position：</label>
          <div className="search-control">
            <input type="text" name="position" value={position || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">研究领域 Research areas：</label>
          <div className="search-control max">
            <input type="text" name="research" value={research || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在地区 Area：</label>
          <div className="search-control max">
            <input type="text" name="area" value={area || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在国家 Country：</label>
          <div className="search-control max">
            <input type="text" name="country" value={country || ""} onChange={this.changeFormValue} />
          </div>
        </div>
        <div className="search-actions">
          <button className="b1" onClick={this.toSearch}>
            检索Search
          </button>
          <button className="b2" onClick={this.toReset}>
            重置Reset
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Expert);
