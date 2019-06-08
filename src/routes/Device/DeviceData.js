import React, { Component} from 'react';
import {  Card} from 'antd';
import { connect } from 'dva';


import Test from '../../components/charts/Bar.js'


@connect(({plat,global,instrument})=>(
    {plat,global,instrument}
  ))



 export default class DeviceList extends Component {

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
   
    
   
    const xdata1=['基因组平台','转基因平台','显微可视平台','分析测试平台','生物信息学平台','公共平台','蛋白质平台'];
    const data1=[5,9,8,4,6,7,3];
    return (
      <div>
        <Card title={<b>设备统计图表</b>}
        >
     
        <Test data={{
            xdata:xdata1,//横轴
            ydata: {
              ydata1:data1,
              
            }
          }}
          
          title={"各平台下设备数量统计"}
          legend={"设备数量"}
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