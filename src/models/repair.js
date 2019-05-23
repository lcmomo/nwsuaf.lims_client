

import {
    fetchRepairListI,
    createRepairI,
    deleteRepairRecordI,
    updateRepairI,
    fetchCurrentRepairI
  } from '../services/repair';
  export default {
  
      namespace: 'repair',
    
      state: {
        RepairList:[]
      },
    
      subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
      },
    
      effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
          yield put({ type: 'save' });
        },
  
        //获取维修列表
        *fetchRepairList({payload,callback},{call,put}){
          const results=yield call(fetchRepairListI,payload);
          yield put({
            type:'saveRepairList',
            payload:results,
          });
          if (typeof callback === 'function') {
            callback(results);
          }
        },
        //获取一条记录
        *fetchCurrentRepair({payload,callback},{call,put}){
          const results=yield call(fetchCurrentRepairI,payload);
          yield put({
            type:'saveCurrentRepair',
            payload:results,
          });
          if (typeof callback === 'function') {
            callback(results);
          }
        },
        //添加维修列表
        *createRepair({payload,callback},{call}){
          const response=yield call(createRepairI,payload);
          console.log(payload);
         
          if(response.message==="SUCCESS"){
            if (typeof callback === 'function') {
              callback();
            }
          }
        },
  
        //删除一条维修记录
        *deleteRepairRecord({payload,callback},{call}){
          const response=yield call(deleteRepairRecordI,payload);
          //console.log(response)
          if(response.message==="SUCCESS"){
            if (typeof callback === 'function') {
              callback();
            }
          }
        },
        //修改维修记录
        *updateRepair({payload,callback},{call}){
       
          const response=yield call(updateRepairI,payload);
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
  
        saveRepairList(state,action){
         
          const {list,pageNum,pageSize}=action.payload.data;
        // console.log(list);
        
          //console.log(list);
          return {
            ...state,
            repairList:list,
            paageBean:{
              pageNum,
              pageSize
            }
            
           
          }
        },
  
        saveCurrentRepair(state,action){
         
          const currentRepair=action.payload.data;
         //console.log(currentRepair);
        
          //console.log(list);
          return {
            ...state,
            currentRepair:currentRepair 
          }
        }
      },
    
    };
    