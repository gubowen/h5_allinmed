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
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');

        return reg.test(el.className)
    }

    import BScroll from "better-scroll";
    export default{
        data(){
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
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
            }
        },
        mounted(){
            setTimeout(() => {
                this._initSlider();
            }, 20);

            window.addEventListener("resize", () => {
                if (!this.slider) {
                    return;
                }

                this._setSliderWidth(true);
                this.slider.refresh();
            })
        },
        methods: {
            _setSliderWidth(isResize){
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
                this._initDots();
            },
            _initDots(){
                this.dots = new Array(this.children.length);
            },
            _initSlider(){
                this._setSliderWidth(false);
                if (this.autoPlay) {
                    this._play();
                }
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshLoop: 0.3,
                    snapSpeed: 400
                });

                this.slider.on("scrollEnd", () => {
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    if (this.loop) {
                        pageIndex -= 1;
                    }

                    this.currentPageIndex = pageIndex;

                    if (this.autoPlay) {
                        clearTimeout(this.timeout);
                        this._play();
                    }
                })
            },
            _play(){
                let pageIndex = this.currentPageIndex + 1;
                if (this.loop) {
                    pageIndex += 1;
                }

                this.timeout = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval);
            }
        },
        destoryed(){
            clearTimeout(this.timeout);
        }

    }
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules";
    .slider {
        min-height: 1px;
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
                background: #E5E5E5;
                transition: width 0.3s linear;
                transform-origin: 50% 50%;
                &.active {
                    border-radius: 50%;
                    background: #00D6C6;
                }
            }
        }
    }
</style>
