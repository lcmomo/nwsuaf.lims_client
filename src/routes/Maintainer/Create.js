import React from 'react';
import { Form, Input, Button,Card ,Message} from 'antd';
import { connect } from 'dva/index';
import MaintainerForm from './Form.js'
const FormItem=Form.Item;
const {TextArea}=Input;
@connect(({maintainer})=>({maintainer}))
class CreateMaintainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'maintainer/createMaintainer',
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
                <Card title={<b>添加维修商信息</b>}>
                   <MaintainerForm currentMaintainer={{}} submitForm={this.submitForm}></MaintainerForm>
                </Card>
            </div>
        )
    }
}
export default  CreateMaintainer;