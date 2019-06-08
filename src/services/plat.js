import {stringify} from 'qs';
import request from '../utils/request';

import { getItemEnv}  from './index.js'
//const baseUrl=getItemEnv()==='development'?"http://120.95.133.187:8080":'http://59.110.141.166:8080';
const baseUrl=getItemEnv()==='development'?"http://localhost:8080":'http://localhost:8080'

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