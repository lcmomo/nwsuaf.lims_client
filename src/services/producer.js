import {stringify} from 'qs';
import request from '../utils/request';

import { getItemEnv}  from './index.js'
const baseUrl=getItemEnv()==='development'?"http://120.95.133.187:8080":'http://59.110.141.166:8080';
//const baseUrl=getItemEnv()==='development'?"http://localhost:8080":'http://localhost:8080'
export async function fetchProducerListI(params){
    return request(`${baseUrl}/producer/list?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentProducerI(params){
    return request(`${baseUrl}/producer/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createProducerI(params){
    return request(`${baseUrl}/producer/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteProducerRecordI(params){
    return request(`${baseUrl}/producer/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateProducerI(params){
    
    return request(`${baseUrl}/producer/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}