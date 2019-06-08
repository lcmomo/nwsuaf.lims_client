import React, { Component} from 'react';
import {  Card} from 'antd';
import { connect } from 'dva';


import Test from '../../components/charts/Bar.js'


@connect(({plat,global,instrument})=>(
    {plat,global,instrument}
  ))



 export default class InstrumentList extends Component {

  constructor(){
    super();
    this.state={
     currentInstrument:{
       useamount:[]
     }
    };
  }
  componentDidMount(){
      
   
  }
  shouldComponentUpdate(){
    return true;
  }
  

  render() {
   
    
    // const data1=[];
    // for(let i=0;i<5;i++){
    //   data1.push(parseInt(6*Math.random()))
    // }

   
    const xdata1=['耗材类','试剂类','维修保养类','小型配件类'];
    const data1=[12,25,7,32];
    return (
      <div>
        <Card title={<b>仪器分种类统计图表</b>}
        >
     
        <Test data={{
            xdata:xdata1,//横轴
            ydata: {
              ydata1:data1,
              
            }
          }}
          
          title={"各类仪器数量统计"}
          legend={"仪器数量"}
          />
       
        
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