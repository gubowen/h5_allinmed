<template>
  <section>
    <video ref="video" class="player" autoplay controls="controls" :src="videoUrl"></video>
    <button >播放</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
        videoUrl:'',
    }
  },
  computed: {
    
  },
  props: {
    
  },
  mounted() {
    this.videoUrl = this.$route.params.url;
    // this.$refs.video.play();
    setTimeout( () =>{
        console.log('播放')
        document.querySelector('.player').play();
    },2000)
    console.log(document.querySelector('.player'))
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules";
  // video{
  //   width: rem(300px);
  // }
  .player{
      width: 100%
  }
</style>
