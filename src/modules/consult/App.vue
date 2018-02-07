<template>
  <div style="width: 100%;height: 100%;">
    <keep-alive style="height:100%">
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <bottomNav v-if="bottomShow"></bottomNav>
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
  import "./components/addPatient";
  import "common/js/third-party/flexible";
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import bottomNav from "components/tabbar";
  import store from "./store/store";

  import {mapState} from "vuex";

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(["patientBaseMessage"]),
      bottomShow() {
        return store.state.bottomNavShow
      }
    },
    mounted() {
      siteSwitch.weChatJudge(() => {
        store.commit("setbottomNav", false);
      }, () => {
        store.commit("setbottomNav", true);
      });
    },
    created() {
      // setTimeout(()=>{
      //   window.onbeforeunload = () =>{
      //     localStorage.setItem("messageCache",JSON.stringify(this.patientBaseMessage))
      //   }
      // },2000);
      // this.$router.beforeEach(() => {
      //   localStorage.setItem("messageCache", JSON.stringify(this.patientBaseMessage))
      // })
    },
    components: {
      bottomNav
    }
  }
</script>
<style lang="scss" scoped=''>
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
