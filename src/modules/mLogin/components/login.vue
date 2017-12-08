<template>
  <div>
    <section class="loginRegisterBox">
      <ul class="loginRegisterTitle">
        <li class="fl on">{{loginStyle == "phone"?'手机验证登录':'账号密码登录'}}</li>
        <li class="fr" @click="goReginster">注册</li>
      </ul>

      <ul class="loginRegisterContent">
        <li class="phoneLogin" v-if="loginStyle == 'phone'">
          <form class="formBox">
            <p class="phoneInput"><input type="number" placeholder="请输入手机号"></p>
            <p class="codeInput">
              <input type="number" placeholder="请输入验证码">
              <span class="getCode">获取验证码</span>
              <span class="codeCountdown" style="display:none;"><i>54</i>秒后重新获取</span>
            </p>
            <button class="loginButton">登录</button>
            <article class="changeAndForget">
              <span class="changeLoginWay fl" @click="loginStyle = 'account'">账号密码登录</span>
            </article>
          </form>
        </li>
        <li class="accountLogin" v-if="loginStyle == 'account'">
          <form class="formBox">
            <p class="phoneInput"><input type="number" placeholder="请输入手机号"></p>
            <p class="codeInput">
              <input type="number" placeholder="请输入密码">
              <i class="icon-eyesStatus fr"></i>
            </p>
            <button class="loginButton">登录</button>
            <article class="changeAndForget">
              <span class="changeLoginWay fl" @click="loginStyle = 'phone'">手机验证登录</span>
              <span class="forgetPass fr" @click="goForgetPass()">忘记密码？</span>
            </article>
          </form>
        </li>
      </ul>
      <wechatLead></wechatLead>
    </section>
    <vConfirm v-if="confirmFlag" :confirmParams="{
      title:'该手机号尚未注册',
      ensure:'立即注册',
      cancel:'重新输入',}"
      @ensureClickEvent = 'ensureClickEvent'
      @cancelClickEvent = 'cancelClickEvent'
    >
    </vConfirm>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">

  import "common/js/third-party/flexible";
  import api from 'common/js/util/util';
  import vConfirm from 'components/verticalConfirm';
  import wechatLead from './wechatLead';
  import toast from 'components/toast';
  import "babel-polyfill";

  const XHRList = {}
  export default{
    data() {
      return {
        confirmFlag:false,//confirm 框的显示隐藏
        loginStyle:'phone',//登录方式
        errorShow:false,//toast 框是否显示
        errorMsg:'',// toast 框提示语
      }
    },
    methods: {
      goReginster () {
        this.$router.push({
          name: "register"
        });
      },
      goForgetPass () {
        this.$router.push({
          name: "forgetPassword"
        });
      },
      //confirm 框立即注册事件
      ensureClickEvent () {
        this.confirmFlag = false;
        this.$router.push({
          name: "register"
        });
      },
      //confirm 框重新输入事件
      cancelClickEvent () {
        this.confirmFlag = false;
      },
      // 切换登陆方式
      toggleLogin () {
        this.loginStyle = this.loginStyle == 'phone'? 'account' :'phone';
      }
    },
    mounted(){},
    components:{
      vConfirm,
      wechatLead,
      toast
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


  /*vue组件自定义动画开始*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

  /*vue组件自定义动画结束*/

</style>
