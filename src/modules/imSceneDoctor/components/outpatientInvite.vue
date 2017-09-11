<template>
  <section class="main-message-box">
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
  </section>
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
    methods: {
      goToDocMain(){
        window.location.href = `/pages/myServices/doc_main.html?caseId=${api.getPara().caseId}&customerId=${api.getPara().doctorCustomerId}&type=1&patientId=${api.getPara().patientId}&patientCustomerId=${api.getPara().patientCustomerId}`
      }
    },
    computed: {
      targetLogo(){
        return this.$store.state.targetMsg.avatar;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
