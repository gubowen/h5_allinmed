<template>
<div>
  <section class="forgetPassword"  data-alcode-mod='747'>
    <h2 v-if="finishMobile">设置新密码</h2>
    <h2 v-if="!finishMobile">忘记密码？</h2>
    <p v-if="finishMobile">已向手机号<span>{{phoneMessage}}</span>发送短信验证码</p>
    <p v-if="!finishMobile">我们会向您的手机发送验证码</p>
    <ul class="loginRegisterContent">
      <li class="registerContent formBox">
        <p class="codeInput phoneNum" v-show="!finishMobile">
          <input
            type="number"
            placeholder="请输入注册手机号码"
            v-validate="'required|mobile'"
            name="phone"
            @blur="validateBlur('phone')"
            @input="onPressPhone()"
            v-model="phoneMessage"
            style="width:100%"
            :class="{'hasContent':phoneMessage.length>0}"
          >
          <i class="icon-clear" v-if='phoneMessage.length' @click='phoneMessage = ""'></i>
        </p>
        <p class="codeInput codeMessage" v-show="finishMobile">
          <input type="number"
          :class="{'getCodeInput':codeTime>0,'hasContent':codeMessage.length>0}"
           placeholder="请输入验证码"
            v-model="codeMessage"
            v-validate="'required|digits:4'"
            name="codeInput" />
          <i class="icon-clear" :class="{'off':codeTime<=0}" v-if='codeMessage.length' @click='codeMessage = ""'></i>
          <span class="getCode" :class="{'hasContent':codeMessage.length>0}" v-if="codeTime<=0" @click="sendCode">重新发送</span>
          <span class="codeCountdown" :class="{'hasContent':codeMessage.length>0}" v-if="codeTime>0"><i>{{codeTime}}</i>秒后重新获取</span>
        </p>
        <p class="codeInput" v-show="finishMobile">
          <input :type='passwordHide?"password":"text"'
          name="password"
          v-validate="'required|password'"
          v-model="password"
          placeholder="设置密码（至少6位）"
          @blur="validateBlur('password')"
          :class="{'hasContent':password.length>0}"
           >
          <span class="iconBox" style="position: absolute;right: 15%;">
                <i class="icon-clearPassword" :class="{'hasContent':password.length>0}" v-if='password.length' @click='password = ""'></i>
                <i class="icon-eyesStatus" :class="{'hide':passwordHide,'hasContent':password.length>0}" @click='passwordHide=!passwordHide'></i>
              </span>
        </p>
      </li>
    </ul>
    <button class="submitButton" v-if="!finishMobile" :class="{'on':phonePass}" @click="phonePass&&sendCode()" data-alcode='e157'>发送验证码</button>
    <button class="submitButton" v-if="finishMobile" :class="{'on':allPass}" @click="resetPassword()">提交</button>

  </section>
          <transition name="fade">
        <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
</div>
</template>
<script type="text/ecmascript-6">
import api from "common/js/util/util";
import Toast from "components/toast";
import SendCode from "common/js/auth/sendCode";
import SearchPassword from "common/js/auth/searchPassword";

const sendCode = new SendCode();
const searchPassword = new SearchPassword();
const XHRList = {};
export default {
  data() {
    return {
      finishMobile: false,
      finishValid: false,
      phoneMessage: "",
      codeMessage: "",
      codeId: "",
      password: "",
      codeTime: 0,
      allPass: false,
      phonePass: false,
      errorShow: false, //toast 框是否显示
      errorMsg: "", // toast 框提示语
      imgUrl: "",
      passwordHide: true,
      toastImg: {
        wifi: require("../../../common/image/img00/login/wifi@2x.png.png"),
        success: require("../../../common/image/img00/login/Send a success@2x.png")
      }
    };
  },
  components: {
    Toast
  },
  mounted() {
    api.forbidShare();
    this.$validator.updateDictionary({
      en: {
        custom: {
          //手机号的验证
          phone: {
            required: "请输入手机号码",
            mobile: "请输入正确的手机号码"
          },
          account: {
            required: "请输入手机号码",
            mobile: "请输入正确的手机号码"
          },
          //患者关系的验证规则
          codeInput: {
            required: "请输入短信验证码",
            digits: "验证码错误"
          },
          //账号登录密码
          password: {
            required: "请输入密码",
            digits: "密码错误"
          }
        }
      }
    });
  },
  methods: {
    onKeyPress() {
      let content = this.phoneMessage;
      if (api.getByteLen(content) > 11) {
        this.phoneMessage = api.getStrByteLen(content, 11);
      }
    },
    onPressPhone() {
      let content = this.phoneMessage;
      if (api.getByteLen(content) > 11) {
        this.phoneMessage = api.getStrByteLen(content, 11);
      } else if (api.getByteLen(content) === 11) {
        this.phonePass = true;
      }
    },
    validateBlur(name) {
      this.$validator.validateAll();
      if (this.codeMessage&&this.password&&this.errors.items.length === 0) {
        this.allPass = true;
      } else {
        this.allPass = false;
        if (this.errors.has(name)) {
          this.toastComm(this.errors.first(name));
        }
      }
    },
    //toast提示
    toastComm(text, fn) {
      let _this = this;
      _this.errorMsg = text;
      _this.errorShow = true;
      setTimeout(() => {
        _this.errorShow = false;
        _this.imgUrl = "";
        fn && fn();
      }, 2000);
    },
    sendCode() {
      let _this = this;
      this.$validator.validateAll();
      this.$store.commit("setLoadingState",true);
      if (this.errors.has("phone")) {
        this.toastComm(_this.errors.first("phone"));
         this.$store.commit("setLoadingState",false);
        return;
      } else {
        sendCode
          .sendInit({
            account: this.phoneMessage,
            operateType: 3,
            typeId: 1
          })
          .then(data => {
            if (data.responseObject.responseStatus) {
              this.finishMobile = true;
              this.codeId = data.responseObject.responsePk;
              this.toastComm("验证码已发送");
              this.imgUrl = this.toastImg.success;
              this.countDown(60);
               this.$store.commit("setLoadingState",false);
            } else {
              this.toastComm(data.responseObject.responseMessage);
               this.$store.commit("setLoadingState",false);
            }
          });
      }
    },
    //验证码倒计时
    countDown(time) {
      let _this = this;
      let _codeTime = time;
      _this.codeTime = _codeTime--;
      _this.getCode = false;
      let inn = window.setInterval(() => {
        if (_codeTime > 0) {
          _this.codeTime = _codeTime--;
        } else {
          _this.getCode = true;
          _this.codeTime = 0;
          clearInterval(inn);
        }
      }, 1000);
    },
    resetPassword() {
      this.$store.commit("setLoadingState",true);
      this.$validator.validateAll();
        if (this.errors.has("codeInput")) {
          this.toastComm(this.errors.first("codeInput"));
          this.$store.commit("setLoadingState",false);
          return;
        } else if (this.errors.has("password")) {
          this.toastComm(this.errors.first("password"));
          this.$store.commit("setLoadingState",false);
          return;
        }
      searchPassword
        .searchInit({
          account: this.phoneMessage,
          codeId: this.codeId,
          validCode: this.codeMessage,
          password: this.password
        })
        .then(data => {
          if (data.responseObject.responseStatus) {
            this.toastComm("密码修改成功");
            const from=api.getPara().from;
            setTimeout(() => {
               if (
                api.getPara().customerId &&
                api.getPara().customerId.length > 0
              ) {
                window.location.href=`/dist/mLogin.html?from=${from}&customerId=${api.getPara().customerId}`;
              }else{
                window.location.href=`/dist/mLogin.html?from=${from}`;
              }
            }, 3000);
            this.$store.commit("setLoadingState",false);
          } else {
            this.toastComm(data.responseObject.responseMessage);
            this.$store.commit("setLoadingState",false);
          }
        });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../scss/library/_common-modules";

.forgetPassword {
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
      // margin: 0 rem(10px);
      font-weight: 600;
    }
  }
  .codeInput {
    width: 100%;
    // margin-top: rem(100px);
    border: 1px solid #898989;
    box-sizing: border-box;
    padding: rem(36px) rem(30px);
    border-radius: 10px;
    @include font-dpr(17px);
    @include clearfix();
    &.phoneNum{
      position: relative;
      .icon-clear{
        display: inline-block;
        position: absolute;
        width: rem(54px);
        height: rem(54px);
        top: 50%;
        margin-top: rem(-27px);
        right: rem(30px);
        background: url("../../../common/image/img00/login/close_button.png")
          center center no-repeat;
        background-size: rem(38px) rem(38px);
      }
    }
    &.codeMessage{
       position: relative;
      .icon-clear{
        display: inline-block;
        position: absolute;
        width: rem(54px);
        height: rem(54px);
        top: 50%;
        margin-top: rem(-25px);
        right: rem(320px);
        background: url("../../../common/image/img00/login/close_button.png")
          center center no-repeat;
        background-size: rem(38px) rem(38px);
        &.off{
          right: rem(180px);
        }
      }
    }
    .getCode {
      width: 40%;
      float: right;
      text-align: right;
      color: #2fc5bd;
      &.hasContent{
        margin-top: rem(16px);
      }
    }
    .codeCountdown {
      width: 50%;
      color: #777777;
      &.hasContent{
        display: inline-block;
        margin-top: rem(16px);
      }
    }
    .getCodeInput{
      width: 50%;
    }
    & > input {
      outline: none;
      border: none;
      color: #101010;
      width:60%;
      font-weight: 600;
      float: left;
      @include placeholder() {
        color: #a0a0a0;
        font-weight: normal;
      }
      &.hasContent{
          @include font-dpr(28px);
          font-weight: bold;
      }
    }
    .icon-eyesStatus {
      display: inline-block;
      width: rem(44px);
      height: rem(35px);
      background: url("../../../common/image/img00/login/eyes_open.png")
        no-repeat;
      background-size: 100% 100%;
      margin-top: rem(5px);
      &.hide {
        background: url("../../../common/image/img00/login/eyes_close.png")
          no-repeat;
        background-size: contain;
      }
      &.hasContent{
        margin-top: rem(18px);
      }
    }

    .icon-clearPassword {
      display: inline-block;
      width: rem(40px);
      height: rem(40px);
      margin-left: rem(10px);
      background: url("../../../common/image/img00/login/close_button.png")
        no-repeat;
      background-size: 100% 100%;
      margin-top: rem(5px);
      &.hasContent{
        margin-top: rem(18px);
      }
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
/*vue组件自定义动画开始*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
