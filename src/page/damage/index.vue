<template>
  <div class="page_wrap">
    <div class="page_top all_top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >           
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>智能运维</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>线损情况</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
       <div class="mainContent">
           <div class="page_content">
              <div class="content_box">
                <LineBad></LineBad>
              </div>
            </div>
       </div>
    </div>
  </div>
</template>
<script>
  import LineBad from "@/views/intelliOper/damage/components/lineBad";
  export default {
    components: {
      LineBad,
    },
    data() {
      return {

      };
    },
    mounted() {

    },
  };
</script>
<style lang="scss" scoped>
 /deep/ .el-breadcrumb{
    font-size: 17px;
    height: 40px;
    line-height: 40px;
    }
</style>
