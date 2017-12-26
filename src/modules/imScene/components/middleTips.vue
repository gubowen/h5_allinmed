<template>
  <div>
    <section class="main-message-box grey-tips">
      <figcaption class="first-message">
        <p>{{tipsContent}}</p>
      </figcaption>
    </section>
    <p v-if="tipsType !==4" class="receive-treatment"><span>问诊已结束</span></p>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by lichenyang on 2017/9/7.
   */
  export default{
    data(){
      return {
        tipsContent: "",
      }
    },
    mounted(){

      switch (this.tipsType) {
        case 4://医生接诊
          this.tipsContent = "您已重新购买分诊医生的问诊，可重新提问";
          break;
        case 5:
          this.tipsContent = "分诊医生的职责是为您完善就诊病历信息，诊疗意见请在分诊后与主诊专家详细沟通。";
        case 6:
          this.tipsContent = this.tipsText;
          break;
      }
    },
    methods: {},
    props: {
      tipsType: {
        type: Number
      },
      tipsText: {
        type: String
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .grey-tips{
    text-align: center;
  }
  .receive-treatment {
    text-align: center;
    &:before, &:after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: rem(238px);
      height: rem(16px);
    }
    &:before {
      background: url("../../../common/image/imScene/left_start_or_finish@2x.png");
      background-size: contain;
    }
    &:after {
      background: url("../../../common/image/imScene/right_start_or_finish@2x.png");
      background-size: contain;
    }
    span {
      @include font-dpr(13px);
      color: #AAAAAA;
      display: inline-block;
      vertical-align: middle;
      padding: 0 rem(12px);
    }
  }
</style>
