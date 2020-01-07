<template>
    <div class="echartsList">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <el-button @click="()=>{tablePopupConfig.show=true}">表格内容弹窗</el-button>
                    <el-button type="primary">主要按钮</el-button>
                    <el-button type="success">成功按钮</el-button>
                    <el-button type="info">信息按钮</el-button>
                    <el-button type="warning">警告按钮</el-button>
                    <el-button type="danger">危险按钮</el-button>
                </el-card>
            </el-col>
        </el-row>
        <popup v-if="tablePopupConfig.show" :config="tablePopupConfig" @close="closePopup('tablePopupConfig')">
            <div slot="popup-data">
                <div class="data-wrap" style="padding: 40px;">
                    <div class="param-wrap"></div>
                    <div class="table-wrap">
                        <el-table
                            :data="tableData"
                            height="250"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="地址">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                        style="text-align: right;"
                        background
                        layout="prev, pager, next"
                        :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
import popup from '@/components/snxp-popup'

export default {
  name: 'PopupTemp',
  components: {
    popup
  },
  data () {
    return {
        tablePopupConfig: {
            show: false,
            title: '配网概况详情>'
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  },
  methods: {
    closePopup(config) {
        this[config].show = false
    }
  }
}
</script>

<style>
    .box-card {
        margin: 10px;
    }
</style>
