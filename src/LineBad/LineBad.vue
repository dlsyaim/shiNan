<template>
  <div class="lineBad">
    <div class="tabBox">
      <h4 class="title">
        <i class="el-icon-s-operation"></i>
        台区线损情况
        <span class="time"><el-date-picker v-model="fileYear" type="year" placeholder="选择年份" value-format="yyyy" @change="onChanges"></el-date-picker></span>
      </h4>
      <!-- <el-col :span="24"><Echarts :echartObj="echartObj1" @echartsClick="tablePowerView" echartWidth="100%" echartHeight="300px"></Echarts></el-col>
      <el-col :span="24"><Echarts :echartObj="echartObj2" @echartsClick="tablePowerView" echartWidth="100%" echartHeight="300px"></Echarts></el-col> -->
      <template v-for="index in 2">
        <el-col :span="24" :key="index">
          <Echarts :echartObj="index % 2 == 0 ? echartObj2 : echartObj1" @echartsClick="tablePowerView" echartWidth="100%" echartHeight="300px"></Echarts>
        </el-col>
      </template>
    </div>
    <LineDetali v-if="isShow" @on-close="onClose" :title="title"></LineDetali>
  </div>
</template>

<script>
import Echarts from '@/components/snxp-echarts';
import LineDetali from '@/LineBad/LineDetali';
export default {
  inject: ['setBreadcrumb'],
  components: {
    Echarts,
    LineDetali
  },
  data() {
    return {
      isShow: false,
      fileYear: '2019',
      title:'',
      echartObj1: {
        title: [
          {
            text: '台区线损率:',
            x: '20px',
            y: '0px',
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          },
          {
            text: '50%',
            x: '120px',
            y: '0px',
            textStyle: {
              color: '#11C2EE',
              fontSize: 16,
              fontweight: '800'
            }
          }
        ],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          top: '25%',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['负损率'],
          icon: 'roundRect',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          x: '30',
          y: '30'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
              color: '#666'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#666'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        series: [
          {
            name: '负损率',
            type: 'line',
            stack: '总量',
            data: [100, 120, 108, 134, 90, 230, 210, 150, 170, 120, 100, 90],
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
            }
          }
        ]
      },

      echartObj2: {
        title: [
          {
            text: '台区负损占比:',
            x: '20px',
            y: '0px',
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          },
          {
            text: '50%',
            x: '130px',
            y: '0px',
            textStyle: {
              color: '#fcc88c',
              fontSize: 16,
              fontweight: '800'
            }
          }
        ],
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
          top: '25%',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['负损占比'],
          icon: 'roundRect',
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          x: '30',
          y: '30'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
              color: '#666'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#666'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        series: [
          {
            name: '负损占比',
            type: 'line',
            stack: '总量',
            data: [110, 102, 150, 134, 90, 230, 210, 150, 170, 120, 100, 90],
            symbolSize: 10, //折线点的大小
            areaStyle: {
              normal: {
                color: '#fcc88c' //改变区域颜色
              }
            },
            itemStyle: {
              normal: {
                color: '#f5943f', //改变折线点的颜色
                lineStyle: {
                  color: '#fcc88c' //改变折线颜色
                }
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    onClose() {
      //弹窗隐藏
      this.isShow = false;
    },
    tablePowerView(echartParams) {
      //弹窗出现
      this.isShow = true;
      console.log('echartParams', echartParams);
      let EchartsName = echartParams.seriesName;
      if (EchartsName == '负损率') {
        this.title = '负损率';
      } else if (EchartsName == '负损占比') {
        this.title = '负损占比';
      }
    },
    onChanges() {
      console.log('fileYear', this.fileYear);
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 设置面包屑
      this.setBreadcrumb([
        {
          name: '供电服务保障',
          path: '/equip',
          icon: 'el-icon-s-home'
        },
        {
          name: '智能运维'
        },
        {
          name: '线损情况'
        }
      ]);
    });
  }
};
</script>

<style scoped="scoped">
.lineBad {
  padding: 0 15px 15px 15px;
}

.tabBox {
  width: 100%;
  height: 730px;
  border: 1px solid #999;
  border-top: none;
}

.tabBox .title {
  text-align: left;
  font-weight: bold;
  color: #ffffff;
  font-weight: normal;
  height: 35px;
  line-height: 35px;
  background: #27b7bb;
  border-left-color: #27b7bb;
  border-right-color: #27b7bb;
  font-size: 14px;
}

.tabBox .title i {
  margin: 0 5px;
  font-size: 17px;
  display: inline-block;
  vertical-align: middle;
}

.tabBox .time {
  float: right;
  padding-right: 10px;
}

.tabBox .el-col-24:last-child {
  margin-top: 50px;
}

.tabBox .time .el-date-editor.el-input {
  width: 120px;
}

/deep/ .tabBox .time .el-input__inner {
  height: 25px;
  line-height: 25px;
}

/deep/ .tabBox .time .el-input__inner::-webkit-input-placeholder {
  color: #000;
  font-size: 13px;
}

/deep/ .tabBox .time .el-input__icon {
  line-height: 32px;
}
</style>
