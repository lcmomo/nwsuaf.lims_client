import React from 'react';
import { Card ,Message} from 'antd';
import { connect } from 'dva/index';
import ProducerForm from './Form.js'

@connect(({producer})=>({producer}))
class CreateProducer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'producer/createProducer',
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
                <Card title={<b>添加生产商信息</b>}>
                   <ProducerForm currentProducer={{}} submitForm={this.submitForm}></ProducerForm>
                </Card>
            </div>
        )
    }
}
export default  CreateProducer;