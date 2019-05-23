import React, { Component } from 'react'
import moment from 'moment/moment'
import { Layout, Menu, Icon,Breadcrumb,Button} from 'antd';
import {Link,Switch} from 'dva/router'
import styles from './BaseLayout.less'
import UserLogo from '../components/GlobalHeader/index.js'
import {getMenuData} from '../routes/common/menu.js'
import { getMenuTreePath } from '../utils/index.js';
import SubRoutes , { RedirectRoute }from '../utils/SubRoutes.js'

const { Header, Sider, Content } = Layout;
const MenuItem=Menu.Item;
const SubMenu=Menu.SubMenu;
class BaseLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      opend:false,
      selectKeys:[],
      userInfo:{}
    }
  }
  

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleMenuClick=()=>{
    this.setState({
     opend: true,
    });
  }


       /**
     * 当页面刷新时，组件会重新加载，会执行 componentDidMount(cdm) 钩子函数
     * 为解决刷新页面菜单与路由不同步问题，解决方法则放在 cdm 钩子函数里执行
     */
    componentDidMount() {
     
     
      this.handleSetSelectedKeys(this.props.location.pathname);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
      const { pathname } = this.props.location;
      if (nextProps.location.pathname !== pathname) {
      // 当路由发生改变时, 改变当前菜单选中key值
      this.handleSetSelectedKeys(nextProps.location.pathname);
      }
  }

  handleSetSelectedKeys(pathname) {
      // /admin = ["/","admin"]
      // 根据'/'把路由地址分割成一个数组
      const temp = pathname.split('/');
      // 如果数组的长度小于2,表示的是只有根路径/,设置为Home. 否则取数组中第二个值
      const key = temp && temp.length < 2 ? 'home' : temp[1];
      this.setState({
        selectedKeys: [key]
      });
    }

  // 渲染路径面包屑
  renderBreadcrumb = () => {
    const { location: { pathname } } = this.props;
    const userInfo=JSON.parse(sessionStorage.getItem('user'));
    const paths = getMenuTreePath([pathname], getMenuData(userInfo.role), true, true);
  // console.log(paths);
  // console.log(pathname);
  // console.log(getMenuData())

    return (
      <Breadcrumb>
        <Breadcrumb.Item key={`/index`}>
          <Link to={`/index`}>首页</Link>
        </Breadcrumb.Item>
        {paths && paths.map(v => <Breadcrumb.Item key={v.path}>{v.name}</Breadcrumb.Item>)}
      </Breadcrumb>
    );
  };

  render() {
    const user=JSON.parse(sessionStorage.getItem('user'));
    const menudata=getMenuData(user.role);
   
    console.log(moment(user.redate).format('YYYY-MM-DD HH:mm'))
    const {app,routes}=this.props;
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} />
          {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu> */}

          <Menu theme="dark" mode="inline" defaultSelectedKeys={["notice"]}
          inlineCollapsed={this.state.opend}
          defaultOpenKeys={["notice"]}
          onClick={this.handleMenuClick}
          //defaultSelectedKeys={['home']}
          selectedKeys={this.state.selectedKeys}
          
          >

            {
              menudata.map(({key,name,path,icon,children})=>(
                
                <SubMenu key={key} title={
                  <span>
                    <Icon type={icon}/>
                    <span>{name}</span>
                  </span>
                }

               
                  >
                  {children.map(({key,name,path})=>(
                     <MenuItem key={key} >
                     <Link to={path}>{name}</Link> 
                     
                     </MenuItem>
                  ))
                  
                  }
                </SubMenu>
               
              )
              )
            } 
          </Menu> 

        </Sider>
      
        <Layout>
        <Header style={{ background: '#fff', padding: 0,position:'relative' }}>
            <Icon 
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <UserLogo/>
        </Header>

        <Content
            // style={{
            //   margin: '24px 16px',
            //   padding: 24,
            //   background: '#fff',
            //   minHeight: 480,
            // }}

            style={{margin:'24px 24px 0',minHeight:600}}
          >
          <div className={styles.breadcrumb}>
            {this.renderBreadcrumb()}
            <Button
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                  size="small"
                >
                  返回
            </Button>
            </div>

         
            {/* 二级路由 */}
            <Switch>
              {routes.map((route, i) => (
                // 调用封装组件
                <SubRoutes key={i} {...route} app={app} />
              ))}

              <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </Content>
       </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;