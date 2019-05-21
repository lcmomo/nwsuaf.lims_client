import React from 'react';
import { Card,Message} from 'antd';

import { connect } from 'dva/index';
import MaintainerForm from './Form';
import {getPathParams} from '../../components/_utils/pathTools.js'
@connect(({ maintainer }) => ({
  maintainer,
  
}))
class UpdateMaintainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMaintainer: {},
    };
  }
  componentDidMount() {
    this.fetchOneRecord();
  }

  async fetchOneRecord() {
    //const { match: { params: { id } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/maintainer/updateMaintainer/:id',pathname);
    console.log(this.props);
    this.setState({id:routeparam[1]})
    const { dispatch } = this.props;

    await dispatch({
      type: 'maintainer/fetchCurrentMaintainer',
      payload: {
        id:routeparam[1]
      },
    });

    this.setState({
      currentMaintainer: this.props.maintainer.currentMaintainer,
    });
  }

  submitForm = values => {
   
    this.props.dispatch({
      type: 'maintainer/updateMaintainer',
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
      const {currentMaintainer}=this.props.maintainer;
      //console.log(currentMaintainer)
    return (
      <div>
        <Card title={<b>编辑维修商</b>}>
          < MaintainerForm currentMaintainer={currentMaintainer!==undefined?currentMaintainer:{}} submitForm={this.submitForm} />
        </Card>
      </div>
    );
  }
}

export default UpdateMaintainer;
