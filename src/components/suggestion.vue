<template>
  <section class="suggestion-box" @click="goFeedback()">
    <div class="suggestion-bg"></div>
    <p class="suggestion-text">提建议</p>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by lichenyang on 2017/12/25.
   */
  import api from 'common/js/util/util';
  export default{
    data(){
      return {

      }
    },
    methods: {
      goFeedback () {
        location.href = '/dist/feedback.html?from=im&customerId=';
      }
    },
    mounted(){

    },
    components: {

    },
    props:{
      customerId:{
        type:String
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .suggestion-box{
    position: fixed;
    opacity: 0.7;
    background: #416081;
    width: rem(51px);
    height: rem(164px);
    box-sizing: border-box;
    padding-top: rem(14px);
    top: rem(168px);
    right: 0;
    z-index: 5;
    border-radius: rem(10px) 0 0 rem(10px);
    .suggestion-bg{
      width: rem(28px);
      height: rem(28px);
      margin: 0 auto;
      background: url("../common/image/img00/commonImage/artboard.png")
        no-repeat center top;
      background-size: rem(28px) rem(28px);
    }
    .suggestion-text{
      @include font-dpr(15px);
      color: #FFFFFF;
      text-align: center;
      margin-top: rem(6px);
      line-height: 1.1;
    }
  }
</style>
