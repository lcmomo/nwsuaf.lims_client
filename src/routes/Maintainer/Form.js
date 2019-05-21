import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { connect } from 'dva/index';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;


class MaintainerForm extends React.Component {
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
        const  maintainer  = this.props.currentMaintainer;
        console.log(this.props)
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                {/* <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        initialValue: maintainer.id ,
                        rules: [

                        ],
                    })(<Input placeholder="" type="hidden" style={{ width: '70%' }} />)}
                </FormItem> */}
                <FormItem label="编号" {...formItemLayout}>
                    {getFieldDecorator('maintainerno', {
                        initialValue: maintainer.maintainerno !== undefined ? maintainer.maintainerno : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入维修商编号' },

                        ],
                    })(<Input placeholder="维修商编号" style={{ width: '70%' }} />)}
                </FormItem>
                <FormItem label="名称" {...formItemLayout}>
                    {getFieldDecorator('maintainerName', {
                        initialValue: maintainer.maintainerName !== undefined ? maintainer.maintainerName : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入名称' },

                        ],
                    })(<Input placeholder="维修商名称" style={{ width: '70%' }} />)}
                </FormItem>

                <FormItem label="联系方式" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue: maintainer.phone !== undefined ? maintainer.phone : '',
                    })(
                        <Input placeholder="联系方式" style={{ width: '70%' }} />
                    )}
                </FormItem>
                <FormItem label="地址" {...formItemLayout}>
                    {getFieldDecorator('address', {
                        initialValue: maintainer.address !== undefined ? maintainer.address : '',
                    })(
                        <Input placeholder="地址" style={{ width: '70%' }} />
                    )}
                </FormItem>
                <FormItem label="联系人" {...formItemLayout}>
                    {getFieldDecorator('linkman', {
                        initialValue: maintainer.linkman !== undefined ? maintainer.linkman : '',
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
export default Form.create()(MaintainerForm);