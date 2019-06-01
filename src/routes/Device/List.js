import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Popconfirm, Message} from 'antd';

import { Link } from 'dva/router';
import { connect } from 'dva/index';
import {DEVICE_CATEGORY} from '../../utils/constant.js'
//import moment from 'moment/moment';
//import withSearchAndPaging from '../../components/withSearchAndPaging';
//import Filter from './Filter';



@connect(({device,global})=>(
  {device,global}
))

// @withSearchAndPaging(Filter, async (props, searchCondition) => {
//   let res = {};
//   await props.dispatch({
//     type: 'Device/fetchDeviceList',
//     payload: searchCondition,
//     // callback: result => {
//     //   res = result;
//     // },
//   });

//   return res;
// })
 export default class List extends Component {

  constructor(){
    super();
    this.state={
      loading:false,
      visible:false,
      record:{}
    };
  }
  componentDidMount(){
   this.getDeviceList();
  }
  
  async getDeviceList(){
    let res = {};
    await this.props.dispatch({
      type: 'device/fetchDeviceList',
      
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeDeviceRecord(recordId) {
    this.props.dispatch({
      type: 'device/deleteDeviceRecord',
      payload: { id: recordId },
      callback: () => {
        Message.success("删除成功");
        this.getDeviceList();
      },
    });
  }


  
  addDevice=()=>{
    this.props.history.push('/index/device/addDevice');
  }
  

 
  render() {
    const columns=[
      {
        title:<b>编号</b>,
        dataIndex:'consumeno',
        width:120

      },
      {
        title:<b>名称</b>,
        dataIndex:'consumeName',
        width:150
      },
      {
        title:<b>类别</b>,
        dataIndex:'category',
        width:120,
        render:(text)=>{
          return DEVICE_CATEGORY[text];
        }
      },
     
      {
        title:<b>规格型号</b>,
        dataIndex:'specs',
        width:180,     
      
      },
      {
        title:<b>生产商</b>,
        dataIndex:'producer'
      },
      {
        title:<b>供应商</b>,
        dataIndex:'supplyer'
      },
      {
        title:<b>平台名称</b>,
        dataIndex:'platname'
      },
      {
        title:<b>单价(元)</b>,
        dataIndex:'price'
      },
      {
        title:<b>数量</b>,
        dataIndex:'amount'
      },
      {
        title:<b>总价(元)</b>,
        dataIndex:'totalPrice'
      },
      {
        title:<b>备注</b>,
        dataIndex:'remark'
      },
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        width: '130px',
        render: ( text,item) => {
          return (
            <Fragment>
             <Link to={`/index/device/updateDevice/${item.id}`} 
              style={{color:666,cursor:'pointer'}}>编辑</Link>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this.removeDeviceRecord(item.id)}
              >
                <a  style={{color:666,cursor:'pointer'}}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

    const {device}=this.props;
    //const userInfo=JSON.parse(sessionStorage.getItem('user'));
    const {deviceList}=device;
    //const { visible, loading,record } = this.state;
    console.log(this.props);
    console.log(process.env.NODE_ENV)
    return (
      <div>
        <Card title={<b>设备列表</b>}
         extra={
           <div 
           //style={{display:userInfo.role==='1'?'none':'normal'}}
           >
             <Button type="primary" onClick={this.addDevice}>
               添加设备
             </Button>
           </div>
         }
        >
          <Table columns={columns} rowKey="id" dataSource={deviceList}></Table>
       
        </Card>
      </div>
    )
  }
}

