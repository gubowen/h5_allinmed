<template>
  <section class="progressBarBox">
    <img class="progressItem" :src="imageList[0].src" alt="">
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      imageList: [
        //        {src:require("../../../common/image/img00/patientConsult/modules.uploadfiles.png")},
        {
          src: require("../../../common/image/img00/patientConsult/pictureGuide2_01.jpg")
        },
        {
          src: require("../../../common/image/img00/patientConsult/pictureGuide2_02.jpg")
        },
        {
          src: require("../../../common/image/img00/patientConsult/pictureGuide2_03.jpg")
        },
        {
          src: require("../../../common/image/img00/patientConsult/pictureGuide2_04.jpg")
        },
        {
          src: require("../../../common/image/img00/patientConsult/pictureGuide2_05.jpg")
        }
      ]
    };
  },
  mounted: {},
  props: {
    progerssBarParams: {
      type: Object
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.progressBarBox {
  position: absolute;
  .progressItem {
    width: 100%;
    height: rem(100px);
  }
}
</style>
