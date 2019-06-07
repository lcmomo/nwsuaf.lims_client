

import {
  fetchNoticeListI,
  createNoticeI,
  deleteNoticeRecordI,
} from '../services/notice';
export default {

    namespace: 'notice',
  
    state: {
      noticeList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },

      //获取消息通知列表
      *fetchNoticeList({payload,callback},{call,put}){
        const results=yield call(fetchNoticeListI,payload);
        yield put({
          type:'saveNoticeList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加消息通知列表
      *createNotice({payload,callback},{call}){
        const response=yield call(createNoticeI,payload);
        console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条消息记录
      *deleteNoticeRecord({payload,callback},{call}){
        const response=yield call(deleteNoticeRecordI,payload);
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

      saveNoticeList(state,action){
        
        const {list,pageNum,pageSize}=action.payload.data;
       console.log(action.payload.data);
        //console.log(list);
        return {
          ...state,
          noticeList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      }
    },
  
  };
  