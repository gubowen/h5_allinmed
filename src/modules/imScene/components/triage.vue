<template>
  <section class="main-message-box">
    <!--<article class="main-message-box-item others-message">-->
      <!--<figure class="main-message-img">-->
        <!--<img src="//m.allinmed.cn/image/imScene/chatting_portrait_system@2x.png" alt="">-->
      <!--</figure>-->
      <!--<figcaption class="check-suggestion message-result" data-role="videoTriage"-->
                  <!--@click="goToUpload(triageMessage.data.type)">-->
        <!--<article class="message-result-item">-->
          <!--<header class="message-result-item-title">视诊</header>-->
          <!--<section class="message-result-item-message">-->
            <!--<p class="check-suggestion-item">-->
              <!--<span>{{triageMessage.data.content}}</span>-->
            <!--</p>-->
          <!--</section>-->
        <!--</article>-->
      <!--</figcaption>-->
    <!--</article>-->

    <!--视诊新样式-->
    <article class="video-triage-box">
      <figure class="video-triage-content">
        <span>{{triageMessage.data.content}}</span>
      </figure>
      <figcaption class="video-triage-btn" data-role="videoTriage"
                  @click="goToUpload(triageMessage.data.type)">
                上传{{triageMessage.data.type==1?"视频":"图片"}}
      </figcaption>
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
   * Created by lichenyang on 2017/8/23.
   */
  export default{
    data(){
      return {}
    },
    mounted(){
//      type2图片 1视频
      console.log(this.triageMessage)
    },
    methods: {
      goToUpload(type){
        sessionStorage.removeItem("triageRoute");
        this.$router.push({
          name: "TriageDetail",
          params: this.triageMessage.data
        })
      }
    },
    props: {
      triageMessage: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
  @import "../../../../scss/library/_common-modules";
  .video-triage-box{
    width: rem(690px);
    margin: 0 auto;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E4E9EB;
    border-radius: rem(12px);
    padding: rem(70px) rem(60px);
    .video-triage-content{
      color: #333333;
      letter-spacing: 0;
      @include font-dpr(17px);
      font-weight: 600;
    }
    .video-triage-btn{
      background: #2FC5BD;
      border-radius: 999px;
      width: rem(560px);
      margin: rem(56px) auto 0px;
      color: #FFFFFF;
      text-align: center;
      @include font-dpr(18px);
      padding: rem(30px) 0;
      line-height: 1;
    }
  }
</style>
