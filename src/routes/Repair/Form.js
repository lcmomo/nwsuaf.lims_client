import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva/index';
//import {Repair_CATEGORY} from '../../utils/constant.js'
const FormItem=Form.Item;


//const categoryOptions=Object.entries(Repair_CATEGORY)
@connect(({Repair})=>({Repair}))
class RepairForm extends React.Component{
    constructor(props){
        super(props);
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
        const { form: { getFieldDecorator } } = this.props;
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
            <FormItem label="维修编号" {...formItemLayout}>
              {getFieldDecorator('repairno', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入维修编号' },
                 
                ],
              })(<Input placeholder="请输入维修编号" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="设备名称" {...formItemLayout}>
              {getFieldDecorator('instrName', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入设备名称' },
                  
                ],
              })(<Input placeholder="请输入设备名称" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="故障类别">
              {getFieldDecorator('hitchCate', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入故障类别' },
                  
                ],
              })(
                <Input
                  placeholder="请输入故障类别"
                  style={{ width: '70%' }}
                  
                />
              )}
            </FormItem>
            <FormItem label="平台名称" {...formItemLayout}>
              {getFieldDecorator('platname', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                 
                  
                ],
              })(<Input placeholder="请输入平台名称" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="维修商" {...formItemLayout}>
              {getFieldDecorator('maintainerName', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                 
                  
                ],
              })(<Input placeholder="维修商信息" style={{ width: '70%' }} />)}
            </FormItem>
           
            <FormItem label="操作人" {...formItemLayout}>
              {getFieldDecorator('operator', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                
                ],
              })(<Input placeholder="请输入操作人信息" style={{ width: '70%' }} />)}
            </FormItem>
         
        <FormItem label="备注" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: "",
                rules: [
                  { type: 'string' },
                 
                 
                ],
              })(<Input placeholder="备注" style={{ width: '70%' }} />)}
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
export default Form.create()(RepairForm);