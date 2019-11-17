import service from "./request";
import fetchJsonp from "fetch-jsonp";

const HTTP = {
  //数据字典
  _get_dicts_data: param => {
    return service.get("/web/api/base/dicts", {
      params: param
    });
  },
  //获取经纬度
  _get_point_data: () => {
    return fetchJsonp(
      "https://api.map.baidu.com/location/ip?ak=G0T3IZDatGXYGTaGiUHY2tXUZNQpcDxP&coor=bd09ll"
    ).then(function(response) {
      return response.json();
    });
  }
};
export default HTTP;
