<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>过载</span>
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
        <ul class="chart_bottom_ul" v-show="showDaysCharts">
          <li v-for="(item,index) in displayDaysList" :key="index" class="chart_bottom_li">
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
            :id="'overCharts'"
            :style="{width: '100%', height: '100%'}"
            :option="defectTodayOption"
            :parentId = '3'
            :parentT = '7'
            :getOverData="getOverDataD"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
        <div class="echarts_wrap" :class="{active: showDaysCharts}">
          <LineCharts
            :id="'overCharts2'"
            :style="{width: '100%', height: '100%'}"
            :option="defectDaysOption"
            :parentId = '3'
            :parentT = '7'
            :getOverData="getOverData"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
        <div class="echarts_wrap" :class="{active: showMonthCharts}">
          <LineCharts
            :id="'overCharts3'"
            :style="{width: '100%', height: '100%'}"
            :option="defectMonthOption"
            :parentId = '3'
            :parentT = '7'
            :getOverData="getOverDataM"
            :getUrl="getUrl"
          ></LineCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOverModuleDayData } from '@/api/api'
import { regionMonthStaticsForGZ } from '@/api/api'
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
      getOverDataD:'',
      getOverDataM:'',
      // 当前时间
      currentDate: '',
      getUrl:'loaddetail.html',
      // 当日显示信息
      displayTodayList: [
        {code: 'yzgz',text: '严重过载',value: '0', unit: '台'},
        {code: 'ybgz',text: '一般过载',value: '0', unit: '台'},
        {code: 'gzl',text: '过载率',value: '0 %', unit: ''},
      ],
      // 连续30天显示信息
      displayDaysList: [
        {code: 'lxst',text: '连续3天',value: '0', unit: '台'},
        {code: 'ljqt',text: '累计7天',value: '0', unit: '台'},
      ],
      // 当月显示信息
      displayMonthList: [
        {code: 'yzgz',text: '严重过载',value: '0', unit: '台'},
        {code: 'ybgz',text: '一般过载',value: '1', unit: '台'},
        {code: 'lxst',text: '连续3天',value: '2', unit: '台'},
        {code: 'ljqt',text: '累计7天',value: '3', unit: '台'},
      ],
      // 当日与本月选项
      checkedValue: '当日',
      checkOptions: [
        {label: '当日',value: 'thisDay'},
        {label: '累计30天',value: 'days'},
        {label: '当月',value: 'thisMonth'},
      ],
      // 显示当日信息与否
      showTodayCharts: true,
      // 显示连续30天信息与否
      showDaysCharts: false,
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
          data: ["严重过载", "一般过载", "过载率"]
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
            name: "严重过载",
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
            name: "一般过载",
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
            name: "过载率",
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
            data: ["一般过载", "严重过载", "连续3天过载", "累计7天过载"]
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
          barWidth: "15%",
          itemStyle: {
            normal: {
              color: "#fece28"
            }
          },
          data: [0, 0, 0, 0]
        }]
      },
    };
  },
  mounted(){

    getOverModuleDayData().then(res => {
      if(res.data.length){
        this.currentDate = this.formatDate(res.data[0].DATA_DATE);
        this.setDisplayList(res.data, 'Today');
        this.setDisplayList(res.data, 'Days');
        this.renderModule(res.data, 'Today');
        this.renderModule(res.data, 'Days');
        let currentMonth = moment(res.data[0].DATA_DATE,"YYYYMMDD").toDate();
        // regionMonthStaticsForGZ.getMonthStaticsData(currentMonth).then(res => {
           regionMonthStaticsForGZ.getMonthStaticsData('',currentMonth).then(res => {
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
      getOverModuleDayData(currentDate).then(res => {
        this.setDisplayList(res.data, 'Today');
        this.setDisplayList(res.data, 'Days');
        this.renderModule(res.data, 'Today');
        this.renderModule(res.data, 'Days');
      }).catch(error => {
        console.log(error);
      });
      let currentMonth = moment(this.currentDate,"YYYYMMDD").toDate();
      // regionMonthStaticsForGZ.getMonthStaticsData(currentMonth).then(res => {
          regionMonthStaticsForGZ.getMonthStaticsData('',currentMonth).then(res => {
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
                seriesData[j].push(Number(data[i].LX3GZS));
              }
            }else if(j === 1){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].LJ7GZS));
              }
            }
          }
        }else if(type === 'Today'){
          this.getOverDataD={
            data:data,
            type:type
          }
          for(let j=0;j<data.length;j++){
            seriesData.push([]);
            if(j === 0){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].YZGZS));
              }
            }else if(j === 1){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].QDGZS));
              }
            }else if(j === 2){
              for(let i=0;i<data.length;i++){
                seriesData[j].push(Number(data[i].GZL));
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
         this.getOverDataM={
          data:data,
          type:type
        }
        let seriesData = [];
        let options = this['defect' + type + 'Option'];
        if(data !== null && data.length){
          seriesData.push(Number(data[0].YZGZS))
          seriesData.push(Number(data[0].QDGZS))
          seriesData.push(Number(data[0].LX3GZS))
          seriesData.push(Number(data[0].LJ7GZS))
        }
        options.series[0].data = seriesData;
      }
      this.getOverData={
        data:data,
        type:type
      }
    },

    // 设置显示信息
    setDisplayList(data, type){
      if(data===null)
      {
        return
      }
      if(type === 'Today'){
        let ybgzValue = 0;
        let yzgzValue = 0;
        let gzl = 0;
        for(let i=0;i<data.length;i++){
          yzgzValue += Number(data[i].YZGZS);
          ybgzValue += Number(data[i].QDGZS);
          gzl += Number(data[i].GZL);
        }
        this.displayTodayList[0].value = yzgzValue;
        this.displayTodayList[1].value = ybgzValue;
        this.displayTodayList[2].value = gzl + ' %';
      }else if(type === 'Days'){
        let lxstValue = 0;
        let ljqtValue = 0;
        for(let i=0;i<data.length;i++){
          lxstValue += Number(data[i].LX3GZS);
          ljqtValue += Number(data[i].LJ7GZS);
        }
        this.displayDaysList[0].value = lxstValue;
        this.displayDaysList[1].value = ljqtValue;
      }else if(type === 'Month'){
        if(data !== null && data.length){
          this.displayMonthList[0].value = data[0].YZGZS;
          this.displayMonthList[1].value = data[0].QDGZS;
          this.displayMonthList[2].value = data[0].LX3GZS;
          this.displayMonthList[3].value = data[0].LJ7GZS;
        }
      }
    },

    // 选择当日、累计30天和当月事件
    selectChange(value){
      if(value === 'thisDay'){
        this.showTodayCharts = true;
        this.showDaysCharts = false;
        this.showMonthCharts = false;
      }else if(value === 'days'){
        this.showTodayCharts = false;
        this.showDaysCharts = true;
        this.showMonthCharts = false;
      }
      // else{
      //   getOverModuleMonthData().then(item => {
      //     console.log(item);

      //   })
      //   this.showTodayCharts = false;
      //   this.showDaysCharts = false;
      //   this.showMonthCharts = true;
      // }
      else{
        this.showTodayCharts = false;
        this.showDaysCharts = false;
        this.showMonthCharts = true;
      }
    },

  }
};
</script>
<style lang="scss" scoped>

</style>

