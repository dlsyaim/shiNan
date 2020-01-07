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
    <div class="chart_bottom bottom_left">
      <div class="chart_bottom_top">
        <ul class="chart_bottom_ul" v-show="showDaysCharts">
          <li v-for="(item,index) in displayDaysList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail"><strong>{{ item.value }}</strong>{{ item.unit }}</span>
          </li>
        </ul>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap" :class="{active: showDaysCharts}">
          <LineCharts
            :id="'powerMonitorCharts2'"
            :style="{width: '100%', height: '100%'}"
            :option="defectDaysOption"
            :parentId = '12'
            :getOverData="getOverData"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
      </div>
    </div>
    <div class="chart_bottom bottom_right">
      <div class="chart_bottom_top">
        <div class="chart_new_text">杆配占比</div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap" :class="{active: showDaysCharts}">
          <PieCharts
            :id="'OtherMonitorPie'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOtherDaysOption"
            :parentId = '0'
            :getOverData="getOverData"
            :getUrl="getUrl"
          ></PieCharts>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getPowerModuleTodayData } from '@/api/api'
import { getPowerModuleRateData } from '@/api/api'
import LineCharts from "../../components/lineCharts";
import PieCharts from "../../components/pieCharts";
import moment from "moment";

export default {
  components: {
    LineCharts: LineCharts,
    PieCharts: PieCharts
  },
  data(){
    return {
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_calendar.png"),
      // 当前时间
       currentDate: '',
       getOverData:'',
       getUrl:'powerdetail.html',
      // 连续30天显示信息
      displayDaysList: [
        {code: 'lxst',text: '连续3天',value: '0', unit: '台'},
        {code: 'ljqt',text: '累计7天',value: '0', unit: '台'},
      ],
      // 显示连续30天信息与否
      showDaysCharts: true,
      // 连续30天echarts参数
      defectDaysOption: {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        calculable: true,
        legend: {
          data: ["连续3天", "累计7天"]
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
            name: "连续3天",
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
            name: "累计7天",
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
      //杆配占比参数
      defectOtherDaysOption: {
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
    };
  },
  mounted(){

    getPowerModuleTodayData().then(res => {
      console.log('ss1');
      console.log(res);
      if(res.data.length){
        this.currentDate = this.formatDate(res.data[0].DATA_DATE);
        this.setDisplayList(res.data, 'Days');
        this.renderModule(res.data, 'Days');
      }
    }).catch(error => {
      console.log(error);
    });

    getPowerModuleRateData().then(res => {
      console.log('ss2');
      console.log(res);
      this.renderRateModule(res.data, 'Days');
    }).catch(error => {
      console.log(error);
    });

  },
  methods:{

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
      getPowerModuleTodayData(currentDate).then(res => {
        console.log('ss3');
      console.log(res);
        this.setDisplayList(res.data, 'Days');
        this.renderModule(res.data, 'Days');
      }).catch(error => {
        console.log(error);
      });
      getPowerModuleRateData().then(res => {
        console.log('ss4');
      console.log(res);
        this.renderRateModule(res.data, 'Days');
      }).catch(error => {
        console.log(error);
      });
    },

    // 渲染该模块
    renderModule(data, type){
      if(data===null)
      {
        return
      }
      if(type === 'Today' || type === 'Days'){
        let xAxisData = [];
        let seriesData = [];
        for(let i=0;i<data.length;i++){
          xAxisData.push(data[i].RTU_DEPT);
        }
        if(type === 'Days'){
          for(let j=0;j<data.length;j++){
            seriesData.push([]);
            if(j === 0){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].LX3DGL));
              }

            }else if(j === 1){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].LJ7DGL));
              }
            }
          }
        }else if(type === 'Today'){
          for(let j=0;j<data.length;j++){
            seriesData.push([]);
            if(j === 0){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].DDYS));
              }
            }else if(j === 1){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].YZDDYS));
              }
            }
          }
        }
        let options = this['defect' + type + 'Option'];
        options.xAxis[0].data = xAxisData;
        for(let i=0;i<options.series.length;i++){
          options.series[i].data = seriesData[i];
        }
      }else if(type === 'Month'){
        let seriesData = [0, 0, 0, 0];
        let options = this['defect' + type + 'Option'];
        if(data !== null && data.length){
          seriesData.push(Number(data[0].FSCS))
          seriesData.push(Number(data[0].LXTS))
          seriesData.push(Number(data[0].LJTS))
        }
        options.series[0].data = seriesData;
      }
       this.getOverData={
        data:data,
        type:type
      }
    },

    // 渲染该模块中杆配比
    renderRateModule(data, type){
      let rateData = [0, 0];
      let option = "defectOther" + type + "Option";
      if(data !== null){
        for(let i=0;i<data.length;i++){
          if(data[i].DEV_TYPE === '209'){
            if(type === 'Today'){
              rateData[0] = Number(data[i].DDYZS);
            }else if(type === 'Days'){
              rateData[0] = Number(data[i].LX3GLS) + Number(data[i].LJ7GLS);
            }
          }else if(data[i].DEV_TYPE === '43'){
            if(type === 'Today'){
              rateData[1] = Number(data[i].DDYZS);
            }else if(type === 'Days'){
              rateData[1] = Number(data[i].LX3GLS) + Number(data[i].LJ7GLS);
            }
          }
        }
      }
      for(let i=0;i<rateData.length;i++){
        this[option].series[0].data[i].value = rateData[i];
      }
    },

    // 设置显示信息
    setDisplayList(data, type){
      if(type === 'Today'){
        let ddyValue = 0;
        let yzddyValue = 0;
        let ddyl = 0;
        for(let i=0;i<data.length;i++){
          ddyValue += Number(data[i].LX3DGL);
          yzddyValue += Number(data[i].LJ7DGL);
        }
        this.displayTodayList[0].value = ddyValue;
        this.displayTodayList[1].value = yzddyValue;
      }else if(type === 'Days'){
        let lxstValue = 0;
        let ljqtValue = 0;
        for(let i=0;i<data.length;i++){
          lxstValue += Number(data[i].LX3DGL);
          ljqtValue += Number(data[i].LJ7DGL);
        }
        this.displayDaysList[0].value = lxstValue;
        this.displayDaysList[1].value = ljqtValue;
      }else if(type === 'Month'){
        if(data !== null && data.length){
          this.displayMonthList[0].value = data[0].DDYS;
          this.displayMonthList[1].value = data[0].LX3DDY;
          this.displayMonthList[2].value = data[0].LJ7DDY;
          this.displayMonthList[3].value = data[0].DDYL;
        }
      }
    },

  }
};
</script>
<style lang="scss" scoped>

</style>
