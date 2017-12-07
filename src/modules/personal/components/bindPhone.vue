<template>
  <section class="allinmed-personal-changePhone">
    <section class="allinmed-personal-tableModule">
      <article class="allinmed-changeMobileContent">
        <figcaption>绑定手机能够保证你的账号安全，随时找回发布的图片</figcaption>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <figure class="allinmed-tableModuleItemInput">
          <i class="icon-mobile" :class="{'icon-mobile-on':cancelIndex===0}"></i>
          <input type="text" placeholder="请输入手机号" id="password" v-model='phoneNum' @focus='inputBegin(0)' @blur='inputEnd'  v-validate="'required|mobile'"  name="phone">
          <i class="icon-searchCancel"  v-show='(cancelIndex===0)&&(phoneNum.length>0)'   @click='removeInput(0)'></i>
        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <button class="btn-primary-lg " :class='{"allinmed-personal-msgWriting":!activeOnOff}' id="save" on="false" @click='saveInfo'>确认</button>
      </article>
    </section>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
  </section>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules.scss";

  .allinmed-personal-changePhone {
    position: absolute;
    top: rem(20px);
    left: rem(20px);
    width: rem(710px);
    background: #fff;
    border-radius: rem(16px);

  .allinmed-personal-tableModule {

  .allinmed-personal-tableModuleItem {
    margin-top: rem(30px);
    margin-bottom: rem(30px);
    padding-top:0;
  .allinmed-tableModuleItemInput {
    left: 0;
    width: 100%;
    input{
      height: rem(70px);
      margin-left: rem(10px);
    }
  .icon-searchCancel:before {

    margin-top: rem(26px);
  }
  }

  }
  }

  }
</style>
<script  type="text/ecmascript-6">
  let xhrUrl = {
    sendPhoneCode:"/mcall/customer/send/code/v1/create"
  }
  import toast from "components/toast";
  import api from 'common/js/util/util';
  import {mapGetters} from "vuex";
  export default {
    data(){
      return {
        phoneNum:"",
        cancelIndex:-1,
        errorShow:false,
        errorMsg:""
      }
    },
    mounted(){
      this.$validator.updateDictionary({
        en: {
          custom: {
            //手机号的验证
            phone: {
              required: '请输入手机号码',
              mobile: '请输入正确的手机号码',
            }
          }
        }
      });
    },
    computed:{
      ...mapGetters(["customerPhoneNum",'customerId']),
      activeOnOff(){
        return (this.phoneNum.length===11);
      },
      allRight(){
        let t = this;
        return (t.activeOnOff)&&(t.phoneNum.length>0)&&(!t.errors.has('phone'))&&(!isNaN(parseInt(t.phoneNum,10)))
      }
    },
    methods:{
      inputBegin(index){
        this.cancelIndex = index;
      },
      inputEnd(){
        this.cancelIndex = -1;
      },
      removeInput(index){
        let arr = ['phoneNum'];
        this[(arr[index])] = '';
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
      saveInfo(){
        let t = this;
        // let allRight = true;
        if(!t.activeOnOff){
          if(t.phoneNum.length===0){
            t.toast("您还没有填写手机号");
            // allRight = false;
            return false;
          }

        }else{
          if(isNaN(parseInt(t.phoneNum,10))){
            // allRight = false;
            t.toast("不像是正确的手机号。");
          }else{
            if(this.errors.has('phone')){
              // allRight = false;
              t.toast("不像是正确的手机号。");
            }
          }
        }
        if(t.allRight){
          let param = {
            typeId: 2,//	string	是	1-修改/重置密码2-账号验证(绑定手机、手机号注册)3-手机快捷登录4-老患者报到5-短信通知
            accountType: 0,//	string	是	账号类型,0手机 1邮箱
            visitSiteId: 21,//	string	是	站点id 21-M站		21
            userType: 0,//	string	是	用户类型 0-医生用户 1-患者用户
            operateType: 2,//	string	是	1-绑定手机 2－修改手机号 3-手机号找回p密码 5-手机号注册 8-手机号快捷登录 9-老患者报到 16-患者注册
            account: t.phoneNum,//	string	是	账号
            codeLength: 4,//	string	是	验证码长度
          }
          let changePhoneNum = ()=>{
            api.ajax({
              url: xhrUrl.sendPhoneCode,
              method: "POST",
              data: param,
              beforeSend: function () {

              },
              timeout: 20000,
              done(data) {
                console.log(data);
                if(data&&data.responseObject&&data.responseObject.responseStatus){
                  t.$router.push({
                    path: "/verificationCode"
                  });
                }else{
                  if(data.responseObject.responseCode==='0B0006'){
                    t.toast("手机号已被使用过！");
                  }
                }
              },
              fail(err){

              }
            })
          }
          changePhoneNum();
        }
      }
    },
    components:{
      toast
    }
  }
</script>
