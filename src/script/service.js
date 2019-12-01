import service from "./request";
import fetchJsonp from "fetch-jsonp";

const HTTP = {
  //数据字典
  _get_web_dics: param => {
    return service.post("/api/web/dics", param);
  },
  //语言
  _get_language: param => {
    return service.post("/dictype/language", param);
  },
  //获取验证码
  _send_phone_code: param => {
    return service.post("/api/web/send/code", param);
  },
  //注册
  _web_register: param => {
    return service.post("/api/web/register", param);
  },
  //登录
  _web_login: param => {
    return service.post("/api/web/login", param);
  },
  //获取分类
  _get_web_cat: param => {
    return service.post("/api/web/cat", param);
  },
  //获取用户信息
  _get_member_info: param => {
    return service.post("/api/web/member/info", param);
  },
  //国家列表（机构）
  _get_country_list: param => {
    return service.post("/api/web/org/country/list", param);
  },
  //研究机构
  _get_org_list: param => {
    return service.post("/api/web/org/list", param);
  },
  //所在地列表（专家）
  _get_expert_country_list: param => {
    return service.post("/api/web/expert/country/list", param);
  },
  //工作单位列表（专家）
  _get_expert_org_list: param => {
    return service.post("/api/web/expert/org/list", param);
  },
  //研究领域列表（专家）
  _get_expert_position_list: param => {
    return service.post("/api/web/expert/cat/list", param);
  },
  //专家
  _get_expert_list: param => {
    return service.post("/api/web/expert/list", param);
  },
  //发布机关
  _get_policies_disagency: param => {
    return service.post("/api/web/policies/disagency", param);
  },
  //公文级别
  _get_policies_level: param => {
    return service.post("/api/web/policies/level", param);
  },
  //政策列表
  _get_policies_list: param => {
    return service.post("/api/web/policies/list", param);
  },
  //内容权限（图书）
  _get_book_full: param => {
    return service.post("/api/web/book/full/list", param);
  },
  //语种（图书）
  _get_book_language: param => {
    return service.post("/api/web/book/language/list", param);
  },
  //出版日期（图书）
  _get_book_pubdate: param => {
    return service.post("/api/web/book/pubdate/list", param);
  },
  //专题（图书）
  _get_book_series: param => {
    return service.post("/api/web/book/series/list", param);
  },
  //分类（图书）
  _get_book_cats: param => {
    return service.post("/api/web/book/cat/list", param);
  },
  //图书列表
  _get_book_list: param => {
    return service.post("/api/web/book/list", param);
  },
  //获取经纬度
  _get_point_data: () => {
    return fetchJsonp(
      "https://api.map.baidu.com/location/ip?ak=G0T3IZDatGXYGTaGiUHY2tXUZNQpcDxP&coor=bd09ll"
    ).then(function (response) {
      return response.json();
    });
  }
};
export default HTTP;
