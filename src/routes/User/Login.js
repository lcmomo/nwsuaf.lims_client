import React, { Component } from 'react';
import { Form, Input, Button,Message,Icon } from 'antd';
import { connect } from 'dva';
import Request from '../../utils/request';


import styles from './Login.scss';


const FormItem=Form.Item;
@connect(({global})=>({userInfo:global.userInfo}))
 class Login extends Component {


    handleSubmit=(e)=>{
        e.preventDefault();
    this.props.form.validateFields((err,values)=>{
       
        if(!err){
            console.log(values);
            Request('http://120.95.133.187:8080/user/login',{method:'POST',
           
            body:values}).then((res)=>{
               
           
                const user=res.data.data;
                console.log(res);
                if(res.data.message==='SUCCESS'){
                    //localStorage.setItem('user',JSON.stringify(user));
                    sessionStorage.setItem('user',JSON.stringify(user))
                    console.log(this.props)
                    this.props.dispatch({
                        type:'global/setUserInfo',
                        payload:user
                    }).then(()=>{
                        Message.success('登录成功');
                        this.props.history.push('/index/notice/list');
                      
                    })
                }else{
                    Message.error('学工号或密码错误')
                }


            })
           
        }
    })
    
      }
  render() {

    const {getFieldDecorator}=this.props.form;
    return (
        <div className={styles.normal}>
        <h1 className={styles.title}>实验平台预约管理系统</h1>
        <div className={styles.account}>
            <Form className="account-form">
            <FormItem >
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
            <FormItem>
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
            })( <Input
                placeholder="密码" type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            
            </FormItem>
            
            <FormItem>
            <Button  className="btn" type="primary" onClick={this.handleSubmit}>
                登录
                </Button>
            </FormItem>
            </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)