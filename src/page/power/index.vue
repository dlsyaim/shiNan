<template>
  <div class="page_wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >
        <i class="el-icon-s-home"></i><span>供电服务保障</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>智能运维</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>功率因素</span>
      </el-breadcrumb-item>
     </el-breadcrumb>
     <div class="mainContent">
         <div class="page_top">
            <div class="page_content">
              <PowerFactors></PowerFactors>
            </div>
         </div>
         <div class="page_bottom">
            <div class="page_content">
              <Monitor></Monitor>
            </div>
         </div>
     </div>
  </div>
</template>
<script>
  import PowerFactors from "@/views/intelliOper/power/components/powerFactors"
  import Monitor from "@/views/intelliOper/power/components/monitor"

  export default {
    components: {
      PowerFactors,
      Monitor,
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
