import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Popconfirm, Form } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva/index';
import moment from 'moment/moment';
import withSearchAndPaging from '../../components/withSearchAndPaging';
import QuickReplyFilter from './Filter';

@connect(({notice})=>(
  {notice}
))

// @withSearchAndPaging(QuickReplyFilter, async (props, searchCondition) => {
//   let res = {};
//   await props.dispatch({
//     type: 'notice/fetchNoticeList',
//     payload: searchCondition,
//     callback: result => {
//       res = result;
//     },
//   });

//   return res;
// })
 export default class List extends Component {
  componentDidMount(){
   this.getNoticeList()
  }
  
  async getNoticeList(){
    let res = {};
    await this.props.dispatch({
      type: 'notice/fetchNoticeList',
      payload: {},
      callback: result => {
        res = result;
      },
    });
  console.log(res);
    return res;
  }
  
  render() {

    const {noticeList,pageBean}=this.props.notice;
    console.log(this.props);
    return (
      <div>
        这是消息通知
      </div>
    )
  }
}

