<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>

    <!--<h2>首页</h2>-->
    <!--<a href="/user.html?uid=353907887">跳转到用户中心</a>-->
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";
  body{
    padding:0;
    margin: 0;
  }
</style>
