import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

export async function fetchPlatListI(params){
    return request(`${baseUrl}/expplat?${stringify(params)}`).then(res=>res.data);
}

export async function createPlatI(params){
    return request(`/plat/add`,{
        method:'PUT',
        body:params,

    }).then(res=>res.data);
}

export async function deletePlatRecordI(params){
    return request(`/plat/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}