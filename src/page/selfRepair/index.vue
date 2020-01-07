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
               <span>主动抢修</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
      <selfRepair></selfRepair>
   </div>
</template>
<script>
  import selfRepair from "@/views/abnormalHandler/selfRepair/components/selfRepair"
  export default {
    components: {
     selfRepair
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