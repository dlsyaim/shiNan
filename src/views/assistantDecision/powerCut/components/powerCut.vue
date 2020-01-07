<template>
  <div class="details">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-col :span="6">
        <img :src="calendarImg" alt class="top_log" />
      </el-col>
      <el-col :span="4">
        <div class="top_centering">
           <div>
             <p>{{total}}</p>
             <p>今日停电计划</p>
           </div>
        </div>
      </el-col>
      <el-col :span="10">
          <el-row class="row_one">受影响低压用户<div class="processBox"><a>{{dyyh}}</a><div class="processStatusBox" :style='getWidth("dyyh")'></div></div></el-row>
          <el-row class="row_one">受影响中压用户<div class="processBox"><a>{{zyyh}}</a><div class="processStatusBox color" :style='getWidth("zyyh")'></div></div></el-row>
      </el-col> 
    
    </el-form>
    <div class="table_content">
      <span class="details">明细:</span>
      <div class="table_content_top" >   
        <span @click="closeShow(0)">
          <img :src="chartTitleImg" alt /> 低压用户
        </span>
        <span @click="closeShow(1)">
          <img :src="chartTitleImg" alt /> 中压用户
        </span>
      </div>

      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          border
          highlight-current-row
          style="width: 100%"
          height='calc(100%)'
          @row-click='getSBID'
          :header-cell-style="{background:'#cbecf2',color:'#333333'}"
        >
          <el-table-column fixed prop="DW" label="单位" width="128"></el-table-column>
          <el-table-column prop="TDTZDB_ID" label="停电通知表单id" width="128"></el-table-column>
          <el-table-column prop="TZDBH" label="停电通知编号" width="128"></el-table-column>
          <el-table-column prop="TDFW" label="停电范围" width="300">
          <template slot-scope='scope'>
            <p v-html="getHtml(scope)">

            </p>
          </template>
          </el-table-column>
          <el-table-column prop="TDSJ" label="停电时间" width="128"></el-table-column>
          <el-table-column prop="SDSJ" label="送电时间" width="128"></el-table-column>
          <el-table-column prop="SBMC" label="设备名称" width="128"></el-table-column>
          <el-table-column prop="FBSJ" label="发布时间" width="128"></el-table-column>
          <el-table-column prop="XLID" label="线路id" width="128"></el-table-column>
          <el-table-column prop="XLMC" label="线路名称" width="128"></el-table-column>
          <el-table-column prop="BDZMC" label="变电站名称" width="128"></el-table-column>
          <el-table-column prop="BDZID" label="变电站id" width="128"></el-table-column>
        </el-table>
        <el-pagination
                background
                prev-text="上一页"
                next-text="下一页"
                @size-change="handleSizeChange"
                @current-change="handleSizeChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, jumper, next, pager, prev"
                :total="total">
              </el-pagination>
      </div>
    </div>
    <activerush :tableHeaders='tableHeaders' :total='mxTotal' :maxData='tdmxDatas' v-if="isShow" @on-close="onClose"></activerush>
  </div>
</template>

<script>
import activerush from '@/views/assistantDecision/inspection/detailpages/activerush'
import MyEcharts from "@/views/intelliOper/components/lineCharts"; //echarts
import { getTDJHZDYXYHData,getTDZSData,getYXYHMXData } from "@/api/api";
export default {

  components: {
    MyEcharts,
    activerush
  },
  data() {
    return {
      loading: false,
      //弹窗隐藏
      isShow:false,
      loading:false,
      chartTitleImg: require("../../images/ic_file.png"),
      calendarImg: require("../../images/ic_hour.png"),
      currentPage:1,
      pageSize: 10,
      tableHeaders:[
        {
          prop:'DW',
          label:'运维单位编号',
        },
        {
          prop:'DWMC',
          label:'运维单位名称',
        },
        {
          prop:'YHZYX',
          label:'用户重要性',
        },
        {
          prop:'YHLX',
          label:'用户类型',
        },
        {
          prop:'HH',
          label:'户号',
        },
        {
          prop:'KHMC',
          label:'客户名称',
        },
        {  
          prop:'DYDJ',
          label:'电压等级',
        },
        {
          prop:'DYDJMC',
          label:'电压等级名称',
        },
        {
          prop:'LXDH',
          label:'联系电话',
        },
        {
          prop:'YDDZ',
          label:'地址',
        },
        {
          prop:'SFZYYH',
          label:'是否重要用户',
        },
        {
          prop:'TDSJ',
          label:'停电时间',
        },
        {
          prop:'SDSJ',
          label:'送电时间',
        },
        {
          prop:'JRDMC',
          label:'接入点名称',
        },
        {
          prop:'JRDID',
          label:'接入点id',
        },
        {
          prop:'TZDBH',
          label:'通知单编号',
        },
      ],
      mxTotal:0,
      total:0,
      maxData:[],
      tdzsDatas:[],
      dyyh:0,
      zyyh:0,
      zyh:0,
      tdmxDatas:[],
      chartOption: {},
      dialogFormVisible: false,
      returnData: null,
      loadcure: false,
      exampleId:{},
      formInline: {
        user: "",
        region: ""
      },
      currentDate:'',
      tableData: [],
    };
   
  },
  mounted() {
    this.getTodayData();  
    this.getTDZS();
    this.initCharts();  
    this.list();
  },

  computed:{
  },
  methods: {
    getSBID(){

    },
      //点击出现弹框
    closeShow(index){
      this.isShow=true,
      this.tdmxData(index);
    },
    getHtml(data){
      if(!data.row)
      {
        return ""
      }
      if(data.row.TDFW)
      {
        return data.row.TDFW
      }else
      {
        return ""
      }
    },
    getWidth(name){
      if(name==='dyyh')
      {
        return {
          width:this.dyyh / this.zyh *100 + "%"
        }
      }else
      {
        return {
          width:this.zyyh / this.zyh *100 + "%"
        }
      }
    },
    //点击关闭弹框
    onClose() {
      this.isShow=false
    },
    getTDZS(){
      let postData={
         SDATE:this.currentDate + ' 00:00:00',
         /*KSSJ:this.currentDate + ' 00:00:00',*/
         EDATE:this.currentDate + ' 23:59:59',
         /*JSSJ:this.currentDate + ' 23:59:59',*/
        /* SDATE:'2019-10-02',
         KSSJ:'2019-10-02',
         EDATE:'2019-10-20',
         JSSJ:'2019-10-20',*/
         YWDW:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05'
       };
      getTDZSData(postData).then(res => {
          if (res.result_code === 0) {
            this.tdzsDatas = res.data;
            for(let i=0;i<res.data.length;i++)
            {
              this.dyyh+=parseInt(res.data[i].DYYHS);
              this.zyyh+=parseInt(res.data[i].ZYYHS);
            }
            this.zyh=this.dyyh+this.zyyh;
          } else {
            this.$message.error(res.message);
          }
        })
    },
    
    tdmxData(index){
      let postData={
         SDATE:this.currentDate + ' 00:00:00',
         /*KSSJ:this.currentDate + ' 00:00:00',*/
         EDATE:this.currentDate + ' 23:59:59',
         /*JSSJ:this.currentDate + ' 23:59:59',*/
         YWDW:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05',
         YHLX:index,
       };
      getYXYHMXData(postData).then(res => {
          if (res.result_code === 0) {
            this.tdmxDatas = res.data;
            this.mxTotal=this.tdmxDatas.length;
          } else {
            this.$message.error(res.message);
          }
        })
    },
    getTodayData(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if(month.length<10)
      {
        month='0'+month;
      }
      let day = date.getDate()
      if(day.length<10)
      {
        day='0'+day;
      }
      let time = year+"-"+month+"-"+day
      this.currentDate=time;
    },
    list () {
       let postData={
         SDATE:this.currentDate + ' 00:00:00',
         /*KSSJ:this.currentDate + ' 00:00:00',*/
         EDATE:this.currentDate + ' 23:59:59',
         /*JSSJ:this.currentDate + ' 23:59:59',*/
        /* SDATE:'2019-10-02',
         KSSJ:'2019-10-02',
         EDATE:'2019-10-20',
         JSSJ:'2019-10-20',*/
         YWDW:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05'
       };
       getTDJHZDYXYHData(postData).then(res => {
          console.log(res);
          if (res.result_code === 0) {
            this.maxData = res.data;
            this.total=this.maxData.length;
            this.handleSizeChange(1);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err);
        })
    },
    handleSizeChange(index){
      if(this.total<=this.pageSize)
      {
        this.tableData=this.maxData;
        this.currentPage=1;
      }else if(this.total<this.pageSize*index)
      {
        let data=[];
        for (let i=this.pageSize*(index-1);i<this.total.length-this.pageSize*(index-1);i++)
        {
          data.push(this.maxData[i])
        }
        this.tableData=data;
        this.index=1;
      }else
      {
        let data=[];
        for (let i=this.pageSize*(index-1);i<this.pageSize*index;i++)
        {
          data.push(this.maxData[i])
        }
        this.tableData=data;
        this.index=1;
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    initCharts() {
      this.chartOption = {
        legend: {
          data: ["负载率"]
        },
        xAxis: {
          type: "category",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        yAxis: {
          type: "value",
          name: "%",
          axisLine: {
            show: false
          }
        },
        series: [
          {
            data: [40, 42, 45, 41, 50, 45, 44, 60, 45, 50],
            smooth: true,
            name: "负载率",
            symbolSize: 12,
            type: "line",
            barWidth: "25%",
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            }
          }
        ]
      };
      this.exampleId = {
        xAxis: {
          nameTextStyle : {     
          fontSize : 20,
        },
          name: "时刻",
          data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96",]
        },
        yAxis: {
          name: "负荷/MV",
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name: "负荷/MV",
          nameTextStyle : {
          fontSize : 20,
          padding : [0, 0, 30, 0],
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
        }, {
            type: 'inside'
        }],
        
        series: {
          name: '负荷',
            smooth:false, 
            type: 'line',
            symbolSize: 1,
            data: ["126","120","111","150","166","126","136","176","136","176","126","90","111","150","166","126","136","176","136","176","126","120","111","150","166","126","80","176","136","176","126","120","70","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126"],
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            },
        }
      }
    }
  }
};
</script>
  
<style scoped lang="scss">
.details {
  width: 100%;
  height: calc(100% - 20px);
  padding: 10px;
  box-sizing: border-box;
  margin-top: -10px;
  
}
.equipment_name {
    float: left;
    margin-left: 13px;
    span:nth-child(1) {
      font-size: 16px;
      color: #333333;
    }
    span:nth-child(2) {
      font-size: 16px;
      color: #27b7bb;
    }
  }
.demo-form-inline {
  text-align: left;
  // border: 1px solid #cccccc;
  padding: 0 10px;
  padding-top: 8px;
  border-radius: 5px;
  height: 120px;
  box-sizing: border-box;
}
.button_right {
  text-align: right;
  padding-right: 30px;
  span {
    padding: 10px 10px;
    cursor: pointer;
  }
  span:nth-child(1) {
    background-color: #2e414f;
    margin-right: 10px;
    color: #ffffff;
    border-radius: 5px;
  }
  span:nth-child(2) {
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
}
.table_content {
  height: calc(100% - 200px); 
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
    top: -9px;
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
    height: calc(100% - 100px);
    .el-pagination{
      text-align: right;
      margin-top: 10px;
    }
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: left;
    }
  }
}
/deep/.table .el-table td,
.el-table th {
  text-align: center;
}
/deep/.table .el-table th > .cell {
  text-align: center;
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
/deep/.table .el-table__body tr.current-row>td{
    background-color: #F5F5F5!important;
  }
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
  height: 620px;
  box-sizing: border-box;
  padding: 0 20px;
  .locure_charts {
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border: 1px solid #dadada;
    box-sizing: border-box;
  }
}
.curve_ {
  width: 100%;
  height: 620px;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 20px;
  .curve_left {
    width: 48.7%;
    height: 600px;
    border: 1px solid #dadada;
    float: right;
    margin-left: 20px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .curve_right {
    width: 48.7%;
    height: 600px;
    border: 1px solid #dadada;
    float: right;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .cure_top {
    border-left: 4px solid #27b7bb;
    text-align: left;
    color: #333333;
    font-size: 16px;
    font-weight: 400;
    margin-top: 28px;
    font-family: Microsoft YaHei;
  }
  /deep/.el-form-item {
    margin-bottom: 18px;
  }
}
 /deep/.el-table--scrollable-x .el-table__body-wrapper{
    height: calc(100% - 71px);
}
.top_log{
  height: 110px;
  line-height: 110px;
}
.top_centering{
  height: 100px;
  width: 200px;
  background-color: #F7F7F7;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: -25px;
}
.top_centering p:nth-child(1) {
  font-size: 25px;
  color: red;
  padding: 0;
  margin: 0;
}
.top_centering p:nth-child(2) {
  
  padding: 0;
  margin: 0;
}
.processBox {
  position: relative;
  width: 80%;
  height: 20px;
  background-color: #D7D7D7;
  margin-bottom: 20px;
  margin-left: 10px;
  border-radius:10px;
}
.processBox a{
  width:100%;
  position:absolute;
  z-index:9;
  color:#fff;
  font-Size:14px;
  height: 20px;
  line-height:20px;
  text-align: center;
}
.processStatusBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 20px;
  background-color: #02A7F0;
  border-radius: 10px;
  transition:0.5s;
}
.processStatusBox.color{
  background-color: #95F204;
}
.row_one{
  height: 50px;
  display: flex;
}
/deep/ .el-dialog__body {
  height: 520px!important;
    overflow: scroll!important;
}
</style>
