import React, { Component } from 'react';
import { Form, Input, Button,Message,Icon } from 'antd';
import { connect } from 'dva';
import {Link} from 'dva/router'
import Request from '../../utils/request';
import {encrypt,decrypt} from '../../utils/aesutil.js'

import styles from './Login.scss';


const FormItem=Form.Item;
@connect(({global})=>({userInfo:global.userInfo}))
 class Login extends Component {


    handleSubmit=(e)=>{
        e.preventDefault();
    this.props.form.validateFields((err,values)=>{
       
        if(!err){
           
            Request('http://120.95.133.187:8080/user/login',
            {
                method:'POST',
           
            body:{
                ...values,
                password: encrypt(values.password)
            }
            }).then((res)=>{
               
           
                const user=res.data.data;
                console.log(res);
                if(res.data.message==='SUCCESS'){
                    //localStorage.setItem('user',JSON.stringify(user));
                    sessionStorage.setItem('user',JSON.stringify(user))
                   
                    this.props.dispatch({
                        type:'global/setUserInfo',
                        payload:user
                    }).then(()=>{
                        Message.success('登录成功');
                        setTimeout(()=>( this.props.history.push('/index/notice/list')),1000);
                       
                      
                    })
                }else{
                    if(res.data.message==='err')
                        Message.error("密码错误，请重试");
                    else if(res.data.message==='unregister'){
                        Message.error("您还未注册，即将跳转至注册页面");
                        setTimeout(()=>( this.props.history.push('/register')),1000)
                    }
                }


            }).catch(err=>{
                Message.error('系统错误');
            })
           
        }
    })
    
      }
  render() {

    const {getFieldDecorator}=this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
    return (
        <div className={styles.normal} style={{height:window.innerHeight}}>
        <h1 className={styles.title}>科研实验平台预约管理系统</h1>
        <div className={styles.account}>
        <Form className="account-form" {...formItemLayout}>
            <FormItem  label="用户名">
            {getFieldDecorator('username',{
                //initialValue:'test'
                rules:[
                {
                    required: true,
                    message: '用户名不能为空'
                },
                {
                
                    validator: this.validatorForm,
                    message: '请输入用户名'
                }
                ]
            })( <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
            />)}
            
            </FormItem>
            <FormItem  label="密码">
            {getFieldDecorator('password',{
                rules: [
                {
                    required: true,
                    message: '密码不能为空，请输入密码！'
                },
                {
                
                    validator: this.validatorForm,
                    message:
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                }
                ]
            })( <Input.Password
                placeholder="密码" type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            
            </FormItem>
            
            <FormItem >
            <Button  className="btn" type="primary" onClick={this.handleSubmit}>
                登录
            </Button>
            </FormItem>
            <Link to="/forgetPassword"><span className={styles.forget}>忘记密码?</span></Link>
            
            </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)