<template>
  <div class="footerBottom">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <bottomNav v-if="bottomNavShow"></bottomNav>
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
  import doctorMain from "./components/doctorMain";
  import fb from "common/js/third-party/flexible";
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import bottomNav from "components/tabbar"
  export default{
    data() {
      return {
        bottomNavShow:false
      }
    },
    mounted(){
      siteSwitch.weChatJudge(()=>{
        this.bottomNavShow = false;
      },()=>{
        this.bottomNavShow = true;
      });
    },
    components: {
      bottomNav
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";
  .footerBottom{
    margin-bottom:rem(100px);
  }
</style>
