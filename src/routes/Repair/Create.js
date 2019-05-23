import React from 'react';
import {  Card ,Message} from 'antd';
import { connect } from 'dva/index';
import RepairForm from './Form.js'


@connect(({repair})=>({repair}))
class CreateRepair extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
       
        this.props.dispatch({
          type: 'repair/createRepair',
          payload: {
              ...values,
              repairTime:new Date().getTime(),
              
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
                <Card title={<b>新增维修记录</b>}>
                    <RepairForm submitForm={this.submitForm}></RepairForm>
                </Card>
            </div>
        )
    }
}
export default  CreateRepair;