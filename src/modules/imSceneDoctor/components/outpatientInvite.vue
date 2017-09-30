<template>
  <!--<section class="main-message-box">
    <article class="main-message-box-item others-message">
      <figure class="main-message-img">
        <img :src="targetLogo" alt="">
      </figure>
      <figcaption class="check-suggestion message-result doctor-special" data-role="outPatientDetail">
        <article class="message-result-item">
          <header class="message-result-item-title">门诊邀约</header>
          <section class="message-result-item-message"><p class="check-suggestion-item">
            <span>医生建议您预约门诊，面诊后才能准确为您确诊病情。</span></p>
            <footer class="message-result-item-bottom">
              <p @click="goToDocMain">预约门诊</p>
            </footer>
          </section>
        </article>
      </figcaption>
    </article>
  </section>-->
  <div>
    <section class="outpatient-nvite-box">
      <header class="outpatient-header">
        <h2>
          <span>门诊邀约单</span>
        </h2>
      </header>
      <section class="outpatient-content">
        <article class="outpatient-item-time">
          <p>
            <span>有效期</span>
            <span>一次加号机会</span>
          </p>
          <h3 class="time-area">{{oiMessage.validPeriod}}</h3>
        </article>
        <article class="outpatient-patient-msg">
          <article class="outpatient-patient-item">
            <h4 class="outpatient-patient-item-title">患者</h4>
            <p class="outpatient-patient-item-msg">
              <span>{{oiMessage.patientName}}</span>
              <span>{{oiMessage.patientSex==1?'男':'女'}}</span>
              <span>{{oiMessage.patientAge}}岁</span>
            </p>
          </article>
          <article class="outpatient-patient-item">
            <h4 class="outpatient-patient-item-title">证件号码</h4>
            <p class="outpatient-patient-item-msg">
              <span>{{oiMessage.patientDocumentNumber}}</span>
            </p>
          </article>
        </article>
        <article class="outpatient-patient-msg">
          <article class="outpatient-patient-item">
            <h4 class="outpatient-patient-item-title">医生</h4>
            <p class="outpatient-patient-item-msg">
              <span>{{oiMessage.doctorName}}</span>
              <span>{{oiMessage.doctorPosition}}</span>
            </p>
          </article>
          <article class="outpatient-patient-item">
            <h4 class="outpatient-patient-item-title">医院</h4>
            <p class="outpatient-patient-item-msg">
              <span>{{oiMessage.doctorHospital}}</span>
            </p>
          </article>
        </article>

        <article class="outpatient-base-explanation part-one">
          <p>请以该医生在医院官网的出诊时间为准，停诊信息以医院当天公布为准</p>
        </article>
        <article class="outpatient-base-explanation part-two">
          <p>有效期内患者到医生室出示邀约单，领取加号条后，到医院挂号处缴费。挂号费以医院实际为准</p>
        </article>
        <article class="outpatient-base-explanation part-three">
          <p>请以上方有效期为准，逾期就诊，医生有权拒绝加号</p>
        </article>
      </section>
    </section>
    <section class="main-message-box grey-tips">
      <figcaption class="first-message">
        <p>此条消息不消耗医生回复次数</p>
      </figcaption>
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
   * Created by qiangkailiang on 2017/8/29.
   */
  import api from "common/js/util/util";
  export default{
    data(){
      return {
        oiMessage: {}
      }
    },
    mounted(){
        this.oiMessage=this.outPatientMessage.data;
    },
    props: {
      outPatientMessage: {
        type: Object
      }
    },
    methods: {
      goToDocMain(){
        window.location.href = `/pages/myServices/doc_main.html?caseId=${api.getPara().caseId}&customerId=${api.getPara().doctorCustomerId}&type=1&patientId=${api.getPara().patientId}&patientCustomerId=${api.getPara().patientCustomerId}`
      }
    },
    computed: {
      targetLogo(){
        return this.$store.state.targetMsg.avatar.length === 0 ? "/src/common/image/imScene/default.png" : this.$store.state.targetMsg.avatar;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  $inner-border-color: #f0f0f0;
  .outpatient-nvite-box {
    display: block;
    margin: 0 rem(28px);
    background: #FFFFFF;
    border: rem(1px) solid #7E98DE;
    border-radius: rem(32px);
    .outpatient-header {
      background-image: linear-gradient(-90deg, #97B6F7 0%, #7B95DC 98%);
      border-radius: rem(32px) rem(32px) 0 0;
      background-size: cover;
      padding: rem(20px) rem(30px);
      padding-bottom: rem(48px);
      box-sizing: border-box;
      width: 100%;
      & > h2 {
        font-size: 0;
        &:before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          @include square(rem(28px));
          background: url("../../../common/image/imScene/inquiry.png") no-repeat;
          background-size: contain;
        }
        & > span {
          @include font-dpr(14px);
          color: #ffffff;
          display: inline-block;
          vertical-align: middle;
          margin-left: rem(12px);

        }
      }
    }
    .outpatient-content {
      background: #FFFFFF;
      border-radius: rem(24px);
      width: 100%;
      padding: 0 rem(40px);
      box-sizing: border-box;
      margin-top: rem(-18px);
    }
    .outpatient-item-time {
      padding: rem(44px) 0;
      border-bottom: rem(2px) solid $inner-border-color;
      & > p {
        @include clearfix();
        margin-bottom: rem(16px);
        span {
          &:nth-child(1) {
            float: left;
            @include font-dpr(15px);
            color: #909090;
          }
          &:nth-last-child(1) {
            float: right;
            @include font-dpr(14px);
            color: #ff8e32;
          }
        }
      }
      .time-area {
        color: #7B95DC;
        @include font-dpr(20px);
      }
    }
  }

  .outpatient-patient-msg {
    padding: rem(44px) 0;
    border-bottom: rem(2px) solid $inner-border-color;
    .outpatient-patient-item {
      margin-bottom: rem(16px);
      font-size: 0;
      & > h4 {
        color: #909090;
        @include font-dpr(15px);
        display: inline-block;
        vertical-align: middle;
        margin-right: rem(20px);
        font-weight: normal;
      }
      & > p {
        color: #333333;
        font-size: 0;
        display: inline-block;
        vertical-align: middle;
        & > span {
          padding-right: rem(28px);
          display: inline-block;
          @include font-dpr(15px);
          vertical-align: middle;
        }
      }
    }
  }

  .outpatient-base-explanation {
    margin: rem(60px) 0;
    display: flex;
    align-items: baseline;
    & > p {
      @include font-dpr(17px);
      color: #333333;
      font-weight: bold;
    }
    &:before {
      content: "";
      text-align: center;
      flex-shrink: 0;
      @include square(rem(40px));
      line-height: rem(40px);
      border-radius: 50%;
      background-image: linear-gradient(-90deg, #97B6F7 0%, #7B95DC 98%);
      margin-right: rem(24px);
      color: #FFFFFF;
    }
    &.part-one {
      &:before {
        content: '1';
      }
    }
    &.part-two {
      &:before {
        content: '2';
      }
    }
    &.part-three {
      &:before {
        content: '3';
      }
    }
  }
</style>
