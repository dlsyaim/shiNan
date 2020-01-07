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
               <span>负载情况</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
    <div class="page_top">
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
    </div>
    <div class="page_bottom">
      <div class="page_content">
        <div class="page_content_left">
          <div class="content_box">
            <Heavy></Heavy>
          </div>
        </div>
        <div class="page_content_right">
          <div class="content_box">
            <Over></Over>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Average from "@/views/intelliOper/load/components/average";
  import Light from "@/views/intelliOper/load/components/light"
  import Over from "@/views/intelliOper/load/components/over"
  import Heavy from "@/views/intelliOper/load/components/heavy"
  export default {
    components: {
      Average,
      Light,
      Over,
      Heavy
    },
    data() {
      return {

      };
    },
    mounted() { 
     
    },
    watch(){
      
    },
    created(){
   
    },
    methods:{
    }
  };
</script>
<style lang="scss" scoped>
 /deep/ .el-breadcrumb{
    font-size: 17px;
    height: 30px;
    line-height: 20px;
    }
</style>
