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
//设置token
export const _set_token = function(token) {
  return new Promise(function(resolve, reject) {
    const action = {
      type: "set_token",
      data: token
    };
    store.dispatch(action);
    resolve(token);
  });
};
//获取用户信息
export const _get_userInfo = function(token) {
  return new Promise(function(resolve, reject) {
    if (!token) {
      token = store.getState().token;
    }
    HTTP._get_member_info().then(res => {
      if (res.code == 0) {
        const action = {
          type: "change_user_info",
          data: { ...res.data, token: token }
        };
        store.dispatch(action);
        resolve(res.data);
      } else {
        const action = {
          type: "clear_user"
        };
        store.dispatch(action);
        Util.delCookie("token");
        reject(res);
      }
    });
  });
};
//获取机构信息
export const _get_orgInfo = function(token) {
  return new Promise(function(resolve, reject) {
    HTTP._ip_login().then(res => {
      if (res.code == 0) {
        const action = {
          type: "change_org_info",
          data: { ...res.data}
        };
        store.dispatch(action);
        resolve(res.data);
      }
      else{
      	reject(res);
      }
    });
  });
};

//注销
export const _clear_userInfo = function(token) {
  const action = {
    type: "clear_user"
  };
  store.dispatch(action);
  Util.delCookie("token");
};
