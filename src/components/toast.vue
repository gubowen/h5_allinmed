<template>
  <section class="middle-tip-modal popup-tips show">
    <figure class="middle-tips-box-img" v-if="imgUrl">
      <img :src="imgUrl" alt="">
    </figure>
    <figure class="middle-tip-box-text">
      <p class="tipText">{{content}}</p>
    </figure>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/7/24.
   */
  export default{
    data(){
      return {}
    },
    mounted(){
      console.log()
    },
    props: {
      content: {
        type: String
      },
      imgUrl: {
        type: String
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .tipText {
    text-align: center;
  }

  .middle-tip-modal {
    position: fixed;
    .middle-tips-box-img {
      width:rem(66px);
      height:rem(66px);
      margin: 0 auto;
      padding-bottom: rem(15px);
      & > img{
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .popup-tips{
    /*position: absolute;*/
    top: 50%;
    left: 50%;
  }
</style>
