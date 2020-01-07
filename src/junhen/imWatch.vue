
<template>
  <div class="echarts">
    <div id="cxCharts" ref="cxCharts" :style="{height:height+'px',width:width}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons.js'

export default {
  name: 'slxp-imWatch',
    props: {
        totleData: {
        type: Object
        },

        firstName:{
         type: String,
         default: "连续15超标"
        },
         secondName:{
         type: String,
         default: "累计10天超标"
        },
        firstData:{
         type: Array,

        },
         secondData:{
         type: Array,

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
  data () {
    return {
        isShow:false,
        series:[
         {
                name:this.firstName,
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {

                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'orange'
                        }, ]),
                        barBorderRadius:0,
                    },
                },
                data:this.firstData
        },
        {
          name:this.secondName,
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'yellow'
                }, ]),
                barBorderRadius:0,
            }

          },
          data: this.secondData
        },
        ]

    }
  },

  created () {

  },
  mounted () {
    this.drawLine2();
  },
  methods: {
       drawLine2() {


        let cxCharts = echarts.init(this.$refs.cxCharts);
        let ser=[];
        this.series.forEach(item => {
            console.log(item)
            ser.push({
            name: item.name,
            type: "bar",
            data: item.data,
            itemStyle:item.itemStyle,
            barWidth:'15%'
            });

        });
        let option = {
                    //  backgroundColor:'#323a5e',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top:'16%',
          containLabel: true
        },
         legend: {
         data:['连续15超标','累计10天'],
         data:this.titleData,
        // right: 10,
        top:12,
        textStyle: {
            color: "black"
        },
        itemWidth: 20,
        itemHeight: 10,
        // itemGap: 35
    },
        xAxis: {
          type: 'category',
          data : ['线路运检一组','线路运检二组','配电运检一组','配电运维三组','线路运检一组'],
          axisLine: {

            lineStyle: {
              color: '#e4e4e4'

            },
            //去掉刻度线
                    axisTick: {
                    show: false
                    },
          },
          axisLabel: {
                interval: 0,
                rotate: 45,
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              color:"grey"

            }
          },
        },

        yAxis: {
          type: 'value',
          max:'5',
          axisLine: {
            show: false,
            lineStyle: {
              color: 'grey'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e4e4e4'
            }
          },
          //去掉刻度线
                    axisTick: {
                    show: false
                    },
          axisLabel: {}
        },
        "dataZoom": [{
          "show": true,
          "height": 12,
          "xAxisIndex": [
            0
          ],
          bottom:'4%',
          "start": 10,
          "end": 90,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle:{
            color:"#d3dee5",

          },
          textStyle:{
            color:"#fff"},
            borderColor:"#3296FA",
            fillerColor: "#3296FA",
        }, {
          "type": "inside",
          "show": true,
          "height": 15,
          "start": 1,
          "end": 35
        }],
        series:ser,
            };
         cxCharts.on('click',(params) => {
                //  this.$emit('changeMt',true);
                 this.$router.push({
                    path:'/jhDetail',
                    // query:{
                    // id:this.id ,
                    // }
                })

            });


      cxCharts.setOption(option);
    },
  }
}
</script>

<style>

</style>
