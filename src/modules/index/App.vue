<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>

    <Loading v-if="$store.state.loading"></Loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import Loading from "components/loading";
  export default {
    components:{
      Loading
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";
  body{
    padding:0;
    margin: 0;
  }
</style>
