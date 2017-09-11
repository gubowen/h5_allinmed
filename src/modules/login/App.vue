<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <!--<router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>-->
    <!--<router-view ></router-view>-->
  </div>

</template>

<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by JuKun on 2017/8/05.
   */
  import login from "./components/login";
  import fb from "common/js/third-party/flexible";
  export default{
    data() {
      return {}
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
