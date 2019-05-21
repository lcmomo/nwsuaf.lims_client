import React from 'react';
import { Card,Message} from 'antd';

import { connect } from 'dva/index';
import ProducerForm from './Form';
import {getPathParams} from '../../components/_utils/pathTools.js'
@connect(({ producer }) => ({
  producer,
  
}))
class UpdateProducer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProducer: {},
    };
  }
  componentDidMount() {
    this.fetchOneRecord();
  }

  async fetchOneRecord() {
    //const { match: { params: { id } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/producer/updateProducer/:id',pathname);
    console.log(this.props);
    this.setState({id:routeparam[1]})
    const { dispatch } = this.props;

    await dispatch({
      type: 'producer/fetchCurrentProducer',
      payload: {
        id:routeparam[1]
      },
    });

    this.setState({
      currentProducer: this.props.producer.currentProducer,
    });
  }

  submitForm = values => {
   
    this.props.dispatch({
      type: 'producer/updateProducer',
      payload: {
        
        ...values,
        id:Number(this.state.id)
      },
      callback: () => {
        Message.success("修改成功")
        this.props.history.push('../list');
      },
    });
  };

  render() {
      const {currentProducer}=this.props.producer;
      //console.log(currentProducer)
    return (
      <div>
        <Card title={<b>编辑维修商</b>}>
          < ProducerForm currentProducer={currentProducer!==undefined?currentProducer:{}} submitForm={this.submitForm} />
        </Card>
      </div>
    );
  }
}

export default UpdateProducer;
