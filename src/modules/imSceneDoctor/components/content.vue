<template>
  <section class="main-message-box" v-touch:long="longTouchHandler">
    <article
      class="main-message-box-item"
      :data-clientid="contentMessage.idClient"
      :class="{'my-message':contentMessage.from===userData.account,
             'others-message':contentMessage.from===targetData.account}">
      <figure class="main-message-img" v-if="contentMessage.from===targetData.account" @click.stop="$emit('clickLogo')">
        <img :src="targetLogo" alt="">
      </figure>
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content">
        <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&contentMessage.from===userData.account">撤回</span>
        </transition>
        <p>{{contentMessage.text}}</p>
        <article class="disclaimer-content" v-if="$store.state.targetList.indexOf(contentMessage)===1&&contentMessage.from===targetData.account">
          <span>重要提示：在线咨询不能代替面诊，医生建议仅供参考。</span>
        </article>
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
    data() {
      return {
        showDeleteMsg: false
      };
    },
    mounted(){
      console.log(this.$store.state.targetList.indexOf(this.contentMessage));
    },
    computed: {
      logoUrl(){
        return this.$store.state.logoUrl
      },
      targetLogo(){
        return this.$store.state.targetMsg.avatar.length===0? "/src/common/image/imScene/default.png":this.$store.state.targetMsg.avatar;
      }
    },
    methods:{
      longTouchHandler() {
        if (this.$store.state.toolbarConfig.delete) {
          this.showDeleteMsg = true;
          this.$emit("longTouchEmitHandler");
        }
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
      currentIndex:{
        type:Number
      },
      deleteMsgIndex:{
        type:Number
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .delete-msg-btn {
    @include font-dpr(14px);
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: -1.5rem;
    text-indent: -.2rem;
    color: #fff;
    line-height: rem(70px);
    text-align: center;
    display: block;
    transform:translateY(-50%);
    width: rem(136px);
    height: rem(70px);
    background: url("../../../../src/common/image/imScene/bullet_withdraw.png");
    background-size: 100% 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .disclaimer-content{
    color: #97A8BA;
    background: #fafafb;
    @include font-dpr(13px);
    margin: -0.5rem -0.4rem;
    margin-top: 0.45333rem;
    padding: rem(20px) rem(36px);
    box-sizing: border-box;
    border-radius: rem(21px);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 2px solid #d8d8d8;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
