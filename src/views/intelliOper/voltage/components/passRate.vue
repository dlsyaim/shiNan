<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>电压合格率</span>
      </div>
      <div class="chart_time aloneType">
        <el-date-picker
          v-model="currentDate"
          class="month-picker"
          size="small"
          :editable="false"
          :clearable="false"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @change="datePickerHandleChange">
        </el-date-picker>
      </div>
    </div>
    <div class="chart_bottom">
      <div class="fourCircleItem">
          <PieCharts
              :id="'pass_rate_one'"
              :style="{width: '100%', height: '100%'}"
              :option="defectOption1"
          ></PieCharts>
      </div>
      <div class="fourCircleItem">
        <PieCharts
              :id="'pass_rate_two'"
              :style="{width: '100%', height: '100%'}"
              :option="defectOption2"
          ></PieCharts>
      </div>
      <div class="fourCircleItem">
        <PieCharts
            :id="'pass_rate_three'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOption3"
        ></PieCharts>
    </div>
    <div class="fourCircleItem">
      <PieCharts
            :id="'pass_rate_four'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOption4"
        ></PieCharts>
    </div>
    </div>
  </div>
</template>

<script>
import { getVoltageModuleData } from '@/api/api'
import PieCharts from "../../components/pieCharts";

export default {
  components: {
    PieCharts: PieCharts
  },
  data(){
    return {
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      currentDate: '',  // 当前时间
      defectOption1: {
        series: [
          {
            labelLine: {
              normal: {
                show: false
              }
            },
            name: "圆环",
            type: "pie",
            clickable:false,
            clockWise: false,
            radius: [50, 60],
            // itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: 100,
                type: 'A类',
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#333333",
                        align: "center",
                        fontSize: 20, 
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#666666",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{a|" + params.percent + "%}" + "\n\n{b|"+params.data.type+"}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#27B7BB",
                    shadowColor: "#EBEBEB",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 0,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#EBEBEB"
                  },
                  emphasis: {
                    color: "#EBEBEB"
                  }
                }
              }
            ]
          }
        ]
      },
      defectOption2: {
        series: [
          {
            labelLine: {
              normal: {
                show: false
              }
            },
            name: "圆环",
            type: "pie",
            clickable:false,
            clockWise: false,
            radius: [50, 60],
            // itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: 100,
                type: 'B类',
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#333333",
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#666666",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{a|" + params.percent + "%}" + "\n\n{b|"+params.data.type+"}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#27B7BB",
                    shadowColor: "#EBEBEB",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 0,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#EBEBEB"
                  },
                  emphasis: {
                    color: "#EBEBEB"
                  }
                }
              }
            ]
          }
        ]
      },
      defectOption3: {
        series: [
          {
            labelLine: {
              normal: {
                show: false
              }
            },
            name: "圆环",
            type: "pie",
            clickable:false,
            clockWise: false,
            radius: [50, 60],
            // itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: 100,
                type: 'C类',
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#333333",
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#666666",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{a|" + params.percent + "%}" + "\n\n{b|"+params.data.type+"}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#27B7BB",
                    shadowColor: "#EBEBEB",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 0,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#EBEBEB"
                  },
                  emphasis: {
                    color: "#EBEBEB"
                  }
                }
              }
            ]
          }
        ]
      },
      defectOption4: {
        series: [
          {
            labelLine: {
              normal: {
                show: false
              }
            },
            name: "圆环",
            type: "pie",
            clickable:false,
            clockWise: false,
            radius: [50, 60],
            // itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: 99.95,
                type: "D类",
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#333333",
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#666666",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{a|" + params.percent + "%}" + "\n\n{b|"+params.data.type+"}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#27B7BB",
                    shadowColor: "#EBEBEB",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 0,
                name: "",
                itemStyle: {
                  normal: {
                    color: "#EBEBEB"
                  },
                  emphasis: {
                    color: "#EBEBEB"
                  }
                }
              }
            ]
          }
        ]
      },
      showTodayCharts: true,
    };
  },
  mounted(){

    // 获取当前日期
    /*
    getVoltageModuleData({VOLTTYPE : 4}).then(res => {
      if(res.data.length){
        this.currentDate = res.data[0].DATADATE.substring(0, 10);
      }
      }).catch(error => {
        console.log(error);
      }); 
      
      // A类数据
      getVoltageModuleData({VOLTTYPE : 1}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 1);
        }
      }).catch(error => {
        console.log(error);
      });

      // B类数据
      getVoltageModuleData({VOLTTYPE : 2}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 2);
        }
      }).catch(error => {
        console.log(error);
      });

      // C类数据
      getVoltageModuleData({VOLTTYPE : 3}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 3);
        }
      }).catch(error => {
        console.log(error);
      });

      // D类数据
      getVoltageModuleData({VOLTTYPE : 4}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 4);
        }
      }).catch(error => {
        console.log(error);
      });
      */
    },

    methods:{

      // 日期选择
      datePickerHandleChange() {
        // A类数据
        /*
      getVoltageModuleData({VOLTTYPE : 1}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 1);
        }
      }).catch(error => {
        console.log(error);
      });

      // B类数据
      getVoltageModuleData({VOLTTYPE : 2}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 2);
        }
      }).catch(error => {
        console.log(error);
      });

      // C类数据
      getVoltageModuleData({VOLTTYPE : 3}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 3);
        }
      }).catch(error => {
        console.log(error);
      });

      // D类数据
      getVoltageModuleData({VOLTTYPE : 4}).then(res => {
        if(res.data !== null){
          let rate = Number(res.data[0].RATE);
          this.renderModule(rate, 4);
        }
      }).catch(error => {
        console.log(error);
      });
      */
    },

    // 渲染该模块
    renderModule(data, type){
      this['defectOption' + type].series[0].data[0].value = data;
      this['defectOption' + type].series[0].data[1].value = 100 - data;
    },

  }
};
</script>
<style lang="scss" scoped>

</style>
