import React, { Component } from 'react'
import { Menu, Icon, Badge, Dropdown,Message,Tooltip } from 'antd';
import {connect} from 'dva';
import classNames from 'classnames';
import { Link } from 'dva/router';
import moment from 'moment/moment';
import styles from './index.less'
import Avatar from 'Assets/img/userlogo.jpg';


@connect(({global,unread})=>({userInfo:global.userInfo,unread}))
export default class index extends Component {
constructor(){
  super();
  this.state={
    notice:[]
  }
}

  componentDidMount(){
    this.fetchUnread();
  }
  fetchUnread(){
    let res={}
    const userInfo =JSON.parse(sessionStorage.getItem('user'));
    this.props.dispatch({
      type:'unread/findByUsername',
      payload:{
        username:userInfo.username
      },
      callback:(res)=>{
        console.log(res.data.list);
        if(res.data&&res.data.list)
        this.setState({
          notice:res.data.list
        })
      }
    })
    console.log(this.props);
  }
  content=()=>{
    const {notice}=this.state;
    return (
      notice.map((item)=>{
      <span key={item.key}>{item.content}-{item.time}</span>
      })
    )
  }
   
  render() {

    const userInfo =JSON.parse(sessionStorage.getItem('user'));
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item>
          <Link to={`#`}>
            <Icon type="download" />我的下载
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to={`/`}
            onClick={e => {
              localStorage.setItem('user',null);
              Message.success('退出系统')
              window.location.href = '/#/login';
              
            }}
          >
            <Icon type="logout" />退出登录
          </Link>
        </Menu.Item>
      </Menu>
    );
    const {notice}=this.state;
   const noticecontent=notice.map((item,index)=>(
   <span key={index}>{item.content}&nbsp;&nbsp;&nbsp;&nbsp;
    {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
    <br></br>
   </span>
   
   ))
    
    return (
      <div className={styles.header}>
        <div className={styles.head}>
       
        <div className={styles.right}>
          <div className={styles.NoticeBox}>
            <Tooltip title={notice.length>0?noticecontent:''}>
            <div className={styles.noticediv}>
              <Badge count={1} style={{fontSize:18,visibility:notice.length>0?'visible':'hidden'}} dot>
                  <Icon type="bell" style={{fontSize:36,color:'#999'}}></Icon>
              </Badge>
            </div>
            </Tooltip>
         
            
            </div>
          <Dropdown overlay={menu}>
              <div className={classNames(styles.action)}>
                <div className={styles.userAvatar}>
                <img src={Avatar} alt="" style={{ marginRight: '6px' }} />
                <span>{userInfo.username}</span>
                </div>
              </div>
            </Dropdown>
        </div>
        </div>
        </div>
    )
  }
}
