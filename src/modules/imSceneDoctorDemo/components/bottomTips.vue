<template>
  <section class="bottom-tips-wrapper">
    <article class="bottom-tips-text">
      {{renderMessage}}
    </article>
  </section>
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
        renderMessage: ""
      }
    },
    mounted(){
      this.selectRenderMessage();
    },
    methods: {
      selectRenderMessage(){
        let type = this.bottomTipsType;
        switch (type) {
          case -1://超时未接诊...剩余接诊时间小于0
            this.renderMessage = "抱歉~由于医生未及时接诊，已为您退诊；若需继续问诊，请点击下方按钮重新支付。";
            break;
          case 1://问诊已结束...问诊时间结束或问诊次数归零
            this.renderMessage = "您的问诊已结束。若还有问题，请点击下方按钮继续沟通。";
            break;
          case 2://医生拒绝咨询
            this.renderMessage = "抱歉~由于您提交的病情不在医生问诊范围内，已为您退诊，您可以点击按钮，重新为您推荐对症医生。";
            break;
        }
      }
    },
    props: {
      bottomTipsType: {
        type: Number
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .bottom-tips-wrapper {
    width: rem(750px);
    height: rem(238px);
    position: fixed;
    bottom: 1.3rem;
    left: 0;
    right: 0;
    background: url("../../../common/image/imScene/below_the_tip @2x.png");
    background-size: contain;
    .bottom-tips-text {
      position: absolute;
      left: rem(202px);
      right: rem(75px);
      top: 50%;
      transform: translateY(-50%);
      margin-top: rem(18px);
      font-size:rem(30px);
      color: #e5e5e5;
      line-height: 1.4;
    }
  }
</style>
