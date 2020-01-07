<template>
  <div class="page_wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >           
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>异常处理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>异常处理</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
     <div class="page_top page_T">
      <div class="page_content leftreach">
        <jcanom></jcanom>
      </div>
      <div class="rightreach">
         <Average></Average>
      </div>
    </div>
    <div class="page_top page_T">
      <div class="page_content leftreach">
        <pmsFault></pmsFault>
      </div>
      <div class="rightreach">
          <Light></Light>
      </div>
    </div>
    <!-- <div class="page_top page_T">
      <div class="page_content">
        <div class="page_content_left">
          <div class="content_box">
            <Average></Average>
          </div>
        </div>
        <div class="page_content_right">
          <div class="content_box">
            <Light></Light>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
  // import PowerFactors from "@/views/intelliOper/power/components/powerFactors"
  // import Monitor from "@/views/intelliOper/power/components/monitor"
  import jcanom  from "@/views/abnormalHandler/statistic/components/jcanom"
  import pmsFault  from "@/views/abnormalHandler/statistic/components/pmsFault"
   import Average from "@/views/abnormalHandler/statistic/components/zbanomaliesleft";
  import Light from "@/views/abnormalHandler/statistic/components/zbanomaliesright"
  export default {
    components: {
      // PowerFactors,
      // Monitor,
      jcanom,
      pmsFault,
      Average,
      Light
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

</style>
