import React from 'react';
import {  Card ,Message} from 'antd';
import { connect } from 'dva/index';
import DeviceForm from './Form.js'


@connect(({device})=>({device}))
class CreateDevice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'device/createDevice',
          payload: {
              ...values,
              totalPrice:values.price*values.amount
            },
          callback: () => {
              Message.success("添加成功")
            this.props.history.push('list');
          },
        });
      };
    render(){
        return (
            <div>
                <Card title={<b>新增设备</b>}>
                    <DeviceForm submitForm={this.submitForm}></DeviceForm>
                </Card>
            </div>
        )
    }
}
export default  CreateDevice;