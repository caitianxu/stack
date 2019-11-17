const defaultState = {
  uid: null,
  token: null,
  userInfo: null,
  classly_visible: false, //首页分类层
};

export default (state = defaultState, action) => {
  //设置数据字典内容
  if (action.type === "set_system_dicts") {
    const newState = { ...state, ...action.data };
    return newState;
  }
  //首页分类层显示
  if (action.type === "set_classly_visible") {
    const newState = { ...state, ...action.data };
    return newState;
  }
  
  return state;
};
