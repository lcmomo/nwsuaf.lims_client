
import {message} from 'antd'
import {
  fetchNoticeListI
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
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },

      saveNoticeList(state,action){
        console.log("action");
        const {list,pageNum,pageSize}=action.payload.data
        console.log(list);
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
  