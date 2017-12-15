<template>
  <div>
    <section class="loginRegisterBox">
      <ul class="loginRegisterTitle">
        <li class="fl on">{{loginStyle == "phone"?'手机验证登录':'账号密码登录'}}</li>
        <li class="fr" @click="goReginster">注册</li>
      </ul>

      <ul class="loginRegisterContent">
        <!-- 手机验证登录 -->
        <li class="phoneLogin" v-show="loginStyle == 'phone'">
          <form class="formBox">
            <p class="phoneInput">
              <input
              type="number"
              placeholder="请输入手机号"
              v-validate="'required|mobile'"
              name="phone"
              @blur="validateBlur('phone')"
              @input="onKeyPress()"
              v-model="phoneMessage"
              >
            </p>
            <p class="codeInput">
              <input type="number"
              placeholder="请输入验证码"
              v-model="codeMessage"
              @blur="validateBlur('codeInput')"
              v-validate="'required|digits:4'"
              @input="codeKeyPress()"
              name="codeInput"
              >
              <span class="getCode" v-if="codeTime<=0" @click="getCodeApi()">获取验证码</span>
              <span class="codeCountdown" v-if="codeTime>0"><i>{{codeTime}}</i>秒后重新获取</span>
            </p>
            <button class="loginButton" :class="{'on':allPass}" @click.prevent="validLogin()">登录</button>
            <article class="changeAndForget">
              <span class="changeLoginWay fl" @click="toggleLogin">账号密码登录</span>
            </article>
          </form>
        </li>
        <!-- 账号密码登录 -->
        <li class="accountLogin" v-show="loginStyle == 'account'">
          <form class="formBox">
            <p class="phoneInput">
              <input type="number" placeholder="请输入手机号" name="account" v-validate="'required|mobile'" @blur="accountValidateBlur('account')" @input="onKeyPress()" v-model="phoneMessage">
            </p>
            <p class="codeInput">
              <input type="number" placeholder="请输入密码" :type="pwHide?'password':'text'" name="password" v-validate="'required|password'" @input="onKeyPressPassWord()" @blur="accountValidateBlur('password')" v-model="password">
              <i class="icon-eyesStatus fr"
              @click="pwHide=!pwHide"
               :class="{'hide':pwHide}"></i>
            </p>
            <button class="loginButton" :class="{'on':allPass}" @click.prevent="submitDisable&&accountLoginFn()">登录</button>
            <article class="changeAndForget">
              <span class="changeLoginWay fl" @click="toggleLogin">手机验证登录</span>
              <span class="forgetPass fr" @click="goForgetPass()">忘记密码？</span>
            </article>
          </form>
        </li>
      </ul>
      <wechatLead v-if="isBroswer"></wechatLead>
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
        <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import "common/js/third-party/flexible";
import api from "common/js/util/util";
import vConfirm from "components/verticalConfirm";
import wechatLead from "./wechatLead";
import toast from "components/toast";
import "babel-polyfill";

import SendCode from "common/js/auth/sendCode";
import ValidCodeLogin from "common/js/auth/validCodeLogin";
import PasswordLogin from "common/js/auth/passwordLogin";
import siteSwitch from "../../../common/js/siteSwitch/siteSwitch";

const sendCode = new SendCode();
const validCodeLogin = new ValidCodeLogin();
const passwordLogin = new PasswordLogin();
const XHRList = {};
export default {
  data() {
    return {
      confirmFlag: false,  //confirm 框的显示隐藏
      loginStyle: "phone", //登录方式
      errorShow: false,    //toast 框是否显示
      errorMsg: "",        // toast 框提示语
      phoneMessage: "",    //手机号码
      codeMessage: "",     //验证码
      password: "",        //密码
      pwHide: true,        //密码可见
      codeTime: 0,         //验证码有效时间
      getCode: true,
      imgUrl: "",
      submitDisable:true,  //是否可点
      isBroswer: false,
      toastImg: {
        wifi: require("../../../common/image/img00/login/wifi@2x.png.png"),
        success: require("../../../common/image/img00/login/Send a success@2x.png")
      },
      allPass: false,
      params: {
        codeCheck: {
          validCode: "",  //string	是	验证码CODE
          codeId: "",     //string	是	验证码主键
          //              isValid: 1,       //	string	是	修改验证码信息
          account: "",    //string	是	手机号
          customerId: "",
          mobile: "",
          isCheckMobile: 1,
          checkMobileTime: 1
        }
      }
    };
  },
  methods: {
    //注册路由
    goReginster() {
      this.$router.push({
        name: "register"
      });
    },
    //忘记密码路由
    goForgetPass() {
      this.$router.push({
        name: "forgetPassword"
      });
    },
    //confirm 框立即注册事件
    ensureClickEvent() {
      this.confirmFlag = false;
      this.$router.push({
        name: "register"
      });
    },
    //confirm 框重新输入事件
    cancelClickEvent() {
      this.confirmFlag = false;
    },
    // 切换登陆方式
    toggleLogin() {
      this.loginStyle = this.loginStyle == "phone" ? "account" : "phone";
      this.phoneMessage = "";
      this.codeMessage = "";
      this.codeTime = 0;
      this.password = "";
      this.allPass = false; //清除验证
    },
    //验证码登录验证
    validateBlur(name) {
      this.$validator.validateAll();
      if (
        this.phoneMessage &&
        this.codeMessage &&
        !this.errors.has("phone") &&
        !this.errors.has("codeInput")
      ) {
        this.allPass = true;
      } else {
        this.allPass = false;
        if (this.errors.has(name)) {
          this.toastComm(this.errors.first(name));
        }
      }
    },
    //账密登陆验证
    accountValidateBlur(name) {
      this.$validator.validateAll();
      if (
        this.phoneMessage &&
        this.password &&
        !this.errors.has("account") &&
        !this.errors.has("password")
      ) {
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
    //11位手机号截取
    onKeyPress() {
      let content = this.phoneMessage;
      if (api.getByteLen(content) > 11) {
        this.phoneMessage = api.getStrByteLen(content, 11);
      }
    },
    //4位验证码截取
    codeKeyPress() {
      let content = this.codeMessage;
      if (api.getByteLen(content) > 4) {
        this.codeMessage = api.getStrByteLen(content, 4);
      }else if(api.getByteLen(content)==4){
        this.$validator.validateAll();
        if(!this.errors.has("phone")&&!this.errors.has("codeInput")){
          this.allPass = true
        }
      }
    },
    //密码输入长度检测（6 ~ 20位）
    onKeyPressPassWord(){
      let _password = this.password;
      console.log(api.getByteLen(_password));
      if (api.getByteLen(_password) > 5) {
        this.$validator.validateAll();
        if(!this.errors.has("account")&&!this.errors.has("password")){
          this.allPass = true
        }
      }
    },
    //获取验证码
    getCodeApi() {
      let _this = this;
      this.$validator.validateAll();
      if (this.getCode) {
        if (this.errors.has("phone")) {
          this.toastComm(this.errors.first("phone"));
          return;
        } else if (!this.phoneMessage.length > 0) {
          this.toastComm("请输入手机号码");
          return;
        }
      } else {
        return;
      }
      this.$store.commit("setLoadingState", true);
      sendCode
        .sendInit({
          account: _this.phoneMessage,
          operateType: 8,
          typeId: 3
        })
        .then(res => {
          const data = res;
          _this.finish = false;
          if (
            data.responseObject.responsePk !== 0 &&
            data.responseObject.responseStatus
          ) {
            _this.toastComm("验证码已发送");
            _this.imgUrl = _this.toastImg.success;
            _this.countDown(60);
            _this.params.codeCheck.codeId = data.responseObject.responsePk;
          } else {
            _this.errorMsg = data.responseObject.responseMessage;
            _this.errorShow = true;
            setTimeout(() => {
              _this.errorShow = false;
            }, 2000);
          }
          this.$store.commit("setLoadingState", false);
        })
        .catch(err => {
          console.log(err);
          _this.finish = false;
          _this.toastComm("网络信号差，建议您稍后再试");
          _this.imgUrl = _this.toastImg.wifi;
          this.$store.commit("setLoadingState", false);
        });
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
    //验证登录
    validLogin() {
      if (this.allPass) {
        this.$store.commit("setLoadingState", true);
        validCodeLogin
          .validInit({
            account: this.phoneMessage,
            codeId: this.params.codeCheck.codeId,
            validCode: this.codeMessage,
            typeId: 3
          })
          .then(data => {
            if (data.responseObject.responseStatus) {
              const _obj = data.responseObject.responseData;
              localStorage.setItem("userId", _obj.customerId);
              localStorage.setItem("userName", _obj.nickName);
              localStorage.setItem("mobile", _obj.mobile);
              localStorage.setItem("logoUrl", _obj.headUrl);
              this.toastComm("登录成功，即将返回来源页面", () => {
                // window.location.href = document.referrer;
                window.location.href = localStorage.getItem("backUrl");
              });
            } else {
              this.toastComm(data.responseObject.responseMessage);
            }
            this.$store.commit("setLoadingState", false);
          });
      }
    },
    // 帐密登录
    accountLoginFn() {
      let _this = this;
      _this.submitDisable = false;
      if (this.allPass) {
        this.$store.commit("setLoadingState", true);
        passwordLogin
          .loginInit({
            account: this.phoneMessage,
            password: this.password
          })
          .then(data => {
            if (data.responseObject.responseStatus) {
              const _obj = data.responseObject.responseData;
              localStorage.setItem("userId", _obj.customerId);
              localStorage.setItem("userName", _obj.nickName);
              localStorage.setItem("mobile", _obj.mobile);
              localStorage.setItem("logoUrl", _obj.headUrl);
              this.toastComm("登录成功，即将返回来源页面", () => {
                // window.location.href = document.referrer;
                window.location.href = localStorage.getItem("backUrl");
              });
            } else {
              this.toastComm(data.responseObject.responseMessage, ()=>{
                _this.submitDisable = true;
              });
            }
            this.$store.commit("setLoadingState", false);
          });
      }
    }
  },
  mounted() {
    let _this = this;
    siteSwitch.weChatJudge(
      ua => {
        _this.isBroswer = false;
      },
      ua => {
        _this.isBroswer = true;
      }
    );
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
  activated() {
    api.forbidShare();
    this.$validator.updateDictionary({
      en: {
        custom: {
          //手机号的验证
          phone: {
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
  components: {
    vConfirm,
    wechatLead,
    toast
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
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
.formBox {
  box-sizing: border-box;
  p {
    width: 100%;
    border: 1px solid #898989;
    box-sizing: border-box;
    padding: rem(36px) rem(30px);
    border-radius: 10px;
    @include font-dpr(17px);
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
      & > input {
        width: 100%;
      }
    }
    &.codeInput {
      margin-top: rem(40px);
      @include clearfix();
      & > input {
        width: 50%;
        float: left;
        &.halfWidth {
          width: 50%;
        }
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
  width: rem(44px);
  height: rem(35px);
  background: url("../../../common/image/img00/login/eyes_open.png") no-repeat;
  background-size: 100% 100%;
  margin-top: rem(5px);
  &.hide {
    background: url("../../../common/image/img00/login/eyes_close.png")
      no-repeat;
    background-size: contain;
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

.popup-tips {
  position: absolute;
}
</style>
