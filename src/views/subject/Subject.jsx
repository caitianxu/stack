import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HTTP from "../../script/service";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import { _get_url_search } from "../../store/Action";
import "./Subject.scss";
import Util from "../../script/util";

class Subject extends Component {
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
  //初始化
  componentDidMount() {
    this.scrollLeft = 0;
    _get_url_search(param => {
      HTTP._get_subject_detail({
        id: param.id
      }).then(res => {
        if (res.code == 0) {
          this.setState({
            data: res.data
          });
        }
        console.log(res.data);
      });
    });
  }
  //左移动
  changeScrollLeft = () => {
    if (!this.titleScrollElement) return false;
    let allWidth = (this.titleScrollElement.clientWidth - 1116) * -1;
    this.scrollLeft -= 1116;
    if (this.scrollLeft < allWidth) {
      this.scrollLeft = allWidth;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  //右移动
  changeScrollRight = () => {
    if (!this.titleScrollElement) return false;
    this.scrollLeft += 1116;
    if (this.scrollLeft > 0) {
      this.scrollLeft = 0;
    }
    this.titleScrollElement.style.transform = `translateX(${this.scrollLeft}px)`;
  };
  render() {
    const { base, data } = this.state;
    return (
      <div className="subject-page">
        <Header base={base} />
        <div className="subject-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/subjects">专题</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.detail.title}</Breadcrumb.Item> : null}
            </Breadcrumb>
          </div>
          <div className="page-banner">
            <img alt="" src="/assets/img/subjects-banner.jpg" />
          </div>

          <div className="child-plan">
            <div className="child-title">
              <label>序言 Preface</label>
            </div>
            {data ? (
              <div
                className="fulltxt"
                dangerouslySetInnerHTML={{ __html: data.detail.fulltxt }}
              ></div>
            ) : null}
          </div>
          {data && data.expertList.length ? (
            <div className="child-plan">
              <div className="child-title">
                <label>专家学者 Scholar</label>
              </div>
              <div className="scholar-parent">
                <div className="plan-scholar">
                  {data.expertList.length > 6 ? (
                    <div className="scholar-left" onClick={this.changeScrollRight}>
                      <Icon type="left" />
                    </div>
                  ) : null}
                  <div className="scholar-scrolls">
                    <div className="expert-items" ref={el => (this.titleScrollElement = el)}>
                      {data.expertList.map((item, index) => {
                        return (
                          <div className="expert" key={`expert-${index}`}>
                            <div className="cover">
                              <Link to={`/expert?id=${item.id}`}>
                                <img alt="" src={Util.transImgUrl(item.cover)} />
                              </Link>
                            </div>
                            <p>{item.title}</p>
                            <p>{item.org_name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {data.expertList.length > 6 ? (
                    <div className="scholar-right" onClick={this.changeScrollLeft}>
                      <Icon type="right" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {data && data.bookList.length ? (
            <div className="child-plan">
              <div className="child-title">
                <label>相关图书 Related books</label>
              </div>
              <div className="paperList">
                {data.bookList.map((item, index) => {
                  return (
                    <div className="paper-item" key={`paper-${index}`}>
                      <Link to={`/book?id=${item.id}`}>
                        <span className="title">{item.title}</span>
                        <span className="author">{item.author}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {data && data.paperList.length ? (
            <div className="child-plan">
              <div className="child-title">
                <label>相关论文 Related article</label>
              </div>
              <div className="paperList">
                {data.paperList.map((item, index) => {
                  return (
                    <div className="paper-item" key={`paper-${index}`}>
                      <Link to={`/paper?type=${item.type}&id=${item.id}`}>
                        <span className="title">{item.title}</span>
                        <span className="author">{item.author}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {data && data.policiesList.length ? (
            <div className="child-plan">
              <div className="child-title">
                <label>相关政策 Related policy</label>
              </div>
              <div className="paperList">
                {data.policiesList.map((item, index) => {
                  return (
                    <div className="paper-item" key={`paper-${index}`}>
                      <Link to={`/policy?id=${item.id}`}>
                        <span className="title">{item.title}</span>
                        <span className="author">{item.pubdate}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="child-plan">
            <div className="child-title">
              <label>其他资源 Other resources</label>
            </div>
            {data ? (
              <div
                className="preface"
                dangerouslySetInnerHTML={{ __html: data.detail.other }}
              ></div>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Subject;
