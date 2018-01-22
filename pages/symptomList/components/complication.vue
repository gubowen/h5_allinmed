<template>
  <section class="main-inner symptom-list-wrapper fix-complication" style="height: 100%;">
    <section class="main-inner symptom-list fix">
      <section class="tc-caseContentBox">
        <figure class="medical-content">
          <header class="consult-inner-title">
            <h2><span>还有其它不舒服的吗？</span></h2>
          </header>
          <textarea class="input-textarea" placeholder="请描述，如没有请填无" v-model="complication"></textarea>
        </figure>
        <button class="btn-primary finish" @click="ensureEvent">确定修改</button>
        <button class="cancel" @click="cancelEvent">取消</button>
      </section>
    </section>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/3.
   */
  export default{
    data(){
      return {
        complication: ""
      }
    },
    mounted(){

      if (this.$route.params.complication) {
        this.complication = this.$route.params.complication;
      }
    },
    methods: {
      cancelEvent(){
        this.$router.push({
          name: this.$route.params.from,
          query:this.$route.query.query
        })
      },
      ensureEvent(){
        this.$router.push({
          name: this.$route.params.from,
          params:{
            complication:this.complication
          },
          query:this.$route.params.query
        })
      }
    },

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";


  .consult-inner-title {
    /*padding: rem(60px) rem(60px);*/
    padding-bottom: rem(50px);
    & > h2 {
      @include font-dpr(20px);
      color: #222222;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        @include circle(rem(16px), #2FC5BD);
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

  .tc-caseContentBox {

    padding: rem(30px);
  }

  .fix {
    height: 100%;
    background: #E6E6ED;
    .finish {
      box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.40);
      margin: 0 auto;
      margin-top: rem(78px);
      margin-bottom: rem(52px);
      height: rem(100px);
      width: rem(560px);
      display: block;
    }
    .cancel {
      @include font-dpr(18px);
      text-align: center;
      color: #909090;
      width: 100%;
    }
  }
  .fix-complication{
    .medical-content {
      width: 100%;

      background-color: #fff;
      border-radius: rem(16px);
      padding: rem(30px) rem(64px);
      padding-bottom: 0;
      box-sizing: border-box;
      p {
        @include font-dpr(14px);
        color: #909090;
        overflow: hidden;
        padding-top: rem(44px);
        padding-bottom: rem(60px);
      }
      textarea {
        width: 100%;
        background-color: #fff;
        resize: none;
        outline: medium;
        border: none;
        border-radius: rem(16px);
        height: 2rem;
        margin: 0;
        @include font-dpr(18px);
        color: #333333;
        @include placeholder() {
          color: #AAAAAA;
        }
      }

    }
  }
</style>
