import React, { Component } from "react";

class Expert extends Component {
  render() {
    return (
      <div className="search-form">
        <div className="search-row">
          <label className="search-label">姓名 Name：</label>
          <div className="search-control">
            <input type="text" name="org_name" placeholder="姓名/译名/曾用名" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">单位 Unit：</label>
          <div className="search-control">
            <input type="text" name="org_name" placeholder="所在单位/曾供职" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">职位 position：</label>
          <div className="search-control">
            <input type="text" name="position" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">研究领域 Research areas：</label>
          <div className="search-control max">
            <input type="text" name="research" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在地区 Area：</label>
          <div className="search-control max">
            <input type="text" name="area" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">所在国家 Country：</label>
          <div className="search-control max">
            <input type="text" name="country" />
          </div>
        </div>
        <div className="search-row">
          <label className="search-label">国籍 nationality：</label>
          <div className="search-control min">
            <input type="text" name="pubdate" />
          </div>
        </div>
        <div className="search-actions">
          <button className="b1">检索Search</button>
          <button className="b2">重置Reset</button>
        </div>
      </div>
    );
  }
}

export default Expert;
