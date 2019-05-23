import React from 'react';
import { Form, Input, Button,DatePicker,Message } from 'antd';
import mock from 'mockjs'
import { connect } from 'dva/index';
//import {Order_CATEGORY} from '../../utils/constant.js'
import {getPathParams} from '../../components/_utils/pathTools.js'

const FormItem=Form.Item;
const {RangePicker}=DatePicker;

//const categoryOptions=Object.entries(Order_CATEGORY)
@connect(({order})=>({order}))
class OrderForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
          userInfo:{},
          instrName:""
        };
    }

    componentDidMount(){
      const userInfo=JSON.parse(sessionStorage.getItem('user'));
      const {location:{pathname}}=this.props;
      const routeparam=getPathParams('/index/order/addOrder/:instrName',pathname);
      this.setState({userInfo:userInfo,instrName:routeparam[1]})
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, params) => {
          if (errors) {
            return;
          }
         
          this.props.dispatch({
            type:'order/fetchOrderListByTime',
            payload:{
            ...params,
            useStarttime:new Date(params.useTime[0].format('YYYY-MM-DD HH:mm:ss')).getTime(),
            useEndtime:new Date(params.useTime[1].format('YYYY-MM-DD HH:mm:ss')).getTime(),
            },
            callback:(res)=>{
              if(res.code===200){
                this.addOrder();
                console.log(this)
              }else{
                Message.error(res.message)
              }
            }
          });
        });
      }

      addOrder=()=>{
        this.props.form.validateFields((errors, params) => {
          if (errors) {
            return;
          }
          console.log('ad')
          this.props.dispatch({
            type:'order/createOrder',
            payload:{
            ...params,
            useStarttime:new Date(params.useTime[0].format('YYYY-MM-DD HH:mm:ss')).getTime(),
            useEndtime:new Date(params.useTime[1].format('YYYY-MM-DD HH:mm:ss')).getTime(),
            },
            callback:(res)=>{
              if(res.code===200){
                Message.success('提交成功,等待审核');
                this.props.history.push('../userlist');
              }else{
                Message.error(res.message)
              }
            }
          });
        });
      }
    

    render(){
        const { form: { getFieldDecorator } } = this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          };
          const rangeConfig = {
            rules: [{ type: 'array',}],
          };
          const {userInfo,instrName}=this.state;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <FormItem label="仪器名称" {...formItemLayout}>
              {getFieldDecorator('instrName', {
                initialValue: instrName!==""?instrName:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '不能为空' },
                 
                ],
              })(<Input placeholder="请输入仪器名称" style={{ width: '70%' }} />)}
            </FormItem>
            <FormItem label="用户" {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: userInfo.username!==undefined?userInfo.username:'',
                rules: [
                  { type: 'string' },
                  { required: true, message: '用户名不能为空' },
                  
                ],
              })(<Input placeholder="请输入消息标题" style={{ width: '70%' }} />)}
            </FormItem>
            <Form.Item label="使用时间" {...formItemLayout} >
                  {getFieldDecorator('useTime', rangeConfig)(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '70%' }}/>,
              )}
              </Form.Item>
              <FormItem label="备注" {...formItemLayout}>
                {getFieldDecorator('remark', {
                  initialValue: "",
                  rules: [
                    { type: 'string' },
                  
                  
                  ],
                })(<Input placeholder="预约备注" style={{ width: '70%' }} />)}
              </FormItem>
              
            <FormItem {...formItemLayout} >
              {getFieldDecorator('orderTime', {
                initialValue: new Date().getTime(),
              })(
                <Input type="hidden" style={{ width: '70%' }}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: "1",
              })(
                <Input type="hidden"style={{ width: '70%' }}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('orderno', {
                initialValue:'9'+ mock.Random.string("number",7),
              })(
                <Input type="hidden" style={{ width: '70%' }}/>
              )}
            </FormItem>



       
    
            <FormItem {...formItemLayout} style={{ marginLeft: '29.2%' }}>
              <Button type="primary" htmlType="submit" style={{ margin: 'auto' }}>
                提交
              </Button>
            </FormItem>
          </Form>
        )
    }
}
export default Form.create()(OrderForm);