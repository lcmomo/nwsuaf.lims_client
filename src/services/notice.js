import {stringify} from 'qs';
import request from '../utils/request';

export async function fetchNoticeListI(params){
    return request(`/notice/list?${stringify(params)}`).then(res=>res.data);
}