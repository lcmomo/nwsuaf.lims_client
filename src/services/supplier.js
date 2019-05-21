import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

export async function fetchSupplierListI(params){
    return request(`${baseUrl}/supplier/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentSupplierI(params){
    return request(`${baseUrl}/supplier/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createSupplierI(params){
    return request(`${baseUrl}/supplier/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteSupplierRecordI(params){
    return request(`${baseUrl}/supplier/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateSupplierI(params){
    
    return request(`${baseUrl}/supplier/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}