import React, { Component } from "react";
import Util from "../../script/util";
import { Pagination, Select, Spin, message } from "antd";
import HTTP from "../../script/service";
const { Option } = Select;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: [],
      orgs: [],
      selectOrg: null,
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
  //获取关联数据列表
  getPageData = () => {
    let { pageParam } = this.state;
    HTTP._bind_record_list(pageParam).then(res => {
      if (res.code == 0) {
        pageParam.pages = res.data.pages;
        pageParam.total = res.data.total;
        this.setState({
          pageParam: pageParam,
          pageData: res.data.rows
        });
      }
    });
  };
  handleSearch = value => {
    this.setState({ orgs: [], fetching: true, selectOrg: null });
    HTTP._memberorg_search({
      org_name: value
    }).then(res => {
      if (res.code == 0) {
        this.setState({ orgs: [{ ...res.data }], fetching: false });
      } else {
        this.setState({ orgs: [], fetching: false });
      }
    });
  };
  handleChange = value => {
    this.setState({ selectOrg: value });
  };
  //关联
  onAssociation = () => {
    const { selectOrg } = this.state;
    if (selectOrg) {
      
    } else {
      message.warn("请输入并选择你要关联的机构");
    }
  };
  render() {
    const { pageParam, pageData, selectOrg, fetching, orgs } = this.state;
    const { userInfo } = this.props.base;
    let bindOrg = null;
    if (pageData && pageData.length) {
      bindOrg = { ...pageData[0] };
    }
    return (
      <div className="center-account-detail">
        <div className="center-page-title">账户关联 Account association</div>
        <div className="center-meinfo-header">
          <div className="meinfo-row-1">
            <div className="cover">
              <img src={Util.transImgUrl(userInfo.icon)} alt="" />
            </div>
            <div className="nickname">
              <label>您好，{userInfo.nick_name}</label>
              欢迎来到中国问题研究文献出版目录及服务平台！
            </div>
          </div>
          {bindOrg ? null : <div className="meinfo-row-3">您尚未关联账户</div>}
        </div>
        {bindOrg ? (
          <div className="center-account-header">
            <p className="p1">关联的账户为已购买审判案例数据库使用权限的机构账户</p>
            {bindOrg.status == 1 ? (
              <div className="p4">
                您已向机构<label>{bindOrg.org_name}</label>发生关联申请，
                管理员通过后您可以任意浏览数据库!
              </div>
            ) : null}
            {bindOrg.status == 2 ? (
              <div className="p4">
                您已关联机构<label>{bindOrg.org_name}</label>
              </div>
            ) : null}
            {bindOrg.status == 3 ? (
              <div className="p4">
                您已被关联机构<label>{bindOrg.org_name}</label>禁用。
              </div>
            ) : null}
            <div className="p3">
              <button>解除关联 Disassociate</button>
            </div>
          </div>
        ) : (
          <div className="center-account-header">
            <p className="p1">关联的账户为已购买审判案例数据库使用权限的机构账户</p>
            <div className="p2">
              <label>机构：</label>
              {/* <input type="text" name="org" placeholder="请输入关联的机构名称" /> */}
              <div className="org-control">
                <Select
                  showSearch
                  value={selectOrg}
                  placeholder="请输入关联的机构名称"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.handleSearch}
                  onChange={this.handleChange}
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  style={{ width: "100%" }}
                >
                  {orgs.map(d => (
                    <Option key={d.org_id}>{d.org_name}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="p3">
              <button onClick={this.onAssociation}>关联 Association</button>
            </div>
          </div>
        )}

        <div className="center-page-title">关联记录 Associated record</div>
        <table className="center-table-data">
          <thead>
            <tr>
              <td width="60">序号</td>
              <td>关联机构</td>
              <td width="150">操作</td>
              <td width="150">时间</td>
              <td width="80">状态</td>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, index) => {
              return (
                <tr key={`tr-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.org_name}</td>
                  <td>{item.action_type == 1 ? "关联" : "主动解绑"}</td>
                  <td>{item.create_time}</td>
                  {item.status == 1 ? <td>正在申请</td> : null}
                  {item.status == 2 ? <td>正常</td> : null}
                  {item.status == 3 ? <td>禁用</td> : null}
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

export default Account;
