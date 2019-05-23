import React, { Component,Fragment} from 'react';
import { Button, Card, Table, Popconfirm} from 'antd';
import { connect } from 'dva';

import {getPathParams} from '../../components/_utils/pathTools.js'
import Test from '../../components/charts/Bar'


@connect(({plat,global,instrument})=>(
    {plat,global,instrument}
  ))



 export default class List extends Component {

  constructor(){
    super();
    this.state={
     currentInstrument:{
       useamount:[]
     }
    };
  }
  componentDidMount(){
      this.getCurrentInstrument();
   
  }
  shouldComponentUpdate(){
    return true;
  }
  async getCurrentInstrument(){
    
    const {location:{pathname}}=this.props;
    const routeparam=getPathParams('/index/plat/usechart/:id',pathname);
    console.log(routeparam)
    let res = {};
    await this.props.dispatch({
      type: 'instrument/fetchCurrentInstrument',
      payload: {id:Number(routeparam[1])},
      callback: result => {
        res = result;
        this.setState({
           currentInstrument:result.data,
        });
       // console.log(this.state.currentInstrument)
      },
    });
  //console.log(res);
    return res;
  }
  
  drawChart=()=>{
    const {currentInstrument}=this.props;
    const data1=new Array(7);
    for(let i=0;i<7;i++){
      data1.push(parseInt(6*Math.random()))
    }
    return (<Test data={{
      xdata: ['周日','周一','周二','周三','周四','周五','周六'],
      ydata: {
        ydata1:[],
        ydata2:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
      }
    }}/>)
  }
  

  render() {
    //console.log(this.props.instrument.currentInstrument.useamount)
    // const {instrument:{currentInstrument}}=this.props;
    // //const amount=currentInstrument.useamount;
    // console.log(instrument)
    const {currentInstrument}=this.props.instrument;
    console.log(currentInstrument);
    const data1=[];
    for(let i=0;i<7;i++){
      data1.push(parseInt(6*Math.random()))
    }
    console.log(data1)
    return (
      <div>
        <Card title={<b>使用图表</b>}
        >
     
        <Test data={{
            xdata: ['周日','周一','周二','周三','周四','周五','周六'],
            ydata: {
              ydata1:data1,
              ydata2:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
            }
          }}/>)
       
        
        </Card>
      </div>
    )
  }
}

// function IndexPage() {
//     return (
//       <div >
//          <Test data={{
//           xdata: ['周日','周一','周二','周三','周四','周五','周六'],
//           ydata: {
//             ydata1:[2, 3, 5,3,1,4,2],
//             ydata2:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
//           }
//         }}/>
//       </div>
//     );
//   }
  
//   IndexPage.propTypes = {
//   };
  
//   export default connect()(IndexPage);