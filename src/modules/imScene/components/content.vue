<template>
  <section class="main-message-box" v-touch:long="longTouchHandler">

    <article
      class="main-message-box-item"
      :data-clientid="contentMessage.idClient"
      :class="{'my-message':contentMessage.from===userData.account,
             'others-message':contentMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="contentMessage.from===targetData.account">
        <img src="../../../common/image/imScene/chatting_portrait_system@2x.png" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content">
        <button class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="showDeleteMsg">撤回</button>
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
export default {
  data() {
    return {
      showDeleteMsg: false
    };
  },
  mounted() {},
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    }
  },
  methods: {
    longTouchHandler() {
      this.showDeleteMsg = true;
    },
    deleteMsgEvent() {
      this.showDeleteMsg = false;
      this.$emit("deleteMsgEvent");
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
    },
    
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
.delete-msg-btn {
  @include font-dpr(16px);
  position: absolute;
  top: 50%;
  left: -20%;
  transform:translateY(-50%);
}
</style>
