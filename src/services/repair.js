import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

export async function fetchRepairListI(params){
    return request(`${baseUrl}/repair/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentRepairI(params){
    return request(`${baseUrl}/repair/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createRepairI(params){
    return request(`${baseUrl}/repair/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteRepairRecordI(params){
    return request(`${baseUrl}/repair/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateRepairI(params){
    
    return request(`${baseUrl}/repair/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}