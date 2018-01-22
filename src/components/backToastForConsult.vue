<template>
  <section class="consult-main-inner">
    <transition name="fade">
      <confirm :confirmParams="{
          'ensure':'继续沟通',
          'cancel':'返回首页',
          'content':'',
          'title':'您的问诊单已提交\n无需重复操作'
          }" v-if="backPopupShow" @cancelClickEvent="backHomeEvent()" @ensureClickEvent="ensureIMEvent()">
      </confirm>
    </transition>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
    <loading v-show="finish"></loading>
  </section>
</template>
<script type="text/ecmascript-6">
    /**
     * @Desc：咨询流程返回操作提示不能重复提交问诊单
     * @Usage:   <backPopup v-if="backPopupShow"  :backPopupShow.sync="backPopupShow" :backPopupParams = "{patientCustomerId:allParams.customerId}"></backPopup>
     * @Notify： 参数backPopupParams 里 patientCustomerId 为患者所属用户ID
     * @Depend：
     *
     * Created by jukun on 2017/9/25.
     */
    import api from 'common/js/util/util';
    import loading from 'components/loading';
    import toast from 'components/toast';
    import autosize from 'autosize';
    import axios from "axios";
    import confirm from 'components/confirm';

    const XHRList = {};
    export default {
        data() {
            return {
              errorShow:false,
              finish:false,
              backPopupShow:true,
              errorMsg:'',
            }
        },
        activated() {

        },
        mounted() {

        },
        methods: {
          //返回首页
          backHomeEvent(){
            let _this=this;
            this.backPopupShow=false;
            if(_this.backPopupParams.patientParams.doctorId){
              // window.location.href=`/dist/consult.html?customerId=${_this.backPopupParams.patientParams.customerId}&doctorId=${_this.backPopupParams.patientParams.doctorId}`;
              let urlTemp = `/dist/consult.html?customerId=${_this.backPopupParams.patientParams.customerId}&doctorId=${_this.backPopupParams.patientParams.doctorId}`
              g_sps.jump(null,urlTemp); 
            }else{
              // window.location.href=`/dist/consult.html?customerId=${_this.backPopupParams.patientParams.customerId}`;
              let urlTemp = `/dist/consult.html?customerId=${_this.backPopupParams.patientParams.customerId}`
              g_sps.jump(null,urlTemp); 
            }
          },
          //继续沟通
          ensureIMEvent(){
            this.backPopupShow=false;
            // window.location.href = ;
            g_sps.jump(null,localStorage.getItem("PCIMLinks")); 
          }
        },
        props: {
          backPopupParams: {
            type: Object
          }
        },
        components: {
            loading,
            toast,
            confirm
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../../scss/library/_common-modules";
</style>
