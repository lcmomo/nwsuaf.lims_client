import React from 'react';
import { Card,Message} from 'antd';

import { connect } from 'dva/index';
import DeviceForm from './UpdateForm';
import {getPathParams} from '../../components/_utils/pathTools.js'
@connect(({ device }) => ({
  device,
  
}))
class UpdateDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDevice: {},
    };
  }
  componentDidMount() {
    this.fetchOneRecord();
  }

  async fetchOneRecord() {
    //const { match: { params: { id } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/device/updateDevice/:id',pathname);
    console.log(this.props);
    this.setState({id:routeparam[1]})
    const { dispatch } = this.props;

    await dispatch({
      type: 'device/fetchCurrentDevice',
      payload: {
        id:routeparam[1]
      },
    });

    this.setState({
      currentDevice: this.props.device.currentDevice,
    });
  }

  submitForm = values => {
   
    this.props.dispatch({
      type: 'device/updateDevice',
      payload: {
        
        ...values,
        id:Number(this.state.id),
        totalPrice:values.price*values.amount
      },
      callback: () => {
        Message.success("修改成功")
        this.props.history.push('../list');
      },
    });
  };

  render() {
      const {currentDevice}=this.props.device;
      //console.log(currentDevice)
    return (
      <div>
        <Card title={<b>编辑设备</b>}>
          < DeviceForm currentDevice={currentDevice!==undefined?currentDevice:{}} submitForm={this.submitForm} />
        </Card>
      </div>
    );
  }
}

export default UpdateDevice;
