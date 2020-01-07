<template>
  <div class="homelist">
    <iframe class="conIframe" src="homeList.html" frameborder="0"></iframe>
  </div>
</template>
<script>

export default {
  // inject: ['setBreadcrumb'],
  // 首次加载
    mounted() {
      // 设置面包屑
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
      //     name: '户变关系'
      //   }
      // ])
    }
}
</script>
<style lang="scss" scoped>
  body{
      padding: 0px;
      margin: 0px!important;
  }
  .homelist
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
