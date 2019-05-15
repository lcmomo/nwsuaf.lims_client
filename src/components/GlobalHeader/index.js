import React, { Component } from 'react'
import { Menu, Icon, Tag, Divider, Dropdown,Message } from 'antd';
import {connect} from 'dva';
import classNames from 'classnames';
import { Link } from 'dva/router';

import styles from './index.less'
import Avatar from 'Assets/img/userlogo.jpg';

@connect(({global})=>({userInfo:global.userInfo}))
export default class index extends Component {

   
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
    return (
      <div className={styles.header}>
        <div className={styles.head}>
        <div className={styles.right}>
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
