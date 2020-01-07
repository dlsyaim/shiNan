<template>
    <div class="echartsList">
        <el-row>
            <el-col :span="24">
               
                    <Echarts :echartObj="echartObj1" echartWidth="100%" echartHeight="300px"></Echarts>
               
            </el-col>
           
        </el-row>
    </div>
</template>

<script>
import Echarts from '@/components/snxp-echarts'

export default {
  name: 'imWatch',
  components: {
    Echarts
  },
  data () {
    return {
     
      echartObj1: {

        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
           
        },
        calculable : true,
        legend: {
            data:['连续15超标','累计10天超标']
        },
        xAxis : [
            {
                type : 'category',
                data : ['线路运检一组','线路运检二组','配电运检一组','配电运维三组','线路运检一组'],
                //去掉刻度线
                axisTick: {
                show: false
                },
               
                //x轴颜色
                axisLine: {
              
                lineStyle: {
                    color: "#e4e4e4"
                }
                 },
                 axisLabel: {
                    textStyle : {
                　　color : 'grey',
                　　},
                 }
            }
        ],
        yAxis : [
            {
                type : 'value',
                // 取消显示坐标轴
                    axisLine: {
                    show: false,
                    
                    },
                     min:0,
                     max:5, 
                     splitArea : {
                         show : true,
                         areaStyle : {
                            color: ['transparent','transparent']
                                    }
                         },//保留网格区域
                   
                   //去掉刻度线
                    axisTick: {
                    show: false
                    },
                axisLabel : {
                    formatter: '{value}'
                }
            },
            
        ],
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
         borderColor: "#087890",
         fillerColor: "#3296FA",
     }, {
         "type": "inside",
         "show": true,
         "height": 10,
         "start": 1,
         "end": 35
     }],
        series : [

            {
                name:'连续15超标',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: 'orange'
                    }
                },
                data:[2.0, 4.9, 5.0, 3.2, 4.6]
            },
            {
                name:'累计10天超标',
                type:'bar',
                 itemStyle: {
                    normal: {
                        color: 'yellow'
                    }
                },
                data:[2.6, 3.9, 4.0, 6.4, 8.7]
            },
           
        ]
      },
     
     
    }
  },
  methods:{
   drawData(){

   }
  },
  mounted(){
      this.drawData();
  }
}
</script>

<style>
    .box-card {
        margin: 10px;
    }
</style>
