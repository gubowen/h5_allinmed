<template>
  <section class="main-inner symptom-list-wrapper fix-medical" style="height: 100%;">
    <section class="main-inner symptom-list fix">
      <section class="tc-caseContentBox">
        <figure class="medical-content">
          <textarea v-model="medicalMessage" placeholder="填写药物名称"></textarea>
          <p>(填写示例：三七片、接骨七厘散)</p>
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
   * Created by qiangkailiang on 2017/8/1.
   */
  export default{
    data(){
      return {
        medicalMessage: ""
      }
    },
    mounted(){

      if (this.$route.params.content) {

        this.medicalMessage = this.$route.params.content;
        console.log(this.$route.params)
      }
    },
    methods: {
      cancelEvent(){
        this.$router.push({
          name: this.$route.params.from,
          query:this.$route.query
        })
      },
      ensureEvent(){
        this.$router.push({
          name: this.$route.params.from,
          params:{
            medicalMessage:this.medicalMessage
          },
          query:this.$route.query
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

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

  .fix-medical{
    .medical-content {
      padding:rem(60px);
      margin:rem(32px) rem(32px) 0;
      background:#fff;
      border-radius: rem(16px);
      p {
        margin-top:rem(20px);
        color: #909090;
        @include font-dpr(14px);
        opacity: 0.3;
      }
      textarea {
        width:100%;
        height:rem(140px);
        line-height:rem(52px);
        outline: none;
        border:none;
        border-bottom:1px solid #F4F4F4;
        color:#333;
        @include font-dpr(18px);
        @include placeholder() {
          color: #AAAAAA;
        }
      }

    }
  }
</style>
