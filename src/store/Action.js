import qs from "qs";
import HTTP from "../script/service";
import store from "./store";

//获取数据字典
export const _set_dicts = function() {
  return new Promise(function(resolve) {
    HTTP._get_dicts_data().then(res => {
      if (res.code === 0) {
        const action = {
          type: "set_system_dicts",
          data: { ...res.data }
        };
        store.dispatch(action);
        resolve(res.data);
      }
    });
  });
};
//获取浏览器参数
export const _get_url_search = callback => {
  let search = window.location.search.replace("?", "");
  let params = {};
  if (search && search !== "") params = qs.parse(search);
  callback && callback(params);
};
