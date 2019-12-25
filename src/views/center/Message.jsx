import React, { Component } from "react";
import { Checkbox, Select, Pagination } from "antd";
import HTTP from "../../script/service";
const { Option } = Select;

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      searchParam: {
        type: null
      },
      pageData: [],
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
    console.log("xxxx");
  }
  //获取数据
  getPageData = () => {
    console.log("1222");
    let { searchParam, pageParam } = this.state;
    const { orgInfo, token } = this.props.base;
    if (token) {
      searchParam.token = token;
    } else {
      searchParam.org_id = orgInfo.org_id;
    }
    HTTP._message_list({
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
  render() {
    const { checkall, pageParam, pageData } = this.state;
    return (
      <div className="center-message-page">
        <div className="center-page-title">消息中心 Message</div>
        <div className="table-title">
          <span className="t-left">
            <Checkbox checked={checkall} onClick={this.setCheckAll}>
              全选
            </Checkbox>
            <button className="delete-all">批量删除 Batch deletion</button>
          </span>
          <span className="t-right">
            <Select defaultValue="">
              <Option value="">全部通知</Option>
              <Option value="1">系统通知</Option>
              <Option value="2">绑定通知</Option>
            </Select>
          </span>
        </div>
        {pageData.length ? (
          <div className="message-rows">
            {pageData.map((item, index) => {
              return (
                <div className="message-row" key={`item-${index}`}>
                  <span className="box">
                    <Checkbox checked={checkall} onClick={this.setCheckAll} />
                  </span>
                  <span className="row-title">
                    【{item.type == 1 ? "系统通知" : "绑定通知"}】{item.content}
                  </span>
                  <div className="row-time">{item.create_time}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="message-rows">
            <div className="message-row-notdata">没有相关数据</div>
          </div>
        )}

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

export default Message;
