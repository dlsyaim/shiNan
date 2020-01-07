<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>台区线损情况</span>
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
      <div class="chart_bottom_top">
        <div class="chart_bottom_ul">
          <li v-for="(item,index) in displayList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail"><strong>{{ item.value }}</strong>{{ item.unit }}</span>
          </li>
        </div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="bottom_split_two">
          <div class="bottom_split_two_top">
            <div class="echarts_wrap height100 active">
              <LineCharts
                :id="'BadCharts'"
                :style="{width: '100%', height: '100%'}"
                :option="defectMonthOption"
                :parentId = '1'
              >
              </LineCharts>
            </div>
          </div>
          <div class="bottom_split_two_bottom">
            台区月线损
          </div>
        </div>
        <div class="bottom_split_two">
          <div class="bottom_split_two_top">
            <div class="echarts_wrap height100 active">
              <LineCharts
                :id="'BadCharts2'"
                :style="{width: '100%', height: '100%'}"
                :option="defectWeekOption"
                :parentId = '1'
              >
              </LineCharts>
            </div>
          </div>
          <div class="bottom_split_two_bottom">
            台区周线损
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDamageModuleData } from '@/api/api'
import LineCharts from "../../components/lineCharts";
import moment from "moment"

export default {
  components: {
    LineCharts: LineCharts
  },
  data(){
    return {
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      // 当前时间
      currentDate: '',
      // 显示信息
      displayList: [
        {code: 'tqxsl',text: '线损率',value: '0%', unit: ''},
        {code: 'tqfszb',text: '负损占比',value: '0%', unit: ''},
      ],
      defectWeekOption: {
        legend: {
          data: ["线损率", "负损占比"]
        },
        xAxis: {
          nameTextStyle: {
          fontSize: 20,
          },
          name: "周",
          data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96",]
        },
        yAxis: {
          name: "线损率",
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name: "线损率",
          nameTextStyle: {
            fontSize: 20,
            padding: [0, 0, 30, 0],
          },
          type: 'value',
          nameLocation :'center',
          nameRotate:90,
          splitLine: {
            lineStyle: {
              color: "#E4E4E4",
            }
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          startValue: '2014-06-01'
        },{
          type: 'inside'
        }],
        series: [{
            name: '线损率',
            symbol: 'none',
            smooth: true,
            type: 'line',
            symbolSize: 1,
            data: ["126","120","111","150","166","126","136","176","136","176","126","90","111","150","166","126","136","176","136","176","126","120","111","150","166","126","80","176","136","176","126","120","70","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126"],
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            }
          },{
            name: '负损占比',
            symbol: 'none',
            smooth: true,
            type: 'line',
            symbolSize: 1,
            data: ["36","30","31","30","36","36","36","36","36","36","36","40","31","30","36","36","36","36","36","36","36","30","31","30","36","36","40","36","36","36","36","30","30","30","36","36","36","36","36","36","36","30","31","30","36","36","36","36","36","36","36","30","31","30","36","36","36","36","36","36","36","30","31","30","36","36","36","36","36","36","36","31","30","36","36","36","36","36","36","36","31","30","36","36","36","36","36","36","36","31","30","36","36","36","36","36",],
            itemStyle: {
              normal: {
                color: "#007687"
              }
            }
          }
        ]
      },
      defectMonthOption: {
        legend: {
          data: ["线损率", "负损占比"]
        },
        xAxis: {
          nameTextStyle: {
          fontSize: 20,
          },
          name: "月",
          data: ["1","2","3","4","5","6","7","8","9","10","11","12"]
        },
        yAxis: {
          name: "负荷/MV",
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name: "线损率",
          nameTextStyle: {
            fontSize: 20,
            padding: [0, 0, 30, 0],
          },
          type: 'value',
          nameLocation :'center',
          nameRotate: 90,
          splitLine: {
            lineStyle: {
              color: "#E4E4E4",
            }
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          startValue: '2014-06-01'
        },{
          type: 'inside'
        }],
        series: [{
            name: '线损率',
            symbol: 'none',
            smooth: true,
            type: 'line',
            symbolSize: 1,
            data: ["126","120","111","150","166","126","136","176","136","176","126","90",],
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            }
          },{
            name: '负损占比',
            symbol: 'none',
            smooth: true,
            type: 'line',
            symbolSize: 1,
            data: ["36","30","31","30","36","36","36","36","36","36","126","90",],
            itemStyle: {
              normal: {
                color: "#007687"
              }
            }
          }
        ]
      },
    };
  },
  mounted(){
    this.currentDate = this.setCurrentDate();
    let weekArgs = this.setWeekArgs(this.currentDate);
    let monthArgs = this.setMonthArgs(this.currentDate);
    // console.log("weekArgs", weekArgs);
    // console.log(monthArgs);
    getDamageModuleData(weekArgs).then(res => {
      console.log(res);
      if(res.data.length){
        this.sortData(res.data);
        this.renderModule(res.data, 'Week');
      }
    }).catch(error => {
      console.log(error);
    }); 
    getDamageModuleData(monthArgs).then(res => {
      console.log(res);
      if(res.data.length){
        this.setDisplayList(res.data);
        this.sortData(res.data);
        this.renderModule(res.data, 'Month');
      }
    }).catch(error => {
      console.log(error);
    }); 
  },
  methods:{

    // 接口数据按日期排序
    sortData(data){
      data.sort(function(a, b){
        return Number(a.DATA_DATE) - Number(b.DATA_DATE);
      });
    },

    setWeekArgs(date){
      return  {
        data_type: 1,
        data_beg_date: this.getYearStartDate(date),
        data_end_date: date,
      }
    },

    setMonthArgs(date){
      return {
        data_type: 0,
        data_beg_date: this.getYearStartDate(date).substring(0, 7),
        data_end_date: date.substring(0, 7),
      }
    },

    // 日期选择
    datePickerHandleChange() {
      console.log(this.currentDate);
      let weekArgs = this.setWeekArgs(this.currentDate);
      let monthArgs = this.setMonthArgs(this.currentDate);
      console.log(weekArgs);
      console.log(monthArgs);
      getDamageModuleData(weekArgs).then(res => {
        console.log(res);
        if(res.data.length){
          this.sortData(res.data);
          this.renderModule(res.data, 'Week');
        }
      }).catch(error => {
        console.log(error);
      }); 
      getDamageModuleData(monthArgs).then(res => {
        console.log(res);
        if(res.data.length){
          this.setDisplayList(res.data);
          this.sortData(res.data);
          this.renderModule(res.data, 'Month');
        }
      }).catch(error => {
        console.log(error);
      }); 
    },

    //设置当前日期
    setCurrentDate(){
      let currentData = new Date();
      return currentData.getFullYear() + '-' + (currentData.getMonth() + 1) + '-' + currentData.getDate();
    },

    // 获取上一年日期
    getYearStartDate(date){
      let dateArr = date.split('-');
      dateArr[1] = '01';
      dateArr[2] = '01';
      return dateArr.join('-');
    },

    // 设置显示信息
    setDisplayList(data){
      let xslValue = 0;
      let fszbValue = 0;
      for(let i=0;i<data.length;i++){
        xslValue += Number(data[i].TG_LINELOSS_RATE.split('%')[0]);
        fszbValue += Number(data[i].LOAD_LINELOSS_RATE.split('%')[0]);
      }
      this.displayList[0].value = (xslValue/data.length).toFixed(2) + '%';
      this.displayList[1].value = (fszbValue/data.length).toFixed(2) + '%';
    },

    // 渲染该模块
    renderModule(data, type){
      if(data !== null){
        let xAxisData = [];
        let seriesOne = []
        let seriesTwo = [];
        for(let i=0;i<data.length;i++){
          if(type === 'Month'){
            xAxisData.push(String(data[i].DATA_DATE));
          }else{
            xAxisData.push(data[i].DATA_DATE.substring(0, 10));
          }
          seriesOne.push(data[i].TG_LINELOSS_RATE.split('%')[0]);
          seriesTwo.push(data[i].LOAD_LINELOSS_RATE.split('%')[0]);
        }
        let option = 'defect' + type + 'Option';
        this[option].xAxis.data = xAxisData;
        this[option].series[0].data = seriesOne;
        this[option].series[1].data = seriesTwo;
      }
    },

  }
};
</script>
<style lang="scss" scoped>

</style>

