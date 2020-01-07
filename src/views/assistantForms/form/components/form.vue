<template>
  <div class="details">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-col :span="8">
        <el-form-item label="所属公司">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所属站房">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="设备名称">
          <el-input v-model="formInline.user" placeholder="请填写"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="电压等级">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="负载情况">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="button_right">
        <span>查询</span>
        <span>重置</span>
      </el-col>
    </el-form>
    <div class="table_content">
      <span class="details">明细:</span>
      <div class="table_content_top">   
        <span>
          <img :src="calendarImg" alt /> 数据导出
        </span>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%;height: calc(100%);"
          :header-cell-style="{background:'#cbecf2',color:'#333333'}"
        >
          <!-- <el-table-column prop="operation " label="操作" width="128">
            <template slot-scope="scope">
              <div @click="handleClick(scope.row)" style="cursor: pointer">
                <i class="el-icon-location-outline" style="color: #FC4E4A"></i>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="sbbm" label="定位" width="128"></el-table-column>
          <el-table-column prop="sbmc" label="台区名称" width="128"></el-table-column>
          <el-table-column prop="ycljts" label="台区编号" width="128"></el-table-column>
          <el-table-column prop="bphljts" label="额定容量" width="128"></el-table-column>
          <el-table-column prop="pblx" label="非居民用户数" width="128"></el-table-column>
          <el-table-column prop="edrl" label="非居民容量(MVA)" width="128"></el-table-column>
          <el-table-column prop="syxz" label="居民用户数" width="128"></el-table-column>
          <el-table-column prop="xh" label="居民用户容量(MVA)" width="128"></el-table-column>
          <el-table-column prop="dydj" label="电杆型号" width="128"></el-table-column>
          <el-table-column prop="sccj" label="电杆数量" width="128"></el-table-column>
          <el-table-column prop="whbzmc" label="导线型号" width="128"></el-table-column>
          <el-table-column prop="ywdwmc" label="导线数量" width="132"></el-table-column>
          <el-table-column prop="sccj" label="供电半径" width="128"></el-table-column>
          <el-table-column prop="whbzmc" label="台区最大负载率" width="128"></el-table-column>
          <el-table-column prop="ywdwmc" label="平均负载率" width="132"></el-table-column>
        </el-table>
        <el-pagination
                background
                prev-text="上一页"
                next-text="下一页"
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize2"
                layout="total, sizes, jumper, next, pager, prev"
                :total="total">
              </el-pagination>
      </div>
    </div>

    <!-- 弹框 临近负载率 -->
    <!-- <el-dialog width="65%" id="same_month" title="邻近台区负载率" :visible.sync="dialogFormVisible">
      <div class="equipment">
        <div class="equipment_name">
          <span>设备名称:</span>
          <span>华鹏成山1号变电</span>
        </div>
        <div class="equipment_right"></div>
      </div>
      <div class="curve_">
        <div class="curve_left">
          <div class="cure_top">&nbsp;&nbsp;右关联台区</div>
          <div class="equipment_name">
            <span>设备名称:</span>
            <span>华鹏成山1号变电</span>
          </div>
          <MyEcharts
            :id="'rightCharts'"
            :style="{width: '100%', height: '560px'}"
            :option="chartOption"
          ></MyEcharts>
        </div>
        <div class="curve_right">
          <div class="cure_top">&nbsp;&nbsp;左关联台区</div>
           <div class="equipment_name">
          <span>设备名称:</span>
          <span>华鹏成山1号变电</span>
        </div>
          <MyEcharts
            :id="'leftCharts'"
            :style="{width: '100%', height: '560px'}"
            :option="chartOption"
          ></MyEcharts>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import MyEcharts from "@/views/intelliOper/components/lineCharts"; //echarts
import { getPowerListData } from "@/api/api";
export default {
  //  inject: ['setBreadcrumb'],
  components: {
    MyEcharts,
  },
  data() {
    return {
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_title.png"),
      pageSize: 10,
      chartOption: {},
      dialogFormVisible: false,
      returnData: null,
      loadcure: false,
      exampleId:{},
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
    };
   
  },
  mounted() {
    this.$nextTick(() => {
      // 设置面包屑
      // this.setBreadcrumb([
      //   {
      //     name: '供电服务保障',
      //     path: '/equip',
      //     icon: 'el-icon-s-home'
      //   },
      //   {
      //     name: '智能运维',
      //      path: '/',
      //   },
      //   {
      //     name: '负载情况',
      //     path: '/demoIntelligentOps/loadCharts',
      //   },
      //   {
      //     name: '详情' 
      //   },
      // ])
    })
    this.Line();
    this.initCharts();
    this.list();
  },

  computed:{
    total() {
        return this.tableData.length
      },
  },
  methods: {
    list () {
       getPowerListData()
        .then(res => {
          console.log(res);
          
          if (res.code === 200) {
            this.tableData = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        })
    },
    Line() {
      const da = this.$route.query.params;
      console.log(da);
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
  height: 100%;
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
  border: 1px solid #cccccc;
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
</style>
