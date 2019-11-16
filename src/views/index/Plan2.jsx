import React, { Component } from "react";
import Menus from "./Menus";
import TopSearch from "./TopSearch";
import { Link } from "react-router-dom";

class Plan2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleIndex: 0,
      data: [
        {
          title: "美国USA"
        },
        {
          title: "澳大利亚AU"
        },
        {
          title: "英国UK"
        },
        {
          title: "俄罗斯Russia"
        },
        {
          title: "法国France"
        },
        {
          title: "日本Japan"
        },
        {
          title: "朝鲜Korea"
        },
        {
          title: "加拿大Canada"
        },
        {
          title: "德国Germany"
        },
        {
          title: "美国USA"
        },
        {
          title: "美国USA"
        },
        {
          title: "澳大利亚AU"
        },
        {
          title: "英国UK"
        },
        {
          title: "俄罗斯Russia"
        },
        {
          title: "法国France"
        },
        {
          title: "日本Japan"
        },
        {
          title: "朝鲜Korea"
        },
        {
          title: "加拿大Canada"
        },
        {
          title: "德国Germany"
        },
        {
          title: "美国USA"
        },
        {
          title: "澳大利亚AU"
        },
        {
          title: "英国UK"
        },
        {
          title: "俄罗斯Russia"
        },
        {
          title: "法国France"
        },
        {
          title: "日本Japan"
        },
        {
          title: "朝鲜Korea"
        },
        {
          title: "加拿大Canada"
        },
        {
          title: "德国Germany"
        },
        {
          title: "美国USA"
        },
        {
          title: "美国USA"
        },
        {
          title: "澳大利亚AU"
        },
        {
          title: "英国UK"
        },
        {
          title: "俄罗斯Russia"
        },
        {
          title: "法国France"
        },
        {
          title: "日本Japan"
        },
        {
          title: "朝鲜Korea"
        },
        {
          title: "加拿大Canada"
        },
        {
          title: "德国Germany"
        }
      ],
      dataList: [
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        },
        {
          name:
            "Health Care for Chinese Rural Residents: Policies, Programs, and Progress  Their Voices Heard: Strategies of China’s Provincial People’"
        },
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        },
        {
          name:
            "Health Care for Chinese Rural Residents: Policies, Programs, and Progress  Their Voices Heard: Strategies of China’s Provincial People’"
        },
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        },
        {
          name:
            "Health Care for Chinese Rural Residents: Policies, Programs, and Progress  Their Voices Heard: Strategies of China’s Provincial People’"
        },
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        },
        {
          name:
            "Health Care for Chinese Rural Residents: Policies, Programs, and Progress  Their Voices Heard: Strategies of China’s Provincial People’"
        },
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        },
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        },
        {
          name:
            "Health Care for Chinese Rural Residents: Policies, Programs, and Progress  Their Voices Heard: Strategies of China’s Provincial People’"
        },
        {
          name:
            "The Motivations and Impact Mechanism of Succession Patterns in Chinese Family Firms: From Socioemotional Wealth Perspective？"
        }
      ]
    };
  }
  componentDidMount() {
    this.scrollLeft = 0;
  }
  //改变title
  changeTitleIndex = index => {
    this.setState({
      titleIndex: index
    });
    //改变头部定位
    if (!this.titleScrollElement) return false;
    let allWidth = (this.titleScrollElement.clientWidth - 1150) * -1;
    let dom = document.querySelectorAll(".scroll-content span")[index];
    if (Math.abs(dom.offsetLeft + this.scrollLeft) > 900) {
      this.scrollLeft -= 200;
      if (this.scrollLeft < allWidth) {
        this.scrollLeft = allWidth;
      }
      this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
    } else if (this.scrollLeft < 0 && this.scrollLeft + dom.offsetLeft < 200) {
      this.scrollLeft += 200;
      if (this.scrollLeft > 0) {
        this.scrollLeft = 0;
      }
      this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
    }
  };
  //左移动
  changeScrollLeft = () => {
    if (!this.titleScrollElement) return false;
    let allWidth = (this.titleScrollElement.clientWidth - 1150) * -1;
    this.scrollLeft -= 1150;
    if (this.scrollLeft < allWidth) {
      this.scrollLeft = allWidth;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  //右移动
  changeScrollRight = () => {
    if (!this.titleScrollElement) return false;
    this.scrollLeft += 1150;
    if (this.scrollLeft > 0) {
      this.scrollLeft = 0;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  render() {
    const { height, menuIndex, changeIndex } = this.props;
    const { titleIndex, data, dataList } = this.state;
    return (
      <div className="plan plan-2" style={{ height: `${height}px` }}>
        <div className="plan-bg">
          <div className="plan-left">
            <TopSearch />
            <div className="row-scroll">
              <span className="scroll-left"></span>
              <div className="scroll-plan">
                <span
                  className="acc-left"
                  onClick={this.changeScrollLeft}
                ></span>
                <div className="scroll-border">
                  <div
                    className="scroll-content"
                    ref={el => (this.titleScrollElement = el)}
                  >
                    {data.map((item, index) => {
                      return (
                        <span
                          key={`title-${index}`}
                          className={index == titleIndex ? "active" : null}
                          onClick={this.changeTitleIndex.bind(this, index)}
                        >
                          {item.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <span
                  className="acc-right"
                  onClick={this.changeScrollRight}
                ></span>
              </div>
              <span className="scroll-right"></span>
            </div>
            <div className="tab-content-plan">
              <div className="content-left">
                {dataList.map((item, index) => {
                  return (
                    <div
                      key={`row-${index}`}
                      className="link-item"
                      title={item.name}
                    >
                      {item.name}
                    </div>
                  );
                })}
                <div className="more-action">
                  <Link to="/more">MORE>></Link>
                </div>
              </div>
              {data && data.length ? (
                <div className="content-right">
                  <div className="sw-left">
                    <span></span>
                  </div>
                  <div className="sw-content">
                    <div className="sw-html">
                      <h3>{data[titleIndex].title}</h3>
                      <div className="cover">
                        <img alt="" src="/assets/img/book.png" />
                      </div>
                      <div className="name">
                        书名：利维坦：美国捕鲸史美国捕鲸史
                      </div>
                      <p>作者：埃里克·杰·多林</p>
                      <p>ISBN：978-7-300-2677</p>
                      <p>出版日期：2019-6-30</p>
                      <p>分类号：D669</p>
                    </div>
                  </div>
                  <div className="sw-right">
                    <span></span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Menus menuIndex={menuIndex} changeIndex={changeIndex} />
        </div>
      </div>
    );
  }
}

export default Plan2;
