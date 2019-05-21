import React from 'react';
import { Card,Message} from 'antd';

import { connect } from 'dva/index';
import SupplierForm from './Form';
import {getPathParams} from '../../components/_utils/pathTools.js'
@connect(({ supplier }) => ({
  supplier,
  
}))
class UpdateSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSupplier: {},
    };
  }
  componentDidMount() {
    this.fetchOneRecord();
  }

  async fetchOneRecord() {
    //const { match: { params: { id } } } = this.props;
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/supplier/updateSupplier/:id',pathname);
    console.log(this.props);
    this.setState({id:routeparam[1]})
    const { dispatch } = this.props;

    await dispatch({
      type: 'supplier/fetchCurrentSupplier',
      payload: {
        id:routeparam[1]
      },
    });

    this.setState({
      currentSupplier: this.props.supplier.currentSupplier,
    });
  }

  submitForm = values => {
   
    this.props.dispatch({
      type: 'supplier/updateSupplier',
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
      const {currentSupplier}=this.props.supplier;
      //console.log(currentSupplier)
    return (
      <div>
        <Card title={<b>编辑维修商</b>}>
          < SupplierForm currentSupplier={currentSupplier!==undefined?currentSupplier:{}} submitForm={this.submitForm} />
        </Card>
      </div>
    );
  }
}

export default UpdateSupplier;
