import React from 'react';
import { Card ,Message} from 'antd';
import { connect } from 'dva/index';
import InstrumentForm from './Form.js'

@connect(({instrument})=>({instrument}))
class CreateInstrument extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'instrument/createInstrument',
          payload: values,
          callback: () => {
              Message.success("添加成功")
            this.props.history.push('list');
          },
        });
      };
    render(){
        return (
            <div>
                <Card title={<b>添加仪器信息</b>}>
                   <InstrumentForm currentInstrument={{}} submitForm={this.submitForm}></InstrumentForm>
                </Card>
            </div>
        )
    }
}
export default  CreateInstrument;