<template>
  <div class="table-wrap">
    <el-table
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      :data="tableShowData"
      :empty-text="emptyText"
      :height="height"
      align="center"
      border
      :highlight-current-row="(currentRow && currentRow.flag) || false"
      @current-change="currentChange"
      style="width: 100%"
      :header-cell-style="{background:'#cbecf2',color:'#333333'}">
      <el-table-column label="操作" width="150" align="center">
        <i class="el-icon-location" style="color:#FC4E4A;cursor: pointer;" @click="toMap('tomap')"></i>
      </el-table-column>
      <el-table-column v-for="(column, index) in tableHeaders" :key="'tableColumn' + index"
                       :prop=column.key
                       :label=column.name
                       :min-width=column.minWidth
                       :formatter="column.fKey ? formatterTable : null">
      </el-table-column>

    </el-table>
    <el-pagination
      style="text-align: right;"
      background
      @current-change="handleCurrentChange"
      @current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalLen">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "slxp-table",
    props:{
      tableHeaders:{
        type: Array,
        default: () => []
      },
      allDatas: {
        type: Array,
        default: () => []
      },
      formatterVal: {
        type: Object,
        default: () => {}
      },
      reqPageChanage: {
        type: Object,
        default: () => null
      },
      reqTotal: {
        type: Number,
        default: () => null
      },
      reqShowData: {
        type: Array,
        default: () => null
      },
      currentRow: {
          type: Object,
          default: () => {}
      },
      height: {
          type: String,
          default: '500'
      },
      cuLoading: {
          type: Boolean,
          default: false
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalLen: this.reqTotal || 0,
        tableShowData: [],
        tempAllDatas: [],
        emptyText: '加载中',
        tableHeadersEachas: [],
        loading: true,
        execTimeOut: false,
        execTimeOutFn: null,
//        formatterVal: this.formatterVal,
      }
    },
    mounted(){
    },
    watch: {
      allDatas(newVal){
          if(!newVal || !newVal.length){
              this.emptyText = '暂无数据';
              this.tableShowData = [];
          }
          this.loading = true;
//        if(newVal !== this.tempAllDatas){
          this.currentPage = 1;
          this.tempAllDatas = newVal
          this.totalLen = this.tempAllDatas.length
          //默认第一页的数据
          let startIndex = (this.currentPage - 1) * this.pageSize;
          let endIndex = this.currentPage * this.pageSize;
          this.tableShowData = this.tempAllDatas.slice(startIndex, endIndex);
          this.loading = false;
//        }
      },
      tableHeaders(newVal){
        if(this.tableHeaders !== newVal){
          this.tableHeaders = newVal;
        }
      },
      reqTotal(newVal){
        this.totalLen = newVal;
      },
      reqShowData(newVal){
        this.loading = false
        this.tableShowData = newVal
      },
      currentRow(newVal){
          this.currentRow = newVal || {};
      },
      cuLoading(newVlaue){
          this.loading = newVlaue;
      },
      loading(newValue){
          if(newValue){
              this.execTimeOut && window.clearTimeout(this.execTimeOutFn);
              const _this = this;
              _this.execTimeOut = true;
              this.execTimeOutFn = window.setTimeout(() => {
                _this.execTimeOut = false;
                _this.loading = false;
              }, 30000)
          }else if(newValue && this.execTimeOut){
              window.clearTimeout(this.execTimeOutFn);
              this.execTimeOutFn = null;
          }
      }
    },
    methods: {
      formatterTable(row, column, cellValue, index){
//          console.log("cellValue", cellValue)
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
      handleCurrentChange(pageNum){
        if(this.reqShowData){
          this.loading = true;
          this.$emit('reqPageChanage', pageNum)
        }else{
          this.loading = true;
          this.currentPage = pageNum;
          let startIndex = (this.currentPage - 1) * this.pageSize;
          let endIndex = this.currentPage * this.pageSize;
          this.tableShowData = this.tempAllDatas.slice(startIndex, endIndex);
          this.loading = false;
        }
      },
      handleClick(tab, event) {
//            console.log(tab, event);
        const _this = this;
        this.$nextTick(() => {
          if (tab.name === 'second') {
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
                          height:'70%'
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
                            data : ['线路运检组','线路运检一组','配电运维组','配电运维二组','变电中心三站', '变电中心三站','变电中心三站']
                          }
                        ],
                        yAxis : [
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
                                color: '#27b7bb'
                              }
                            },
                            barWidth: '20px',
                            data:[0, 0, 0, 0, 0, 0, 0]
                          },
                          {
                            name:'容量',
                            type:'line',
                            itemStyle: {
                              normal: {
                                color: '#f55a36'
                              }
                            },
                            smooth: false,
                            yAxisIndex: 1,
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
                                  // 自定义颜色
                                  var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                  return colorList[params.dataIndex]
                                }
                              }
                            },
                            data:[
                              {value: 129, name: '0-5年'},
                              {value: 72, name:'5-10年'},
                              {value: 173, name:'10-15年'},
                              {value: 85, name:'15-20年'},
                              {value: 101, name:'20年以上'}
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
                          height:'70%'
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
                            data : ['线路运检组','线路运检一组','配电运维组','配电运维二组','变电中心三站', '变电中心三站','变电中心三站']
                          }
                        ],
                        yAxis : [
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
                                color: '#4394e9'
                              }
                            },
                            barWidth: '18px',
                            data:[86, 50, 60, 10,60, 10, 20]
                          },
                          {
                            name:'容量',
                            type:'line',
                            itemStyle: {
                              normal: {
                                color: '#f55a36'
                              }
                            },
                            smooth: false,
                            yAxisIndex: 1,
                            data:[600, 100, 100,330, 600, 100, 100]
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
                              {value: 129, name: '0-5年'},
                              {value: 72, name:'5-10年'},
                              {value: 173, name:'10-15年'},
                              {value: 85, name:'15-20年'},
                              {value: 101, name:'20年以上'}
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
                          height:'70%'
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
                            data : ['线路运检组','线路运检一组','配电运维组','配电运维二组','变电中心三站', '变电中心三站','变电中心三站']
                          }
                        ],
                        yAxis : [
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
                                color: '#fece28'
                              }
                            },
                            barWidth: '18px',
                            data:[0, 0, 0, 0, 0, 0, 0]
                          },
                          {
                            name:'容量',
                            type:'line',
                            itemStyle: {
                              normal: {
                                color: '#f55a36'
                              }
                            },
                            smooth: false,
                            yAxisIndex: 1,
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
                                  // 自定义颜色
                                  var colorList = ['#FECE28', '#FE9C28','#86E04F','#27B7BB', '#4394E9']
                                  return colorList[params.dataIndex]
                                }
                              }
                            },
                            data:[
                              {value: 129, name: '0-5年'},
                              {value: 72, name:'5-10年'},
                              {value: 173, name:'10-15年'},
                              {value: 85, name:'15-20年'},
                              {value: 101, name:'20年以上'}
                            ]
                          }
                        ]
                      }
                    }
                  }
                ]
              }
              this.loadTab2Group(null, 0);
//                      this.loadTab2Group(null, 1);
//                      this.loadTab2Group(null, 2);
            }
          }else if (tab.name === 'third'){
            if(!_this.ThirdData){
              let dataZoomEnd = 100;
              _this.ThirdData = {
                data: [
                  {
                    title: '架空线',
                    chartsData: {
                      bar: {
                        tooltip : {
                          trigger: 'axis'
                        },
                        grid:{
                          y:'10%',
                          height:'70%'
                        },
                        toolbox: {
                          show : false
                        },
                        calculable : true,
                        legend: {
                          data:['0.4kV']
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
                            name : ' ',
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
                            name:'0.4kV',
                            type:'bar',
                            itemStyle: {
                              normal: {
                                color: '#4394E9'
                              }
                            },
                            barWidth: '18px',
                            data:[86, 50, 60, 10, 20, 86, 50, 60, 10, 20]
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
                              {value: 129, name: '0-5年'},
                              {value: 72, name:'5-10年'},
                              {value: 173, name:'10-15年'},
                              {value: 85, name:'15-20年'},
                              {value: 101, name:'20年以上'}
                            ]
                          }
                        ]
                      }
                    }
                  },
                  {
                    title: '电缆',
                    chartsData: {
                      bar: {
                        tooltip : {
                          trigger: 'axis'
                        },
                        grid:{
                          y:'10%',
                          height:'70%'
                        },
                        toolbox: {
                          show : false
                        },
                        calculable : true,
                        legend: {
                          data:['0.4kV']
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
                            name : ' ',
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
                            name:'0.4kV',
                            type:'bar',
                            itemStyle: {
                              normal: {
                                color: '#FECE28'
                              }
                            },
                            barWidth: '18px',
                            data:[86, 50, 60, 10, 20, 86]
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
                              {value: 129, name: '0-5年'},
                              {value: 72, name:'5-10年'},
                              {value: 173, name:'10-15年'},
                              {value: 85, name:'15-20年'},
                              {value: 101, name:'20年以上'}
                            ]
                          }
                        ]
                      }
                    }
                  }
                ]
              }
              _this.loadTab3Group(null, 0);
              _this.loadTab3Group(null, 1);
            }

          }else if(tab.name === 'fourth') {
            _this.FourthData = {
              data: [
                {
                  title: '分支箱',
                  total: 472,
                  volume: 2058.868,
                  chartsData: {
                    bar: {
                      tooltip : {
                        trigger: 'axis'
                      },
                      grid:{
                        y:'10%',
                        height:'70%'
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
                          end: 50,
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
                          data : ['线路运检一组','线路运检二组','配电运检一组','配电运检二组','变电中心三站', '变电中心三站','变电中心三站']
                        }
                      ],
                      yAxis : [
                        {
                          type : 'value',
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
                              color: '#27B7BB'
                            }
                          },
                          barWidth: '18px',
                          data:[86, 50, 60, 10, 60, 10, 20]
                        },
                        {
                          name:'容量',
                          type:'line',
                          itemStyle: {
                            normal: {
                              color: '#F55A36'
                            }
                          },
                          smooth: false,
                          yAxisIndex: 1,
                          data:[330, 600, 100, 330, 600, 100, 100]
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
                            {value: 129, name: '0-5年'},
                            {value: 72, name:'5-10年'},
                            {value: 173, name:'10-15年'},
                            {value: 85, name:'15-20年'},
                            {value: 101, name:'20年以上'}
                          ]
                        }
                      ]
                    }
                  }
                }
              ]
            };
            _this.FifthData = {
              data: [
                {
                  title: '用户表箱',
                  total: 1000,
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
                          data:[69]
                        },
                        {
                          name:'智能表箱',
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
                          data:[78]
                        },
                        {
                          name:'智能表箱',
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
                            {value: 129, name: '0-5年'},
                            {value: 72, name:'5-10年'},
                            {value: 173, name:'10-15年'},
                            {value: 85, name:'15-20年'},
                            {value: 101, name:'20年以上'}
                          ]
                        }
                      ]
                    }
                  }
                }
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
      currentChange(val){
          if(this.currentRow){
              this.currentRow.fn && this.currentRow.fn(val);
          }
      }

    }
  }
</script>

<style lang="scss" scoped>
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
    /deep/ .el-loading-spinner .el-loading-text {
      color: #000;
    }
    /deep/ .el-loading-spinner i {
      color: #000;
    }
</style>
