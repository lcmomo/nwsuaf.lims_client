import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Popconfirm, Modal,Form,Input,Message} from 'antd';

import { Link } from 'dva/router';
import { connect } from 'dva/index';
import moment from 'moment/moment';
import withSearchAndPaging from '../../components/withSearchAndPaging';

const FormItem=Form.Item;
const TextArea=Input.TextArea;
@connect(({user,global})=>(
  {user,global}
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
   this.getUsersList()
  }
  
  async getUsersList(){
    let res = {};
    await this.props.dispatch({
      type: 'user/fetchUserList',
      payload: {},
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeUserRecord=(recordId) =>{
    this.props.dispatch({
      type: 'user/deleteUserRecord',
      payload: { id: recordId },
      callback: () => {
        Message.success("删除成功");
        
      },
    });
    setTimeout(()=>(this.props.history.push('list')),3000);
  }


  addUser=()=>{
    this.props.history.push('addUser');
  }


//   showModal=(item)=>{
//     this.setState({
//       visible:true,
//       record:item
//     })
//   }

//   handleCancel = () => {
//     this.setState({ visible: false,record:{} });
//   };
  render() {
    const columns=[
      {
        title:<b>编号</b>,
        dataIndex:'userno',
        width:150

      },
      {
        title:<b>姓名</b>,
        dataIndex:'username',
        width:150
      },
      {
        title:<b>身份</b>,
        dataIndex:'role',
        width:150,
        
      },
     
      {
        title:<b>预约权限</b>,
        dataIndex:'isAudited',
        width:150
      
      },
      {
        title:<b>电话</b>,
        dataIndex:'phone',
        width:150
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
              <Button onClick={()=>this.showModal(item)} type="primary" 
              style={{color:666,cursor:'pointer'}}>{item.isAudited==='否'&&item.role==='用户'?'授权':'取消权限'}</Button>&nbsp;&nbsp;|&nbsp;&nbsp;
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this. removeUserRecord(item.id)}
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

     const {global,pageBean,user}=this.props;
     const userInfo=JSON.parse(sessionStorage.getItem('user'));
     const {userList}=user;
    // const { visible, loading,record } = this.state;
    // console.log(this.props);
    // console.log(moment(userInfo.redate).format('YYYY-MM-DD HH:mm'))
    return (
      <div>
        <Card title={<b>用户列表</b>}
         extra={
           <div 
           //style={{display:userInfo.role==='1'?'none':'normal'}}
           >
             <Button type="primary"  onClick={this.addUser}>
               新增用户
             </Button>
           </div>
         }
        >
        <Table columns={columns} rowKey="id" dataSource={userList}></Table>
        {/* <Modal visible={visible} title={<b>消息详情</b>}
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
              <Input placeholder="消息标题"  defaultValue={record.title}/>)}
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

