import React from 'react';
import { Form, Input, Button} from 'antd';
//import { connect } from 'dva/index';

const FormItem = Form.Item;


class SupplierForm extends React.Component {
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
        const  supplier  = this.props.currentSupplier;
        console.log(this.props)
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                {/* <FormItem label="" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        initialValue: Supplier.id ,
                        rules: [

                        ],
                    })(<Input placeholder="" type="hidden" style={{ width: '70%' }} />)}
                </FormItem> */}
                <FormItem label="编号" {...formItemLayout}>
                    {getFieldDecorator('supplierno', {
                        initialValue: supplier.supplierno !== undefined ? supplier.supplierno : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入供应商编号' },

                        ],
                    })(<Input placeholder="供应商编号" style={{ width: '70%' }} />)}
                </FormItem>
                <FormItem label="名称" {...formItemLayout}>
                    {getFieldDecorator('suppName', {
                        initialValue: supplier.suppName !== undefined ? supplier.suppName : '',
                        rules: [
                            { type: 'string' },
                            { required: true, message: '请输入名称' },

                        ],
                    })(<Input placeholder="供应商名称" style={{ width: '70%' }} />)}
                </FormItem>

                <FormItem label="联系方式" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue:supplier.phone !== undefined ? supplier.phone : '',
                    })(
                        <Input placeholder="联系方式" style={{ width: '70%' }} />
                    )}
                </FormItem>
                <FormItem label="地址" {...formItemLayout}>
                    {getFieldDecorator('address', {
                        initialValue: supplier.address !== undefined ? supplier.address : '',
                    })(
                        <Input placeholder="地址" style={{ width: '70%' }} />
                    )}
                </FormItem>
                <FormItem label="联系人" {...formItemLayout}>
                    {getFieldDecorator('linkman', {
                        initialValue: supplier.linkman !== undefined ? supplier.linkman : '',
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
export default Form.create()(SupplierForm);