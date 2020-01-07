<template>
  <div class="details inspection">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-col :span="8">
        <img :src="calendarImg" alt class="top_log" />
      </el-col>
      <el-col :span="4">
        <div class="top_centering">
           <div @click="loadTableData(0)">
             <p>{{countDatas.a}}</p>
             <p>最高优先级巡检</p>
           </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top_centering">
           <div @click="loadTableData(1)">
             <p style="color: #FF912F;">{{countDatas.b}}</p>
             <p>次要优先级巡检</p>
           </div>
        </div>

      </el-col>
      <el-col :span="4">
        <div class="top_centering">
           <div @click="loadTableData(2)">
             <p style="color: #4F8DF2;">{{countDatas.c}}</p>
             <p>频繁台区巡检</p>
           </div>
        </div>

      </el-col>
      <el-col :span="4">
        <div class="top_centering">
           <div @click="loadTableData(3)">
             <p style="color: #30BF48;">{{countDatas.d}}</p>
             <p>台区周期巡检</p>
           </div>
        </div>

      </el-col>
    </el-form>
    <div class="table_content">
      <span class="details">{{detailsTitile}}</span>
      <div class="table_content_top" @click="closeShow()">
        <span>
          <img :src="chartTitleImg" alt /> 巡视记录
        </span>
      </div>
      <div class="table">
        <cuTable :tableHeaders="tableColumnsData" :allDatas="tableData" :formatterVal="{}" :height="'94%'" :cuLoading="loading" :currentRow="currentRowOptions"></cuTable>
      </div>
    </div>
    <!--弹窗-->
    <popup v-if="tablePopupConfig.show" :config="tablePopupConfig" @close="closePopup('tablePopupConfig')"  class="equipPopup">
      <div slot="popup-data" class="popupContent">
        <div class="data-wrap" style="padding: 15px;">
          <div class="param-wrap">
            <el-dropdown style="float: right" trigger="click">
              <el-button icon="el-icon-s-grid" size="mini" style="padding: 0 2px 0 2px;width: 52px;height: 34px">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <!-- <el-dropdown-menu slot="dropdown" v-if="dropdownData">
                <div v-for="(item, index) in dropdownData" :key=index>
                  <el-dropdown-item>{{item}}</el-dropdown-item>
                </div>
              </el-dropdown-menu> -->
            </el-dropdown>
            <el-input type="text" v-model="input" placeholder="搜索" prefix-icon="el-icon-search" size="small" clearable style="width: 180px;height: 34px;float: right"></el-input>
          </div>
          <div class="table">
            <cuTable :tableHeaders="tableHeadersPopup" :allDatas="allDatasPopup" :formatterVal="{}" :cuLoading="loadingPopup"></cuTable>
          </div>
        </div>
      </div>
    </popup>
    <!--<activerush v-if="isShow" @on-close="onClose"></activerush>-->
  </div>
</template>

<script>
import activerush from '@/views/assistantDecision/inspection/detailpages/activerush'
import MyEcharts from "@/views/intelliOper/components/lineCharts";
import request from '@/utils/request'
import apiPath from '@/api/apiPath'
import cuTable from '@/components/snxp-table'
import popup from '@/components/snxp-popup'
//import { getPowerListData } from "@/api/api";
export default {
  components: {
    MyEcharts,
    activerush,
    cuTable,
    popup
  },
  data() {
    return {
      //弹窗隐藏
      isShow:false,
      chartTitleImg: require("../../images/ic_file.png"),
      calendarImg: require("../../images/ic_log.png"),
      pageSize: 10,
      chartOption: {},
      dialogFormVisible: false,
      returnData: null,
      loadcure: false,
      exampleId:{},
      input:'',
      currentDate: (new Date().getFullYear() + '-' + ((new Date().getMonth() > 8) ? (new Date().getMonth() + 1) : ('0' + (new Date().getMonth() + 1))) +
                      "-" + (new Date().getDate() > 9 ? new Date().getDate() : "0"+new Date().getDate())),
      formInline: {
        user: "",
        region: ""
      },
      cyyxjxjResDate: null,
      countDatas: {'a': 0, 'b': 0, 'c': '0', 'd': 0},

      tableData: [],
//      tableShowData: [],
      tableColumnsData: [],
      loading: false,
      tablePopupConfig: {
        show: false,
        title: '巡检记录'
      },

      tableHeadersPopup: [],
      allDatasPopup: [],
      loadingPopup: false,
      currentRowOptions: {"flag": true, "fn": this.currentSelectDataChange},
      BDZId: null,
      detailsTitile: '明细',
    };

  },
  mounted() {
      this.tableData = []
      this.loadHeaderCount();
      this.loadTableData(0);
  },

  computed:{
    total() {
        return this.tableData.length
      },
  },
  methods: {
      //点击出现弹框
    closeShow(){
        if(this.BDZId){
          this['tablePopupConfig'].show =true;
          this.popupInit(this.BDZId);
        }
    },
    //点击关闭弹框
    closePopup(config){
      this[config].show = false
    },
    //加载最上面4个统计
    loadHeaderCount(){
      //最高优先级巡检
      request({
        url: apiPath.XJFASL,
        method: 'get',
        params: {"SSGS": "SP05"}
      }).then(res => {
        if(res.data && res.data){
          let data = res.data;
          this.countDatas['a'] = data.SL;
        }
      }).catch(() => {
        this.countDatas['a'] = 0;
      })
      //次要优先级巡检个数统计
      const count1Params = {"SSGS": 'SP05', "RQ": '1'};
      this.getCountDataByParams(apiPath.SN_GLTJ, count1Params, 'YZDGL', 'b');

      //频繁台区巡检
      const count2Params = {"SSGDDW": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05', "KSSJ": this.currentDate, "JSSJ": this.currentDate+" 23:59:59"};
      this.getCountDataByParams(apiPath.SN_GZQX_PFGZSBTJ, count2Params, 'SBS', 'c');

      //台区周期巡检
      const count3Params = {"SSGDDW": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05', "KSSJ": this.currentDate, "JSSJ": this.currentDate+" 23:59:59"};
      this.getCountDataByParams(apiPath.SN_ZQXJ_WXJTQTJ, count3Params, 'SL', 'd');

    },
    /**
     *  获取top 统计
     * @param url  请求路径
     * @param params 参数
     * @param key 返回数据取值key
     * @param showKey 页面展示key
     */
    getCountDataByParams(url, params, key, showKey){
      request({
        url: url,
        method: 'get',
        params: params
      }).then(res => {
        if(res.data && res.data.length){
          const datas = res.data;
          let sum = 0;
          datas.forEach(item => {
            sum = sum*1 + (isNaN(item[key]*1) ? 0 : item[key]*1);
          })
          this.countDatas[showKey] = sum;
          if(showKey === 'b'){
              this.cyyxjxjResDate = datas[0].DATA_DATE
          }
        }
      }).catch(() => {
        this.countDatas[showKey] = 0;
      })
    },
    list (params) {
//       getPowerListData()
//        .then(res => {
//          console.log(res);
//
//          if (res.code === 200) {
//            this.tableData = res.data;
//          } else {
//            this.$message.error(res.message);
//          }
//        })
//        .catch(err => {
//          this.$message.error(err);
//        })
    },
    onSubmit() {
      console.log("submit!");
    },
    loadTableData(index){
        this.BDZId = null;
        if(index === 0){
          this.detailsTitile = '最高优先级巡检';
          this.tableColumnsData = [
            {'key': 'SBID', 'name':  '设备id', 'minWidth': '128'},
            {'key': 'SBMC', 'name':  '设备名称', 'minWidth': '128'},
            {'key': 'rwdbh', 'name':  '任务单编号', 'minWidth': '128'},
            {'key': 'zycd', 'name':  '重要程度', 'minWidth': '128'},
            {'key': 'xslb', 'name':  '巡视类别', 'minWidth': '128'},
            {'key': 'dydj', 'name':  '电压等级（10kV）', 'minWidth': '128'},
            {'key': 'xsjh', 'name':  '巡视计划', 'minWidth': '128'},
            {'key': 'xsnr', 'name':  '巡视内容', 'minWidth': '128'},
            {'key': 'bz', 'name':  '备注', 'minWidth': '128'},
          ]
          //cyyxjxjResDate 时间从第一个统计 次要优先级 个数 统计 返回数据里面 拿去时间
          const params = {'SSGS': 'SP05'}
          let retDefaultDataFn = (item) => {
            return {'zycd': '最高优先级', 'xslb': '正常巡视', 'xsjh': '设备主人下个巡检周期必须现场勘察', 'xsnr': '巡视'+(item.SBMC || "")+'设备'};
          }
          this.getDetailDataByParams(apiPath.ZGYXJXJ, params, retDefaultDataFn)
        }else if(index === 1){
            this.detailsTitile = '次要优先级巡检';
            this.tableColumnsData = [
              {'key': 'SBID', 'name':  '设备id', 'minWidth': '128'},
              {'key': 'SBMC', 'name':  '设备名称', 'minWidth': '128'},
              {'key': 'rwdbh', 'name':  '任务单编号', 'minWidth': '128'},
              {'key': 'zycd', 'name':  '重要程度', 'minWidth': '128'},
              {'key': 'xslb', 'name':  '巡视类别', 'minWidth': '128'},
              {'key': 'dydj', 'name':  '电压等级（10kV）', 'minWidth': '128'},
              {'key': 'xsjh', 'name':  '巡视计划', 'minWidth': '128'},
              {'key': 'xsnr', 'name':  '巡视内容', 'minWidth': '128'},
              {'key': 'bz', 'name':  '备注', 'minWidth': '128'},
            ]
            //cyyxjxjResDate 时间从第一个统计 次要优先级 个数 统计 返回数据里面 拿去时间
            const params = {"KSSJ":this.cyyxjxjResDate, 'JSSJ': this.cyyxjxjResDate, 'SSGS': 'SP05', 'LX': '13'}
            let retDefaultDataFn = (item) => {
                return {'zycd': '次要优先级', 'xslb': '正常巡视', 'xsjh': '设备主人下个巡检周期必须现场勘察', 'xsnr': '巡视'+(item.SBMC || "")+'设备'};
            }
            this.getDetailDataByParams(apiPath.SN_FZMX, params, retDefaultDataFn)
        }else if(index === 2){
          this.detailsTitile = '频繁台区巡检';
          const params = {"KSSJ": this.currentDate, 'JSSJ': this.currentDate.toString() + " 23:59:59", 'SSGDDW': 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05'}
          this.tableColumnsData = [
            {'key': 'BYQID', 'name':  '变压器id', 'minWidth': '128'},
            {'key': 'BYQMC', 'name':  '变压器名称', 'minWidth': '128'},
            {'key': 'rwdbh', 'name':  '任务单编号', 'minWidth': '128'},
            {'key': 'zycd', 'name':  '重要程度', 'minWidth': '128'},
            {'key': 'xslb', 'name':  '巡视类别', 'minWidth': '128'},
            {'key': 'dydj', 'name':  '电压等级（10kV）', 'minWidth': '128'},
            {'key': 'xsjh', 'name':  '巡视计划', 'minWidth': '128'},
            {'key': 'xsnr', 'name':  '巡视内容', 'minWidth': '128'},
            {'key': 'bz', 'name':  '备注', 'minWidth': '128'},
          ]
          let retDefaultDataFn = (item) => {
            return {'zycd': '次要优先级', 'xslb': '正常巡视', 'xsjh': '设备主人下个巡检周期必须现场勘察', 'xsnr': '巡视'+(item.BYQMC || "")+'设备'};
          }
          this.getDetailDataByParams(apiPath.SN_GZQX_PFGZSBMX, params, retDefaultDataFn)
        }else if(index === 3){
          this.detailsTitile = '台区周期巡检';
          const params = {"KSSJ": this.currentDate, 'JSSJ': this.currentDate.toString() + " 23:59:59", 'SSGDDW': 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05'}
          this.tableColumnsData = [
            {'key': 'OBJ_ID', 'name':  '电站id', 'minWidth': '128'},
            {'key': 'BDZMC', 'name':  '电站名称', 'minWidth': '128'},
            {'key': 'rwdbh', 'name':  '任务单编号', 'minWidth': '128'},
            {'key': 'zycd', 'name':  '重要程度', 'minWidth': '128'},
            {'key': 'xslb', 'name':  '巡视类别', 'minWidth': '128'},
            {'key': 'dydj', 'name':  '电压等级（10kV）', 'minWidth': '128'},
            {'key': 'xsjh', 'name':  '巡视计划', 'minWidth': '128'},
            {'key': 'xsnr', 'name':  '巡视内容', 'minWidth': '128'},
            {'key': 'bz', 'name':  '备注', 'minWidth': '128'},
          ]
          let retDefaultDataFn = (item) => {
            return {'zycd': '次要优先级', 'xslb': '正常巡视', 'xsjh': '设备主人下个巡检周期必须现场勘察', 'xsnr': '巡视'+(item.BDZMC || "")+'设备'};
          }
          this.getDetailDataByParams(apiPath.SN_ZQXJ_WXJTQMX, params, retDefaultDataFn)
        }
    },
    getDetailDataByParams(url, params, retDefaultDataFn){
      this.loading = true;
      this.tableData = [];
      request({
        url: url,
        method: 'get',
        params: params
      }).then(res => {
        if(res.data && res.data.length){
          let tempData = []
          res.data.forEach(item => {
            const defaultData = retDefaultDataFn ? retDefaultDataFn(item) : {};
            tempData.push({...item, ...defaultData})
          })
          this.tableData = tempData
        }
        this.loading = false;
      }).catch(() => {
        this.tableData = [];
        this.loading = false;
      })
    },

    popupInit(id){
        this.loadingPopup = true;
        this.tableHeadersPopup = [
          {'key': 'OBJ_ID', 'name':  '巡视记录id', 'widht': '128'},
          {'key': 'XSJHID', 'name':  '巡视计划id', 'widht': '128'},
          {'key': 'DYDJ', 'name':  '电压等级', 'widht': '128'},
          {'key': 'DYDJMC', 'name':  '电压等级名称', 'widht': '128'},
          {'key': 'BDZ', 'name':  '电站id', 'widht': '128'},
          {'key': 'BDZMC', 'name':  '电站名称', 'widht': '128'},
          {'key': 'XSSB', 'name':  '巡视设备', 'widht': '128'},
          {'key': 'XSSBMC', 'name':  '巡视设备名称', 'widht': '128'},
          {'key': 'XSBZ', 'name':  '巡视班组', 'widht': '128'},
          {'key': 'XSBZMC', 'name':  '巡视班组名称', 'widht': '128'},
          {'key': 'XSKSSJ', 'name':  '巡视开始时间', 'widht': '128'},
          {'key': 'XSJSSJ', 'name':  '巡视结束时间', 'widht': '128'},
          {'key': 'XSJG', 'name':  '巡视结果', 'widht': '128'}
        ];
        request({
          url: apiPath.SN_XSJLCX_TQID,
          method: 'get',
          params: {"BDZ": id}
        }).then(res => {
          if(res.data && res.data.length){
            let tempData = res.data
            this.allDatasPopup = tempData
          }else{
            this.allDatasPopup = [];
          }
          this.loadingPopup = false;
        }).catch(() => {
          this.allDatasPopup = [];
          this.loadingPopup = false;
        })
    },

    currentSelectDataChange(item){
        console.log("item----", item);
        const id = item.SBID || item.BYQID || item.OBJ_ID;
        this.BDZId = id;
    }
  }
};
</script>

<style scoped lang="scss">
.details {
  width: 100%;
 height: calc(100% - 40px);
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
  height: calc(100% - 130px);
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

    height: calc(100% - 50px);
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
  cursor: pointer;
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
  color: #FF5454;
  padding: 0;
  margin: 0;
}
.top_centering p:nth-child(2) {

  padding: 0;
  margin: 0;
}
  .inspection{
    .table{
      /deep/ .table-wrap{
        height: 100%;
      
      }
    }
    .table_content{
      .details{
        width: 140px;
      }
    }
  }
</style>
