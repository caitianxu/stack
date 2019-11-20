const defaultState = {
  member_id: null,
  token: null,
  userInfo: null,
  classly_visible: false //首页分类层
};

export default (state = defaultState, action) => {
  //设置历史token
  if (action.type === "set_token") {
    const newState = { ...state, token: action.data };
    return newState;
  }
  //设置数据字典内容
  if (action.type === "change_user_info") {
    const newState = { ...state };
    newState.userInfo = action.data;
    newState.token = action.data.token;
    newState.member_id = action.data.member_id;
    return newState;
  }
  //首页分类层显示
  if (action.type === "set_classly_visible") {
    const newState = { ...state, ...action.data };
    return newState;
  }

  return state;
};
