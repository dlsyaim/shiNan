<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>重点监控</span>
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
    <div class="chart_bottom bottom_left_three hasBorder">
      <div class="chart_bottom_top">
        <div class="chart_new_text buleBefore">严重超标台区</div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap active">
          <LineCharts
            :id="'phaseMonitorCharts'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOption1"
            :parentId = '3'
            :getOverData="getOverData"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
      </div>
    </div>
    <div class="chart_bottom bottom_left_three">
      <div class="chart_bottom_top">
        <div class="chart_new_text buleBefore">一般超标台区</div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap active">
          <LineCharts
            :id="'phaseMonitorCharts2'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOption2"
            :parentId = '3'
            :getOverData="getOverData"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
      </div>
    </div>
    <!-- <div class="chart_bottom bottom_left_three">
      <div class="chart_bottom_top">
        <div class="chart_new_text buleBefore">连续超标台区</div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap active">
          <LineCharts
            :id="'phaseMonitorCharts3'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOption3"
            :parentId = '3'
            :getOverData="getOverData"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getNotPhaseModuleTodayData,getSXBPHGPData } from '@/api/api'
import LineCharts from "../../components/lineCharts";
import moment from "moment";

export default {
  components: {
    LineCharts: LineCharts,
  },
  data(){
    return {
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      // 当前时间
      currentDate: '',
      getOverData:'',
      getUrl:'phasedetail.html',
      //charts参数
      defectOption1: {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        calculable: true,
        legend: {
          data: ["连续15天超标", "累计10天超标"]
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            height: 8,
            bottom: 10,
            background: "#339fff",
            start: 0,
            end: 100,
            handleSize: 0,
            fillerColor: "#0099FF",
            backgroundColor: "#fff",
            showDataShadow: false,
            showDetail: false,
            filterMode: "filter"
          },
          {
            type: "inside",
            show: true,
            start: 0,
            end: 100,
            backgroundColor: "#0099FF"
          }
        ],
        xAxis: [
          {
            type: "category",
            stacked: true,
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            data: [
              "变电中心一站",
              "变电中心五站",
              "配电运检一组",
              "配电运检二组",
              "变电中心三站",
              "变电中心一站",
              "变电中心五站",
              "配电运检一组",
              "配电运检二组",
              "变电中心三站"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量(台)",
            stacked: true,
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            nameTextStyle: {
              color: "#949494"
            },
            splitLine: {
              lineStyle: {
                color: "transparent"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "%",
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            nameTextStyle: {
              color: "#949494"
            },
            splitLine: {
              lineStyle: {
                color: "transparent"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "连续15天超标",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fe9c28"
              }
            },
            barWidth: "20px",

            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "累计10天超标",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fece28"
              }
            },
            barWidth: "20px",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
        ]
      },
      defectOption2: {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}台 ({d}%)"
        },
        legend: {
          textStyle: {
            color: "black",
            fontSize: 12
          },
          left: "5%",
          top: "0%",
          data: ["杆变", "配变"]
        },
        color: ["#005E67", "#20b2aa"],
        series: [
          {
            type: "pie",
             name:'杆配占比',
            radius: ["55%", "70%"],
            // clockwise: false,
            z: 10,
            itemStyle: {
              normal: {
              } 
            },
            label: {
              normal: {
                formatter: data => {
                  var result =
                    data.percent + "%" + "(" + data.value + "台)" + "\n" + data.name;
                  return result;
                },


              }
            },
            data: [{ value: 0, name: "杆变" }, { value: 0, name: "配变" }]
          }
        ]
      },
      defectOption3: {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        calculable: true,
        legend: {
          data: ["连续30天超标"]
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            height: 8,
            bottom: 10,
            background: "#339fff",
            start: 0,
            end: 100,
            handleSize: 0,
            fillerColor: "#0099FF",
            backgroundColor: "#fff",
            showDataShadow: false,
            showDetail: false,
            filterMode: "filter"
          },
          {
            type: "inside",
            show: true,
            start: 0,
            end: 100,
            backgroundColor: "#0099FF"
          }
        ],
        xAxis: [
          {
            type: "category",
            stacked: true,
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            data: [
              "变电中心一站",
              "变电中心五站",
              "配电运检一组",
              "配电运检二组",
              "变电中心三站",
              "变电中心一站",
              "变电中心五站",
              "配电运检一组",
              "配电运检二组",
              "变电中心三站"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量(台)",
            stacked: true,
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            nameTextStyle: {
              color: "#949494"
            },
            splitLine: {
              lineStyle: {
                color: "transparent"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "%",
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            nameTextStyle: {
              color: "#949494"
            },
            splitLine: {
              lineStyle: {
                color: "transparent"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "连续30天超标",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fe9c28"
              }
            },
            barWidth: "20px",

            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
        ]
      },
    };
  },
  mounted(){

    getNotPhaseModuleTodayData().then(res => {
      if(res.data.length){
        this.currentDate = this.formatDate(res.data[0].DATA_DATE);
        this.renderModule(res.data, 1);
        // this.renderModule(res.data, 2);
        // this.renderModule(res.data, 3);
      }
    }).catch(error => {
      console.log(error);
    });
   
    this.getGPZBdata()
  },
  methods:{
   
    getGPZBdata() {
       
       let postData={
         SSGS:'SP05',
         RQ:'1'
       };
      
       getSXBPHGPData(postData).then(res => {
            
             console.log('9999999999999999999999999',res);
             this.defectOption2.series[0].data[0].value = res.data[1].LJ10SXBPH
             this.defectOption2.series[0].data[1].value = res.data[0].LX15SXBPH
            // res.data.forEach(item => {
              
            // })
       })
    },

    // format当前日期格式  "20191007" -> "2019-10-07"
    formatDate(date){
      return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    },

    // format当前日期格式  "2019-10-07" -> 20191007
    dateToNumber(date){
      return Number(date.split("-").join(""));
    },

    // format当前日期格式  "20191007" -> 201910
    dateToMonthNumber(date){
      return Number(date.substring(0, 6));
    },

    // format当前日期格式  "2019-10-07" -> 201910
    dateToMonthNumber2(date){
      return Number(date.substring(0, 4) + date.substring(5, 7));
    },

    // 日期选择
    datePickerHandleChange() {
      let currentDate = this.dateToNumber(this.currentDate);
      getNotPhaseModuleTodayData(currentDate).then(res => {
        this.renderModule(res.data, 1);
        // this.renderModule(res.data, 2);
        // this.renderModule(res.data, 3);
      }).catch(error => {
        console.log(error);
      });
    },

    // 渲染该模块
    renderModule(data, num){
      let xAxisData = [];
      let seriesData = [];
      for(let i=0;i<data.length;i++){
          xAxisData.push(data[i].RTU_DEPT);
        }
      for(let j=0;j<data.length;j++){
        seriesData.push([]);
        if(j === 0){
          for(let i=0;i<data.length;i++){
            seriesData[j].push(Number(data[i].LJ15BPH));
          }
        }else if(j === 1){
          for(let i=0;i<data.length;i++){
            seriesData[j].push(Number(data[i].LX10BPH));
          }
        }
      }
      let options = this['defectOption' + num];
      options.xAxis[0].data = xAxisData;
      for(let i=0;i<options.series.length;i++){
        options.series[i].data = seriesData[i];
      }
        this.getOverData={
        data:data,
        type:type
      }
    },


    
  }
};
</script>
<style lang="scss" scoped>

</style>
