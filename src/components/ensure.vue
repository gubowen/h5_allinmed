<template>
  <section class="maskers confirmBox-tips show">
    <section class="confirmBox-inner">
      <article class="confirmBox-content">
        <article>
          <p v-show="ensureParams.content">{{ensureParams.content}}</p>
        </article>
      </article>
      <footer class="confirmBox-btns">
        <button class="confirmBox-ensureBtn" @click="ensureClickEvent">{{ensureParams.ensure}}</button>
      </footer>
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
   * Created by gubowen on 2017/7/27.
   */
  export default{
    data(){
      return {
        isCreate:'',
        patientId:''
      }
    },
    methods:{
      ensureClickEvent() {
        this.$emit('ensureClickEvent')
      }
    },
    mounted(){

    },
    props: {
      ensureParams: {
        type: Object
      },
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

  .confirmBox-content{

    h2{
      margin: 0;
      white-space: pre-wrap;
    }
  }
  .confirmBox-btns{
    @include font-dpr(0px);
    & > button{
      @include font-dpr(17px);
      font-weight: normal;
    }
    & > .confirmBox-ensureBtn{
      font-weight: normal;
    }
  }
.confirmBox-cancelBtn{

}
</style>
