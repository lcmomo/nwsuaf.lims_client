import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Message} from 'antd';

//import { Link } from 'dva/router';
import { connect } from 'dva/index';
import moment from 'moment/moment';
//import withSearchAndPaging from '../../components/withSearchAndPaging';
//import Filter from './Filter';
import {ORDER_STATUS} from '../../utils/constant.js'


@connect(({order,global})=>(
  {order,global}
))

// @withSearchAndPaging(Filter, async (props, searchCondition) => {
//   let res = {};
//   await props.dispatch({
//     type: 'Order/fetchOrderList',
//     payload: searchCondition,
//     // callback: result => {
//     //   res = result;
//     // },
//   });

//   return res;
// })
  class List extends Component {

  constructor(){
    super();
    this.state={
     record:{}
    };
    this.addOrder = this.addOrder.bind(this);
  }
  componentDidMount(){
   this.getOrderList()
  }
  
  async getOrderList(){
    let res = {};
    await this.props.dispatch({
      type: 'order/fetchOrderList',
      payload: {},
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeOrderRecord(recordId) {
    this.props.dispatch({
      type: 'order/deleteOrderRecord',
      payload: { id: recordId },
      callback: () => {
        Message.success("删除成功");
        this.props.fetchData();
      },
    });
  }


  addOrder=()=>{
    this.props.history.push('addOrder');
  }


  showModal=(item)=>{
    this.setState({
      visible:true,
      record:item
    })
  }
  toAudited=(item)=>{
    this.props.dispatch({
      type:'order/updateOrder',
      payload:{
        ...item,
        status:"2"
      },
      callback:()=>{
        Message.success('操作成功');
      }
    }

    )
    setTimeout(()=>(this.props.history.push('list')),1000)
  }

  toUsed=(item)=>{
    this.props.dispatch({
      type:'order/updateOrder',
      payload:{
        ...item,
        status:"3"
      },
      callback:()=>{
        Message.success('操作成功');
      }
    }

    )
    setTimeout(()=>(this.props.history.push('list')),1000)
  }

  handleCancel = () => {
    this.setState({ visible: false,record:{} });
  };








  
  render() {
    const columns=[
      {
        title:<b>编号</b>,
        dataIndex:'orderno',
        width:120

      },
      {
        title:<b>用户姓名</b>,
        dataIndex:'username',
        width:130
      },
      {
        title:<b>设备名称</b>,
        dataIndex:'instrName',
        width:150,
        
      },
     
      {
        title:<b>填写时间</b>,
        dataIndex:'orderTime',
        width:180,
        render:text=>(text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '')
      
      },
      {
        title:<b>使用时间</b>,
        dataIndex:'usename',
        width:260,
        render:(text,item)=>(`${item.useStarttime ? moment(item.useStarttime).format('YYYY-MM-DD HH:mm:ss') : ''}~
        ${item.useEndtime ? moment(item.useEndtime).format('YYYY-MM-DD HH:mm:ss') : ''}`)
      
      },
      {
        title:'状态',
        dataIndex:'status',
        filters:[{text:'审核中',value:'1'},{text:'审核通过 未使用',value:'2'},
        {text:'已使用',value:'3'},{text:'已取消',value:'4'}
      ],
      onFilter:(value,record)=>record.status.indexOf(value)===0,
        render:(text)=>(ORDER_STATUS[text])
      },
      {
        title:<b>备注</b>,
        dataIndex:'remark'
      },
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        //width: '130px',
        render: (text, item) => {
          return (
            <Fragment>
              <Button type="success" onClick={()=>this.toAudited(item)} 
              style={{color:'#40a9ff',cursor:'pointer',
              display:item.status==='1'?'normal':'none'
              }}>审核通过</Button>

             
              {/* <span style={{display:userInfo.role==='用户'?'none':'normal'}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this. removeOrderRecord(item.id)}
              >
                <a  style={{color:666,cursor:'pointer',display:userInfo.role==='用户'?'none':'normal'}}>删除</a>
              </Popconfirm> */}
            </Fragment>
          );
        },
      },
    ]

     const {order}=this.props;
     //const userInfo=JSON.parse(sessionStorage.getItem('user'));
     const {orderList}=order;
    // const { visible, loading,record } = this.state;
     console.log(this.props);
    // console.log(process.env.NODE_ENV)
    return (
      <div>
        <Card title={<b>预约列表</b>}
        //  extra={
        //    <div 
        //    style={{display:userInfo.role==='用户'?'none':'normal'}}
        //    >
        //      <Button type="primary" onClick={this.addOrder}>
        //        新增消息
        //      </Button>
        //    </div>
        //  }
        >
          <Table columns={columns} dataSource={orderList}rowKey="id"></Table>
        {/*<Modal visible={visible} title={<b>消息详情</b>}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
              返回
            </Button>,
        ]}
        >
          <Form>
          <FormItem label="标题" >
              <Input placeholder="消息标题"  defaultValue={record.title}/>
          </FormItem>
            <FormItem  label="消息内容">
            
                <TextArea
                  placeholder="消息内容"
                  style={{ width: '70%' }}
                  autosize={{ minRows: 2, maxRows: 6 }}
                  defaultValue={record.content}
               />
             
            </FormItem>
    
          </Form>
        </Modal> */}
        </Card>
      </div>
    )
  }
}

export default List;