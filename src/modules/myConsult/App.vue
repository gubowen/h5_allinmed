<template>
  <div style="width: 100%;height: 100%;">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <bottomNav :selected="2" v-if="bottomShow"></bottomNav>
  </div>
</template>
<script type="text/ecmascript-6">
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import bottomNav from "components/tabbar";
  import store from "./store/store";
  export default{
    data(){
      return {
        bottomNavShow:false
      }
    },
    computed:{
      bottomShow(){
        return store.state.bottomNavShow
      }
    },
    mounted(){
      siteSwitch.weChatJudge(()=>{
        store.commit("setbottomNav",false);
      },()=>{
        store.commit("setbottomNav",true);
      });
    },
    components: {
      bottomNav
    }
  }
</script>

