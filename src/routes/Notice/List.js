import React, { Component,Fragment } from 'react'
import { Button, Card, Table, Popconfirm, Modal,Form,Input,Message} from 'antd';

//import { Link } from 'dva/router';
import { connect } from 'dva/index';
import moment from 'moment/moment';
//import withSearchAndPaging from '../../components/withSearchAndPaging';
//import Filter from './Filter';

const FormItem=Form.Item;
const TextArea=Input.TextArea;
@connect(({notice,global})=>(
  {notice,global}
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
  class List extends Component {

  constructor(){
    super();
    this.state={
     record:{}
    };
    this.addNotice = this.addNotice.bind(this);
  }
  componentDidMount(){
   this.getNoticeList()
  }
  
  async getNoticeList(){
    let res = {};
    await this.props.dispatch({
      type: 'notice/fetchNoticeList',
      payload: {id:'000'},
      callback: result => {
        res = result;
      },
    });
  //console.log(res);
    return res;
  }
  
  removeNoticeRecord(recordId) {
    this.props.dispatch({
      type: 'notice/deleteNoticeRecord',
      payload: { id: recordId },
      callback: () => {
        Message.success("删除成功");
        this.props.fetchData();
      },
    });
  }


  addNotice=()=>{
    this.props.history.push('addNotice');
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
        title:<b>标题</b>,
        dataIndex:'title',
        width:180

      },
      {
        title:<b>内容</b>,
        dataIndex:'content',
        width:400
      },
      {
        title:<b>类别</b>,
        dataIndex:'category',
        width:150,
        render:(text)=>{
          return text==='1'?'实验平台消息':'系统消息'
        }
      },
     
      {
        title:<b>时间</b>,
        dataIndex:'noticeTime',
        width:180,
        render:text=>(text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '')
      
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
              <span onClick={()=>this.showModal(item)} 
              style={{color:666,cursor:'pointer'}}>详情</span><span style={{display:userInfo.role==='用户'?'none':'normal'}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this.removeNoticeRecord(item.id)}
              >
                <a  style={{color:666,cursor:'pointer',display:userInfo.role==='用户'?'none':'normal'}}>删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

    const {notice}=this.props;
    const userInfo=JSON.parse(sessionStorage.getItem('user'));
    const {noticeList}=notice;
    const { visible,record } = this.state;
    console.log(this.props);
    console.log(process.env.NODE_ENV)
    return (
      <div>
        <Card title={<b>消息列表</b>}
         extra={
           <div 
           style={{display:userInfo.role==='用户'?'none':'normal'}}
           >
             <Button type="primary" onClick={this.addNotice}>
               新增消息
             </Button>
           </div>
         }
        >
          <Table columns={columns} dataSource={noticeList}rowKey="id"></Table>
        <Modal visible={visible} title={<b>消息详情</b>}
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
        </Modal>
        </Card>
      </div>
    )
  }
}

export default Form.create()(List)