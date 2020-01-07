<template>
  <div class="chart_page_wrap jcanomborder">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>PMS故障</span>
      </div>
      <div class="chart_time calendar_time">
        <el-date-picker
          v-model="currentDate"
          class="month-picker"
          size="small"
          :editable="false"
          :clearable="false"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @change="datePickerHandleChange"
        ></el-date-picker>
      </div>
    </div>
    <div class="jcanom_charts">
      <div class="chart_bottom_top jcaomtop">
        <div class="chart_bottom_ul">
          <li v-for="(item,index) in currentDisplayList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail">
              <strong>{{ item.value }}</strong>
              {{ item.unit }}
            </span>
          </li>
        </div>
      </div>
      <div class="jcanom_charts">
        <div class="echarts_wrap" :class="{active: showTodayCharts}">
          <LineCharts
            :id="'MainMonitorChart'"
            :style="{width: '100%', height: '100%'}"
            :option="defectTodayOption"
            :getOverData="getOverDataM"
            :getUrl="getUrl"
            :currentDate="currentDate"
            :parentId = '9'
          ></LineCharts>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import LineCharts from "../../components/lineCharts";

import {getSNGZQXTJLYData} from "@/api/api";
export default {
  // inject: ["setBreadcrumb"],
  components: {
    LineCharts: LineCharts,
  },
  data() {
    return {
      getUrl:'pmdetail.html',
      getOverDataM:'',
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      currentDate: "", // 当前时间
      // 当日显示信息
      displayList: [],
      // 当月显示信息
      displayMonthList: [],
      // 当前显示信息
      currentDisplayList: [
        { code: "pzfzl", text: "故障总数", value: "0", unit: "" }
      ],
      // 当日与本月选项
      checkedValue: "当日",
      checkOptions: [
        { label: "当日", value: "thisDay" },
        { label: "当月", value: "thisMonth" }
      ],
      loadValue: {
        thisDay: "23.36%",
        thisMonth: "46.36%"
      },
      // 当日echarts数据
      todayData: [],
      // 当月echarts数据
      monthData: [],
      // 当前echarts数据
      currentChartsData: [],
      // 默认当前echarts数据
      defaultTodayData: [
        [],
        [],
        []
      ],
      defaultMonthData: [
        [],
        []
      ],
      defectTodayOption: {

        tooltip: {
          trigger: "axis"
        },
       
        
        legend: {
          data: ["已处理数", "正在处理数",]
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            height: 8,
            bottom: 10,
            background: "#339fff",
            start: 0,
            end: 50,
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
        grid: {
          borderWidth: 0,
          top: 50,
          bottom: 60,
          left: "40",
          right: "40",
          containLabel:true,
          textStyle: {
            color: "#fff"
          }
        },
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
            show:true,
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
              formatter: "{value}",
              show:true,
              interval:'auto',
            }
          },
          {
            type: "value",
            name: "%",
            show:false,
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
              show:false,
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "已处理数",
            type: "bar",
            // stack:'sum',
            itemStyle: {
              normal: {
                color: "#fe9c28"
              }
            },
            barWidth: "20px",

            data: [0,0,0,0,0,0,0,0,0,0]
          },
           {
            name: "正在处理数",
            // stack:'sum',
            type: "bar",
            itemStyle: {
              normal: {
                color: "#05C3FA"
              }
            },
            barWidth: "20px",
            data: [0,0,0,0,0,0,0,0,0,0] 
          },
         
        ]
      },    
      showTodayCharts: true
    };
  },
  mounted() {
    this.getTodayData();
    this.getYCSJ();
    this.getTQdataEchart()
  },
  methods: {
    // 日期选择
    datePickerHandleChange(val) {
      this.currentDate = val;
      let postData={
        SSGS:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05',
        KSSJ: this.currentDate + ' 00:00:00',
        JSSJ: this.currentDate + ' 23:59:59',
      };
      this.getTQdataEchart(postData);
    },
    getTodayData(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if(month.length<10)
      {
        month='0'+month;
      }
      let day = date.getDate()
      if(day.length<10)
      {
        day='0'+day;
      }
      let time = year+"-"+month+"-"+day
      this.currentDate=time;
    },
     getYCSJ() {
      // let postData={
      //   SSGS:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05',
      //   KSSJ: this.currentDate + ' 00:00:00',
      //   JSSJ: this.currentDate + ' 23:59:59',
      // };
      this.getTQdataEchart();
    },

    getTQdataEchart(){
      let postData={
        SSGS:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05',
        KSSJ: this.currentDate + ' 00:00:00',
        JSSJ: this.currentDate + ' 23:59:59',
      };
      // let that=this;
      getSNGZQXTJLYData(postData).then(res => {
        let nameData=[];
        let serdata0 = []
        let serdata1 = []
        let serdata2 = []
        res.data.forEach(item => {
          nameData.push(item.LYMC+'\n'+item.DYDJ);
          serdata0.push(item.YCLS)
          serdata1.push(item.ZCLS) 
        })
        // console.log(nameData);
         this.defectTodayOption.xAxis[0].data=nameData;
         this.defectTodayOption.series[0].data = serdata0
         this.defectTodayOption.series[1].data = serdata1
         
         this.getOverDataM={
          data:res.data,
          type:'',
          KSSJ:this.currentDate
        }         
      })
    },
  }
};
</script>
<style lang="scss" scoped>
</style>

