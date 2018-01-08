<template>
  <div>
    <section class="fullscreen-video-player">
      <video ref="videoHtml" controls="controls" :src="videoUrl"></video>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      videoUrl(){
        return this.$store.state.fullVideoParam.url
      }
    },
    props: {},
    mounted() {

    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules";
  .fullscreen-video-player{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    z-index: 3;
    &:before{
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
    & > video{
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .player {
    width: 100%
  }
</style>
