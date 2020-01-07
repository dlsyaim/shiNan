<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>平均负载率</span>
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
        <div class="echarts_wrap" :class="{active: showTodayCharts}">
          <LineCharts
            :id="'AverageCharts'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOption"
            :parentId = '0'
            :getOverData="getOverData"
          >
          </LineCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAveragrModuleData } from '@/api/api'
import LineCharts from "../../components/lineCharts";

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
      getOverData:'',
      // 显示信息
      displayList: [
        {code: 'pzfzl',text: '平均负载率',value: '0 %', unit: ''}
      ],
      defectOption: {
        legend: {
          data: ["负载率"]
        },

        xAxis: {
          type: "category",
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
        },
        yAxis: {
          type: "value",
          name: "%",
          axisLine: {
            show: false
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
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            smooth: true,
            name: "负载率",
            type: "line",
            barWidth: "20px",
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            }
          }
        ]
      },
      showTodayCharts: true,
    };
  },
  mounted(){

    getAveragrModuleData().then(res => {
      if(res.data.length){
        this.currentDate = this.formatDate(res.data[0].DATA_DATE);
        this.setDisplayList(res.data);
        this.renderModule(res.data);

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
      getAveragrModuleData(currentDate).then(res => {
        this.setDisplayList(res.data);
        this.renderModule(res.data);
      }).catch(error => {
        console.log(error);
      });
    },

    // 渲染该模块
    renderModule(data){
      if(data===null)
      {
        return
      }
      let xAxisData = [];
      let seriesData = [];
      for(let i=0;i<data.length;i++){
        xAxisData.push(data[i].RTU_DEPT);
      }
      for(let j=0;j<data.length;j++){
        seriesData.push(Number(data[j].PJFZL));
      }
      let options = this['defect' + 'Option'];
      options.xAxis.data = xAxisData;
      options.series[0].data = seriesData;
      this.getOverData={
        data:data,
        type:'',
      }
    },

    // 设置显示信息
    setDisplayList(data){
      let pjfzl = 0;
      for(let i=0;i<data.length;i++){
        pjfzl += Number(data[i].PJFZL);
      }
      this.displayList[0].value = Number(pjfzl/data.length).toFixed(2) + ' %';
    },
    

    
  }
};
</script>
<style lang="scss" scoped>

</style>
