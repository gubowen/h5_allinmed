<template>
  <div>
    <section class="main-message-box">
      <article class="main-message-box-item my-message" data-clientid="" @click="goToDetail">
        <figcaption class="medical-record message-result medical-record-list">
          <article class="message-result-item">
            <header class="message-result-item-title">问诊单</header>
            <section class="message-result-item-message">
              <figure class="message-result-item-img">
                <img src="../../../../image/img00/patientConsult/dialogue_case@2x.png" alt="">
              </figure>
              <figcaption><h2>{{medicalReportMessage.data.patientName}}问诊单</h2>
                <p><span class="sex">性别:{{medicalReportMessage.data.sexName}}</span><span
                  class="age">年龄:{{medicalReportMessage.data.age}}</span></p></figcaption>
            </section>
          </article>
        </figcaption>
        <figure class="main-message-img">
          <img :src="logoUrl" alt="">
        </figure>
      </article>
    </section>
    <section class="main-message-box">
      <article class="main-message-box-item others-message">
        <figcaption class="first-message">
          <p>医生会尽快接诊，回复信息将在本公众号中即时通知，请保持关注</p>
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
  export default{
    mounted(){
      store.commit("setLogoUrl", this.medicalReportMessage.data)
    },
    methods: {
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
    props: {
      medicalReportMessage: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
