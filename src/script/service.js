import service from "./request";
import fetchJsonp from "fetch-jsonp";

const HTTP = {
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
  //国家列表
  _get_country_list: param => {
    return service.post("/api/web/org/country/list", param);
  },
  //研究机构
  _get_org_list: param => {
    return service.post("/api/web/org/list", param);
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
