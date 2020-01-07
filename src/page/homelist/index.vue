<template class="page_wrap">
  <div class="homelist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >
               <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span>智能运维</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
               <span>户变关系</span>
          </el-breadcrumb-item>
      </el-breadcrumb>
     <homelist></homelist>
  </div>
</template>
<script>
import homelist from '@/views/intelliOper/homelist/components/homelist';
export default {
  components: {
    homelist
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
//  .page_wrap{
//    height: 90%；
//  }
  .homelist{
     height:100%;
  }
 /deep/ .el-breadcrumb{
    font-size: 17px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    }

</style>
