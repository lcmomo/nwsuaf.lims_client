import React from 'react';
import { Card,Message} from 'antd';

import { connect } from 'dva/index';
import InstrumentForm from './Form';
import {getPathParams} from '../../components/_utils/pathTools.js'
@connect(({instrument }) => ({
  instrument,
  
}))
class UpdateInstrument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstrument: {},
    };
  }
  componentDidMount() {
    this.fetchOneRecord();
  }

  async fetchOneRecord() {
    //const { match: { params: { id } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/instrument/updateInstrument/:id',pathname);
    console.log(this.props);
    this.setState({id:routeparam[1]})
    const { dispatch } = this.props;

    await dispatch({
      type: 'instrument/fetchCurrentInstrument',
      payload: {
        id:Number(routeparam[1])
      },
    });

    this.setState({
      currentInstrument: this.props.instrument.currentInstrument,
    });
  }

  submitForm = values => {
   
    this.props.dispatch({
      type: 'instrument/updateInstrument',
      payload: {
        
        ...values,
        id:Number(this.state.id),
       
      },
      callback: () => {
        Message.success("修改成功")
        this.props.history.push('../list');
      },
    });
  };

  render() {
      const {currentInstrument}=this.props.instrument;
      //console.log(currentInstrument)
    return (
      <div>
        <Card title={<b>编辑仪器</b>}>
          < InstrumentForm currentInstrument={currentInstrument!==undefined?currentInstrument:{}} submitForm={this.submitForm} />
        </Card>
      </div>
    );
  }
}

export default UpdateInstrument;
