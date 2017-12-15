<template>
  <section class="allinmed-personal-login">
    <a class="login" :href="loginUrl" @click.stop="local">登录/注册</a>
  </section>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules.scss";
  .allinmed-personal-login{
    width: rem(614px);
    padding: rem(86px) rem(46px) rem(76px) rem(46px);
    height: rem(80px);
    margin:rem(20px) auto;
    background: #fff;
    margin-top: 0;
    border-radius: rem(16px);
    .login{
      width: rem(282px);
      height: rem(80px);
      border: 1px solid #1ACAA7;
      border-radius: rem(100px);
      @include font-dpr(18px);
      color: #07B6AC;
      letter-spacing: 0;
      text-align: center;
      line-height: rem(80px);
      margin: 0 auto;
      display: block;
    }

  }
</style>
<script>
  import {mapGetters} from "vuex";
  export default {
    computed: {
      ...mapGetters(['loginUrl'])
    },
    methods:{
      local(){
        localStorage.setItem("backUrl":window.location.href);
      }
    }
  }
</script>
