
<template>
  <div class="echarts">
    <div id="cxCharts" ref="cxCharts" :style="{height:height+'px',width:width}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons.js'

export default {
  name: 'quShi',
    props: {
        width: {
        type: String,
        default: "98%"
        },
        height: {
        type: String,
        default: "342"
        }
  },
  data () {
    return {


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
        let option = {

    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['负载率'],
        itemWidth:20,
        itemHeight:12,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top:'10%',
        containLabel: true
    },
    toolbox: {

    },
    xAxis: {
        name: '时刻',
        type: 'category',
        nameTextStyle:{fontSize:12},
        nameGap:7,
        boundaryGap: false,
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    yAxis: {
        name: '电流/MA',
        type: 'value'
    },
    series: [
        {
            name:'负载率',
            type:'line',
            stack: '总量',
            data:[20, 20, 40,30,54, 60,],
          //true 为平滑曲线，false为直线
            smooth:true,
          //折线图圆点大小
            symbolSize:10,
        },

    ]
        }


      cxCharts.setOption(option);
    },
  }
}
</script>

<style>

</style>
