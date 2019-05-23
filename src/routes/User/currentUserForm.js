import React from 'react';
import { Form, Input, Button} from 'antd';
import { connect } from 'dva/index';
//import {User_CATEGORY,ORDER_CATEGORY} from '../../utils/constant.js'



const FormItem=Form.Item;


@connect(({user})=>({user}))
class UserForm extends React.Component{
    constructor(props){
        super();
        this.state={};
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, params) => {
          if (errors) {
            return;
          }
          this.props.submitForm({
            ...params,
          });
        });
      }
    
   

    render(){
        const { form: { getFieldDecorator }, record } = this.props;
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
          const {currentUser}=this.props;
          console.log(currentUser);
        return (
            
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <FormItem  {...formItemLayout}>
              {getFieldDecorator('id', {
                initialValue: currentUser.id!==undefined?currentUser.id:1,
               
              })(<Input placeholder="用户编号" type="hidden" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="用户编号" {...formItemLayout}>
              {getFieldDecorator('userno', {
                initialValue: currentUser.userno!==undefined?currentUser.userno:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入用户编号' },
                 
                ],
              })(<Input placeholder="用户编号" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue:  currentUser.username!==undefined?currentUser.username:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入用户名' },
                  
                ],
              })(<Input placeholder="请输入用户姓名" style={{ width: '70%' }} />)}
            </FormItem>
              
            <FormItem label="电话" {...formItemLayout}>
              {getFieldDecorator('phone', {
                initialValue: currentUser.phone!==undefined?currentUser.phone:'',
                rules: [
                  { type: 'string' },
                 
                 
                ],
              })(<Input placeholder="电话" style={{ width: '70%' }} />)}
            </FormItem>

        <FormItem label="邮箱" {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: currentUser.email!==undefined?currentUser.email:'',
                rules: [
                  { type: 'string' },
                 
                 
                ],
              })(<Input placeholder="邮箱" style={{ width: '70%' }} />)}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: currentUser.password!==undefined?currentUser.password:'',
                rules: [
                  { type: 'string' },
                 
                 
                ],
              })(<Input placeholder="密码" style={{ width: '70%' }} />)}
        </FormItem>
        
            <FormItem {...formItemLayout} style={{ marginLeft: '29.2%' }}>
              <Button type="primary" htmlType="submit" style={{ margin: 'auto' }}>
                提交
              </Button>
            </FormItem>
          </Form>
        )
    }
}
export default Form.create()(UserForm);