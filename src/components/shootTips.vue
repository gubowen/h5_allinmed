<template>
  <section class="shootTipsBox">
    <button class="btn-slideOver" @click="skipCallBack" v-show="skipShow">跳过</button>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <article class="stepOneBox">
          <figure class="stepOneMain">
            <h2 class="stepOneTitle"></h2>
            <p class="stepOneImg"></p>
            <h3>数码相机或者手机拍摄</h3>
            <figcaption>拍摄工具尽量选择像素高的手机或相机，确保拍摄清晰</figcaption>
          </figure>
        </article>
      </swiper-slide>
      <swiper-slide>
        <article class="stepTwoBox">
          <figure class="stepTwoMain">
            <h2 class="stepTwoTitle"></h2>
            <p class="stepTwoImgComputer"></p>
            <h3>拍摄背景选择电脑</h3>
            <article>如图，打开word白色背景全屏进行拍摄</article>
            <p class="stepTwoImgWindow"></p>
            <h3>拍摄背景选择窗户</h3>
            <article>找一间朝阳的房间关闭灯光在玻璃上帖上白纸，将片子贴在白纸上，注意背景上不要有障碍物</article>
          </figure>
        </article>
      </swiper-slide>
      <swiper-slide>
        <article class="stepThreeBox">
          <figure class="stepThreeMain">
            <h2 class="stepThreeTitle"></h2>
            <p class="stepThreeImgComputer"></p>
            <h3>通过片子上的R/L或豁口找正反</h3>
            <article>如图，L保持在右侧R在左侧，或者在片子上找到豁口，将豁口保持在右上方</article>
            <p class="stepThreeImgWindow"></p>
            <h3>根据片子上的文字判断正反</h3>
            <article>如图，根据文字顺序正反来分清正反</article>
          </figure>
        </article>
      </swiper-slide>
      <swiper-slide>
        <article class="stepFourBox">
          <figure class="stepFourMain">
            <h2 class="stepFourTitle"></h2>
            <p class="stepFourImgComputer"></p>
            <h3>X光片建议以窗户为背景整张拍摄</h3>
            <p class="stepFourImgWindow"></p>
            <h3>CT/核磁每1-4格拍摄一张</h3>
            <article>从左至右，从上至下依次拍摄</article>
            <ul class="smallTips">
              <li>注意：①拍摄时关闭闪光灯</li>
              <li>②拍完后确保片子上的文字能够看清</li>
              <li>③确保片子上没有反光或人影</li>
            </ul>
            <button class="btn-goShoot" @click="skipCallBack">去拍摄</button>
          </figure>
        </article>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import VueAwesomeSwiper from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  Vue.use(VueAwesomeSwiper);
  export default{
    data(){
      return {
        skipShow:true,
        swiperOption: {
          notNextTick: true,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          observeParents:true
        }
      }
    },
    beforeMount(){
      let that = this;
      Object.assign(that.swiperOption, {
        onSlideChangeStart(swiper) {
          if(swiper.activeIndex == 3){
            that.skipShow = false
          }else{
            that.skipShow = true
          }
        }
      })
    },
    methods:{
      skipCallBack(){
        history.go(-1);
      }
    },
    components:{
      swiper,
      swiperSlide
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .shootTipsBox{
    height:100%;
    position:relative;
    background:#eeeeee;
    .swiper-pagination{
      bottom:2%;
      .swiper-pagination-bullet{
        width:rem(12px);
        height:rem(12px);
        margin:0 rem(14px);
        border: 1px solid #0089F3;
        border-radius: 50%;
        background:#fff;
      }
      .swiper-pagination-bullet-active{
        background: #00BCB3;
        border: 1px solid #0089F3;
      }
    };
    .swiper-container{
      height:100%;
    }
    .stepOneBox{
      background:url("../common/image/img00/shootTips/head@2x.png") no-repeat;
      background-size:100% rem(584px);
      height:100%;
      overflow: hidden;
      .stepOneMain{
        height:74%;
        margin:40% rem(20px) 0;
        background:#fff;
        border-radius: rem(20px);
        box-sizing: border-box;
        overflow: hidden;
        .stepOneTitle{
          width:100%;
          height:7%;
          margin-top:3%;
          background:url("../common/image/img00/shootTips/shooting-tool@2x.png") no-repeat center;
          background-size:rem(240px) 100%;
        }
        .stepOneImg{
          width:100%;
          height:39%;
          margin-top:3%;
          background:url("../common/image/img00/shootTips/tool@2x.png") no-repeat center;
          background-size:100% 100%;
        }
        h3{
          margin-top:5%;
          color: #000000;
          font-size: 0.48rem;
          text-align: center;
        }
        figcaption{
          line-height:rem(50px);
          padding:7% rem(110px) 0;
          color: #4A4A4A;
          font-size: 0.42rem;
          text-align: center;
        }
      }
    }
    .stepTwoBox{
      background:url("../common/image/img00/shootTips/head-small@2x.png") no-repeat;
      background-size:100% rem(300px);
      overflow: hidden;
      height:100%;
      .stepTwoMain{
        height:90.3%;
        background:#fff;
        margin:13% rem(20px) 0;
        border-radius: rem(16px);
        box-sizing: border-box;
        overflow: hidden;
        .stepTwoTitle{
          width:100%;
          height:5.3%;
          margin-top:2.7%;
          background:url("../common/image/img00/shootTips/background@2x.png") no-repeat center;
          background-size:rem(240px) 100%;
        }
        .stepTwoImgComputer{
          width:100%;
          height:21.7%;
          margin-top:1.3%;
          background:url("../common/image/img00/shootTips/backgroud-computer@2x.png") no-repeat center;
          background-size:rem(450px) 100%;
        }
        .stepTwoImgWindow{
          width:100%;
          height:19.8%;
          margin-top:2.4%;
          background:url("../common/image/img00/shootTips/shooting-window@2x.png") no-repeat center;
          background-size:rem(375px) 100%;
        }
        h3{
          margin-top:3.5%;
          color: #000000;
          font-size: 0.48rem;
          text-align: center;
        }
        article{
          padding:3.5% rem(110px);
          color: #555555;
          font-size: 0.42rem;
          text-align: center;
        }
      }
    }
    .stepThreeBox{
      background:url("../common/image/img00/shootTips/head-small@2x.png") no-repeat;
      background-size:100% rem(300px);
      overflow: hidden;
      height:100%;
      .stepThreeMain{
        background:#fff;
        height:90.3%;
        margin:13% rem(20px) 0;
        border-radius: rem(16px);
        box-sizing: border-box;
        overflow: hidden;
        .stepThreeTitle{
          width:100%;
          height:6%;
          margin-top:2.7%;
          background:url("../common/image/img00/shootTips/positive@2x.png") no-repeat center;
          background-size:rem(216px) 100%;
        }
        .stepThreeImgComputer{
          width:100%;
          height:21.7%;
          margin-top:1.3%;
          background:url("../common/image/img00/shootTips/RL@2x.png") no-repeat center;
          background-size:rem(375px) 100%;
        }
        .stepThreeImgWindow{
          width:100%;
          height:19.8%;
          margin-top:1.8%;
          background:url("../common/image/img00/shootTips/text@2x.png") no-repeat center;
          background-size:rem(375px) 100%;
        }
        h3{
          margin-top:3.5%;
          color: #000000;
          font-size: 0.48rem;
          text-align: center;
        }
        article{
          padding:3.5% rem(110px);
          color: #555555;
          font-size: 0.42rem;
          text-align: center;
        }
      }
    }
    .stepFourBox{
      background:url("../common/image/img00/shootTips/head-small@2x.png") no-repeat;
      background-size:100% rem(300px);
      overflow: hidden;
      height:100%;
      .stepFourMain{
        background:#fff;
        height:90.3%;
        margin:13% rem(20px) 0;
        border-radius: rem(16px);
        box-sizing: border-box;
        overflow: hidden;
        .stepFourTitle{
          width:100%;
          height:6%;
          margin-top:2.7%;
          background:url("../common/image/img00/shootTips/shooting@2x.png") no-repeat center;
          background-size:rem(194px) 100%;
        }
        .stepFourImgComputer{
          width:100%;
          height:22.6%;
          margin-top:1.3%;
          background:url("../common/image/img00/shootTips/shooting-x@2x.png") no-repeat center;
          background-size:rem(450px) 100%;
        }
        .stepFourImgWindow{
          width:100%;
          height:23.2%;
          margin-top:2.7%;
          background:url("../common/image/img00/shootTips/shooting-CT@2x.png") no-repeat center;
          background-size:rem(470px) 100%;
        }
        h3{
          margin-top:1.5%;
          color: #000000;
          font-size: 0.48rem;
          text-align: center;
        }
        article{
          padding:1.5% rem(110px) 2.5%;
          color: #555555;
          font-size: 0.42rem;
          text-align: center;
          line-height:rem(50px);
        }
        .smallTips{
          color: #FA787A;
          font-size: 0.32rem;
          text-align: center;
          font-weight: bold;
        }
        .btn-goShoot{
          display:block;
          width:rem(490px);
          height:8%;
          margin:1.7% auto 0;
          line-height:8%;
          text-align: center;
          color: #fff;
          background:#07B6AC;
          border-radius: rem(100px);
          font-size: 0.48rem;
          font-weight: bold;
        }
      }
    }
  }
  .btn-slideOver{
    position: absolute;
    z-index:2;
    display:block;
    width:rem(120px);
    height:rem(60px);
    line-height:rem(60px);
    right:rem(20px);
    top:rem(20px);
    text-align:center;
    background:#4ECECC;
    color:#fff;
    @include font-dpr(14px);
    border-radius: rem(100px);
    letter-spacing: rem(2px);
  }
</style>
