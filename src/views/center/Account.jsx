import React, { Component } from "react";
import Util from "../../script/util";
import { Pagination, Select, Spin, message, Modal, Icon } from "antd";
import HTTP from "../../script/service";
const { Option } = Select;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false,
      bindType: "pwd", //pwd / org
      bindParam: {
        pwd: null,
        org: null
      },
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
      this.setState({
        childVisible: true
      });
    } else {
      message.warn("请输入并选择你要关联的机构");
    }
  };
  //关联类型
  changeBindType = b => {
    this.setState({
      bindType: b
    });
  };
  //文本输入
  changeBindForm = e => {
    let { bindParam } = this.state;
    bindParam[e.target.name] = e.target.value;
    this.setState({
      bindParam: { ...bindParam }
    });
  };
  //关联机构
  bindOrg = () => {
    const { bindType, bindParam, selectOrg } = this.state;
    if (bindType == "pwd" && !bindParam.pwd) {
      message.warn("请填写机构密码");
      return;
    }
    if (bindType == "org" && !bindParam.org) {
      message.warn("请填写机构关联信息");
      return;
    }
    HTTP._memberorg_bind({
      org_id: selectOrg,
      bind_type: bindType == "pwd" ? 2 : 1,
      bind_remark: bindParam.org,
      bind_pwd: bindParam.pwd
    }).then(res => {
      if (res.code == 0) {
        this.getPageData();
        this.hideChildModal();
      } else {
        message.warn(res.message);
      }
    });
  };
  //隐藏
  hideChildModal = () => {
    this.setState({
      childVisible: false
    });
  };
  //解除关联
  unBindAccount = () => {
    const { pageData } = this.state;
    const { member_id } = this.props.base;
    let bindOrg = null;
    if (pageData && pageData.length) {
      bindOrg = { ...pageData[0] };
    }
    Modal.confirm({
      title: "你确定解除关联吗?",
      content: "解除关联后将无法继续使用机构相关数据权限",
      onOk: () => {
        HTTP._memberorg_relieve({
          org_id: bindOrg.org_id,
          member_id: member_id
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
    const { pageParam, pageData, selectOrg, fetching, orgs, childVisible, bindType, bindParam } = this.state;
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
        {bindOrg && bindOrg.status != 3 ? (
          <div className="center-account-header">
            <p className="p1">关联的账户为已购买审判案例数据库使用权限的机构账户</p>
            {bindOrg.status == 1 ? (
              <div className="p4">
                您已向机构<label>{bindOrg.org_name}</label>发生关联申请， 管理员通过后您可以任意浏览数据库!
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
              <button onClick={this.unBindAccount}>解除关联 Disassociate</button>
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
              <td>操作</td>
              <td>时间</td>
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

        <Modal
          visible={childVisible}
          wrapClassName="daidai-modal-style"
          centered={true}
          closable={false}
          footer={null}
          keyboard={false}
          maskClosable={true}
          width="500px"
          onCancel={this.hideChildModal}
        >
          <div className="modal-parent-plan account-bind-plan">
            <div className="style-border">
              <i className="style-1"></i>
              <i className="style-2"></i>
              <i className="style-3"></i>
              <i className="style-4"></i>
            </div>
            <div className="modal-parent-content">
              <div className="modal-content-header">
                <div className="header-title">
                  <h3>
                    <span className={bindType == "pwd" ? "active" : ""} onClick={this.changeBindType.bind(this, "pwd")}>
                      密码关联
                    </span>
                    <span className={bindType == "org" ? "active" : ""} onClick={this.changeBindType.bind(this, "org")}>
                      申请机构关联
                    </span>
                  </h3>
                  <span className="close" onClick={this.hideChildModal}>
                    <Icon type="close" />
                  </span>
                </div>
              </div>
              <div className="modal-content-conter">
                {bindType == "pwd" ? (
                  <div className="bind-pwd-plan">
                    <input
                      type="password"
                      name="pwd"
                      autoComplete="off"
                      placeholder="请输入机构密码"
                      value={bindParam.pwd || ""}
                      onChange={this.changeBindForm}
                    />
                  </div>
                ) : (
                  <div className="bind-org-plan">
                    <textarea
                      placeholder="请输入便于管理员识别的验证信息，如姓名/学工号/院系信息等"
                      name="org"
                      value={bindParam.org || ""}
                      onChange={this.changeBindForm}
                    ></textarea>
                  </div>
                )}
                <div className="btns">
                  <button onClick={this.bindOrg}>确定 Sure</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Account;
