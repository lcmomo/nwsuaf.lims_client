import React from 'react';
import { Form, Input, Button,Message} from 'antd';
import { connect } from 'dva/index';
import mock from 'mockjs'
//import CurrentUserForm from './currentUserForm.js'
import {encrypt} from '../../utils/aesutil.js'
const FormItem=Form.Item;
//const {TextArea}=Input;
@connect(({user})=>({user}))
class CreateUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:{}
        };
    }

    componentDidMount(){
        //const userInfo=JSON.parse(sessionStorage.getItem('user'));
       
       
    }

    

  
    findByName = e => {
       // const userInfo=JSON.parse(sessionStorage.getItem('user'));
        e.preventDefault();
        this.props.form.validateFields((errors, params) => {
          
          console.log("err")
          this.props.dispatch({
            type: 'user/findByUsername',
            payload: {
                ...params,
                
            },
            
            callback: (res) => {
               if(res.message!=='SUCCESS'){
                   Message.error('用户名已被注册');
               }
             
            },
          });
         
        });
       
      };

      handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, params) => {
          if (errors) {
            return;
          }
          this.props.submitForm({
            ...params,
            password: encrypt(params.password)
          });
        });
      }
    

      
    render(){
        //const userInfo=this.props.currentUser;
        //const currentUser=JSON.parse(sessionStorage.getItem('user'));
        const { form: { getFieldDecorator }} = this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          };
         //const currentUser=this.state.userInfo!==undefined?this.state.userInfo:{};
          //console.log(currentUser);
       
        return (
            <div>
               
      
     
            
                    <Form 
                    onSubmit={
                        this.handleSubmit.bind(this)
                        
                    } autoComplete="off" >
                   
                    <FormItem  {...formItemLayout}>
                    {getFieldDecorator('userno', {
                        
                        initialValue:'2'+ mock.Random.string("number",7),
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入用户编号' },
                        
                        ],
                    })(<Input type="hidden" placeholder="用户编号" style={{ width: '70%' }} />)}
                    </FormItem>
                    <FormItem label="用户名" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue:  '',
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入用户名' },
                        
                        ],
                    })(<Input placeholder="请输入用户姓名" style={{ width: '70%' }} onBlur={this.findByName.bind(this)} />)}
                    </FormItem>
                    
                    <FormItem label="电话" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue: '',
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入电话' },
                        
                        
                        ],
                    })(<Input placeholder="电话" style={{ width: '70%' }} />)}
                    </FormItem>

                {/* <FormItem label="邮箱" {...formItemLayout}>
                    {getFieldDecorator('email', {
                        initialValue: '',
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入邮箱' },
                        
                        
                        ],
                    })(<Input placeholder="邮箱" style={{ width: '70%' }} />)}
                </FormItem> */}
                <FormItem label="密码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue:'',
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入密码' },
                        
                        
                        ],
                    })(<Input.Password placeholder="密码" type="password" visibilityToggle="true" style={{ width: '70%' }} />)}
                </FormItem>
                
                    <FormItem {...formItemLayout} style={{ marginLeft: '29.2%' }}>
                    <Button type="primary" htmlType="submit" style={{ margin: 'auto' }}>
                       注册
                    </Button>
                    </FormItem>
                </Form>
                
                            {/* <CurrentUserForm  currentUser={userInfo!==undefined?userInfo:{}}submitForm={this.submitForm}></CurrentUserForm> */}
                        
                    </div>
                )
            }
        }
export default  Form.create()(CreateUser);