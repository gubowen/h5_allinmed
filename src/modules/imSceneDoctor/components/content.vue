<template>
  <section class="main-message-box">
    <article
      class="main-message-box-item"
      :data-clientid="contentMessage.idClient"
      :class="{'my-message':contentMessage.from===userData.account,
             'others-message':contentMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="contentMessage.from===targetData.account">
        <img :src="targetLogo" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content">
        <p>{{contentMessage.text}}</p>
      </figcaption>
      <figure class="main-message-img" v-if="contentMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
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
   * Created by qiangkailiang on 2017/8/17.
   */
  export default{
    mounted(){
    },
    computed: {
      logoUrl(){
        return this.$store.state.logoUrl
      },
      targetLogo(){
        return this.$store.state.targetMsg.avatar.length===0? "/src/common/image/imScene/default.png":this.$store.state.targetMsg.avatar;
      }
    },
    props: {
      contentMessage: {
        type: Object
      },
      targetData: {
        type: Object
      },
      userData: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
