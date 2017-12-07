<template>
  <section class="forgetPassword">
    <h2>验证码</h2>
    <p>已向手机号<span>18701138805</span>发送短信验证码</p>
    <section class="codeInput">
      <input type="number" placeholder="请输入验证码">
      <span class="getCode">重新发送</span>
    </section>
    <button class="submitButton">提交</button>
  </section>
</template>
<script type="text/ecmascript-6">
import api from "common/js/util/util";
const XHRList = {};
export default {
  data() {
    return {

    };
  },
  mounted() {},
  components: {}
};
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .forgetPassword{
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
</style>
