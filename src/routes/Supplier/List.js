import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Popconfirm, Message} from 'antd';

import { Link } from 'dva/router';
import { connect } from 'dva/index';
//import moment from 'moment/moment';
//import withSearchAndPaging from '../../components/withSearchAndPaging';
//import Filter from './Filter';


@connect(({supplier,global})=>(
  {supplier,global}
))

// @withSearchAndPaging(Filter, async (props, searchCondition) => {
//   let res = {};
//   await props.dispatch({
//     type: 'supplier/fetchSupplierList',
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
   this.getSupplierList();
  }
  
  async getSupplierList(){
    let res = {};
    await this.props.dispatch({
      type: 'supplier/fetchSupplierList',
      
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeSupplierRecord(recordId) {
    this.props.dispatch({
      type: 'supplier/deleteSupplierRecord',
      payload: { id: recordId },
      callback: () => {
        Message.success("删除成功");
        this.getSupplierList();
      },
    });
  }


  addSupplier=()=>{
    this.props.history.push('addSupplier');
  }


  showModal=(item)=>{
    this.setState({
      visible:true,
      record:item
    })
  }

  handleCancel = () => {
    this.setState({ visible: false,record:{} });
  };
  render() {
    const columns=[
      {
        title:<b>编号</b>,
        dataIndex:'supplierno',
        width:150

      },
      {
        title:<b>名称</b>,
        dataIndex:'suppName',
        width:150
      },
      {
        title:<b>联系方式</b>,
        dataIndex:'phone',
        width:180,
       
      },
     
      {
        title:<b>联系人</b>,
        dataIndex:'linkman',
        width:180,     
      
      },
      {
        title:<b>地址</b>,
        dataIndex:'address',
        width:180,     
      
      },
      {
        title:<b>remark</b>,
        dataIndex:'备注'
      },
     
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        //width: '130px',
        render: (text, item) => {
          return (
            <Fragment>
               <Link to={`/index/supplier/updateSupplier/${item.id}`} 
              style={{color:666,cursor:'pointer'}}>编辑</Link><span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this.removeSupplierRecord(item.id)}
              >
                <a  style={{color:666,cursor:'pointer'}}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

    const {supplier}=this.props;
    //const userInfo=JSON.parse(sessionStorage.getItem('user'));
    const {supplierList}=supplier;
    console.log(supplierList)
    //const { visible, loading,record } = this.state;
    // console.log(this.props);
    // console.log(process.env.NODE_ENV)
    return (
      <div>
        <Card title={<b>供应商列表</b>}
         extra={
           <div 
           //style={{display:userInfo.role==='1'?'none':'normal'}}
           >
             <Button type="primary" onClick={this.addSupplier}>
               添加供应商
             </Button>
           </div>
         }
        >
          <Table columns={columns} rowKey="id" dataSource={supplierList}></Table>
      
        </Card>
      </div>
    )
  }
}

