<template lang="html">
    <div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <section class="inner" :style="{ transform: 'translateY(' + top + 'px)' }">
            <header class="pull-refresh">
                <slot name="pull-refresh">
                    <span class="down-tip">下拉更新</span>
                    <span class="up-tip">松开刷新数据</span>
                    <span class="refresh-tip">加载中……</span>
                </slot>
            </header>
            <slot>
            </slot>
            <footer class="load-more" v-show="loadMoreShow">
                <slot name="load-more">
                    <span v-show="downFlag === false">上拉加载更多</span>
                    <span v-show="downFlag === true">加载中……</span>
                </slot>
            </footer>
            <!--<div class="nullData" v-show="dataList.noFlag">暂无更多数据</div>-->
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by wangjingrong on 2017/8/29.
   */
    export default {
        props: {
            offset: {
                type: Number,
                default: 100 //默认高度
            },
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {
                type: Boolean,
                default: true
            },
            onRefresh: {
                type: Function,
                default: undefined
            },
            onInfinite: {
                type: Function,
                default: undefined
            }
        },
        data() {
            return {
                top: 0,
                state: 0,
                startY: 0,
                loadMoreShow:false,
                touching: false,
                infiniteLoading: false,
                downFlag: false, //用来显示是否加载中
            }
        },
        methods: {
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY;
                this.startScroll = this.$el.scrollTop || 0;
                this.touching = true; //留着有用，不能删除
//                this.dataList.noFlag = false;
//                this.loadMoreShow = true;
//                this.$el.querySelector('.load-more').style.display = 'block';
            },
            touchMove(e) {
                //下拉刷新
                if(!this.enableRefresh || !this.touching) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
                if(diff > 0) e.preventDefault();
                this.top = diff + (this.state === 2 ? this.offset : 0)
                if(this.top > 200) this.top = 200;
                if(this.state === 2) return;
                if(this.top >= this.offset) {
                    this.state = 1
                } else {
                    this.state = 0
                }

//                let more = this.$el.querySelector('.load-more');
//                if(!this.top && this.state === 0) {
//                    this.loadMoreShow = true;
////                    more.style.display = 'block';
//                } else {
//                    this.loadMoreShow = false;
////                    more.style.display = 'none';
//                }
            },
            touchEnd(e) {
                if(!this.enableRefresh) return;
                this.touching = false;
                if(this.top >= this.offset) {
                    this.refresh()
                } else {
                    this.state = 0
                    this.top = 0
                }

                if(!this.enableInfinite || this.infiniteLoading) return;

                let outerHeight = this.$el.clientHeight,
                    innerHeight = this.$el.querySelector('.inner').clientHeight,
                    scrollTop = this.$el.scrollTop,
                    ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
                    bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

                console.log(bottom + " __ " + this.offset)

                if(bottom <= this.offset && this.state === 0) {
                    this.downFlag = true;
                    this.infinite();
                } else {
                    this.loadMoreShow = false;
//                    this.$el.querySelector('.load-more').style.display = 'none';
                    this.downFlag = false;
                }

            },
            refresh() {
                this.state = 2;
                this.top = this.offset;
                setTimeout(() => {
                    this.onRefresh(this.refreshDone)
                }, 1000);
            },
            refreshDone() {
                this.state = 0
                this.top = 0
            },
            infinite() {
                this.infiniteLoading = true

                setTimeout(() => {
                    this.onInfinite(this.infiniteDone);
                }, 2000);
            },
            infiniteDone() {
                this.infiniteLoading = false
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .yo-scroll {
    transition: all 0.5s linear;
    .inner {
      width:100%;
      position: absolute;
      top: -(rem(200px));
      left:0;
      @include font-dpr(16px);
      transition: all 0.5s linear;
      .pull-refresh {
        width: 100%;
        line-height: rem(200px);
        text-align: center;
      }
      .load-more {
        height: 5rem;
        line-height: 5rem;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        display: none;
      }
      .nullData {
        //暂无更多数据样式
        @include font-dpr(16px);
        color: #999999;
        height: 100px;
        line-height: 80px;
        text-align: center;
      }
      .down-tip,
      .refresh-tip,
      .up-tip {
        display: none;
      }
      .up-tip:before,
      .refresh-tip:before {
        content: '';
        display: inline-block;
        width: 160px;
        height: 70px;
        background-size: 70% !important;
        position: absolute;
        top: 0;
        left: 20%;
      }
    }
  }

  .yo-scroll.touch .inner {
    transition-duration: 0.5s;
  }

  .yo-scroll.down .down-tip {
    display: block;
  }

  .yo-scroll.up .up-tip {
    display: block;
  }

  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
</style>
