<template>
  <section class="allinmed-personal-changePsw">
    <section class="allinmed-personal-tableModule">
      <article class="allinmed-personal-tableModuleItem">
        <h3>当前密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入当前密码"   v-model="nowPassWord" @focus='inputBegin(0)' @blur='inputEnd'>
          <i class="icon-searchCancel" v-show='(cancelIndex===0)&&(nowPassWord.length>0)' @click='removeInput(0)'></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <h3>新密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input :type="pswType" placeholder="请输入当前密码"    v-model="newPassWord">
          <i class="eye ev_toggleEye " :class='{"eyeClose":!eyeState,"eyeOpen":eyeState,}' style="right:0;margin-right:0;" @click='changeEyeState'></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <h3>确认新密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入当前密码"   v-model="reNewPassWord" @focus='inputBegin(1)'  @blur='inputEnd'>
          <i class="icon-searchCancel" v-show='(cancelIndex===1)&&(reNewPassWord.length>0)'  @click='removeInput(1)'></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <button class="btn-primary-lg" :class='{"allinmed-personal-msgWriting":!activeOnOff}' id="save" on="false" @click='activeSave'>确认</button>
      </article>
    </section>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
  </section>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules.scss";

  .allinmed-personal-changePsw {
    position: absolute;
    top: rem(20px);
    left: rem(20px);
    width: rem(710px);
    background: #fff;
    border-radius:rem(16px);
  }
</style>
<script  type="text/ecmascript-6">
  import toast from "components/toast";
  export default {
    data(){
      return {
        nowPassWord:"",
        newPassWord:"",
        reNewPassWord:"",
        eyeState:false,
        cancelIndex:-1,
        errorShow:false,
        errorMsg:""
      }
    },
    computed:{
      pswType(){
        return (this.eyeState)?"text":"password";
      },
      activeOnOff(){
        return (this.nowPassWord.length>0)&&(this.newPassWord.length>0)&&(this.reNewPassWord.length>0);
      }
    },
    methods:{
      toast(msg){
        let t = this;
        this.errorMsg = msg;
        t.errorShow = true;
        setTimeout(function(){
          t.errorShow = false;
        },2000);
        return false;
      },
      changeEyeState(){
        let t = this;
        t.eyeState = !t.eyeState;
      },
      inputBegin(index){
        this.cancelIndex = index;
      },
      activeSave(){
        let t = this;
        let allRight = true;
        if(!t.activeOnOff){
          if(t.nowPassWord.length===0){
            //t.toast("请输入当前密码");
            allRight = false;
            return false;
          }
          if(t.newPassWord.length===0){
            //t.toast("请输入新密码");
            allRight = false;
            return false;
          }
          if(t.reNewPassWord.length===0){
            //t.toast("请确认新密码");
            allRight = false;
            return false;
          }
        }else{
          (this.nowPassWord.length>0)&&(this.newPassWord.length>0)&&(this.reNewPassWord.length>0);
          if(t.newPassWord.length<6){
            t.toast("新密码长度应大于6位");
            allRight = false;
            return false;
          }
          if(t.reNewPassWord.length<6){
            t.toast("新密码长度应大于6位");
            allRight = false;
            return false;
          }
          if(t.newPassWord===t.reNewPassWord){
            t.toast("两次输入密码不一致");
            allRight = false;
            return false;
          }
          if(t.nowPassWord===t.newPassWord){
              console.log("新旧密码一致");
          }
        }
        console.log(allRight);
        if(allRight){
          console.log("参数均正确可以进行逻辑");
        }
      },
      inputEnd(){
        this.cancelIndex =-1;
      },
      removeInput(index){
        let arr = ['nowPassWord','reNewPassWord'];
        this[(arr[index])] = '';
      }
    }
  }
</script>
