<template>
   <div class="repair">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >           
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>异常处理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>报修统计</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
      <repair></repair>
   </div>
</template>
<script>
  import repair from "@/views/abnormalHandler/repair/components/repair"
  export default {
    components: {
     repair
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
.repair{
  height: 100%;
  padding-left: 10px;
}
</style>