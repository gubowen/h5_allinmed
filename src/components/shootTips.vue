<template>
  <section class="shootTipsBox">
    <button class="btn-slideOver">跳过</button>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <article class="stepOneBox">
          <figure class="stepOneMain">
            <h2 class="stepOneTitle"></h2>
            <p class="stepOneImg"><img src="../common/image/img00/shootTips/tool@2x.png"></p>
            <h3>数码相机或者手机拍摄</h3>
            <figcaption>拍摄工具尽量选择像素高的手机或相机，确保拍摄清晰</figcaption>
          </figure>
        </article>
      </swiper-slide>
      <swiper-slide></swiper-slide>
      <swiper-slide></swiper-slide>
      <swiper-slide></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import VueAwesomeSwiper from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default{
    data(){
      return {
        swiperOption: {
          notNextTick: true,
          // direction : 'vertical',
          effect:"coverflow",
          grabCursor : true,
          setWrapperSize :true,
          // autoHeight: true,
          // paginationType:"bullets",
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          // scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true
        }
      }
    },
    mounted(){
      Vue.use(VueAwesomeSwiper);
    },
    components:{
      swiper,
      swiperSlide
    },
    props: {

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .shootTipsBox{
    min-height:100%;
    position:relative;
    .stepOneBox{
      background:url("../common/image/img00/shootTips/head@2x.png") no-repeat #eeeeee;
      background-size:100% rem(584px);
      overflow: hidden;
      .stepOneMain{
        background:#fff;
        margin:rem(320px) rem(20px) 0;
        border-radius: rem(20px);
        box-sizing: border-box;
        padding-top:1px;
        .stepOneTitle{
          width:100%;
          height:rem(60px);
          margin-top:rem(30px);
          background:url("../common/image/img00/shootTips/shooting-tool@2x.png") no-repeat center;
          background-size:rem(240px) rem(60px);
        }
        .stepOneImg{
          width:100%;
          height:rem(360px);
          margin-top:rem(30px);
          background:url("../common/image/img00/shootTips/shooting-tool@2x.png") no-repeat center;
          background-size:100% rem(360px);
        }
        h3{
          margin-top:rem(40px);
          color: #000000;
          @include font-dpr(18px);
          text-align: center;
        }
        figcaption{
          padding:rem(60px) rem(110px) 0;
          color: #4A4A4A;
          @include font-dpr(16px);
          text-align: center;
        }
      }
    }
  }
  .btn-slideOver{
    position: absolute;
    display:block;
    width:rem(120px);
    height:rem(60px);
    line-height:rem(60px);
    right:10px;
    top:15px;
    text-align:center;
    background:#4ECECC;
    color:#fff;
    @include font-dpr(14px);
    border-radius: rem(20px);
  }
</style>
