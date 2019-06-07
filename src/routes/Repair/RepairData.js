import React, { Component,Fragment} from 'react';
import { Button, Card, Table, Popconfirm} from 'antd';
import { connect } from 'dva';

import {getPathParams} from '../../components/_utils/pathTools.js'
import Test from '../../components/charts/Bar.js'


@connect(({plat,global,instrument})=>(
    {plat,global,instrument}
  ))



 export default class RepairList extends Component {

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

   
    const xdata1=['设备1','设备2','设备3','设备4','设备5'];
    const data1=[1,3,2,6,4];
    return (
      <div>
        <Card title={<b>统计图表</b>}
        >
     
        <Test data={{
            xdata:xdata1,//横轴
            ydata: {
              ydata1:data1,
              
            }
          }}
          
          title={"设备维修次数统计"}
          legend={"维修次数"}
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