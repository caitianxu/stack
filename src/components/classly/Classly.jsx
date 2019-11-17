import React, { Component } from "react";
import { Icon, Modal } from "antd";
import Scrollbar from "react-scrollbars-custom";
import { _set_classly_visible } from "../../store/Action";
import "./Classly.scss";

class Classly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false,
      selectIndex: 0,
      data: [
        {
          index: 0,
          list: [
            {
              id: 1,
              name: "中国法律",
              dec: "Chinese law",
              number: 245844
            },
            {
              id: 2,
              name: "社会科学",
              dec: "Social Sciences",
              number: 114209
            },
            {
              id: 3,
              name: "中国地理",
              dec: "Geography of China",
              number: 14879
            },
            {
              id: 4,
              name: "中国历史",
              dec: "Chinese history",
              number: 2510103
            },
            {
              id: 5,
              name: "中国哲学",
              dec: "Chinese Philosophy",
              number: 37527
            },
            {
              id: 6,
              name: "中国军事",
              dec: "Chinese military",
              number: 24904
            },
            {
              id: 7,
              name: "中国经济与管理",
              dec: `China's Economy and Management`,
              number: 1386323
            },
            {
              id: 8,
              name: "中国政治",
              dec: `Chinese politics`,
              number: 330426
            }
          ]
        },
        {
          index: 1,
          list: [
            {
              id: 9,
              name: "中国语言、文字",
              dec: "Chinese Language and Writing",
              number: 44874
            },
            {
              id: 10,
              name: "中国教育",
              dec: "Education in China",
              number: 104965
            },
            {
              id: 11,
              name: "其他",
              dec: "Other",
              number: 117136
            },
            {
              id: 12,
              name: "宗教",
              dec: "Religion",
              number: 45794
            },
            {
              id: 13,
              name: "中国医学",
              dec: "Chinese Medicine",
              number: 520752
            },
            {
              id: 14,
              name: "中国体育",
              dec: "China Sports",
              number: 62744
            },
            {
              id: 15,
              name: "中国艺术",
              dec: "Chinese art",
              number: 91452
            },
            {
              id: 16,
              name: "中国文学",
              dec: "Chinese literature",
              number: 292377
            }
          ]
        },
        {
          index: 2,
          list: [
            {
              id: 17,
              name: "中国文化",
              dec: "Chinese culture",
              number: 135678
            }
          ]
        }
      ]
    };
  }
  changeSwIndex = index => {
    this.setState({
      selectIndex: index
    });
  };
  shoeChildModal = () => {
    this.setState({
      childVisible: true
    });
  }
  hideChildModal = () => {
    this.setState({
      childVisible: false
    });
  };
  render() {
    const { data, selectIndex, childVisible } = this.state;
    const { base } = this.props;
    return (
      <span>
        {base.classly_visible ? (
          <div className="com-classly fadeIn animated faster">
            <div className="classly-content">
              <div className="classly-main">
                <div className="classly-center">
                  <div className="sw-parent">
                    <div
                      className="sw-scroll"
                      style={{
                        transform: `translateX(${selectIndex * -1400}px)`
                      }}
                    >
                      {data.map((item, row) => {
                        return (
                          <div
                            key={`views-${row}`}
                            className={`sw-views sw-row-${item.index}`}
                          >
                            {item.list.map((view, col) => {
                              return (
                                <div key={`col-${col}`} className="view" onClick={this.shoeChildModal}>
                                  <div className="style-border">
                                    <i className="style-1"></i>
                                    <i className="style-2"></i>
                                    <i className="style-3"></i>
                                    <i className="style-4"></i>
                                  </div>
                                  <div className="view-content">
                                    <div className="name">
                                      <span>{view.name}</span>
                                    </div>
                                    <p className="dec">{view.dec}</p>
                                    <div className="num">{view.number}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sw-pagetion">
                    {data.map((item, index) => (
                      <span
                        key={`key-${index}`}
                        onClick={this.changeSwIndex.bind(this, index)}
                        className={selectIndex == index ? "active" : null}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="classly-action">
              <span
                className="close"
                onClick={_set_classly_visible.bind(this, false)}
              >
                <Icon type="close" />
              </span>
              <span className="title">
                <h3>分类</h3>
                <p>Classification</p>
              </span>
            </div>
          </div>
        ) : null}
        <Modal
          visible={childVisible}
          wrapClassName="daidai-modal-style"
          centered={true}
          closable={false}
          footer={null}
          keyboard={false}
          maskClosable={true}
          width="550px"
          onCancel={this.hideChildModal}
        >
          <div className="modal-parent-plan classly-child-plan">
            <div className="style-border">
              <i className="style-1"></i>
              <i className="style-2"></i>
              <i className="style-3"></i>
              <i className="style-4"></i>
            </div>
            <div className="modal-parent-content">
              <div className="modal-content-header">
                <div className="header-title">
                  <h3>
                    中国经济与管理<label>China's Economy and Management</label>
                  </h3>
                  <span className="close" onClick={this.hideChildModal}>
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="modal-content-conter">
                <Scrollbar className="my-scroll-bar">
                  <div className="my-scroll-line">
                    <div className="child-classly-items">
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                      <div className="classly-mini-item">
                        婚姻家庭法 <label>883</label>
                      </div>
                      <div className="classly-mini-item">
                        自然资源与环境保护法 <label>10439</label>
                      </div>
                    </div>
                  </div>
                </Scrollbar>
              </div>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}

export default Classly;
