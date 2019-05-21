import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

export async function fetchDeviceListI(params){
    return request(`${baseUrl}/device/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentDeviceI(params){
    return request(`${baseUrl}/device/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createDeviceI(params){
    return request(`${baseUrl}/device/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteDeviceRecordI(params){
    return request(`${baseUrl}/device/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateDeviceI(params){
    
    return request(`${baseUrl}/device/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}