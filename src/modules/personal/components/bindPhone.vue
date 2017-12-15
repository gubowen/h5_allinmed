<template>
  <section class="allinmed-personal-changePhone">
    <section class="allinmed-personal-tableModule">
      <article class="allinmed-changeMobileContent">
        <figcaption>请输入新手机号</figcaption>
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
  .allinmed-mainInner{
    .allinmed-personal-changePhone{
      min-height: auto;
      height: auto;
    }
  }
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
  import toast from "components/toast";
  import api from 'common/js/util/util';
  import {mapGetters,mapActions} from "vuex";
  export default {
    data(){
      return {
        phoneNum:"",
        cancelIndex:-1,
        errorShow:false,
        errorMsg:""
      }
    },
    watch:{
      phoneNum(newNum,oldNewStr){
        let t = this;
        if(newNum.length>11){
          t.phoneNum = oldNewStr;
        }
          this.changePhoneNum(t.phoneNum);
      },
      phoneError(newStr){
        let t = this;
        if(newStr==='0B0006'){
          t.toast("手机号已被使用过！");
        }

      },
      codeNum(newStr){
        let t = this;
        if(newStr<0){
          t.toast("一天只能发十次");
        }else{
          t.$router.push({
            path: "/verificationCode"
          });
          t.changeCodeState(true);
          // t.codeState = true;
        }
      }
    },
    mounted(){
      api.forbidShare();
      this.phoneNum = this.$store.state.phoneNum;
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
      ...mapGetters(["customerPhoneNum",'customerId','codeNum','phoneError','codeState']),
      activeOnOff(){
        return (this.phoneNum.length===11);
      },
      allRight(){
        let t = this;
        return (t.activeOnOff)&&(t.phoneNum.length>0)&&(!t.errors.has('phone'))&&(!isNaN(parseInt(t.phoneNum,10)))
      }
    },
    methods:{
      ...mapActions(["changePhoneNum",'getValidCode','changeCodeState']),
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
        if(t.phoneNum.length===0){
          t.toast("您还没有填写手机号");
          return false;
        }
        if(isNaN(parseInt(t.phoneNum,10))){
          t.toast("请输入正确的手机号！");
          return false;
        }else{
          if(this.errors.has('phone')){
            t.toast("请输入正确的手机号！");
            return false;
          }
        }
        if(t.allRight){
          if(t.codeNum===0){
            t.toast("一天只能发十次");
            return false;
          }else{
            t.getValidCode();
          }

        }
      }
    },
    components:{
      toast
    }
  }
</script>
