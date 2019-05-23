import React from 'react';
import {Card ,Message} from 'antd';
import { connect } from 'dva/index';
import UserForm from './Form.js'

@connect(({user})=>({user}))
class CreateUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'user/createUser',
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
                <Card title={<b>添加用户</b>}>
                    <UserForm submitForm={this.submitForm}></UserForm>
                </Card>
            </div>
        )
    }
}
export default  CreateUser;