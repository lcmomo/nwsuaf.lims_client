
import {message} from 'antd'
import {
  fetchProducerListI,
  createProducerI,
  deleteProducerRecordI,
  updateProducerI,
  fetchCurrentProducerI
} from '../services/producer';
export default {

    namespace: 'producer',
  
    state: {
     producerList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取生产商列表
      *fetchProducerList({payload,callback},{call,put}){
        const results=yield call(fetchProducerListI,payload);
        yield put({
          type:'saveProducerList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //获取一条记录
      *fetchCurrentProducer({payload,callback},{call,put}){
        const results=yield call(fetchCurrentProducerI,payload);
        yield put({
          type:'saveCurrentProducer',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加生产商列表
      *createProducer({payload,callback},{call}){
        const response=yield call(createProducerI,payload);
        //console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条生产商记录
      *deleteProducerRecord({payload,callback},{call}){
        const response=yield call(deleteProducerRecordI,payload);
        //console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
      //修改生产商记录
      *updateProducer({payload,callback},{call}){
     
        const response=yield call(updateProducerI,payload);
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

      saveProducerList(state,action){
       
        const {list,pageNum,pageSize}=action.payload.data;
      // console.log(list);
      
        //console.log(list);
        return {
          ...state,
          producerList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentProducer(state,action){
       
        const currentProducer=action.payload.data;
       //console.log(currentProducer);
      
        //console.log(list);
        return {
          ...state,
          currentProducer:currentProducer 
        }
      }
    },
  
  };
  