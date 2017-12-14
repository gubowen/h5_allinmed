<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :class="{'active':currentPageIndex===index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
/**
     * @Desc：Vue-slider
     * @Usage:
     * @Notify：
     * @Depend：better-scroll
     *
     * Created by qiangkailiang on 2017/7/21.
     */

function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
}

function hasClass(el, className) {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");

  return reg.test(el.className);
}

import BScroll from "better-scroll";
export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  watch: {
    dataList() {
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._play();
        }
      }, 20);
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
    window.addEventListener("resize", () => {
      if (!this.slider || !this.slider.enabled) {
        return;
      }
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._onScrollEnd();
        } else {
          if (this.autoPlay) {
            this._play();
          }
        }
        this.refresh();
      }, 60);
    });
  },
  activated() {
    if (this.slider) {
      this.slider.enable();
      let pageIndex = this.slider.getCurrentPage().pageX;
      if (pageIndex > this.dots.length) {
        pageIndex = pageIndex % this.dots.length;
      }
      this.slider.goToPage(pageIndex, 0, 0);
      if (this.loop) {
        pageIndex -= 1;
      }
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    }
  },
  deactivated() {
    this.slider.disable();
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    this.slider.disable();
    clearTimeout(this.timer);
  },
  methods: {
    refresh() {
      if (this.slider) {
        this._setSliderWidth(true);
        this.slider.refresh();
      }
    },
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        click:true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      });
      this.slider.on("scrollEnd", this._onScrollEnd);
      this.slider.on("touchend", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
      this.slider.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _onScrollEnd() {
      let pageIndex = this.slider.getCurrentPage().pageX;
      if (this.loop) {
        pageIndex -= 1;
      }
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      let pageIndex = this.slider.getCurrentPage().pageX + 1;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  }
};
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../scss/library/_common-modules";
.slider {
  min-height: 1px;
  overflow: hidden;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;

        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: rem(80px);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: rem(16px);
      height: rem(16px);
      border-radius: 50%;
      background: #e5e5e5;
      transition: width 0.3s linear;
      transform-origin: 50% 50%;
      &.active {
        border-radius: 50%;
        background: #00d6c6;
      }
    }
  }
}
</style>
