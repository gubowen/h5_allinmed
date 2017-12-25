<template>
  <section class="main">
    <section class="main-inner-content">
      <header class="feedback-title">
        <h2 class="feedback-header-top">意见反馈</h2>
        <p class="feedback-header-bottom">如果您在使用过程中有任何问题或建议，请给我们留言，并留下您的联系方式。</p>
      </header>
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
   * Created by juKun on 2017/8/9.
   */

  import api from 'common/js/util/util';
  import loading from 'components/loading';
  import fb from "common/js/third-party/flexible";
  import toast from 'components/toast';
  import confirm from 'components/confirm';
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    components: {

    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  html,body{
    width: 100%;
    height: 100%;
  }
  .main-inner {
    /*width: 100%;*/
    height: 100%;
    padding: rem(0px) rem(30px);

  }
  .main-inner-content {
    overflow: hidden;
    position: relative;
  }
  .feedback-title{
    padding-top: rem(50px);
    padding-left: rem(14px);
    box-sizing: border-box;
  }
  .feedback-header-top{
    @include font-dpr(22px);
    color: #555555;
    font-weight: normal;
  }
  .feedback-header-bottom{
    margin-top: rem(10px);
    margin-bottom: rem(36px);
    @include font-dpr(15px);
    color: #909090;
  }
</style>
