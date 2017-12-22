<template>
  <div>
    <section class="consult-main-inner" :class="{'isMB':!isWeChat}">
      <progerssBar :progerssBarParams="{progerssParams:'4'}"></progerssBar>
      <transition name="fade">
        <section class="consult-wrapper">
          <section class="consult-inner">
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>填写病情描述</span>
                </h2>
                <p>有什么要对医生说的，如：诱因，症状，身 体现状，病情加重或缓解情况</p>
              </header>

              <figure class="input-area">
                <textarea class="input-textarea" placeholder="请输入至少10个字" v-model.trim="disContent" @input></textarea>
                <p class="text-num-tips">{{disContent.length}}/1000</p>
              </figure>
            </section>
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>想要医生提供帮助</span>
                </h2>
                <p>可向医生咨询如何控制病情，是否需要手术等...</p>
              </header>

              <figure class="input-area">
                <textarea class="input-textarea" placeholder="请输入至少6个字" v-model="helpContent"></textarea>
                <p class="text-num-tips">{{helpContent.length}}/1000</p>
              </figure>
            </section>
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>请填写你的身高体重</span>
                </h2>
                <p>方便医生判断病情</p>
              </header>

              <figure class="input-area">
                <textarea class="input-textarea" placeholder="请输入至少10个字"></textarea>
                <!--<p class="text-num-tips" v-show="getByteLen(complication)<=100">-->
                <!--{{getByteLen(complication)}}</p>-->
              </figure>
            </section>
          </section>
          <button data-alcode='e127' class="btn-primary to-second">提交</button>
          <transition name="fade">
            <toast :content="errorMsg" v-if="errorShow"></toast>
          </transition>
        </section>
      </transition>

    </section>
  </div>
</template>

<script>
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Qiangkailiang on 2017/12/20.
   */
  import api from "common/js/util/util";
  import loading from "components/loading";
  import toast from "components/toast";
  import confirm from "components/confirm";
  import progerssBar from "../components/progressBar";
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import autosize from "autosize";

  export default {
    data() {
      return {
        errorMsg: "",
        errorShow: false,
        finish: false,
        disContent: "",
        helpContent: "",
        isWeChat: true
      }
    },
    methods: {
      contentLimit(element,limit){
        let ranges = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

        if (ranges.test(this[element])) {
          this.complication = this[element].replace(ranges, "");
        }
        let content = this[element];
        if (api.getByteLen(content) > 2*limit) {
          this.complication = api.getStrByteLen(content, 2*limit);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          this.errorMsg = `最多只能输入${limit}字`;
          return false;
        }
      }
    },
    mounted() {
      siteSwitch.weChatJudge(() => {
        this.isWeChat = true;
      }, () => {
        this.isWeChat = false;
      });


      this.$nextTick(() => {
        setTimeout(() => {
          Array.from(this.$el.querySelectorAll("textarea")).forEach((element, index) => {
            autosize(element);
            autosize.update(element);
          });
        }, 1000);
      });
    },
    props: {},
    components: {
      progerssBar,
      loading,
      toast,
      confirm
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .isMB {
    padding-bottom: rem(100px);
  }

  .consult-main-inner {
    background: url("../../../common/image/background_wave.png") no-repeat bottom center #f2f2f2;
    background-size: 100% rem(272px);
    box-sizing: border-box;
  }

  .consult-wrapper {
    padding: rem(30px);
  }

  .consult-total {
    .input-area {
      background-color: #e5e5e5;
      position: relative;
      padding: rem(64px) rem(64px);
      padding-bottom: rem(122px);
      .text-num-tips {
        position: absolute;
        right: rem(30px);
        bottom: rem(36px);

        color: #aaaaaa;
        @include font-dpr(15px);
      }
      & > textarea {
        outline: medium;
        resize: none;
        width: 100%;
        height: 0.6rem;
        max-height: 1.7rem;
        border: none;
        background: none;
        @include font-dpr(16px);
        color: #333333;
        @include placeholder() {
          @include font-dpr(16px);
          color: #AAAAAA;
        }
      }
    }
  }

  body,
  html {
  }

  .consult-inner {
    background: #ffffff;
    border-radius: rem(16px);
    padding-bottom: rem(100px);
    .consult-page {
      position: absolute;
      right: 0;
      top: 0;
      width: rem(86px);
      height: rem(64px);
      &.page-one {
        background: url("../../../common/image/img00/consult_V1.2/page number@2x.png");
        background-size: contain;
      }
      &.page-two {
        background: url("../../../common/image/img00/consult_V1.2/pagenumber02@2x.png");
        background-size: contain;
      }
    }
  }

  .consult-total {
    .consult-inner-title {
      padding: rem(60px) rem(60px);
      padding-bottom: rem(50px);
      & > p {
        @include font-dpr(15px);
        color: #555555;
        margin-top: rem(10px);
      }
      & > h2 {
        @include font-dpr(20px);
        color: #222222;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          @include circle(rem(16px), #2fc5bd);
          top: 50%;
          margin-top: rem(-8px);
          margin-left: rem(-32px);
        }
        span {
          vertical-align: middle;
        }
        & > em {
          @include font-dpr(16px);
          color: #666666;
          font-style: normal;
          font-weight: normal;
          vertical-align: middle;
        }
      }
    }
  }

  .consult-question-inner {
    .detail-tips {
      @include font-dpr(14px);
      color: #07b6ac;
      vertical-align: middle;
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: rem(48px);
        height: rem(48px);
        background: url(../../../common/image/img00/consult_V1.2/doubt2@2x.png);
        background-size: contain;
        margin-left: rem(28px);
      }
    }
    &.mSelector {
      .selected {
        & > .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
          background-size: contain;
        }
      }
      .icon-select {
        background: url("../../../common/image/img00/consult_V1.2/multiplechoice_off@2x.png");
        background-size: contain;
      }
    }
    &.select-item {
      .icon-select {
        width: rem(36px);
        height: rem(36px);
        background: url("../../../common/image/img00/consult_V1.2/arrow@2x.png");
        background-size: contain;
      }
    }
    &.sSelector {
      .selected {
        & > .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/radio_on@2x.png");
          background-size: contain;
        }
      }
      .icon-select {
        background: url("../../../common/image/img00/consult_V1.2/radio_off@2x.png");
        background-size: contain;
      }
    }
    .consult-question-item {
      &.selected > p {
        color: #07b6ac;
      }
      padding: rem(38px) rem(60px);
      &.dark {
        background-color: rgba(239, 239, 239, 0.3);
      }
      & > .icon-select {
        width: rem(48px);
        height: rem(48px);
        float: right;
      }
      & > p {
        @include font-dpr(18px);
        color: #333333;
        display: inline-block;
        max-width: 80%;
        @include ellipsis();
        vertical-align: middle;
      }
    }
  }

  .welcome-tips {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    z-index: 5;
    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
    & > figure {
      display: inline-block;
      vertical-align: middle;
      width: rem(716px);
      height: rem(760px);
      position: relative;
      & > img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
      .welcome-tips-ensure {
        width: 66.7%;
        position: absolute;
        bottom: rem(96px);
        padding: rem(30px) 0;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 rem(4px) rem(12px) 0 rgba(74, 74, 74, 0.5);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fadeDown-enter-active,
  .fadeDown-leave-active {
    opacity: 1;
    transition: all ease-in-out 0.4s;
  }

  .fadeDown-enter,
  .fadeDown-leave-to {
    opacity: 0;
  }
</style>
