<template>
  <div class="details">
     <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              智能运维
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span @click="back" class="back">异常处理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              详情
          </el-breadcrumb-item>
      </el-breadcrumb>
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
           负荷曲线
        </span>
        <span>
           数据导出
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
          height='calc(100% - 12px)'
          @row-click='getSBID'
          :header-cell-style="{background:'#cbecf2',color:'#333333'}"
        >
          <el-table-column fixed prop="SBMC" label="设备名称" width="128"></el-table-column>
          <!-- <el-table-column prop="SBID" label="设备id" width="128"></el-table-column> -->
          <el-table-column prop="BB" label="变比" width="128"></el-table-column>
          <!-- <el-table-column prop="RTU_WHBZ" label="班组" width="128"></el-table-column> -->
          <el-table-column prop="RTU_DEPT" label="班组名称" width="128"></el-table-column>
          <el-table-column prop="ZDFZL" label="最大负载率" width="128"></el-table-column>
          <el-table-column prop="PJFZL" label="平均负载率" width="128"></el-table-column>
          <el-table-column prop="FSCS" label="发生次数" width="128"></el-table-column>
          <el-table-column prop="LJTS" label="累计天数" width="128"></el-table-column>
          <el-table-column prop="LXTS" label="连续天数" width="128"></el-table-column>
          <el-table-column prop="ZZ" label="最值" width="128"></el-table-column>
          <el-table-column prop="FSSJ" label="发生日期" width="132"></el-table-column>
          <el-table-column prop="SSGS" label="公司" width="132"></el-table-column>
          <el-table-column prop="SBLX" label="设备类型" width="132"></el-table-column>
          <el-table-column prop="EDRL" label="额定容量" width="132"></el-table-column>
          <el-table-column prop="ZRL" label="总装接容量" width="132"></el-table-column>
          <el-table-column prop="FJDYHRL" label="非居大用户装接容量" width="132"></el-table-column>
          <el-table-column prop="JMRL" label="居民装接容量" width="132"></el-table-column>
          <el-table-column prop="FJMRL" label="非居民装接容量" width="132"></el-table-column>
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

  </div>
</template>

<script>

import { getFZMXData } from "@/api/api";
import { getFZQX,getHPLCDatadatail } from "@/api/api";
export default {
  //  inject: ['setBreadcrumb'],
  components: {
  },
  data() {
    return {
      tableData:[],
      currentPage:1,
      pageSize: 10,
      chartOption: {},
      dialogFormVisible: false,
      // 嬾加載
      loading:false,
      returnData: null,
      showDialog: false,
      FHQXName:'华山成鹏1号变',
      exampleId:{},
      sbid:'',
      total:0,
      formInline: {
        user: "",
        region: ""
      },
      
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
  
  },

  computed:{

  },
  methods: {

    back(){
      window.location.href="statistic.html"
    },
    getSBID(data){
      this.sbid=data.SBID;
      this.FHQXName=data.SBMC;
      console.log('设备id:' + this.sbid)
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
    list () {
       getFZMXData(this.postData).then(res => {
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
