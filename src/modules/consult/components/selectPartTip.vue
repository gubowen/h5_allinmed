<template>
  <transition name="fade">
    <section class="select-part-tips" v-if="tipsShow&&hasWatched" :class="[{'on':tipsShow},patientBody]"
             @click="$emit('update:tipsShow' , false)">
      <figure class="tips-image-box">
        <div class="img-masker"></div>
        <img :src="moveDone ? clickImg[patientBody] : bodyImg[patientBody]" alt="">
      </figure>
      <figure class="tips-image-finger">
        <img src="../../../common/image/img00/selectPartTip/hand.png" alt="">
      </figure>
    </section>
  </transition>
</template>

<script>
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Qiangkailiang on 2018/1/23.
   */
  import {mapState} from "vuex";
  import ajax from "common/js/util/ajax";

  const XHRList = {
    getMedicalList: "/mcall/customer/patient/case/v1/getMapList/",
  };
  export default {
    data() {
      return {
        bodyImg: {
          man: require('../../../common/image/img00/selectPartTip/man.png'),
          woman: require('../../../common/image/img00/selectPartTip/woman.png'),
          kid: require('../../../common/image/img00/selectPartTip/child.png')
        },
        clickImg: {
          man: require('../../../common/image/img00/selectPartTip/man_click.png'),
          woman: require('../../../common/image/img00/selectPartTip/woman_click.png'),
          kid: require('../../../common/image/img00/selectPartTip/child_click.png')
        },
        moveDone: false,
        hasWatched: !localStorage.getItem("watchedTips")
      }
    },
    props: {
      tipsShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState(["patientBaseMessage"]),
      patientBody() {
        const age = parseInt(this.patientBaseMessage.age);
        const sex = parseInt(this.patientBaseMessage.sex);
        if (age <= 12) {
          return "kid";
        } else {
          if (sex === 1) {
            return "man";
          } else {
            return "woman";
          }
        }
      }
    },
    mounted() {
      if (!localStorage.getItem("watchedTips")){
        this.getPatientCase();
      }
    },
    methods: {
      getPatientCase() {
        const that = this;
        ajax({
          url: XHRList.getMedicalList,
          method: "POST",
          data: {
            patientId: this.patientBaseMessage.patientId,
            attUseFlag: 1,
            isOrder: 0,
            firstResult: 0,
            maxResult: 1
          },
          done(data) {
            if (data.responseObject.responseMessage) {
              that.$emit("update:tipsShow", true);
              setTimeout(() => {
                that.moveDone = true;
              }, 1000);
            } else {
              that.$emit("update:tipsShow", false);
            }
            localStorage.setItem("watchedTips", 1);
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .select-part-tips {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 7;
    .tips-image-box {
      width: 100%;
      height: 100%;
      & > img {
        width: 100%;
        vertical-align: top;
        background-color: rgba(0,0,0,0.6);
      }
      & > .img-masker{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;

      }
    }
    .tips-image-finger {
      position: absolute;
      right: 0.6rem;
      top: 5.5rem;
      width: rem(160px);
      height: rem(186px);
      opacity: 0;
      & > img {
        width: 100%;
        vertical-align: top;
      }
    }
  }

  .select-part-tips.on {
    &.man {
      .tips-image-finger {
        animation: finger-transform-man 0.5s 0.2s linear forwards;
      }
    }
    &.woman {
      .tips-image-finger {
        animation: finger-transform-woman 0.5s 0.2s linear forwards;
      }
    }
    &.kid {
      .tips-image-finger {
        animation: finger-transform-kid 0.5s 0.2s linear forwards;
      }
    }
  }

  @keyframes finger-transform-man {
    0% {
      transform: translate(0 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translate(-60%, -.2rem);
    }
  }

  @keyframes finger-transform-woman {
    0% {
      transform: translate(0 0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translate(-1.5rem, -0.2rem);
    }
  }

  @keyframes finger-transform-kid {
    0% {
      opacity: 0;
      transform: translate(0 0);
    }
    100% {
      opacity: 1;
      transform: translate(-1.3rem, 1.8rem);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

</style>
