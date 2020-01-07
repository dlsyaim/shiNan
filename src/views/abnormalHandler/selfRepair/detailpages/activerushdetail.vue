<template>
  <el-dialog :visible.sync="dialogVisible" width="80%" :before-close="handleClose" @close="kcDialog">
    <div class="treeListHeder">
      <div class="treeListTitle">
	   <img :src="chartTitleImg" />
	  {{ title }}</div>
    </div>
    <div class="org-tree-container">

      <el-row>
        <el-col :span="10">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称"><el-input v-model="form.name"></el-input></el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <template>
                <el-table :data="tableDataOne" border style="width: 100%">
                 <el-table-column prop="company" label="所属公司" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="tripping" label="跳闸设备" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="fault" label="故障设备" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="stationLine" label="所属站线" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="VoltageLevel" label="电压等级" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="stopTime" label="停电时间" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="sendTime" label="送电时间" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="recoveryTime" label="恢复时间" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="grulp" label="抢修班组" align="center" show-overflow-tooltip="false"></el-table-column>
                </el-table>
              </template>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="今日工单">
              <template>
                <el-table :data="tableDataTwo" border style="width: 100%">
                 <el-table-column prop="company" label="所属公司" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="tripping" label="跳闸设备" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="fault" label="故障设备" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="stationLine" label="所属站线" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="VoltageLevel" label="电压等级" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="stopTime" label="停电时间" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="sendTime" label="送电时间" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="recoveryTime" label="恢复时间" align="center" show-overflow-tooltip="false"></el-table-column>
                 <el-table-column prop="grulp" label="抢修班组" align="center" show-overflow-tooltip="false"></el-table-column>
                </el-table>
              </template>
            </el-form-item>
          </el-form>
        </el-col>

        <el-row class="button_center">
          <el-button type="danger">删除工单</el-button>
          <el-button type="primary">上报工单</el-button>
        </el-row>

      </el-row>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '工单分析'
    },
  },
  data() {
    return {
      dialogVisible: true,
      form: {
        name: '请输入'
      },
	  chartTitleImg: require('../../images/ic_title.png'),
      tableDataOne: [
        {
         status: '已上报',
         company: '上海市南电力公司',
         tripping: '跳闸设备',
         fault: '故障设备',
         stationLine: '所属站线',
         VoltageLevel: '电压等级',
         stopTime: '停电时间',
         sendTime: '送电时间',
         recoveryTime: '恢复时间',
         grulp: '抢修班组'
        },
        {
          status: '已上报',
          company: '上海市南电力公司',
          tripping: '跳闸设备',
          fault: '故障设备',
          stationLine: '所属站线',
          VoltageLevel: '电压等级',
          stopTime: '停电时间',
          sendTime: '送电时间',
          recoveryTime: '恢复时间',
          grulp: '抢修班组'
        }
      ],
      tableDataTwo: [
        {
         status: '已上报',
         company: '上海市南电力公司',
         tripping: '跳闸设备',
         fault: '故障设备',
         stationLine: '所属站线',
         VoltageLevel: '电压等级',
         stopTime: '停电时间',
         sendTime: '送电时间',
         recoveryTime: '恢复时间',
         grulp: '抢修班组'
        },
        {
          status: '已上报',
          company: '上海市南电力公司',
          tripping: '跳闸设备',
          fault: '故障设备',
          stationLine: '所属站线',
          VoltageLevel: '电压等级',
          stopTime: '停电时间',
          sendTime: '送电时间',
          recoveryTime: '恢复时间',
          grulp: '抢修班组'
        }
      ]
    };
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
      this.$emit("on-close")
    },
    kcDialog() {
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
  /deep/.el-table th.gutter {
    display: table-cell !important;
  }
.org-tree-container {
  background-color: #fff;
  margin-top: 10px;
  .button_center{
    text-align: center;
  }
}

.treeListHeder {
  position: absolute;
  width: calc(100% - 70px);
  top: 20px;
  left: 20px;
  text-align: left;
  color: #555555;
  .treeListTitle {
    font-size: 15px;
    color: #ffffff;
    font-weight: bold;
	 img {
      margin: 0 5px;
    }
  }
}
/deep/ .el-dialog__header {
  padding: 45px 20px 10px;
  background: #01b6d5;
}
/deep/ .el-dialog__headerbtn {
  font-size: 20px;
  font-weight: bold;
   .el-dialog__close{
      color: #fff !important;
   }
}

</style>
