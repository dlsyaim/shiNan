<template>
   <div class="repair">
     <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >           
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>辅助决策</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>巡检方案</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
      <inspection></inspection>
   </div>
</template>
<script>
  import inspection from "@/views/assistantDecision/inspection/components/inspection"
  export default {
    components: {
     inspection
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