import React, { Component } from "react";
import store from "../../store/store";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailSearch from "../../components/detailSearch/DetailSearch";
import { Breadcrumb, Skeleton } from "antd";
import { _get_url_search } from "../../store/Action";
import "./Mechanism.scss";
import HTTP from "../../script/service";

class Mechanism extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      data: null
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
    _get_url_search(param => {
      HTTP._web_org_detail({
        id: param.id
      }).then(res => {
        if (res.code == 0) {
          this.setState({
            data: res.data
          });
        }
        console.log(res);
      });
    });
  }
  render() {
    const { base, data } = this.state;
    return (
      <div className="mechanism-page">
        <Header base={base} />
        <DetailSearch tabIndex={4} />
        <div className="mechanism-content">
          <div className="page-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/mechanisms">机构</a>
              </Breadcrumb.Item>
              {data ? <Breadcrumb.Item>{data.detail.org_name}</Breadcrumb.Item> : null}
            </Breadcrumb>
          </div>
          <div className="page-detail-plan">
            <Skeleton
              loading={!data}
              active
              avatar={{ size: 210, shape: "square" }}
              paragraph={{ rows: 5 }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Mechanism;
