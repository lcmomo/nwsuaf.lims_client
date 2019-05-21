import React from 'react';
import { Form, Input, Button,Card ,Message} from 'antd';
import { connect } from 'dva/index';
import CurrentUserForm from './currentUserForm.js'
const FormItem=Form.Item;
const {TextArea}=Input;
@connect(({user})=>({user}))
class CreateUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:{}
        };
    }

    componentDidMount(){
        const userInfo=JSON.parse(sessionStorage.getItem('user'));
       
       this.getcurrentUser(userInfo);
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState.userInfo!==this.state.userInfo);
        return true;
    }

   async getcurrentUser(userInfo){
   
    let res={};
    await  this.props.dispatch({
        type:'user/fetchCurrentUser',
        payload:{ id:userInfo.id},
        callback: result => {
            res = result;
          },
    })
 

    this.setState({userInfo:res.data})
    return res;

    }
    submitForm = e => {
       // const userInfo=JSON.parse(sessionStorage.getItem('user'));
        e.preventDefault();
        this.props.form.validateFields((errors, params) => {
          if (errors) {
              
            return;
          }
          console.log("err")
          this.props.dispatch({
            type: 'user/updateUser',
            payload: params,
            
            callback: () => {
                Message.success("修改成功")
             
            },
          });
         
        });
       
      setTimeout(()=>( this.props.history.push('detail')),5000)
       
      };
    render(){
        //const userInfo=this.props.currentUser;
        //const currentUser=JSON.parse(sessionStorage.getItem('user'));
        const { form: { getFieldDecorator }, record } = this.props;
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
          const currentUser=this.state.userInfo!==undefined?this.state.userInfo:{};
          //console.log(currentUser);
       
        return (
            <div>
                <Card title={<b>我的信息</b>}>
      
     
            
                    <Form 
                    onSubmit={
                        this.submitForm
                        
                    } autoComplete="off">
                    <FormItem  {...formItemLayout}>
                    {getFieldDecorator('id', {
                        initialValue: currentUser.id!==undefined?currentUser.id:1,
                    
                    })(<Input placeholder="用户编号" type="hidden" style={{ width: '70%' }} />)}
                    </FormItem>
                    <FormItem label="用户编号" {...formItemLayout}>
                    {getFieldDecorator('userno', {
                        //initialValue: currentUser.userno!==undefined?currentUser.userno:'',
                        initialValue:currentUser.userno,
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入用户编号' },
                        
                        ],
                    })(<Input placeholder="用户编号" style={{ width: '70%' }} />)}
                    </FormItem>
                    <FormItem label="用户名" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue:  currentUser.username!==undefined?currentUser.username:'',
                        rules: [
                        { type: 'string' },
                        { required: true, message: '请输入用户名' },
                        
                        ],
                    })(<Input placeholder="请输入用户姓名" style={{ width: '70%' }} />)}
                    </FormItem>
                    
                    <FormItem label="电话" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue: currentUser.phone!==undefined?currentUser.phone:'',
                        rules: [
                        { type: 'string' },
                        
                        
                        ],
                    })(<Input placeholder="电话" style={{ width: '70%' }} />)}
                    </FormItem>

                <FormItem label="邮箱" {...formItemLayout}>
                    {getFieldDecorator('email', {
                        initialValue: currentUser.email!==undefined?currentUser.email:'',
                        rules: [
                        { type: 'string' },
                        
                        
                        ],
                    })(<Input placeholder="邮箱" style={{ width: '70%' }} />)}
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue: currentUser.password!==undefined?currentUser.password:'',
                        rules: [
                        { type: 'string' },
                        
                        
                        ],
                    })(<Input placeholder="密码" type="password"style={{ width: '70%' }} />)}
                </FormItem>
                
                    <FormItem {...formItemLayout} style={{ marginLeft: '29.2%' }}>
                    <Button type="primary" htmlType="submit" style={{ margin: 'auto' }}>
                        提交
                    </Button>
                    </FormItem>
                </Form>
                )
                            {/* <CurrentUserForm  currentUser={userInfo!==undefined?userInfo:{}}submitForm={this.submitForm}></CurrentUserForm> */}
                        </Card>
                    </div>
                )
            }
        }
export default  Form.create()(CreateUser);