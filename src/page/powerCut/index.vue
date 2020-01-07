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
               <span>停电计划指导</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
      <powerCut></powerCut>
   </div>
</template>
<script>
  import powerCut from "@/views/assistantDecision/powerCut/components/powerCut"
  export default {
    components: {
     powerCut
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