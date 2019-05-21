
import {message} from 'antd'
import {
  fetchDeviceListI,
  createDeviceI,
  deleteDeviceRecordI,
  updateDeviceI,
  fetchCurrentDeviceI
} from '../services/device';
export default {

    namespace: 'device',
  
    state: {
      DeviceList:[]
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
      *fetchDeviceList({payload,callback},{call,put}){
        const results=yield call(fetchDeviceListI,payload);
        yield put({
          type:'saveDeviceList',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //获取一条记录
      *fetchCurrentDevice({payload,callback},{call,put}){
        const results=yield call(fetchCurrentDeviceI,payload);
        yield put({
          type:'saveCurrentDevice',
          payload:results,
        });
        if (typeof callback === 'function') {
          callback(results);
        }
      },
      //添加用户列表
      *createDevice({payload,callback},{call}){
        const response=yield call(createDeviceI,payload);
        //console.log(payload);
       
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },

      //删除一条用户记录
      *deleteDeviceRecord({payload,callback},{call}){
        const response=yield call(deleteDeviceRecordI,payload);
        //console.log(response)
        if(response.message==="SUCCESS"){
          if (typeof callback === 'function') {
            callback();
          }
        }
      },
      //修改用户记录
      *updateDevice({payload,callback},{call}){
     
        const response=yield call(updateDeviceI,payload);
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

      saveDeviceList(state,action){
       
        const {list,pageNum,pageSize}=action.payload.data;
      // console.log(list);
      
        //console.log(list);
        return {
          ...state,
          deviceList:list,
          paageBean:{
            pageNum,
            pageSize
          }
          
         
        }
      },

      saveCurrentDevice(state,action){
       
        const currentDevice=action.payload.data;
       //console.log(currentDevice);
      
        //console.log(list);
        return {
          ...state,
          currentDevice:currentDevice 
        }
      }
    },
  
  };
  