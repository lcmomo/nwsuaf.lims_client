
import {
  fetchPlatListI,
  createPlatI,
  deletePlatRecordI,
} from '../services/plat';
export default {

    namespace: 'plat',
  
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

      //获取平台列表
      *fetchPlatList({payload,callback},{call,put}){
        const results=yield call(fetchPlatListI,payload);
        yield put({
          type:'savePlatList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加平台列表
      *createUser({payload,callback},{call}){
        const response=yield call(createPlatI,payload);
        console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条平台记录
      *deletePlatRecord({payload,callback},{call}){
        const response=yield call(deletePlatRecordI,payload);
        console.log(response)
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

      savePlatList(state,action){
        console.log("action");
        const {list,pageNum,pageSize}=action.payload.data;
       console.log(list);
       //const platList=list.filter((item)=>(item.role!=='管理员'))
        //console.log(list);
        return {
          ...state,
          platList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      }
    },
  
  };
  