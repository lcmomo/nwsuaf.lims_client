export default{
    namespace:'global',
    state:{
        userInfo:{
            userno:null,
            username:null,
            password:null

        }
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
      },

      effects: {
        //dispatch 设置用户信息
        *setUserInfo({ payload }, {  put }) {  // eslint-disable-line
          yield put({ type: 'set_userinfo',payload });
        },
      },
      reducers: {
        // 设置用户信息state
        set_userinfo(state, {payload}) {
          return { ...state, userInfo:payload };
        },
      },
}