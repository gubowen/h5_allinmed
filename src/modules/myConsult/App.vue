<template>
  <div style="width: 100%;height: 100%;">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <bottomNav :selected="2" v-if="bottomNavShow"></bottomNav>
  </div>
</template>
<script type="text/ecmascript-6">
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import bottomNav from "components/tabbar"
  export default{
    data(){
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

