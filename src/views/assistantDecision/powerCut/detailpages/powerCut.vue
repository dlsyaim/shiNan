<template>
  <el-dialog :visible.sync="dialogVisible" width="90%" :before-close="handleClose" @close="kcDialog">
    <div class="treeListHeder">
      <div class="treeListTitle">
        <img :src="chartTitleImg" />
        {{ title }}
      </div>
    </div>
    <div class="org-tree-container">
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="operate" label="操作" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="company" label="所属公司" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="house" label="所属站房" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="name" label="设备名称" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="capacity" label="额定容量(KVA)" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="nature" label="使用性质" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="data" label="投运日期" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="group" label="运维班组" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="status" label="运行状态" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="grade" label="重要程度" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="major" label="专业分类" align="center" show-overflow-tooltip="false"></el-table-column>
          <el-table-column prop="remarks" label="备注" align="center" show-overflow-tooltip="false"></el-table-column>
        </el-table>
      </template>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '停电计划'
    }
  },
  data() {
    return {
      dialogVisible: true,
      form: {
        name: '请输入'
      },
      chartTitleImg: require('../../images/ic_title.png'),
      tableData: [
        {
          operate: '',
          company: '',
          house: '',
          name: '',
          capacity: '',
          nature: '',
          data: '',
          group: '',
          status: '',
          grade: '',
          major: '',
          remarks: ''
        },
        {
          operate: '',
          company: '',
          house: '',
          name: '',
          capacity: '',
          nature: '',
          data: '',
          group: '',
          status: '',
          grade: '',
          major: '',
          remarks: ''
        },
        {
          operate: '',
          company: '',
          house: '',
          name: '',
          capacity: '',
          nature: '',
          data: '',
          group: '',
          status: '',
          grade: '',
          major: '',
          remarks: ''
        },
        {
          operate: '',
          company: '',
          house: '',
          name: '',
          capacity: '',
          nature: '',
          data: '',
          group: '',
          status: '',
          grade: '',
          major: '',
          remarks: ''
        }
      ]
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$emit('on-close');
    },
    kcDialog() {}
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
.teb_box {
  width: 83%;
  margin: 0 auto;
}

.teb_box_unusual {
  height: 250px;
  border: 1px solid #ccc;
}
/deep/ .el-dialog__headerbtn {
  font-size: 20px;
  font-weight: bold;
  .el-dialog__close{
     color: #fff !important;
  }
}
</style>
