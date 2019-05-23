

import {
  fetchOrderListI,
  createOrderI,
  deleteOrderRecordI,
  updateOrderI,
  fetchCurrentOrderI,
  fetchOrderListByUsernameI,
  fetchOrderListByTimeI
} from '../services/order';
export default {

    namespace: 'order',
  
    state: {
     orderList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取预约记录列表
      *fetchOrderList({payload,callback},{call,put}){
        const results=yield call(fetchOrderListI,payload);
        yield put({
          type:'saveOrderList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },

      *fetchOrderListByTime({payload,callback},{call,put}){
        const results=yield call(fetchOrderListByTimeI,payload);
        console.log(results);
        // yield put({
        //   type:'saveOrderList',
        //   payload:results,
        // });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      *fetchOrderListByUsername({payload,callback},{call,put}){
        const results=yield call(fetchOrderListByUsernameI,payload);
        yield put({
          type:'saveOrderList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //获取一条记录
      *fetchCurrentOrder({payload,callback},{call,put}){
        const results=yield call(fetchCurrentOrderI,payload);
        yield put({
          type:'saveCurrentOrder',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加预约记录列表
      *createOrder({payload,callback},{call}){
        const response=yield call(createOrderI,payload);
       // console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback(response);
          }
        }
      },

      //删除一条预约记录
      *deleteOrderRecord({payload,callback},{call}){
        const response=yield call(deleteOrderRecordI,payload);
        //console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
      //修改预约记录
      *updateOrder({payload,callback},{call}){
     
        const response=yield call(updateOrderI,payload);
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

      saveOrderList(state,action){
       
        const {list,pageNum,pageSize}=action.payload.data;
      // console.log(list);
      
        //console.log(list);
        return {
          ...state,
         orderList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentOrder(state,action){
       
        const currentOrder=action.payload.data;
       console.log(currentOrder);
      
        //console.log(list);
        return {
          ...state,
          currentOrder:currentOrder 
        }
      }
    },
  
  };
  