<template>
  <div class="voltage">
    <iframe class="conIframe" src="voltage.html" frameborder="0"></iframe>
  </div>
</template>
<script>

  export default {

    // 首次加载
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
  body{
    padding: 0px;
    margin: 0px!important;
  }
  .voltage
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
