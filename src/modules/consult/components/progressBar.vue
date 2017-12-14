<template>
  <section class="progressBarBox">
    <!-- <img class="progressItem" :src="imageList[progerssBarParams.progerssParams].src" alt=""> -->
    <ul class="progressBar">
      <li class="progressBox">
        <span class="progressBarItem pOne" :class="{'active':progerssBarParams.progerssParams>0}"><span class="lineLeft"></span><span class="lineRight"></span></span>
      </li>
      <li class="progressBox">
        <span class="progressBarItem pTwo" :class="{'active':progerssBarParams.progerssParams>1}"><span class="lineLeft"></span><span class="lineRight"></span></span>
      </li>
      <li class="progressBox">
        <span class="progressBarItem pThree" :class="{'active':progerssBarParams.progerssParams>2}"><span class="lineLeft"></span><span class="lineRight"></span></span>
      </li>
      <li class="progressBox">
        <span class="progressBarItem pFour" :class="{'active':progerssBarParams.progerssParams>3}"><span class="lineLeft"></span><span class="lineRight"></span></span>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  mounted() {},
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
  padding-top: rem(60px);
  padding-bottom: rem(30px);
  .progressItem {
    width: 100%;
    height: 100%;
  }
  .progressBar {
    padding-left: rem(30px);
    padding-right: rem(30px);
    @include clearfix();
    .progressBox {
      width: 25%;
      text-align: center;
      float: left;
      .progressBarItem {
        display: inline-block;
        width: rem(40px);
        height: rem(40px);
        border-radius: 50%;
        color: #ffffff;
        &.pOne {
          background: url("../../../common/image/img00/consult_V1.2/progressNumNo_01.png")
            no-repeat center;
          background-size: rem(40px) rem(40px);
        }
        &.pTwo {
          background: url("../../../common/image/img00/consult_V1.2/Artboard 2 Copy 3.png")
            no-repeat center;
          background-size: rem(40px) rem(40px);
        }
        &.pThree {
          background: url("../../../common/image/img00/consult_V1.2/Artboard 2 Copy 4.png")
            no-repeat center;
          background-size: rem(40px) rem(40px);
        }
        &.pFour {
          background: url("../../../common/image/img00/consult_V1.2/Artboard 2 Copy 6.png")
            no-repeat center;
          background-size: rem(40px) rem(40px);
        }
        position: relative;
        text-align: center;
        vertical-align: bottom;
        margin-top: rem(5px);
        .lineLeft {
          display: inline-block;
          position: absolute;
          left: rem(-67px);
          width: rem(67px);
          height: rem(2px);
          background-color: #d8d8d8;
          top: 50%;
        }
        .lineRight {
          display: inline-block;
          position: absolute;
          right: rem(-67px);
          width: rem(67px);
          height: rem(2px);
          background-color: #d8d8d8;
          top: 50%;
        }
        &.active {
          background-color: #2fc5bd;
          &.pOne {
            background: url("../../../common/image/img00/consult_V1.2/progressNum_01.png")
              no-repeat center;
            background-size: rem(40px) rem(40px);
          }
          &.pTwo {
            background: url("../../../common/image/img00/consult_V1.2/Artboard 2 Copy 2.png")
              no-repeat center;
            background-size: rem(40px) rem(40px);
          }
          &.pThree {
            background: url("../../../common/image/img00/consult_V1.2/Artboard 2 Copy 5.png")
              no-repeat center;
            background-size: rem(40px) rem(40px);
          }
          &.pFour {
            background: url("../../../common/image/img00/consult_V1.2/Artboard 2 Copy 7.png")
              no-repeat center;
            background-size: rem(40px) rem(40px);
          }
          .lineLeft {
            background-color: #2fc5bd;
          }
          .lineRight {
            background-color: #2fc5bd;
          }
        }
      }
    }
  }
}
</style>
