<template>
  <section class="ev-showBigImg" >
    <!-- 大图模式 -->
    <div class="gallery-top" @click="imageClickFn">
      <!-- slides -->
      <div class="swiper-container topSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-zoom-container"  v-for="(item,index) in imageListBox" :key="item.imgId">
            <img :src="item.blob" alt="" >
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
      
      <!-- Optional controls -->
      
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </div>
    <!-- 预览模式 -->
     <div class="gallery-thumbs" v-show="imageListBox.length>1">
        <div class="swiper-container thumbSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in imageListBox" :key="item.imgId">
              <img :src="item.blob"/>
            </div>
          </div>
          <!-- <div class="swiper-button-prev" slot="button-prev" v-show="imageListBox.length>6"></div> -->
          <!-- <div class="swiper-button-next" slot="button-next" v-show="imageListBox.length>6"></div> -->
          <!-- <div class="swiper-pagination swiper-pagination-white"></div> -->
        </div>
      </div>
  </section>
</template>

<script>
// import
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

// mount with global
Vue.use(VueAwesomeSwiper);

export default {
  name: "carrousel",
  data() {
    return {
      imageListBox: [],
    };
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    // swiper() {
    //   return this.$refs.mySwiper.swiper;
    // }
  },
  mounted() {
    //      this.imageListBox = this.$route.params.imgBlob;
    //      let _imgNum = this.$route.params.indexNum;
    //      console.log("nnn"+_imgNum);
    //      // you can use current swiper instance object to do something(swiper methods)
    //      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    ////      console.log('this is current swiper instance object', this.swiper)
    //      this.swiper.slideTo(_imgNum, 1000, false)
    // window.scrollTo(0,0);
    this.imageListBox = this.$route.params.imgBlob;
    // let _imgNum = this.$route.params.indexNum;
    // this.swiper.slideTo(_imgNum, 0, false);
  },
  activated() {

  },
  updated() {
    let index = this.$route.params.indexNum ? this.$route.params.indexNum : 0;
    let topSwiper = new Swiper(".topSwiper", {
      direction: "horizontal",
      zoom: true,
      initialSlide: index,
      pagination : '.swiper-pagination',
      paginationType : 'fraction',
      onInit: function(swiper) {
        console.log(swiper.activeIndex + "当前索引");
        console.log("sipwer初始化完成!,回调函数，初始化后执行。");
        //  setTimeout(function(){
        // $.openPhotoGallery($(".swiper-slide-active").eq(0));
        //  },500);
      },
      onTap: function(swiper, event) {
        console.log(swiper.activeIndex); //swiper当前的活动块的索引
      },
      onSlideChangeStart(swiper) {
        console.log(swiper.activeIndex + "当前索引");
        // setTimeout(function(){
        // $.openPhotoGallery($(".swiper-slide-active").eq(0));
        // },500);
      }
    });

    let thumbSwiper = new Swiper(".thumbSwiper", {
      initialSlide: index,
      spaceBetween: 10,
      direction: "horizontal",
      centeredSlides: true,
      slidesPerView: "auto",
      // touchRatio: 1,
      speed:600,
      // slideToClickedSlide: true,
      observer: true,
      // prevButton: ".swiper-button-prev",
      // nextButton: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
      loopedSlides: 5,
      // pagination: ".swiper-pagination",
      // paginationType: "fraction",
      imgElementCallBack: function() {
        console.log("为每个指定的图片（会触发大图）单击事件绑定回调函数");
      },
      onTap: function(swiper, event) {
        swiper.slideTo(swiper.activeIndex);
      }
    });
    topSwiper.params.control = thumbSwiper; //需要在Swiper2初始化后，Swiper1控制Swiper2
    thumbSwiper.params.control = topSwiper; //需要在Swiper1初始化后，Swiper2控制Swiper1
  },
  methods: {
    imageClickFn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../scss/library/_common-modules";
body,
html {
  height: 100%;
}
.ev-showBigImg {
  height: 100%;
  background-color: #222222;
  .gallery-top {
    height: 87%;
    .swiper-container {
      height: 100%;
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .gallery-thumbs {
    padding: rem(24px) 0;
    opacity: 0.96;
    background: #555555;
    .swiper-slide {
      width: rem(108px);
      height: rem(108px);
      img {
        width: 100%;
        height: 100%;
      }
      &.swiper-slide-active {
        border: rem(4px) solid #2fc5bd;
        width: rem(100px);
        height: rem(100px);
      }
    }
  }
  .swiper-container {
    .swiper-pagination {
      top: rem(20px);
      width: 100%;
      text-align: center;
      position: fixed;
    }
    // .swiper-wrapper {
    //   // height: 100% !important;
    //   .swiper-slide {
    //     .swiper-zoom-container > img {
    //       min-width: 100%;
    //       width: 100%;
    //       vertical-align: middle;
    //       // height: auto !important;
    //     }
    //   }
    // }
  }
}

.ev-showBigImg .swiper-container-autoheight,
.ev-showBigImg .swiper-container-autoheight .swiper-slide {
  height: 100%;
}
.swiper-pagination.swiper-pagination-fraction {
  color: #ffffff;
  top: 0;
  text-align: center;
  height: rem(40px);
}
</style>
