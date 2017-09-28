<template>
  <div>
    <section class="main-message-box grey-tips" v-if="tipsType==5">
      <figcaption class="first-message">
        <p>医生回复仅为建议，具体治疗需前往医院进行</p>
      </figcaption>
    </section>
    <p class="receive-treatment"><span>{{tipsContent}}</span></p>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/25.
   */
  export default{
    data(){
      return {
        tipsContent: ""
      }
    },
    mounted(){

      switch (this.tipsType) {
        case 4://医生接诊
          this.tipsContent = "问诊已开始";
          break;
        case 5:
          this.tipsContent = "问诊已结束";
          break;
      }
    },
    methods: {},
    props: {
      tipsType: {
        type: Number
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .receive-treatment {
    padding: rem(36px) 0;
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
