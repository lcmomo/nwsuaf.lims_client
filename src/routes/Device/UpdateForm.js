import React from 'react';
import { Form, Input, Button,Select,InputNumber } from 'antd';
//import { connect } from 'dva/index';
import {DEVICE_CATEGORY} from '../../utils/constant.js'
const FormItem=Form.Item;

const {Option}=Select;
const categoryOptions=Object.entries(DEVICE_CATEGORY)

class DeviceForm extends React.Component{
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

          const {currentDevice}=this.props;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <FormItem label="设备编号" {...formItemLayout}>
              {getFieldDecorator('consumeno', {
                initialValue: currentDevice.consumeno!==undefined?currentDevice.consumeno:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入设备编号' },
                 
                ],
              })(<Input disabled placeholder="请输入设备编号" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="设备名称" {...formItemLayout}>
              {getFieldDecorator('consumeName', {
                initialValue: currentDevice.consumeName!==undefined?currentDevice.consumeName:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入设备名称' },
                  
                ],
              })(<Input disabled placeholder="请输入设备名称" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="规格型号">
              {getFieldDecorator('specs', {
                initialValue: currentDevice.specs!==undefined?currentDevice.specs:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入设备规格型号' },
                  
                ],
              })(
                <Input
                  placeholder="请输入设备规格型号"
                  style={{ width: '70%' }}
                  disabled
                />
              )}
            </FormItem>
            <FormItem label="生产商" {...formItemLayout}>
              {getFieldDecorator('producer', {
                initialValue: currentDevice.producer!==undefined?currentDevice.producer:'',
                rules: [
                  { type: 'string' },
                 
                  
                ],
              })(<Input disabled placeholder="请输入生产商信息" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="数量" {...formItemLayout}>
              {getFieldDecorator('amount', {
                initialValue: currentDevice.amount!==undefined?currentDevice.amount:'',
                rules: [
                  { type: 'number' },
                 
                  
                ],
              })(<InputNumber  placeholder="请选择数量" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="价格" {...formItemLayout}>
              {getFieldDecorator('price', {
                initialValue: currentDevice.price!==undefined?currentDevice.price:'',
                rules: [
                  { type: 'number' },
                
                ],
              })(<InputNumber placeholder="请输入输入价格"  min={0} max={30}style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="供应商" {...formItemLayout}>
              {getFieldDecorator('supplyer', {
                initialValue: currentDevice.supplyer!==undefined?currentDevice.supplyer:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入供应商' },
                  
                ],
              })(<Input placeholder="请输入供应商信息" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="类别" {...formItemLayout}>
          {getFieldDecorator('category', {
            initialValue: currentDevice.category!==undefined?currentDevice.category:'',
          })(
            <Select placeholder="请选择设备分类" allowClear style={{ width: 150 }}>
              { categoryOptions.map(([key, value]) => (
                <Option key={key} value={key}>
                  {value}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="平台名称" {...formItemLayout}>
              {getFieldDecorator('platname', {
                initialValue: currentDevice.platname!==undefined?currentDevice.platname:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入平台名称' },
                 
                ],
              })(<Input placeholder="请输入平台名称" style={{ width: '70%' }} />)}
            </FormItem>

        <FormItem label="备注" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: currentDevice.remark!==undefined?currentDevice.remark:'',
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
export default Form.create()(DeviceForm);