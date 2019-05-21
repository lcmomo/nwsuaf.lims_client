import React, { Component,Fragment } from 'react';
import { Button, Card, Table, Popconfirm,Form,Input} from 'antd';
import moment from 'moment/moment';
import {Link} from 'dva/router'
import {connect} from 'dva';
import withSearchAndPaging from '../../components/withSearchAndPaging';

const FormItem=Form.Item;
const TextArea=Input.TextArea;
@connect(({plat,global})=>(
  {plat,global}
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
   this.getPlatList();
  }
  
  async getPlatList(){
    let res = {};
    await this.props.dispatch({
      type: 'plat/fetchPlatList',
      payload: {},
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
     this.props.history.push(`detail/${item.platname}`);
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
              <Button  type="primary" 
              style={{color:666,cursor:'pointer'}}><Link to={`/index/plat/detail/${item.platname}`}>详情</Link></Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this. removePlatRecord(item.id)}
              >
                <Button type="danger" style={{color:666,cursor:'pointer', display:userInfo.role==="用户"?'none':'normal'}}>删除</Button>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ]

      const {global,pageBean,plat}=this.props;
      const userInfo=JSON.parse(sessionStorage.getItem('user'));
      const {platList}=plat;
    // const { visible, loading,record } = this.state;
    // console.log(this.props);
    // console.log(moment(userInfo.redate).format('YYYY-MM-DD HH:mm'))
    return (
      <div>
        <Card title={<b>平台列表</b>}
         extra={
           <div 
           style={{display:userInfo.role==='用户'?'none':'normal'}}
           >
             <Button type="primary"  onClick={this.addPlat}>
               新增平台
             </Button>
           </div>
         }
        >
        <Table columns={columns} rowKey="id" dataSource={platList}></Table>
       
        </Card>
      </div>
    )
  }
}

