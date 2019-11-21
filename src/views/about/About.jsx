import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { _get_url_search } from "../../store/Action";
import "./About.scss";

export default class About extends Component {
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
      if (param.type == "cooperation") {
        document.documentElement.scrollTop = 1375;
      }
    });
  }
  render() {
    const { base } = this.state;
    return (
      <div className="about-page">
        <div className="page-main page-main-1">
          <Header base={base} />
          <div className="about-content">
            <ul className="menus">
              <li className="active">
                <h3>关于我们</h3>
                <p>About us</p>
              </li>
              <li>
                <Link to="/des">
                  <h3>产品介绍</h3>
                  <p>Product description</p>
                </Link>
              </li>
              <li>
                <Link to="/help">
                  <h3>帮助中心</h3>
                  <p>Help</p>
                </Link>
              </li>
              <li>
                <Link to="/cus">
                  <h3>联系我们</h3>
                  <p>Contact us</p>
                </Link>
              </li>
            </ul>
            <div className="remark">
              <div className="title">
                <h3>公司简介</h3>
                <p>Company profile</p>
              </div>
              <div className="detail df">
                <div className="cll">
                  <p>
                    中国人民大学出版社有限公司（下称人大出版社）是一家由中国人民大学主办、教育部主管的全国性综合大型文化出版企业。
                    人大出版社具有雄厚的人文社会科学文化积淀和版权资源，具备独特的文化领域科技应用和自主创新能力，致力于推动推进文化和
                    科技融合，牢固树立新时代中国特色社会主义的道路自信、理论自信、制度自信和文化自信。
                  </p>
                  <p>
                    人大出版社成立于1955年，是新中国成立后的第一家大学出版社。1982年被教育部确定为全国高等学校文科教材出版中心，
                    2007年获首届中国出版政府奖先进出版单位奖，2009年获首届全国百佳图书出版单位荣誉称号。新世纪以来，人大出版社把融合
                    发展作为自己的战略定位，服务教育、服务学术、服务社会，在文化和科技融合领域科技成果转化业绩突出，成为中国最重要的高
                    校教材和学术著作数字出版基地之一，是典型的高校科研成果、文化资源和科技转化示范企业。
                  </p>
                </div>
                <div className="img"></div>
              </div>
              <div className="detail">
                <p>
                  人大出版社近年来提出了“深耕主业、多元开拓、融合发展”的经营战略，并于2012年成立北京人大数字科技有限公司（下
                  称数字公司）。数字公司专注于融合出版领域，通过新技术的研发与应用整合出版社的传统资源与智力资源，先后自主开发了“中国问题研究文献出版目录及服务平台”“中国思想与文化
                  名家数据库”“中国审判案例数据库”等数据库产品。目前，海内外共有200余家高校及公共图书馆成为数据库的使用用户，数据库上线以来，多次荣获行业大奖，得到了专家学者的充分
                  肯定，并取得了良好的市场反馈。“十二五”期间，中国人民大学出版社成为中央转型示范单位。2018年，人大出版社入选第二批专业数字内容资源知识服务模式试点单位。
                </p>
                <p>
                  经过长期的积累，中国人民大学出版社已发展成为具有图书、期刊、音像、电子和网络出版物等多媒体兼营的大型综合性出版社。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-main page-main-2">
          <div className="cooperation-content">
            <div className="title">
              <h3>国际合作</h3>
              <p>International cooperation</p>
            </div>
            <div className="detail">
              <p>
                新世纪以来，人大出版社的优秀出版物获得省部级以上奖项500多项，是荣获国家级奖项最多的出版社之一。作为集图书、音像、电子、网络和数字出版物等跨媒体经营的大型综合性
                出版社，人大出版社已成为我国哲学社会科学出版的重镇和旗舰。
              </p>
              <p>
                多年来，人大出版社致力于搭建国际文化交流平台，极大推动了中外学术文化交流。以高端学术著作国际出版为特色，截至2019年8月，人大出版社已累计输出图书版权3000种，涉
                及40多个语种，与40多个国家和地区的百余家出版机构建立了合作伙伴关系，并在以色列、罗马尼亚、蒙古设立海外分支机构，有效推动中国文化走出去。通过搭建国际出版平台，人大
                出版社倾力打造国家出版名片，努力讲好中国故事、传播好中国声音、阐释好中国特色，不断增强中国文化国际传播的软实力。
              </p>
            </div>
            <div className="books">
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
              <div className="book">
                <img alt="" src="/assets/img/book.png" />
              </div>
            </div>
            <div className="books-more">
              部分图书展示，更多内容可访问{" "}
              <Link to="/index">中国人民大学出版社</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
