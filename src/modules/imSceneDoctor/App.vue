<template>
  <keep-alive>
    <router-view style="height: 100%;width: 100%;"></router-view>
  </keep-alive>
</template>

<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Wangjingrong on 17/7/10.
   */

  import fb from "common/js/third-party/flexible";

  export default{
    data() {
      return {}
    },
    components: {}
  }
</script>
<style lang="scss" scoped="">

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

  .fadeRight-enter-active {
    transition: all ease-in-out .5s;
    transform: translateX(0);
  }

  .fadeRight-leave-active {
    transition-duration: 0s;
  }

  .fadeRight-enter, .fadeRight-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateX(100%);
  }

</style>
