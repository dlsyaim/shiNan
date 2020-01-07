<template>
  <div class="equipCharts">
    <iframe class="conIframe" src="equipCharts.html" frameborder="0"></iframe>
  </div>
</template>
<script>

  export default {
    // inject: ['setBreadcrumb'],
    // 首次加载
    mounted() {
      // 设置面包屑
      // this.setBreadcrumb([
      //     {
      //         name: '供电服务保障',
      //         path: '/equip',
      //         icon: 'el-icon-s-home'
      //     },
      //     {
      //         name: '设备状态'
      //     },
      //     {
      //         name: '电气设备'
      //     }
      // ])
    }
  }
</script>
<style lang="scss" scoped>
  body{
    padding: 0px!important;
    margin: 0px!important;
  }
  .equipCharts
  {
    width: 100%;
    height: 99.6%;
  }
  .conIframe
  {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
