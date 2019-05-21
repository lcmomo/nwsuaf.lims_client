import {stringify} from 'qs';
import request from '../utils/request';

const baseUrl="http://localhost:8080";

export async function fetchMaintainerListI(params){
    return request(`${baseUrl}/maintainer/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentMaintainerI(params){
    return request(`${baseUrl}/maintainer/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createMaintainerI(params){
    return request(`${baseUrl}/maintainer/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteMaintainerRecordI(params){
    return request(`${baseUrl}/maintainer/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateMaintainerI(params){
    
    return request(`${baseUrl}/maintainer/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}