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
  //语言
  _forgetpwd: param => {
    return service.post("/api/web/forgetpwd", param);
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
  _get_policies_type: param => {
    return service.post("/api/web/policies/type/list", param);
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
  //分类列表（论文）
  _get_paper_cat_list: param => {
    return service.post("/api/web/paper/cat/list", param);
  },
  //语言列表（论文）
  _get_paper_language_list: param => {
    return service.post("/api/web/paper/language/list", param);
  },
  //论文类型列表（论文）
  _get_paper_type_list: param => {
    return service.post("/api/web/paper/type", param);
  },
  //期刊列表（论文）
  _get_paper_journal_list: param => {
    return service.post("/api/web/paper/journal/list", param);
  },
  //论文列表
  _get_paper_list: param => {
    return service.post("/api/web/paper/list", param);
  },
  //收藏 取消收藏
  _web_member_collect: param => {
    return service.post("/api/web/member/collect", param);
  },
  //机构详情
  _web_org_detail: param => {
    return service.post("/api/web/org/detail", param);
  },
  //专家详情
  _web_expert_detail: param => {
    return service.post("/api/web/expert/detail", param);
  },
  //政策详情
  _web_policy_detail: param => {
    return service.post("/api/web/policies/detail", param);
  },
  //图书详情
  _web_book_detail: param => {
    return service.post("/api/web/book/detail", param);
  },
  //论文详情
  _web_paper_detail: param => {
    return service.post("/api/web/paper/detail", param);
  },
  //轮播图（首页）
  _web_index_1: param => {
    return service.post("/api/web/index/1", param);
  },
  //plan2（首页）
  _web_index_2: param => {
    return service.post("/api/web/index/2", param);
  },
  //plan3（首页）
  _web_index_3: param => {
    return service.post("/api/web/index/3", param);
  },
  //plan4（首页）
  _web_index_4: param => {
    return service.post("/api/web/index/4", param);
  },
  //plan5（首页）
  _web_index_5: param => {
    return service.post("/api/web/index/5", param);
  },
  //plan6（首页）
  _web_index_6: param => {
    return service.post("/api/web/index/6", param);
  },
  //修改密码
  _update_pwd: param => {
    return service.post("/api/web/member/updatepwd", param);
  },
  //IP登录
  _ip_login: param => {
    return service.post("/api/web/ip/login", param);
  },
  //文件上传
  _file_upload: param => {
    return service.post("/api/system/file/upload", param);
  },
  //文件上传
  _member_update: param => {
    return service.post("/api/web/member/update", param);
  },
  //关联结构记录
  _bind_record_list: param => {
    return service.post("/api/web/member/bind/record", param);
  },
  //搜索机构
  _memberorg_search: param => {
    return service.post("/api/web/memberorg/search", param);
  },
  //关联机构
  _memberorg_bind: param => {
    return service.post("/api/web/memberorg/bind", param);
  },
  //解除关联
  _memberorg_relieve: param => {
    return service.post("/api/web/memberorg/relieve", param);
  },
  //订单列表
  _order_list: param => {
    return service.post("/api/web/member/order/list", param);
  },
  //收藏列表
  _collect_list: param => {
    return service.post("/api/web/member/collect/list", param);
  },
  //检索列表
  _search_list: param => {
    return service.post("/api/web/member/search/list", param);
  },
  //机构检索列表
  _search_org_list: param => {
    return service.post("/api/web/memberorg/search/list", param);
  },
  //浏览列表
  _browse_list: param => {
    return service.post("/api/web/member/view/list", param);
  },
  //机构浏览列表
  _browse_org_list: param => {
    return service.post("/api/web/memberorg/view/list", param);
  },
  //绑定手机
  _bind_phone: param => {
    return service.post("/api/web/bind/phone", param);
  },
  //确认机构密码
  _memberorg_checkpwd: param => {
    return service.post("/api/web/memberorg/checkpwd", param);
  },
  //关联通知
  _memberorg_audit: param => {
    return service.post("/api/web/memberorg/audit", param);
  },
  //关联审核
  _memberorg_bind_sure: param => {
    return service.post("/api/web/memberorg/bind/sure", param);
  },
  //关联用户
  _memberorg_member_list: param => {
    return service.post("/api/web/memberorg/member/list", param);
  },
  //专题列表
  _get_subject_list: param => {
    return service.post("/api/web/subject/list", param);
  },
  //专题详情
  _get_subject_detail: param => {
    return service.post("/api/web/subject/detail", param);
  },
  //汉学大事记
  _web_sinology: param => {
    return service.post("/api/web/sinology", param);
  },
  //充值项
  _pay_list: param => {
    return service.post("/api/web/pay/list", param);
  },
  //微信支付
  _wechat_pay_order: param => {
    return service.post("/api/web/wechat/pay/order", param);
  },
  //支付宝支付
  _ali_pay_order: param => {
    return service.post("/api/web/alipay/pay/order", param);
  },
  //支付状态
  _pay_order_state: param => {
    return service.post("/api/web/order/status", param);
  },
  //消息列表
  _message_list: param => {
    return service.post("/api/web/message/list", param);
  },
  //图书阅读
  _book_read: param => {
    return service.post("/api/web/book/read", param);
  },
  //订单删除
  _order_del: param => {
    return service.post("/api/web/member/order/del", param);
  },
  //收藏删除
  _collect_del: param => {
    return service.post("/api/web/member/collect/del", param);
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
