import {stringify} from 'qs';
import request from '../utils/request';
import { getItemEnv}  from './index.js'
const baseUrl=getItemEnv()==='development'?"http://120.95.133.187:8080":'http://59.110.141.166:8080';
//const baseUrl=getItemEnv()==='development'?"http://localhost:8080":'http://localhost:8080'

export async function fetchInstrumentListI(params){
    return request(`${baseUrl}/instrument/list?${stringify(params)}`).then(res=>res.data);
}

export async function fetchCurrentInstrumentI(params){
    return request(`${baseUrl}/instrument/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createInstrumentI(params){
    return request(`${baseUrl}/instrument/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteInstrumentRecordI(params){
    return request(`${baseUrl}/instrument/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function fetchInstrumentByCondiionI(params){
    return request(`${baseUrl}/instrument/find?${stringify(params)}`).then(res=>res.data);
}

export async function updateInstrumentI(params){
    
    return request(`${baseUrl}/instrument/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}