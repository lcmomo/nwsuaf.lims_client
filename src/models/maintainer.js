
import {message} from 'antd'
import {
  fetchMaintainerListI,
  createMaintainerI,
  deleteMaintainerRecordI,
  updateMaintainerI,
  fetchCurrentMaintainerI
} from '../services/maintainer';
export default {

    namespace: 'maintainer',
  
    state: {
     maintainerList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取维修商列表
      *fetchMaintainerList({payload,callback},{call,put}){
        const results=yield call(fetchMaintainerListI,payload);
        yield put({
          type:'saveMaintainerList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //获取一条记录
      *fetchCurrentMaintainer({payload,callback},{call,put}){
        const results=yield call(fetchCurrentMaintainerI,payload);
        yield put({
          type:'saveCurrentMaintainer',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加维修商列表
      *createMaintainer({payload,callback},{call}){
        const response=yield call(createMaintainerI,payload);
        //console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条维修商记录
      *deleteMaintainerRecord({payload,callback},{call}){
        const response=yield call(deleteMaintainerRecordI,payload);
        //console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
      //修改用户记录
      *updateMaintainer({payload,callback},{call}){
     
        const response=yield call(updateMaintainerI,payload);
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

      saveMaintainerList(state,action){
       
        const {list,pageNum,pageSize}=action.payload.data;
      // console.log(list);
      
        //console.log(list);
        return {
          ...state,
          maintainerList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentMaintainer(state,action){
       
        const currentMaintainer=action.payload.data;
       console.log(currentMaintainer);
      
        //console.log(list);
        return {
          ...state,
          currentMaintainer:currentMaintainer 
        }
      }
    },
  
  };
  