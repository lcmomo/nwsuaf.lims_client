import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';


class Test extends React.Component {
  componentDidMount() {
    // 初始化
    var myChart = echarts.init(document.getElementById('main'));
   
    // 绘制图表
    myChart.setOption({
        title: { text: '指定实验仪器过去一周使用情况' },
        tooltip : {
          trigger: 'axis'
      },
      legend: {
          //data:['预约数']
      },
      toolbox: {
          show : true,
          feature : {
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {
                show: true,
                type: 'jpg'
              }
          }
      },
        xAxis : [
          {
              type : 'category',
              data : this.props.data.xdata
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
        series : [
          {
              name:'预约数',
              type:'bar',
              data: this.props.data.ydata.ydata1,
              markPoint : {
                  data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                  ]
              },
              markLine : {
                  data : [
                      {type : 'average', name: '平均值'}
                  ]
              },
              barMaxWidth:40,
              barCategoryGap:'50%'
          },
        //   {
        //       name:'降水量',
        //       type:'bar',
        //       data: this.props.data.ydata.ydata2,
        //       markPoint : {
        //           data : [
        //             {type : 'max', name: '最大值'},
        //             {type : 'min', name: '最小值'}
        //           ]
        //       },
        //       markLine : {
        //           data : [
        //               {type : 'average', name : '平均值'}
        //           ]
        //       }
        //   },
      ]
    });
}
render() {
    return (
        <div id="main" style={{ width: '100%', height: 500 }}></div>
    );
}
}

export default Test;