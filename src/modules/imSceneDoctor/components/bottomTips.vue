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
  import api from "common/js/util/util";
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
            this.renderMessage = "抱歉~由于主诊医生出诊、手术日程繁忙，未能及时接诊，已为您退诊；如需继续等待，请重新支付。";
            break;
          case 1://问诊已结束...问诊时间结束或问诊次数归零
            this.renderMessage = "您的问诊已结束，若希望继续问诊，请点击下方按钮完成支付后继续沟通。";
            break;
          case 2://医生拒绝咨询
            if (api.getPara().from === "report") {
              this.renderMessage = "抱歉~您的问诊请求未能得到主诊专家的接诊确认，已为您退诊。";
            }else{
              this.renderMessage = "抱歉~您的问诊请求未能得到主诊医生的接诊确认，已为您退诊；点击下方按钮，我们会重新为您推荐医生。";
            }
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
      font-size: rem(30px);
      color: #e5e5e5;
      line-height: 1.4;
    }
  }
</style>
