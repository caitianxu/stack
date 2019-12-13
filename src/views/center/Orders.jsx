import React, { Component } from "react";
import { DatePicker, Select, Checkbox, Pagination } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;

class Orders extends Component {
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
  render() {
    const { checkall, pageParam } = this.state;
    return (
      <div className="center-orders-detail">
        <div className="center-page-title">订单列表 Order List</div>
        <div className="center-orders-search">
          <div className="search-col">
            <RangePicker
              //   onChange={this.onChange.bind(this, ["pubdate_start", "pubdate_end"])}
              //   value={getTime(["pubdate_start", "pubdate_end"])}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
          <div className="search-col">
            <Select
              defaultValue=""
              style={{ width: 120 }}
              //   value={param.subject_and}
              //   onChange={this.onChangeSelect.bind(this, "subject_and")}
            >
              <Option value="">支付方式</Option>
              <Option value="alipay">支付宝</Option>
              <Option value="weixin">微信</Option>
              <Option value="yue">余额</Option>
            </Select>
          </div>
        </div>
        <div className="table-title">
          <span className="t-left">
            <Checkbox checked={checkall} onClick={this.setCheckAll}>
              全选
            </Checkbox>
            <button className="delete-all">批量删除 Batch deletion</button>
          </span>
        </div>
        <table className="center-table-data">
          <thead>
            <tr>
              <th width="60">序号</th>
              <th>订单内容</th>
              <th>下单时间</th>
              <th>订单号</th>
              <th>支付方式</th>
              <th>金额</th>
              <th>状态</th>
              <th width="80">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Checkbox checked={checkall} onClick={this.setCheckAll} /></td>
              <td>中国人民大学出版社</td>
              <td>2019-07-19 17:10:01</td>
              <td>20190625103525503</td>
              <td>支付宝</td>
              <td>10</td>
              <td><span className="link">已完成</span></td>
              <td><span className="link">删除</span></td>
            </tr>
          </tbody>
        </table>
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

export default Orders;
