import {stringify} from 'qs';
import request from '../utils/request';

import { getItemEnv}  from './index.js'
//const baseUrl=getItemEnv()==='development'?"http://120.95.133.187:8080":'http://59.110.141.166:8080';
const baseUrl=getItemEnv()==='development'?"http://localhost:8080":'http://localhost:8080'
export async function fetchUserListI(params){
    return request(`${baseUrl}/user?${stringify(params)}`).then(res=>res.data);
}
export async function fetchCurrentUserI(params){
    return request(`${baseUrl}/user/detail?${stringify(params)}`).then(res=>res.data);
}

export async function createUserI(params){
    return request(`${baseUrl}/user/add`,{
        method:'POST',
        body:params,

    }).then(res=>res.data);
}

export async function deleteUserRecordI(params){
    return request(`${baseUrl}/user/delete`,{
        method:'DELETE',
        body:params,
    }).then(res=>res.data);
}

export async function updateUserI(params){
    
    return request(`${baseUrl}/user/update`,{
        method:'PUT',
        body:params,
    }).then(res=>res.data);
}


export async function fetchByUserNameI(params){
    return request(`${baseUrl}/unread/find?${stringify(params)}`).then(res=>res.data);
}



export async function fetchUserByPhoneI(params){
    return request(`${baseUrl}/user/findByPhone?${stringify(params)}`).then(res=>res.data);
}
