<template>
  <section class="upLoadGuideTips">
    <img v-for="item in imageList"  class="qu-upLoadTips" :src="item.src" alt="">
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
      imageList:[
//        {src:require("../../../common/image/img00/patientConsult/modules.uploadfiles.png")},
        {src:require("../../../common/image/img00/patientConsult/pictureGuide2_01.jpg")},
        {src:require("../../../common/image/img00/patientConsult/pictureGuide2_02.jpg")},
        {src:require("../../../common/image/img00/patientConsult/pictureGuide2_03.jpg")},
        {src:require("../../../common/image/img00/patientConsult/pictureGuide2_04.jpg")},
        {src:require("../../../common/image/img00/patientConsult/pictureGuide2_05.jpg")},
      ]
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .upLoadGuideTips{
    position: absolute;
    .qu-upLoadTips{
      width: 100%;
    }
  }
</style>
