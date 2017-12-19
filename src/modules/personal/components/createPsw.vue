<template>
  <section class="allinmed-personal-changePsw">
    <section class="allinmed-personal-tableModule createPsw">
      <article class="allinmed-personal-tableModuleItem">
        <h3>新密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input :type="pswType" placeholder="请输入至少6位的密码"    v-model="newPassWord" @focus='inputBegin(1)'  @blur='inputEnd'>
          <i class="eye ev_toggleEye " :class='{"eyeClose":!eyeState,"eyeOpen":eyeState,}' style="right:0;margin-right:0;" @click='changeEyeState'></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <h3>确认新密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入新密码"   v-model="reNewPassWord" @focus='inputBegin(2)'  @blur='inputEnd'>
          <i class="icon-searchCancel" v-show='(cancelIndex===2)&&(reNewPassWord.length>0)'  @click='removeInput(2)'></i>

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
  .allinmed-mainInner{
  .allinmed-personal-changePsw{
    min-height: auto;
    height: auto;
  }
  }
  .allinmed-personal-changePsw {
    position: absolute;
    top: rem(20px);
    left: rem(20px);
    width: rem(710px);
    background: #fff;
    border-radius:rem(16px);
    /*min-height: auto !important;
    height: auto !important;*/
    .createPsw{
      min-height:rem(290px);
    }
  }
</style>
<script  type="text/ecmascript-6">
  import toast from "components/toast";
  import {mapGetters,mapActions} from "vuex";
  import api from 'common/js/util/util';
  let xhrUrl = {
    resetPsw:"/mcall/patient/customer/unite/v1/updatePwd/"
  }
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
    mounted(){
      api.forbidShare();
    },
    computed:{
      ...mapGetters(["customerId",'customerPhoneNum','loginUrl']),
      pswType(){
        return (this.eyeState)?"text":"password";
      },
      activeOnOff(){
        return (this.newPassWord.length>0)&&(this.reNewPassWord.length>0);
      },
      allRight(){
        let t = this;
        return (t.activeOnOff)&&(t.newPassWord.length<=20)&&(t.reNewPassWord.length<=20)&&(t.newPassWord.length>=6)&&(t.reNewPassWord.length>=6)&&(t.newPassWord===t.reNewPassWord);
      }
    },
    methods:{
      ...mapActions(['showLoading','hideLoading','changeIsExistPwd']),
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
        if(!t.activeOnOff){
          if(t.newPassWord.length===0){
            //t.toast("请输入新密码");
            return false;
          }
          if(t.reNewPassWord.length===0){
            //t.toast("请确认新密码");
            return false;
          }
        }else{
          if(t.newPassWord.length<6){
            t.toast("新密码长度至少6位");
            // allRight = false;
            return false;
          }
          if(t.newPassWord.length<6){
            t.toast("新密码长度至少6位");
            // allRight = false;
            return false;
          }
          if(t.newPassWord.length>20){
            t.toast("新密码长度应小于20位");
            // allRight = false;
            return false;
          }
          if(t.reNewPassWord.length>20){
            t.toast("新密码长度应小于20位");
            // allRight = false;
            return false;
          }
          if(t.newPassWord!==t.reNewPassWord){
            t.toast("两次输入密码不一致");
            // allRight = false;
            return false;
          }
        }
        // console.log(allRight);
        if(t.allRight){
          let param = {
            newPassword:t.newPassWord,//	string	是
            customerId:t.customerId,//	string	是
            mobile:t.customerPhoneNum,//	string	是
            userType:1,//	string	是
            optType:1,//	string	是
            updatePwdFlag:1//string	是	修改密码类型 （1：不验证直接修改 ； 0：验证；）
          }
          const resetPsw = () =>{
            let _this = this;
            api.ajax({
              url: xhrUrl.resetPsw,
              method: "POST",
              data: param,
              beforeSend: function () {
                t.showLoading();
              },
              timeout: 20000,
              done(data) {
                //console.log(data);
                t.hideLoading();
                if(data&&data.responseObject&&data.responseObject.responseStatus){
                  console.log(data.responseObject.responseCode,typeof data.responseObject.responseCode)
                  t.toast("修改密码成功");
                  t.changeIsExistPwd();
                  clearTimeout(callBackTimer);
                  let callBackTimer = setTimeout(function () {
                    //window.location.href = t.loginUrl;
                    t.$router.push({
                      path: "/personalIndex"
                    });
                  },2000)
                }else{
                  if(data.responseObject.responseCode==='0A0005'){
                    //t.toast("当前密码不正确！");
                  }else if( data.responseObject.responseCode==='0B0003'){
                    t.toast("用户不存在！");
                  }
                }
              },
              fail(err){

              }
            })
          }
          resetPsw();
        }
      },
      inputEnd(){
        this.cancelIndex =-1;
      },
      removeInput(index){
        let arr = ['nowPassWord',"",'reNewPassWord'];
        this[(arr[index])] = '';
      }
    },
    components:{
      toast
    },
    watch:{
      cancelIndex(newStr){
        let t = this;
        /*if((newStr===1)&&(t.nowPassWord.length===0)){
          t.toast("请输入当前密码");
        }*/
        if(newStr===2){
          // console.log(t.nowPassWord)
          /*if(t.nowPassWord.length===0){
            console.log("进入");
            t.toast("请输入当前密码");
          }*/
          if(t.newPassWord.length===0){
            t.toast("请输入新密码");
          }
        }
      }
    }
  }
</script>
