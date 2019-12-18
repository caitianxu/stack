import React, { Component } from "react";
import { Icon, Checkbox, Select, Pagination } from "antd";
import HTTP from "../../script/service";
const { Option } = Select;

class Collect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      pageData: [],
      searchParam: {
        searchText: null,
        start_time: null,
        end_time: null
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
  //获取数据
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    HTTP._collect_list({
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
    console.log(item);
  };
  render() {
    const { checkall, pageData, pageParam } = this.state;
    return (
      <div className="center-collect-detail">
        <div className="center-page-title">我的收藏 My collection</div>
        <div className="center-collect-search">
          <div className="search-control">
            <input
              type="text"
              placeholder="请输入检索内容"
              name="search_text"
              onChange={this.searchChange}
            />
            <span className="s-icon">
              <Icon type="search" />
            </span>
          </div>
        </div>
        <div className="table-title">
          <span className="t-left">
            <Checkbox checked={checkall} onClick={this.setCheckAll}>
              全选
            </Checkbox>
            <button className="delete-all">批量删除 Batch deletion</button>
          </span>
          <span className="t-right">
            <Select
              defaultValue=""
              style={{ width: 120 }}
              // value={searchParam.pay_bank || ""}
              // onChange={this.onChangePayType}
            >
              <Option value="">全部</Option>
            </Select>
          </span>
        </div>
        <table className="center-table-data">
          <tbody>
            {pageData.map((item, index) => {
              return (
                <tr key={`tr-${index}`}>
                  <td>
                    <Checkbox checked={checkall} onClick={this.setCheckAll} />
                  </td>
                  <td width="600"><div className="title">{item.res_title || "-"}</div></td>
                  <td>{item.create_time}</td>
                  <td>
                    <span className="link" onClick={this.delItem.bind(this, item)}>
                      <Icon type="delete" theme="filled" />
                    </span>
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

export default Collect;
