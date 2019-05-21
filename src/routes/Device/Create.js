import React from 'react';
import { Form, Input, Button,Card ,Message} from 'antd';
import { connect } from 'dva/index';
import NoticeForm from './Form.js'
const FormItem=Form.Item;
const {TextArea}=Input;
@connect(({notice})=>({notice}))
class CreateNotice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{}
        };
    }

    submitForm = values => {
        this.props.dispatch({
          type: 'notice/createNotice',
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
                <Card title={<b>新增消息</b>}>
                    <NoticeForm submitForm={this.submitForm}></NoticeForm>
                </Card>
            </div>
        )
    }
}
export default  CreateNotice;