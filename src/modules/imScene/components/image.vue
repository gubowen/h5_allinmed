<template>
  <section class="main-message-box">
    <article class="main-message-box-item my-message" data-clientid="9c5718e331459678f2a759f16c90dd7c">
      <i class="fail-button" style="display:none">
        <img src="/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content image-message">
        <section class="middle-tip-box" v-if="progress.uploading">
          <figure class="middle-tip-box-text">
            <img class="notShow" src="//m.allinmed.cn/image/img00/patientConsult/symptom_photo_loading@2x.png"
                 alt="loading..."
                 @click="">
            <figcaption class="progress"><p>{{progress.progress}}</p></figcaption>
          </figure>
        </section>
        <img class="im-image" @click="showBigImg" :src="imageMessage.file.url" alt="" style="border-radius: 0.28rem">
      </figcaption>
      <figure class="main-message-img">
        <img :src="logoUrl" alt="">
      </figure>
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
   * Created by qiangkailiang on 2017/8/17.
   */
  export default{
    data(){
      return {}
    },
    computed: {
      logoUrl(){
        return this.$store.state.logoUrl
      },
      progress(){
        if (this.currentIndex===this.imageProgress.index){
          return this.imageProgress;
        }else{
          return {
            uploading: false,
            progress: 0,
            index: 0
          }
        }
      }
    },
    mounted(){
      this.imageNum = "";
      if (!this.imageMessage.file.url.includes("blob:")){
        let qualityUrl = this.nim.viewImageQuality({
          url: this.imageMessage.file.url,
          quality: 40
        });
        this.imageMessage.file.url = qualityUrl;
        this.imageNum = this.imageList.indexOf(qualityUrl);
      }
      setTimeout(() => {
        document.body.scrollTop = Math.pow(10, 10);
      }, 100);


    },
    methods: {
      showBigImg(item, index){
        let that = this;
        let _params = {
          imgBlob: (function () {
            let result = [];
            that.imageList.forEach((element, index) => {
              result.push({blob: element});
            });
            return result;
          }()),
          indexNum: this.imageList.indexOf(this.imageMessage.file.url)
        };
        this.$router.push({
          name: "showBigImg",
          params: _params
        });
      }
    },
    props: {
      imageMessage: {
        type: Object
      },
      nim: {
        type: Object
      },
      imageList: {
        type: Array
      },
      imageProgress: {
        type: Object
      },
      currentIndex: {
        type: Number
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
