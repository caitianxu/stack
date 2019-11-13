import qs from "qs";
import HTTP from "../script/service";
import store from "./store";

//获取数据字典
export const _set_dicts = function() {
  return new Promise(function(resolve, reject) {
    HTTP._get_dicts_data()
      .then(res => {
        if (res.code === 200) {
          const action = {
            type: "set_system_dicts",
            data: { ...res.data }
          };
          store.dispatch(action);
          resolve(res.data);
        } else {
          if (window.location.href.indexOf("stick") == -1)
            window.location.href = `/stick${window.location.search}`;
          reject(res.data);
        }
      })
      .catch(err => {
        if (window.location.href.indexOf("stick") == -1)
          window.location.href = `/stick${window.location.search}`;
      });
  });
};
//获取浏览器参数
export const _get_url_search = () => {
  return new Promise(function(resolve) {
    let search = window.location.search.replace("?", "");
    let params = {};
    if (search && search !== "") {
      params = qs.parse(search);
    }
    resolve(params);
  });
};
