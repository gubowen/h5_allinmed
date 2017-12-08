<template>
  <div>
    <section class="loginRegisterBox">
      <ul class="loginRegisterTitle">
        <li class="fl" @click="goLogin()">手机验证登录</li>
        <li class="fr on">注册</li>
      </ul>

      <ul class="loginRegisterContent">
        <li class="registerContent">
          <form class="formBox">
            <p class="phoneInput"><input type="number" placeholder="请输入手机号"></p>
            <p class="codeInput">
              <input type="password" placeholder="设置密码（至少6位）">
              <span class="iconBox">
                <i class="icon-clearPassword"></i>
                <i class="icon-eyesStatus"></i>
              </span>
            </p>
            <button class="stipulation">注册代表您已同意<i @click="goLoginRule()">《唯医互联网骨科医院服务协议》</i></button>
            <button class="loginButton">注册</button>
          </form>
        </li>
      </ul>

      <wechatLead></wechatLead>
    </section>
    <!-- <vConfirm :confirmParams="{
      title:'该手机号尚未注册',
      ensure:'立即注册',
      cancel:'重新输入'
    }">
    </vConfirm> -->
  </div>
</template>
<script type="text/ecmascript-6">

  import "common/js/third-party/flexible";
  import api from 'common/js/util/util';
  import vConfirm from 'components/verticalConfirm';
  import wechatLead from './wechatLead';
  import "babel-polyfill";

  const XHRList = {}
  export default{
    data() {
      return {
        tabIndex:1
      }
    },
    methods: {
      goLogin () {
        this.$router.push({
          name: "login"
        });
      },
      goLoginRule () {
        this.$router.push({
          name: "loginRule"
        });
      }  
    },
    mounted(){},
    components:{
      vConfirm,
      wechatLead
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .fl{
    float:left;
  }
  .fr{
    float:right;
  }
  .loginRegisterBox{
    padding:rem(80px) rem(75px) 0;
    .loginRegisterTitle{
      @include clearfix();
      @include font-dpr(20px);
      color: #AAAAAA;
      font-weight:600;
      li.on{
        color: #222222;
        &:after{
          display: block;
          content: '';
          width:rem(80px);
          height:rem(10px);
          background-color: #2FC5BD;
          border-radius: 9999px;
          margin:rem(20px) auto 0;
        }
      }
    }
  }
  .formBox{
    box-sizing: border-box;
    p{
      width:100%;
      border: 1px solid #898989;
      box-sizing: border-box;
      padding:rem(36px) rem(30px);
      border-radius: 10px;
      @include font-dpr(17px);
      input{
        outline: none;
        border: none;
        color: #101010;
        font-weight: 600;
        @include placeholder(){
          color: #A0A0A0;
          font-weight: normal;
        }
      }
      &.phoneInput{
        margin-top:rem(60px);
        &>input{
          width:100%;
        }
      }
      &.codeInput{
        margin-top:rem(40px);
        @include clearfix();
        &>input{
          width:62%;
          float:left;
          &.halfWidth{
            width:50%;
          }
        }
        span{
          width:38%;
          float:right;
          text-align: right;
        }
        .getCode{
          color: #2FC5BD;
        }
        .codeCountdown{
          width:50%;
          color: #777777;
        }
      }
    }
    .stipulation{
      display:block;
      color: #AAAAAA;
      @include font-dpr(12px);
      margin-top:rem(20px);
      i{
        color:#2FC5BD;
      }
    }
    .loginButton{
      display:block;
      width:100%;
      line-height:rem(106px);
      color: #FFFFFF;
      margin-top:rem(80px);
      box-sizing: border-box;
      opacity: 0.5;
      background: #2FC5BD;
      border-radius: 10px;
      text-align:center;
      @include font-dpr(18px);
      &.on{
        opacity: 1;
      }
    }
    .changeAndForget{
      @include clearfix();
      padding:rem(40px) rem(30px) 0;
      @include font-dpr(15px);
      color: #AAAAAA;
      .forgetPass{
        color: #2FC5BD;
      }
    }
  }
  .icon-eyesStatus{
    display:inline-block;
    width:rem(44px);
    height:rem(35px);
    background:url("../../../common/image/img00/login/eyes_open.png") no-repeat;
    background-size: 100% 100%;
    margin-top:rem(5px);
    &.hide{
      background:url("../../../common/image/img00/login/eyes_close.png") no-repeat;
    }
  }
  .icon-clearPassword{
    display:inline-block;
    width:rem(40px);
    height:rem(40px);
    margin-left:rem(10px);
    background:url("../../../common/image/img00/login/close_button.png") no-repeat;
    background-size: 100% 100%;
    margin-top:rem(5px);
  }
</style>
