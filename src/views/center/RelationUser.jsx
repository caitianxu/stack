import React, { Component } from "react";
import { Icon, Checkbox, Select, Pagination, message, Modal } from "antd";
import HTTP from "../../script/service";
const { Option } = Select;

class RelationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkall: false,
      pageData: [],
      searchText: null,
      searchParam: {
        searchText: null,
        bind_type: null,
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
  //获取数据
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    const { managePwd, base } = this.props;
    searchParam.manage_pwd = managePwd;
    searchParam.org_id = base.orgInfo.org_id;
    HTTP._memberorg_member_list({
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
  //解除关联
  memberreLieve = item => {
    Modal.confirm({
      title: "你确定解除关联吗?",
      content: "解除关联后该用户将无法继续使用机构相关数据权限",
      onOk: () => {
        HTTP._memberorg_relieve({
          org_id: item.org_id,
          member_id: item.member_id
        }).then(res => {
          if (res.code == 0) {
            this.getPageData();
          } else {
            message.warn(res.message);
          }
        });
      }
    });
  };
  onChangeForm = e => {
    this.setState({
      searchText: e.target.value
    });
  };
  toSearch = () => {
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
  };
  changeType = e => {
    let { searchParam } = this.state;
    searchParam.bind_type = e;
    this.setState(
      {
        searchParam: { ...searchParam }
      },
      () => {
        this.getPageData();
      }
    );
  };
  render() {
    const { searchParam, checkall, pageData, pageParam } = this.state;
    return (
      <div className="center-relationuser-detail">
        <div className="center-page-title">管理用户管理 Associated user management</div>
        <div className="center-collect-search">
          <div className="search-control">
            <input
              type="text"
              placeholder="请输入检索的账户或备注信息"
              name="searchText"
              onChange={this.onChangeForm}
            />
            <span className="s-icon" onClick={this.toSearch}>
              <Icon type="search" />
            </span>
          </div>
          <span className="select">
            <Select value={searchParam.bind_type || ""} onChange={this.changeType} style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">审核关联</Option>
              <Option value="2">密码关联</Option>
            </Select>
          </span>
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
              <th width="300">帐户名</th>
              <th>备注信息</th>
              <th>绑定时间</th>
              <th>绑定方式</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, index) => {
              return (
                <tr key={`tr-${index}`}>
                  <td>
                    <Checkbox checked={checkall} onClick={this.setCheckAll} />
                  </td>
                  <td>{item.nick_name || "-"}</td>
                  <td>{item.bind_remark || "-"}</td>
                  <td>{item.bind_date || "-"}</td>
                  <td>{item.bind_type == 1 ? "审核关联" : "密码关联"}</td>
                  <td>
                    <span className="link" onClick={this.memberreLieve.bind(this, item)}>
                      解绑
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

export default RelationUser;
