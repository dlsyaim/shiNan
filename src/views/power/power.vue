<template>
    <div class="powerDiv">
        <el-row v-if="echartConfig.show">
            <el-col :span="24" >
                <template v-if="powerChartsData && powerChartsData.length > 0">
                    <el-row>
                        <el-col :span="24" class="charts-list">
                            <el-col :span="24" class="charts-item" v-for="(chart, index) in powerChartsData" :key=index>
                                <el-col :span="24" class="charts-title">
                                    <el-col :span="12" class="title-text">
                                        <i class="el-icon-s-operation"></i>
                                        <span>{{chart.title}}</span>
                                    </el-col>
                                    <el-col :span="12" class="month-picker-wrap">
                                        <span v-for="(timeItem, timeIndex) in timeSpanData" :key=timeIndex :class="{'active': timeItem.activeIndex[index] == 1}" @click="selectDataTime(timeItem.key, index)">{{timeItem.name}}</span>
                                    </el-col>
                                </el-col>
                                <el-col :span="16" class="leftChart">
                                    <template v-if="index==0">
                                        <el-row class="charts-inline-data">
                                            <el-col :span="4" class="inline-data">
                                                <span>功率因素过低</span>
                                                <span class="value">{{chart.lowNumber}}</span>
                                                <span>台</span>
                                            </el-col>
                                            <el-col :span="4" class="inline-data">
                                                <span>功率因素严重过低</span>
                                                <span class="value">{{chart.seriousLowNumber}}</span>
                                                <span>台</span>
                                            </el-col>
                                        </el-row>
                                        <Echarts @echartsClick="tablePowerView" :echartObj="chart.bar.chartOptions" echartWidth="100%" echartHeight="320px" ></Echarts>
                                    </template>
                                    <template v-else>
                                        <el-col :span="8" class="inline-data"><span>&nbsp;</span></el-col>
                                        <Echarts @echartsClick="tableMonitorView" :echartObj="chart.bar.chartOptions" echartWidth="100%" echartHeight="320px" ></Echarts>
                                    </template>
                                </el-col>
                                <el-col :span="8" class="rightChart">
                                    <span class="pieTitle">{{chart.pie.title}}</span>
                                    <template v-if="index==0">
                                        <Echarts @echartsClick="tablePowerView" :echartObj="chart.pie.chartOptions" echartWidth="100%" echartHeight="335px"></Echarts>
                                    </template>
                                    <template v-else>
                                        <Echarts @echartsClick="tableMonitorView" :echartObj="chart.pie.chartOptions" echartWidth="100%" echartHeight="335px"></Echarts>
                                    </template>
                                </el-col>
                            </el-col>
                        </el-col>
                    </el-row>
                </template>
            </el-col>
        </el-row>
        <el-row style="width:100%;height:calc(100% - 25px);" v-if="tableConfig.show" >
            <div class="conBox">
                <div  class="firstLine">
                    <div class="leftBox">
                        <el-form  label-width="152px" class="forms">
                            <el-form-item label="设备名称">
                                <el-select  placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="配变类型">
                                <el-select  placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="维护班组">
                                <el-select  placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="电流异常累计天数">
                                <el-select  placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="电流不平衡累计天数">
                                <el-select  placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="rightBox">
                        <el-form  label-width="80px" class="formRight">
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <img src="../../assets/x.jpg" alt=""  @click="closeTable" width='25px' height="25px">
                </div>
                <div class="table_content">
                    <span class="details">明细:</span>
                    <div class="table_content_top">
                        <span><img src="../load/img/ic_import.png" alt /> 数据导出</span>
                    </div>
                    <div class="table">
                        <el-table :data="powerTableData" 
                            style="width: 100%;margin: 0 auto;"
                            :header-cell-style="{background:'#00CED1',color:'black','text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            border
                        >
                            <el-table-column prop="cz" label="操作" align="center">
                                <i class="el-icon-location" style="color:#FC4E4A;cursor: pointer;" @click="toMap('tomap')"></i>
                            </el-table-column>
                            <el-table-column prop="sbbm" label="设备编码"></el-table-column>
                            <el-table-column prop="sbmc" label="设备名称"></el-table-column>
                            <el-table-column prop="ycljts" label="电流异常累计天数"></el-table-column>
                            <el-table-column prop="bphljts" label="电流不平衡累计天数"></el-table-column>
                            <el-table-column prop="pblx" label="配变类型"></el-table-column>
                            <el-table-column prop="edrl" label="额定容量"></el-table-column>
                            <el-table-column prop="syxz" label="使用性质"></el-table-column>
                            <el-table-column prop="xh" label="型号"></el-table-column>
                            <el-table-column prop="dydj" label="电压等级"></el-table-column>
                            <el-table-column prop="sccj" label="生产厂家"></el-table-column>
                            <el-table-column prop="whbzmc" label="维护班组名称"></el-table-column>
                            <el-table-column prop="ywdwmc" label="运维单位名称"></el-table-column>
                        </el-table>
                        <el-pagination
                            style="text-align: right;"
                            background
                            layout="prev, pager, next"
                            :total=tableConfig.total>
                        </el-pagination>
                    </div>
                </div>
            </div>   
        </el-row>
    </div>
</template>

<script>
import moment from 'moment'
import Echarts from '@/components/snxp-echarts';
import ElCol from "element-ui/packages/col/src/col";
import popup from '@/components/snxp-popup';
import {getPowerFactorData, getPowerKeyMonitorData, getPowerListData} from '@/api/api';
export default {
    // inject: ['setBreadcrumb'],
    components: {
        ElCol,
        Echarts,
        popup
    },
    data() {
        return {
            params: {
                powerTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                powerType: "day",
                monitorTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                monitorType: "day"
            },
            powerTableData: [],
            tableConfig: {
                show: false,
                title: '功率因素详情',
                total: 3
            },
            echartConfig: {
                show: true
            },
            echartRefresh: true,
            chartsLoading: {power: false, monitor: false},
            powerChartsData: [],
            timeSpanData: [
                {name: "昨日", key: "yesterday", activeIndex: [1,1]},
                {name: "本周", key: "week", activeIndex: [0,0]},
                {name: "当月", key: "month", activeIndex: [0,0]}
            ]
        }
    },
    mounted() {
        this.getChartsOption()
        this.loadPowerChart()
        this.loadMonitorChart()
        // this.$nextTick(() => {
        //     // 设置面包屑
        //     this.setBreadcrumb(
        //         [
        //             {
        //                 name: '供电服务保障',
        //                 path: '/equip',
        //                 icon: 'el-icon-s-home'
        //             },
        //             {
        //                 name: '智能运维'
        //             },
        //             {
        //                 name: '功率因素'
        //             }
        //         ]
        //     )
        // })
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        closeTable() {
            this.tableConfig.show = false;
            this.echartConfig.show = true;
        },
        tablePowerView(echartParams) {
            let queryParam = {time: this.params.powerTime, type: this.params.powerType, name: echartParams.name};
            getPowerListData(queryParam).then(res => {
                if (res.code === 200) {
                    this.powerTableData = res.data;
                } else {
                    this.$message.error(res.message)
                }
            }).catch((err) => {
                this.$message.error(err)
            })
            this.echartConfig.show = false;
            this.tableConfig.show = true;
        },
        tableMonitorView(echartParams) {
            let queryParam = {time: this.params.monitorTime, type: this.params.monitorType, name: echartParams.name};
            getPowerListData(queryParam).then(res => {
                if (res.code === 200) {
                    this.powerTableData = res.data;
                } else {
                    this.$message.error(res.message)
                }
            }).catch((err) => {
                this.$message.error(err)
            })
            this.echartConfig.show = false;
            this.tableConfig.show = true;
        },
        closePopup(config){
            this[config].show = false
        },
        selectDataTime(params, index) {
            if (params === "yesterday") {
                let curTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
                if (index == 0) {
                    this.params.powerTime = curTime;
                    this.params.powerType = "day";
                } else {
                    this.params.monitorTime = curTime;
                    this.params.monitorType = "day";
                }
                this.updateTimeSpanData(0, index);
            } else if (params === "week") {
                let curTime = moment().format('YYYY-MM-DD');
                if (index == 0) {
                    this.params.powerTime = curTime;
                    this.params.powerType = "week";
                } else {
                    this.params.monitorTime = curTime;
                    this.params.monitorType = "week";
                }
                this.updateTimeSpanData(1, index);
            } else if (params === "month") {
                let curTime = moment().format('YYYY-MM');
                if (index == 0) {
                    this.params.powerTime = curTime;
                    this.params.powerType = "month";
                } else {
                    this.params.monitorTime = curTime;
                    this.params.monitorType = "month";
                }
                this.updateTimeSpanData(2, index);
            }
            this.loadPowerChart();
            this.loadMonitorChart();
        },
        updateTimeSpanData(spanIndex, index) {
            for (let i = 0; i < this.timeSpanData.length; i++) {
                if (i == spanIndex) {
                    this.timeSpanData[i].activeIndex[index] = 1;
                } else {
                    this.timeSpanData[i].activeIndex[index] = 0;
                }
            }
            this.timeSpanData[0].activeIndex.splice(0, 0);
        },
        loadPowerChart() {
            this.chartsLoading.power = true
            let queryParam = {time: this.params.powerTime, type: this.params.powerType};
            return getPowerFactorData(queryParam).then(res => {
                if (res.code === 200) {
                    this.powerChartsData[0].lowNumber = res.data.lowNumber
                    this.powerChartsData[0].seriousLowNumber = res.data.seriousLowNumber
                    this.powerChartsData[0].bar.chartOptions.xAxis[0].data = res.data.bar.xAxis
                    this.powerChartsData[0].bar.chartOptions.series[0].data = res.data.bar.low
                    this.powerChartsData[0].bar.chartOptions.series[1].data = res.data.bar.seriousLow
                    this.powerChartsData[0].bar.chartOptions.series[2].data = res.data.bar.load
                    this.powerChartsData[0].pie.chartOptions.series[0].data = res.data.pie.data
                    this.echartRefresh = !this.echartRefresh
                } else {
                    this.$message.error(res.message)
                }
                this.chartsLoading.power = false
            }).catch((err) => {
                this.$message.error(err) 
                this.chartsLoading.power = false
            })
        },
        loadMonitorChart() {
            this.chartsLoading.monitor = true
            let queryParam = {time: this.params.monitorTime, type: this.params.monitorType};
            return getPowerKeyMonitorData(queryParam).then(res => {
                if (res.code === 200) {
                    this.powerChartsData[1].lowNumber = res.data.lowNumber
                    this.powerChartsData[1].seriousLowNumber = res.data.seriousLowNumber
                    this.powerChartsData[1].bar.chartOptions.xAxis[0].data = res.data.bar.xAxis
                    this.powerChartsData[1].bar.chartOptions.series[0].data = res.data.bar.three
                    this.powerChartsData[1].bar.chartOptions.series[1].data = res.data.bar.seven
                    this.powerChartsData[1].pie.chartOptions.series[0].data = res.data.pie.data
                    this.echartRefresh = !this.echartRefresh
                } else {
                    this.$message.error(res.message)
                }
                this.chartsLoading.monitor = false
            }).catch((err) => {
                this.$message.error(err)
                this.chartsLoading.monitor = false
            })
        },
        getChartsOption() {
            this.powerChartsData = [
                {
                    title: '功率因素',
                    lowNumber: 108,
                    seriousLowNumber: 43,
                    bar: {
                        chartOptions: {
                            tooltip : {
                                trigger: 'axis'
                            },
                            toolbox: {
                                show : false
                            },
                            calculable : true,
                            legend: {
                                data:['功率因素过低','功率因素严重过低','轻载率']
                            },
                            grid: {
                                left: '5%'
                            },
                            dataZoom: [
                                {
                                    type: 'slider',
                                    show: true,
                                    height: 8,
                                    bottom: 10,
                                    background: '#339fff',
                                    start: 0,
                                    end: 100,
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
                                    data : ['1']
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name : '数量(台)',
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
                                    name : '%',
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
                                        formatter: '{value}%'
                                    }
                                }
                            ],
                            series : [
                                {
                                    name:'功率因素过低',
                                    type:'bar',
                                    itemStyle: {
                                        normal: {
                                            color: '#25B6BB'
                                        }
                                    },
                                    barWidth: '10%',
                                    data: [2]
                                },
                                {
                                    name:'功率因素严重过低',
                                    type:'bar',
                                    itemStyle: {
                                        normal: {
                                            color: '#4096EB'
                                        }
                                    },
                                    barWidth: '10%',
                                    data: [2]
                                },
                                {
                                    name:'轻载率',
                                    type:'line',
                                    itemStyle: {
                                        normal: {
                                            color: '#f55a36'
                                        }
                                    },
                                    smooth: true,
                                    symbolSize: 12,
                                    yAxisIndex: 1,
                                    data: [3]
                                }
                            ]
                        }
                    },
                    pie: {
                        title: '杆配占比',
                        chartOptions: {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'horizontal',
                                x: 'left',
                                top: 20,
                                data:['杆变','配变']
                            },
                            series: [
                                {
                                    name:'杆配占比',
                                    type:'pie',
                                    radius: ['40%', '55%'],
                                    label: {
                                        normal: {
                                            formatter: (data) => {
                                                var result = data.percent + '%' + '(' + data.value + '台)' + '\n' + data.name
                                                return result
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color:function(params) {
                                                // 自定义颜色
                                                var colorList = ['#157B87', '#25B6BB']
                                                return colorList[params.dataIndex]
                                            }
                                        }
                                    },
                                    data: [{value: 1, name: '杆变'},{value: 1, name: '配变'}]
                                }
                            ]
                        }
                    }
                },
                {
                    title: '重点监控',
                    bar: {
                        chartOptions: {
                            tooltip : {
                                trigger: 'axis'
                            },
                            toolbox: {
                                show : false
                            },
                            calculable : true,
                            legend: {
                                data:['连续3天','累计7天']
                            },
                            grid: {
                                left: '5%',
                                top: 30
                            },
                            dataZoom: [
                                {
                                    type: 'slider',
                                    show: true,
                                    height: 8,
                                    bottom: 10,
                                    background: '#339fff',
                                    start: 0,
                                    end: 100,
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
                                    data : ['1']
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name : '数量(台)',
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
                                    name:'连续3天',
                                    type:'bar',
                                    itemStyle: {
                                        normal: {
                                            color: '#FE9C15'
                                        }
                                    },
                                    barWidth: '10%',
                                    data: [2]
                                },
                                {
                                    name:'累计7天',
                                    type:'bar',
                                    itemStyle: {
                                        normal: {
                                            color: '#FFCD00'
                                        }
                                    },
                                    barWidth: '10%',
                                    data: [2]
                                }
                            ]
                        }
                    },
                    pie: {
                        title: '杆配占比',
                        chartOptions: {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'horizontal',
                                x: 'left',
                                top: 20,
                                data:['杆变','配变']
                            },
                            series: [
                                {
                                    name:'杆配占比',
                                    type:'pie',
                                    radius: ['40%', '55%'],
                                    label: {
                                        normal: {
                                            formatter: (data) => {
                                                var result = data.percent + '%' + '(' + data.value + '台)' + '\n' + data.name
                                                return result
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color:function(params) {
                                                // 自定义颜色
                                                var colorList = ['#157B87', '#25B6BB']
                                                return colorList[params.dataIndex]
                                            }
                                        }
                                    },
                                    data: [{value: 1, name: '杆变'},{value: 1, name: '配变'}]
                                }
                            ]
                        }
                    }
                }  
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .powerDiv {
        width: 100%;
        height: 100%;
    }
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
            text-align: left;
            border: 1px solid #DADADA;
            margin: 10px;
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
                .month-picker-wrap {
                    text-align: right;
                    padding-right: 15px;
                    span {
                        padding: 6px 15px;
                        margin-right: 5px;
                        cursor: pointer;
                    }
                    .active {
                        background-color: #07718b;
                    }
                }
            }
            .charts-inline-data {
                padding: 15px 0;
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
            .rightChart {
                top: 15px;
            }
        }
    }
    .conBox{
        padding: 10px;
        width: calc(100% - 22px);
        height: calc(100% - 22px);
        background:white;
        position:relative;
        top:25px;
        left:0px;
        z-index:1000;
    }
    .firstLine{
        width:100%;
        height:130px;
        border:1px solid gainsboro;
        display:flex;
        border-radius: 5px;
    }
    .leftBox{
        width:70%;
        height: 130px;
        margin-top:14px;
        margin-right: 228px;
    }
    .rightBox{
        // width:30%;
        height: 130px;
        margin-top:49px; 
    }
    .forms{
        display: flex;
        // flex-direction: column;
        // justify-content: space-around;
        flex-wrap: wrap;
    }
    .secondLine{
        width:100%;
        height:675px;
        border:1px solid gainsboro;
        margin-top:20px;
    }
    .el-table thead {
        color: black;
        font-weight: 500;
    }
    .el-table td, .el-table th.is-leaf {
        text-align: center;
    }
    .table_content {
        height: calc(100% - 155px);
        width: 100%;
        border: 1px solid #cccccc;
        margin-top: 18px;
        border-radius: 5px;
        position: relative;
        padding: 14px;
        box-sizing: border-box;
        .details {
            position: absolute;
            left: 15px;
            top: -11px;
            font-size: 14px;
            color: #333333;
            text-align: left;
            background-color: #fff;
            width: 52px;
            height: 12px;
            text-align: center;
        }
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
        .table {
            margin-top: 15px;
            p {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                text-align: left;
            }
        }
    }
</style>
