<template>
  <section class="progressBarBox">
    <!-- <img class="progressItem" :src="imageList[progerssBarParams.progerssParams].src" alt=""> -->
    <ul class="progressBar">
      <li class="progressBox">
        <span class="progressBarItem" :class="{'active':true}"><span class="progressBarNum">1</span></span>
      </li>
      <li class="progressBox">
        <span class="progressBarItem" ><span class="progressBarNum">2</span></span>
      </li>
      <li class="progressBox">
        <span class="progressBarItem" ><span class="progressBarNum">3</span></span>
      </li>
      <li class="progressBox">
        <span class="progressBarItem" ><span class="progressBarNum">4</span></span>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
// import "../modules/modules.procedureOrder.details.js"
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
  mounted() {
    console.log(this.progerssBarParams.progerssParams);
  },
  acctived() {},
  props: {
    progerssBarParams: {
      type: Object
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
.progressBarBox {
  // position: absolute;
  padding-top: rem(60px);
  padding-bottom: rem(30px);
  .progressItem {
    width: 100%;
    height: 100%;
  }
  .progressBar {
    padding-left: rem(30px);
    @include clearfix();
    .progressBox {
      float: left;
      .progressBarItem {
        display: inline-block;
        width: rem(40px);
        height: rem(40px);
        border-radius: rem(100px);
        color: #ffffff;
        background-color: #d8d8d8;
        position: relative;
        text-align: center;
        vertical-align: bottom;
        margin-top: rem(5px);
        .progressBarNum {
          @include font-dpr(14px);
          position: absolute;
          vertical-align: middle;
          display: inline-block;
          color: #ffffff;
          top: 50%;
          margin-top: rem(-16px);
          left: 50%;
          margin-left: rem(-8px);
        }
        &.active {
          background-color: #2fc5bd;
        }
      }
      .progressLine {
        width: rem(20px);
        height: rem(2px);
        background-color: red;
        float: left;
      }
    }
  }
}
</style>
