import React, { Component,Fragment } from 'react';
import { Button, Card, Table, Popconfirm,Message} from 'antd';
//import moment from 'moment/moment';
import {connect} from 'dva';
import{Link} from 'dva/router'
//import withSearchAndPaging from '../../components/withSearchAndPaging';


@connect(({plat,global,instrument})=>(
  {plat,global,instrument}
))

// @withSearchAndPaging(Filter, async (props, searchCondition) => {
//   let res = {};
//   await props.dispatch({
//     type: 'notice/fetchNoticeList',
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
   this.getInstrumentList();
  }
  
  async getInstrumentList(){
     
    let res = {};
    await this.props.dispatch({
      type: 'instrument/fetchInstrumentList',
      payload: {},
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeInstrumentRecord(record) {
    this.props.dispatch({
      type: 'instrument/deleteInstrumentRecord',
      payload: record,
      callback: () => {
        Message.success("删除成功");
        this.getInstrumentList();
      },
    });
  }


  addPlat=()=>{
    this.props.history.push('addInstrument');
  }

  toInstrumentData=()=>{
    this.props.history.push('instrumentData');
  }
 
  
  render() {
    const columns=[
      {
        title:<b>编号</b>,
        dataIndex:'instrumentno',
        width:130

      },
      {
        title:<b>名称</b>,
        dataIndex:'instruName',
        width:150
      },
      {
        title:<b>平台</b>,
        dataIndex:'platname',
        width:200,
        
      },
     
      {
        title:<b>备注</b>,
        dataIndex:'remark',
        
      
      },
     
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        align:'center',
        width: 180,
        render: (text, item) => {
          return (
            <Fragment>
               <Link to={`/index/instrument/updateInstrument/${item.id}`} 
              style={{color:666,cursor:'pointer'}}><Button type="primary">编辑</Button></Link>&nbsp;&nbsp;|&nbsp;&nbsp;
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this.removeInstrumentRecord(item)}
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

      const {instrument}=this.props;
      //const userInfo=JSON.parse(sessionStorage.getItem('user'));
      const {instrumentList}=instrument;
    // const { visible, loading,record } = this.state;
    // console.log(this.props);
    // console.log(moment(userInfo.redate).format('YYYY-MM-DD HH:mm'))
    return (
      <div>
        <Card title={<b>平台列表</b>}
         extra={
           <div 
           //style={{display:userInfo.role==='1'?'none':'normal'}}
           >
              <Button type="primary"  onClick={this.toInstrumentData}>
               仪器统计
             </Button>
             &nbsp;&nbsp;&nbsp;&nbsp;
             <Button type="primary"  onClick={this.addPlat}>
               新增仪器
             </Button>
           </div>
         }
        >
        <Table columns={columns} dataSource={instrumentList} rowKey="id" ></Table>
       
        </Card>
      </div>
    )
  }
}

