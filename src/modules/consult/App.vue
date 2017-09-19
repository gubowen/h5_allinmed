<template>
  <div style="width: 100%;height: 100%;">
    <keep-alive style="height:100%">
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive style="height:100%">
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
  </div>

</template>

<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Qiangkailiang on 17/7/10.
   */
  import addPatient from "./components/addPatient";
  import fb from "common/js/third-party/flexible";
//  import vconsole from 'common/js/third-party/vconsole.min';

  export default{
    data() {
      return {}
    },
    components: {}
  }
</script>
<style lang="scss" scoped="">
  body > div{
    height: 100%;
  }
  .child-view {
    position: absolute;
    width: 100%;
    transition: all .8s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
  }


</style>
