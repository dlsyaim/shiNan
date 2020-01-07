<template>
  <div class="chart_page_wrap selfRepair">
    <div class="chart_top">
      <div class="chart_title">
        <!-- <img :src="chartTitleImg" /> -->
        <span>主动抢修</span>
      </div>
      <div class="chart_time">
        <!-- <el-date-picker
          v-model="currentDate"
          class="month-picker"
          size="small"
          :editable="false"
          :clearable="false"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @change="datePickerHandleChange"
        ></el-date-picker> -->
      </div>
    </div>
    <div class="chart_bottom">
      <div class="chart_bottom_top">
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="24" class="chartLeft">
                <p class="chartTop">
                  今日主动抢修工单
                  <span>{{countDatas.a*1 + countDatas.b*1 + countDatas.c*1}}</span>
                  张
                </p>
                <div class="processBox"><div class="processStatusBox"></div></div>
                <div>
                  <div class="processed">
                    已处理：
                    <span>0</span>
                    张
                  </div>
                  <div class="untreated">
                    未处理：
                    <span>{{countDatas.a*1 + countDatas.b*1 + countDatas.c*1}}</span>
                    张
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="8" class="chartRight">
                <div class="chartIcon" @click="loadTableData(0)">
                  <img :src="chartTitleImg" alt />
                </div>
                <div class="chartBox" @click="loadTableData(0)">
                  <p>今日台区检测工单：</p>
                  <div>
                    <span>{{countDatas.a}}</span>
                    张
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="chartRight">
                <div class="chartIcon" @click="loadTableData(1)">
                  <img :src="chartTitleImg2" alt />
                </div>
                <div class="chartBox" @click="loadTableData(1)">
                  <p>今日指标异常工单</p>
                  <div>
                    <span>{{countDatas.b}}</span>
                    张
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="chartRight">
                <div class="chartIcon" @click="loadTableData(2)">
                  <img :src="chartTitleImg3" alt />
                </div>
                <div class="chartBox" @click="loadTableData(2)">
                  <p>今日HPLC采集异常工单</p>
                  <div>
                    <span>{{countDatas.c}}</span>
                    张
                  </div>
                </div>
              </el-col>
            </el-row> 
          </el-col>
        </el-row>
      </div>
      <div class="chart_bottom_bottom">
        <div class="wordOrder">{{cutTitle}}</div>
        <el-card shadow="never" class="tableBorder">
            <cuTable :tableHeaders="tableColumnsData" :allDatas="tableData" :formatterVal="{}" :height="'90%'" :cuLoading="loading"></cuTable>
        </el-card>
      </div>
    </div>
    <!-- <activerushdetail v-if="isShow" @on-close="onClose"></activerushdetail> -->
  </div>
</template>
<script>
// import activerushdetail from '@/views/abnormalHandler/selfRepair/detailpages/activerushdetail';
import request from '@/utils/request'
import apiPath from '@/api/apiPath'
import cuTable from '@/components/snxp-table'
export default {
  components: {
    // activerushdetail,
    cuTable
  },
  data() {
    return {
      chartTitleImg: require('../../images/11.png'),
      chartTitleImg2: require('../../images/12.png'),
      chartTitleImg3: require('../../images/13.png'),
      calendarImg: require('../../images/ic_calendar.png'),
      // 当前时间
      currentDate: (new Date().getFullYear() + '-' + ((new Date().getMonth() > 8) ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1))) +
                    "-" + (new Date().getDate() > 9 ? new Date().getDate() : "0"+new Date().getDate())),
      percentage: 67,
      customColor: '#95f204',
      showTodayCharts: true,
      //弹窗隐藏
      isShow: false,
      tableData: [],
      tableColumnsData: [],
      loading: false,
      countDatas: {'a': 0, 'b': 0, 'c': '0'},
      cutTitle: '今日台区检测工单'
    };
  },
  mounted() {
    this.loadHeaderCount();
    this.loadTableData(0);
  },
  methods: {
    //点击出现弹框
    tablePowerView() {
      this.isShow = true;
    },
    //点击关闭弹框
    onClose() {
      this.isShow = false;
    },
    //加载最上面3个统计
    loadHeaderCount(){
      const params = {"SSGS": "SP05", "RQ": "1"}
      //重载
      let cz = request({
        url: apiPath.SN_ZZTJ,
        method: 'get',
        params: params
      });
      //过电压
      let gdy = request({
        url: apiPath.SN_GDYTJ,
        method: 'get',
        params: params
      });
      let bSum = 0;
      Promise.all([cz, gdy]).then(ress => {
        let res1 = ress[0];
        let res2 = ress[1];
        console.log("ress", ress);
        if(res1 && res1.data && res1.data.length){
          res1.data.forEach(item => {
            bSum = bSum*1 + (isNaN(item.ZZS*1) ? 0 : item.ZZS*1)
          })
        }
        if(res2 && res2.data && res2.data.length){
          res2.data.forEach(item => {
            bSum = bSum*1 + (isNaN(item.GDYS*1) ? 0 : item.GDYS*1)
          })
        }
        this.countDatas['b'] = bSum;
      })
      let preDate = new Date(new Date().getTime() - 24*60*60*1000);
      preDate = (preDate.getFullYear() + '-' + ((preDate.getMonth() > 8) ? (preDate.getMonth() + 1) : ('0' + (preDate.getMonth() + 1))) +
                    "-" + (preDate.getDate() > 9 ? preDate.getDate() : "0"+ preDate.getDate()))
      // TODO org_no 3140201 时间区间未确认
      const params2 = {"org_no": "3140201", "data_beg_date": preDate, "data_end_date": this.currentDate}
      request({
        url: apiPath.powoff_event_stat,
        method: 'get',
        params: params2
      }).then(res => {
        
        if(res && res.data && res.data.length){
          this.countDatas.c = res.data[0].EVENTNUM1
        }
      })
      
      request({
        url: apiPath.gongDanCount,
        method: 'get',
        params: {"SSGS": 'SP05'}
      }).then(res => {
        if(res && res.data){
          this.countDatas.a = res.data.TQYCZS
        }
      })

    },
    loadTableData(index){
      
      if(index === 0){
        this.cutTitle = "今日台区检测工单";
        this.tableColumnsData = [
          {'key': 'GZSBMC', 'name':  '故障设备名称', 'minWidth': '128'},
          {'key': 'QXDZT', 'name':  '抢修单状态', 'minWidth': '128'},
          {'key': 'LYMC', 'name':  '来源名称', 'minWidth': '128'},
          {'key': 'JDDJSJ', 'name':  '接单登记时间', 'minWidth': '128'},
          {'key': 'BXSJ', 'name':  '报修时间', 'minWidth': '128'},
          {'key': 'BXNR', 'name':  '报修内容', 'minWidth': '128'},
          {'key': 'TZQXSJ', 'name':  '通知抢修时间', 'minWidth': '128'},
          {'key': 'JLDDSJ', 'name':  '记录到达时间', 'minWidth': '128'},
          {'key': 'SSTQ', 'name':  '所属台区', 'minWidth': '128'},
        ];
        this.getDetailDataByParams(apiPath.GDMX_TQJC, {"SSGS": "SP05"})
      }else if(index === 1){
        this.cutTitle = "今日指标异常工单";  
        this.tableColumnsData = [
          {'key': 'GZSBMC', 'name':  '故障设备名称', 'minWidth': '128'},
          {'key': 'QXDZT', 'name':  '抢修单状态', 'minWidth': '128'},
          {'key': 'LYMC', 'name':  '来源名称', 'minWidth': '128'},
          {'key': 'JDDJSJ', 'name':  '接单登记时间', 'minWidth': '128'},
          {'key': 'BXSJ', 'name':  '报修时间', 'minWidth': '128'},
          {'key': 'BXNR', 'name':  '报修内容', 'minWidth': '128'},
          {'key': 'TZQXSJ', 'name':  '通知抢修时间', 'minWidth': '128'},
          {'key': 'JLDDSJ', 'name':  '记录到达时间', 'minWidth': '128'},
          {'key': 'SSTQ', 'name':  '所属台区', 'minWidth': '128'},
        ];
        this.getDetailDataByParams(apiPath.GDMX_ZBYC, {"SSGS": "SP05"})
      }else if(index === 2){
        this.cutTitle = "今日HPLC采集异常工单";
        this.tableColumnsData = [
          {'key': 'YHMC', 'name':  '用户名', 'minWidth': '128'},
          {'key': 'QXDZT', 'name':  '抢修单状态', 'minWidth': '128'},
          {'key': 'LYMC', 'name':  '来源名称', 'minWidth': '128'},
          {'key': 'BXSJ', 'name':  '报修时间', 'minWidth': '128'},
          {'key': 'JDDJSJ', 'name':  '接单登记时间', 'minWidth': '128'},
          {'key': 'BXNR', 'name':  '报修内容', 'minWidth': '128'},
          {'key': 'TZQXSJ', 'name':  '通知抢修时间', 'minWidth': '128'},
          {'key': 'JLDDSJ', 'name':  '记录到达时间', 'minWidth': '128'},
        ];
        this.getDetailDataByParams(apiPath.GDMX_YCGD, {"SSGS": "314201"})
        
      }
    },
    getDetailDataByParams(url, params){
      this.tableData = [];
      this.loading = true;
      request({
          url: url,
          method: 'get',
          params: params
        }).then(res => {
          if(res && res.data){
            this.tableData = res.data;
          }else{
            this.tableData = [];
          }
          this.loading = false;
        }).catch(() => {
          this.tableData = [];
          this.loading = false;
        })
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-table th.gutter {
  display: table-cell !important;
}
.chart_bottom {
  padding: 0 10px 20px 10px;
  background-color: #f7f9fa;
}
.chart_page_wrap {
  height:calc(100% - 40px);
}
.chart_bottom_top {
  height: 130px;
  line-height: 1;
  padding-left: 0;
}
.chartLeft {
  display: table;
  width: 100%;
  line-height: 1;
  font-size: 14px;
  margin: 26px 0;
}

.chartLeft p {
  margin: 0;
}
.chartLeft .chartTop {
  margin-bottom: 10px;
}
.chartLeft span {
  padding: 0 10px;
  font-weight: bold;
  color: #02a7f0;
}
.processBox {
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #fbe4c2;
  margin-bottom: 20px;
}
.processStatusBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 1%;
  height: 20px;
  background-color: #95f204;
}
.processed {
  float: left;
}
.untreated {
  float: right;
}
.chartRight {
  line-height: 1;
  font-size: 16px;
  color: #797a7a;
  text-align: center;
  margin: 30px 0;
  cursor: pointer;
}

.chartIcon {
  display: inline-block;
  width: 70px;
  height: 70px;
  margin-right: 30px;
  // background-color: blue;
  vertical-align: middle;
}
.chartBox {
  display: inline-block;
  vertical-align: middle;
}
.chartBox p {
  margin: 0 0 38px 0;
}
.chartRight span {
  font-weight: bold;
  color: #02a7f0;
}
.chart_bottom_bottom {
  box-sizing: border-box;
  padding: 10px 20px 20px;
  border: 1px solid #d7d7d7;
  background-color: #ffffff;
  height: calc(100% - 130px);
}
.wordOrder {
  position: relative;
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin-left: 7px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
}
.wordOrder::before {
  content: '';
  position: absolute;
  left: -7px;
  width: 7px;
  height: 42px;
  background-color: #3e5468;
}
.tableBorder {
  border-color: #d7d7d7;
  border-radius: 0;
      height: calc(100% - 42px);
}
.analysisOrder {
  width: 104px;
  height: 24px;
  line-height: 24px;
  margin: 15px 0;
  font-size: 12px;
  text-align: center;
  border: 1px solid #d7d7d7;
  margin-top: 0;
}
.tableOrder {
  margin-bottom: 10px;
  height: calc(100% - 110px);
      overflow: auto;
}
.tableOrder i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #f59a23;
}
.tableOrder .active {
  background-color: #04f21c;
}
.el-pagination {
  float: right;
}
.el-pagination /deep/ .btn-prev,
.el-pagination /deep/ .btn-next {
  border: 1px solid #797979;
}
.el-pagination /deep/ li {
  border: 1px solid #797979;
  border-left: 0;
}
.el-pagination /deep/ .btn-next {
  border-left: 0;
}
/deep/.tableBorder .el-card__body{
  height: 100%;
}

.selfRepair{
    /deep/ .el-card__body{
      /deep/ .table-wrap{
        height: 100%;
        /deep/ .el-table__body-wrapper{
          height: 100%!important;
        }
      }
    }
    .table_content{
      .details{
        width: 140px;
      }
    }
  }
</style>
