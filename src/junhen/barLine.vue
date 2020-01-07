<template>
<div class="chart" :style="{height:height+'px',width:width}">
</div>
</template>
<script>
import echarts from "echarts";
import 'echarts/theme/macarons.js'
export default {
  props: {
    chartData: {
      type: Object
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "302"
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    let _this = this;
    _this.init();
    window.addEventListener("resize", function() {
      _this.myChart.resize();
    });
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    init() {
      this.drawLine();
    },
    drawLine() {
      let self = this;
      self.myChart = echarts.init(this.$el);
      self.myChart.clear();
      let data = self.chartData;
      let series = [];
      let legData = [];
      data.barData.forEach(item => {
        series.push({
          name: item.name,
          type: "bar",
          data: item.data,
          barWidth:'10%'
        });
        legData.push({
          name: item.name,
          icon: "rect"
        });
      });
      data.lineData.forEach(item => {
        series.push({
          name: item.name,
          type: "line",
          yAxisIndex: 1, // yAxisIndex 1 表示第二个y轴，默认为0
          data: item.data,
          smooth: item.smooth,
          symbol: item.symbol || "circle", //标记的图形为实心圆
          symbolSize:9,//折线图圆点大小
        });
        legData.push({
          name: item.name
        });
      });
      // 绘制图表
      self.myChart.setOption({
        tooltip: {
          // 提示框组件
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: legData,
          top: "25",
          itemWidth: 20,
          itemHeight: 10,
         
          textStyle: {
            fontSize: 11
          }
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "30",
          top: '56',
          // bottom:"30",
          containLabel: true,
          show: false // 网格边框是否显示，上和右边框
        },
        toolbox: {
          feature: {
            dataView: {
              show: false,
              readOnly: false
            } // 数据试图是否在控件中显示
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: true, // 坐标轴两边留白
          splitLine: {
            // 网格线 x轴对应的是否显示
            show: false
          },
          axisTick: {
              show: false
            },
            axisLine: {
              
              lineStyle: {
                color: "#e4e4e4"
              }
            },
          data: data.xData,
          axisLabel: {
            interval: 0,
            textStyle : {
        　　color : 'grey',
        　　},
            rotate: data.xRotate || 0,
            // formatter: function(value) {
            //   //x轴的文字改为竖版显示
            //   var str = value.split("");
            //   return data.xRotate ? value : str.join("\n");
            // }
          }
        },

        yAxis: [
          // 双y坐标轴
          {
            // name: data.yName ? data.yName[0] : "(亩)",
            type: "value",

            splitLine: {
              // 网格线 y轴对应的是否显示
              show: true
            },
            min:0,
            max: 100,  
            axisTick: {
              show: false
            },
             axisLine: {
              show: false,
              lineStyle: {
                color: "#2f4554"
              }
            },
            // 取消显示坐标值
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            // name: data.yName ? data.yName[1] : "%",
            splitLine: {
              // 网格线 y轴对应的是否显示
              show: false
            },
            min:0,
            max: 5,  
            type: "value",
            inverse: false,
            // 取消显示坐标轴
            axisLine: {
              show: false,
              lineStyle: {
                color: "#2f4554"
              }
            },
            
            //去掉刻度线
            axisTick: {
              show: false
            }
          }
        ],
        series: series,
         "dataZoom": [{
         "show": true,
         "height": 12,
         "xAxisIndex": [
             0
         ],
         top:'95%',
         "start": 0,
         "end": 90,
         handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
         handleSize: '110%',
         handleStyle: {
             color: "rgba(255,255,255,0)",

         },
         textStyle: {
             color: "grey"
         },
         borderColor: "#3296FA",
         fillerColor: "#3296FA",
     }, {
         "type": "inside",
         "show": true,
         "height": 10,
         "start": 1,
         "end": 35
     }],
        color: data.color || ["#3296FA", "#FF5D5D", "#F3C023"],
        
      });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>



