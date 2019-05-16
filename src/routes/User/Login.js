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
            Request('/user/login',{method:'POST'}).then((res)=>{
               
                const user=res.data.data;
                
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
    //     this.props.form.validateFields((err,values)=>{
    //      // console.log(values)
    //       if(!err){
    //         const {email,pwd}=values;
    //         //发起网络请求
    //         Request('./users.json').then(res=>{
    //           //console.log(res);
    //           const {data,status} =res;
    //           if(res&&status===200&&data){
    //             let users=[];
    //             for(let key in data){
    //               users.push({...data[key],key})
    //             }
    //             //账户密码匹配
    //             users=users.filter(user=>{
    //               return user.pwd===pwd&&user.email===email;
    //             });
               
    //             //有内容，则存储到models ,页面跳转
    //             if(users&&users.length){
    
    //               //先存储到localstorage
    //               localStorage.setItem('email',users[0].email);
    //               localStorage.setItem('key',users[0].key);
    //                 this.props.dispatch({
    //                   type:'global/setUserInfo',
    //                   payload:users[0]
    //                 }).then(()=>{
    //                   this.props.history.push('/');
    //                 })
    //             }else{
    //               Message.error('邮箱或密码错误')
    //             }
    //           }
             
    //         })
           
    //     }
    //    })
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