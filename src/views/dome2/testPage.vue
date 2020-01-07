<template>
  <div class="equipCharts">
    <div class="breadcrumb-wrap">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i> 供电服务保障</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">设备状态</a></el-breadcrumb-item>
        <el-breadcrumb-item>电气设备</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <iframe class="conIframe" src="dome2.html" frameborder="0"></iframe>
  </div>

</template>
<style lang="scss" scoped>
  .equipCharts
  {
    width: 100%;
    height: 100%;
  }
  .breadcrumb-wrap
  {
    height: 44px;
  }
  .el-breadcrumb
  {
    line-height: 44px;
  }
  .conIframe
  {
    width: 100%;
    height: calc(100% - 54px);
    padding: 0;
    margin: 0;
    float: left;
  }
</style>
