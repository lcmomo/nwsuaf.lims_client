import React, { Component,Fragment } from 'react';
import { Button, Card, Table, Popconfirm,notification} from 'antd';
//import moment from 'moment/moment';
import {connect} from 'dva';
//import withSearchAndPaging from '../../components/withSearchAndPaging';
import {getPathParams} from '../../components/_utils/pathTools.js'

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
      record:{},
      userInfo:{}
    };
  }
  componentDidMount(){
    const userInfo=JSON.parse(sessionStorage.getItem('user'));
    this.setState({userInfo:userInfo})
   this.getInstrumentList();
  }
  
  async getInstrumentList(){
    //const { match: { params: { platname } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/plat/detail/:platname',pathname);
    console.log(routeparam)
    let res = {};
    await this.props.dispatch({
      type: 'instrument/fetchInstrumentListByConditon',
      payload: {platname:routeparam[1]},
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

//添加平台信息
  addPlat=()=>{
    //this.props.history.push('addPlat');
  }


  IsAuduted=(item)=>{
    const {isAudited}=this.state.userInfo;
      if(isAudited==='是'){
        this.props.history.push(`../../order/addOrder/${item.instruName}`);
      }
      else{
         this.openNotification();
      }
  }
  toPlatChart=(item)=>{
    this.props.history.push(`../../plat/usechart/${item.id}`);
  }


  //用户没有预约权限弹出提醒
   openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        确定
      </Button>
    );
    notification.open({
      message: '通知提醒',
      description:
        '您还没有预约权限,请联系管理员申请',
      btn,
      key,
      
    });
  };
  
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
        title:<b>仪器编号</b>,
        dataIndex:'instrumentno',
        width:150

      },
      {
        title:<b>名称</b>,
        dataIndex:'instruName',
        width:150
      },
      {
        title:<b>平台名称</b>,
        dataIndex:'platname',
        width:200,
        
      },
      // {
      //   title:<b>状态</b>,
      //   dataIndex:'status',
      //   width:200,
        
      // },
     
      {
        title:<b>备注</b>,
        dataIndex:'',
        width:150
      
      },
     
      {
        title: <b>操作</b>,
        dataIndex: 'operation',
        //width: '130px',
        render: (text, item) => {
          return (
            <Fragment>
              <Button  onClick={()=>this.IsAuduted(item)} type="primary" 
              style={{color:666,cursor:'pointer', display:userInfo.role!=="用户"?'none':'normal'}}>预约</Button>
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={() => this.removePlatRecord(item.id)}
              >
                <Button type="danger" style={{color:666,cursor:'pointer', display:userInfo.role==="用户"?'none':'normal'}}>删除</Button>
                &nbsp;&nbsp;<Button onClick={()=>this.toPlatChart(item)} style={{color:666,cursor:'pointer', }}>使用情况</Button>
              </Popconfirm>
              
            </Fragment>
          );
        },
      },
    ]

      const {instrument}=this.props;
      const userInfo=JSON.parse(sessionStorage.getItem('user'));
      const {instrumentList}=instrument;
    // const { visible, loading,record } = this.state;
    // console.log(this.props);
    // console.log(moment(userInfo.redate).format('YYYY-MM-DD HH:mm'))
    return (
      <div>
        <Card title={<b>平台详情</b>}
        
        >
        <Table columns={columns} rowKey="id" dataSource={instrumentList}></Table>
      
        </Card>
      </div>
    )
  }
}

