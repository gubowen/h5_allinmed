<template>
  <section class="allinmed-mainIndex">
    <userLogo v-show="loginOnOff"></userLogo>
    <noLogin v-show="!loginOnOff"></noLogin>
    <focusWeixin v-show='!weixinState'></focusWeixin>
    <accountSafe   v-show='customerName.length>0' ></accountSafe>
    <linkUs></linkUs>
    <button class="allinmed-personal-logout" v-show='customerName.length>0' @click='returnBack'>退出登录</button>
    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'确定',
          'cancel':'取消',
          'title':'确定退出登录吗？'
          }" v-if="backShow" :showFlag.sync="backShow" @cancelClickEvent="loginBackCancelEvent"
        @ensureClickEvent="loginEnsureEventWait"></confirm>
    </transition>
  </section>
</template>
<script  type="text/ecmascript-6">
  import userLogo from './../components/userLogo.vue';
  import focusWeixin from './../components/focusWeixin.vue';
  import accountSafe from './../components/accountSafe.vue';
  import noLogin from './../components/noLogin.vue';
  import linkUs from './../components/linkUs.vue';
  import confirm from 'components/confirm';
  import {mapGetters,mapActions} from "vuex";
  export default {
    data () {
      return {
        msg: 'hello',
        backShow:false
      }
    },
    computed:{
      ...mapGetters(["loginOnOff",'weixinState','customerName','loginUrl']),
    },
    methods:{
      ...mapActions(['outLogin']),
      hideDialog(){
        this.backShow = false;
      },
      loginBackCancelEvent(){
        let t = this;
        t.hideDialog();
      },
      loginEnsureEventWait(){
        let t = this;
        t.hideDialog();
        t.outLogin();
      },
      returnBack(){
        let t = this;
        t.backShow = true;
      }
    },
    watch:{
      'customerName'(newStr){
        let t = this;
          if(newStr.length===0){
            window.location.href = t.loginUrl;
          }
      }
    },
    components: {
      userLogo, focusWeixin, accountSafe, linkUs,noLogin,confirm
    }
  }
</script>
