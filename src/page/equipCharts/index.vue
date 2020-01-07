<template>
    <div class="equip-charts">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>智能运维</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>台区概况</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
        <el-row style="padding: 0px; height: calc(100% - 30px)">
            <el-col :span="24" class="month-picker-wrap">
                <el-date-picker
                    class="month-picker"
                    v-model="currentDate"
                    size="small"
                    :editable="false"
                    :clearable="false"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :disabled="true"
                    placeholder="选择时间">
                </el-date-picker>
            </el-col>
            <el-col :span="24" style="height: 100%;">
                <div class="tab-wrap">
                    <el-tabs v-model="tabActiveName" @tab-click="handleClick">
                        <el-tab-pane label="10kV站点" name="first">
                            <div class="tab-content" v-if="returnData && tabActiveName == 'first'">
                                <el-row>
                                    <el-col :span="24" style="margin-left: 10px;">
                                        <el-col :span="5" class="inline-data">
                                            <span>总数</span>
                                            <span class="value">{{returnData.total}}</span>
                                            <span>座</span>
                                        </el-col>
                                        <el-col :span="5" class="inline-data">
                                            <span>容量</span>
                                            <span class="value">{{returnData.volume}}</span>
                                            <span>MVA</span>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="charts-list" style="height:calc(100vh - 160px)">
                                        <el-col :span="12" class="charts-item" style="height:calc(50% - 20px) !important;" v-for="(charts, index) in returnData.data" :key=index>
                                            <div class="charts-title">
                                                <i class="el-icon-s-operation"></i>
                                                {{charts.title}}
                                            </div>
                                            <el-row class="charts-inline-data">
                                                <el-col :span="8" class="inline-data">
                                                    <div @click="totalClickHandle(0, index)">
                                                      <span>总数</span>
                                                      <span class="value">{{charts.total}}</span>
                                                      <span>座</span>
                                                    </div>
                                                </el-col>
                                                <el-col :span="8" class="inline-data" v-if="charts.volumeShow !== false">
                                                    <span>容量</span>
                                                    <span class="value">{{charts.volume}}</span>
                                                    <span>MVA</span>
                                                </el-col>
                                            </el-row>
                                            <el-row style="height:calc(100% - 92px)">
                                                <el-col :span="14" class="leftChart" style="height:100%">
                                                    <SnxPEcharts @echartsClick="tableView" :echartObj="charts.chartsData.bar" echartWidth="100%" echartHeight="calc(100%)" :resizeEcharts="resizeEcharts" ></SnxPEcharts>
                                                </el-col>
                                                <el-col :span="10" class="rightChart" style="height:100%">
                                                    <span class="pieTitle">投运年限</span>
                                                    <SnxPEcharts :echartObj="charts.chartsData.pie" echartWidth="100%" echartHeight="calc(100%)" :resizeEcharts="resizeEcharts" ></SnxPEcharts>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="配电变压器" name="second">
                            <div class="tab-content" v-if="SecondData && tabActiveName == 'second'">
                                <el-row>
                                    <el-col :span="24" style="margin-left: 10px;margin-bottom: 10px">
                                        <el-col :span="5" class="inline-data">
                                            <span>总数</span>
                                            <span class="value">{{SecondData.total}}</span>
                                            <span>台</span>
                                        </el-col>
                                        <el-col :span="5" class="inline-data">
                                            <span>容量</span>
                                            <span class="value">{{SecondData.volume}}</span>
                                            <span>MVA</span>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="charts-list" style="height:calc(100vh - 174px)">
                                        <el-col :span="24" class="charts-item" style="height:33.33%; margin: 0px 10px" v-for="(charts, index) in SecondData.data" :key=index>
                                            <div class="charts-title">
                                                <i class="el-icon-s-operation"></i>
                                                {{charts.title}}
                                            </div>
                                            <el-row class="charts-inline-data">
                                                <el-col :span="2" class="inline-data">
                                                  <div @click="totalClickHandle(1, index)">
                                                    <span>总数</span>
                                                    <span class="value">{{charts.total}}</span>
                                                    <span>台</span>
                                                  </div>
                                                </el-col>
                                                <el-col :span="4" class="inline-data">
                                                    <span>容量</span>
                                                    <span class="value">{{charts.volume}}</span>
                                                    <span>MVA</span>
                                                </el-col>
                                            </el-row>
                                            <el-row style="height:calc(100% - 60px)">
                                                <el-col :span="16" class="leftChart" style="height:100%">
                                                    <SnxPEcharts @echartsClick="tableView" :echartObj="charts.chartsData.bar" echartWidth="100%" echartHeight="calc(100%)"></SnxPEcharts>
                                                </el-col>
                                                <el-col :span="8" class="rightChart" style="height:100%">
                                                    <span class="pieTitle">投运年限</span>
                                                    <SnxPEcharts :echartObj="charts.chartsData.pie" echartWidth="100%" echartHeight="calc(100%)"></SnxPEcharts>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="线路与分支箱" name="third">
                            <div class="tab-content" v-if="ThirdData && tabActiveName == 'third'">
                                <el-row>
                                    <el-col :span="24" class="charts-list" style="height:calc(100vh - 145px)">
                                        <el-col :span="24" class="charts-item" style="height:33.33%; margin: 0px 10px" v-for="(charts, index) in ThirdData.data" :key=index>
                                            <div class="charts-title">
                                                <i class="el-icon-s-operation"></i>
                                                {{charts.title}}
                                            </div>
                                            <el-row class="padding-top-15" style="height:calc(100% - 30px)">
                                                <el-col :span="16" class="leftChart" style="height:100%">
                                                    <SnxPEcharts @echartsClick="tableView" :echartObj="charts.chartsData.bar" echartWidth="100%" echartHeight="calc(100%)"></SnxPEcharts>
                                                </el-col>
                                                <el-col :span="8" class="rightChart" style="height:100%">
                                                    <span class="pieTitle">投运年限</span>
                                                    <SnxPEcharts :echartObj="charts.chartsData.pie" echartWidth="100%" echartHeight="calc(100%)"></SnxPEcharts>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="用户表箱与用户" name="fourth">
                            <div class="tab-content" v-if="tabActiveName == 'fourth'">
                                <el-row >
                                    <el-col :span="24" class="charts-list" style="height:calc((100vh - 155px) / 2);padding: 10px 0;" v-if="FifthData">
                                        <el-col :span="12" class="charts-item" style="height:100%;" v-for="(charts, index) in FifthData.data" :key=index>
                                            <div class="charts-title">
                                                <i class="el-icon-s-operation"></i>
                                                {{charts.title}}
                                            </div>
                                            <el-row class="charts-inline-data">
                                                <el-col :span="6" class="inline-data">
                                                    <div>
                                                      <span>总数</span>
                                                      <span class="value">{{charts.total}}</span>
                                                      <span>台</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row style="align-self: center">
                                                <el-col :span="14" class="leftChart" style="padding-top: 55px;">
                                                    <el-col style="padding-top: 0px;padding-left: 10px;" v-if="index === 0">
                                                        <span style="padding-left: 5px;margin: 0px 0 0 0;display: inline-block;width: 60px;height: 17px;color: #999999;">{{charts.chartsData.bar1.series[0].name}}</span>
                                                        <SnxPEcharts @echartsClick="tableView2" :echartObj="charts.chartsData.bar1" echartWidth="100%" echartHeight="35%" ></SnxPEcharts>
                                                        <span style="padding-left: 5px;margin: 0px 0 0 0;display: inline-block;width: 60px;height: 17px;color: #999999;">{{charts.chartsData.bar2.series[0].name}}</span>
                                                        <SnxPEcharts @echartsClick="tableView2" :echartObj="charts.chartsData.bar2" echartWidth="100%" echartHeight="35%" ></SnxPEcharts>
                                                    </el-col>
                                                    <el-col style="padding-top: 0px;padding-left: 10px;" v-if="index === 1">
                                                        <span style="padding-left: 5px;margin: 0px 0 0 0;display: inline-block;width: 70px;height: 17px;color: #999999;">{{charts.chartsData.bar3.series[0].name}}</span>
                                                        <SnxPEcharts @echartsClick="tableView3" :echartObj="charts.chartsData.bar3" echartWidth="100%" echartHeight="35%" ></SnxPEcharts>
                                                        <span style="padding-left: 5px;margin: 0px 0 0 0;display: inline-block;width: 70px;height: 17px;color: #999999;">{{charts.chartsData.bar4.series[0].name}}</span>
                                                        <SnxPEcharts @echartsClick="tableView3" :echartObj="charts.chartsData.bar4" echartWidth="100%" echartHeight="35%" ></SnxPEcharts>
                                                    </el-col>
                                                </el-col>
                                                <el-col :span="10" class="rightChart">
                                                    <span class="pieTitle">投运年限</span>
                                                    <SnxPEcharts :echartObj="charts.chartsData.pie" echartWidth="100%" echartHeight="300px"></SnxPEcharts>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-col>
                                </el-row>
                                <el-row  v-if="SixthData">
                                  <el-col :span="24" class="charts-list" style="height:calc((100vh - 155px) / 2)">
                                    <el-col :span="24" class="charts-item" style="height:100%;" v-for="(chartsb, index) in SixthData.data" :key=index>
                                      <div class="charts-title">
                                        <i class="el-icon-s-operation"></i>
                                        {{chartsb.title}}
                                      </div>
                                      <el-row style="height:100%;">
                                        <el-col :span="24" class="rightChart" style="height:100%;">
                                          <el-col :span="4" style="text-align: center;margin-top: 10rem;" class="inline-data">
                                            <div>总数</div>
                                            <div class="value" style="margin-top: 20px">{{chartsb.total}}</div>
                                          </el-col>
                                          <el-col :span="20" class="inline-data" style="height:100%;">
                                            <SnxPEcharts :echartObj="chartsb.chartsData.pie" echartWidth="100%" echartHeight="100%"></SnxPEcharts>
                                            <el-col :span="24" style="padding-bottom: 50px; height:100%;">
                                              <el-col :span="8" v-for="(item, itemIndex) in chartsb.chartsData.pie.series" :key="itemIndex" style="text-align: center;padding-top: -30px; height:100%;">
                                                <span style="padding-right: 15px">{{item.name}}</span>
                                              </el-col>
                                            </el-col>
                                          </el-col>
                                        </el-col>
                                      </el-row>
                                    </el-col>
                                  </el-col>
                                </el-row>
                              </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
        <!--弹窗-->
        <popup v-if="tablePopupConfig.show" :config="tablePopupConfig" @close="closePopup('tablePopupConfig')"  class="equipPopup">
            <div slot="popup-data" class="popupContent">
                <div class="data-wrap" style="padding: 15px;">
                    <div class="param-wrap">
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
                        <cuTable :tableHeaders="tableHeaders" :allDatas="allDatas" :formatterVal="formatterVal"></cuTable>
                    </div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
import SnxPEcharts from '@/components/snxp-echarts'
import ElCol from "element-ui/packages/col/src/col";
import popup from '@/components/snxp-popup'
import cuTable from '@/components/snxp-table'
import request from '@/utils/request'
import apiPath from '@/api/apiPath'
import { formatterVal, tab1GroupHeaders, tab2GroupHeaders, tab2GroupHeaders2, tab3GroupHeaders, tab3GroupHeaders3} from './staticData'
import { groupHeaders2} from '@/page/watchEquip/staticData'
export default {
    name: "equipChartsVue",
    components: {
        ElCol,
        SnxPEcharts,
        popup,
        cuTable
    },
    data() {
        return {
            SSGS: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
            tab1Group:{0: {"code": "zf04", "name": "开关站"}, 1: {"code": "zf06", "name": "配电室"}, 2: {"code": "zf08", "name": "箱式变电站"}, 3: {"code": "zf07", "name": "环网柜"}},
            tab2Group:{0: {"apiPath": "SN_ZSBYQTJ", "name": "柱上变压器", "BYQLX": "3"}, 1: {"apiPath": "SN_PDBYQTJ", "name": "箱式变压器", "BYQLX": "1"}, 2: {"apiPath": null, "name": "站房类变压器", "BYQLX": "2"}},
            tab3Group:{0: {"JSFS": "1"}, 1:{"JSFS": "3"}},
            tab4Group:{0: {"code": "zf09", "name": "分支箱"}},
            formatterVal: formatterVal,
            input: '',
            currentPage: 2,
            tabActiveName: 'first',
            params: {
                month: new Date().getFullYear() + '-' + ((new Date().getMonth() > 8) ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1)))
            },
            currentDate: (new Date().getFullYear() + '-' + ((new Date().getMonth() > 8) ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1))) +
                          "-" + (new Date().getDate() > 9 ? new Date().getDate() : "0"+new Date().getDate())),
            allDatas: [],
            tableHeaders: [],
            tableHeadersEachas:{},
            returnData: null,
            SecondData: null,
            SecondDataIsInit: false,
            ThirdData: null,
            FourthData: null,
            FifthData: null,
            SixthData: null,
            max:500,
            tablePopupConfig: {
                show: false,
                title: '配网概况详情'
            },
            dropdownData:[],
            tableData: [],
            resizeEcharts: false
        }
    },
    // 首次加载
    mounted() {
        const _this = this;
        window.onresize = function () {
          this.resizeEcharts = !this.resizeEcharts
        }
//        const href = window.location.href;
//        if(href && href.toLowerCase().indexOf("equipcharts") > -1){
          const dataZoomEnd = 100;
          this.returnData = {
            total: "0",
            volume: "0",
            data: [
              {
                title: '开关站',
                total: "--",
                volume: "--",
                chartsData: {
                  bar: {
                    tooltip : {
                      trigger: 'axis',
//                      formatter: '{b0}<br/>{a0}：{c0}<br/> {a1}：{c1} MVA'
                    },
                    toolbox: {
                      show : false
                    },
                    calculable : true,
                    legend: {
                      data:['数量','容量']
                    },
                    grid:{
                      y:'10%',
                      height:'60%',
                      width: '75%'
//                      right: '12%',
                    },
                    dataZoom: [
                      {
                        type: 'slider',
                        show: true,
                        height: 8,
                        bottom: 10,
                        background: '#339fff',
                        start: 0,
                        end: dataZoomEnd,
                        handleSize: 0,
                        fillerColor: '#0099FF',
                        backgroundColor: '#fff',
                        showDataShadow: false,
                        showDetail: false,
                        filterMode: 'filter'
                      },
                      {
                        type: 'inside',
                        show: true,
                        start: 0,
                        end: 100,
                        backgroundColor: '#0099FF'
                      }
                    ],
                    xAxis : [
                      {
                        type : 'category',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        axisLabel: {
                          interval:0,
                          rotate:40
                        },
                        data : ['变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站', '变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站']
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value',
                        name : '座',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      },
                      {
                        type : 'value',
                        name : 'MVA',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      }
                    ],
                    series : [
                      {
                        name:'数量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#27b7bb'
                          }
                        },
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      },
                      {
                        name:'容量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#f55a36'
                          }
                        },
                        smooth: false,
                        yAxisIndex: 1,
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                    ]
                  },
                  pie: {
                    title: {
                      text: '单位：年',
                      x: 'center',
                      y: 'center',
                      textStyle : {
                        color : 'rgba(153,153,153,1)',
                        fontFamily : '微软雅黑',
                        fontSize : 14,
                        fontWeight : 'Regular'
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                      {
                        name:'投运年限',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: '{c}\n{b}'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data:[
                          {value: 0, name: '0-5年'},
                          {value: 0, name:'5-10年'},
                          {value: 0, name:'10-15年'},
                          {value: 0, name:'15-20年'},
                          {value: 0, name:'20年以上'}
                        ]
                      }
                    ]
                  }
                }
              },
              {
                title: '配电室',
                total: "--",
                volume: "--",
                chartsData: {
                  bar: {
                    tooltip : {
                      trigger: 'axis'
                    },
                    toolbox: {
                      show : false
                    },
                    calculable : true,
                    legend: {
                      data:['数量','容量']
                    },
                    grid:{
                      y:'10%',
                      height:'60%',
                      width: '75%'
                    },
                    dataZoom: [
                      {
                        type: 'slider',
                        show: true,
                        height: 8,
                        bottom: 10,
                        background: '#339fff',
                        start: 0,
                        end: dataZoomEnd,
                        handleSize: 0,
                        fillerColor: '#0099FF',
                        backgroundColor: '#fff',
                        showDataShadow: false,
                        showDetail: false,
                        filterMode: 'filter'
                      },
                      {
                        type: 'inside',
                        show: true,
                        start: 0,
                        end: 100,
                        backgroundColor: '#0099FF'
                      }
                    ],
                    xAxis : [
                      {
                        type : 'category',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        axisLabel: {
                          interval:0,
                          rotate:40
                        },
                        data : ['变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站', '变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站']
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value',
                        name : '座',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      },
                      {
                        type : 'value',
                        name : 'MVA',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      }
                    ],
                    series : [
                      {
                        name:'数量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#4394e9'
                          }
                        },
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      },
                      {
                        name:'容量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#f55a36'
                          }
                        },
                        smooth: false,
                        yAxisIndex: 1,
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                    ]
                  },
                  pie: {
                    title: {
                      text: '单位：年',
                      x: 'center',
                      y: 'center',
                      textStyle : {
                        color : 'rgba(153,153,153,1)',
                        fontFamily : '微软雅黑',
                        fontSize : 14,
                        fontWeight : 'Regular'
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                      {
                        name:'投运年限',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: '{c}\n{b}'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data:[
                          {value: 0, name: '0-5年'},
                          {value: 0, name:'5-10年'},
                          {value: 0, name:'10-15年'},
                          {value: 0, name:'15-20年'},
                          {value: 0, name:'20年以上'}
                        ]
                      }
                    ]
                  }
                }
              },
              {
                title: '箱式变电站',
                total: "--",
                volume: "--",
                chartsData: {
                  bar: {
                    tooltip : {
                      trigger: 'axis'
                    },
                    toolbox: {
                      show : false
                    },
                    calculable : true,
                    legend: {
                      data:['数量','容量']
                    },
                    grid:{
                      y:'10%',
                      height:'60%',
                      width: '75%'
//                      right: '18%'
                    },
                    dataZoom: [
                      {
                        type: 'slider',
                        show: true,
                        height: 8,
                        bottom: 10,
                        background: '#339fff',
                        start: 0,
                        end: dataZoomEnd,
                        handleSize: 0,
                        fillerColor: '#0099FF',
                        backgroundColor: '#fff',
                        showDataShadow: false,
                        showDetail: false,
                        filterMode: 'filter'
                      },
                      {
                        type: 'inside',
                        show: true,
                        start: 0,
                        end: 100,
                        backgroundColor: '#0099FF'
                      }
                    ],
                    xAxis : [
                      {
                        type : 'category',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        axisLabel: {
                          interval:0,
                          rotate:40
                        },
                        data : ['变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站', '变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站']
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value',
                        name : '座',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      },
                      {
                        type : 'value',
                        name : 'MVA',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      }
                    ],
                    series : [
                      {
                        name:'数量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#fece28'
                          }
                        },
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      },
                      {
                        name:'容量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#f55a36'
                          }
                        },
                        smooth: false,
                        yAxisIndex: 1,
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      }
                    ]
                  },
                  pie: {
                    title: {
                      text: '单位：年',
                      x: 'center',
                      y: 'center',
                      textStyle : {
                        color : 'rgba(153,153,153,1)',
                        fontFamily : '微软雅黑',
                        fontSize : 14,
                        fontWeight : 'Regular'
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                      {
                        name:'投运年限',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: '{c}\n{b}'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data:[
                          {value: 0, name: '0-5年'},
                          {value: 0, name:'5-10年'},
                          {value: 0, name:'10-15年'},
                          {value: 0, name:'15-20年'},
                          {value: 0, name:'20年以上'}
                        ]
                      }
                    ]
                  }
                }
              },
              {
                title: '环网柜',
                total: "--",
                volume: "--",
                volumeShow: false,
                chartsData: {
                  bar: {
                    tooltip : {
                      trigger: 'axis'
                    },
                    toolbox: {
                      show : false
                    },
                    calculable : true,
                    legend: {
                      data:['数量']
                    },
                    grid:{
                      y:'10%',
                      height:'60%',
                      width: '75%'
                    },
                    dataZoom: [
                      {
                        type: 'slider',
                        show: true,
                        height: 8,
                        bottom: 10,
                        background: '#339fff',
                        start: 0,
                        end: dataZoomEnd,
                        handleSize: 0,
                        fillerColor: '#0099FF',
                        backgroundColor: '#fff',
                        showDataShadow: false,
                        showDetail: false,
                        filterMode: 'filter'
                      },
                      {
                        type: 'inside',
                        show: true,
                        start: 0,
                        end: 100,
                        backgroundColor: '#0099FF'
                      }
                    ],
                    xAxis : [
                      {
                        type : 'category',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        axisLabel: {
                          interval:0,
                          rotate:40
                        },
                        data : ['变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站', '变电中心一站','变电中心五站','配电运检一组','配电运检二组','变电中心三站']
                      }
                    ],
                    yAxis : [
                      {
                        type : 'value',
                        name : '座',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      },
                      {
                        type : 'value',
                        name : '',
                        axisLine: {
                          color: '#949494',
                          lineStyle: {
                            color: '#949494'
                          }
                        },
                        nameTextStyle: {
                          color: '#949494'
                        },
                        splitLine: {
                          lineStyle: {
                            color: 'transparent'
                          }
                        },
                        axisLabel : {
                          formatter: '{value}'
                        }
                      }
                    ],
                    series : [
                      {
                        name:'数量',
                        type:'bar',
                        itemStyle: {
                          normal: {
                            color: '#fe9c28'
                          }
                        },
                        barWidth: '12px',
                        data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                      },
                      // {
                      //   name:'容量',
                      //   type:'line',
                      //   itemStyle: {
                      //     normal: {
                      //       color: '#f55a36'
                      //     }
                      //   },
                      //   smooth: false,
                      //   yAxisIndex: 1,
                      //   data:[0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0]
                      // }
                    ]
                  },
                  pie: {
                    title: {
                      text: '单位：年',
                      x: 'center',
                      y: 'center',
                      textStyle : {
                        color : 'rgba(153,153,153,1)',
                        fontFamily : '微软雅黑',
                        fontSize : 14,
                        fontWeight : 'Regular'
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                      {
                        name:'投运年限',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                          normal: {
                            formatter: '{c}\n{b}'
                          }
                        },
                        itemStyle: {
                          normal: {
                            color:function(params) {
                              // 自定义颜色
                              var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                              return colorList[params.dataIndex]
                            }
                          }
                        },
                        data:[
                          {value: 0, name: '0-5年'},
                          {value: 0, name:'5-10年'},
                          {value: 0, name:'10-15年'},
                          {value: 0, name:'15-20年'},
                          {value: 0, name:'20年以上'}
                        ]
                      }
                    ]
                  }
                }
              }
            ]
          }
          //代码取消发送请求， 前端进行 相加操作
//          this.loadCount(null);
          this.loadTab1Group(null, 0);
          this.loadTab1Group(null, 1);
          this.loadTab1Group(null, 2);
          this.loadTab1Group(null, 3);
//        }
    },
    methods: {
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
        //总数，容量
        loadCount(params){
          params = params || {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05"};
          // console.log("res", apiPath.SN_BDZTJ);
          request({
            url: apiPath.SN_BDZTJ,
            method: 'get',
            params: params
          }).then(res => {
            // console.log("loadCount-", res);
            let resData = res.data[0];
            this.returnData.total = resData.SL;
            this.returnData.volume = resData.ZRL;
          })
        },
        //站点设备
        async loadTab1Group(params, index){
            params = params || {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",};
            params.DZLX = this.tab1Group[index].code;

          //饼状图 数据
          request({
            url: apiPath.SN_BDZNXTJ,
            method: 'get',
            params: params
          }).then(res => {
            // console.log("饼状图 数据-"+index, res);
            if(res.data && res.data.length > 0){
              let data = res.data[0];
              let pieSeries0 = [
                {value: data.NX1, name: '0-5年'},
                {value: data.NX2, name:'5-10年'},
                {value: data.NX3, name:'10-15年'},
                {value: data.NX4, name:'15-20年'},
                {value: data.NX5, name:'20年以上'}
              ];
              let rData = this.returnData.data[index];
              let pie = rData.chartsData.pie;
              pie.series[0].data = pieSeries0;
            }
          })
          // 柱状图 数量数据
          let bar1 = request({
              url: apiPath.SN_DZLBTJ,
              method: 'get',
              params: params
            });
          // 柱状图 容量数据
          let bar1Line = request({
            url: apiPath.SN_BZRLTJ,
            method: 'get',
            params: params
          });
          Promise.all([bar1, bar1Line]).then(ress => {
              if(ress && ress.length > 0){
                let res = ress[0];
                let res2 = ress[1] && ress[1].data && ress[1].data.length > 0 ? ress[1].data : [];
                if(res.data && res.data.length > 0){
                  let barXAxisData = [];
                  let barSeries0 = [];
                  let barSeries1 = [];
                  let total = 0;
                  res.data.forEach(item => {
                    let SL = item.SL;
                    barXAxisData.push(item.WHBZMC);

                    barSeries0.push({"value": SL, "WHBZ": item.WHBZ, "index": index, "tabIndex": 0});

                    if(SL && !isNaN(SL*1)){
                      total = total*1 + SL*1;
                    }
                    let flag = false;
                    for(let i=0; i<res2.length; i++){
                      let item2 = res2[i];
                      if(item.WHBZMC === item2.WHBZMC){
                        barSeries1.push({"value": item2.BZRL, "WHBZ": item2.WHBZ, "index": index, "tabIndex": 0});
                        flag = true;
                        break;
                      }
                    }
                    if(!flag) barSeries1.push(0);
                  })
                  let rData = this.returnData.data[index];
                  let bar = rData.chartsData.bar;
                  bar.xAxis[0].data = barXAxisData;
                  bar.series[0].data = barSeries0;
                  bar.series[1] && (bar.series[1].data = barSeries1);
                  rData.total = total;
                  if(!isNaN(total*1)){
                    this.returnData.total = this.returnData.total*1 + total*1
                  }
                }
              }

          })

          //柱状图 数据
          // request({
            // url: apiPath.SN_DZLBTJ,
            // method: 'get',
            // params: params
          // }).then(res => {
            // console.log("柱状图 数据-"+index, res);
          // })

          //4个单元格 容量
          request({
            url: apiPath.SN_BDZRLTJ,
            method: 'get',
            params: params
          }).then(res => {
            // console.log("4个单元格 容量-"+index, res);
            if(res.data && res.data.length > 0){
              let resData = res.data[0];
              let rData = this.returnData.data[index];
              // rData.total = total;
              rData.volume = resData.RL;
              if(!isNaN(resData.RL*1)){
                this.returnData.volume = this.returnData.volume*1 + resData.RL*1
              }
            }
          })
        },
        //配电变压器
        loadTab2Group(params, index){
            // if(!this.SecondDataIsInit){
                params = params || {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05"}
                if(index === 0) this.SecondDataIsInit = true;
                //这个总数 容量 只需要初始化一次
                let SecondData = this.SecondData;
                if(index === 0){
                  //柱上变压器，箱式变压器总数 容量
                  request({
                    url: apiPath.SN_PDBYQSLTJ,
                    method: 'get',
                    params: params
                  }).then(res => {
                  // console.log("柱上变压器，箱式变压器总数 容量-"+index, res);
                    if(res.data && res.data.length > 0){
                      let xAxisData1 = [];
                      let xAxisData2 = [];
                      let xAxisData3 = [];

                      let barSeries11 = [];
                      let barSeries12 = [];

                      let barSeries21 = [];
                      let barSeries22 = [];

                      let barSeries31 = [];
                      let barSeries32 = [];

                      let WHBZMC1 = [];
                      let WHBZMC2 = [];
                      let WHBZMC3 = [];
                      res.data.forEach(item => {
                          let filterWHBZMC1 = WHBZMC1.filter(f => f.WHBZ1 === item.WHBZ1);
                          let filterWHBZMC2 = WHBZMC2.filter(f => f.WHBZ2 === item.WHBZ2);
                          let filterWHBZMC3 = WHBZMC3.filter(f => f.WHBZ3 === item.WHBZ3);
                          if(filterWHBZMC1.length === 0){
                            WHBZMC1.push(item);
                          }
                          if(filterWHBZMC2.length === 0){
                            WHBZMC2.push(item);
                          }
                          if(filterWHBZMC3.length === 0){
                            WHBZMC3.push(item);
                          }
                      })
                      // console.log("WHBZMC1", WHBZMC1)
                      // console.log("WHBZMC2", WHBZMC2)
                      // console.log("WHBZMC3", WHBZMC3)

                      WHBZMC1.forEach(item => {
                        const WHBZMC1 = item.WHBZMC1;
                        xAxisData1.push(WHBZMC1);
                        const SL1 = item.SL1 || 0;
                        const RL1 = item.RL1 || 0;
                        barSeries11.push({"value": SL1, "WHBZ": item.WHBZ1, "tabIndex": 1, "index": 0});
                        barSeries12.push({"value": RL1, "WHBZ": item.WHBZ1, "tabIndex": 1, "index": 0});

                      })
                      WHBZMC2.forEach(item => {
                        const WHBZMC2 = item.WHBZMC2;
                        xAxisData2.push(WHBZMC2);
                        const SL2 = item.SL2 || 0;
                        const RL2 = item.RL2 || 0;
                        barSeries21.push({"value": SL2, "WHBZ": item.WHBZ2, "tabIndex": 1, "index": 1});
                        barSeries22.push({"value": RL2, "WHBZ": item.WHBZ2, "tabIndex": 1, "index": 1});

                      })
                      WHBZMC3.forEach(item => {
                        const WHBZMC3 = item.WHBZMC3;
                        xAxisData3.push(WHBZMC3);
                        const SL3 = item.SL3 || 0;
                        const RL3= item.RL3 || 0;
                        barSeries31.push({"value": SL3, "WHBZ": item.WHBZ3, "tabIndex": 1, "index": 2});
                        barSeries32.push({"value": RL3, "WHBZ": item.WHBZ3, "tabIndex": 1, "index": 2});

                      })
                      let sData1 = SecondData.data[2].chartsData.bar;
                      let sData2 = SecondData.data[1].chartsData.bar;
                      let sData3 = SecondData.data[0].chartsData.bar;

                      sData1.xAxis[0].data = xAxisData1;
                      sData2.xAxis[0].data = xAxisData2;
                      sData3.xAxis[0].data = xAxisData3;
                      sData1.series[0].data = barSeries11;
                      sData1.series[1].data = barSeries12;
                      sData2.series[0].data = barSeries21;
                      sData2.series[1].data = barSeries22;
                      sData3.series[0].data = barSeries31;
                      sData3.series[1].data = barSeries32;

                      sData1 = SecondData.data[2];
                      sData2 = SecondData.data[1];
                      sData3 = SecondData.data[0];

                      let sData1Title = sData3.title;
                      sData3.title = sData1.title;
                      sData1.title = sData1Title;

                      const getSum = (arrays) => {
                        let v = 0;
                        arrays.forEach(item => {
                          if(item.value){
                            v = v*1 + item.value*1
                          }
                        })
                        return v;
                      }
                      sData1.total = getSum(barSeries11);
                      sData1.volume = getSum(barSeries12);
                      sData2.total = getSum(barSeries21);
                      sData2.volume = getSum(barSeries22);
                      sData3.total = getSum(barSeries31);
                      sData3.volume = getSum(barSeries32);
                      SecondData.total = sData1.total*1 + sData2.total*1 + sData3.total*1;
                      SecondData.volume = sData1.volume*1 + sData2.volume*1 + sData3.volume*1;

                    }
                  })

                }

                params.BYQLX = this.tab2Group[index].BYQLX;
                //配电变压器 饼表
                request({
                  url: apiPath.SN_BYQNXTJ,
                  method: 'get',
                  params: params
                }).then(res => {
                  // console.log("饼状图 数据-"+index, res);
                  if(res.data && res.data.length > 0){
                    let data = res.data[0];
                    let pieSeries0 = [
                      {value: data.NX1, name: '0-5年'},
                      {value: data.NX2, name:'5-10年'},
                      {value: data.NX3, name:'10-15年'},
                      {value: data.NX4, name:'15-20年'},
                      {value: data.NX5, name:'20年以上'}
                    ];
                    let rData = SecondData.data[index];
                    let pie = rData.chartsData.pie;
                    pie.series[0].data = pieSeries0;
                  }
                })

            // }
        },
        // 线路
        loadTab3Group(params, index){
            params = params || {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05"};
            let ThirdData = this.ThirdData;
            //分支箱 加载
            if(index === 2){
              request({
                url: apiPath.SN_BDZNXTJ,
                method: 'get',
                params: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "DZLX": "zf09"}
              }).then(res => {
                if(res.data && res.data.length > 0){
                  let data = res.data[0];
                  let pieSeries0 = [
                    {value: data.NX1, name: '0-5年'},
                    {value: data.NX2, name:'5-10年'},
                    {value: data.NX3, name:'10-15年'},
                    {value: data.NX4, name:'15-20年'},
                    {value: data.NX5, name:'20年以上'}
                  ];
                  let pie = this.ThirdData.data[index].chartsData.pie;
                  pie.series[0].data = pieSeries0;
                }
              })
              // 柱状图 数量数据
              let bar1 = request({
                url: apiPath.SN_DZLBTJ,
                method: 'get',
                params: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "DZLX": "zf09"}
              });
              // 柱状图 容量数据
              let bar1Line = request({
                url: apiPath.SN_BZRLTJ,
                method: 'get',
                params: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "DZLX": "zf09"}
              });
              Promise.all([bar1, bar1Line]).then(ress => {
                if(ress && ress.length > 0){
                  let res = ress[0];
                  let res2 = ress[1] && ress[1].data && ress[1].data.length > 0 ? ress[1].data : null;
                  if(res.data && res.data.length > 0){
                    let barXAxisData = [];
                    let barSeries0 = [];
                    let barSeries1 = [];
                    let total = 0;
                    res.data.forEach(item => {
                      let SL = item.SL;
                      barXAxisData.push(item.WHBZMC);

                      barSeries0.push({"value": SL, "WHBZ": item.WHBZ, "index": 0, "tabIndex": 3});

                      if(SL && !isNaN(SL*1)){
                        total = total*1 + SL*1;
                      }
                      if (res2) {
                        let flag = false;
                        for(let i=0; i<res2.length; i++){
                          let item2 = res2[i];
                          if(item.WHBZMC === item2.WHBZMC){
                            barSeries1.push({"value": item2.BZRL, "WHBZ": item2.WHBZ, "index": 0, "tabIndex": 3});
                            flag = true;
                            break;
                          }
                        }
                        if(!flag) barSeries1.push(0);
                      } else {
                        barSeries1.push(0);
                      }
                    })
                    let rData = this.ThirdData.data[index];
                    let bar = rData.chartsData.bar;
                    bar.xAxis[0].data = barXAxisData;
                    bar.series[0].data = barSeries0;
                    bar.series[1].data = barSeries1;
                    rData.total = total;
                  }
                }
              });
              return
            }

            if(index === 0){
              request({
                url: apiPath.SN_DYXLBZTJ,
                method: 'get',
                params: params
              }).then(res => {
                if(res && res.data && res.data.length){
                  let barXAxisData = [];
                  let barXAxisData2 = [];
                  let barSeries0 = [];
                  let barSeries1 = [];
                  res.data.forEach(item => {
                    if(item.DYDJ === "08"){
                      //架空
                      if(item.JSFS === "1"){
                        // let SL = item.SL;
                        let JKXLCD = item.JKXLCD;
                        barSeries0.push({"value": JKXLCD, "WHBZ": item.WHBZ, "tabIndex": 2, "index": 0});
                        if(item.WHBZMC){
                            barXAxisData.push(item.WHBZMC);
                        }
                        
                      }else if(item.JSFS === "3"){
                        let DLXLCD = item.DLXLCD;
                        barSeries1.push({"value": DLXLCD, "WHBZ": item.WHBZ, "tabIndex": 2, "index": 1});
                         if(item.WHBZMC){
                           barXAxisData2.push(item.WHBZMC);
                        }
                        
                      }
                    }
                  });
                  let bar = ThirdData.data[0].chartsData.bar;
                  bar.xAxis[0].data = barXAxisData;
                  bar.series[0].data = barSeries0;
                  bar = ThirdData.data[1].chartsData.bar;
                  bar.xAxis[0].data = barXAxisData2;
                  bar.series[0].data = barSeries1;
                }
              })
            }
            // 配电变压器 饼表
            request({
              url: apiPath.SN_XLNXTJ,
              method: 'get',
              params: {...params, "JSFS": this.tab3Group[index].JSFS}
            }).then(res => {
              let pieSeries0 = [];
              if(res.data && res.data.length > 0){
                let data = res.data[0];
                pieSeries0 = [
                  {value: data.NX1, name: '0-5年'},
                  {value: data.NX2, name:'5-10年'},
                  {value: data.NX3, name:'10-15年'},
                  {value: data.NX4, name:'15-20年'},
                  {value: data.NX5, name:'20年以上'}
                ];
              }else{
                pieSeries0 = [
                  {value: 0, name: '0-5年'},
                  {value: 0, name:'5-10年'},
                  {value: 0, name:'10-15年'},
                  {value: 0, name:'15-20年'},
                  {value: 0, name:'20年以上'}
                ]
              }
              let rData = ThirdData.data[index];
              let pie = rData.chartsData.pie;
              pie.series[0].data = pieSeries0;
            })
        },
        // 分支箱与用户
        loadTab4Group(params, index){
          params = params || {date: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05"}};
          // 用户表箱
          let yhbx1 = request({
            url: apiPath.MEAS_BOX_STAT,
            method:'get',
            params:{"org_no": "31402"}
            // params:{"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "ORG_NO": "31102","METETR_TYPE":0,"DATA_DATE":this.params.month}
          });
          let date = this.currentDate
          let preDate = this.getPerviousDay();

          let yhbx2 = request({
            url: apiPath.METER_STAT,
            method:'get',
            params:{"org_no": "31402",'meter_type':0,'data_date': preDate}
          });
          let yhbx3 = request({
            url: apiPath.METER_STAT,
            method:'get',
            params:{"org_no": "31402",'meter_type':1,'data_date': preDate}
          });

          Promise.all([yhbx1, yhbx2, yhbx3]).then(ress => {
           const FifthData = this.FifthData.data[0];
           let total = 0;
           let total2 = 0;
           let res1 = ress[0];
           let res2 = ress[1];
           let res3 = ress[2];
//           console.log("ress", ress)
           if(res1 && res1.data.length > 0){
             res1 = res1.data[0];  
             let bar11 = FifthData.chartsData.bar1;
             bar11.series[0].data = [res1.MEAS_BOX_TG_NUM || 0];

             let bar22 = FifthData.chartsData.bar2;
             bar22.series[0].data = [res1.MEAS_BOX_CONS_NUM || 0];
             total = total*1 + bar11.series[0].data*1 + bar22.series[0].data*1;
           }
            const FifthData2 = this.FifthData.data[1];
           if(res2 && res2.data.length > 0){
             res2 = res2.data[0];
             let bar33 = FifthData2.chartsData.bar3;
             bar33.series[0].data = [{"value": res2.METER_INSTALL_NUM, "meter_type": "0"} || {value: 0}];
             total2 = total2*1 + bar33.series[0].data[0].value*1;
           }
           if(res3 && res3.data.length > 0){
             res3 = res3.data[0];
             let bar44 = FifthData2.chartsData.bar4;
             bar44.series[0].data = [{"value": res3.METER_INSTALL_NUM, "meter_type": "1"} || {value: 0}];
             total2 = total2*1 + bar44.series[0].data[0].value*1;
           }
            FifthData.total = total;
            FifthData2.total = total2;
          });

            // 用户
            let SixthData = this.SixthData.data[0];

            let tenKvReq = request({
              url: apiPath.SN_YHFLTJ,
              method: 'get',
              params: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "YHLX": "01", "DYDJ": "22"}
            });
            // 低压居民
            // params.YHLX = "04";
            // params.DYDJ = "08";
            let dyyh = request({
              url: apiPath.SN_YHFLTJ,
              method: 'get',
              params: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "YHLX": "04", "DYDJ": "08"}
            });
            // 低压非用户
            // params.YHLX = "03";
            // params.DYDJ = "08";
            let dyfyh = request({
              url: apiPath.SN_YHFLTJ,
              method: 'get',
              params: {"SSGS": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05", "YHLX": "03", "DYDJ": "08"}
            });

            Promise.all([tenKvReq, dyyh, dyfyh]).then(ress => {
                let res1 = ress[0];
                let res2 = ress[1];
                let res3 = ress[2];
                let total = 0;
                if(res1 && res1.data && res1.data.length){
                    res1 = res1.data[0];
                    let pie = SixthData.chartsData.pie;
                    let val = res1.SL || 0;
                    pie.series[0].data[0].value = val;
                    total = total*1 + val*1;
                }
                if(res2 && res2.data && res2.data.length){
                    res2 = res2.data[0];
                    let pie = SixthData.chartsData.pie;
                    let val = res2.SL || 0;
                    pie.series[1].data[0].value = val;
                    total = total*1 + val*1;
                }
                if(res3 && res3.data && res3.data.length){
                    res3 = res3.data[0];
                    let pie = SixthData.chartsData.pie;
                    let val = res3.SL || 0;
                    pie.series[2].data[0].value = val;
                    total = total*1 + val*1;
                }
                SixthData.total = total;
            })

        },
        // 总数点击
        totalClickHandle(tabIndex, index){
            let params = {"data": {"tabIndex": tabIndex, "index": index}};
            this.tableView(params);
        },
        // 图表点击
        tableView(p){
            if(p && p.data){
                let data = p.data;
                // 第几个页切
                let tabIndex = data.tabIndex;
                let groupData = {};
                let params = {};
                // 第几个区
                let index = data.index;
                let url = "";
                if(tabIndex === 0){
                    groupData = this.tab1Group;
                    this.tableHeaders = tab1GroupHeaders;
                    //电站类型
                    let DZLX = groupData[index].code;
                    params = {"DZLX": DZLX, "SSGS": this.SSGS}
                    url = apiPath.SN_BDZMX;
                }else if(tabIndex === 1){
                    groupData = this.tab2Group;
                    params = {"SSGS": this.SSGS}
                    if(index === 0){
                      this.tableHeaders = tab2GroupHeaders;
                      url = apiPath.SN_ZSBYQMX;
                    }else if(index === 1){
                      this.tableHeaders = tab2GroupHeaders2;
                      url = apiPath.SN_PDBYQMX;
                      // 箱式变压器
                      params.LX = 1;
                    }else{
                      this.tableHeaders = tab2GroupHeaders2;
                      url = apiPath.SN_PDBYQMX;
                      // 站房变压器
                      params.LX = 2;
                    }
                }else if(tabIndex === 2){
                    this.tableHeaders = tab3GroupHeaders;
                    url = apiPath.SN_XLMX;
                    params = {"SSGS": this.SSGS, "DYDJ": "08"}
                }else if (tabIndex === 3){
                    this.tableHeaders = tab1GroupHeaders;
                    params = {"DZLX": "zf09", "SSGS": this.SSGS}
                    url = apiPath.SN_BDZMX;
                }
                // 维护班组
                let WHBZ = data.WHBZ;
                if(WHBZ){
                  params.WHBZ = WHBZ;
                }
                request({
                  url: url,
                  method: 'get',
                  params: params
                }).then(res => {
                  if(res && res.data){
                    //this.tableData = res.data;
                    this.allDatas = res.data;
                  }else{
                    this.allDatas = [];
                  }
                })
            }
            this.tablePopupConfig.show = true;
        },
        //用户表箱与用户 用户表箱
        tableView2(p){
          this.tableHeaders = tab3GroupHeaders3;
          let params = {"org_no": "31402"}
          request({
            url: apiPath.MEAS_BOX_DET,
            method: 'get',
            params: params
          }).then(res => {
            if(res && res.data){
              //this.tableData = res.data;
              this.allDatas = res.data;
            }else{
              this.allDatas = [];
            }
          }).catch(() => {
            this.allDatas = [];
          });
          this.tablePopupConfig.show = true;
        },
       //用户表箱与用户 电表
        tableView3(p){
//            console.log("ppp", p)
//          if(!p.data.meter_type){
//              return
//          }
          this.tableHeaders = groupHeaders2;
          let params = {"org_no": "31402", "meter_type": p.data.meter_type, 'data_date': this.currentDate};
          request({
            url: apiPath.METER_STAT_DET,
            method: 'get',
            params: params
          }).then(res => {
            if(res && res.data){
              //this.tableData = res.data;
              this.allDatas = res.data;
            }else{
              this.allDatas = [];
            }
          }).catch(() => {
            this.allDatas = [];
          });
          this.tablePopupConfig.show = true;
        },
        formatterTable(row, column, cellValue, index){
          //console.log("cellValue", cellValue)
          let key = column.property;
          let header = this.tableHeadersEachas[key];
          //缓存
          if(!header){
            header = this.tableHeaders.filter(item => item.key === key);
            this.tableHeadersEachas[key] = header;
          }
          if(header && header.length){
            let constaData = this.formatterVal[header[0].fKey];
            if(constaData && constaData.length){
              for(let i=0; i<constaData.length; i++){
                let v = constaData[i];
                if(v.code == cellValue){
                  return v.text;
                }
              }
            }
            return cellValue;
          }
          return cellValue;
        },
        closePopup(config){
            this[config].show = false
        },
        handleCurrentChange(params){
          //console.log('pageNum===',params)
        },
        handleClick(tab, event) {
            const _this = this;
            this.$nextTick(() => {
                if(tab.name === 'first'){
                  _this.loadTab1Group(null, 0);
                  _this.loadTab1Group(null, 1);
                  _this.loadTab1Group(null, 2);
                  _this.loadTab1Group(null, 3);
                }else if (tab.name === 'second') {
                    let initTotalVal = "--";
                    let initVolumeVal = "--";
                    let dataZoomEnd = 100;
                    if(!_this.SecondData){
                      _this.SecondData = {
                        total: initTotalVal,
                        volume: initVolumeVal,
                        data: [
                          {
                            title: '柱上变压器',
                            total: initTotalVal,
                            volume: initVolumeVal,
                            chartsData: {
                              bar: {
                                tooltip : {
                                  trigger: 'axis'
                                },
                                grid:{
                                  y:'10%',
                                  top: '40px',
                                  height:'55%'
                                },
                                toolbox: {
                                  show : false
                                },
                                calculable : true,
                                legend: {
                                  data:['数量','容量']
                                },
                                dataZoom: [
                                  {
                                    type: 'slider',
                                    show: true,
                                    height: 8,
                                    bottom: 5,
                                    background: '#339fff',
                                    start: 0,
                                    end: dataZoomEnd,
                                    handleSize: 0,
                                    fillerColor: '#0099FF',
                                    backgroundColor: '#fff',
                                    showDataShadow: false,
                                    showDetail: false,
                                    filterMode: 'filter'
                                  },
                                  {
                                    type: 'inside',
                                    show: true,
                                    start: 0,
                                    end: 100,
                                    backgroundColor: '#0099FF'
                                  }
                                ],
                                xAxis : [
                                  {
                                    type : 'category',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    data : ['线路运检组','线路运检一组','配电运维组','配电运维二组','变电中心三站', '变电中心三站','变电中心三站']
                                  }
                                ],
                                yAxis : [
                                  {
                                    type : 'value',
                                    name : '台',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    nameTextStyle: {
                                      color: '#949494'
                                    },
                                    splitLine: {
                                      lineStyle: {
                                        color: 'transparent'
                                      }
                                    },
                                    axisLabel : {
                                      formatter: '{value}'
                                    }
                                  },
                                  {
                                    type : 'value',
                                    name : 'MVA',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    nameTextStyle: {
                                      color: '#949494'
                                    },
                                    splitLine: {
                                      lineStyle: {
                                        color: 'transparent'
                                      }
                                    },
                                    axisLabel : {
                                      formatter: '{value}'
                                    }
                                  }
                                ],
                                series : [
                                  {
                                    name:'数量',
                                    type:'bar',
                                    itemStyle: {
                                      normal: {
                                        color: '#27b7bb'
                                      }
                                    },
                                    barWidth: '18px',
                                    data:[0, 0, 0, 0, 0, 0, 0]
                                  },
                                  {
                                    name:'容量',
                                    type:'bar',
                                    itemStyle: {
                                      normal: {
                                        color: '#f55a36'
                                      }
                                    },
                                    smooth: false,
                                    yAxisIndex: 1,
                                    barWidth: '18px',
                                    data:[0, 0, 0, 0, 0, 0, 0]
                                  }
                                ]
                              },
                              pie: {
                                title: {
                                  text: '单位：年',
                                  x: 'center',
                                  y: 'center',
                                  textStyle : {
                                    color : 'rgba(153,153,153,1)',
                                    fontFamily : '微软雅黑',
                                    fontSize : 14,
                                    fontWeight : 'Regular'
                                  }
                                },
                                tooltip: {
                                  trigger: 'item',
                                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                series: [
                                  {
                                    name:'投运年限',
                                    type:'pie',
                                    radius: ['40%', '55%'],
                                    label: {
                                      normal: {
                                        formatter: '{c}\n{b}'
                                      }
                                    },
                                    itemStyle: {
                                      normal: {
                                        color:function(params) {
                                          var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                          return colorList[params.dataIndex]
                                        }
                                      }
                                    },
                                    data:[
                                      {value: 0, name: '0-5年'},
                                      {value: 0, name:'5-10年'},
                                      {value: 0, name:'10-15年'},
                                      {value: 0, name:'15-20年'},
                                      {value: 0, name:'20年以上'}
                                    ]
                                  }
                                ]
                              }
                            }
                          },
                          {
                            title: '箱式变压器',
                            total: initTotalVal,
                            volume: initVolumeVal,
                            chartsData: {
                              bar: {
                                tooltip : {
                                  trigger: 'axis'
                                },
                                grid:{
                                  y:'10%',
                                  top: '40px',
                                  height:'55%'
                                },
                                toolbox: {
                                  show : false
                                },
                                calculable : true,
                                legend: {
                                  data:['数量','容量']
                                },
                                dataZoom: [
                                  {
                                    type: 'slider',
                                    show: true,
                                    height: 8,
                                    bottom: 5,
                                    background: '#339fff',
                                    start: 0,
                                    end: dataZoomEnd,
                                    handleSize: 0,
                                    fillerColor: '#0099FF',
                                    backgroundColor: '#fff',
                                    showDataShadow: false,
                                    showDetail: false,
                                    filterMode: 'filter'
                                  },
                                  {
                                    type: 'inside',
                                    show: true,
                                    start: 0,
                                    end: 100,
                                    backgroundColor: '#0099FF'
                                  }
                                ],
                                xAxis : [
                                  {
                                    type : 'category',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    data : ['线路运检组','线路运检一组','配电运维组','配电运维二组','变电中心三站', '变电中心三站','变电中心三站']
                                  }
                                ],
                                yAxis : [
                                  {
                                    type : 'value',
                                    name : '台',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    nameTextStyle: {
                                      color: '#949494'
                                    },
                                    splitLine: {
                                      lineStyle: {
                                        color: 'transparent'
                                      }
                                    },
                                    axisLabel : {
                                      formatter: '{value}'
                                    }
                                  },
                                  {
                                    type : 'value',
                                    name : 'MVA',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    nameTextStyle: {
                                      color: '#949494'
                                    },
                                    splitLine: {
                                      lineStyle: {
                                        color: 'transparent'
                                      }
                                    },
                                    axisLabel : {
                                      formatter: '{value}'
                                    }
                                  }
                                ],
                                series : [
                                  {
                                    name:'数量',
                                    type:'bar',
                                    itemStyle: {
                                      normal: {
                                        color: '#4394e9'
                                      }
                                    },
                                    barWidth: '18px',
                                    data:[0, 0, 0, 0,0, 0, 0]
                                  },
                                  {
                                    name:'容量',
                                    type:'bar',
                                    itemStyle: {
                                      normal: {
                                        color: '#f55a36'
                                      }
                                    },
                                    smooth: false,
                                    yAxisIndex: 1,
                                    barWidth: '18px',
                                    data:[0, 0, 0,0, 0, 0, 0]
                                  }
                                ]
                              },
                              pie: {
                                title: {
                                  text: '单位：年',
                                  x: 'center',
                                  y: 'center',
                                  textStyle : {
                                    color : 'rgba(153,153,153,1)',
                                    fontFamily : '微软雅黑',
                                    fontSize : 14,
                                    fontWeight : 'Regular'
                                  }
                                },
                                tooltip: {
                                  trigger: 'item',
                                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                series: [
                                  {
                                    name:'投运年限',
                                    type:'pie',
                                    radius: ['40%', '55%'],
                                    label: {
                                      normal: {
                                        formatter: '{c}\n{b}'
                                      }
                                    },
                                    itemStyle: {
                                      normal: {
                                        color:function(params) {
                                          var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                          return colorList[params.dataIndex]
                                        }
                                      }
                                    },
                                    data:[
                                      {value: 0, name: '0-5年'},
                                      {value: 0, name:'5-10年'},
                                      {value: 0, name:'10-15年'},
                                      {value: 0, name:'15-20年'},
                                      {value: 0, name:'20年以上'}
                                    ]
                                  }
                                ]
                              }
                            }
                          },
                          {
                            title: '站房类变压器',
                            total: initTotalVal,
                            volume: initVolumeVal,
                            chartsData: {
                              bar: {
                                tooltip : {
                                  trigger: 'axis'
                                },
                                grid:{
                                  y:'10%',
                                  top: '40px',
                                  height:'55%'
                                },
                                toolbox: {
                                  show : false
                                },
                                calculable : true,
                                legend: {
                                  data:['数量','容量']
                                },
                                dataZoom: [
                                  {
                                    type: 'slider',
                                    show: true,
                                    height: 8,
                                    bottom: 5,
                                    background: '#339fff',
                                    start: 0,
                                    end: dataZoomEnd,
                                    handleSize: 0,
                                    fillerColor: '#0099FF',
                                    backgroundColor: '#fff',
                                    showDataShadow: false,
                                    showDetail: false,
                                    filterMode: 'filter'
                                  },
                                  {
                                    type: 'inside',
                                    show: true,
                                    start: 0,
                                    end: 100,
                                    backgroundColor: '#0099FF'
                                  }
                                ],
                                xAxis : [
                                  {
                                    type : 'category',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    data : ['线路运检组','线路运检一组','配电运维组','配电运维二组','变电中心三站', '变电中心三站','变电中心三站']
                                  }
                                ],
                                yAxis : [
                                  {
                                    type : 'value',
                                    name : '台',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    nameTextStyle: {
                                      color: '#949494'
                                    },
                                    splitLine: {
                                      lineStyle: {
                                        color: 'transparent'
                                      }
                                    },
                                    axisLabel : {
                                      formatter: '{value}'
                                    }
                                  },
                                  {
                                    type : 'value',
                                    name : 'MVA',
                                    axisLine: {
                                      color: '#949494',
                                      lineStyle: {
                                        color: '#949494'
                                      }
                                    },
                                    nameTextStyle: {
                                      color: '#949494'
                                    },
                                    splitLine: {
                                      lineStyle: {
                                        color: 'transparent'
                                      }
                                    },
                                    axisLabel : {
                                      formatter: '{value}'
                                    }
                                  }
                                ],
                                series : [
                                  {
                                    name:'数量',
                                    type:'bar',
                                    itemStyle: {
                                      normal: {
                                        color: '#fece28'
                                      }
                                    },
                                    barWidth: '18px',
                                    data:[0, 0, 0, 0, 0, 0, 0]
                                  },
                                  {
                                    name:'容量',
                                    type:'bar',
                                    itemStyle: {
                                      normal: {
                                        color: '#f55a36'
                                      }
                                    },
                                    smooth: false,
                                    yAxisIndex: 1,
                                    barWidth: '18px',
                                    data:[0, 0, 0, 0, 0, 0, 0]
                                  }
                                ]
                              },
                              pie: {
                                title: {
                                  text: '单位：年',
                                  x: 'center',
                                  y: 'center',
                                  textStyle : {
                                    color : 'rgba(153,153,153,1)',
                                    fontFamily : '微软雅黑',
                                    fontSize : 14,
                                    fontWeight : 'Regular'
                                  }
                                },
                                tooltip: {
                                  trigger: 'item',
                                  formatter: "{a} <br/>{b}: {c} ({d}%)"
                                },
                                series: [
                                  {
                                    name:'投运年限',
                                    type:'pie',
                                    radius: ['40%', '55%'],
                                    label: {
                                      normal: {
                                        formatter: '{c}\n{b}'
                                      }
                                    },
                                    itemStyle: {
                                      normal: {
                                        color:function(params) {
                                          var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                          return colorList[params.dataIndex]
                                        }
                                      }
                                    },
                                    data:[
                                      {value: 0, name: '0-5年'},
                                      {value: 0, name:'5-10年'},
                                      {value: 0, name:'10-15年'},
                                      {value: 0, name:'15-20年'},
                                      {value: 0, name:'20年以上'}
                                    ]
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      }
                    }
                    _this.loadTab2Group(null, 0);
                    _this.loadTab2Group(null, 1);
                    _this.loadTab2Group(null, 2);
                }else if (tab.name === 'third'){
                    if(!_this.ThirdData){
                        let dataZoomEnd = 100;
                        _this.ThirdData = {
                          data: [
                            {
                              title: '0.4kV 架空线',
                              chartsData: {
                                bar: {
                                  tooltip : {
                                    trigger: 'axis'
                                  },
                                  grid:{
                                    y:'10%',
                                    top: '40px',
                                    height:'60%'
                                  },
                                  toolbox: {
                                    show : false
                                  },
                                  calculable : true,
                                  legend: {
                                    data:['0.4kV架空线长度']
                                  },
                                  dataZoom: [
                                    {
                                      type: 'slider',
                                      show: true,
                                      height: 8,
                                      bottom:8,
                                      background: '#339fff',
                                      start: 0,
                                      end: dataZoomEnd,
                                      handleSize: 0,
                                      fillerColor: '#0099FF',
                                      backgroundColor: '#fff',
                                      showDataShadow: false,
                                      showDetail: false,
                                      filterMode: 'filter'
                                    },
                                    {
                                      type: 'inside',
                                      show: true,
                                      start: 0,
                                      end: 100,
                                      backgroundColor: '#0099FF'
                                    }
                                  ],
                                  xAxis : [
                                    {
                                      type : 'category',
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      data : ['线路运检组','线路运检一组','电缆运维四组','电缆检修四组','线路检修四组', '线路检修五组']
                                    }
                                  ],
                                  yAxis : [
                                    {
                                      type : 'value',
                                      name : 'km',
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      nameTextStyle: {
                                        color: '#949494'
                                      },
                                      splitLine: {
                                        lineStyle: {
                                          color: 'transparent'
                                        }
                                      },
                                      axisLabel : {
                                        formatter: '{value}'
                                      }
                                    }
                                  ],
                                  series : [
                                    {
                                      name:'0.4kV架空线长度',
                                      type:'bar',
                                      itemStyle: {
                                        normal: {
                                          color: '#4394E9'
                                        }
                                      },
                                      barWidth: '18px',
                                      data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                    }

                                  ]
                                },
                                pie: {
                                  title: {
                                    text: '单位：年',
                                    x: 'center',
                                    y: 'center',
                                    textStyle : {
                                      color : 'rgba(153,153,153,1)',
                                      fontFamily : '微软雅黑',
                                      fontSize : 14,
                                      fontWeight : 'Regular'
                                    }
                                  },
                                  tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                  },
                                  series: [
                                    {
                                      name:'投运年限',
                                      type:'pie',
                                      radius: ['40%', '55%'],
                                      label: {
                                        normal: {
                                          formatter: '{c}\n{b}'
                                        }
                                      },
                                      itemStyle: {
                                        normal: {
                                          color:function(params) {
                                            var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                            return colorList[params.dataIndex]
                                          }
                                        }
                                      },
                                      data:[
                                        {value: 0, name: '0-5年'},
                                        {value: 0, name:'5-10年'},
                                        {value: 0, name:'10-15年'},
                                        {value: 0, name:'15-20年'},
                                        {value: 0, name:'20年以上'}
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              title: '0.4kV 电缆',
                              chartsData: {
                                bar: {
                                  tooltip : {
                                    trigger: 'axis'
                                  },
                                  grid:{
                                    y:'10%',
                                    top: '40px',
                                    height:'60%'
                                  },
                                  toolbox: {
                                    show : false
                                  },
                                  calculable : true,
                                  legend: {
                                    data:['0.4kV电缆长度']
                                  },
                                  dataZoom: [
                                    {
                                      type: 'slider',
                                      show: true,
                                      height: 8,
                                      bottom: 10,
                                      background: '#339fff',
                                      start: 0,
                                      end: dataZoomEnd,
                                      handleSize: 0,
                                      fillerColor: '#0099FF',
                                      backgroundColor: '#fff',
                                      showDataShadow: false,
                                      showDetail: false,
                                      filterMode: 'filter'
                                    },
                                    {
                                      type: 'inside',
                                      show: true,
                                      start: 0,
                                      end: 100,
                                      backgroundColor: '#0099FF'
                                    }
                                  ],
                                  xAxis : [
                                    {
                                      type : 'category',
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      data : ['线路运检组','线路运检一组','电缆运维四组','电缆检修四组','线路检修四组', '线路检修五组']
                                    }
                                  ],
                                  yAxis : [
                                    {
                                      type : 'value',
                                      name : 'km',
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      nameTextStyle: {
                                        color: '#949494'
                                      },
                                      splitLine: {
                                        lineStyle: {
                                          color: 'transparent'
                                        }
                                      },
                                      axisLabel : {
                                        formatter: '{value}'
                                      }
                                    }
                                  ],
                                  series : [
                                    {
                                      name:'0.4kV电缆长度',
                                      type:'bar',
                                      itemStyle: {
                                        normal: {
                                          color: '#FECE28'
                                        }
                                      },
                                      barWidth: '18px',
                                      data:[0, 0, 0, 0, 0, 0]
                                    }
                                  ]
                                },
                                pie: {
                                  title: {
                                    text: '单位：年',
                                    x: 'center',
                                    y: 'center',
                                    textStyle : {
                                      color : 'rgba(153,153,153,1)',
                                      fontFamily : '微软雅黑',
                                      fontSize : 14,
                                      fontWeight : 'Regular'
                                    }
                                  },
                                  tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                  },
                                  series: [
                                    {
                                      name:'投运年限',
                                      type:'pie',
                                      radius: ['40%', '55%'],
                                      label: {
                                        normal: {
                                          formatter: '{c}\n{b}'
                                        }
                                      },
                                      itemStyle: {
                                        normal: {
                                          color:function(params) {
                                            var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                            return colorList[params.dataIndex]
                                          }
                                        }
                                      },
                                      data:[
                                        {value: 0, name: '0-5年'},
                                        {value: 0, name:'5-10年'},
                                        {value: 0, name:'10-15年'},
                                        {value: 0, name:'15-20年'},
                                        {value: 0, name:'20年以上'}
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              title: '电缆分支箱',
                              chartsData: {
                                bar: {
                                  tooltip : {
                                    trigger: 'axis'
                                  },
                                  grid:{
                                    y:'10%',
                                    top: '40px',
                                    height:'60%'
                                  },
                                  toolbox: {
                                    show : false
                                  },
                                  calculable : true,
                                  legend: {
                                    data:['数量','容量']
                                  },
                                  dataZoom: [
                                    {
                                      type: 'slider',
                                      show: true,
                                      height: 8,
                                      bottom: 10,
                                      background: '#339fff',
                                      start: 0,
                                      end: dataZoomEnd,
                                      handleSize: 0,
                                      fillerColor: '#0099FF',
                                      backgroundColor: '#fff',
                                      showDataShadow: false,
                                      showDetail: false,
                                      filterMode: 'filter'
                                    },
                                    {
                                      type: 'inside',
                                      show: true,
                                      start: 0,
                                      end: 100,
                                      backgroundColor: '#0099FF'
                                    }
                                  ],
                                  xAxis : [
                                    {
                                      type : 'category',
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      data : [
                                      ]
                                    }
                                  ],
                                  yAxis : [
                                    {
                                      type : 'value',
                                      name: "数量",
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      nameTextStyle: {
                                        color: '#949494'
                                      },
                                      splitLine: {
                                        lineStyle: {
                                          color: 'transparent'
                                        }
                                      },
                                      axisLabel : {
                                        formatter: '{value}'
                                      }
                                    },
                                    {
                                      type : 'value',
                                      name : 'MVA',
                                      axisLine: {
                                        color: '#949494',
                                        lineStyle: {
                                          color: '#949494'
                                        }
                                      },
                                      nameTextStyle: {
                                        color: '#949494'
                                      },
                                      splitLine: {
                                        lineStyle: {
                                          color: 'transparent'
                                        }
                                      },
                                      axisLabel : {
                                        formatter: '{value}'
                                      }
                                    }
                                  ],
                                  series : [
                                    {
                                      name:'数量',
                                      type:'bar',
                                      itemStyle: {
                                        normal: {
                                          color: '#27B7BB'
                                        }
                                      },
                                      barWidth: '18px',
                                      data:[
                                      ]
                                    },
                                    {
                                      name:'容量',
                                      type:'bar',
                                      itemStyle: {
                                        normal: {
                                          color: '#F55A36'
                                        }
                                      },
                                      smooth: false,
                                      yAxisIndex: 1,
                                      barWidth: '18px',
                                      data:[
                                      ]
                                    }
                                  ]
                                },
                                pie: {
                                  title: {
                                    text: '单位：年',
                                    x: 'center',
                                    y: 'center',
                                    textStyle : {
                                      color : 'rgba(153,153,153,1)',
                                      fontFamily : '微软雅黑',
                                      fontSize : 14,
                                      fontWeight : 'Regular'
                                    }
                                  },
                                  tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                  },
                                  series: [
                                    {
                                      name:'投运年限',
                                      type:'pie',
                                      radius: ['40%', '55%'],
                                      label: {
                                        normal: {
                                          formatter: '{c}\n{b}'
                                        }
                                      },
                                      itemStyle: {
                                        normal: {
                                          color:function(params) {
                                            var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                            return colorList[params.dataIndex]
                                          }
                                        }
                                      },
                                      data:[
                                        {value: 0, name: '0-5年'},
                                        {value: 0, name:'5-10年'},
                                        {value: 0, name:'10-15年'},
                                        {value: 0, name:'15-20年'},
                                        {value: 0, name:'20年以上'}
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        }
                    }
                    _this.loadTab3Group(null, 0);
                    _this.loadTab3Group(null, 1);
                    _this.loadTab3Group(null, 2);
                }else if(tab.name === 'fourth') {
                    _this.FifthData = {
                        data: [
                            {
                                title: '用户表箱',
                                total: "--",
                                chartsData: {
                                    bar1: {
                                        tooltip : {
                                            show:false
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
                                                max: this.max
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
                                                name:'用户表箱',
                                                type:'bar',
                                                stack: '总量',
                                                barWidth:'16px',
                                                itemStyle : {
                                                    normal: {
                                                        label : {
                                                        show: true,
                                                        position: 'insideLeft',
                                                        formatter: '{c}'
                                                    },
                                                    color: '#27B7BB'
                                                 }
                                            },
                                            data:[0]
                                        },
                                        {
                                            name:' ',
                                            type:'bar',
                                            stack: '总量',
                                            itemStyle : {
                                                normal: {
                                                    color: '#EEEEEE'
                                                }
                                            },
                                            data:[this.max - 31]
                                        }
                                        ]
                                    },
                                    bar2: {
                                        tooltip : {
                                            show:false
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
                                                max: this.max
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
                                                name:'台区总表表箱',
                                                type:'bar',
                                                stack: '总量',
                                                barWidth:'16px',
                                                itemStyle : {
                                                    normal: {
                                                        label : {
                                                            show: true,
                                                            position: 'insideLeft',
                                                            formatter: '{c}'
                                                        },
                                                        color: '#27B7BB'
                                                    }
                                                },
                                                data:[0]
                                            },
                                            {
                                                name:' ',
                                                type:'bar',
                                                stack: '总量',
                                                itemStyle : {
                                                    normal: {
                                                        color: '#EEEEEE'
                                                    }
                                                },
                                                data:[this.max - 31]
                                            }
                                        ]
                                    },
                                    pie: {
                                        title: {
                                            text: '单位：年',
                                            x: 'center',
                                            y: 'center',
                                            textStyle : {
                                                color : 'rgba(153,153,153,1)',
                                                fontFamily : '微软雅黑',
                                                fontSize : 14,
                                                fontWeight : 'Regular'
                                            }
                                        },
                                        tooltip: {
                                            trigger: 'item',
                                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                                        },
                                        series: [
                                            {
                                                name:'投运年限',
                                                type:'pie',
                                                radius: ['40%', '55%'],
                                                label: {
                                                    normal: {
                                                        formatter: '{c}\n{b}'
                                                    }
                                                },
                                                itemStyle: {
                                                    normal: {
                                                        color:function(params) {
                                                            // 自定义颜色
                                                            var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                                            return colorList[params.dataIndex]
                                                        }
                                                    }
                                                },
                                                data:[
                                                    {value: 0, name: '0-5年'},
                                                    {value: 0, name:'5-10年'},
                                                    {value: 0, name:'10-15年'},
                                                    {value: 0, name:'15-20年'},
                                                    {value: 0, name:'20年以上'}
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                title: '电表',
                                total: "--",
                                chartsData: {
                                  bar3: {
                                    tooltip : {
                                      show:false
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
                                        max: this.max
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
                                        name:'智能表箱',
                                        type:'bar',
                                        stack: '总量',
                                        barWidth:'16px',
                                        itemStyle : {
                                          normal: {
                                            label : {
                                              show: true,
                                              position: 'insideLeft',
                                              formatter: '{c}'
                                            },
                                            color: '#27B7BB'
                                          }
                                        },
                                        data:[0]
                                      },
                                      {
                                        name:' ',
                                        type:'bar',
                                        stack: '总量',
                                        itemStyle : {
                                          normal: {
                                            color: '#EEEEEE'
                                          }
                                        },
                                        data:[this.max - 31]
                                      }
                                    ]
                                  },
                                  bar4: {
                                    tooltip : {
                                      show:false
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
                                        max: this.max
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
                                        name:'非智能表箱',
                                        type:'bar',
                                        stack: '总量',
                                        barWidth:'16px',
                                        itemStyle : {
                                          normal: {
                                            label : {
                                              show: true,
                                              position: 'insideLeft',
                                              formatter: '{c}'
                                            },
                                            color: '#27B7BB'
                                          }
                                        },
                                        data:[0]
                                      },
                                      {
                                        name:' ',
                                        type:'bar',
                                        stack: '总量',
                                        itemStyle : {
                                          normal: {
                                            color: '#EEEEEE'
                                          }
                                        },
                                        data:[this.max - 31]
                                      }
                                    ]
                                  },
                                  pie: {
                                    title: {
                                      text: '单位：年',
                                      x: 'center',
                                      y: 'center',
                                      textStyle : {
                                        color : 'rgba(153,153,153,1)',
                                        fontFamily : '微软雅黑',
                                        fontSize : 14,
                                        fontWeight : 'Regular'
                                      }
                                    },
                                    tooltip: {
                                      trigger: 'item',
                                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                                    },
                                    series: [
                                      {
                                        name:'投运年限',
                                        type:'pie',
                                        radius: ['40%', '55%'],
                                        label: {
                                          normal: {
                                            formatter: '{c}\n{b}'
                                          }
                                        },
                                        itemStyle: {
                                          normal: {
                                            color:function(params) {
                                              // 自定义颜色
                                              var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                              return colorList[params.dataIndex]
                                            }
                                          }
                                        },
                                        data:[
                                          {value: 0, name: '0-5年'},
                                          {value: 0, name:'5-10年'},
                                          {value: 0, name:'10-15年'},
                                          {value: 0, name:'15-20年'},
                                          {value: 0, name:'20年以上'}
                                        ]
                                      }
                                    ]
                                  }
                                }
                            },
                        ]
                    };
                    _this.SixthData = {
                      data: [
                            {
                                title: '用户',
                                total: "--",
                                chartsData: {
                                    pie: {
                                        tooltip: {
                                            show:false
                                        },
                                        series: [
                                            {
                                                name: '10kV用户',
                                                type:'pie',
                                                center : ['16%', '50%'],
                                                radius: [45,55],
                                                avoidLabelOverlap: false,
                                                label: {
                                                    normal: { // normal 是图形在默认状态下的样式
                                                        show: true,
                                                        position: 'center',
                                                        color: 'black',
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        formatter: '{c}' // -- {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                                                    }
                                                },
                                                hoverAnimation:false,
                                                itemStyle: {
                                                    normal : {
                                                        color:function(params) {
                                                            // 自定义颜色
                                                            var colorList = ['#27B7BB','#fff']
                                                            return colorList[params.dataIndex]
                                                        }
                                                    }
                                                },
                                                data:[
                                                    {value:0, name:'10kV用户'},
                                                    {value:'', name:'other'}
                                                ]
                                            },
                                            {
                                                name: '低压居民',
                                                type:'pie',
                                                center : ['49%', '50%'],
                                                radius: [45,55],
                                                label: {
                                                    normal: { // normal 是图形在默认状态下的样式
                                                        show: true,
                                                        position: 'center',
                                                        color: 'black',
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        formatter: '{c}' // -- {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                                                    }
                                                },
                                                hoverAnimation:false,
                                                itemStyle: {
                                                    normal : {
                                                        color:function(params) {
                                                            // 自定义颜色
                                                            var colorList = ['#27B7BB','#fff']
                                                            return colorList[params.dataIndex]
                                                        }
                                                    }
                                                },
                                                data:[
                                                    {value:0, name:'10kV用户'},
                                                    {value:'', name:'other'}
                                                ]
                                            },
                                            {
                                                name: '低压非用户',
                                                type:'pie',
                                                center : ['82%', '50%'],
                                                radius: [45,55],
                                                label: {
                                                    normal: { // normal 是图形在默认状态下的样式
                                                        show: true,
                                                        position: 'center',
                                                        color: 'black',
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        formatter: '{c}' // -- {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                                                    }
                                                },
                                                hoverAnimation:false,
                                                itemStyle: {
                                                    normal : {
                                                        color:function(params) {
                                                            // 自定义颜色
                                                            var colorList = ['#27B7BB','#fff']
                                                            return colorList[params.dataIndex]
                                                        }
                                                    }
                                                },
                                                data:[
                                                    {value:0, name:'10kV用户'},
                                                    {value:'', name:'other'}
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                    _this.loadTab4Group(null, 0);
                }
            })
        },
        handleEdit(index,row){
            this.$message.success('Edit:   '+index+'   params:   '+row)
        },
        handleDelete(index,row){
            this.$message.success('Delete:   '+index+'   params:   '+row)
        },
        toMap(params) {
            this.$message.success('clicked')
            //console.log('clicked the location', params)
        }
    }
}
</script>

<style lang="scss" scoped>
    .equip-charts {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: calc(100vh - 72px);
      .breadcrumb-wrap{
        padding-left: 10px;
      }
      .month-picker-wrap {
        height: 0;
        position: relative;
        .month-picker {
          position: absolute;
          right: 10px;
          bottom: -33px;
          width: 135px;
        }
      }
      /deep/ .el-input__prefix{
        cursor: default;
        .el-icon-date{
          cursor: default;
        }
      }
      /deep/ .el-input__inner{
        cursor: default; 
      }
      .tab-wrap {
        height: 100%;
        /deep/ .el-tabs {
          height: 100%;
          .el-tabs__content {
            height: calc(100% - 40px);
            .el-tab-pane{
              height: 100%;
              .tab-content{
                /*.el-row{*/
                /*height: 100%;*/
                /*}*/
              }
            }
          }
          .el-tabs__header {
            margin-left: 10px;
            margin-right: 130px;
            margin-bottom: 5px;
          }
          .el-tabs__nav-wrap {
            &::after {
              height: 0!important;
            }
            .el-tabs__nav-scroll {
              .el-tabs__nav {
                .el-tabs__active-bar {
                  display: none;
                }
                .el-tabs__item {
                  color: #fff;
                  text-align: center;
                  border-radius: 5px;
                  width: 190px;
                  height: 34px;
                  line-height: 34px;
                  margin-right: 10px;
                  background-color: #05728C;
                  padding: 0;
                  &:hover {
                    background-color: #27B7BB;
                  }
                  &.is-active {
                    color: #fff;
                    background-color: #27B7BB;
                  }
                  &:last-child {
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
        .tab-content {
          height: 100%;
          .inline-data {
            text-align: left;
            .value {
              color: #27B7BB;
              font-weight: bold;
            }
          }
          .charts-list {
            font-size: 14px;
            .charts-item {
              .padding-top-15{
                padding-top: 15px;
              }
              text-align: left;
              border: 1px solid #DADADA;
              margin: 10px;
              // height: calc((100vh - 170px) / 2);
              // min-height: 300px;
              &.el-col-12 {
                width: calc(50% - 20px);
              }
              &.el-col-24 {
                width: calc(100% - 20px);
              }
              .charts-title {
                background: #27B7BB;
                height: 30px;
                line-height: 30px;
                color: #fff;
                padding-left: 30px;
              }
              .charts-inline-data {
                height: 30px;
                line-height: 30px;
                padding-left: 17px;
              }
              .leftChart, .rightChart {
                position: relative;
                .pieTitle {
                  position: absolute;
                  top: 0;
                  left: 0;
                  padding-left: 16px;
                  &:before {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    content: "";
                    width: 4px;
                    height: 16px;
                    background: #27B7BB;
                  }
                }
              }
            }
          }
        }
      }


    }
    .equipPopup {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        z-index: 10;
        bottom: 0px;
        /deep/ .popupContent {
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

    /deep/ .el-breadcrumb{
      font-size: 17px;
      height: 30px;
      line-height: 20px;
    }
</style>
