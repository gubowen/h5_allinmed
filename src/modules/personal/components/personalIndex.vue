<template>
  <section class="allinmed-mainIndex">
    <userLogo v-show="loginOnOff"></userLogo>
    <noLogin v-show="!loginOnOff"></noLogin>
    <focusWeixin></focusWeixin>
    <accountSafe></accountSafe>
    <linkUs></linkUs>
    <button class="allinmed-personal-logout" v-if="loginOnOff">退出登录</button>
  </section>
</template>
<script>
  import userLogo from './../components/userLogo.vue';
  import focusWeixin from './../components/focusWeixin.vue';
  import accountSafe from './../components/accountSafe.vue';
  import noLogin from './../components/noLogin.vue';
  import linkUs from './../components/linkUs.vue';
  import {mapGetters} from "vuex";
  export default {
    data () {
      return {
        msg: 'hello'
      }
    },
    computed:{
      ...mapGetters(["loginOnOff"]),
    },
    mounted(){

    },
    components: {
      userLogo, focusWeixin, accountSafe, linkUs,noLogin
    }
  }
</script>
