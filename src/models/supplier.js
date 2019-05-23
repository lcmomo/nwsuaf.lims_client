
import {
  fetchSupplierListI,
  createSupplierI,
  deleteSupplierRecordI,
  updateSupplierI,
  fetchCurrentSupplierI
} from '../services/supplier';
export default {

    namespace: 'supplier',
  
    state: {
     supplierList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取供应商列表
      *fetchSupplierList({payload,callback},{call,put}){
        const results=yield call(fetchSupplierListI,payload);
        yield put({
          type:'saveSupplierList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //获取一条记录
      *fetchCurrentSupplier({payload,callback},{call,put}){
        const results=yield call(fetchCurrentSupplierI,payload);
        yield put({
          type:'saveCurrentSupplier',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加供应商列表
      *createSupplier({payload,callback},{call}){
        const response=yield call(createSupplierI,payload);
        //console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条供应商记录
      *deleteSupplierRecord({payload,callback},{call}){
        const response=yield call(deleteSupplierRecordI,payload);
        //console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
      //修改供应商记录
      *updateSupplier({payload,callback},{call}){
     
        const response=yield call(updateSupplierI,payload);
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

      saveSupplierList(state,action){
       
        const {list,pageNum,pageSize}=action.payload.data;
      // console.log(list);
      
        //console.log(list);
        return {
          ...state,
          supplierList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentSupplier(state,action){
       
        const currentSupplier=action.payload.data;
       //console.log(currentSupplier);
      
        //console.log(list);
        return {
          ...state,
          currentSupplier:currentSupplier 
        }
      }
    },
  
  };
  