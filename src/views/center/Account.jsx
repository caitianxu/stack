import React, { Component } from "react";
import Util from "../../script/util";
import { Pagination } from "antd";

// /api/web/memberorg/search
// org_name/机构名称
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        pages: 11,
        total: 111
      }
    };
  }
  render() {
    const { pageParam } = this.state;
    const { userInfo } = this.props.base;
    return (
      <div className="center-account-detail">
        <div className="center-page-title">账户关联 Account association</div>
        <div className="center-meinfo-header">
          <div className="meinfo-row-1">
            <div className="cover">
              <img src={Util.transImgUrl(userInfo.icon)} alt=""/>
            </div>
            <div className="nickname">
              <label>您好，{userInfo.nick_name}</label>
              欢迎来到中国问题研究文献出版目录及服务平台！
            </div>
          </div>
          <div className="meinfo-row-3">您尚未关联账户</div>
        </div>
        <div className="center-account-header">
          <p className="p1">关联的账户为已购买审判案例数据库使用权限的机构账户</p>
          <div className="p2">
            <label>机构：</label>
            <input type="text" name="org" placeholder="请输入关联的机构名称" />
          </div>
          <div className="p3">
            <button>关联 Association</button>
          </div>
        </div>
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
            <tr>
              <td>1</td>
              <td>中国人民大学出版社</td>
              <td>主动解绑</td>
              <td>2019-07-19</td>
              <td>正常</td>
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

export default Account;
