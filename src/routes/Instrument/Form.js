import React from 'react';
import { Form, Input, Button } from 'antd';
//import { connect } from 'dva/index';

const FormItem = Form.Item;



class InstrumentForm extends React.Component {
    constructor() {
        super();
        this.state = {};
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


    render() {
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
        const  instrument  = this.props.currentInstrument;
        console.log(this.props)
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                {/* <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        initialValue: Instrument.id ,
                        rules: [

                        ],
                    })(<Input placeholder="" type="hidden" style={{ width: '70%' }} />)}
                </FormItem> */}
                <FormItem label="编号" {...formItemLayout}>
                    {getFieldDecorator('instrumentno', {
                        initialValue: instrument.instrumentno !== undefined ? instrument.instrumentno : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入仪器编号' },

                        ],
                    })(<Input placeholder="仪器编号" style={{ width: '70%' }} />)}
                </FormItem>
                <FormItem label="名称" {...formItemLayout}>
                    {getFieldDecorator('instruName', {
                        initialValue: instrument.instruName !== undefined ? instrument.instruName : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入名称' },

                        ],
                    })(<Input placeholder="仪器名称" style={{ width: '70%' }} />)}
                </FormItem>

                <FormItem label="平台名称" {...formItemLayout}>
                    {getFieldDecorator('platname', {
                        initialValue:instrument.platname !== undefined ? instrument.platname : '',
                    })(
                        <Input placeholder="平台名称" style={{ width: '70%' }} />
                    )}
                </FormItem>
               
                
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('remark', {
                        initialValue: instrument.remark!==undefined?instrument.remark:'',
                        rules: [
                            { type: 'string' },


                        ],
                    })(<Input placeholder="备注信息" style={{ width: '70%' }} />)}
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
export default Form.create()(InstrumentForm);