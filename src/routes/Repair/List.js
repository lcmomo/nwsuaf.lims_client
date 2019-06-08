import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Popconfirm, Message} from 'antd';

import { Link } from 'dva/router';
import { connect } from 'dva/index';
//import {Repair_CATEGORY} from '../../utils/constant.js'
import moment from 'moment/moment';
//import withSearchAndPaging from '../../components/withSearchAndPaging';
//import Filter from './Filter';



@connect(({repair,global})=>(
  {repair,global}
))

// @withSearchAndPaging(Filter, async (props, searchCondition) => {
//   let res = {};
//   await props.dispatch({
//     type: 'Repair/fetchRepairList',
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
   this.getRepairList();
  }
  
  async getRepairList(){
    let res = {};
    await this.props.dispatch({
      type: 'repair/fetchRepairList',
      
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeRepairRecord(recordId) {
    this.props.dispatch({
      type: 'repair/deleteRepairRecord',
      payload: { id: recordId },
      callback: () => {
        Message.success("删除成功");
        this.getRepairList();
      },
    });
  }
  addRepair=()=>{
      this.props.history.push("addRepair");
  }
 

  // toRepairData=()=>{
  //   this.props.history.push('/index/repair/repairData');
  // }
  toRepairDeviceData=()=>{
    this.props.history.push('/index/repair/repairDeviceData');
  }
  toRepairInstrumentData=()=>{
    this.props.history.push('/index/repair/repairInstrumentData');
  }

  

  

 
  render() {
    const columns=[
      {
        title:<b>编号</b>,
        dataIndex:'repairno',
        width:120

      },
      {
        title:<b>设备名称</b>,
        dataIndex:'instrName',
        width:150
      },
      {
        title:<b>故障类别</b>,
        dataIndex:'hitchCate',
        width:120,
        // render:(text,item)=>{
        //   return Repair_CATEGORY[text];
        // }
      },
     
      {
        title:<b>平台名称</b>,
        dataIndex:'platName',
        width:150,     
      
      },
      {
        title:<b>维修商</b>,
        dataIndex:'maintainerName'
      },
      {
        title:<b>维修时间</b>,
        dataIndex:'repairTime',
        render:text=>(text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '')
      },
      {
        title:<b>操作人</b>,
        dataIndex:'operator'
      },
      
      {
        title:<b>备注</b>,
        dataIndex:'remark'
      },
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        width: '130px',
        render: (text, item) => {
          return (
            <Fragment>
             <Link to={`/index/repair/updateRepair/${item.id}`} 
              style={{color:666,cursor:'pointer'}}>编辑</Link><span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this.removeRepairRecord(item.id)}
              >
                <a  style={{color:666,cursor:'pointer'}}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

    const {repair}=this.props;
    //const userInfo=JSON.parse(sessionStorage.getItem('user'));
    const {repairList}=repair;
    //const { visible, loading,record } = this.state;
    console.log(this.props);
    console.log(process.env.NODE_ENV)
    return (
      <div>
        <Card title={<b>维修列表</b>}
         extra={
           <div 
           //style={{display:userInfo.role==='1'?'none':'normal'}}
           >
              <Button type="primary" onClick={this.toRepairInstrumentData}>
                仪器维修统计
             </Button>
             &nbsp;&nbsp;&nbsp;&nbsp;
             <Button type="primary" onClick={this.toRepairDeviceData}>
                设备维修统计
             </Button>
            
             &nbsp;&nbsp;&nbsp;&nbsp;
             <Button type="primary" onClick={this.addRepair}>
               添加维修记录
             </Button>
           </div>
         }
        >
          <Table columns={columns} rowKey="id" dataSource={repairList}></Table>
       
        </Card>
      </div>
    )
  }
}

