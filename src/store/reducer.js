const defaultState = {
  uid: null,
  token: null,
  userInfo: null
};

export default (state = defaultState, action) => {
  //设置数据字典内容
  if (action.type === "set_system_dicts") {
    const newState = { ...state, ...action.data };
    return newState;
  }

  return state;
};
