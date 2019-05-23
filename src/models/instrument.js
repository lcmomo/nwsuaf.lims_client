

import {
  fetchInstrumentListI,
  createInstrumentI,
  deleteInstrumentRecordI,
  fetchInstrumentByCondiionI,
  fetchCurrentInstrumentI,
  updateInstrumentI
} from '../services/instrument';
export default {

    namespace: 'instrument',
  
    state: {
      instrumentList:[],

      
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取仪器列表
      *fetchInstrumentList({payload,callback},{call,put}){
        const results=yield call(fetchInstrumentListI,payload);
        yield put({
          type:'saveInstrumentList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },

      //获取一条记录
      *fetchCurrentInstrument({payload,callback},{call,put}){
        const results=yield call(fetchCurrentInstrumentI,payload);
        yield put({
          type:'saveCurrentInstrument',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },

      //根据平台名称获取仪器列表
      *fetchInstrumentListByConditon({payload,callback},{call,put}){
        console.log(payload)
        const results=yield call(fetchInstrumentByCondiionI,payload);
        console.log(results)
        yield put({
          type:'saveInstrumentListBycondition',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加仪器列表
      *createInstrument({payload,callback},{call}){
        const response=yield call(createInstrumentI,payload);
        console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条仪器记录
      *deleteInstrumentRecord({payload,callback},{call}){
        const response=yield call(deleteInstrumentRecordI,payload);
        console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //修改仪器记录
      *updateInstrument({payload,callback},{call}){
     console.log("err2")
        const response=yield call(updateInstrumentI,payload);
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

      saveInstrumentList(state,action){
        console.log("action");
        const {list,pageNum,pageSize}=action.payload.data;
       console.log(list);
       //const platList=list.filter((item)=>(item.role!=='管理员'))
        //console.log(list);
        return {
          ...state,
          instrumentList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },
      saveInstrumentListBycondition(state,action){
        console.log("action");
        const {list,pageNum,pageSize}=action.payload.data;
       console.log(list);
       //const platList=list.filter((item)=>(item.role!=='管理员'))
        //console.log(list);
        return {
          ...state,
          instrumentList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentInstrument(state,action){
       
        const currentInstrument=action.payload.data;
       //console.log(currentDevice);
      
        //console.log(list);
        return {
          ...state,
          currentInstrument:currentInstrument 
        }
      }



    },
  
  };
  