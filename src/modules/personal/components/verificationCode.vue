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
      今天剩余<span class="num" v-html="(codeNum<=0)?(0):(codeNum)"></span>次
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
    width: rem(638px);
    min-height: rem(100px);
    margin: rem(20px) auto;
    background: #fff;
    padding: rem(60px) rem(30px);
    padding-bottom: rem(100px);
    border-radius: rem(16px);
    height: auto;
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
  import api from 'common/js/util/util';
  import toast from "components/toast";
  import {mapGetters,mapActions} from "vuex";
  let xhrUrl = {
    sendCode:'/mcall/patient/customer/unite/v1/updateMobile/'
  }
  export default {
    data(){
      return {
        codeId:"",
        // setTime:3,
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
          this.postCodeNum();
        }
        if(newStr.length==4){
          this.codeId = newStr;
          this.postCodeNum();
        }
      },
      codeNum(newStr){
        if(newStr>=0){
          this.timeBegin();
        }else{
          this.toast("一天只能发十次");
        }
      }
    },
    computed:{
      ...mapGetters(["codeNum",'customerId','codeNumId','codeState'])
    },
    methods:{
      ...mapActions(['getValidCode','changeCodeState']),
      postCodeNum(){
        let t = this;
        let param = {
          customerId:t.customerId,//	string	是	用户id
          mobile:t.phoneNum,//	string	是	手机号
          typeId:2,//	string	是	1-手机号找回密码 2-账号验证(绑定手机、手机号注册) 3-手机验证码快捷登录
          optType:1,//	string	是	操作类型		默认：1
          codeId:t.codeNumId,//	string	是	验证码主键
          validCode:t.codeId,//	string	是	验证码CODE
        }
        document.getElementById("validCode").blur();
        let codeNum = ()=>{
          api.ajax({
            url: xhrUrl.sendCode,
            method: "POST",
            data: param,
            beforeSend: function () {

            },
            timeout: 20000,
            done(data) {
              if(data&&data.responseObject&&data.responseObject.responseStatus){
                t.$store.state.customerPhoneNum = t.$store.state.phoneNum;
                t.$router.push({
                  path: "/bindAccount"
                });
              }else{
                t.toast(data.responseObject.responseMessage);
              }
            },
            fail(err){

            }
          })
        }
        codeNum();
      },
      sendCode(){
        let t= this;
        if(t.codeNum<=0){
          this.toast("一天只能发十次");
          return false;
        }else{
          t.getValidCode();
        }
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
      timeBegin(onOff){
        let t = this;
        let timer = ()=>{
          t.timeNum =t.setTimeNum;
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
        if(this.codeNum>=0){
          timer();
        }else{
            t.toast("一天只能发十次");
        }
      }
    },
    mounted(){
      let t = this;
      if(t.codeNum===10){
        t.$router.push({
          path: "/personalIndex"
        });
      }else{
        if(t.codeState){
          t.changeCodeState(false);
          t.timeBegin();
        }else{
          t.sendCode();
        }
      }
    },
    components:{
      toast
    }
  }
</script>
