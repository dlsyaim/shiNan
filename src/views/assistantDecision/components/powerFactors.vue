<template>
  <div class="chart_page_wrap">
    <div class="chart_top">
      <div class="chart_title">
        <img :src="chartTitleImg" />
        <span>功率因素</span>
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
    </div>
    <div class="chart_bottom bottom_left">
      <div class="chart_bottom_top">
        <div class="chart_bottom_ul">
          <li v-for="(item,index) in currentDisplayList" :key="index" class="chart_bottom_li">
            <span class="li_text">{{ item.text }}：</span>
            <span class="li_detail"><strong>{{ item.value }}</strong>{{ item.unit }}</span>
          </li>
        </div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap" :class="{active: showTodayCharts}">
          <LineCharts
            :id="'OverVoltageCharts'"
            :style="{width: '100%', height: '100%'}"
            :option="defectTodayOption"
            :parentId = '4'
          ></LineCharts>
        </div>
        <div class="echarts_wrap" :class="{active: !showTodayCharts}">
          <LineCharts
            :id="'OverVoltageCharts2'"
            :style="{width: '100%', height: '100%'}"
            :option="defectMonthOption"
            :parentId = '4'
          ></LineCharts>
        </div>
      </div>
    </div>
    <div class="chart_bottom bottom_right">
      <div class="chart_bottom_top">
        <div class="chart_new_text">杆配占比</div>
      </div>
      <div class="chart_bottom_bottom">
        <div class="echarts_wrap active">
          <PieCharts
            :id="'OtherPieX'"
            :style="{width: '100%', height: '100%'}"
            :option="defectOtherOption"
            :parentId = '0'
          ></PieCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setPowerTodayData, setPowerPieTodayData } from '@/api/api'
import LineCharts from "../../components/lineCharts";
import PieCharts from "../../components/pieCharts";
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
      // 当日显示信息
      // 显示信息
      displayList: [
        // {code: 'pzfzl',text: '平均负载率',value: '-- %', unit: ''}
      ],
      // 当月显示信息
      displayMonthList: [],
      // 当前显示信息
      currentDisplayList: [ {code: 'pzfzl',text: '功率因素过低',value: '', unit: '台'},{code: 'pzfzl',text: '功率因素严重过低',value: '', unit: '台'},{code: 'pzfzl',text: '低功率因素率',value: '-- %', unit: ''},],
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
      // 当日echarts数据
      todayData: [],
      // 当月echarts数据
      monthData: [],
      // 当前echarts数据
      currentChartsData: [],
      // 默认当前echarts数据
      defaultMonthData: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],],
      defectTodayOption: {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false
        },
        calculable: true,
        legend: {
          data: ["功率因素过低", "功率因素严重过低", "低功率因素率"]
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
            name: "功率因素过低",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#27b7bb"
              }
            },
            barWidth: "15%",

            data: [86, 70, 60, 70, 60, 86, 80, 90, 80, 80]
          },
          {
            name: "功率因素严重过低",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#4394e9"
              }
            },
            barWidth: "15%",
            data: [66, 50, 40, 50, 40, 66, 60, 70, 60, 60]
          },
          {
            name: "低功率因素率",
            type: "line",
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            },
            smooth: false,
            yAxisIndex: 1,
            data: [370.532, 330, 600, 100, 100, 370.532, 330, 600, 100, 100]
          }
        ]
      },
    defectMonthOption: {
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
            barWidth: "15%",

            data: [20, 30, 30, 10, 20, 56, 40, 30, 10, 20]
          },
          {
            name: "累计7天",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#fece28"
              }
            },
            barWidth: "15%",
            data: [16, 0, 20, 10, 20, 6, 10, 20, 10, 20]
          },
        ]
      },
    defectOtherOption: {
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

            data: [{ value: 13, name: "杆变" }, { value: 7, name: "配变" }]
          }
        ]
      },
      showTodayCharts: true,
    };
  },
  mounted(){
    setPowerTodayData().then(res => {
        console.log('success!!!!');
        console.log(res);       
         let xAxisData = [];
            //功率因素过低
         let seriesData0 = [];
            //功率因素严重过低
         let seriesData1 = [];
            //低功率因素率
         let seriesData2 = [];
         let sum = 0;
            res.data.forEach(item => {
              let PJFZL = item.DGL*1;
              sum = sum*1 + PJFZL*1
              xAxisData.push(item.RTU_DEPT);
              seriesData0.push(item.DGL);
              seriesData1.push(item.YZDGL);
              if(item.GLL == null){
                  seriesData2.push(item.GLL = 0);    
              } else {
                seriesData2.push(item.GLL);    
              }                    
            })
            this.currentDisplayList[0].value = sum
            this.currentDisplayList[1].value = sum
            this.defectTodayOption.xAxis[0].data = xAxisData;            
            this.defectTodayOption.series[0].data = seriesData0;
            this.defectTodayOption.series[1].data = seriesData1;
            this.defectTodayOption.series[2].data = seriesData2;           
            this.renderEchart("AverageCharts", this.defectOption);
    }).catch(error => {
        console.log(error);
    });

    setPowerPieTodayData().then(res => {
      // console.log('111111',res);  
      this.defectOtherOption.series[0].data[0].value=res.data[0].GLZS;
      this.defectOtherOption.series[0].data[1].value=res.data[1].GLZS;

    })

    // this.getCurrentDate();
    // this.getDisplayList();
    // this.getTodayData();
  },
  methods:{

     // 日期选择
    datePickerHandleChange(){
      console.log(this.currentDate);
      let args = Number(this.currentDate.split("-").join(""));
      this.setPowerTodayData(args);
    },

    // 获取当前日期
    getCurrentDate(){
      let dateObj = new Date();
      this.currentDate = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
    },

    // 获取显示信息
   // 获取显示信息
    getDisplayList(sum, len){
      if(len == 0){
        this.displayList[0].value = 0 + " %";
      }else{
        this.displayList[0].value = (sum/len).toFixed(2) + " %";
      }
    },
    // 获取当月显示信息
    getDisplayMonthList(){
      if(!this.displayMonthList.length){
        let queryParam = '';
        getLightDisplayMonthList(queryParam).then(res => {
          if (res.code === 200) {
            this.displayMonthList = res.data;
            this.currentDisplayList = this.displayMonthList.slice();
          } else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          this.$message.error(err);
        })
      }
    },

    // 获取当前echarts数据
    setPowerTodayData() {
       
    },

    getTodayData(){
      console.log(121111);
      
        request({
        url: apiPath.SN_GLTJ,
        method: 'get',
        params: params
      }).then(res => {
        // let xAxisData = [];
        // let seriesData0 = [];
         
        // res.data.forEach(item => {        
        //     xAxisData.push(item.RTU_DEPT);
        //     seriesData0.push(PJFZL);
        //   })
        // this.defectTodayOption.xAxis.data = xAxisData;
        // this.defectOption.series[0].data = seriesData0;
      }).catch((err) => {
          this.$message.error(err);
      })
      // if(!this.todayData.length){
      //   let queryParam = '';
      //   setPowerTodayData(queryParam).then(res => {
      //     console.log(res);
          
      //     if (res.code === 200) {

      //       // let result = res.data;
      //       // this.todayData = [];
      //       // for(let i=0;i<result.length;i++){
      //       //   this.todayData.push([]);
      //       //   for(let j=0;j<result[i].length;j++){
      //       //     this.todayData[i].push(result[i][j].value)
      //       //   }
      //       // }
      //       // this.renderEchart("OverVoltageCharts", this.defectTodayOption, this.todayData);
      //       // this.renderEchart("OtherPieX", this.defectOtherOption);
      //     } else {
      //       // this.renderEchart("OverVoltageCharts", this.defectTodayOption, this.defaultTodayData);
      //       // this.renderEchart("OtherPieX", this.defectOtherOption, this.defaultTodayData);
      //       // this.$message.error(res.message);
      //     }
      //   }).catch((err) => {
      //     this.$message.error(err);
      //   })
      // }
    },

    // 获取当月echarts数据
    getMonthData(){
      if(!this.monthData.length){
        let queryParam = '';
        getLightMonthData(queryParam).then(res => {
          if (res.code === 200) {
            let result = res.data;
            this.monthData = [];
            for(let i=0;i<result.length;i++){
              this.monthData.push([]);
              for(let j=0;j<result[i].length;j++){
                this.monthData[i].push(result[i][j].value);
              }
            }
            console.dir(this.monthData)
            this.renderEchart("LightCharts2", this.defectMonthOption, this.monthData);
          } else {
            this.renderEchart("LightCharts2", this.defectMonthOption, this.defaultMonthData);
            this.$message.error(res.message);
          }
        }).catch((err) => {
          this.$message.error(err);
        })
      }
    },

    // 选择当日和当月事件
    selectChange(value){
      if(value === 'thisDay'){
        this.getDisplayList();
        this.currentDisplayList = this.displayList.slice();
        this.showTodayCharts = true;
        this.getTodayData();
        this.renderEchart("LightCharts", this.defectTodayOption, this.todayData);
      }else{
        this.getDisplayMonthList();
        this.currentDisplayList = this.displayMonthList.slice();
        this.showTodayCharts = false;
        this.getMonthData();
        this.renderEchart("LightCharts2", this.defectMonthOption, this.monthData);
      }
    },

    //页面echarts图表渲染事件
    renderEchart(el, option, data) {
      if (el && option) {
        if (data) {
          for (let i = 0; i < data.length; i++) {
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

