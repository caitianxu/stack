import React, { Component } from "react";
import { Icon, Modal, message } from "antd";
import Scrollbar from "react-scrollbars-custom";
import { _set_classly_visible } from "../../store/Action";
import "./Classly.scss";
import HTTP from "../../script/service";

class Classly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false,
      selectIndex: 0,
      dataEnglish: {
        13: "Chinese politics",
        14: "China's Economy and Management",
        15: "Chinese military",
        16: "Chinese Philosophy",
        17: "Chinese history",
        18: "Geography of China",
        19: "Social Sciences",
        20: "Chinese law",
        21: "Chinese Language and Writing",
        22: "Education in China",
        23: "Chinese culture",
        24: "Chinese literature",
        25: "Chinese art",
        26: "China Sports",
        27: "Chinese Medicine",
        28: "Religion",
        302: "Other"
      },
      data: [],
      childData: null
    };
  }
  changeSwIndex = index => {
    this.setState({
      selectIndex: index
    });
  };
  shoeChildModal = cat => {
    HTTP._get_web_cat({
      cat_pid: cat.cat_id
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          childVisible: true,
          childData: { ...cat, child: [...res.data] }
        });
      } else {
        message.error(res.message);
      }
    });
  };
  hideChildModal = () => {
    this.setState({
      childVisible: false
    });
  };
  componentDidMount() {
    HTTP._get_web_cat({
      cat_pid: 0
    }).then(res => {
      if (res.code == 0) {
        let { data } = this.state;
        let oneErray = [];
        res.data.forEach((one, i) => {
          if (oneErray.length == 8) {
            data.push({
              index: data.length,
              list: [...oneErray]
            });
            oneErray = [];
          }
          oneErray.push(one);
        });
        if (oneErray.length > 0) {
          data.push({
            index: data.length,
            list: [...oneErray]
          });
        }
      }
    });
  }
  render() {
    const {
      data,
      selectIndex,
      childVisible,
      childData,
      dataEnglish
    } = this.state;
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
                        transform: `translateX(${selectIndex * -1520}px)`
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
                                <div
                                  key={`col-${col}`}
                                  className={`view view-${view.cat_id}`}
                                  onClick={this.shoeChildModal.bind(this, view)}
                                >
                                  {/* <div className="style-border">
                                    <i className="style-1"></i>
                                    <i className="style-2"></i>
                                    <i className="style-3"></i>
                                    <i className="style-4"></i>
                                  </div> */}
                                  <div
                                    className={`view-content view-type-${view.cat_id}`}
                                  >
                                    <div className="num">
                                      {view.res_count || 0}
                                    </div>
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
            {childData ? (
              <div className="modal-parent-content">
                <div className="modal-content-header">
                  <div className="header-title">
                    <h3>
                      {childData.cat_name}
                      <label>{dataEnglish[childData.cat_id]}</label>
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
                        {childData.child.map((item, index) => {
                          return (
                            <div
                              className="classly-mini-item"
                              key={`child-${index}`}
                            >
                              <label>{item.cat_name}</label>
                              {item.res_count || 0}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Scrollbar>
                </div>
              </div>
            ) : null}
          </div>
        </Modal>
      </span>
    );
  }
}

export default Classly;
