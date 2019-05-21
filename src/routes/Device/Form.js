import React from 'react';
import { Form, Input, Button,Select } from 'antd';
import { connect } from 'dva/index';
import {NOTICE_CATEGORY} from '../../utils/constant.js'
const FormItem=Form.Item;
const {TextArea}=Input;
const {Option}=Select;
const categoryOptions=Object.entries(NOTICE_CATEGORY)
@connect(({notice})=>({notice}))
class NoticeForm extends React.Component{
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
            <FormItem label="消息编号" {...formItemLayout}>
              {getFieldDecorator('noticeno', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入消息编号' },
                 
                ],
              })(<Input placeholder="请输入消息编号" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="标题" {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入消息标题' },
                  {
                    max: 30,
                    message: '标题不能超过30个字符',
                  },
                ],
              })(<Input placeholder="请输入消息标题" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="消息内容">
              {getFieldDecorator('content', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入消息内容' },
                  {
                    max: 500,
                    message: '回复内容不能超过500个字符',
                  },
                ],
              })(
                <TextArea
                  placeholder="请输入消息内容"
                  style={{ width: '70%' }}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              )}
            </FormItem>
    
            <FormItem label="消息类别" {...formItemLayout}>
          {getFieldDecorator('category', {
            initialValue: "",
          })(
            <Select placeholder="请选择消息分类" allowClear style={{ width: 150 }}>
              { categoryOptions.map(([key, value]) => (
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
export default Form.create()(NoticeForm);