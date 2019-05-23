import React from 'react';
import { Form, Input, Button} from 'antd';
//import { connect } from 'dva/index';
//import moment from 'moment/moment'
//import {Repair_CATEGORY} from '../../utils/constant.js'
const FormItem=Form.Item;


//const categoryOptions=Object.entries(Repair_CATEGORY)

class RepairForm extends React.Component{
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
          console.log("err")
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

         const {currentRepair}=this.props;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <FormItem label="维修编号" {...formItemLayout}>
              {getFieldDecorator('repairno', {
                initialValue: currentRepair.repairno!==undefined?currentRepair.repairno:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入维修编号' },
                 
                ],
              })(<Input disabled placeholder="请输入维修编号" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="设备名称" {...formItemLayout}>
              {getFieldDecorator('instrName', {
                initialValue:  currentRepair.instrName!==undefined?currentRepair.instrName:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入设备名称' },
                  
                ],
              })(<Input disabled placeholder="请输入设备名称" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="故障类别">
              {getFieldDecorator('hitchCate', {
                initialValue:  currentRepair.hitchCate!==undefined?currentRepair.hitchCate:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '请输入故障类别' },
                  
                ],
              })(
                <Input
                disabled
                  placeholder="请输入故障类别"
                  style={{ width: '70%' }}
                  
                />
              )}
            </FormItem>
            <FormItem label="平台名称" {...formItemLayout}>
              {getFieldDecorator('platname', {
                initialValue:  currentRepair.platname!==undefined?currentRepair.platname:'',
                rules: [
                  { type: 'string' },
                 
                  
                ],
              })(<Input disabled placeholder="请输入平台名称" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="维修商" {...formItemLayout}>
              {getFieldDecorator('maintainerName', {
                initialValue:  currentRepair.maintainerName!==undefined?currentRepair.maintainerName:'',
                rules: [
                  { type: 'string' },
                 
                  
                ],
              })(<Input disabled placeholder="维修商信息" style={{ width: '70%' }} />)}
            </FormItem>
           
            <FormItem label="操作人" {...formItemLayout}>
              {getFieldDecorator('operator', {
                initialValue:  currentRepair.operator!==undefined?currentRepair.operator:'',
                rules: [
                  { type: 'string' },
                
                ],
              })(<Input disabled placeholder="请输入操作人信息" style={{ width: '70%' }} />)}
            </FormItem>
            {/* <FormItem label="维修时间" {...formItemLayout}>
              {getFieldDecorator('repairTime', {
                initialValue:  currentRepair.repairTime!==undefined?moment(currentRepair.repairTime).format("YYYY-MM-DD HH:mm"):'',
                rules: [
                  { type: 'string' },
                
                ],
              })(<Input disabled style={{width:'70%'}}/>
              )}
            </FormItem> */}
         
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