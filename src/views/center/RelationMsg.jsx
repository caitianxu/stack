import React, { Component } from "react";
import { Checkbox, Pagination, message } from "antd";
import HTTP from "../../script/service";

class RelationMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      pageData: [],
      searchParam: {
        org_id: null,
        manage_pwd: null
      },
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        total: 0
      }
    };
  }
  componentDidMount() {
    this.getPageData();
  }
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    const { managePwd, base } = this.props;
    searchParam.manage_pwd = managePwd;
    searchParam.org_id = base.orgInfo.org_id;
    HTTP._memberorg_audit({
      ...searchParam,
      ...pageParam
    }).then(res => {
      if (res.code == 0) {
        pageParam.pages = res.data.pages;
        pageParam.total = res.data.total;
        this.setState({
          pageParam: pageParam,
          pageData: res.data.rows,
          checkall: false
        });
      }
    });
  };
  //全选
  setCheckAll = e => {
    let checkall = e.target.checked;
    this.setState({
      checkall: checkall
    });
  };
  //分页回调
  onPagChange = page => {
    let { pageParam } = this.state;
    pageParam.pageNum = page;
    this.setState(
      {
        pageParam: pageParam
      },
      () => {
        this.getPageData();
      }
    );
  };
  //分页控件
  itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <span className="prev">上一页</span>;
    }
    if (type === "next") {
      return <span className="next">下一页</span>;
    }
    return originalElement;
  };
  //通过 、 拒接
  accMsg = (id, n) => {
    HTTP._memberorg_bind_sure({
      rel_id: id,
      status: n
    }).then(res => {
      if (res.code == 0) {
        this.getPageData();
      } else {
        message.warn(res.message);
      }
    });
  };
  render() {
    const { checkall, pageParam, pageData } = this.state;
    return (
      <div className="center-relationmsg-detail">
        <div className="center-page-title">关联通知 Association notice</div>
        <div className="table-title">
          <span className="t-left">
            <Checkbox checked={checkall} onClick={this.setCheckAll}>
              全选
            </Checkbox>
            <button className="delete-all">批量删除 Batch deletion</button>
          </span>
        </div>

        <div className="table-data">
          {pageData.map((item, index) => {
            return (
              <div className="data-row" key={`row-${index}`}>
                <div className="box">
                  <Checkbox checked={checkall} onClick={this.setCheckAll} />
                </div>
                <div className="col-detail">
                  <p className="p1">
                    【关联通知】用户<label>{item.nick_name}</label>申请关联数据库
                  </p>
                  <p className="p2"> 申请说明：{item.bind_remark}</p>
                </div>
                <div className="col-action">
                  <p className="time">2019-07-02 10:00</p>
                  {item.status == 2 ? (
                    <div className="accs">
                      <label>已通过</label>
                    </div>
                  ) : (
                    <div className="accs">
                      <button onClick={this.accMsg.bind(this, item.rel_id, 2)}>通过 By</button>
                      <button className="cancel" onClick={this.accMsg.bind(this, item.rel_id, 3)}>
                        拒绝 Refuse
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={pageParam.pages <= 1 ? "page-papers none" : "page-papers"}>
          <span className="label">共{pageParam.total}个结果</span>
          <span className="pagination">
            <Pagination
              pageSize={parseInt(pageParam.pageSize)}
              hideOnSinglePage={true}
              current={pageParam.pageNum}
              total={pageParam.total}
              onChange={this.onPagChange}
              itemRender={this.itemRender}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default RelationMsg;
