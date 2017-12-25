<template>
  <div>
    <section class="main-message-box">
      <!--<article class="main-message-box-item my-message" data-clientid="" @click="goToDetail">-->
      <!--<figcaption class="medical-record message-result medical-record-list">-->
      <!--<article class="message-result-item">-->
      <!--<header class="message-result-item-title">问诊单</header>-->
      <!--<section class="message-result-item-message">-->
      <!--<figure class="message-result-item-img">-->
      <!--<img src="../../../../image/img00/patientConsult/dialogue_case@2x.png" alt="">-->
      <!--</figure>-->
      <!--<figcaption><h2>{{medicalReportMessage.data.patientName}}问诊单</h2>-->
      <!--<p><span class="sex">性别:{{medicalReportMessage.data.sexName}}</span><span class="age">年龄:{{medicalReportMessage.data.age}}</span></p></figcaption>-->
      <!--</section>-->
      <!--</article>-->
      <!--</figcaption>-->
      <!--<figure class="main-message-img">-->
      <!--<img :src="logoUrl" alt="">-->
      <!--</figure>-->
      <!--</article>-->
      <!--新的问诊单-->
      <article class="medical-report-box" data-clientid="" @click="goToDetail">
        <header class="medical-report-title">问诊单</header>
        <section class="medical-report-content">
          <p class="patient-info">
            <span>患者：</span>
            <span class="patient-name">{{medicalReportMessage.data.patientName | ellipsis(8)}}&nbsp</span>
            <span class="patient-age">{{medicalReportMessage.data.sexName}}&nbsp{{medicalReportMessage.data.age}}岁</span>
          </p>
          <p class="case-describe"><span>主诉：</span><span class="case-describe-main">{{mainCase}}</span></p>
        </section>
        <footer class="medical-report-footer">查看已提交信息</footer>
      </article>
    </section>

    <section class="main-message-box">
      <article class="main-message-box-item others-message">
        <figcaption class="first-message">
          <p>已通知医生尽快接诊，医生回复将在公众号中即时通 知，请保持关注，<span style="color: #07B6AC">48小时未接诊将自动退诊</span></p>
        </figcaption>
      </article>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/11.
   */
  import store from "../store/store";
  import api from 'common/js/util/util';
  const XHRList = {
    caseMain: "/mcall/customer/patient/case/v1/getMainMapById/",
  };
  export default{
    data(){
      return {
        mainCase: "",//患者主诉详情
      }
    },
    mounted(){
      store.commit("setLogoUrl", this.medicalReportMessage.data);
      console.log(this.medicalReportMessage);
      this.getCaseMain();
    },
    methods: {
      getCaseMain(){
        let that = this;
        api.ajax({
          url: XHRList.caseMain,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,//string	是	病例id
            patientId: api.getPara().patientId,//string	是		患者id
          },
          beforeSend: function () {

          },
          done(param) {
            if (param.responseObject.responseStatus) {
              that.mainCase = param.responseObject.responseData.dataList[0].caseMain.caseMain;
            }
          },
          fail(err) {
            console.log("请求失败");
          }
        })
      },
      goToDetail(){
        this.$router.push({
          name: "MedicalReportDetail",
        })
      }
    },
    computed: {
      logoUrl(){
        return this.$store.state.logoUrl
      }
    },
    filters: {
      ellipsis: function (value,len) {
        if (!value) return ''
        let newStr = '',
          newLength = 0;
        for (let i = 0; i < value.length; i++) {
          if (value.charCodeAt(i) > 128) {
            newLength += 2;
          } else {
            newLength++;
          }
          if (newLength <= len) {
            newStr = newStr.concat(value[i]);
          } else {
            break;
          }
        }
        if (newLength > len) {
          newStr = newStr + "..."
        }
        return newStr;
      }
    },
    props: {
      medicalReportMessage: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  //问诊单
  .medical-report-box{
    height: rem(302px);
    width: rem(694px);
    margin: 0 auto;
    background: url("../../../common/image/imScene/interrogation_of_single@2x.png") no-repeat;
    background-size: cover;
    .medical-report-title{
      height: rem(68px);
      line-height: rem(68px);
      @include font-dpr(14px);
      padding-left: rem(72px);
      color: #FFFFFF;
    }
    .medical-report-content{
      height: rem(152px);
      @include font-dpr(16px);
      padding: rem(38px) rem(0px) rem(0px) rem(40px);
      box-sizing: border-box;
      color: #555555;
      line-height: 1;
      .patient-info{
        span{
          display: inline-block;
          vertical-align: text-bottom;
        }
        line-height: 1.2;
        .patient-name{
          color: #333333;
          font-weight: bold;
          display: inline-block;
          /*max-width: rem(160px);*/
          //          @include ellipsis();
        }
        .patient-age{
          margin-left: rem(10px);
          @include font-dpr(14px);
        }
      }
      .case-describe{
        margin-top: rem(20px);
        span{
          vertical-align: middle;
        }
        .case-describe-main{
          font-weight: bold;
          display: inline-block;
          width: rem(520px);
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          /*vertical-align: sub;*/
          line-height: 1.2;
        }
      }
    }
    .medical-report-footer{
      height: rem(78px);
      @include font-dpr(14px);
      padding-left: rem(40px);
      color: #07B6AC;
      line-height: rem(78px);
    }
  }
</style>
