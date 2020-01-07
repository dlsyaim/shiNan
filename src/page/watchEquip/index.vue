<template>
  <div class="watch-equip">
    <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >
               <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>智能运维</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>运行监测</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
    <template v-if="watchEquipChartsData && watchEquipChartsData.length > 0">
      <el-row  class="watch-list" style="height: calc(50% - 15px)" type="flex" v-for="(data, dataIndex) in watchEquipChartsData" :key="dataIndex">
        <el-col class="watch-item" :span="item.layoutSpan" v-for="(item, index) in data" :key="index" :style="item.style">
          <div class="watch-item-loading" v-if="chartsLoading[dataIndex][index]">
            <i class="el-icon-loading"></i>
          </div>
          <template v-else>
            <el-col :span="24" class="watch-title">
              <el-col :span="12" class="title-text">
                <i class="el-icon-s-operation"></i>
                <span>{{item.watchTitle}}</span>
              </el-col>
              <el-col :span="12" class="month-picker-wrap">
                <el-date-picker
                  v-model="params[dataIndex][index]"
                  class="month-picker"
                  size="small"
                  :editable="false"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  @change="datePickerHandleChange(item.id)">
                </el-date-picker>
              </el-col>
            </el-col>
            <el-col :span="24" class="watch-content" v-if="item.id !== 'FZXJC'">
              <el-col :span="item.layoutSpan==12 ? 8 : 12" class="inline-data" v-for="(inline, inlineIndex) in item.inlineData" :key="inlineIndex">
                <template v-if="item.layoutSpan==12">
                  <div  @click="countClickHandle(dataIndex, index)">
                    <span>{{inline.key}}</span>
                    <span class="value">{{inline.value}}</span>
                    <span>{{inline.unit}}</span>
                  </div>
                </template>
                <template v-else>
                  <div  @click="countClickHandle(dataIndex, index)">
                    <span>{{inline.key}}</span>
                    <span class="value">{{inline.value}}</span>
                    <span>{{inline.unit}}</span>
                  </div>
                </template>
              </el-col>
              <el-col :span="24" class="watch-chart-list" style="height:calc(100% - 51px)" :id="item.id">
                <el-col :span="item.layoutSpan==12 ? 12 : 24" class="watch-chart-item" style="height:calc(100%)" v-for="(chart, chartIndex) in item.chartsData" :key="chartIndex">
                  <el-col :span="12" class="pie-title">{{chart.title}}</el-col>
                  <el-col :span="12" class="sub-info" v-if="chart.basis">
                    <span class="key">上月环比</span>
                    <i v-if="chart.basis.type" :class="chart.basis.type=='up' ? 'el-icon-top' : 'el-icon-bottom'"></i>
                    <span class="value">{{chart.basis.value}}</span>
                  </el-col>
                  <div class="aaaat" style="padding-top: 35px"></div>
                  <div :style="{height: (item.layoutSpan==12 ? 'calc(100% - 88px)' : 'calc(100% - 138px)')}">
                    <SnxPEcharts @echartsClick="echartsClick" :echartRefresh="echartRefresh" :echartObj="chart.chartOption" echartWidth="100%" echartHeight="100%"></SnxPEcharts>
                  </div>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" class="watch-content" v-if="item.id === 'FZXJC'">
              <el-col :span="item.layoutSpan==12 ? 8 : 12" class="inline-data" v-for="(inline, inlineIndex) in item.inlineData" :key="inlineIndex"  :style="inline.style">
                <template v-if="item.layoutSpan==12">
                  <div  @click="countClickHandle(dataIndex, index)">
                    <span>{{inline.key}}</span>
                    <span class="value">{{inline.value}}</span>
                    <span>{{inline.unit}}</span>
                  </div>
                </template>
                <template v-else>
                  <div  @click="countClickHandle(dataIndex, index)">
                    <span>{{inline.key}}</span>
                    <span class="value">{{inline.value}}</span>
                    <span>{{inline.unit}}</span>
                  </div>
                </template>
              </el-col>
              <el-col :span="24" class="watch-chart-list" style="height:calc(100% - 148px)" :id="item.id">
                <el-col :span="item.layoutSpan==12 ? 12 : 24" class="watch-chart-item" style="height: 50%" v-for="(chart, chartIndex) in item.chartsData" :key="chartIndex">
                  <el-col :span="12" class="pie-title">{{chart.title}}</el-col>
                  <el-col :span="12" class="sub-info" v-if="chart.basis">
                    <span class="key">上月环比</span>
                    <i v-if="chart.basis.type" :class="chart.basis.type=='up' ? 'el-icon-top' : 'el-icon-bottom'"></i>
                    <span class="value">{{chart.basis.value}}</span>
                  </el-col>
                  <div class="aaaat" style="padding-top: 35px"></div>
                  <div :style="{height: '100%'}">
                    <SnxPEcharts @echartsClick="echartsClick" :echartRefresh="echartRefresh" :echartObj="chart.chartOption" echartWidth="100%" echartHeight="100%"></SnxPEcharts>
                  </div>
                </el-col>
              </el-col>
            </el-col>
          </template>
        </el-col>
      </el-row>
    </template>
    <Popup v-if="popupShow" @close="popupHandleClose" :config="popupConfig" class="watchEquipPopup">
      <div slot="popup-data" class="popupContent">
        <div class="param-wrap table_content_top">
            <!-- <span @click="getLJTQData">
              <img :src="chartTitleImg" alt /> 邻近台区负载率
            </span> -->
            <span @click="getDetailQX(1)" v-if="currentRowOptions.flag">
              <img alt /> 电压曲线
            </span>
            <span @click="getDetailQX(2)" v-if="currentRowOptions.flag">
              <img alt /> 电流曲线
            </span>
            <span @click="getDetailQX(3)" v-if="currentRowOptions.flag">
              <img alt /> 功率曲线
            </span>
          <el-dropdown style="float: right" trigger="click">
            <el-button icon="el-icon-s-grid" size="mini" style="padding: 0 2px 0 2px;width: 52px;height: 34px">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" v-if="dropdownData">
              <div v-for="(item, index) in dropdownData" :key=index>
                <el-dropdown-item>{{item}}</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input type="text" v-model="input" placeholder="搜索" prefix-icon="el-icon-search" size="small" clearable style="width: 180px;height: 34px;float: right"></el-input>
        </div>
        <div class="table-wrap">
          <cuTable :currentRow="currentRowOptions"
                   :tableHeaders="tableHeaders"
                   :formatterVal="formatterVal"
                   :reqTotal="reqTotal"
                   :reqShowData="reqShowData"
                   @reqPageChanage="reqPageChanage"></cuTable>
        </div>
      </div>
    </Popup>

    <!-- 弹框 负载曲线-->
    <el-dialog width="90%" id="same_month" :title="qxTitle" :visible.sync="showDialog">
      <div class="equipment">
        <div class="equipment_name">
          <span>设备名称:</span>
          <span>{{FHQXName}}</span>
        </div>
        <div class="equipment_right"></div>
      </div>
      <div class="locure">
        <div class="locure_charts">
          <LineCharts
            :id="'BadCharts6'"
            :style="{width: '100%', height: '100%'}"
            :option="defectWeekOption"
          >
          </LineCharts>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SnxPEcharts from '@/components/snxp-echarts'
  import Popup from '@/components/snxp-popup'
  import request from '@/utils/request'
  import apiPath from '@/api/apiPath'
  import cuTable from '@/components/snxp-table'
  import LineCharts from "@/views/intelliOper/components/lineCharts";
  import { getDataByTQZB } from '@/api/api'
  import { formatterVal } from '@/utils/staticData'
  import { groupHeaders1, groupHeaders2 } from './staticData'
  export default {
    name: "watchEquipVue",
    components: {
      SnxPEcharts,
      Popup,
      cuTable,
      LineCharts
    },
    data() {
      return {
        input: '',
        SSGS: "SP05",
        params: [
          [this.getCurrentDate(), this.getCurrentDate()],
          [this.getCurrentDate(), this.getCurrentDate(), this.getPerviousDay()]
        ],
        popupCurrentPage: 1,
        popupPageSize: 20,
        popupTableData: [],
        popupShow: false,
        popupConfig: {
          title: '配网描述详情',
          headBgColor: '#0888A5',
          titleHeight: '46px',
          titleLineHeight: '46px',
          width: '80%',
          titlePosition: 'left',
          popupFoot: false,
          confirmBtn: false,
          cancelBtn: false
        },
        echartRefresh: true,
        chartsLoading: [[false, false], [false, false, false]],
        watchEquipChartsData: [],
        returnData: [],
        tableHeaders: [],
        formatterVal: formatterVal,
        reqTotal: null,
        reqShowData: null,
        dropdownData:['黄金糕','双皮奶','螺蛳粉','狮子头'],
        showTableGridParams: {},
        zndbDetailsLoading : false,
        currentRowOptions: {},
        currentSelectData: null,
        //曲线弹框
        showDialog: false,
        //曲线设备名称：
        FHQXName: null,
        //曲线 echarts option 配置
        defectWeekOption: {},
        qxTitle: "",
      }
    },
    watch: {},
    created () {},
    mounted () {
//      const href = window.location.href;
//      if(href && href.toLowerCase().indexOf("watchequip") > -1){
        // 获取echartsOption
        this.getChartsOption()
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        Promise.all([]).then(() => {
          loading.close();
        })
        this.init()
//      }

    },
    methods: {
      init(){
        //智能电表
        this.getDataByZNDB({"org_no": "31402", "meter_type":0, 'data_date': this.params[1][2]});
        // 查询配变终端
        this.getDataByPBZD({time: this.params[0][0], SSGS: this.SSGS})
        //低压监测
        this.getDataByDYJC({time: this.params[1][0], SSGS: this.SSGS})
        //分支箱
        this.getDataByFZXJC({time: this.params[1][1], SSGS: this.SSGS})
        // 查询台区总表
        this.getDataByTQZB({time: this.params[0][1], SSGS: this.SSGS, SBLX: -1})
      },
      //日期时间选择 变更
      datePickerHandleChange(id) {
        if (id === 'PBZD') {
          this.getDataByPBZD({time: this.params[0][0], SSGS: this.SSGS})
        } else if (id === 'TQZB') {
          this.getDataByTQZB({time: this.params[0][1], SSGS: this.SSGS, SBLX: -1})
        } else if (id === 'DYJC') {
          this.getDataByDYJC({time: this.params[1][0], SSGS: this.SSGS})
        } else if (id === 'FZXJC') {
          this.getDataByFZXJC({time: this.params[1][1], SSGS: this.SSGS})
        } else if (id === 'ZNDB') {
          this.getDataByZNDB({"org_no": "31104", "meter_type":0, "data_date": this.params[1][2]})
        }
      },
      // 图表点击
      echartsClick(params) {
        console.log("echartsClick", params);
        if(params && ((params.data && params.data.name === "异常") || params.index || params.data.flagId === "ZNDB")){
          let flagId = params.data ? params.data.flagId : null;
          if(!flagId){
            flagId = params.flagId;
          }
          if(flagId){
            this.showTableGridParams = {index: params.index || 1, rows: 10, SSGS: this.SSGS}
            if(flagId === "PBZD"){
              this.showTableGridParams.time = this.params[0][0];
              this.tableHeaders = groupHeaders1;
              this.tableHeaders[2].name = "台区名称";
              this.tableHeaders[2].minWidth = "100";
              this.getDataByPBZDErrorDetails(this.showTableGridParams)
              this.showTableGridParams.flagId = "PBZD";
            }else if (flagId === "DYJC"){
              this.showTableGridParams.time = this.params[1][0];
              this.tableHeaders = groupHeaders1;
              this.tableHeaders[2].name = "低压出线名称";
              this.tableHeaders[2].minWidth = "200";
              this.getDataByDYJCErrorDetails(this.showTableGridParams)
              this.showTableGridParams.flagId = "DYJC";
            }else if(flagId === "FZXJC"){
              this.showTableGridParams.time = this.params[1][1];
              this.tableHeaders = groupHeaders1;
              this.tableHeaders[2].name = "分支箱名称";
              this.tableHeaders[2].minWidth = "200";
              this.getDataByFZXJCErrorDetails(this.showTableGridParams)
              this.showTableGridParams.flagId = "FZXJC";
            }else if(flagId === "ZNDB"){
              this.tableHeaders = groupHeaders2;
              this.getDataByZNDBDetails({"org_no": "31102", "meter_type": 0, "data_date": this.params[1][2], "meter_status": params.data.meter_status});
            }
            this.popupShow = true
          }

        }
      },
      //总数点击
      countClickHandle(dataIndex, elementIndex, index){
        let params = {index: index || 1, rows: 10, SSGS: 'SP05', time: this.params[dataIndex][elementIndex]};
        let url = null;
        //配变终端
        if(dataIndex === 0 && elementIndex === 0){
          this.tableHeaders = groupHeaders1;
          this.tableHeaders[2].name = "台区名称";
          this.tableHeaders[2].minWidth = "100";
          url = apiPath.pbzd_devDetail;
        }else if(dataIndex === 1 && elementIndex === 0){
          this.tableHeaders = groupHeaders1;
          this.tableHeaders[2].name = "低压出线名称";
          this.tableHeaders[2].minWidth = "200";
          url = apiPath.dyjc_devDetail;
        }else if(dataIndex === 1 && elementIndex === 1){
          this.tableHeaders = groupHeaders1;
          this.tableHeaders[2].name = "分支箱名称";
          this.tableHeaders[2].minWidth = "200";
          url = apiPath.fzxjc_devDetail;
        }
        if(url){
          this.showTableGridParams = {dataIndex, elementIndex, index:index, flagId: dataIndex};
          request({
            url: url,
            method: 'get',
            params: params
          }).then(res => {
            if(res && res.data){
              this.reqShowData = res.data.nimsDevs;
              this.reqTotal = res.data.count;
            }
          })
          this.popupShow = true
        }

      },
      getCurrentDate() {
        var date = new Date()
        var year = date.getFullYear()
        var month = (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
        var day = (date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())
        return year + '-' + month + '-' + day
      },
      //前一天日期
      getPerviousDay() {
        let date = new Date();
        date.setDate(date.getDate()-1);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month<10){
          month = "0"+month;
        }
        if(day<10){
          day="0"+day
        }
        let preDate = year+"-"+month+"-"+day;
        return preDate;
      },
      toMap(params) {
        this.$message.success('clicked')
        console.log('clicked the location', params)
      },
      popupGetTabData(params) {
        this.popupTableData = [
          {},
          {}
        ]
      },
      popupHandleClose() {
        this.popupShow = false;
        this.currentSelectData = null;
      },
      //页面变更
      reqPageChanage(pageNumber){
        this.showTableGridParams.index = pageNumber;
        if(this.showTableGridParams && isNaN(this.showTableGridParams.flagId*1)){
          this.echartsClick(this.showTableGridParams)
        }else{
          const {dataIndex, elementIndex} = this.showTableGridParams
          this.countClickHandle(dataIndex, elementIndex, pageNumber);
        }

        //this.getDataByErrorDetails({time: this.params[0][0], index: pageNumber, rows: 10})
      },
      // 配变终端
      getDataByPBZD(params) {
        params = params || {};
        //this.chartsLoading[0][0] = true
        request({
          url: apiPath.pbzd_general,
          method: 'get',
          params: params
        }).then(res => {
          //this.chartsLoading[0][0] = false
          if(res && res.code === 0 && res.data){
            let data = res.data;
            let charts1 = this.watchEquipChartsData[0][0];
            let fgl = data.fgl ? (data.fgl*1*100).toFixed(2) : 0;
            let inlineData = [
              { key: '安装总数：', value: data.fbzdCount, unit: '台' },
              { key: '覆盖率：', value: fgl, unit: '%' },
              { key: '覆盖台区数：', value: data.fgtqCount, unit: '台' }
            ]
            charts1.inlineData = inlineData;
            //配变终端上月环比
            let v1 = isNaN(data.pbzdSyhb*1) ? "--" : data.pbzdSyhb*1*100;
            charts1.chartsData[0].basis = {value: v1, type: v1 === "--" ? "up" : v1 >= 0 ? "up" : "down"};
            charts1.chartsData[0].chartOption.series[0].data[0].value = data.normalPBZD
            charts1.chartsData[0].chartOption.series[0].data[1].value = data.abnormalPBZD
            //台区上月环比
            let v2 = isNaN(data.taiquSyhb*1) ? "--" : data.taiquSyhb*1*100;
            charts1.chartsData[1].basis = {value: v2, type: v2 === "--" ? "up" : v2 >= 0 ? "up" : "down"};
            charts1.chartsData[1].chartOption.series[0].data[0].value = data.taiquNormal
            charts1.chartsData[1].chartOption.series[0].data[1].value = data.taiquAbnormal
            this.echartRefresh = !this.echartRefresh;
          }
        })
      },
      getDataByPBZDErrorDetails(params){
        this.currentRowOptions = {"flag": true, "fn": this.currentSelectDataChange, "id": "pdzd"};
        params = params || {};
        request({
          url: apiPath.pbzd_devDetail_error,
          method: 'get',
          params: params
        }).then(res => {
          if(res && res.data){
            this.reqShowData = res.data.nimsDevs;
            this.reqTotal = res.data.count;
          }
        })

      },
      //台区
      async getDataByTQZB(params) {
        this.currentRow = {};
        params = params || {}
        let lastMonth = this.getLastMonth(params.time)
        // 台区总表统计
        let totalData = await request({
          url: apiPath.SN_TQZBTJ,
          method: 'get',
          params: params
        })
//        // 装置采集情况统计实际监测数
//        let watchData = await request({
//          url: apiPath.SN_ZZCJSJTJ,
//          method: 'get',
//          params: Object.assign({KSSJ: params.time, JSSJ: params.time}, params)
//        })
        // 装置采集情况统计-可监测数
        let canWatchData = await request({
          url: apiPath.SN_ZZCJKJCTJ,
          method: 'get',
          params: Object.assign({JSSJ: params.time}, params)
        })
        // 上月装置采集情况统计实际监测数
        let lastWatchData = await request({
          url: apiPath.SN_ZZCJSJTJ,
          method: 'get',
          params: Object.assign({KSSJ: lastMonth, JSSJ: lastMonth}, params)
        })
        // 上月装置采集情况统计-可监测数
        let lastCanWatchData = await request({
          url: apiPath.SN_ZZCJKJCTJ,
          method: 'get',
          params: Object.assign({JSSJ: lastMonth}, params)
        })
        // 台区采集情况-日统计
        let dayData = await request({
          url: apiPath.SN_TQCJRTJ,
          method: 'get',
          params: Object.assign({RQ: params.time.split("-").join("")}, params)
        })
        // 台区采集情况-月统计
        let monthData = await request({
          url: apiPath.SN_TQCJYTJ,
          method: 'get',
          params: Object.assign({RQ: (params.time.split("-").join("")).substring(0, 6)}, params)
        })
        // 台区采集情况-上月统计
        let lastMonthData = await request({
          url: apiPath.SN_TQCJYTJ,
          method: 'get',
          params: Object.assign({RQ: (lastMonth.split("-").join("")).substring(0, 6)}, params)
        })

        // 上月实际监测值-正常
        let numLastNormal = (lastWatchData.data && lastWatchData.data.length && lastWatchData.data[0].CNT) ? lastWatchData.data[0].CNT : 0;
        // 装置采集环比
        let rate1 = this.getRate(numNormal, numLastNormal);
        let rateType1 = "up";
        // 环比提升或降低
        if (rate1 < 0) {
          rateType1 = "down"
        }
        // 环比取绝对值四舍五入保留小数点后一位
        rate1 = Math.abs(rate1).toFixed(1)
        const reqDayData = dayData.data && dayData.data.length ? dayData.data[0] : null;
        // 日统计-正常
        var dayNormal = reqDayData ? reqDayData.ZCS : 0
        // 日统计-异常
        var dayAbnormal = reqDayData ? reqDayData.YCS : 0

        // 装置采集情况  正常
        let numNormal = reqDayData ? reqDayData.KJCS : 0;
        // 装置采集情况 所有
        let numCanWatchNum = (canWatchData.data && canWatchData.data.length && canWatchData.data[0].CNT) ? canWatchData.data[0].CNT : 0;
        // 装置采集情况  异常
        let abnormal = numCanWatchNum*1 - numNormal*1;
        if(reqDayData){
          const resDate = reqDayData.RQ;
          //日期
          this.params[0][1] = resDate.substring(0,4) + "-" + resDate.substring(4,6) + "-" + resDate.substring(6);
        }

        // 月统计-正常
        var monthNormal = (monthData.data && monthData.data.length && monthData.data[0].ZCS) ? monthData.data[0].ZCS : 0
        // 上月统计-正常
        var lastMonthNormal = (lastMonthData.data && lastMonthData.data.length && lastMonthData.data[0].ZCS) ? lastMonthData.data[0].ZCS : 0
        // 月环比
        var rate = this.getRate(monthNormal, lastMonthNormal)
        let rateType = "up";
        // 环比提升或降低
        if (rate < 0) {
          rateType = "down"
        }
        // 环比取绝对值四舍五入保留小数点后一位
        rate = Math.abs(rate).toFixed(1)
        // 行内数据
        let inlineData = [
          {
            key: '安装总数：',
            value: (totalData.data && totalData.data.length > 0) ? totalData.data[0].TQBS*1 : "--",
            unit: '台'
          },
          {
            key: '覆盖台区数：',
            value: (totalData.data && totalData.data.length > 0) ? totalData.data[0].TQS*1 : "--",
            unit: '台'
          }
        ]
        this.watchEquipChartsData[0][1].inlineData = inlineData
//        // 表单数据
//        // 装置采集
        this.watchEquipChartsData[0][1].chartsData[0].chartOption.series[0].data = [numNormal, '-']
        this.watchEquipChartsData[0][1].chartsData[0].chartOption.series[1].data = ['-', abnormal]
//        // 台区采集
        this.watchEquipChartsData[0][1].chartsData[1].chartOption.series[0].data = [dayNormal, '-']
        this.watchEquipChartsData[0][1].chartsData[1].chartOption.series[1].data = ['-', dayAbnormal]
//        // 环比数据
        this.watchEquipChartsData[0][1].chartsData[0].basis = {type: rateType1, value: (rate1 ? rate1 : 0)}
        this.watchEquipChartsData[0][1].chartsData[1].basis = {type: rateType, value: (rate ? rate : 0)}
        this.echartRefresh = !this.echartRefresh;
      },
      // 获取上月
      getLastMonth(date){
        var arr = date.split("-")
        var year = arr[0]*1
        var month = arr[1]*1
        var day = arr[2]*1

        if (month == 1) {
          year--
          month = 12
        } else {
          month--
        }
        return (year + "-" + ((month < 10) ? ("0" + month) : month) + "-" + ((day < 10) ? ("0" + day) : day))
      },
      // 获取环比
      getRate(current, last) {
        current = current*1
        last = last*1
        if (!current || !last || current == 0 || last == 0) {
          return 0
        }
        return ((current - last) / last *100)
      },
      //低压检测
      getDataByDYJC(params){
        params = params || {};
        //this.chartsLoading[1][0] = true
        request({
          url: apiPath.dyjc_general,
          method: 'get',
          params: params
        }).then(res => {
          //this.chartsLoading[1][0] = false
          if(res && res.code === 0 && res.data){
            let data = res.data;
            let charts1 = this.watchEquipChartsData[1][0];
            let fgl = data.fgl ? (data.fgl*1*100).toFixed(2) : 0;
            let inlineData = [
              { key: '装置总数：', value: data.dyjcCount, unit: '台' },
              { key: '覆盖率：', value: fgl, unit: '%' },
              { key: '覆盖低压出线条数：', value: data.dycxAbnormal, unit: '台' }
            ]
            charts1.inlineData = inlineData;
            //配变终端上月环比
            let v1 = isNaN(data.dyjcSyhb*1) ? "--" : data.dyjcSyhb*1*100;
            charts1.chartsData[0].basis = {value: v1, type: v1 === "--" ? "up" : v1 >= 0 ? "up" : "down"};
            charts1.chartsData[0].chartOption.series[0].data[0].value = data.normalDYJC
            charts1.chartsData[0].chartOption.series[0].data[1].value = data.abnormalDYJC
            //低压出线
            let v2 = isNaN(data.dycxSyhb*1) ? "--" : data.dycxSyhb*1*100;
            charts1.chartsData[1].basis = {value: v2, type: v2 === "--" ? "up" : v2 >= 0 ? "up" : "down"};
            charts1.chartsData[1].chartOption.series[0].data[0].value = data.dycxNormal
            charts1.chartsData[1].chartOption.series[0].data[1].value = data.dycxAbnormal
            this.echartRefresh = !this.echartRefresh;
          }
        });
      },
      getDataByDYJCErrorDetails(params){
        this.currentRowOptions = {"flag": true, "fn": this.currentSelectDataChange, "id": "dyjc"};
        params = params || {};
        request({
          url: apiPath.dyjc_general_error,
          method: 'get',
          params: params
        }).then(res => {
          if(res && res.data){
            this.reqShowData = res.data.nimsDevs;
            this.reqTotal = res.data.count;
          }
        }).catch(() => {
          this.allDatas = [];
        })
      },
      //分支箱
      getDataByFZXJC(params){
        params = params || {};
        //this.chartsLoading[1][1] = true
        request({
          url: apiPath.fzxjc_general,
          method: 'get',
          params: params
        }).then(res => {
          //this.chartsLoading[1][1] = false
          if(res && res.code === 0 && res.data){
            let data = res.data;
            let charts1 = this.watchEquipChartsData[1][1];
            let fgl = data.fgl ? (data.fgl*1*100).toFixed(2) : 0;
            let inlineData = [
              { key: '装置总数：', value: data.fzxjcCount, unit: '台' },
              { key: '覆盖分支箱数：', value: data.fzxCount, unit: '台' },
              { key: '覆盖率：', value:fgl, unit: '%', style: {"padding-top": "0px"}}
            ]
            charts1.inlineData = inlineData;

            //配变终端上月环比
            let v1 = isNaN(data.fzxjcSyhb*1) ? "--" : data.fzxjcSyhb*1*100;
            charts1.chartsData[0].basis = {value: v1, type: v1 === "--" ? "up" : v1 >= 0 ? "up" : "down"};
            charts1.chartsData[0].chartOption.series[0].data[0].value = data.normalFZXJC
            charts1.chartsData[0].chartOption.series[1].data[0].value = data.abnormalFZXJC
            charts1.chartsData[0].chartOption.xAxis[0].max = data.normalFZXJC*1 + data.abnormalFZXJC*1
            console.log("charts1.chartsData[0].chartOption.xAxis[0].max", charts1.chartsData[0].chartOption.xAxis[0].max)
            //分支箱
            let v2 = isNaN(data.fzxSyhb*1) ? "--" : data.fzxSyhb*1*100;
            charts1.chartsData[1].basis = {value: v2, type: v2 === "--" ? "up" : v2 >= 0 ? "up" : "down"};
            charts1.chartsData[1].chartOption.series[0].data[0].value = data.fzxNormal
            charts1.chartsData[1].chartOption.series[1].data[0].value = data.fzxAbnormal
            charts1.chartsData[1].chartOption.xAxis[0].max = data.fzxNormal*1 + data.fzxAbnormal*1
            console.log("charts1.chartsData[1].chartOption.series", charts1.chartsData[1].chartOption.xAxis[0].max)
            this.echartRefresh = true;
          }
        });
      },
      getDataByFZXJCErrorDetails(params){
        this.currentRowOptions = {"flag": true, "fn": this.currentSelectDataChange, "id": "fzxjc"};
        params = params || {};
        request({
          url: apiPath.fzxjc_general_error,
          method: 'get',
          params: params
        }).then(res => {
          if(res && res.data){
            this.reqShowData = res.data.nimsDevs;
            this.reqTotal = res.data.count;
          }
        })
      },
      //智能电表
      async getDataByZNDB(params){
//        params = params || {"org_no": "31102", "meter_type":0, "data_date": this.params[1][2]};
        params = params || {"org_no": "31402", "meter_type":0, 'data_date': "2019-10-12"};
        //this.chartsLoading[1][1] = true
        request({
          url: apiPath.METER_STAT,
          method: 'get',
          params: params
        }).then(res => {
          //this.chartsLoading[1][1] = false
          if(res && res.code === 0 && res.data && res.data.length){
            let data = res.data[0];
            let charts1 = this.watchEquipChartsData[1][2];
            let fgl = data.COVER_BOX_RATE ? (data.COVER_BOX_RATE*1).toFixed(2) : 0;
            let inlineData = [
              { key: '装置总数：', value: data.METER_INSTALL_NUM, unit: '台' },
              { key: '覆盖分支箱数：', value: data.COVER_BOX_NUM, unit: '台' },
              { key: '覆盖率：', value: fgl, unit: '%' }
            ]
            charts1.inlineData = inlineData;
            //智能电表
            let v1 = isNaN(data.LAST_MONTH_COMPARE_RATE*1) ? "--" : data.LAST_MONTH_COMPARE_RATE*1*100;
            charts1.chartsData[0].basis = {value: v1, type: v1 === "--" ? "up" : v1 >= 0 ? "up" : "down"};
            charts1.chartsData[0].chartOption.series[0].data[0].value = data.METER_COLL_SUCC_NUM
            charts1.chartsData[0].chartOption.series[1].data[1].value = data.METER_COLL_ERR_NUM
            this.echartRefresh = !this.echartRefresh
          }
        });
      },
      getDataByZNDBDetails(params){
        this.currentRowOptions = {};
        if(!this.zndbDetailsLoading){
          this.zndbDetailsLoading = true;
          params = params || {};
          request({
            url: apiPath.METER_STAT_DET,
            method: 'get',
            params: params
          }).then(res => {
            if(res && res.data && res.data.length){
              this.allDatas = res.data;
            }
            this.zndbDetailsLoading = false;
          }).catch(e => {
            this.zndbDetailsLoading = false;
          })
        }

      },
      //charts 配置参数
      getChartsOption() {
        const pieHeight = "280px";
        const barHeight = "280px";
        const fzxjcHeight = "120px";
        const zndbHeight = "220px"
        this.watchEquipChartsData = [
          [
            {
              height: pieHeight,
              style: {"margin": "5px"},
              watchTitle: '配变终端',
              id: 'PBZD',
              inlineData: [
                { key: '安装总数：', value: "--", unit: '台' },
                { key: '覆盖率：', value: "--", unit: '%' },
                { key: '覆盖台区数：', value: "--", unit: '台' }
              ],
              layoutSpan: 12,
              chartsData:  [
                {
                  title: '装置采集情况',
                  basis: {
                    type: '',
                    value: null
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'left',
                      data: ['正常', '异常']
                    },
                    series: [
                      {
                        name:'装置采集情况',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: (data) => {
                              var result = data.percent + '%' + '(' + data.value + ')' + '\n' + data.name
                              return result
                            }
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#4095EC', '#FFCD00']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data: [
                          {value: 0, name: '正常', unit: '台'},
                          {value: 0, name:'异常', unit: '台', flagId: 'PBZD'}
                        ]
                      }
                    ]
                  }
                },
                {
                  title: '台区采集情况',
                  basis: {
                    type: '',
                    value: null
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'left',
                      data: ['正常', '异常']
                    },
                    series: [
                      {
                        name:'台区采集情况',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: (data) => {
                              var result = data.percent + '%' + '(' + data.value + ')' + '\n' + data.name
                              return result
                            }
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#4095EC', '#FFCD00']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data: [
                          {value: 0, name: '正常', unit: '台'},
                          {value: 0, name:'异常', unit: '台', flagId: 'PBZD'}
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            {
              height: barHeight,
              style: {"margin": "5px"},
              watchTitle: '台区总表',
              id: 'TQZB',
              inlineData: [
                {
                  key: '安装总数：',
                  value: "--",
                  unit: '台'
                },
                {
                  key: '覆盖台区数：',
                  value: "--",
                  unit: '台'
                }
              ],
              layoutSpan: 12,
              chartsData:  [
                {
                  title: '装置采集情况',
                  basis: {
                    type: '',
                    value: null
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} : {c}"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'center',
                      data:['正常', '异常']
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    xAxis : [
                      {
                        type : 'category',
                        data : ['正常', '异常'],
                        axisTick: {
                          alignWithLabel: true
                        }
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value',
                        name : ''
                      }
                    ],
                    series : [
                      {
                        stack: '总量',
                        name:'正常',
                        type:'bar',
                        barWidth: 18,
                        barGap: '400%',
                        label: {
                          normal: {
                            show: true,
                            position: 'outside'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color: '#25B6BB'
                          }
                        },
                        data:[0, '-']
                      },
                      {
                        stack: '总量',
                        name:'异常',
                        type:'bar',
                        barWidth: 18,
                        barGap: '400%',
                        label: {
                          normal: {
                            show: true,
                            position: 'outside'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color: '#FF9900'
                          }
                        },
                        data:['-', 0]
                      }
                    ]
                  }
                },
                {
                  title: '台区采集情况',
                  basis: {
                    type: '',
                    value: null
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} : {c}"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'center',
                      data:['正常', '异常']
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    xAxis : [
                      {
                        type : 'category',
                        data : ['正常', '异常'],
                        axisTick: {
                          alignWithLabel: true
                        }
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value'
                      }
                    ],
                    series : [
                      {
                        stack: '总量',
                        name:'正常',
                        type:'bar',
                        barWidth: 18,
                        barGap: '400%',
                        label: {
                          normal: {
                            show: true,
                            position: 'outside'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color: '#25B6BB'
                          }
                        },
                        data:[0, '-']
                      },
                      {
                        stack: '总量',
                        name:'异常',
                        type:'bar',
                        barWidth: 18,
                        barGap: '400%',
                        label: {
                          normal: {
                            show: true,
                            position: 'outside'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color: '#FF9900'
                          }
                        },
                        data:['-', 0]
                      }
                    ]
                  }
                }
              ]
            }
          ],
          [
            {
              height: pieHeight,
              style: {"margin": "5px"},
              watchTitle: '低压监测',
              id: 'DYJC',
              inlineData: [
                {
                  key: '装置总数：',
                  value: "--",
                  unit: '台'
                },
                {
                  key: '覆盖率：',
                  value: "--",
                  unit: '%'
                },
                {
                  key: '覆盖低压出线条数：',
                  value: "--",
                  unit: '台'
                }
              ],
              layoutSpan: 12,
              chartsData:  [
                {
                  title: '装置采集情况',
                  basis: {
                    type: 'up',
                    value: "0"
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'left',
                      data:['正常','异常']
                    },
                    series: [
                      {
                        name:'装置采集情况',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: (data) => {
                              var result = data.percent + '%' + '(' + data.value + ')' + '\n' + data.name
                              return result
                            }
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#25B6BB', '#FF9900']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data:[
                          {value: 0, name: '正常'},
                          {value: 0, name:'异常', flagId: 'DYJC'}
                        ]
                      }
                    ]
                  }
                },
                {
                  title: '低压出线采集情况',
                  basis: {
                    type: 'up',
                    value: 3.6
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'left',
                      data:['正常','异常']
                    },
                    series: [
                      {
                        name:'装置采集情况',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: (data) => {
                              var result = data.percent + '%' + '(' + data.value + ')' + '\n' + data.name
                              return result
                            }
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#25B6BB', '#FF9900']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data:[
                          {value: 0, name: '正常'},
                          {value: 0, name:'异常', flagId: 'DYJC'}
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            {
              height: fzxjcHeight,
              style: {"margin": "5px 0px 5px 5px"},
              subHeight: 225,
              watchTitle: '分支箱监测',
              id: 'FZXJC',
              inlineData: [
                {
                  key: '装置总数：',
                  value: "--",
                  unit: '台'
                },
                {
                  key: '覆盖分支箱数：',
                  value: "--",
                  unit: '台'
                },
                {
                  key: '覆盖率：',
                  value: "--",
                  unit: '%',
                  style: {"padding-top": "0px"}
                }
              ],
              layoutSpan: 6,
              chartsData:  [
                {
                  title: '装置采集情况',
                  basis: {
                    type: 'up',
                    value: 0
                  },
                  chartOption: {
                    tooltip : {
                      trigger: 'item',
                      formatter : '{a0}:{c0}'
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'left',
                      data:['正常', '异常']
                    },
                    grid: {
                      top: 50,
                      left: 5,
                      right: 5,
                      bottom: 50
                    },
                    xAxis : [
                      {
                        show: false,
                        type : 'value',
                        max: '100'
                      }
                    ],
                    yAxis : [
                      {
                        show: false,
                        type : 'category',
                        data : []
                      }
                    ],
                    series : [
                      {
                        name:'正常',
                        type:'bar',
                        stack: '总量',
                        itemStyle : {
                          normal: {
                            label : {
                              show: true,
                              position: 'insideRight',
                              formatter: '{c}'
                            },
                            color: '#4394E9',
                            barBorderRadius:[10, 0, 0, 10]
                          }
                        },
                        data:[{value: 0}]
                      },
                      {
                        name:'异常',
                        type:'bar',
                        stack: '总量',
                        itemStyle : {
                          normal: {
                            label : {
                              show: false,
                              position: 'insideLeft',
                              formatter: '{c}'
                            },
                            color: '#FECE28',
                            barBorderRadius:[0, 10, 10, 0]
                          }
                        },
                        data:[{value: '0', flagId: 'FZXJC', name: '异常'}]
                      }
                    ]
                  }
                },
                {
                  title: '分支箱采集情况',
                  basis: {
                    type: 'up',
                    value: 0
                  },
                  chartOption: {
                    tooltip : {
                      trigger: 'item',
                      formatter : '{a0}:{c0}'
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'left',
                      data:['正常', '异常']
                    },
                    grid: {
                      top: 50,
                      left: 5,
                      right: 5,
                      bottom: 50
                    },
                    xAxis : [
                      {
                        show: false,
                        type : 'value',
                        max: '100'
                      }
                    ],
                    yAxis : [
                      {
                        show: false,
                        type : 'category',
                        data : []
                      }
                    ],
                    series : [
                      {
                        name:'正常',
                        type:'bar',
                        stack: '总量',
                        itemStyle : {
                          normal: {
                            label : {
                              show: true,
                              position: 'insideRight',
                              formatter: '{c}'
                            },
                            color: '#4394E9',
                            barBorderRadius:[10, 0, 0, 10]
                          }
                        },
                        data:[{value: '0'}]
                      },
                      {
                        name:'异常',
                        type:'bar',
                        stack: '总量',
                        itemStyle : {
                          normal: {
                            label : {
                              show: false,
                              position: 'insideLeft',
                              formatter: '{c}'
                            },
                            color: '#FECE28',
                            barBorderRadius:[0, 10, 10, 0]
                          }
                        },
                        data:[{value: '0', flagId: 'FZXJC', name: '异常'}]
                      }
                    ]
                  }
                }
              ]
            },
            {
              height: zndbHeight,
              style: {"margin": "5px 0px 5px 5px"},
              watchTitle: '智能电表',
              id: 'ZNDB',
              inlineData: [
                {
                  key: '装置总数：',
                  value: "--",
                  unit: '台'
                },
                {
                  key: '覆盖户表数：',
                  value: "--",
                  unit: '台'
                },
                {
                  key: '覆盖率：',
                  value: "--",
                  unit: '%'
                }
              ],
              layoutSpan: 6,
              chartsData:  [
                {
                  title: '装置采集情况',
                  basis: {
                    type: 'up',
                    value: 0
                  },
                  chartOption: {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} : {c}"
                    },
                    legend: {
                      orient: 'horizontal',
                      left: 'center',
                      data:['正常', '异常']
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      top: '40',
                      bottom: '3%',
                      containLabel: true
                    },
                    xAxis : [
                      {
                        type : 'category',
                        data : ["正常", "异常"],
                        axisTick: {
                          alignWithLabel: true
                        }
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value'
                      }
                    ],
                    series : [
                      {
                        stack: '总量',
                        name:'正常',
                        type:'bar',
                        barWidth: 18,
                        barGap: '400%',
                        label: {
                          normal: {
                            show: true,
                            position: 'outside'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color: '#27B7BB'
                          }
                        },
                        data:[{value: 0, flagId: 'ZNDB', "meter_status": "0", "meter_type": "0"},{value: '-'}]
                      },
                      {
                        stack: '总量',
                        name:'异常',
                        type:'bar',
                        barWidth: 18,
                        barGap: '400%',
                        label: {
                          normal: {
                            show: true,
                            position: 'outside'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color: '#FF9900'
                          }
                        },
                        data:[
                            {value: '-'},
                            {value: '0', flagId: 'ZNDB', "meter_status": "1", "meter_type": "1"}
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ]
        ]
      },
      currentSelectDataChange(p){
        this.currentSelectData = p
      },
      getDetailQX(p){
        if(!this.currentSelectData){
            return;
        }
        let url = "";
        let time = null;
        if(this.currentRowOptions.id === "pdzd"){
          url = apiPath.pbzd_devDetail_dataDetail;
          time = this.params[0][0];
        }else if(this.currentRowOptions.id === "dyjc"){
          url = apiPath.dyjc_general_dataDetail;
          time = this.params[1][0];
        }else if(this.currentRowOptions.id === "fzxjc"){
          url = apiPath.fzxjc_general_dataDetail;
          time = this.params[1][1];
        }
        this.FHQXName = this.currentSelectData.name;
        this.showDialog = true;
        this.defectWeekOption = {
          legend: {
            data: ["A", "B", "C"]
          },
          xAxis: {
            nameTextStyle: {
              fontSize: 20,
            },
            name: "时刻",
            data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96",]
          },
          yAxis: {
            name: "",
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
          series: [
            {
                name: 'A',
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
            },
            {
              name: 'B',
              symbol: 'none',
              smooth: true,
              type: 'line',
              symbolSize: 1,
              data: ["126","120","111","150","166","126","136","176","136","176","126","90","111","150","166","126","136","176","136","176","126","120","111","150","166","126","80","176","136","176","126","120","70","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126"],
              itemStyle: {
                normal: {
                  color: "#50f53c"
                }
              }
            },
            {
              name: 'C',
              symbol: 'none',
              smooth: true,
              type: 'line',
              symbolSize: 1,
              data: ["126","120","111","150","166","126","136","176","136","176","126","90","111","150","166","126","136","176","136","176","126","120","111","150","166","126","80","176","136","176","126","120","70","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126"],
              itemStyle: {
                normal: {
                  color: "#5a74f5"
                }
              }
            },
          ]
        }
        let dataA = null;
        let dataB = null;
        let dataC = null;
        let baseNum = 0;
        let addNum = 0;
        if(p === 1){
            baseNum = 5;
            addNum = 1;
            this.qxTitle = "电压"
        }else if(p === 2){
            baseNum = 25;
            addNum = 1;
            this.qxTitle = "电流"
        }else if(p === 3){
            baseNum = 61;
            addNum = 20;
            this.qxTitle = "功率"
        }
        this.defectWeekOption.yAxis.name = this.qxTitle;
        if(baseNum && addNum){
          dataA = request({
            url: url,
            method: 'get',
            params: {"time": time, "devId": this.currentSelectData.id, "mensType": baseNum}
          })
          dataB = request({
            url: url,
            method: 'get',
            params: {"time": time, "devId": this.currentSelectData.id, "mensType": baseNum + addNum}
          })
          dataC = request({
            url: url,
            method: 'get',
            params: {"time": time, "devId": this.currentSelectData.id, "mensType":  baseNum + addNum + addNum}
          })

          Promise.all([dataA, dataB, dataC]).then(ress => {
              let legends = [];
              if(p === 1) legends = ["A相电压", "B相电压", "C相电压"];
              if(p === 2) legends = ["A相电流", "B相电流", "C相电流"];
              if(p === 3) legends = ["总有功功率", "总无功功率", "总现在功率"];
              this.defectWeekOption.legend.data = legends;
              //获取所有请求的 是时刻
              let xAxisData = new Set();
              //输出到echarts options 中的 x 数组
              let outXAxisData = [];
              //输出到echarts options 中的 y 数组
              let y1Data = [];
              let y2Data = [];
              let y3Data = [];
              //缺少时刻 默认值
              const defaulData = [
                                    0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0,0,0
                                  ];
              let res1 = ress[0];
              let res2 = ress[1];
              let res3 = ress[2];
              //获取所有时刻
              if(res1 && res1.data){
                  for(let key in res1.data){
                    xAxisData.add(key);
                  }
              }
              if(res2 && res2.data){
                for(let key in res2.data){
                  xAxisData.add(key);
                }
              }
              if(res3 && res3.data){
                for(let key in res3.data){
                  xAxisData.add(key);
                }
              }
              //排序
              xAxisData = Array.from(xAxisData).sort();
              let r1 = res1.data;
              let r2 = res2.data;
              let r3 = res3.data;
              xAxisData.forEach(xVal => {
                  let tempXVal = [];
                  let tempXHouer = xVal.substring(11,14); //小时
                  try{
                    if(r1[xVal]){
                      y1Data = y1Data.concat(r1[xVal]);
                    }else{
                      y1Data = y1Data.concat(defaulData);
                    }
                  }catch (e){
                    y1Data = y1Data.concat(defaulData);
                  }
                  try{
                    if(r2[xVal]){
                      y2Data = y2Data.concat(r2[xVal]);
                    }else{
                      y2Data = y2Data.concat(defaulData);
                    }
                  }catch (e){
                    y2Data = y2Data.concat(defaulData);
                  }
                  try{
                    if(r3[xVal]){
                      y3Data = y3Data.concat(r3[xVal]);
                    }else{
                      y3Data = y3Data.concat(defaulData);
                    }
                  }catch (e){
                    y3Data = y3Data.concat(defaulData);
                  }
                  for(let i=0; i<60; i++){
                    tempXVal.push(tempXHouer+""+(i < 9 ? "0"+i : i));
                  }
                  outXAxisData = outXAxisData.concat(tempXVal);
              })
              this.defectWeekOption.xAxis.data = outXAxisData;

              this.defectWeekOption.series[0].name = legends[0];
              this.defectWeekOption.series[0].data = y1Data;
              this.defectWeekOption.series[1].name = legends[1];
              this.defectWeekOption.series[1].data = y2Data;
              this.defectWeekOption.series[2].name = legends[2];
              this.defectWeekOption.series[2].data = y3Data;
          })

        }


      },
    }
  }
</script>

<style lang="scss" scoped>
  // 监控设备样式
  .watch-equip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 72px);
    .breadcrumb-wrap {
      padding: 0 10px;
    }
    .watch-list {
      .watch-item {
        height: calc(100% - 10px);
        margin: 10px;
        overflow: hidden;
        border: 1px solid #CCCCCC;
        border-top: none;
        position: relative;
        .watch-item-loading {
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          i {
            position: absolute;
            color: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .watch-title {
          height: 30px;
          line-height: 30px;
          background-color: #27B7BB;
          .title-text {
            text-align: left;
            color: #fff;
            padding-left: 15px;
          }
          .month-picker-wrap {
            text-align: right;
            padding-right: 15px;
            /deep/ .month-picker {
              width: 130px;
              height: 30px;
              .el-input__inner {
                height: 30px;
                line-height: 30px;
                vertical-align: text-bottom;
              }
            }
          }
        }
        .watch-content {
          padding: 10px 20px;
          height: calc(100% - 30px);
          .inline-data {
            text-align: left;
            padding: 15px 0;
            .value {
              color: #27B7BB;
              font-weight: bold;
              cursor: pointer;
            }
          }
          .watch-chart-list {
            .watch-chart-item {
              text-align: left;
              .pie-title {
                padding-left: 8px;
                display: inline-block;
                position: relative;
                &:before {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 0;
                  transform: translateY(-50%);
                  width: 0px;
                  height: 16px;
                  border-left: 4px solid #27B7BB;
                }
              }
              .sub-info {
                text-align: right;
                padding-right: 10px;
                .key {
                  color: #3F3F3F;
                }
                .value {
                  color: #FC4323;
                }
                .el-icon-top,
                .el-icon-bottom {
                  color: #FC4323;
                  font-weight: bold;
                }
                .el-icon-bottom, .el-icon-bottom + .value {
                  color: #81D740;
                }
              }
            }
          }

        }
      }
    }
  }

  // 弹窗样式
  .watchEquipPopup {


    .table_content_top {
      text-align: left;
      height: 29px;
      width: 100%;
      margin-top: 15px;
      span {
        padding: 7px 10px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        width: 90px;
        height: 29px;
        border: 1px solid rgba(228, 228, 228, 1);
        border-radius: 4px;
        margin-right: 20px;
        cursor: pointer;
        img {
          vertical-align: bottom;
        }
      }
    }

/*    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 10;
    bottom: 0px;*/
    /deep/ .popupContent {
      padding: 30px 15px;
      .params-wrap {
        padding-bottom: 15px;
        .search-input {
          width: 180px;
          input {
            height: 34px;
            line-height: 34px;
          }
        }
        .search-select {
          width: 52px;
          input {
            height: 34px;
            line-height: 34px;
            padding-right: 15px;
          }
          .el-input__suffix {
            right: 4px;
            .el-input__icon {
              width: 10px;
              line-height: 30px;
            }
          }
        }
      }
      .table-wrap {
        /deep/ .el-table {
          .el-table__header {
            tr {
              background-color: #CBECF2;
              th {
                border-right: none;
                color: #333333;
                text-align: center;
                background: #CBECF2;
              }
            }
          }
        }
      }
    }

  }

  #same_month{
    .equipment {
      width: 100%;
      height: 82px;
      line-height: 82px;
      padding-left: 5px;
      padding-right: 47px;
      box-sizing: border-box;
      .equipment_name {
        float: left;

        span:nth-child(1) {
          font-weight: bold;
          font-size: 18px;
          color: #333333;
        }
        span:nth-child(2) {
          font-weight: bold;
          font-size: 18px;
          color: #27b7bb;
        }
      }
      .equipment_right {
        float: right;

        font-size: 14px;
        color: #666666;
      }
    }
    .locure {
      width: 100%;
      height: 510px;
      box-sizing: border-box;
      padding: 0 20px;
      .locure_charts {
        width: 100%;
        height: 500px;
        box-sizing: border-box;
        margin-bottom: 20px;
        border: 1px solid #dadada;
        box-sizing: border-box;
      }
    }
  }
  /deep/#same_month .el-dialog{
    margin-top:10vh!important;
  }

  /deep/#same_month .el-dialog__header {
    text-align: left;
    background-color: #0888a5;
  }
  /deep/#same_month .el-dialog__title {
    color: #ffffff;
  }
  /deep/#same_month .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  /deep/#same_month .el-dialog__body {
    padding: 0;
  }
  /*#FZXJC div:nth-child(1){*/
    /*height: calc(100% - 165px)!important;*/
  /*}*/
  #FZXJC{
    height: 75%!important;
  }
  /deep/ .el-breadcrumb{
    font-size: 17px;
    height: 30px;
    line-height: 20px;
    }
</style>
