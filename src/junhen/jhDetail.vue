<template>  
    <div class="watch-equip">
       <el-row>
             <div class="conBox">
              <div  class="firstLine">
                  <div class="leftBox">
                      <el-form  label-width="152px" class="forms">
                        <el-form-item label="设备名称">
                            <el-select  placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="配变类型">
                            <el-select  placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="维护班组">
                            <el-select  placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="电流异常累计天数">
                            <el-select  placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="电流不平衡累计天数">
                            <el-select  placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        
                      </el-form>
                  </div>
                  <div class="rightBox">
                      <el-form  label-width="80px" class="formRight">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                      </el-form>
                  </div>
                  <!-- <img src="../assets/hx.jpg" alt=""  @click="appId" width='45px' height="30px"> -->
              </div>
              <div class="secondLine">
                   <div class="mingxi"> 
                    <el-button @click="galvanic">电流曲线</el-button>
                    <el-button>数据导出</el-button>
                   </div>
              <div>
                   <el-table
                    :data="tableData"
                    style="width: 97%;margin: 0 auto;"
                    :header-cell-style="{background:'rgb(203, 236, 242)',color:'black','text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    row-key="id"
                    border
                    lazy
                    :load="load"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                   
                    <el-table-column prop="location " label="定位" width="128">
                        <template slot-scope="scope">
                        <div @click="handleClick(scope.row)" style="cursor: pointer">
                            <i class="el-icon-location-outline" style="color: #FC4E4A"></i>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="code"
                    label="设备编码">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="设备名称">
                    </el-table-column>
                     <el-table-column
                    prop="ycDays"
                    width="160"
                    label="电流异常累计天数">
                    </el-table-column>
                     <el-table-column
                    prop="bphDays"
                    width="160"
                    label="电流不平衡累计天数">
                    </el-table-column>
                     <el-table-column
                    prop="pbType"
                    label="配变类型">
                    </el-table-column>
                     <el-table-column
                    prop="column"
                    label="额定容量">
                    </el-table-column>
                     <el-table-column
                    prop="use"
                    label="使用性质">
                    </el-table-column>
                     <el-table-column
                    prop="type"
                    label="型号">
                    </el-table-column>
                      <el-table-column
                    prop="dydj"
                    label="电压等级">
                    </el-table-column>
                      <el-table-column
                    prop="produce"
                    label="生产厂家">
                    </el-table-column>
                      <el-table-column
                    prop="whName"
                    label="维护班组名称">
                    </el-table-column>
                    <el-table-column
                    prop="ywName"
                    label="运维单位名称">
                    </el-table-column>
                </el-table>
              </div>
              <div class="jilu">总共<span>{{tableData.length}}</span>条记录</div>
              </div>
          </div>
       </el-row>


 <!-- 弹框 临近负载率 -->
    <el-dialog width="45%" id="same_month" title="电流曲线" :visible.sync="dialogFormVisible">
       
              <div class="elcLine">
              
                <div class="secondElc">
                      <h3>设备名称：<span>华鹏成山一号变电</span></h3>
                </div>
                <div style="display:flex;">
                <div class="threeElc">
                      <qu-shi></qu-shi> 
                </div>
               
                </div>
              </div>  
             
          
    </el-dialog>



    </div>
</template>
<script>
import quShi from '@/junhen/quShi'
export default {
    inject: ["setBreadcrumb"],
     components: {
       
        quShi,
    },
    data(){
        return{
            dialogFormVisible:false,
            tableData: [
                 {
                location: '',
                code:'123',
                name: '王小虎',
                ycDays: '10',
                bphDays: '10',
                pbType:'',
                column:'30',
                use:'',
                type:'',
                dydj:'',
                pruduce:'',
                whName:'',
                ywName:'',
                }, 
                  {
                location: '',
                code:'123',
                name: '王小虎',
                ycDays: '10',
                bphDays: '10',
                pbType:'',
                column:'30',
                use:'',
                type:'',
                dydj:'',
                pruduce:'',
                whName:'',
                ywName:'',
                }, 
                  {
                location: '',
                code:'123',
                name: '王小虎',
                ycDays: '10',
                bphDays: '10',
                pbType:'',
                column:'30',
                use:'',
                type:'',
                dydj:'',
                pruduce:'',
                whName:'',
                ywName:'',
                }, 
                {
                location: '',
                code:'123',
                name: '王小虎',
                ycDays: '10',
                bphDays: '10',
                pbType:'',
                column:'30',
                use:'',
                type:'',
                dydj:'',
                pruduce:'',
                whName:'',
                ywName:'',
                }, 
                ],
        }
    },
    methods: {
        appId(){
          this.isShow =false;
        },
         galvanic(){
         this.dialogFormVisible=true;
        },
    },
    mounted () {
         this.$nextTick(() => {
      // 设置面包屑
      this.setBreadcrumb([
        {
          name: "供电服务保障",
          path: "/equip",
          icon: "el-icon-s-home"
        },
        {
          name: "智能运维"
        },
        {
          name: "三相均衡"
        },
        {
          name: "详情"
        }
      ]);
    });
    },
    
}
</script>
<style  scoped lang="scss">
.watch-equip{
    margin:-15px 0 0 10px ;
    width:99%;
}
.conBox{
    width:100%;
    background:white;
    position:relative;
    top:25px;
    left:0px;
    z-index:1000;
}
.firstLine{
     width:100%;
     height:130px;
     border:1px solid gainsboro;
     display:flex;
}
.leftBox{
width:70%;
height: 130px;
margin-top:14px;
margin-right: 228px;
}
.forms{
    display: flex;
  
    flex-wrap: wrap;
    
}
.rightBox{
height: 130px;
margin-top:49px; 
}
.secondLine{
 width:100%;
 height:675px;
 border:1px solid gainsboro;
 margin-top:20px;
}
.mingxi{
    width:13%;
    padding: 20px;
}
.jilu{
width:9%;
margin-top:15px;
}
//弹框
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
.elcLine{
      width:100%;
      height:542px;
      border:1px solid gainsboro;
     
}
.secondElc{
    width:100%;
    text-align: left;
    margin-left:26px;
    height:30px;
    span{
        color:blue
    }
}
.threeElc{
    width:94%;
    height:350px;
    margin: 40px 18px 0 30px;
    padding-top: 10px;
    border: 1px solid gainsboro;
    div{
        color:white;
        height:23px;
        text-align: left;
        line-height: 40px;
        padding-left: 15px;
    }
}

</style>