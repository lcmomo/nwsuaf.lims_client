import React from 'react';
import { Form, Input, Button } from 'antd';
//import { connect } from 'dva/index';

const FormItem = Form.Item;


class ProducerForm extends React.Component {
    constructor(props) {
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
        const  producer  = this.props.currentProducer;
        console.log(this.props)
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                {/* <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        initialValue: Producer.id ,
                        rules: [

                        ],
                    })(<Input placeholder="" type="hidden" style={{ width: '70%' }} />)}
                </FormItem> */}
                <FormItem label="编号" {...formItemLayout}>
                    {getFieldDecorator('producerno', {
                        initialValue: producer.producerno !== undefined ? producer.producerno : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入生产商编号' },

                        ],
                    })(<Input placeholder="生产编号" style={{ width: '70%' }} />)}
                </FormItem>
                <FormItem label="名称" {...formItemLayout}>
                    {getFieldDecorator('proName', {
                        initialValue: producer.proName !== undefined ? producer.proName : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入名称' },

                        ],
                    })(<Input placeholder="生产商名称" style={{ width: '70%' }} />)}
                </FormItem>

                <FormItem label="联系方式" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue:producer.phone !== undefined ? producer.phone : '',
                    })(
                        <Input placeholder="联系方式" style={{ width: '70%' }} />
                    )}
                </FormItem>
                <FormItem label="地址" {...formItemLayout}>
                    {getFieldDecorator('address', {
                        initialValue: producer.address !== undefined ? producer.address : '',
                    })(
                        <Input placeholder="地址" style={{ width: '70%' }} />
                    )}
                </FormItem>
                <FormItem label="联系人" {...formItemLayout}>
                    {getFieldDecorator('linkman', {
                        initialValue: producer.linkman !== undefined ? producer.linkman : '',
                    })(
                        <Input placeholder="联系人" style={{ width: '70%' }} />
                    )}
                </FormItem>

                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('remark', {
                        initialValue: "",
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
export default Form.create()(ProducerForm);