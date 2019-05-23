import React from 'react';
import { Card ,Message} from 'antd';
import { connect } from 'dva/index';
import SupplierForm from './Form.js'

@connect(({supplier})=>({supplier}))
class CreateSupplier extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'supplier/createSupplier',
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
                <Card title={<b>添加供应商信息</b>}>
                   <SupplierForm currentSupplier={{}} submitForm={this.submitForm}></SupplierForm>
                </Card>
            </div>
        )
    }
}
export default  CreateSupplier;