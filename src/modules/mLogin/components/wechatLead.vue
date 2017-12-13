<template>
  <figure class="WXlogin">
    <figcaption>关注官方微信，即刻开启问诊服务</figcaption>
    <img @click='goWechat()' src="../../../common/image/img00/login/wechat_shape.png" alt="关注微信" class="WXimage">
 </figure>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        
      }
    },
    methods: {
      goWechat () {
        this.$router.push({
          name: "wechat"
        });
      }
    },
    mounted(){

    },
    components:{
      
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../scss/library/_common-modules";
.WXlogin{
    // position:fixed;
    margin-top: rem(100px);
    figcaption{
      display: inline-block;
      vertical-align:middle;
      color:#AAAAAA;
      @include font-dpr(12px);
      &:before{
        display: inline-block;
        content: '';
        vertical-align:middle;
        width:rem(80px);
        height:1px;
        background:#D8D8D8;
        margin-right:rem(30px);
      }
      &:after{
        display: inline-block;
        content: '';
        vertical-align:middle;
        width:rem(80px);
        height:1px;
        background:#D8D8D8;
        margin-left:rem(30px);
      }
    }
    .WXimage{
      display:block;
      margin:rem(40px) auto 0;
      width:rem(100px);
      height:rem(100px);
    }
  }
</style>

