<template>
  <div>
    <section class="loginRegisterBox" v-if="!codeBoxFlag"  data-alcode-mod='746'>
      <ul class="loginRegisterTitle">
        <li class="fl" @click="goLogin()" data-alcode='e154'>手机验证登录</li>
        <li class="fr on">注册</li>
      </ul>

      <ul class="loginRegisterContent">
        <li class="registerContent formBox">
          <p class="phoneInput">
            <input type="number" name="phone" @input="inputMaxLength('phone',11)" v-validate="'required|mobile'" @blur="validateBlur('phone')" v-model="phone" placeholder="请输入手机号" :class="{'hasContent':phone.length>0}">

            <i class="icon-clear" v-if='phone.length' @click='phone = ""'></i>
          </p>
          <p class="codeInput">
            <input :type='passwordHide?"password":"text"' :class="{'hasContent':password.length>0}" name="password" @input="inputMaxLength('password',20)" v-validate="'required|isEmoji|max_length:20|min_length:6'" v-model="password" placeholder="设置密码（至少6位）" @blur="validateBlur('password')">
            <i class="icon-clear" v-if='password.length' @click='password = ""'></i>
            <i class="icon-eyesStatus" :class="{'hide':passwordHide}" @click='toggleHide()' ></i>
          </p>
          <button class="stipulation">注册代表您已同意<i @click="goLoginRule()" data-alcode='e156'>《唯医互联网骨科医院服务协议》</i></button>
          <button class="loginButton" :disabled='isRegister' :class="{'on':password.length && phone.length}" @click="validate()" data-alcode='e155'>注册</button>
        </li>
      </ul>

      <wechatLead v-if="isBroswer"></wechatLead>
    </section>
    <section class="code-box" v-if="codeBoxFlag">
      <h2>验证码</h2>
      <p>已向手机号<span>{{phone}}</span>发送短信验证码</p>
      <section class="codeInput">
        <input type="number" placeholder="请输入验证码" v-validate="'required'" name='validCode' @input="inputMaxLength('validCode',4)" @blur="validateBlur('validCode')" v-model="validCode">
        <span class="getCode" v-if="codeTime<=0" @click="sendCode('again')">重新发送</span>
        <span class="codeCountdown" v-if="codeTime>0"><i>{{codeTime}}</i>秒后重新获取</span>
      </section>
      <button class="submitButton" :class="{'on':validCode.length>0}" @click="validateCode()">提交</button>
    </section>
    <transition name="fade">
      <vConfirm v-if="confirmFlag" :confirmParams="{
        title:'您的手机号已注册',
        ensure:'立即登录',
        cancel:'重新输入',}"
        @ensureClickEvent = 'ensureClickEvent'
        @cancelClickEvent = 'cancelClickEvent'
      >
      </vConfirm>
    </transition>
    <transition name="fade">
      <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import "common/js/third-party/flexible";
import api from "common/js/util/util";

import {
  sendCode,
  mobileRegister,
  passwordLogin
} from "common/js/auth/authMethods.js";

import vConfirm from "components/verticalConfirm";
import wechatLead from "./wechatLead";
import toast from "components/toast";
import "babel-polyfill";
import siteSwitch from "../../../common/js/siteSwitch/siteSwitch";

const XHRList = {};

export default {
  data() {
    return {
      toastImg: {
        wifi: require("../../../common/image/img00/login/wifi@2x.png.png"),
        success: require("../../../common/image/img00/login/Send a success@2x.png")
      },
      isLeave:true, // 是否离开当前路由
      isRegister: false, //注册按钮是否可以点击
      imgUrl: "", // 提示toast框提示
      confirmFlag: false, //confirm 框的显示隐藏
      loginStyle: "phone", //登录方式
      errorShow: false, //toast 框是否显示
      errorMsg: "", // toast 框提示语
      phone: "", // 输入的手机号
      password: "", // 用户输入的密码
      passwordHide: true, // 密码是否可见
      codeBoxFlag: false, // 填写验证码盒子是否显示
      validCode: "", //验证码
      codeId: 0, //验证码id
      codeTime: 0, //验证码倒计时数
      timerObj: {}, //定时器对象
      customerId: "",
      isBroswer: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.isLeave) {
      next(true);
    } else {
      this.codeBoxFlag = false;
      this.isLeave = true;
      clearInterval(this.timerObj);
      next(false);
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: "login"
      });
    },
    goLoginRule() {
      this.$router.push({
        name: "loginRule"
      });
    },
    //confirm 框立即注册事件
    ensureClickEvent() {
      this.confirmFlag = false;
      this.$router.push({
        name: "login"
      });
    },
    //confirm 框重新输入事件
    cancelClickEvent() {
      this.confirmFlag = false;
    },
    // 控制密码是否可见
    toggleHide() {
      this.passwordHide = this.passwordHide ? false : true;
    },
    //input最大长度事件
    inputMaxLength(attr, length) {
      this[attr] = api.getStrByteLen(this[attr], length);
    },
    // 添加验证提示
    addValidateTips() {
      this.$validator.updateDictionary({
        en: {
          custom: {
            //手机号的验证
            phone: {
              required: "请输入手机号码",
              mobile: "请输入正确的手机号码"
            },
            password: {
              required: "请输入至少6位数的密码",
              isEmoji: "请填写真实密码",
              max_length: "密码长度请保持在6-20位",
              min_length: "密码长度请保持在6-20位"
            },
            validCode: {
              required: "请输入手机验证码"
            }
          }
        }
      });
    },
    // 输入框失焦事件
    validateBlur(name) {
      this.$validator.validateAll().then(() => {
        if (this.errors.has(name)) {
          this.errorMsg = this.errors.first(name);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
        }
      });
    },
    //验证表单
    validate() {
      console.log("我要验证");
      this.isRegister = true;
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
            this.isRegister = false;
            this.errorShow = false;
          }, 2000);
          return;
        }
      });
    },
    // 发送验证码
    sendCode(type) {
      this.$store.commit("setLoadingState", true);
      sendCode
        .sendInit({
          account: this.phone,
          operateType: 5,
          typeId: 2
        })
        .then(res => {
          console.log(res);
          let obj = res.responseObject;
          this.isRegister = false;
          if (res.responseObject && res.responseObject.responseStatus) {
            if (obj.responseCode === "SMS0001") {
              console.log("发送成功");
              if (type == "validate") {
                this.validateCallback(); // 手机密码格式验证通过发送验证码后的执行函数
                this.resetCallback(); // 重新发送后的执行函数
              } else {
                this.resetCallback(); // 重新发送后的执行函数
              }
              this.codeId = obj.responsePk;
            }
          } else {
            // this.errorMsg = obj.responseMessage;
            // this.errorShow = true;
            // setTimeout(() => {
            //   this.errorShow = false;
            // }, 2000);
            // return;
            if (obj.responseCode === "SMS0003") {
              this.errorMsg = obj.responseMessage;
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000);
            } else {
              if (type == "validate") {
                this.confirmFlag = true;
              }
            }
            
            console.log("发送验证码失败 + " + obj.responseMessage);
          }
          this.$store.commit("setLoadingState", false);
        })
        .then(err => {
          console.log(err);
          this.$store.commit("setLoadingState", false);
        });
    },

    // 手机密码格式验证通过发送验证码后的执行函数
    validateCallback() {
      this.isLeave =false;
      this.codeBoxFlag = true;
    },
    // 重新发送后的执行函数
    resetCallback() {
      // 走一个60s 的定时器；
      let _time = 60;
      this.codeTime = _time--;
      this.timerObj = setInterval(() => {
        if (_time > 0) {
          this.codeTime = _time--;
        } else {
          this.codeTime = 0;
          clearInterval(this.timerObj);
        }
      }, 1000);
    },
    // 验证验证码
    validateCode() {
      this.$validator.validateAll().then(() => {
        if (this.errors.has("validCode")) {
          this.errorMsg = this.errors.first("validCode");
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
        } else {
          this.mobileRegisterFun();
        }
      });
    },
    // 手机号注册
    mobileRegisterFun() {
      let _this = this;
      let _sendPrams = {
        account: this.phone,
        password: this.password,
        validCode: this.validCode,
        codeId: this.codeId
      };
      if (api.getPara().customerId && api.getPara().customerId.length > 0) {
        _sendPrams.customerId = api.getPara().customerId;
      }
      this.$store.commit("setLoadingState", true);
      mobileRegister
        .registerInit(_sendPrams)
        .then(res => {
          console.log(res);
          let _obj = res.responseObject;
          if (_obj && _obj.responseStatus && _obj.responseCode == "success") {
            this.accountLoginFn();
          } else {
            this.errorShow = true;
            this.errorMsg = _obj.responseMessage;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000);
            console.log("注册失败");
          }
          this.$store.commit("setLoadingState", false);
        })
        .then(err => {
          console.log(err);
          this.$store.commit("setLoadingState", false);
        });
    },
    // 帐密登录
    accountLoginFn() {
      let _this = this;
      this.$store.commit("setLoadingState", true);
      passwordLogin
        .loginInit({
          account: this.phone,
          password: this.password
        })
        .then(data => {
          if (data.responseObject.responseStatus) {
            const _obj = data.responseObject.responseData;
            localStorage.setItem("userId", _obj.customerId);
            localStorage.setItem("userName", _obj.nickName);
            localStorage.setItem("mobile", _obj.mobile);
            localStorage.setItem("logoUrl", _obj.headUrl);
            console.log("登录成功");
            window.location.href = localStorage.getItem("backUrl");
          } else {
            console.log("登录失败");
          }
          this.$store.commit("setLoadingState", false);
        });
    }
  },

  mounted() {
    let _this = this;
    console.log(sendCode);
    api.forbidShare();
    this.addValidateTips(); // 添加验证规则提示
    siteSwitch.weChatJudge(
      ua => {
        _this.isBroswer = false;
      },
      ua => {
        _this.isBroswer = true;
      }
    );
  },
  components: {
    vConfirm,
    wechatLead,
    toast
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../scss/library/_common-modules";
.fl {
  float: left;
}
.fr {
  float: right;
}
.loginRegisterBox {
  padding: rem(80px) rem(75px) 0;
  .loginRegisterTitle {
    @include clearfix();
    @include font-dpr(20px);
    color: #aaaaaa;
    font-weight: 600;
    li.on {
      color: #222222;
      &:after {
        display: block;
        content: "";
        width: rem(80px);
        height: rem(10px);
        background-color: #2fc5bd;
        border-radius: 9999px;
        margin: rem(20px) auto 0;
      }
    }
  }
}
.code-box {
  box-sizing: border-box;
  padding: rem(80px) rem(75px) 0;
  h2 {
    @include font-dpr(22px);
    color: #222222;
  }
  p {
    margin-top: rem(35px);
    @include font-dpr(15px);
    color: #222222;
    span {
      margin: 0 rem(10px);
      font-weight: 600;
    }
  }

  .submitButton {
    display: block;
    width: 100%;
    line-height: rem(106px);
    color: #ffffff;
    margin-top: rem(40px);
    box-sizing: border-box;
    opacity: 0.5;
    background: #2fc5bd;
    border-radius: 10px;
    text-align: center;
    @include font-dpr(18px);
    &.on {
      opacity: 1;
    }
  }
}
.codeInput {
  width: 100%;
  margin-top: rem(100px);
  border: 1px solid #898989;
  box-sizing: border-box;
  padding: rem(36px) rem(30px);
  border-radius: 10px;
  @include font-dpr(17px);
  @include clearfix();
  & > input {
    outline: none;
    border: none;
    color: #101010;
    font-weight: 600;
    width: 50%;
    float: left;
    @include placeholder() {
      color: #a0a0a0;
      font-weight: normal;
    }
  }
  span {
    text-align: right;
    float: right;
  }

  .getCode {
    width: 40%;
    color: #2fc5bd;
  }

  .codeCountdown {
    width: 50%;
    color: #777777;
  }
}
.formBox {
  box-sizing: border-box;
  p {
    width: 100%;
    border: 1px solid #898989;
    box-sizing: border-box;
    padding: rem(36px) rem(30px);
    border-radius: 10px;
    @include font-dpr(17px);
    position: relative;
    input {
      outline: none;
      border: none;
      color: #101010;
      font-weight: 600;
      @include placeholder() {
        color: #a0a0a0;
        font-weight: normal;
      }
    }
    &.phoneInput {
      margin-top: rem(60px);
      @include clearfix();
      & > input {
        width: 80%;
        float: left;
        &.hasContent{
          @include font-dpr(28px);
          font-weight: bold;
        }
      }
      .icon-clear {
        right: rem(30px);
        &.hasContent{
          margin-top: rem(20px);
        }
      }
    }
    &.codeInput {
      margin-top: rem(40px);
      @include clearfix();
      & > input {
        width: 62%;
        float: left;
        &.hasContent{
          @include font-dpr(28px);
        }
        &.halfWidth {
          width: 50%;
        }
      }
      .icon-clear {
        right: rem(84px);
      }
      span {
        width: 38%;
        float: right;
        text-align: right;
      }
      .getCode {
        color: #2fc5bd;
      }
      .codeCountdown {
        width: 50%;
        color: #777777;
      }
    }
  }
  .stipulation {
    display: block;
    color: #aaaaaa;
    @include font-dpr(12px);
    margin-top: rem(20px);
    i {
      color: #2fc5bd;
    }
  }
  .loginButton {
    display: block;
    width: 100%;
    line-height: rem(106px);
    color: #ffffff;
    margin-top: rem(80px);
    box-sizing: border-box;
    opacity: 0.5;
    background: #2fc5bd;
    border-radius: 10px;
    text-align: center;
    @include font-dpr(18px);
    &.on {
      opacity: 1;
    }
  }
  .changeAndForget {
    @include clearfix();
    padding: rem(40px) rem(30px) 0;
    @include font-dpr(15px);
    color: #aaaaaa;
    .forgetPass {
      color: #2fc5bd;
    }
  }
}
.icon-eyesStatus {
  display: inline-block;
  position: absolute;
  width: rem(44px);
  height: rem(54px);
  top: 50%;
  margin-top: rem(-27px);
  right: rem(30px);
  background: url("../../../common/image/img00/login/eyes_open.png") center
    center no-repeat;
  background-size: rem(44px) rem(32px);
  &.hide {
    background: url("../../../common/image/img00/login/eyes_close.png") center
      center no-repeat;
    background-size: rem(44px) rem(38px);
  }
}
.icon-clear {
  display: inline-block;
  position: absolute;
  width: rem(54px);
  height: rem(54px);
  top: 50%;
  margin-top: rem(-27px);
  background: url("../../../common/image/img00/login/close_button.png") center
    center no-repeat;
  background-size: rem(38px) rem(38px);
}

/*vue组件自定义动画开始*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/*vue组件自定义动画结束*/
</style>
