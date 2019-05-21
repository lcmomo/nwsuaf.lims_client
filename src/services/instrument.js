import {stringify} from 'qs';
import request from '../utils/request';
import { getItemEnv}  from './index.js'
const baseUrl=getItemEnv()==='development'?"http://localhost:8080":'http://';

export async function fetchInstrumentListI(params){
    return request(`${baseUrl}/instrument?${stringify(params)}`).then(res=>res.data);
}

export async function createInstrumentI(params){
    return request(`/instrument/add`,{
        method:'PUT',
        body:params,

    }).then(res=>res.data);
}

export async function deleteInstrumentRecordI(params){
    return request(`/instrument/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function fetchInstrumentByCondiionI(params){
    return request(`${baseUrl}/instrument/find?${stringify(params)}`).then(res=>res.data);
}