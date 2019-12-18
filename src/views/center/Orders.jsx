import React, { Component } from "react";
import { DatePicker, Select, Checkbox, Pagination } from "antd";
import moment from "moment";
import HTTP from "../../script/service";
const { RangePicker } = DatePicker;
const { Option } = Select;

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      pageData: [],
      searchParam: {
        searchText: null,
        start_time: null,
        end_time: null,
        pay_bank: null //0:线下支付，1:微信，2:支付宝
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
  onChangePayType = n => {
    let { searchParam } = this.state;
    searchParam.pay_bank = n;
    this.setState(
      {
        searchParam: { ...searchParam }
      },
      () => {
        this.getPageData();
      }
    );
  };
  //时间
  onChangeTime = (date, dateString) => {
    let { searchParam } = this.state;
    searchParam.start_time = dateString[0];
    searchParam.end_time = dateString[1];
    this.setState({
      searchParam: { ...searchParam }
    });
  };
  //获取数据
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    HTTP._order_list({
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
  //row - box
  changeBox = (item, e) => {
    item.checked = e.target.checked;
    let sels = this.state.pageData.filter(item => item.checked);
    let checkall = false;
    if (sels.length == this.state.pageData.length) {
      checkall = true;
    }
    this.setState({
      checkall: checkall,
      pageData: [...this.state.pageData]
    });
  };
  //全选
  setCheckAll = e => {
    let checkall = e.target.checked;
    this.state.pageData.forEach(item => (item.checked = checkall));
    this.setState({
      checkall: checkall,
      pageData: [...this.state.pageData]
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
  //单项删除
  delItem = item => {
    console.log(item)
  }
  render() {
    const { checkall, pageParam, searchParam, pageData } = this.state;
    const getTime = () => {
      let ll = [
        searchParam.start_time ? moment(searchParam.start_time, "YYYY-MM-DD") : null,
        searchParam.end_time ? moment(searchParam.end_time, "YYYY-MM-DD") : null
      ];
      return ll;
    };
    return (
      <div className="center-orders-detail">
        <div className="center-page-title">订单列表 Order List</div>
        <div className="center-orders-search">
          <div className="search-col">
            <RangePicker
              onChange={this.onChangeTime}
              value={getTime()}
              separator="-"
              style={{ width: 320 }}
            />
          </div>
          <div className="search-col">
            <Select
              defaultValue=""
              style={{ width: 120 }}
              value={searchParam.pay_bank || ""}
              onChange={this.onChangePayType}
            >
              <Option value="">全部</Option>
              <Option value="0">线下支付</Option>
              <Option value="1">微信</Option>
              <Option value="2">支付宝</Option>
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
            {pageData.map((item, index) => {
              return (
                <tr key={`tr-${index}`}>
                  <td>
                    <Checkbox checked={checkall} onClick={this.setCheckAll} />
                  </td>
                  <td>{item.title || "-"}</td>
                  <td>{item.create_time}</td>
                  <td>{item.order_no}</td>
                  <td>
                    {item.pay_bank == 0 ? "线下支付" : null}
                    {item.pay_bank == 1 ? "微信" : null}
                    {item.pay_bank == 2 ? "支付宝" : null}
                  </td>
                  <td>{item.pay_fee || 0}</td>
                  <td>{item.pay_status == 1 ? "待支付" : "已完成"}</td>
                  <td>
                    <span className="link" onClick={this.delItem.bind(this, item)}>删除</span>
                  </td>
                </tr>
              );
            })}
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
