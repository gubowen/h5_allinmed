<template>
  <article class="send-count">
    <span>{{doctorName}}医生送给您</span>
    <em>3</em>
    <span>次免费回答机会</span>
  </article>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/29.
   */
  export default{
    computed: {
      doctorName(){
        return this.$store.state.targetMsg.nick;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .send-count {
    background: #EDEEEE;
    border-radius: rem(12px);
    font-size: 0;
    text-align: center;
    margin: 0 rem(148px);
    padding: rem(20px) rem(15px);
    box-sizing: border-box;
    & > span {
      color: #AAAAAA;
      @include font-dpr(13px);
      vertical-align: middle;
    }
    & > em {
      font-style: normal;
      @include font-dpr(13px);
      color: #FF7171;
      vertical-align: middle;
      padding: 0 rem(8px);
    }
  }
</style>
