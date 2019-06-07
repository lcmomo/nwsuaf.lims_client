import {stringify} from 'qs';
import request from '../utils/request';

import { getItemEnv}  from './index.js'
const baseUrl=getItemEnv()==='development'?"http://120.95.133.187:8080":'http://59.110.141.166:8080';
//const baseUrl=getItemEnv()==='development'?"http://localhost:8080":'http://localhost:8080'

export async function fetchNoticeListI(params){
    return request(`${baseUrl}/notice/list?${stringify(params)}`).then(res=>res.data);
}

export async function createNoticeI(params){
    return request(`${baseUrl}/notice/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteNoticeRecordI(params){
    return request(`${baseUrl}/notice/delete`,{
        method:'DELETE',
        body:params
        
    }).then(res=>res.data);
}