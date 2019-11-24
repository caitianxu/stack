//内容格式化
const _$encode = (_map, _content) => {
  _content = "" + _content;
  if (!_map || !_content) {
    return _content || "";
  }
  return _content.replace(_map.r, function($1) {
    let _result = _map[!_map.i ? $1.toLowerCase() : $1];
    return _result != null ? _result : $1;
  });
};
const Util = {
  setCookie: (name, value) => {
    let days = 1;
    let exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
  },
  readCookie: name => {
    let arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  delCookie: name => {
    let cval = Util.readCookie(name);
    if (cval != null) {
      document.cookie = name + "=;path=/;expires=" + new Date(0).toGMTString();
    }
  },
  //格式化日期
  dateFormat: (_time, _format, _12time) => {
    if (!_time) _time = +new Date();
    if (!_format) _format = "yyyy-MM-dd";
    let _map = {
        i: !0,
        r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g
      },
      _12cc = ["上午", "下午"],
      _12ec = ["A.M.", "P.M."],
      _week = ["日", "一", "二", "三", "四", "五", "六"],
      _cmon = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
      _emon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let _fmtnmb = function(_number) {
      _number = parseInt(_number) || 0;
      return (_number < 10 ? "0" : "") + _number;
    };
    let _fmtclc = function(_hour) {
      return _hour < 12 ? 0 : 1;
    };
    _time = new Date(_time);
    _map.yyyy = _time.getFullYear();
    _map.yy = ("" + _map.yyyy).substr(2);
    _map.M = _time.getMonth() + 1;
    _map.MM = _fmtnmb(_map.M);
    _map.eM = _emon[_map.M - 1];
    _map.cM = _cmon[_map.M - 1];
    _map.d = _time.getDate();
    _map.dd = _fmtnmb(_map.d);
    _map.H = _time.getHours();
    _map.HH = _fmtnmb(_map.H);
    _map.m = _time.getMinutes();
    _map.mm = _fmtnmb(_map.m);
    _map.s = _time.getSeconds();
    _map.ss = _fmtnmb(_map.s);
    _map.ms = _time.getMilliseconds();
    _map.w = _week[_time.getDay()];
    let _cc = _fmtclc(_map.H);
    _map.ct = _12cc[_cc];
    _map.et = _12ec[_cc];
    if (!!_12time) {
      _map.H = _map.H % 12;
    }
    return _$encode(_map, _format);
  },
  //数字格式化
  numberFormat: num => {
    num = (num || 0).toString();
    let result = "";
    while (num.length > 4) {
      result = "," + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  },
  //图片地址处理
  transImgUrl: (url, size) => {
    if (!url || url.trim() === "" || url === "/assets/img/icon-user.png") {
      return "/assets/img/user.png";
    } else if (url.indexOf("http") !== -1 || url.indexOf("https") !== -1) {
      return url;
    } else if (url.indexOf("/assets/") !== -1) {
      return url;
    } else {
      // return "http://rds.abcvote.cn" + url;
      return "/assets/img/mechanism.png";
    }
  }
};
window.Util = Util;
export default Util;
