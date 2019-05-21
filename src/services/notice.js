import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

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