
<template>
  <div class="echarts">
    <div
      :id="echartId ? echartId : randomId"
      :style="{
          width: ((echartWidthType === 'string') ? echartWidth : (echartWidth + echartWidthUnit)),
          height: ((echartHeightType === 'string') ? echartHeight : (echartHeight + echartHeightUnit))}"
    ></div>
  </div>
</template>

<script>
import Echarts from 'echarts'
import 'echarts/theme/macarons.js'

export default {
  name: 'slxp-echarts',
  data () {
    return {
      myChart: {},
      randomId: 'echart' + (new Date().getTime() + Math.random() * 100)
    }
  },
  props: {
    // 变更后刷新图标
    echartRefresh: {
      type: Boolean,
      default: true
    },
    //从新设置 图表大小
    resizeEcharts: {
      type: Boolean,
      default: true
    },
    // 主题
    theme: {
      type: String,
      default: 'macarons'
    },
    // domId
    echartId: {
      type: String
    },
    // echarts的option
    echartObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // echarts宽度值的类型，百分比或px，em等值用string，Number类型的值会拼接上单位后赋值
    echartWidthType: {
      type: String,
      default: 'string'
    },
    // echarts高度值的类型
    echartHeightType: {
      type: String,
      default: 'string'
    },
    // echarts宽度的单位
    echartWidthUnit: {
      type: String,
      default: 'px'
    },
    // echarts高度的单位
    echartHeightUnit: {
      type: String,
      default: 'px'
    },
    // echarts宽度
    echartWidth: {
      type: String || Number,
      default: '500px'
    },
    // echarts高度
    echartHeight: {
      type: String || Number,
      default: '500px'
    }
  },
  watch: {
    echartRefresh(newVal) {
      this.loadEchart();
      if(this.myChart && this.myChart.resize) this.myChart.resize()
    },
    echartObj: {
      handler(n, o) {
        this.loadEchart()
      },
      deep: true
    },
    resizeEcharts(newVal){
      let _this = this
      if(_this.myChart && _this.myChart.resize) _this.myChart.resize()
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.loadEchart()
      if(this.myChart && this.myChart.resize) this.myChart.resize()
//      let _this = this
//      window.onresize = function () {
//        if(_this.myChart && _this.myChart.resize) _this.myChart.resize()
//      }
    })
  },
  methods: {
    loadEchart () {
      let echartObject = document.getElementById(this.echartId ? this.echartId : this.randomId);
      if(echartObject){
        this.myChart = Echarts.init(echartObject, this.theme)
        if(this.myChart){
          this.myChart.setOption(this.echartObj)
          const _this = this
          this.myChart.on('click', function(params) {
            _this.$emit('echartsClick', params)
          })
        }
      }

    }
  }
}
</script>

<style>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
