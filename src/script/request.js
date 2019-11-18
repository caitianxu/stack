import axios from "axios";
import qs from "qs";
import store from "../store/store";

/********创建实例********/
const service = axios.create({
  baseURL: 'http://rdsweb.abcvote.cn',
  timeout: 10000
});

/********请求参数处理********/
service.interceptors.request.use(request => {
  const store_state = { ...store.getState() };
  let df_param = {};
  if (request.method === "post") {
    if (request.data.application === "json") {
      request.data = { ...request.data, ...df_param };
      request.headers["Content-Type"] = "application/json; charset=UTF-8";
    } else {
      request.data = qs.stringify({ ...request.data, ...df_param });
      request.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    }
  } else {
    request.params = { ...request.params, ...df_param };
    request.headers["Content-Type"] = "application/json; charset=UTF-8";
  }
  request.headers["token"] = store_state.token || "";
  if (request.params && request.params.token) {
    request.headers["token"] = request.params.token;
  }
  return request;
});

/********服务响应处理********/
service.interceptors.response.use(
  response => {
    if (response.data.code === 600) {
      //当前用户登录信息已失效, 需要重新登录
      window.location.href = "/login";
    }
    return response.data;
  },
  error => {
    return {
      code: 500,
      data: null,
      message: error.message || "服务异常，请稍后再试~"
    };
  }
);

export default service;
