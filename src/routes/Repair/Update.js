import React from 'react';
import { Card,Message} from 'antd';

import { connect } from 'dva/index';
import RepairUpdateForm from './UpdateForm';
import {getPathParams} from '../../components/_utils/pathTools.js'
@connect(({repair }) => ({
  repair,
  
}))
class UpdateRepair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRepair: {},
    };
  }
  componentDidMount() {
    this.fetchOneRecord();
  }

  async fetchOneRecord() {
    //const { match: { params: { id } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/repair/updateRepair/:id',pathname);
    console.log(this.props);
    this.setState({id:routeparam[1]})
    const { dispatch } = this.props;

    await dispatch({
      type: 'repair/fetchCurrentRepair',
      payload: {
        id:routeparam[1]
      },
    });

    this.setState({
      currentRepair: this.props.repair.currentRepair,
    });
  }

  submitForm = values => {
      console.log(values)
   
    this.props.dispatch({
      type: 'repair/updateRepair',
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
      const {currentRepair}=this.props.repair;
      //console.log(currentRepair)
    return (
      <div>
        <Card title={<b>编辑维修信息</b>}>
          < RepairUpdateForm currentRepair={currentRepair!==undefined?currentRepair:{}} submitForm={this.submitForm} />
        </Card>
      </div>
    );
  }
}

export default UpdateRepair;
