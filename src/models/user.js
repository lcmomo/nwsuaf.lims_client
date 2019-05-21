
import {message} from 'antd'
import {
  fetchUserListI,
  createUserI,
  deleteUserRecordI,
  updateUserI,
  fetchCurrentUserI
} from '../services/user';
export default {

    namespace: 'user',
  
    state: {
      userList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取用户列表
      *fetchUserList({payload,callback},{call,put}){
        const results=yield call(fetchUserListI,payload);
        yield put({
          type:'saveUserList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //获取一条记录
      *fetchCurrentUser({payload,callback},{call,put}){
        const results=yield call(fetchCurrentUserI,payload);
        yield put({
          type:'saveCurrentUser',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加用户列表
      *createUser({payload,callback},{call}){
        const response=yield call(createUserI,payload);
        //console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条用户记录
      *deleteUserRecord({payload,callback},{call}){
        const response=yield call(deleteUserRecordI,payload);
        //console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
      //修改用户记录
      *updateUser({payload,callback},{call}){
     
        const response=yield call(updateUserI,payload);
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      }

    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },

      saveUserList(state,action){
       
        const {list,pageNum,pageSize}=action.payload.data;
      // console.log(list);
       const userList=list.filter((item)=>(item.role!=='管理员'))
        //console.log(list);
        return {
          ...state,
          userList:userList,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentUser(state,action){
       
        const currentUser=action.payload.data;
       //console.log(currentUser);
      
        //console.log(list);
        return {
          ...state,
          currentUser:currentUser 
        }
      }
    },
  
  };
  