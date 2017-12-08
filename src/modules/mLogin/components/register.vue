<template>
  <div>
    <section class="loginRegisterBox" v-if="!codeBoxFlag">
      <ul class="loginRegisterTitle">
        <li class="fl" @click="goLogin()">手机验证登录</li>
        <li class="fr on">注册</li>
      </ul>

      <ul class="loginRegisterContent">
        <li class="registerContent formBox">
            <p class="phoneInput">
              <input type="number" name="phone" v-validate="'required|mobile'" @blur="validateBlur('phone')" v-model="phone" placeholder="请输入手机号">
              <span class="iconBox">
                <i class="icon-clear" v-if='phone.length' @click='phone = ""'></i>
              </span>
            </p>
            <p class="codeInput">
              <input :type='passwordHide?"password":"text"' name="password" v-validate="'required'" v-model="password" placeholder="设置密码（至少6位）" @blur="validateBlur('password')">
              <span class="iconBox">
                <i class="icon-clear" v-if='password.length' @click='password = ""'></i>
                <i class="icon-eyesStatus" :class="{'hide':passwordHide}" @click='toggleHide()'></i>
              </span>
            </p>
            <button class="stipulation">注册代表您已同意<i @click="goLoginRule()">《唯医互联网骨科医院服务协议》</i></button>
            <button class="loginButton" @click="validate()">注册</button>
        </li>
      </ul>

      <wechatLead></wechatLead>
    </section>
    <section class="code-box" v-if="codeBoxFlag">
      <h2>验证码</h2>
      <p>已向手机号<span>{{phone}}</span>发送短信验证码</p>
      <section class="codeInput">
        <input type="number" placeholder="请输入验证码" v-model="validCode">
        <span class="getCode">重新发送</span>
      </section>
      <button class="submitButton" @click="mobileRegisterFun()">提交</button>
    </section>
    <vConfirm v-if="confirmFlag" :confirmParams="{
      title:'您的手机号已注册',
      ensure:'立即登录',
      cancel:'重新输入',}"
      @ensureClickEvent = 'ensureClickEvent'
      @cancelClickEvent = 'cancelClickEvent'
    >
    </vConfirm>
    <transition name="fade">
      <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">

  import "common/js/third-party/flexible";
  import api from 'common/js/util/util';

  import {sendCode,mobileRegister} from 'common/js/auth/authMethods.js';

  import vConfirm from 'components/verticalConfirm';
  import wechatLead from './wechatLead';
  import toast from 'components/toast';
  import "babel-polyfill";

  const XHRList = {}

  export default{
    data() {
      return {
        toastImg: {
          wifi: require('../../../common/image/img00/login/wifi@2x.png.png'),
          success: require('../../../common/image/img00/login/Send a success@2x.png')
        },
        imgUrl:'',// 提示toast框提示
        confirmFlag:false,//confirm 框的显示隐藏
        loginStyle:'phone',//登录方式
        errorShow:false,//toast 框是否显示
        errorMsg:'',// toast 框提示语
        phone:'',// 输入的手机号
        password:'',// 用户输入的密码
        passwordHide:true, // 密码是否可见
        codeBoxFlag:false, // 填写验证码盒子是否显示
        validCode:"", //验证码
        codeId:0,//验证码id
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
      },
      //confirm 框立即注册事件
      ensureClickEvent () {
        this.confirmFlag = false;
        this.$router.push({
          name: "login"
        });
      },
      //confirm 框重新输入事件
      cancelClickEvent () {
        this.confirmFlag = false;
      },  
      // 控制密码是否可见
      toggleHide () {
        this.passwordHide = this.passwordHide ? false : true;
      },
      // 添加验证提示
      addValidateTips () {
        this.$validator.updateDictionary({
        en: {
          custom: {
            //手机号的验证
            phone:{
              required: '请输入手机号码',
              mobile:'请输入正确的手机号码',
            },
            password:{
              required: '请输入至少6位的密码',
            }
          }
        }
      });
      },
      // 输入框失焦事件
      validateBlur (name) {
        this.$validator.validateAll().then(()=>{
          if (this.errors.has(name)) {
            this.errorMsg = this.errors.first(name);
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000)
          }
        });
      },
      //验证表单
      validate () {
        console.log('我要验证');
        this.$validator.validateAll().then(result => {
          console.log(result);
          if (result) {
            this.errorShow = false;
            this.sendCode("validate");
          } else {
            console.log(this.$validator.errors);
            this.formCheck = false;
            this.errorMsg = this.$validator.errors.items[0].msg;
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000);
            return;
          }
        });
      },
      // 发送验证码
      sendCode (type) {
        sendCode.sendInit({
          account:this.phone,
          operateType:5,
          typeId:2,
        }).then((res) => {
          console.log(res);
          if (res.responseObject && res.responseObject.responseStatus) {
            let obj = res.responseObject;
            if (obj.responseCode === "SMS0001") {
              console.log("发送成功");
              if (type == "validate") {
                this.validateCallback();// 手机密码格式验证通过发送验证码后的执行函数
              } else {
                this.resetCallback();// 重新发送后的执行函数
              }
              this.codeId = obj.responsePk;
            } else {
              this.errorMsg = obj.responseMessage;
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000);
              return;
            }
          }
        }).then((err) => {
          console.log(err);
        })
      },

      // 手机密码格式验证通过发送验证码后的执行函数
      validateCallback () {
        this.codeBoxFlag = true;
      },
      // 重新发送后的执行函数
      resetCallback () {

      },
      // 手机号注册
      mobileRegisterFun () {
        mobileRegister.registerInit({
          account:this.phone,
          password:this.password,
          validCode:this.validCode,
          codeId:this.codeId,
        }).then(() => {

        }).then(() => {
          
        })
      }
    },

    mounted(){
      console.log(sendCode);
      this.addValidateTips(); // 添加验证规则提示
    },
    components:{
      vConfirm,
      wechatLead,
      toast
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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
  .code-box{
    box-sizing: border-box;
    padding:rem(80px) rem(75px) 0;
    h2{
      @include font-dpr(22px);
      color: #222222;
    }
    p{
      margin-top:rem(35px);
      @include font-dpr(15px);
      color: #222222;
      span{
        margin:0 rem(10px);
        font-weight:600;
      }
    }
    .codeInput{
      width:100%;
      margin-top:rem(100px);
      border: 1px solid #898989;
      box-sizing: border-box;
      padding:rem(36px) rem(30px);
      border-radius: 10px;
      @include font-dpr(17px);
      @include clearfix();
      &>input{
        outline: none;
        border: none;
        color: #101010;
        font-weight: 600;
        width:60%;
        float:left;
        @include placeholder(){
          color: #A0A0A0;
          font-weight: normal;
        }
      }
      .getCode{
        width:40%;
        float:right;
        text-align: right;
        color: #2FC5BD;
      }
    }
    .submitButton{
      display:block;
      width:100%;
      line-height:rem(106px);
      color: #FFFFFF;
      margin-top:rem(40px);
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
          width:80%;
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
  .icon-clear{
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
