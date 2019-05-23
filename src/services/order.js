import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

export async function fetchOrderListI(params){
    return request(`${baseUrl}/appoint/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentOrderI(params){
    return request(`${baseUrl}/appoint/detail?${stringify(params)}`).then(res=>res.data);
}

export async function fetchOrderListByUsernameI(params){
    return request(`${baseUrl}/appoint/find?${stringify(params)}`).then(res=>res.data);
}
export async function fetchOrderListByTimeI(params){
    return request(`${baseUrl}/appoint/findbyTime`,{
        method:'POST',
        body:params
    }).then(res=>res.data);
}

export async function createOrderI(params){
    return request(`${baseUrl}/appoint/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteOrderRecordI(params){
    return request(`${baseUrl}/appoint/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateOrderI(params){
    
    return request(`${baseUrl}/appoint/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}