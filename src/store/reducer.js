const defaultState = {
  member_id: null,
  token: null,
  userInfo: null,
  orgInfo: null,
  classly_visible: false //首页分类层
};

export default (state = defaultState, action) => {
  //注销
  if (action.type === "clear_user") {
    const newState = { ...state };
    newState.userInfo = null;
    newState.token = null;
    newState.member_id = null;
    return newState;
  }
  //设置历史token
  if (action.type === "set_token") {
    const newState = { ...state, token: action.data };
    return newState;
  }
  //设置用户信息
  if (action.type === "change_user_info") {
    const newState = { ...state };
    newState.userInfo = action.data;
    newState.token = action.data.token;
    newState.member_id = action.data.member_id;
    newState.orgInfo = null;
    return newState;
  }
  //设置机构信息
  if (action.type === "change_org_info") {
    const newState = { ...state };
    newState.orgInfo = action.data;
    newState.member_id = null;
    newState.token = null;
    newState.userInfo = null;
    return newState;
  }
  //首页分类层显示
  if (action.type === "set_classly_visible") {
    const newState = { ...state, ...action.data };
    return newState;
  }

  return state;
};
