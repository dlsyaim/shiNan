<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>轻载</span>
      </div>
      <div class="chart_time">
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
      <div class="chart_tab">
        <el-select v-model="checkedValue" placeholder="" size="mini" @change="selectChange">
          <el-option v-for="(item, index) in checkOptions" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="chart_bottom">
      <div class="chart_bottom_top">
        <ul class="chart_bottom_ul" v-show="showTodayCharts">
          <li v-for="(item,index) in displayTodayList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail"><strong>{{ item.value }}</strong>{{ item.unit }}</span>
          </li>
        </ul>
        <ul class="chart_bottom_ul" v-show="showMonthCharts">
          <li v-for="(item,index) in displayMonthList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail"><strong>{{ item.value }}</strong>{{ item.unit }}</span>
          </li>
        </ul>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap" :class="{active: showTodayCharts}">
          <LineCharts
            :id="'lightCharts'"
            :style="{width: '100%', height: '100%'}"
            :option="defectTodayOption"
            :parentId = '8'
            :parentT = '9'
            :getOverData="getOverDataD"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
        <div class="echarts_wrap" :class="{active: showMonthCharts}">
          <LineCharts
            :id="'lightCharts2'"
            :style="{width: '100%', height: '100%'}"
            :option="defectMonthOption"
            :parentId = '8'
            :parentT = '9'
            :getOverData="getOverDataM"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLightModuleDayData } from '@/api/api'
import { regionMonthStaticsForQZ } from '@/api/api'
import LineCharts from "../../components/lineCharts";
import moment from "moment";

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
      getOverDataD:'',
      getOverDataM:'',
      getUrl:'loaddetail.html',
      // 当日显示信息
      displayTodayList: [
        {code: 'yzqz',text: '严重轻载',value: '0', unit: '台'},
        {code: 'ybqz',text: '一般轻载',value: '0', unit: '台'},
        {code: 'qzl',text: '轻载率',value: '0 %', unit: ''},
      ],
      // 当月显示信息
      displayMonthList: [
        {code: 'yzqz',text: '严重轻载',value: '0', unit: '台'},
        {code: 'ybqz',text: '一般轻载',value: '0', unit: '台'},
      ],
      // 当日与本月选项
      checkedValue: '当日',
      checkOptions: [
        {label: '当日',value: 'thisDay'},
        {label: '当月',value: 'thisMonth'},
      ],
      // 显示当日信息与否
      showTodayCharts: true,
      // 显示当月信息与否
      showMonthCharts: false,
      // 当日echarts参数
      defectTodayOption: {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        calculable: true,
        legend: {
          data: ["严重轻载", "一般轻载", "轻载率"]
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
            name: "严重轻载",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#27b7bb"
              }
            },
            barWidth: "20px",

            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "一般轻载",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#4394e9"
              }
            },
            barWidth: "20px",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "轻载率",
            type: "bar",
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            },
            smooth: false,
            yAxisIndex: 1,
            barWidth: "20px",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      // 当月echarts参数
      defectMonthOption: {
        xAxis: [{
            type: "category",
            axisLine: {
              color: "#949494",
              lineStyle: {
                color: "#949494"
              }
            },
            data: ["一般轻载", "严重轻载",]
        }],
        yAxis: [{
          type: "value",
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
        }],
        series: [{
          type: "bar",
          barWidth: "20px",
          itemStyle: {
            normal: {
              color: "#fece28"
            }
          },
          data: [0, 0,]
        }]
      },
    };
  },
  mounted(){

    getLightModuleDayData().then(res => {
      if(res.data.length){
        this.currentDate = this.formatDate(res.data[0].DATA_DATE);
        this.setDisplayList(res.data, 'Today');
        this.setDisplayList(res.data, 'Days');
        this.renderModule(res.data, 'Today');
        this.renderModule(res.data, 'Days');
        let currentMonth = moment(res.data[0].DATA_DATE,"YYYYMMDD").toDate();
        // regionMonthStaticsForQZ.getMonthStaticsData(currentMonth).then(res => {
           regionMonthStaticsForQZ.getMonthStaticsData('',currentMonth).then(res => {
          this.setDisplayList(res.data, 'Month');
          this.renderModule(res.data, 'Month');
        }).catch(error => {
          console.log(error);
        });
      }
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
      getLightModuleDayData(currentDate).then(res => {
        this.setDisplayList(res.data, 'Today');
        this.setDisplayList(res.data, 'Days');
        this.renderModule(res.data, 'Today');
        this.renderModule(res.data, 'Days');
      }).catch(error => {
        console.log(error);
      });
      let currentMonth = moment(this.currentDate,"YYYYMMDD").toDate();
      // regionMonthStaticsForQZ.getMonthStaticsData(currentMonth).then(res => {
        regionMonthStaticsForQZ.getMonthStaticsData('',currentMonth).then(res => {
        this.setDisplayList(res.data, 'Month');
        this.renderModule(res.data, 'Month');
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
      if(type === 'Today'){
        this.getOverDataD={
          data:data,
          type:type
        }
        let xAxisData = [];
        let seriesData = [];
        for(let i=0;i<data.length;i++){
          xAxisData.push(data[i].RTU_DEPT);
        }
        for(let j=0;j<data.length;j++){
          seriesData.push([]);
          if(j === 0){
            for(let i=0;i<data.length;i++){
              seriesData[j].push(Number(data[i].YZQZS));
            }
          }else if(j === 1){
            for(let i=0;i<data.length;i++){
              seriesData[j].push(Number(data[i].QZS));
            }
          }else if(j === 2){
            for(let i=0;i<data.length;i++){
              seriesData[j].push(Number(data[i].QZL));
            }
          }
        }
        let options = this['defect' + type + 'Option'];
        options.xAxis[0].data = xAxisData;
        for(let i=0;i<options.series.length;i++){
          options.series[i].data = seriesData[i];
        }
      }else if(type === 'Month'){
        this.getOverDataM={
          data:data,
          type:type
        }
        let seriesData = [];
        let options = this['defect' + type + 'Option'];
        if(data !== null && data.length){
          console.log('aaa')
          seriesData.push(Number(data[0].YZQZS))
          seriesData.push(Number(data[0].QZS))
        }
        options.series[0].data = seriesData;
      }

    },

    // 设置显示信息
    setDisplayList(data, type){
      if(type === 'Today'){
        let ybqzValue = 0;
        let yzqzValue = 0;
        let qzl = 0;
        for(let i=0;i<data.length;i++){
          yzqzValue += Number(data[i].YZQZS);
          ybqzValue += Number(data[i].QZS);
          qzl += Number(data[i].QZL);
        }
        this.displayTodayList[0].value = yzqzValue;
        this.displayTodayList[1].value = ybqzValue;
        this.displayTodayList[2].value = (qzl ? qzl.toFixed(2) : 0) + ' %';
      }else if(type === 'Month'){
        if(data !== null && data.length){
          this.displayMonthList[0].value = data[0].QZS;
          this.displayMonthList[1].value = data[0].YZQZS;
        }
      }
    },

    // 选择当日和当月事件
    selectChange(value){
      if(value === 'thisDay'){
        this.showTodayCharts = true;
        this.showMonthCharts = false;
      }else{

        this.showTodayCharts = false;
        this.showMonthCharts = true;
      }
    },

  }
};
</script>
<style lang="scss" scoped>

</style>

