<template>
  <section class="ev-showBigImg" >
    <!-- 大图模式 -->
    <div class="gallery-top" @click="imageClickFn" :class="{'isAbleDelete':isDelete}">
      <!-- slides -->
      <div class="swiper-container topSwiper">
        <div class="swiper-wrapper" :class="{'noTransition':!isIos}">
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
     <div class="gallery-thumbs" v-show="imageListBox.length>1" :class="{'isAbleDelete':isDelete}">
        <div class="swiper-container thumbSwiper">
          <div class="swiper-wrapper" :class="{'noTransition':!isIos}">
            <div class="swiper-slide" v-for="item in imageListBox" :key="item.imgId">
              <img :src="item.blob"/>
            </div>
          </div>
          <!-- <div class="swiper-button-prev" slot="button-prev" v-show="imageListBox.length>6"></div> -->
          <!-- <div class="swiper-button-next" slot="button-next" v-show="imageListBox.length>6"></div> -->
          <!-- <div class="swiper-pagination swiper-pagination-white"></div> -->
        </div>
      </div>
      <!-- 删除处理 -->
      <div class="gallery-delet" v-if="isDelete">
        <span class="gallery-deletBtn" @click="imageDelete()">删除</span>
        <span class="gallery-computedBtn" @click="imageComputed">完成</span>
      </div>
      <transition name="fade">
        <confirm
          :confirmParams="{
          'ensure':'取消',
          'cancel':'确定',
//          'content':'',
          'title':'确定删除该张图片吗？'
          }" v-if="deletePicTip" :showFlag.sync="deletePicTip" @cancelClickEvent="ensureDeletePic()"
          @ensureClickEvent="cancelDeletePic"></confirm>
      </transition>
  </section>
</template>

<script>
// import
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import confirm from "./confirm";

// mount with global
Vue.use(VueAwesomeSwiper);
let topSwiper = "";
let thumbSwiper = "";
export default {
  name: "carrousel",
  data() {
    return {
      imageListBox: [],
      isDelete: false,
      base64ArrAll: [],
      filesObjAll: [],
      deletArr: [],
      activeStats: false,
      activeIndex: 0,
      deletePicTip:false,
      isIos: navigator.userAgent.toLowerCase().includes("iphone")
    };
  },
  computed: {},
  mounted() {
    this.imageListBox = this.$route.params.imgBlob;
    if (this.$route.params.type == "1") {
      this.base64ArrAll = this.$route.params.base64ArrAll;
      this.filesObjAll = this.$route.params.filesObjAll;
      this.isDelete = true;
    }
  },
  activated() {},
  updated() {
    let _this = this,
      index = "";
      console.log("视图更新中");
    if(_this.deletePicTip){
      return false;
    }
    if (_this.activeStats) {
      index = _this.activeIndex;
    } else {
      index = this.$route.params.indexNum ? this.$route.params.indexNum : 0;
    }
    // 大图
    topSwiper = new Swiper(".topSwiper", {
      direction: "horizontal",
      zoom: false,
      speed: 600,
      initialSlide: index,
      pagination: ".swiper-pagination",
      paginationType: "fraction",
      longSwipesRatio:0.5,
      onDestroy: function(swiper) {
        // alert("你销毁了Swiper;");
      },
      onInit: function(swiper) {
        // console.log(swiper.activeIndex + "当前索引");
        _this.activeIndex = swiper.activeIndex;
      },
      onTap: function(swiper, event) {
        // console.log(swiper.activeIndex); //swiper当前的活动块的索引
      },
      onSlideChangeStart(swiper) {
        // console.log(swiper.activeIndex + "当前索引");
      },
      onSlideChangeEnd(swiper) {
        // setTimeout(function(){
        // $.openPhotoGallery($(".swiper-slide-active").eq(0));
        // },500);
        _this.activeIndex = swiper.activeIndex;
      }
    });
    // 小图
    thumbSwiper = new Swiper(".thumbSwiper", {
      initialSlide: index,
      spaceBetween: 10,
      direction: "horizontal",
      centeredSlides: true,
      longSwipesRatio:0.5,
      slidesPerView: "auto",
      // touchRatio: 1,
      speed: 600,
      slideToClickedSlide: true,
      observer: true,
      // prevButton: ".swiper-button-prev",
      // nextButton: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
      loopedSlides: 5,
      // pagination: ".swiper-pagination",
      // paginationType: "fraction",
      onDestroy: function(swiper) {
        // alert("你销毁了Swiper;");
      },
      imgElementCallBack: function() {
        // console.log("为每个指定的图片（会触发大图）单击事件绑定回调函数");
      },
      onTap: function(swiper, event) {
        swiper.slideTo(swiper.activeIndex);
        _this.activeIndex = swiper.activeIndex;
      }
    });
    topSwiper.params.control = thumbSwiper; //需要在Swiper2初始化后，Swiper1控制Swiper2
    thumbSwiper.params.control = topSwiper; //需要在Swiper1初始化后，Swiper2控制Swiper1
  },
  methods: {
    imageClickFn() {
      this.$router.go(-1);
    },
    imageComputed(){
      this.$router.go(-1);
    },
    imageDelete(){
      let _this = this;
      _this.deletePicTip = true;
       // 销毁swiper
      topSwiper.destroy(false);
      thumbSwiper.destroy(false);
      topSwiper = "";
      thumbSwiper = "";
    },
    ensureDeletePic(){
      let _this = this;
      _this.deletePicTip = false;
      _this.imageDeletFn();
    },
    cancelDeletePic(){
      let _this = this;
      _this.deletePicTip = false;
      _this.activeStats = true;
    },
    imageDeletFn() {
      let _this = this,
        _index = "";
      _this.activeStats = true;
      _this.imageListBox.splice(_this.activeIndex, 1);
      if (_this.isDelete) {
        _this.base64ArrAll.splice(_this.activeIndex, 1);
        _this.filesObjAll.splice(_this.activeIndex, 1);
      }
      _this.imageListBox = this.$route.params.imgBlob;
      //计算激活图片索引
      if (_this.activeIndex > 0) {
        if (_this.activeIndex < _this.imageListBox.length - 1) {
          _this.activeIndex = _this.activeIndex;
        } else {
          _this.activeIndex = _this.imageListBox.length - 1;
        }
      } else {
        _this.activeIndex = 0;
      }
      // 销毁swiper
      // topSwiper.destroy(false);
      // thumbSwiper.destroy(false);
      // topSwiper = "";
      // thumbSwiper = "";

      if (_this.imageListBox.length <= 1) {
        _this.$router.go(-1);
      }
    },
    viewImgInit(imgIndex) {
      let _this = this,
        index = "";
      if (imgIndex) {
        index = imgIndex;
      } else {
        index = this.$route.params.indexNum ? this.$route.params.indexNum : 0;
      }
      // 大图
      topSwiper = new Swiper(".topSwiper", {
        direction: "horizontal",
        zoom: true,
        initialSlide: index,
        pagination: ".swiper-pagination",
        paginationType: "fraction",
        onDestroy: function(swiper) {
          alert("你销毁了Swiper;");
        },
        onInit: function(swiper) {
          console.log(swiper.activeIndex + "当前索引");
          _this.activeIndex = swiper.activeIndex;
          // console.log("sipwer初始化完成!,回调函数，初始化后执行。");
          //  setTimeout(function(){
          // $.openPhotoGallery($(".swiper-slide-active").eq(0));
          //  },500);
        },
        onTap: function(swiper, event) {
          // console.log(swiper.activeIndex); //swiper当前的活动块的索引
          // _this.activeIndex = swiper.activeIndex;
        },
        onSlideChangeStart(swiper) {
          // console.log(swiper.activeIndex + "当前索引");
          // setTimeout(function(){
          // $.openPhotoGallery($(".swiper-slide-active").eq(0));
          // },500);
        },
        onSlideChangeEnd(swiper) {
          // console.log(swiper.activeIndex + "当前索引");
          // setTimeout(function(){
          // $.openPhotoGallery($(".swiper-slide-active").eq(0));
          // },500);
          console.log(swiper.activeIndex); //swiper当前的活动块的索引
          _this.activeIndex = swiper.activeIndex;
        }
      });
      // 小图
      thumbSwiper = new Swiper(".thumbSwiper", {
        initialSlide: index,
        spaceBetween: 10,
        direction: "horizontal",
        centeredSlides: true,
        slidesPerView: "auto",
        // touchRatio: 1,
        speed: 600,
        slideToClickedSlide: true,
        observer: true,
        // prevButton: ".swiper-button-prev",
        // nextButton: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
        loopedSlides: 5,
        // pagination: ".swiper-pagination",
        // paginationType: "fraction",
        onDestroy: function(swiper) {
          alert("你销毁了Swiper;");
        },
        imgElementCallBack: function() {
          // console.log("为每个指定的图片（会触发大图）单击事件绑定回调函数");
        },
        onTap: function(swiper, event) {
          console.log(event);
          swiper.slideTo(swiper.activeIndex);
          console.log(swiper.activeIndex); //swiper当前的活动块的索引
          _this.activeIndex = swiper.activeIndex;
        }
      });
      topSwiper.params.control = thumbSwiper; //需要在Swiper2初始化后，Swiper1控制Swiper2
      thumbSwiper.params.control = topSwiper; //需要在Swiper1初始化后，Swiper2控制Swiper1
    }
  },
  components:{
    confirm
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
        &.noTransition{
          transition: none !important;
        }
        height: 100%;
        .swiper-slide {
          img {
            width: 100%;
          }
        }
      }
    }
    &.isAbleDelete{
      height: 80%;
    }
  }
  .gallery-thumbs {
    display: block !important;
    height: 13%;
    padding: rem(24px) 0;
    opacity: 0.96;
    background: #555555;
    box-sizing: border-box;
    .swiper-container.thumbSwiper.swiper-container-horizontal{
      height: 100%;
    }
    .swiper-slide {
      width: rem(108px);
      // height: rem(108px);
      height: 94%;
      img {
        width: 100%;
        height: 100%;
      }
      &.swiper-slide-active {
        box-sizing: border-box;
        border: rem(4px) solid #2fc5bd;
        width: rem(100px);
        height: 94%;
      }
    }
    &.isAbleDelete{
      height: 12%;
      padding: 3% 0;
      border-bottom: rem(2px) solid #000000;
    }
  }
  .gallery-delet {
    height: 8%;
    position: relative;
    opacity: 0.96;
    background: #555555;
    .gallery-deletBtn {
      color: #ffffff;
      @include font-dpr(16px);
      width: rem(80px);
      height: rem(32px);
      // padding: rem(16px) rem(30px);
      position: absolute;
      top: 50%;
      // bottom: rem(16px);
      left: rem(30px);
      margin-top: rem(-22px);
    }
    .gallery-computedBtn{
      color: #ffffff;
      @include font-dpr(16px);
      width: rem(120px);
      height: rem(62px);
      background-color: #2FC5BD;
      text-align: center;
      position: absolute;
      top: 50%;
      // bottom: rem(16px);
      right: rem(30px);
      margin-top: rem(-32px);
      border-radius: rem(4px);
      line-height: rem(62px);
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
