<template>

  <el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose" @close="kcDialog">
    <div class="treeListHeder">
      <div class="treeListTitle">{{title}}</div>
      <p class="deviceFloat">
        <span><b>{{timeYear}}</b>年<b>{{timeMonth}}</b>月</span>
      </p>
    </div>
    <div class="org-tree-container">
      <Echarts :echartObj="echartObj" echartWidth="100%" echartHeight="300px"></Echarts>
    </div>
  </el-dialog>



</template>
<script>
  import Echarts from '@/components/snxp-echarts'
  export default {
    components: {
      Echarts
    },
    props:{
      title:{
        type:String,
        default:'负损率'
      }
    },
    data() {
      return {
        dialogVisible: true,
        timeYear:'2019',
        timeMonth:'10',
        echartObj: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            top: '20%',
            left: '2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['负损率'],
            icon: "roundRect",
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            x: '15',
            y: '15',
          },
          xAxis: [{
            name: '周', // 给X轴加单位
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4'],
            axisLabel: {
              color: '#666',
            },
            axisLine: {
              lineStyle: {
                color: '#666',
              }
            },
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              color: '#666',
            },
            axisLine: {
              lineStyle: {
                color: '#666',
              }
            },
          }],
          series: [{
            name: '负损率',
            type: 'line',
            stack: '总量',
            data: [80, 100, 110, 90],
            symbolSize: 10, //折线点的大小
            areaStyle: {
              normal: {
                color: '#a1dbf5' //改变区域颜色
              }
            },
            itemStyle: {
              normal: {
                color: '#a1dbf5', //改变折线点的颜色
                lineStyle: {
                  color: '#fcc88c' //改变折线颜色
                }
              }
            },
          }]
        },

      }
    },
    methods: {
      handleClose(done) {
        this.dialogVisible = false
        this.$emit("on-close")
      },
      kcDialog() {

      }
    },
  }
</script>


<style scoped="scoped">
  .org-tree-container {
    background-color: #fff;
    border: 1px solid #aaaaaa;
    margin-top: 25px;
  }

  .treeListHeder {
    position: absolute;
    width: calc(100% - 70px);
    top: 20px;
    left: 20px;
    text-align: left;
    color: #555555
  }

  .treeListHeder .treeListTitle {
    font-size: 14px;
    font-weight: bold;
    position: relative;
  }

  .treeListHeder .treeListTitle:before {
    position: absolute;
    top: 2px;
    left: -8px;
    content: "";
    width: 3px;
    height: 15px;
    background-color: rgb(3, 132, 151);
  }

  .el-dialog__headerbtn /deep/ .el-dialog__close {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .treeListHeder .deviceFloat {
    text-align: right;
    font-size: 16px;
    font-weight: bold;
  }

  .treeListHeder .deviceFloat b {
    color: #0099ff;
    margin: 0 3px;
  }
</style>
