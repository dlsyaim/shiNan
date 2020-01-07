<template id="voltage">
  <div class="page_wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >
        <i class="el-icon-s-home"></i><span>供电服务保障</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>智能运维</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>电压质量</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
     <div class="mainContent">
        <div class="page_top">
          <div class="page_content">
            <div class="page_content_left left_30">
              <div class="content_box">
                <PassRate></PassRate>
              </div>
            </div>
            <div class="page_content_right right_70">
              <div class="content_box">
                <LowVoltage></LowVoltage>
              </div>
            </div>
          </div>
        </div>
        <div class="page_bottom">
          <div class="page_content">
            <OverVoltage></OverVoltage>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import PassRate from "@/views/intelliOper/voltage/components/passRate";
  import LowVoltage from "@/views/intelliOper/voltage/components/lowVoltage"
  import OverVoltage from "@/views/intelliOper/voltage/components/overVoltage"
  export default {
    components: {
      PassRate,
      LowVoltage,
      OverVoltage,
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
