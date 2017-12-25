<template>
  <section class="main-inner">
    <section class="main-inner-content">
      <header class="feedback-header">
        <h2 class="feedback-header-top">建议反馈</h2>
        <p class="feedback-header-bottom">如果您在使用过程中有任何问题或建议，请给我们留言，并留下您的联系方式。</p>
      </header>
      <section class="feedback-main">
          <section class="question">
            <span class="question-feedback">您遇到什么问题了?</span>
            <p class="question-type"><span>服务问题</span></p>
            <p class="question-description">医生回复慢回复质量差、推荐的医生不合理</p>
            <p class="question-type"><span>使用问题</span></p>
            <p class="question-description">产品使用报错功能缺失、使用障碍、流程不顺畅</p>
            <p class="question-type"><span>其他问题</span></p>
          </section>
          <section class="question">
            <span class="question-feedback">请简要描述你的问题?</span>
            <em class="question-em">(选填)</em>
            <figure class="input-area">
              <textarea class="input-textArea" placeholder="请输入问题描述">
              </textarea>
            </figure>
          </section>
          <section class="question">
            <span class="question-feedback">我们通过何种方式联系您?</span>
            <em class="question-em">(选填)</em>
            <figure class="input-area">
            <textarea class="input-textArea" placeholder="请填写QQ号/电话/邮箱">
            </textarea>
            </figure>
          </section>
        </section>
      </section>
      <button data-alcode='e123' class="btn-primary go-next" >提交</button>
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
  import fb from "common/js/third-party/flexible";
  export default{
    data() {
      return {}
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";
  span.question-feedback:before{
    width:rem(6px);
    height:rem(24px);
    background:#43CBC3;
    display: inline-block;
    background-size: contain;
    content:"";
    margin:0px;
    margin-top: rem(31px);
    margin-right: rem(11px);
  }
  p.question-type:before{
    width: rem(40px);
    height: rem(40px);
    display: inline-block;
    background: url("../../common/image/img00/consult_V1.2/multiplechoice_off@2x.png");
    background-size: contain;
    border: 1px solid #CCCCCC;
    border-radius: 2px;
    content:"";
    margin-right: rem(8px);
    margin-top: rem(26px);
  }
  html,body{
    width: 100%;
  }
  .question-feedback{
    padding-left: rem(14px);
    padding-top:rem(27px);
    font-family: PingFang-SC-Bold;
    @include font-dpr(20px);
    color: #333333;
  }
  .main-inner {
    /*width: 100%;*/
    height: 100%;
    padding: rem(0px) rem(30px);
    background-image: url(../../common/image/background_wave.png);
  }
  .main-inner-content {
    overflow: hidden;
    position: relative;
  }
  .feedback-header{
    padding-top: rem(21px);
    padding-left: rem(20px);
    box-sizing: border-box;
  }
  .feedback-header-top{
    @include font-dpr(22px);
    color: #555555;
    font-weight: normal;
  }
  .feedback-header-bottom{
    margin-top: rem(10px);
    margin-bottom: rem(36px);
    @include font-dpr(15px);
    color: #909090;
  }
  .feedback-main{
    background-color: white;
    margin-bottom: rem(36px);
    border-radius: rem(16px);
    padding: rem(27px) rem(36px) rem(29px) rem(14px);
    .feedback.form{
      background-color: white;
    }
    .question{
      margin-bottom: rem(38px);
    }
    .check-box{
      margin-top: rem(26px);
      margin-left: rem(14px);
      width:rem(20px);
      height: rem(20px);
      border: 1px solid #CCCCCC;
      border-radius: 2px;
    }
     }
  .question-type{
    padding-top: rem(27px);
    padding-left: rem(42px);
    font-family: PingFang-SC-Bold;
    @include font-dpr(18px);
    color: #333333;
  }
  .question-description{
    padding-top: rem(14px);
    padding-left: rem(42px);
    font-family: PingFangSC-Regular;
    @include font-dpr(15px);
    color: #666666;
  }
  .check-box{
    margin-top: rem(26px);
    margin-left: rem(14px);
    width:rem(20px);
    height: rem(20px);
    border: 1px solid #CCCCCC;
    border-radius: 2px;
  }
  .question-em{
    font-family: PingFangSC-Regular;
    @include font-dpr(16px);
    color: #666666;
  }
  .consult-total {
     .selected > .input-area {
       margin: 0 rem(-60px);
       margin-top: rem(20px);
       margin-bottom: rem(-40px);
       padding: 0.333rem 0.8rem;
       .text-num-tips {
         right: rem(60px);
       }
     }
     .input-area {
       background-color: #fff;
       position: relative;
       padding: rem(25px) 0;
       .text-num-tips {
         position: absolute;
         right: rem(0px);
         bottom: 0;
         color: #0ab375;
         @include font-dpr(12px);
       }
       & > textarea {
         outline: medium;
         resize: none;
         width: 100%;
         height: 0.6rem;
         max-height: 1.7rem;
         border: none;
         background: none;
         @include font-dpr(18px);
         color: #333333;
         @include placeholder() {
           @include font-dpr(16px);
           color: #909090;
         }
       }
     }
   }
  .input-textArea{
    padding-top:rem(24px);
    padding-left:rem(45px);
    border:0;
  }
  .go-next {
    width: rem(560px);
    height: rem(100px);
    line-height: rem(100px);
    display: block;
    border-radius: 9999px;
    background: #2FC5BD;
    box-shadow: 0 rem(8px) rem(24px) 0 rgba(47,197,189,0.40);
    text-align: center;
    box-sizing: border-box;
    @include font-dpr(18px);
    color: #fff;
    outline: medium;
    padding: 0;
    margin: rem(0px) auto rem(40px);
  }
</style>
