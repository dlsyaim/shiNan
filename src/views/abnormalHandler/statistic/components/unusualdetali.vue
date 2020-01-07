<template>
  <el-dialog :visible.sync="dialogVisible" width="80%" :before-close="handleClose" @close="kcDialog">
    <div class="treeListHeder">
      <div class="treeListTitle">
        <img :src="chartTitleImg" />
        {{ title }}
      </div>
    </div>
    <div class="org-tree-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="24">
          <el-col :span="9" :offset="2">
            <el-form-item label="台区名称"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="供电单位"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="设备名称"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="发生时间"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="异常类型"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="运行状态"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="运维班组"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="重要程度"><el-input v-model="form.name"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="故障描述" class="teb_box">
          <template>
            <el-table :data="tableData" border>
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </template>
        </el-form-item>
        <el-form-item label="异常位置" class="teb_box" style="margin-top: 20px;"><div class="teb_box_unusual"></div></el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '异常分析'
    }
  },
  data() {
    return {
      dialogVisible: true,
      form: {
        name: '请输入'
      },
      // chartTitleImg: require('../../images/ic_title.png'),
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    };
  },
  methods: {
   

    handleClose(done) {
      this.dialogVisible = false;
      this.$emit('on-close');
    },
    kcDialog() {}
  },
  mounted() {
    this.getDataByFSXQ();
   
  }
};
</script>

<style lang="scss" scoped>
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
  color: #fff;
}
</style>
