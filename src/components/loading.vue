<template>
  <section class="middle-tip-box ev-loading">
    <section class="middle-tip-modal">
      <figure class="middle-tip-box-text">
        <img src="../common/image/img00/patientConsult/symptom_photo_loading@2x.png" alt="loading...">
      </figure>
    </section>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/7/18.
   */
  export default{
    props: {
      show:{
          type:Boolean
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .middle-tip-box {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 3; }

  .middle-tip-modal {
    position: fixed;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%); }
  .middle-tip-modal .middle-tip-box-text > img {
    width: 0.53333rem;
    height: 0.53333rem;
    border-radius: 50%;
    background-color: transparent;
    -webkit-animation: rotate 1s linear forwards infinite;
    animation: rotate 1s linear forwards infinite; }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0); }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg); } }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0); }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg); } }

</style>
