import React, { Component } from "react";
import { DatePicker, Pagination } from "antd";
import moment from "moment";
import HTTP from "../../script/service";
import { Link } from "react-router-dom";
const { RangePicker } = DatePicker;

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
class Browse extends Component {
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
  //获取数据
  getPageData = () => {
    let { searchParam, pageParam } = this.state;
    const { orgInfo } = this.props.base;
    if (orgInfo) {
      searchParam.org_id = orgInfo.org_id;
      HTTP._browse_org_list({
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
    } else {
      HTTP._browse_list({
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
    }
  };
  //时间
  onChangeTime = (date, dateString) => {
    let { searchParam, pageParam } = this.state;
    searchParam.start_time = dateString[0];
    searchParam.end_time = dateString[1];
    pageParam.pageNum = 1;
    this.setState(
      {
        pageParam: { ...pageParam },
        searchParam: { ...searchParam }
      },
      () => {
        this.getPageData();
      }
    );
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
    const { searchParam, pageData, pageParam } = this.state;
    const getTime = () => {
      let ll = [
        searchParam.start_time ? moment(searchParam.start_time, "YYYY-MM-DD") : null,
        searchParam.end_time ? moment(searchParam.end_time, "YYYY-MM-DD") : null
      ];
      return ll;
    };
    return (
      <div className="center-browse-detail">
        <div className="center-page-title">检索历史 Retrieval history</div>
        <div className="center-orders-search">
          <div className="search-col">
            <RangePicker
              onChange={this.onChangeTime}
              value={getTime()}
              separator="-"
              style={{ width: 320 }}
            />
            {/* <button className="search-btn">确认 Sure</button> */}
          </div>
        </div>
        <table className="center-table-data">
          <thead>
            <tr>
              <th width="60">序号</th>
              <th width="500">标题</th>
              <th width="100">资源类型</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, index) => {
              return (
                <tr key={`tr-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`${vier_type[item.type].url}${item.res_id}`} className="title">
                      {item.res_title ? item.res_title.trim() : "-"}
                    </Link>
                  </td>
                  <td>{vier_type[item.type].name}</td>
                  <td>{item.date}</td>
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

export default Browse;
