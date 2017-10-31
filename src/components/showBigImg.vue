<template>
  <section class="ev-showBigImg" @click="imageClickFn">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in imageListBox" :key="item.imgId">
        <div class="swiper-zoom-container">
          <img :src="item.blob" alt="" >
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
  </section>
</template>

<script>
  // import
  import Vue from 'vue'
  import VueAwesomeSwiper from 'vue-awesome-swiper'

  // mount with global
  Vue.use(VueAwesomeSwiper);

  // If used in Nuxt.js/SSR, you should keep it only in browser build environment
  // The `Process. BROWSER_BUILD` itself is just a feature, it is only valid in Nuxt.js, you need to modify it according to your own procedures, such as: in vue official ssr scaffolding it should be` process.browser`

//  if (process.BROWSER_BUILD) {
//    const VueAwesomeSwiper = require('vue-awesome-swiper/ssr');
//    Vue.use(VueAwesomeSwiper)
//  }
//  // mount with component(can't work in Nuxt.js/SSR)
//  import { swiper, swiperSlide } from 'vue-awesome-swiper'

//  export default {
//    components: {
//      swiper,
//      swiperSlide
//    }
//  }

  // swiper options example:
  export default {
    name: 'carrousel',
    data() {
      return {
        imageListBox: [],
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          direction : 'horizontal',
          grabCursor : true,
          setWrapperSize :true,
          zoom : true,
//          zoomToggle :false,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationType:'fraction',
          paginationClickable :true,
//          prevButton:'.swiper-button-prev',
//          nextButton:'.swiper-button-next',
//          scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
//            console.log(swiper)
          },
          onSlideChangeStart: function(swiper){
          window.scrollTo(0,0);
          }
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
//      this.imageListBox = this.$route.params.imgBlob;
//      let _imgNum = this.$route.params.indexNum;
//      console.log("nnn"+_imgNum);
//      // you can use current swiper instance object to do something(swiper methods)
//      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
////      console.log('this is current swiper instance object', this.swiper)
//      this.swiper.slideTo(_imgNum, 1000, false)
    },
    activated(){
      window.scrollTo(0,0);
      this.imageListBox = this.$route.params.imgBlob;
      let _imgNum = this.$route.params.indexNum;
      this.swiper.slideTo(_imgNum, 0, false)
    },
    methods:{
      imageClickFn(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  body,html{
    height: 100%;
  }
  .ev-showBigImg{
    height: 100%;
    background-color: black;
    .swiper-container{
      .swiper-pagination{
        top:rem(20px);
        width: 100%;
        text-align: center;
        position: absolute;
      }
      .swiper-wrapper{
        height: 100% !important;
        .swiper-slide{
          float: left;
          &:before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
          }
          .swiper-zoom-container{
            display: inline-block;
            vertical-align: middle;
            width: 100%;
          }
          .swiper-zoom-container > img{
            min-width: 100%;
            width: 100%;
            vertical-align: middle;
            height: auto !important;
          }
        }
      }
    }
  }

  .ev-showBigImg .swiper-container-autoheight, .ev-showBigImg .swiper-container-autoheight .swiper-slide{
    height: 100%;
  }
  .swiper-pagination.swiper-pagination-fraction{
    color: #FFFFFF;
  }
</style>
