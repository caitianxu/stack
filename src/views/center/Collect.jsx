import React, { Component } from "react";
import { Icon, Checkbox, Select, Pagination, message, Modal } from "antd";
import HTTP from "../../script/service";
import { Link } from "react-router-dom";
const { Option } = Select;

const vier_type = {
  1: {
    name: "机构",
    url: "/mechanism?id="
  },
  2: {
    name: "专家",
    url: "/expert?id="
  },
  3: {
    name: "图书",
    url: "/book?id="
  },
  4: {
    name: "政策法规",
    url: "/policy?id="
  },
  5: {
    name: "政策解读",
    url: "/policy?id="
  },
  6: {
    name: "期刊论文",
    url: "/paper?id="
  },
  7: {
    name: "会议论文",
    url: "/paper?id="
  },
  8: {
    name: "学术论文",
    url: "/paper?id="
  },
  9: {
    name: "专题",
    url: "/subjects?id="
  }
};

class Collect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      pageData: [],
      searchParam: {
        searchText: null,
        type: null,
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
  //单选
  setCheck = item => {
    let { checkall } = this.state;
    item.checked = item.checked ? false : true;
    let chackNum = 0;
    this.state.pageData.forEach((a, b) => {
      if (a.checked) chackNum += 1;
    });
    if (chackNum == this.state.pageData.length && chackNum > 0) {
      checkall = true;
    } else {
      checkall = false;
    }
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
    let ids = [];
    if (item) {
      ids = [item.collect_id];
    } else {
      this.state.pageData.forEach((item, index) => {
        if (item.checked) {
          ids.push(item.collect_id);
        }
      });
    }
    if (ids.length == 0) {
      message.warn("请选中需要删除的收藏内容");
      return;
    }
    Modal.confirm({
      title: "你确定删除收藏记录吗?",
      content: "收藏记录删除后将无法还原.",
      onOk: () => {
        HTTP._collect_del({
          ids: ids.toString()
        }).then(res => {
          if (res.code == 0) {
            message.success("删除成功!");
            this.getPageData();
          } else {
            message.error(res.message);
          }
        });
      }
    });
  };
  //类型
  onChangePayType = item => {
    let { searchParam, pageParam } = this.state;
    searchParam.type = item;
    pageParam.pageNum = 1;
    this.setState(
      {
        searchParam: { ...searchParam },
        pageParam: { ...pageParam }
      },
      () => {
        this.getPageData();
      }
    );
  };
  //搜索
  toSearch = e => {
    let { searchParam, searchText, pageParam } = this.state;
    searchParam.searchText = searchText;
    pageParam.pageNum = 1;
    this.setState(
      {
        searchParam: { ...searchParam },
        pageParam: { ...pageParam }
      },
      () => {
        this.getPageData();
      }
    );
    e.preventDefault();
    e.stopPropagation();
  };
  searchChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };
  render() {
    const { checkall, pageData, pageParam, searchParam } = this.state;
    let new_vier_type = [];
    for (let i in vier_type) {
      new_vier_type.push({
        type: i,
        ...vier_type[i]
      });
    }
    return (
      <div className="center-collect-detail">
        <div className="center-page-title">我的收藏 My collection</div>
        <div className="center-collect-search">
          <form className="search-control" onSubmit={this.toSearch}>
            <input
              type="text"
              placeholder="请输入检索内容"
              name="searchText"
              autoComplete="off"
              defaultValue={searchParam.searchText || undefined}
              onChange={this.searchChange}
            />
            <span className="s-icon" onClick={this.toSearch}>
              <Icon type="search" />
            </span>
          </form>
        </div>
        <div className="table-title">
          <span className="t-left">
            <Checkbox checked={checkall} onClick={this.setCheckAll}>
              全选
            </Checkbox>
            <button className="delete-all" onClick={this.delItem.bind(this, null)}>批量删除 Batch deletion</button>
          </span>
          <span className="t-right">
            <Select defaultValue="" style={{ width: 120 }} onChange={this.onChangePayType}>
              <Option value="">全部</Option>
              {new_vier_type.map((item, index) => {
                return (
                  <Option value={item.type} key={`item-${index}`}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </span>
        </div>
        <table className="center-table-data">
          <thead>
            <tr>
              <th width="60">序号</th>
              <th width="400">标题</th>
              <th width="100">资源类型</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, index) => {
              return (
                <tr key={`tr-${index}`}>
                  <td>
                    <Checkbox checked={item.checked} onClick={this.setCheck.bind(this, item)} />
                  </td>
                  <td>
                    <Link to={`${vier_type[item.type].url}${item.res_id}`} className="title">
                      {item.res_title ? item.res_title.trim() : "-"}
                    </Link>
                  </td>
                  <td>{vier_type[item.type].name}</td>
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
