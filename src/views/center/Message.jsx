import React, { Component } from "react";
import { Checkbox, Select, Pagination } from "antd";
const { Option } = Select;

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        pages: 11,
        total: 111
      }
    };
  }
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
  //数据分页
  getPageData = () => {};
  render() {
    const { checkall, pageParam } = this.state;
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
            <Select defaultValue="1">
              <Option value="1">全部通知</Option>
            </Select>
          </span>
        </div>
        <div className="message-rows">
          <div className="message-row">
            <span className="box">
              <Checkbox checked={checkall} onClick={this.setCheckAll} />
            </span>
            <span className="row-title">【绑定通知】您已经与中国人民大学出版社绑定成功。</span>
            <div className="row-time">2019-07-02 10:56</div>
          </div>
          <div className="message-row">
            <span className="box">
              <Checkbox checked={checkall} onClick={this.setCheckAll} />
            </span>
            <span className="row-title">【绑定通知】您已经与中国人民大学出版社绑定成功。</span>
            <div className="row-time">2019-07-02 10:56</div>
          </div>
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

export default Message;
