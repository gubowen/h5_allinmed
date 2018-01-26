<template>
  <section>
    <section class="feedback-main">
      <section class="question">
        <p class="question-type" v-model="question" @click.stop="suggestionType.A=!suggestionType.A" :class="{checked}"><span>龍神の剣を喰え!</span></p>
        <p class="question-description">品尝神龙之力吧!</p>
        <p class="question-type" v-model="question" @click.stop="suggestionType.B=!suggestionType.B" :class="{checked}"><span>龍が我が敵を喰らう!</span></p>
        <p class="question-description">龙神啊，吞噬我的敌人吧！</p>
        <p class="question-type" v-model="question" @click.stop="suggestionType.C=!suggestionType.C" :class="{checked}"><span>疾きこと風の如く</span></p>
        <p class="question-description">死亡如风，常伴吾身</p>
      </section>
      <button class="btn-primary go-next">Genji</button>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        question:1,
        suggestionType:{
          A:false,
          B:false,
          C:false
        },
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .feedback-main {
    margin-bottom: rem(36px);
    background-color: white;
    padding: rem(27px) rem(36px) rem(29px) rem(14px);
    .question {
      box-sizing: border-box;
      margin-left: 0;
      margin-bottom: rem(38px);
    }
    .check-box {
      margin-top: rem(26px);
      margin-left: rem(14px);
      width: rem(20px);
      height: rem(20px);
      border: 1px solid #CCCCCC;
      border-radius: 2px;
    }
  }
  .question-type {
    padding-top: rem(27px);
    padding-left: rem(14px);
    @include font-dpr(18px);
    color: #333333;
    &.checked{
      &:before{
        background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
        background-size: contain;
      }
    }
    &:before {
      width: rem(40px);
      height: rem(40px);
      display: inline-block;
      background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
      background-size: contain;
      border-radius: rem(2px);
      content: "";
      margin-right: rem(8px);
      vertical-align: middle;
    }
  }
  .question-description {
    padding-top: rem(14px);
    padding-left: rem(60px);
    @include font-dpr(15px);
    color: #666666;
  }
  .go-next {
    width: rem(560px);
    height: rem(100px);
    line-height: rem(100px);
    display: block;
    border-radius: 9999px;
    background: #2FC5BD;
    box-shadow: 0 rem(8px) rem(24px) 0 rgba(47, 197, 189, 0.40);
    text-align: center;
    box-sizing: border-box;
    @include font-dpr(18px);
    color: #fff;
    outline: medium;
    padding: 0;
    margin: rem(0px) auto rem(40px);
  }

</style>

