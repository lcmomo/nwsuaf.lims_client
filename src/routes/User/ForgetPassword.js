import React, { Component } from 'react';
import { Form, Input, Button,Message,Icon } from 'antd';
import { connect } from 'dva/index';

import Request from '../../utils/request';
import {encrypt,decrypt} from '../../utils/aesutil.js'

import styles from './ForgetPassword.less';


const FormItem=Form.Item;
@connect(({user})=>({user}))
 class ForgetPassword extends Component {
     constructor(props){
         super(props);
         this.state={
             userInfo:{
                 
             }
         }
     }

    handleSubmit=(e)=>{
    
    e.preventDefault();
    this.props.form.validateFields((errors,params)=>{
        this.props.dispatch({
            type:'user/updateUser',
            payload:{
                ...params,
                password:encrypt(params.password)
            },
            callback:(res)=>{
                if(res.message==='SUCCESS'){
                    Message.success('密码重置成功，请使用新密码登录');
                    setTimeout(()=>(this.props.history.push('/login')),2000)
                }
            }
        })
    })
      }


      findUserByPhone=e=>{
        console.log("er")
          e.preventDefault();
          this.props.form.validateFields((errors,params)=>{
            
              this.props.dispatch({
                  type:'user/findUserByPhone',
                  payload:{...params},
                  callback:(res)=>{
                      if(res.message==='SUCCESS'){
                          this.setState({
                              userInfo:res.data
                            
                          })
                          console.log(res.data)
                          Message.success('手机号验证通过，请重置密码');
                      }else{
                        Message.error('手机号未注册');
                      }
                  }
              })
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
            <div className={styles.find}> 密码找回</div>
        <Form className="account-form" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} >
        <FormItem  >
            {getFieldDecorator('id',{
                initialValue:this.state.userInfo.id,
               
                
                
            })( <Input 
                    onBlur={this.findUserByPhone.bind(this)} type='hidden'
           
            />)}
            
            </FormItem>
            <FormItem  label="手机号">
            {getFieldDecorator('phone',{
                initialValue:"",
                rules:[
                    {type: 'string'},
                {
                    required: true,
                    message: '手机号不能为空'
                },
                
                ]
            })( <Input 
                    onBlur={this.findUserByPhone.bind(this)} 
               
            placeholder="手机号"
            />)}
            
            </FormItem>
            <FormItem  label="新密码">
            {getFieldDecorator('password',{
                initialValue:'',
                rules: [
                // {
                //     required: true,
                //     message: '密码不能为空，请输入密码！'
                // },
                
                ]
            })( <Input.Password
                placeholder="新密码" type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />)}
            
            </FormItem>
            
            <FormItem >
            <Button  className="btn" type="primary" htmlType="submit">
                重置密码
            </Button>
            </FormItem>
           
            
            </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(ForgetPassword)