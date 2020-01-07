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
      <!--
      <div class="table_content_top">
        <span @click="getLJTQData">
          <img :src="chartTitleImg" alt /> 
        </span>
        <span @click="getFZQXData">
          <img :src="calendarImg" alt /> 负荷曲线
        </span>
        <span>
          <img :src="calendarImg" alt /> 数据导出
        </span>
      </div>
      -->
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          border
          highlight-current-row
          style="width: 100%"
          height='calc(100% - 12px)'
          :header-cell-style="{background:'#cbecf2',color:'#333333'}"
        >
          <el-table-column prop="SBMC" label="设备名称" width="128"></el-table-column>
          
          <el-table-column prop="relationship " label="查看户变关系" width="128">
            <template slot-scope="scope">
              <div @click="handleClick(scope.$index,scope.row)" style="cursor: pointer">
                <i class="el-icon-location-outline" style="color: #FC4E4A"></i>
                <span style="color:#ccc;">查看户变关系</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="互变关系是否一致" width="128"><span style="color:#f00;">一致</span></el-table-column>
          <el-table-column prop="CCBH" label="出厂编号" width="128"></el-table-column>
          <el-table-column prop="CCRQ" label="出厂日期" width="128"></el-table-column>
          <el-table-column prop="DQTZ" label="地区特征" width="128"></el-table-column>
          <el-table-column prop="DYCEDDL" label="低压侧额定电流" width="128"></el-table-column>
          <el-table-column prop="DYDJ" label="电压等级" width="128"></el-table-column>
          <el-table-column prop="DYDJMC" label="电压等级名称" width="128"></el-table-column>
          <el-table-column prop="EDRL" label="额定容量" width="128"></el-table-column>
          <el-table-column prop="JYJZ" label="绝缘介质" width="128"></el-table-column>
          <el-table-column prop="SCCJ" label="生产厂家" width="128"></el-table-column>
          <el-table-column prop="SFFJB" label="是否非晶变" width="128"></el-table-column>
          <el-table-column prop="SFNW" label="是否农网" width="128"></el-table-column>
          <el-table-column prop="SSDS" label="所属地市" width="128"></el-table-column>
          <el-table-column prop="SSDSMC" label="所属地市名称" width="128"></el-table-column>
          <el-table-column prop="SSGT" label="所属杆塔" width="128"></el-table-column>
          <el-table-column prop="SYXZ" label="使用性质" width="128"></el-table-column>
          <el-table-column prop="TYRQ" label="投运日期" width="128"></el-table-column>
          <el-table-column prop="XH" label="型号" width="128"></el-table-column>
          <el-table-column prop="YWDW" label="运维单位" width="128"></el-table-column>
          <el-table-column prop="YWDWMC" label="运维单位名称" width="128"></el-table-column>
          <el-table-column prop="YXZT" label="运行状态" width="128"></el-table-column>
          <el-table-column prop="ZCDW" label="资产单位" width="128"></el-table-column>
          <el-table-column prop="ZCDWMC" label="资产单位名称" width="128"></el-table-column>
          <el-table-column prop="ZCXZ" label="资产性质" width="128"></el-table-column>
          <el-table-column prop="ZYCD" label="重要程度" width="128"></el-table-column>
          <el-table-column prop="ZYFL" label="专业分类" width="128"></el-table-column>
          <el-table-column prop="ZXMC" label="主线名称" width="128"></el-table-column>
          <el-table-column prop="BZ" label="备注" width="500"></el-table-column>
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

    <!-- 弹框 临近负载率 -->
    <el-dialog width="65%" id="same_month" title="" :visible.sync="dialogFormVisible">
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
    </el-dialog>
    <!-- 弹框 负载曲线-->
    <el-dialog width="90%" id="same_month" title="负荷曲线" :visible.sync="showDialog">
      <div class="equipment">
        <div class="equipment_name">
          <span>设备名称:</span>
          <span>{{FHQXName}}</span>
        </div>
        <div class="equipment_right"></div>
      </div>
      <div class="locure">
        <div class="locure_charts">

          <!-- <MyEcharts
            :id="'exampleId'"
            :style="{width: '100%', height: '600px'}"
            :option="exampleId"
          ></MyEcharts>-->
          <LineCharts
                :id="'BadCharts6'"
                :style="{width: '100%', height: '100%'}"
                :option="defectWeekOption"
              >
              </LineCharts>
        </div>
      </div>
    </el-dialog>

       <!-- 弹框 湖边关系图-->
    <TreeList v-if="isShow" :propData='listData' @on-close="onclose"></TreeList>
  </div>
  
</template>

<script>
import TreeList from '@/views/intelliOper/homelist/detailpages/TreeList';
import LineCharts from "../../components/lineCharts";
import { getZSBYQMXData,getTGCONSDETData } from '@/api/api'
import MyEcharts from "@/views/intelliOper/components/lineCharts"; //echarts
export default {
  //  inject: ['setBreadcrumb'],
  components: {
    MyEcharts,
    LineCharts,
    TreeList,
  },
  //   props: {
  //     loading:{
  //       type: Boolean,
  //       default: false,
  //     }
  // },
  data() {
    return {
      chartTitleImg: require("../../images/ic_title.png"),
      calendarImg: require("../../images/ic_title.png"),
      currentPage:1,
      pageSize: 10,
      chartOption: {},
      listData:{},
      dialogFormVisible: false,
      // 嬾加載
      loading:false,
      returnData: null,
      showDialog: false,
      isShow:false,
      isShows:false,
      FHQXName:'华山成鹏1号变',
      exampleId:{},
      sbid:'',
      total:0,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
      ],
      postData:{},
      maxData:[],
      defectWeekOption: {
        legend: {
          data: ["负荷曲线", ]
        },
        xAxis: {
          nameTextStyle: {
          fontSize: 20,
          },
          name: "时刻",
          data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96",]
        },
        yAxis: {
          name: "负荷曲线",
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name: "负荷曲线",
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
        series: [{
            name: '负荷曲线',
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
        ]
      },
    };

  },
  mounted() {
    /*
    if(this.getLocationData())
    {
      this.list();
    }*/
    this.list();
  },

  computed:{
    total2() {
        return this.tableData.length
      },
  },
  methods: {
     // 第一个弹框关闭
    onclose(){
      this.isShow=false
    },
    handleClick(index,data) {
      
      let post={
        pms_id:data.OBJ_ID,
        org_no:31402
      };

      getTGCONSDETData(post).then(res => {
        this.chartsData(data,res.data)
      })
      .catch(err => {
      })
    },
    chartsData(data,getData){
      this.listData={
          sbmc:data.SBMC,
          data:{
            id:data.SBMC,
            sbmc : data.SBMC,
            children:[],
          },
        }
        for(let i=0;i<getData.length;i++)
        {
          let ASSET_NO="暂无编号";
          if(getData[i].ASSET_NO)
          {
            ASSET_NO=getData[i].ASSET_NO;
          }
          let sj={
            id:getData[i].ELEC_ADDR+':'+ASSET_NO,
          };
          this.listData.data.children.push(sj);
        }
        this.isShow=true;
    
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
    getLocationData(){
      let datas=location.href.split("?");
      if(datas.length<=1)
      {
        return false
      }else
      {
        datas=datas[1].split("&");
        for(let i=0;i<datas.length;i++)
        {
          this.postData[datas[i].split("=")[0]]=datas[i].split("=")[1]
        }
        return true
      }
    },
    list() {
       this.postData={
         SSGS:'FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05'
       };
       getZSBYQMXData(this.postData).then(res => {
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
    }
  }
};
</script>

<style scoped lang="scss">
.details {
  width: 100%;
  height:calc(100% - 40px);
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
    height: calc(100% - 35px);
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
.curve_ {
  width: 100%;
  height: 620px;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 20px;
  .curve_left {
    width: 48.7%;
    height: 500px;
    border: 1px solid #dadada;
    float: right;
    margin-left: 20px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .curve_right {
    width: 48.7%;
    height: 500px;
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

</style>
