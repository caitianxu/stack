import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { _get_url_search } from "../../store/Action";
import "./Description.scss";

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState()
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
      if (param.type == "resource") {
        document.documentElement.scrollTop = 1420;
      } else if (param.type == "award") {
        document.documentElement.scrollTop = 2290;
      }
    });
  }
  render() {
    const { base } = this.state;
    return (
      <div className="description-page">
        <div className="page-main page-main-1">
          <Header base={base} />
          <div className="description-content">
            <ul className="menus">
              <li>
                <h3>关于我们</h3>
                <p>About us</p>
              </li>
              <li className="active">
                <h3>产品介绍</h3>
                <p>Product description</p>
              </li>
              <li>
                <h3>帮助中心</h3>
                <p>Help</p>
              </li>
              <li>
                <h3>联系我们</h3>
                <p>Contact us</p>
              </li>
            </ul>
            <div className="remark">
              <div className="title">
                <h3>产品简介</h3>
                <p>Product introduction</p>
              </div>
              <div className="detail">
                <div className="cll">
                  <p>
                    《中国问题研究文献出版目录及服务平台》汇聚海内外关于中国问题研究的相关文献目录，整合多语种特色资源，包括期刊论文、学位论文、会议论文、图书、研究报告、统计数据等，
                    面向全球的中国问题研究学者、学术机构，提供全面、专业的世界各国对中国问题研究最新成果的题录索引服务和文献应用服务，旨在服务海内外深入研究最受关注的中国问题，推动中外
                    文化交流，提升中国文化的国际影响力，从战略研究层面做知识服务，为国家智库提供帮助。
                  </p>
                </div>
                <div className="img"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-main page-main-2">
          <div className="resource-content">
            <div className="title">
              <h3>内容资源</h3>
              <p>Resource</p>
            </div>
            <div className="detail">
              <div className="detail-item">
                <div className="style-border">
                  <i className="style-1"></i>
                  <i className="style-2"></i>
                  <i className="style-3"></i>
                  <i className="style-4"></i>
                </div>
                <div className="detail-content">
                  <h3>文献</h3>
                  <p>
                    广泛收录中国问题研究论文及图书的题录信息，可按主题分类、文献类型、语
                    言、年份等进行检索和浏览
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="style-border">
                  <i className="style-1"></i>
                  <i className="style-2"></i>
                  <i className="style-3"></i>
                  <i className="style-4"></i>
                </div>
                <div className="detail-content">
                  <h3>图书</h3>
                  <p>
                    立足中国人民大学研究报告系列，包含智库报告、学术报告、统计公报、政府报告等内容，持续聚焦中国发展中的热点、焦点和重大战略问题
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="style-border">
                  <i className="style-1"></i>
                  <i className="style-2"></i>
                  <i className="style-3"></i>
                  <i className="style-4"></i>
                </div>
                <div className="detail-content">
                  <h3>政策</h3>
                  <p>
                    收录中国问题研究相关的最新政策与政策解读，聚焦发展方针，展现当代中国政策环境
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="style-border">
                  <i className="style-1"></i>
                  <i className="style-2"></i>
                  <i className="style-3"></i>
                  <i className="style-4"></i>
                </div>
                <div className="detail-content">
                  <h3>专家</h3>
                  <p>
                    汇集海内外中国研究领域的知名专家学者信息，彰显学界的名家风采
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="style-border">
                  <i className="style-1"></i>
                  <i className="style-2"></i>
                  <i className="style-3"></i>
                  <i className="style-4"></i>
                </div>
                <div className="detail-content">
                  <h3>机构</h3>
                  <p>
                    整合中国问题研究权威机构的研究领域机构专家、出版物、研究课题等相关信息
                  </p>
                </div>
              </div>
              <div className="detail-item">
                <div className="style-border">
                  <i className="style-1"></i>
                  <i className="style-2"></i>
                  <i className="style-3"></i>
                  <i className="style-4"></i>
                </div>
                <div className="detail-content">
                  <h3>专题</h3>
                  <p>
                    围绕中国经济、中国政治、中国教育、中国文化等方面的热点问题整合图书、文献、专家等库内资源，充分挖掘资源的应用价值
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-main page-main-3">
          <div className="award-content">
            <div className="title">
              <h3>奖项荣誉</h3>
              <p>Award</p>
            </div>
            <div className="award-items">
              <div className="award-item">
                <div className="cover c1"></div>
                <p className="p1">“融合发展创新应用”推优案例</p>
                <p className="p2">2019中国数字出版创新论坛</p>
                <p className="p3">2019.05.27</p>
              </div>
              <div className="award-item">
                <div className="cover c2"></div>
                <p className="p1">“创新项目”奖</p>
                <p className="p2">第八届中国数字出版博览会</p>
                <p className="p3">2019.07.24</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
