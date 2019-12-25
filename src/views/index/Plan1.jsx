import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menus from "./Menus";
import { Carousel } from "antd";
import TopSearch from "./TopSearch";
import HTTP from "../../script/service";
import Util from "../../script/util";

class Plan1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selIndex: 0,
      data: [
        {
          name: "papers",
          item_id: 43,
          title: "论文",
          enTitle: "Academic Paper",
          count: 0,
          contentList: []
        },
        {
          name: "books",
          item_id: 44,
          title: "图书",
          enTitle: "Books",
          count: 0,
          contentList: []
        },
        {
          name: "policys",
          item_id: 45,
          title: "政策",
          enTitle: "Policy",
          count: 0,
          contentList: []
        },
        {
          name: "experts",
          item_id: 46,
          title: "专家",
          enTitle: "Experts",
          count: 0,
          contentList: []
        },
        {
          name: "mechanisms",
          item_id: 47,
          title: "机构",
          enTitle: "Organization",
          count: 0,
          contentList: []
        },
        {
          name: "subjects",
          item_id: 48,
          title: "专题",
          enTitle: "Topics",
          count: 0,
          contentList: []
        }
      ]
    };
  }
  changeType = index => {
    this.setState({
      selIndex: index
    });
  };
  componentDidMount() {
    HTTP._web_index_1().then(res => {
      let { data } = this.state;
      res.data.forEach((item, index) => {
        data[index].count = Util.numberFormat(item.count);
        data[index].contentList = item.contentList;
      });
      console.log("plan1", data);
      this.setState({
        data: [...data]
      });
    });
  }
  render() {
    const { height, menuIndex, changeIndex, base } = this.props;
    const { data, selIndex } = this.state;
    return (
      <div className="plan plan-1" style={{ height: `${height}px` }}>
        <div className="main-page-parent">
          <div className="plan-left">
            <TopSearch base={base} url={data[selIndex].name} />
            <div className="banner">
              <Carousel autoplay>
                {data[selIndex].contentList.map((item, index) => {
                  return (
                    <a target="_blank" rel="noopener noreferrer" href={item.url} className="car-link" key={`car-link-${index}`}>
                      <img alt="" src={Util.transImgUrl(item.cover)} />
                    </a>
                  );
                })}
              </Carousel>
            </div>
            <div className="classly">
              {data.map((item, index) => {
                return (
                  <span
                    className="classly-link"
                    key={`classly-${index}`}
                    onMouseOver={this.changeType.bind(this, index)}
                  >
                    <Link to={`/${item.name}`}>
                      <div
                        className={
                          selIndex == index ? `cover ${item.name} active` : `cover ${item.name}`
                        }
                      ></div>
                      <p>{item.count}+</p>
                      <p>{item.title}</p>
                      <p>{item.enTitle}</p>
                    </Link>
                  </span>
                );
              })}
            </div>
            <span className="special-icon">
              <Link to="/stick.html" target="_blank"/>
            </span>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} base={base} />
        </div>
      </div>
    );
  }
}

export default Plan1;
