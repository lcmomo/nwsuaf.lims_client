import React, { Component,Fragment } from 'react';
import { Button, Card, Table, Popconfirm,Form,Input} from 'antd';
import moment from 'moment/moment';
import {connect} from 'dva';
import withSearchAndPaging from '../../components/withSearchAndPaging';

const FormItem=Form.Item;
const TextArea=Input.TextArea;
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
      const {plat}=this.props;
    let res = {};
    await this.props.dispatch({
      type: 'instrument/fetchInstrumentList',
      payload: {platname:plat.platname},
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
//   removeNoticeRecord(recordId) {
//     this.props.dispatch({
//       type: 'user/deleteUserRecord',
//       payload: { id: recordId },
//       callback: () => {
//         Message.success("删除成功");
//         this.getUserList();
//       },
//     });
//   }


  addPlat=()=>{
    this.props.history.push('addPlat');
  }


  showPlatDatial=(item)=>{

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
        dataIndex:'platno',
        width:150

      },
      {
        title:<b>名称</b>,
        dataIndex:'platname',
        width:150
      },
      {
        title:<b>负责人</b>,
        dataIndex:'manager',
        width:200,
        
      },
     
      {
        title:<b>备注</b>,
        dataIndex:'isAudited',
        width:150
      
      },
     
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        //width: '130px',
        render: (text, item) => {
          return (
            <Fragment>
              <Button onClick={()=>this.showPlatDatial(item)} type="primary" 
              style={{color:666,cursor:'pointer'}}>详情</Button>&nbsp;&nbsp;|&nbsp;&nbsp;
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this. removePlatRecord(item.id)}
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

      const {global,pageBean,instrument}=this.props;
      const userInfo=JSON.parse(sessionStorage.getItem('user'));
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
             <Button type="primary"  onClick={this.addPlat}>
               新增平台
             </Button>
           </div>
         }
        >
        <Table columns={columns} rowKey="id" ></Table>
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

