<template>
  <section class="allinmed-personal-changePhone">
    <section class="allinmed-personal-tableModule">
      <article class="allinmed-changeMobileContent">
        <figcaption>绑定手机号能够保证你的账号安全，随时找回发布的图片，当前手机号：</figcaption>
        <figcaption class="al-nowMailBox">{{customerPhoneNum}}</figcaption>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入登录密码" id="password" v-model='pswNum' @focus='inputBegin(0)' @blur='inputEnd'>
          <i class="icon-searchCancel"  v-show='(cancelIndex===0)&&(pswNum.length>0)'   @click='removeInput(0)'></i>
        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <figure class="allinmed-tableModuleItemInput">
          <input type="text" placeholder="请输入更换手机号" id="newPassword" v-model="phoneNum" @focus='inputBegin(1)'  @blur='inputEnd' v-validate="'required|mobile'"  name="phone">
          <i class="icon-searchCancel"  v-show='(cancelIndex===1)&&(phoneNum.length>0)'   @click='removeInput(1)'></i>
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
    }
  .icon-searchCancel:before {

    margin-top: rem(26px);
  }
  }

  }
  }

  }
</style>
<script>
  import toast from "components/toast";
  import {mapGetters} from "vuex";
  export default {
    data(){
      return {
        pswNum:"",
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
      ...mapGetters(["customerPhoneNum"]),
      activeOnOff(){
        return (this.pswNum.length>0)&&(this.phoneNum.length>0);
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
        let arr = ['pswNum','phoneNum'];
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
        let allRight = true;
        if(!t.activeOnOff){
          if(t.pswNum.length===0){
            t.toast("请输入登录密码");
            allRight = false;
            return false;
          }
          if(t.phoneNum.length===0){
            t.toast("请输入新手机号");
            allRight = false;
            return false;
          }
        }else{
          if(isNaN(parseInt(t.phoneNum,10))){
            allRight = false;
            t.toast("请输入正确的手机号");
          }else{
            if(parseInt(t.phoneNum,10)===t.customerPhoneNum){
              allRight = false;
              t.toast("手机号未发生改变");
            }else{
              if(this.errors.has('phone')){
                allRight = false;
                t.toast("请输入正确的手机号");
              }
            }
          }
        }
        if(allRight){
          console.log("以上逻辑都正确可以进行交互");
        }
      }
    },
    components:{
      toast
    }
  }
</script>
