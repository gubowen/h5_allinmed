<template>
  <section class="loginBackBottom">
    <section class="tc-loginCommon" v-show="!loginRule">
      <section class="tc-loginTitle">
        <p class="login-title">唯医互联网骨科医院</p>
        <p class="login-guideText">为了给您一个更好的就医体验，请您注册后使用</p>
      </section>
      <div data-alcode-mod='706'>
        <section class="tc-loginCenter">
          <section class="tc-loginInputBox">
            <div class="tc-loginItem tc-loginPhone">
              <span class="tc-loginPhoneIcon" :class="{'active':phoneMessage.length>0}"></span>
              <input type="number" :class="{'inputActive':phoneMessage.length>0}" onpaste="return false;" placeholder="输入11位手机号码" v-validate="'required|mobile'" name="phone" v-model="phoneMessage"
                     @blur="validateBlur('phone')" @input="onKeyPress()">
              <span class="tc-inputClearPhone" @click="clearPhone" v-show="phoneMessage.length>0"></span>
            </div>
            <div class="tc-loginItem tc-loginCode">
              <span class="tc-loginCodeIcon" :class="{'active':codeMessage.length>0}"></span>
              <input type="number" :class="{'inputActive':codeMessage.length>0}" onpaste="return false;" placeholder="输入短信验证码" v-model="codeMessage" @blur="validateBlur('codeInput')"
                     v-validate="'required|digits:4'" @input="codeKeyPress()" name="codeInput">
              <span data-alcode='e120' class="tc-getCode" @click="getCodeApi" :class="{'active':getCode}">{{codeTime}}</span>
              <span class="tc-inputClearCode" @click="clearCode($event)" v-show="codeMessage.length>0"></span>
            </div>
          </section>
          <section class="tc-submitRule">
            <p>
              <span class="tc-ruleSelect" @click="RuleIcon=!RuleIcon" :class="{'active':RuleIcon}"></span>
              <span class="tc-ruleText" @click="RuleIcon=!RuleIcon">已同意</span>
              <span class="tc-ruleDetail" @click="ruleClick">《唯医互联网骨科医院用户服务协议》</span>
            </p>
          </section>
          <section data-alcode='e121' class="tc-submitBtn" @click="loginSubmit">登入</section>
        </section>
      </div>
    </section>

    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'确定',
          'cancel':'取消',
          'content':confirmContentText
//          'title':'当前WIFI未连接'
          }" v-if="levelShow" :showFlag.sync="levelShow" @cancelClickEvent="loginCancelEvent"
        @ensureClickEvent="loginEnsureEvent"></confirm>
    </transition>
    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'离开',
          'cancel':'再想想',
//          'content':'确定离开吗？',
          'title':'确定离开吗？'
          }" v-if="backShow" :showFlag.sync="backShow" @cancelClickEvent="loginBackCancelEvent"
        @ensureClickEvent="loginEnsureEventWait"></confirm>
    </transition>
    <transition name="fade">
      <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
    <loading v-show="finish"></loading>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by juKun on 2017/8/9.
   */

  import api from 'common/js/util/util';
  import loading from 'components/loading';
  import fb from "common/js/third-party/flexible";
  import toast from 'components/toast';
  import confirm from 'components/confirm';
  const XHRList = {
    phoneCheck: "/mcall/patient/customer/unite/v1/getById/",  // check mobile number
    getCode: "/mcall/customer/send/code/v1/create/",         // get code
    codeCheck: "/mcall/patient/customer/unite/v1/update/",       // check code
//      wxBindCheck: "/mcall/patient/customer/unite/info/v1/getIsWeixinBind/",       // check mobile is bind weiXin
//      wxBind: "/mcall/patient/customer/unite/info/v1/createWxUnionIdBind/",        // mobile bind for weiXin
  };
  export default {
    data() {
      return {
        toastImg: {
          wifi: require('../../../common/image/img00/login/wifi@2x.png.png'),
          success: require('../../../common/image/img00/login/Send a success@2x.png')
        },
        imgUrl:'',
        RuleIcon: true,
        ruleShow:false,
        clearPhoneIcon: false,  //删除电话Btn
        clearCodeIcon: false,   //删除Code Btn
        phoneMessage: '',
        codeMessage: '',
        getCode: true,           //获取验证码Btn
        codeTime: "获取验证码",
        confirmContentText:'',
        errorMsg: '',
        errorShow: false,
        finish: false,
        levelShow: false,
        loginRule: false,
        backShow: false,
        inputActive:false,
        params: {
          getCodeParams: {
            typeId: 5,	    //string	是	(1-找回密码、2-账号验证(1.绑定手机、手机号注册)、3-快速登录)',4-老患者报到5-患者注册	5
            account: '',	  //string	//是	账号
            codeLength: 4,	//string	//是	代码长度	4
            accountType: 0,	//string	//是	0-手机 1-邮箱
          },
          codeCheck: {
            validCode: '',	  //string	是	验证码CODE
            codeId: '',           //	string	是	验证码主键
//              isValid: 1,       //	string	是	修改验证码信息
            account: '',      //	string	是	手机号
            customerId:"",
            mobile:"",
            isCheckMobile:1,
            checkMobileTime:1
          },
          wxBindCheckParams:{
            isValid: 1,       //	string	是		1
            firstResult: 0,   //	string	是	分页参数
            maxResult: 99999, //	string	是	分页参数
//              customerId: "", //	string	否	用户id
            account: "",      //	string	否	手机号
          },
          wxBindParams:{
            customerId: "",   //  string  否  用户id
            account: "",      // string  否  手机号
            openid: "",       // string  是  微信openId
            isUpdate: "",     // string  否  是否换绑1 - 换
          },
          phoneCheckParams: {
            isValid: 1,//	string	是		1
            firstResult: 0,//	string	是	分页参数
            maxResult: 99999,//string	是	分页参数
            customerId: "",//string	是	用户id
          }
        }

      }
    },
    mounted() {
      document.title="唯医骨科";
      this.$validator.updateDictionary({
        en: {
          custom: {
            //手机号的验证
            phone: {
              required: '请输入手机号码',
              mobile: '请输入正确的手机号码',
            },
            //患者关系的验证规则
            codeInput: {
              required: '请输入短信验证码',
              digits: '验证码错误'
            },
          }
        }
      });
//        this.mobileCheck();
      api.forbidShare();
    },
//      beforeRouteLeave (to, from, next) {
//        // 导航离开该组件的对应路由时调用
//        // 可以访问组件实例 `this`
//        if (to.name === "login") {
//          this.backShow = true;
//        }
//        next(this.pageBackEnsure);
//      },
    methods: {
      clearPhone() {
        this.clearPhoneIcon = false;
        this.PhoneIcon = false;
        this.phoneMessage = '';
      },
      clearCode(ev) {
        this.clearCodeIcon = false;
        this.CodeIcon = false;
        this.codeMessage = '';
      },
      onKeyPress(){
        let content = this.phoneMessage;
        if (api.getByteLen(content) > 11) {
          this.phoneMessage = api.getStrByteLen(content, 11);
        }
      },
      codeKeyPress(){
        let content = this.codeMessage;
        if (api.getByteLen(content) > 4) {
          this.codeMessage = api.getStrByteLen(content, 4);
        }
      },
      validateBlur(name) {
        this.$validator.validateAll();
        if (this.errors.has(name)) {
          this.toastComm(this.errors.first(name));
        }
      },
      //获取验证码
      getCodeApi() {
        this.$validator.validateAll();
        if (this.getCode){
          if (this.errors.has('phone')) {
            this.toastComm(this.errors.first('phone'));
            return;
          }else if(!this.phoneMessage.length>0){
            this.toastComm("请输入手机号码");
            return;
          }
        }else{
          return;
        }
        let _this = this;
        _this.params.getCodeParams.account = _this.phoneMessage;
        api.ajax({
          url: XHRList.getCode,
          method: "POST",
          data: _this.params.getCodeParams,
          beforeSend: function () {
            _this.finish = true;
          },
          timeout: 20000,
          done(data) {
            _this.finish = false;
            if (data.responseObject.responsePk !== 0&&data.responseObject.responseStatus) {
              _this.toastComm("验证码已发送");
              _this.imgUrl = _this.toastImg.success;
              _this.countDown(60);
              _this.params.codeCheck.codeId=data.responseObject.responsePk
            }else{
              _this.errorMsg = data.responseObject.responseMessage;
              _this.errorShow = true;
              setTimeout(() => {
                _this.errorShow = false;
              }, 2000)
            }
          },
          fail(err){
            _this.finish = false;
            _this.toastComm("网络信号差，建议您稍后再试");
            _this.imgUrl = _this.toastImg.wifi;
          }
        })
      },
      //验证码倒计时
      countDown(time) {
        let _this = this;
        let _codeTime = time;
        _this.codeTime = _codeTime-- + "s";
        _this.getCode = false;
        let inn = window.setInterval(()=>{
          if (_codeTime > 0) {
            _this.codeTime = _codeTime-- + "s";
          } else {
            _this.getCode = true;
            _this.codeTime = "重新获取";
            clearInterval(inn);
          }
        }, 1000);
      },
      //click submit btn
      loginSubmit(e){
        let _this = this;
        if (!this.RuleIcon) {
          //未同意条款
          _this.toastComm("请阅读并同意《唯医骨科服务协议》");
          return
        } else {
          //已同意条款
          this.$validator.validateAll();
          if (this.errors.has('phone')) {
            _this.toastComm(this.errors.first('phone'));
            return;
          } else if (this.errors.has('codeInput')) {
            _this.toastComm(this.errors.first('codeInput'));
            return;
          } else {
            _this.params.codeCheck.validCode = _this.codeMessage;
            _this.params.codeCheck.account = _this.phoneMessage;
            _this.params.codeCheck.mobile=_this.phoneMessage;
            _this.params.codeCheck.customerId=api.getPara().customerId;
            _this.codeCheckApi(e);
          }
        }
      },
      //验证码验证
      codeCheckApi(e) {
        let _this = this;
        api.ajax({
          url: XHRList.codeCheck,
          method: "POST",
          data: _this.params.codeCheck,
          beforeSend: function () {
            _this.finish = true;
          },
          timeout: 20000,
          done(data) {
            _this.finish = false;
            if (data.responseObject.responseStatus) {
              if (data.responseObject.responseCode == "success") {
                _this.params.codeCheck.codeId = data.responseObject.responsePk;
                _this.toastComm("绑定成功");
                setTimeout(()=>{
                  // window.location.href = sessionStorage.getItem("loginBack");
                  g_sps.jump(e.target,sessionStorage.getItem("loginBack")); 
                },2000);
              } else {
                _this.toastComm(data.responseObject.responseMessage);
              }
            } else if(data.responseObject.responseCode =="exception"){
              _this.toastComm("验证码错误");
            }else {
              _this.toastComm(data.responseObject.responseMessage);
            }
          },
          fail(err){
            _this.finish = false;
            _this.toastComm("网络信号差，建议您稍后再试");
            _this.imgUrl = _this.toastImg.wifi;
          }
        })
      },
      //微信绑定验证
      wxBindCheckApi(){
        let _this = this;
        _this.params.wxBindCheckParams.account = _this.phoneMessage; //手机号
//          console.log("========微信绑定验证参数========");
//          console.log(_this.params.wxBindCheckParams);
        api.ajax({
          url: XHRList.wxBindCheck,
          method: "POST",
          data: _this.params.wxBindCheckParams,
          beforeSend: function () {
            _this.finish = true;
          },
          timeout: 20000,
          done(data) {
            _this.finish = false;
//              console.log(data);
            if (data.responseObject.responseStatus&&data.responseObject.responseCode == "0G0004") {
              //未绑定
              _this.params.codeCheck.codeId=data.responseObject.responsePk;
              _this.wxBindApi();
            }else{
              //已绑定
              _this.confirmContentText='该手机号码已被“'+data.responseObject.responseData.dataList.nickName+'”占用，是否更换绑定为当前微信?';
              _this.levelShow= true;
            }
          },
          fail(err){
            _this.finish = false;
            _this.toastComm("网络信号差，建议您稍后再试");
            _this.imgUrl = _this.toastImg.wifi;
          }
        })
      },
      loginCancelEvent(){
        this.levelShow= false;
      },
      loginEnsureEvent(){
        this.levelShow= false;
        this.params.wxBindParams.isUpdate = "1";
        this.wxBindApi();
      },
      //微信绑定手机号
      wxBindApi(){
        let _this = this;
        _this.params.wxBindParams.account = _this.phoneMessage;             //手机号
        _this.params.wxBindParams.openid = localStorage.getItem('openId');  //openid
        _this.params.wxBindParams.customerId = "";                          //customerId
        if (api.getPara().customerId && api.getPara().customerId.length > 0) {
          _this.params.wxBindParams.customerId = api.getPara().customerId;    //customerId
        }
//          console.log("========微信绑定参数========");
//          console.log(_this.params.wxBindParams);
        api.ajax({
          url: XHRList.wxBind,
          method: "POST",
          data: _this.params.wxBindParams,
          beforeSend: function () {
            _this.finish = true;
          },
          timeout: 20000,
          done(data) {
            _this.finish = false;
//              console.log(data);
            if (data.responseObject.responseStatus &&data.responseObject.responseCode=="success") {
              //绑定成功
              _this.toastComm("绑定成功");
              _this.imgUrl = _this.toastImg.success;
              let _url = sessionStorage.getItem("loginBack");
              let _key = '';
              if (_url.indexOf('patientCustomerId') >= 0) {
                _key = 'patientCustomerId';
              } else if (_url.indexOf('customerId') >= 0) {
                _key = 'customerId';
              } else {
                _key = 'customerId';
              }
              let _loginBackUrl = _this.urlReplace(sessionStorage.getItem("loginBack"),_key,data.responseObject.responseData.customerId);
//                console.log(_loginBackUrl);
              setTimeout(()=>{
                // window.location.href = _loginBackUrl;
                g_sps.jump(null,_loginBackUrl); 
              },2000);
            }else{
              //绑定失败
//                console.log(data);
              _this.toastComm("绑定失败");
              switch (data.responseObject.responseCode) {
                case "exception":
                  console.log("异常");
                  break;
                case "0G0001":
                  console.log("微信账号已绑定其他账号");
                  break;
                case "0G0005":
                  console.log("微信接口访问失败");
                  break;
                case "0G0003":
                  console.log("账号已绑定其他微信");
                  break;
              }
            }
          },
          fail(err){
            _this.finish = false;
            _this.toastComm("网络信号差，建议您稍后再试");
            _this.imgUrl = _this.toastImg.wifi;
          }
        })
      },
      //同意条款
      ruleClick(){
        this.ruleShow=true;
        this.$router.push({
          name: "loginRule"
        });
      },
      //toast提示
      toastComm(text){
        let _this = this;
        _this.errorMsg = text;
        _this.errorShow = true;
        setTimeout(() => {
          _this.errorShow = false;
          _this.imgUrl = '';
        }, 2000)
      },
      loginEnsureEventWait(){
        this.pageBackEnsure = true;
        this.backShow = false;
      },
      loginBackCancelEvent(){
        this.pageBackEnsure = false;
        this.backShow = false;
      },
      //url参数替换
      urlReplace(url, arg, val) {
        let pattern = arg+'=([^&]*)';
        let replaceText = arg+'='+val;
        return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
      }
    },
    components: {
      loading,
      toast,
      confirm
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  @import "../../../../scss/modules/_searchCommTop";

  body {
    div{
      height: 100%;
      .loginBackBottom{
        background:url("../../../common/image/background_wave.png") no-repeat bottom center;
        background-size:100% rem(272px);
      }
    }
    .tc-loginCommon {
      height: 100%;

      .tc-loginTitle {
        padding: rem(94px) 0 rem(74px) rem(48px);
        .login-title {
          @include font-dpr(26px);
          color: #222222;
          letter-spacing: 0;
          font-weight:bold;
        }
        .login-guideText {
          @include font-dpr(15px);
          color: #808080;
          margin-top: rem(16px);
          letter-spacing: 0;
        }
      }
      .tc-loginCenter {

        padding: 0 rem(30px) rem(28px);
        .tc-loginInputBox {
          background: #FFFFFF;
          box-shadow: 0 0 rem(20px) 0 rgba(0, 0, 0, 0.07);
          border-radius: 8px;
          padding: rem(80px) rem(46px);
          .tc-loginItem {
            @include font-dpr(0);

            input {
              background: #FBFBFB;
              border-radius: 6px;
              height: rem(34px);
              padding: rem(28px) rem(64px) rem(28px) rem(80px);
              margin-bottom: rem(32px);
              border-style: none;
              @include font-dpr(17px);
              color: #333333;
            }
            &.tc-loginPhone {
              position: relative;
              .tc-loginPhoneIcon {
                position: absolute;
                left: rem(20px);
                width: rem(50px);
                height: rem(50px);
                top: 37%;
                margin-top: rem(-25px);
                background: url("../../../common/image/img00/login/phone_ default@2x.png") no-repeat center;
                background-size: rem(44px) rem(44px);
                &.active {
                  background: url("../../../common/image/img00/login/phone_activation@2x.png") no-repeat center;
                  background-size: rem(44px) rem(44px);
                }
              }
              input {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                width: 100%;
                height: rem(90px);
                /*line-height: rem(90px);*/
                &.inputActive{
                  padding: rem(28px) rem(64px) rem(28px) rem(80px);
                }
              }
              .tc-inputClearPhone {
                position: absolute;
                right: rem(24px);
                width: rem(50px);
                height: rem(50px);
                top: 37%;
                margin-top: rem(-25px);
                background: url("../../../common/image/img00/login/delete@2x.png") no-repeat center;
                background-size: rem(32px) rem(32px);
              }
            }
            &.tc-loginCode {
              position: relative;
              .tc-loginCodeIcon {
                position: absolute;
                left: rem(20px);
                width: rem(50px);
                height: rem(50px);
                top: 50%;
                margin-top: rem(-25px);
                background: url("../../../common/image/img00/login/Verification code_ default@2x.png") no-repeat center;
                background-size: rem(44px) rem(44px);
                &.active {
                  background: url("../../../common/image/img00/login/Verification code_activation@2x.png") no-repeat center;
                  background-size: rem(44px) rem(44px);
                }
              }
              input {
                margin-bottom: 0;
                width: rem(277px);
                padding: rem(28px) rem(25px) rem(28px) rem(80px);
                &.inputActive{
                  padding: rem(28px) rem(25px) rem(28px) rem(80px);
                }
              }
              .tc-getCode {
                @include font-dpr(14px);
                display: inline-block;
                opacity: 0.7;
                border: 1px solid #AAAAAA;
                border-radius: rem(8px);
                margin-left: rem(28px);
                width: rem(180px);
                text-align: center;
                height: rem(76px);
                line-height: rem(76px);
                color: #AAAAAA;
                &.active {
                  border: 1px solid #2FC5BD;
                  color: #07b6ac;
                }
              }
              .tc-inputClearCode {
                position: absolute;
                right: rem(240px);
                width: rem(50px);
                height: rem(50px);
                top: 50%;
                margin-top: rem(-25px);
                background: url("../../../common/image/img00/login/delete@2x.png") no-repeat center;
                background-size: rem(32px) rem(32px);
              }
            }
          }
        }
        .tc-submitRule {
          margin-bottom: rem(76px);
          p {
            padding-left: rem(36px);
            margin-top: rem(20px);
            position: relative;
            .tc-ruleSelect {
              display: inline-block;
              position: absolute;
              content: '';
              left: 0;
              top: 50%;
              margin-top: rem(-17.5px);
              width: rem(35px);
              height: rem(35px);
              background: url("../../../common/image/img00/login/Not to choose@2x.png") no-repeat center;
              -webkit-background-size: rem(30px) rem(30px);
              background-size: rem(30px) rem(30px);
              &.active {
                background: url("../../../common/image/img00/login/The selected@2x.png") no-repeat center;
                -webkit-background-size: rem(30px) rem(30px);
                background-size: rem(30px) rem(30px);
              }
            }
            .tc-ruleText {
              @include font-dpr(13px);
              color: #909090;
              letter-spacing: 0;
              margin-left: rem(8px);
            }
            .tc-ruleDetail {
              @include font-dpr(13px);
              color: #07B6AC;
              letter-spacing: 0;
            }
          }
        }
        .tc-submitBtn {
          background: #2FC5BD;
          box-shadow: 0 4px 12px 0 rgba(47, 197, 189, 0.40);
          border-radius: rem(72px);
          @include font-dpr(18px);
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          height: rem(100px);
          width: rem(560px);
          margin: 0 auto;
          line-height: rem(100px);
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
