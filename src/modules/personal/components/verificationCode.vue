<template>
  <section class="al-changeMobileBox">
    <article class="al-changeMobileContent">
      验证码已发送，请输入收到的验证码
    </article>
    <form id="updateMobile" novalidate="novalidate">
      <figure class="al-validateInput">
        <input type="text" name="validCode" id="validCode" v-model="codeId" @blur="checkNum">
      </figure>
    </form>
    <article class="al-changeMobileContent sended ev-sended" style="display: block;"  v-if="timeOnOff">
      已发送<span class="second">{{timeNum}}s</span>后重新发送
    </article>
    <article class="al-changeMobileContent sended ev-reSend" style="color: rgb(53, 152, 219);"  v-if="!timeOnOff" @click="sendCode">
      重新发送
    </article>
    <article class="al-changeMobileContent sended">
      今天剩余<span class="num">{{setTime}}</span>次
    </article>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
  </section>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules.scss";
  .al-changeMobileBox {
    background-color: #fff;
    margin-top: rem(20px);
    padding: rem(60px) rem(30px);
    padding-bottom: rem(100px);
    border-radius: rem(16px);
    height: 100%;
  .al-changeMobileContent {
  @include font-dpr(15px);
    color: #808080;
    line-height: 1.5;
  }
  .al-validateInput {
    margin-top: rem(200px);
    margin-bottom: rem(90px);
    padding-bottom: rem(20px);
    position: relative;
    overflow: hidden;
  input {
    width: 100%;
    height: rem(60px);
    border: none;
    background: none;
    outline: none;
    font-family: "microsoft yahei";
    letter-spacing: rem(160px);
    padding-left: rem(35px);
    box-sizing: border-box;
    font-size: rem(32px);
  }
  &:after {
     content: "";
     width: 100%;
     height: rem(4px);
     display: block;
     background: transparent url('../../../../src/common/image/img00/personal/validate_bottom.png') center center no-repeat;
     background-size: cover;
     position: absolute;
     bottom: 0;
     left: 0;
   }
  }
  .al-changeMobileContent.sended {
    text-align: center;
  span {
    padding: 0 rem(10px);
  }
  }
  }
</style>
<script>
  import toast from "components/toast";
  export default {
    data(){
      return {
        codeId:"",
        setTime:3,
        setTimeNum:10,
        timeNum:0,
        timeOnOff:false,
        errorShow:false

      }
    },
    watch:{
      codeId(newStr,oldStr){
        if(newStr.length>4){
          this.codeId = oldStr;
          document.getElementById("validCode").blur();
          $('#updateMobile').trigger("click");
        }
        if(newStr.length==4){
          this.codeId = newStr;
          document.getElementById("validCode").blur();
        }
      }
    },
    methods:{
      sendCode(){
        let t= this;
        this.timeBegin();
      },
      checkNum(){
        let t = this;
        if(t.codeId.length===0){
          t.toast("请输入验证码");
        }
      },
      toast(msg){
        let t = this;
        this.errorMsg = msg;
        t.errorShow = true;
        setTimeout(function(){
          t.errorShow = false;
        },2000);
        return false;
      },
      timeBegin(){
        let t = this;
        let timer = ()=>{
          t.timeNum =t.setTimeNum;
          this.setTime--;
          t.timeOnOff = true;
          clearInterval(nowTimer);
          let nowTimer = setInterval(function(){
            t.timeNum--;
            if(t.timeNum===0){
              t.timeOnOff = false;
              clearInterval(nowTimer);
            }
          },1000);
        }
        if(this.setTime>0){
          timer();
        }
      }
    },
    mounted(){
      this.timeBegin();
    },
    components:{
      toast
    }
  }
</script>
