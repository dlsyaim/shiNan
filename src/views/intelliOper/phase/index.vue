<template>
  <div class="phase">
    <iframe class="conIframe" src="phase.html" frameborder="0"></iframe>
  </div>
</template>
<script>

  export default {
    // inject: ['setBreadcrumb'],
    // 首次加载
    mounted() {
      // // 设置面包屑
      // this.setBreadcrumb([
      //   {
      //     name: '供电服务保障',
      //     path: '/equip',
      //     icon: 'el-icon-s-home'
      //   },
      //   {
      //     name: '智能运维'
      //   },
      //   {
      //     name: '三相均衡'
      //   },
        
      // ])
    }
  }
</script>
<style lang="scss" scoped>
  body{
    padding: 0px;
    margin: 0px!important;
  }
  .phase
  {
    width: 100%;
    height: 99%;
  }
  .conIframe
  {
    width: 100%;
    height: calc(100%);
    padding: 0;
    margin: 0;
  }
</style>
