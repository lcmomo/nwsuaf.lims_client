import React from 'react';
import { Card ,Message} from 'antd';
import { connect } from 'dva/index';
import RegisterForm from './RegisterForm'

import styles from './Login.scss'
@connect(({user})=>({user}))
class RegisterUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'user/createUser',
          payload: values,
          callback: () => {
              Message.success("注册成功,即将跳转至登录页面")
            setTimeout(()=>(this.props.history.push('/login')),2000);
          },
        });
      };
    render(){
        return (
            <div className={styles.normal} style={{height:window.innerHeight}}>
        <h1 className={styles.title} style={{paddingTop:"2em"}}>开放实验平台预约管理系统</h1>
        <div className={styles.account}>
                <Card title={<b>用户注册</b>}>
                    <RegisterForm submitForm={this.submitForm}></RegisterForm>
                </Card>
            </div>
            </div>
        )
    }
}
export default RegisterUser;