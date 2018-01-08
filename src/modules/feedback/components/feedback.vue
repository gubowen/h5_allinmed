<template>
  <section class="main-inner" v-if="!submitSuccess">
    <section class="main-inner-content">
      <header class="feedback-header">
        <h2 class="feedback-header-top">建议反馈</h2>
        <p class="feedback-header-bottom">如果您在使用过程中有任何问题或建议，请给我们留言，并留下您的联系方式。</p>
      </header>
      <section class="feedback-main">
        <section class="question">
          <span class="question-feedback">您遇到什么问题了?</span>
          <p class="question-type" @click.stop="suggestionType.service=!suggestionType.service" :class="{'on':suggestionType.service}"><span>服务问题</span></p>
          <p class="question-description" >医生回复慢回复质量差、推荐的医生不合理</p>
          <p class="question-type" @click.stop="suggestionType.setting=!suggestionType.setting" :class="{'on':suggestionType.setting}"><span>使用问题</span></p>
          <p class="question-description" >产品使用报错功能缺失、使用障碍、流程不顺畅</p>
          <p class="question-type" @click.stop="suggestionType.others=!suggestionType.others" :class="{'on':suggestionType.others}"><span>其他问题</span></p>
        </section>
        <section class="question">
          <span class="question-feedback">请简要描述你的问题?</span>
          <em class="question-em">(选填)</em>
          <section  @click="textAreaFocus">
          <textarea class="input-textArea" name="question" placeholder="请输入问题" v-model.trim="suggestionContent"
                    @input="contentLimit" autofocus="autofocus">
          </textarea>
          </section>
          <span class="qu-underline"></span>
          <p class="text-num-tips">
            {{(suggestionContent).length}}/500</p>
        </section>
        <section class="question">
          <span class="question-feedback">我们通过何种方式联系您?</span>
          <em class="question-em">(选填)</em>
          <textarea class="input-textArea" placeholder="请填写QQ号/电话/邮箱" v-model="suggestionNumbers"
                    @input="Limit">
            </textarea>
          <span class="qu-underline"></span>
        </section>
      </section>
      <button class="btn-primary go-next" @click="checkAllData">提交</button>
    </section>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
    <loading v-if="finish"></loading>
  </section>
  <section class="get-back" v-else-if="submitSuccess">
    <section class="icon"></section>
    <section class="title">提交成功</section>
    <section class="description">您的反馈我们已经收到<br>
      感谢对我们的支持理解</section>
    <section class="back" @click="goToHref">
      <span class="back-timing" >{{backTimeout}}s后</span><em>{{CheckFrom()?'自动返回':'返回首页'}}</em>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by YuxiYang on 2017/12/25.
   */
  import autosize from "autosize";
  import api from "common/js/util/util";
  import toast from "components/toast";
  import Loading from "components/loading";
  import siteSwitch from "common/js/siteSwitch/siteSwitch";
  // const checkLogin = new CheckLogin();
  const feedbackUrl='/mcall/customer/suggestion/v1/create/';
  export default {
    // browser:{
    //   versions:function(){
    //     var u = navigator.userAgent, app = navigator.appVersion;
    //     return {//移动终端浏览器版本信息
    //       trident: u.indexOf('Trident') > -1, //IE内核
    //       presto: u.indexOf('Presto') > -1, //opera内核
    //       webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //       gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    //       mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
    //       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //       android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    //       iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
    //       iPad: u.indexOf('iPad') > -1, //是否iPad
    //       webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    //     };
    //   }(),
    //   language:(navigator.browserLanguage || navigator.language).toLowerCase()
    // },
    data() {
      return {
        customerId:"",
        doctorId:"",
        suggestionType:{
          service:false,
          setting:false,
          others:false
        },
        suggestionNumbers:"",
        suggestionContent:"",
        errorShow:false,
        errorMsg:"",
        submitSuccess:false,
        backTimeout:3,
        finish:false
      }
    },
    components: {
      toast,Loading
    },
    watch:{
      //监听大量的文字输入情况，ex：复制粘贴。这样可以保持被撑大的text-area可以恢复到限定的高度
      "suggestionContent"(){
        setTimeout(()=>{
          document.body.scrollTop = document.body.scrollHeight;
          autosize.update(this.$el.querySelector(".input-textArea"))
        },500);
      }
    },
    mounted(){
      let _this = this;
      autosize(this.$el.querySelector(".input-textArea"));
      this.CheckFrom();
    },
    methods:{
      //根据入口切换内容
      CheckFrom(){
        if(api.getPara().from==="im"){
          return true;
        }else{
          return false;
        }
      },
      //检查后没有error后提交所有数据
      checkAllData(){
        const _this=this
        if (!this.suggestionType.service && !this.suggestionType.setting && !this.suggestionType.others) {
          this.validateToast("您还有问题未完善");
          document.body.scrollTop = this.$el.querySelector(
            ".question"
          ).offsetTop;
          return false;
        }else {
          //登陆检测
          if(api.getPara().customerId===!null && localStorage.getItem("userId")===!null){
            _this.customerId=api.getPara().customerId;
          }else{
            _this.customerId=api.getPara().customerId|| localStorage.getItem("userId");
          }
            _this.submitAllData();
          // siteSwitch.weChatJudge(ua =>{
          //   //微信
          //   _this.customerId = api.getPara().customerId;
          //   _this.submitAllData();
          // }, ua =>{
          //   //other
          //   _this.customerId = localStorage.getItem("userId");
          //   _this.submitAllData();
          // })
        }
      },
      submitAllData(){
        let _this =this,
          _arr=[];
        console.log(_this.customerId);
        for (let i in this.suggestionType){
          if (this.suggestionType[i]){
            switch (i){
              case "service":
                _arr.push(1);
                break;
              case "setting":
                _arr.push(2);
                break;
              case "others":
                _arr.push(3);
                break;
            }
          }
        }
        api.ajax({
          url:feedbackUrl,
          method: "POST",
          data: {
            suggestionType:_arr.join(","),
            suggestionContent:this.suggestionContent,
            suggestionNumbers:this.suggestionNumbers,
            customerId:_this.customerId||0,
            doctorId:api.getPara().doctorCustomerId,
            visitSiteId: api.getSiteId(),
            equipmentVersion:api.getConnectType(),
          },
          done(data) {
            this.finish=true;
            if (data.responseObject.responseStatus){
              _this.submitSuccess=true;
              _this.backToPast();
            }else{
              _this.submitSuccess=false;
              _this.validateToast("提交失败，请检查您的网络");
            }
          },
          fail(err) {
          }
        });
      },
      backToPast(){
        let _interval;
        _interval=setInterval(()=>{
          this.backTimeout=this.backTimeout-1;
          if (this.backTimeout===0){
            clearInterval(_interval);
            this.goToHref();
          }
        },1000);
      },
      goToHref(){
        if (api.getPara().from==="im"){
          window.location.href=document.referrer;
        }else{
          window.location.href="/";
        }
      },
      validateToast(content) {
        this.errorShow = true;
        this.errorMsg = content;
        setTimeout(() => {
          this.errorShow = false;
        }, 2000);
      },
      contentLimit() {
        if (api.getByteLen(this.suggestionContent) > 1000){
          this.suggestionContent = api.getStrByteLen(this.suggestionContent,1000);
          this.errorShow = true;
          this.validateToast("最多只能输入500字");
        }
      },
      Limit() {
        if (api.getByteLen(this.suggestionNumbers) >50){
          this.suggestionNumbers = api.getStrByteLen(this.suggestionNumbers,50);
        }
      },
      getByteLen(len) {
        return api.getByteLen(len);
      },
      textAreaFocus() {
        this.$el.querySelector(".input-textArea").focus();
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  span.question-feedback:before {
    width: rem(6px);
    height: rem(24px);
    background: #43CBC3;
    display: inline-block;
    background-size: contain;
    content: "";
    margin: 0px;
    margin-left: rem(-40px);
    margin-top: rem(31px);
    margin-right: rem(11px);
  }
  html, body {
    width: 100%;
    height: 100%;
  }
  .question-feedback {
    padding-left: rem(30px);
    padding-top: rem(27px);
    @include font-dpr(20px);
    color: #333333;
  }
  .main-inner {
    width: 100%;
    height: 100%;
    padding: 0 rem(30px);
    box-sizing: border-box;
    background: url(../../../common/image/background_wave.png) no-repeat bottom center #F2F2F2;;
  }
  .main-inner-content {
    overflow: scroll;
    position: relative;
    box-sizing: border-box;
  }
  .feedback-header {
    padding-top: rem(21px);
    padding-left: rem(20px);
    box-sizing: border-box;
  }
  .feedback-header-top {
    @include font-dpr(22px);
    color: #555555;
    font-weight: normal;
  }
  .feedback-header-bottom {
    margin-top: rem(10px);
    margin-bottom: rem(36px);
    @include font-dpr(15px);
    color: #909090;
  }
  .feedback-main {
    background-color: white;
    margin-bottom: rem(36px);
    border-radius: rem(16px);
    padding: rem(27px) rem(36px) rem(29px) rem(14px);
    .feedback.form {
      background-color: white;
    }
    .question {
      box-sizing: border-box;
      margin-left: 0;
      margin-bottom: rem(38px);
    }
    .check-box {
      margin-top: rem(26px);
      margin-left: rem(14px);
      width: rem(20px);
      height: rem(20px);
      border: 1px solid #CCCCCC;
      border-radius: 2px;
    }
  }
  .question-type {
    padding-top: rem(27px);
    padding-left: rem(14px);
    @include font-dpr(18px);
    color: #333333;
    &.on{
      &:before{
        background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
        background-size: contain;
      }
    }
    &:before {
      width: rem(40px);
      height: rem(40px);
      display: inline-block;
      background: url("../../../common/image/img00/consult_V1.2/multiplechoice_off@2x.png");
      background-size: contain;
      border-radius: rem(2px);
      content: "";
      margin-right: rem(8px);
      vertical-align: middle;
      /*margin-top: rem(26px);*/
    }
    span {
      vertical-align: middle;
    }
  }
  .question-description {
    padding-top: rem(14px);
    padding-left: rem(60px);

    @include font-dpr(15px);
    color: #666666;
  }
  .check-box {
    margin-top: rem(26px);
    margin-left: rem(14px);
    width: rem(20px);
    height: rem(20px);
    border: 1px solid #CCCCCC;
    border-radius: 2px;
  }
  .question-em {
    @include font-dpr(16px);
    color: #666666;
    font-style: normal;
  }
  .input-textArea {
    width: 100%;
    padding-top: rem(24px);
    padding-left: rem(45px);
    border: none;
    @include font-dpr(14px);
    color: #444444;
    box-sizing: border-box;
    max-height: rem(175px);
    @include placeholder() {
      @include font-dpr(18px);
      color: #aaaaaa;
    }
  }
  .go-next {
    width: rem(560px);
    height: rem(100px);
    line-height: rem(100px);
    display: block;
    border-radius: 9999px;
    background: #2FC5BD;
    box-shadow: 0 rem(8px) rem(24px) 0 rgba(47, 197, 189, 0.40);
    text-align: center;
    box-sizing: border-box;
    @include font-dpr(18px);
    color: #fff;
    outline: medium;
    padding: 0;
    margin: rem(0px) auto rem(40px);
  }
  .qu-underline {
    display: block;
    height: rem(2px);
    width: 100%;
    background-color: #d5d5d5;
    margin-right:rem(14px);
    margin-left: rem(15px);
  }
  .text-num-tips{
    float: right;
    front-size: rem(13px);
    color: #AFAFAF;
  }
  .get-back{
    top:50%;
    width: 100%;
    padding: 0 rem(30px);
    box-sizing: border-box;
    text-align: center;
    .icon{
      background: url("../../../common/image/img00/directOperation/select_yes.png") no-repeat bottom center;
      background-size: contain;
      text-align: center;
      margin-top: rem(208px);
      width: rem(112px);
      height: rem(112px);
      display: inline-block;
    }
    .title{
      margin-top:rem(14px);
      margin-bottom:rem(30px);
      text-align:center;
      @include font-dpr(24px);
      color: #555555;
      box-sizing: border-box;
    }
    .description{
      margin-top: rem(30px);
      margin-bottom:rem(84px);
      text-align:center;
      @include font-dpr(18px);
      color: #999999;
    }
    .back{
      text-align:center;
      margin-bottom: rem(234px);
      & > *{
        @include font-dpr(15px);
        color: #909090;
      }
      & > em{
        font-style: normal;
        color: #07B6AC;
      }
    }
  }
  /*vue组件自定义动画开始*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
