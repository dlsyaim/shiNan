<template>
  <div class="chart_page_wrap jcanomborder">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>台区监测异常事件</span>
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
          @change="datePickerHandleChange">
        </el-date-picker>
      </div>
    </div> 
    <div class="jcanom_charts">
      <div class="chart_bottom_top jcaomtop">
        <div class="chart_bottom_ul">
          <li v-for="(item,index) in currentDisplayList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail"><strong>{{ item.value }}</strong>{{ item.unit }}</span>
          </li>
        </div>
      </div>
      <div class="jcanom_charts">
        <div class="echarts_wrap" :class="{active: showTodayCharts}">
          <LineCharts
            :id="'pmscharts'"
            :style="{width: '100%', height: '100%'}"
            :option="defectTodayOption"
            :parentId = '1'
          ></LineCharts>
        </div>
     
      </div>
    </div> 
  </div>
</template>
 
<script>
import LineCharts from "../../components/lineCharts";
import PieCharts from "../../components/pieCharts";
import {getLightCurrentDate, getLightDisplayList, getLightDisplayMonthList, getLightTodayData, getLightMonthData,getTQdata} from '@/api/api';
export default {
  // inject: ["setBreadcrumb"],
  components: {
    LineCharts: LineCharts,
    PieCharts: PieCharts
  },
  data(){
    return {
      gs:'',
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      currentDate: '',  // 当前时间
      // 当日显示信息
      displayList: [],
      // 当月显示信息
      displayMonthList: [],
      // 当前显示信息
      currentDisplayList: [{code: 'pzfzl',text: '故障总数',value: '0', unit: ''},],
      // 当日与本月选项
      checkedValue: '当日',
      checkOptions: [
        {label: '当日',value: 'thisDay'},
        {label: '当月',value: 'thisMonth'},
      ],
      loadValue: {
        thisDay: '23.36%',
        thisMonth: '46.36%',
      },
       // 当前时间
      currentDate: '',
      // 当日echarts数据
      todayData: [],
      // 当月echarts数据
      monthData: [],
      // 当前echarts数据
      currentChartsData: [],
      // 默认当前echarts数据
      defectTodayOption: {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        calculable: true,
        legend: {
          data: ["异常数量", ]
        },
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
            data: []
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
              formatter: "{value}"
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
            name: "异常数量",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fe9c28"
              }
            },
            barWidth: "20px",

            data: []
          },
        
        ]
      },
      showTodayCharts: true,
    };
  },
  mounted(){
    this.getTodayData();
    this.getYCSJ();
  },
  methods:{
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
      let postData={
        SSGS:'SP05',
        time: this.currentDate
      };
      this.getTQdataEchart(postData);
    },
    getTQdataEchart(postData){
      let that=this;
      getTQdata(postData).then(res => {
        console.log(res);                
        let xdata = []
        let serverdata = []
        res.data.list.forEach(item => {
          xdata.push(item.name) 
          serverdata.push(item.MEAS_TYPE)           
        })
        this.defectTodayOption.xAxis[0].data = xdata
        this.defectTodayOption.series[0].data = serverdata
        that.renderEchart("pmscharts", this.defectTodayOption);
      })
    },
      // 日期选择
    datePickerHandleChange(){
      let postData={
        SSGS:'SP05',
        time: this.currentDate
      };
      this.getTQdataEchart(postData);
    },


    //页面echarts图表渲染事件
    renderEchart(el, option, data) {
      if (el && option) {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            /*option.series=[];*/
            option.series[i].data = data[i];
          }
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(el));
        myChart.setOption(option);
        // let _this = this;
        myChart.on("click", function(params) {
          console.log("paramssss", params);
          // _this.onClickNum(params.name);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

