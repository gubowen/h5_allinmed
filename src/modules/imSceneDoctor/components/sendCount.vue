<template>
  <section class="send-count-box">
    <article class="send-count">
      <span>{{doctorName}}医生赠送了您</span>
      <em>3</em>
      <span>条回复</span>
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
  .send-count-box{
    text-align:center;
  }
  .send-count {
    display:inline-block;
    background: #EDEEEE;
    border-radius: rem(12px);
    font-size: 0;
    margin: 0 rem(60px);
    padding: rem(20px) rem(30px);
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
