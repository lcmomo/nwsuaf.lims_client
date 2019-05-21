import React from 'react';
import { Form, Input, Button,Select } from 'antd';
import { connect } from 'dva/index';
import {User_CATEGORY,ORDER_CATEGORY} from '../../utils/constant.js'



const FormItem=Form.Item;
const {TextArea}=Input;
const {Option}=Select;
const categoryOptions=Object.entries(User_CATEGORY);
const orderOptions=Object.entries(ORDER_CATEGORY);

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
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <FormItem label="用户编号" {...formItemLayout}>
              {getFieldDecorator('userno', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入用户编号' },
                 
                ],
              })(<Input placeholder="用户编号" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入用户名' },
                  
                ],
              })(<Input placeholder="请输入用户姓名" style={{ width: '70%' }} />)}
            </FormItem>
          
        <FormItem label="身份" {...formItemLayout}>
          {getFieldDecorator('role', {
            initialValue: "",
          })(
            <Select placeholder="用户身份" allowClear style={{ width: 150 }}>
              { categoryOptions.map(([key, value]) => (
                <Option key={key} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="预约权限" {...formItemLayout}>
          {getFieldDecorator('isAudited', {
            initialValue: "",
          })(
            <Select placeholder="预约权限" allowClear style={{ width: 150 }}>
              { orderOptions.map(([key, value]) => (
                <Option key={key} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          )}
        </FormItem> 

        <FormItem label="备注" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                 
                 
                ],
              })(<Input placeholder="消息备注" style={{ width: '70%' }} />)}
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