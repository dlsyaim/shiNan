<template>
   <div class="form">
     <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >           
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>统计报表</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>统计报表</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
      <Form></Form>
   </div>
</template>
<script>
  import Form from "@/views/assistantForms/form/components/form"
  export default {
    components: {
     Form
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
.form{
  height: 100%;
  padding-left: 10px;
}
</style>