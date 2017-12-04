<template>
  <section class="allinmed-mainInner">
    <userLogo v-show="loginOnOff"></userLogo>
    <noLogin v-show="!loginOnOff"></noLogin>
    <focusWeixin></focusWeixin>
    <accountSafe></accountSafe>
    <linkUs></linkUs>
    <button class="allinmed-personal-logout" v-if="loginOnOff">退出登录</button>
    <bindAccount></bindAccount>
  </section>
</template>
<script>
  import fb from 'common/js/third-party/flexible'
  import userLogo from './components/userLogo.vue'
  import focusWeixin from './components/focusWeixin.vue'
  import accountSafe from './components/accountSafe.vue'
  import noLogin from './components/noLogin.vue'
  import linkUs from './components/linkUs.vue'
  import bindAccount from './components/bindAccount.vue'
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
      userLogo, focusWeixin, accountSafe, linkUs,noLogin,bindAccount
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules.scss";
  .allinmed-mainInner {
    min-height: 100%;
    height: auto;
    background: #eee;
    padding: rem(20px);

  img {
    width: 100%;
    height: 100%;

  }
  .allinmed-personal-logout {
    width: rem(710px);
    height: rem(100px);
    margin: rem(20px) auto;
    background: #fff;
    border-radius: rem(16px);
    font-family: PingFangSC-Regular;
    color: #FA787A;
    letter-spacing: 0;
    line-height: rem(100px);
    @include font-dpr(18px);
    text-align: center;
  }

  .icon {
    width: rem(36px);
    height: rem(36px);
    float: left;

  &.safe {
    background: #fff url("../../../src/common/image/img00/personal/icon_01.png") no-repeat center 50%;
  }

  &.link {
    background: #fff url("../../../src/common/image/img00/personal/icon_03.png") no-repeat center 50%;
  }

  &.about {
    background: #fff url("../../../src/common/image/img00/personal/icon_02.png") no-repeat center 50%;
  }

  }
  .title {
    font-family: PingFangSC-Regular;
  @include font-dpr(18px);
    color: #222222;
    letter-spacing: 0;
    line-height: rem(40px);
    margin-left: rem(16px);
    float: left;
    height: 100%;
  }

  .jump {
    width: rem(20px);
    height: rem(36px);
    background: url("../../../src/common/image/img00/personal/arrow.png") no-repeat center 50%;
    background-size: cover;
    float: right;
  }

  }
</style>



