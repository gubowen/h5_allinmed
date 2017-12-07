<template>
  <router-link tag='section'  class="allinmed-personal-weixin" to='/followWechat'>

  </router-link>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules.scss";
  .allinmed-personal-weixin{
    display: block;
    width: rem(698px);
    height: rem(160px);
    margin:rem(20px) auto;
    background:#fff url("../../../../src/common/image/img00/personal/banner.png") no-repeat center 50%;
    background-size: cover;
    border-radius: rem(16px);
  }
</style>
<script  type="text/ecmascript-6">
  import {mapGetters} from "vuex"

  export default  {
    computed:{
      ...mapGetters(['jumpUrl'])
    },
    mounted(){
      console.log(this.jumpUrl)
    }
  }
</script>
