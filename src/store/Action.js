import qs from "qs";
import HTTP from "../script/service";
import store from "./store";
import Util from "../script/util";

//获取数据字典
export const _get_user_info = function(param) {
  return new Promise(function(resolve, reject) {
    HTTP._web_login(param).then(res => {
      if (res.code === 0) {
        const action = {
          type: "change_user_info",
          data: { ...res.data }
        };
        store.dispatch(action);
        Util.setCookie("token", res.data.token);
        resolve(res);
      } else {
        Util.delCookie("token");
        reject(res);
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
//首页分类层显示
export const _set_classly_visible = function(visible) {
  const action = {
    type: "set_classly_visible",
    data: {
      classly_visible: visible
    }
  };
  store.dispatch(action);
};
