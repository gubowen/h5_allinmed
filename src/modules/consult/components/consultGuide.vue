<template>
  <section class="conGuide">
    <h2>提交成功</h2>
    <ul class="conGuideText">
      <li>关注“唯医互联网骨科医院”微信公众号</li>
      <li>查看医生回复<router-link to="/followWechat" class="btnAttention">关注方法 >></router-link></li>
      <!--<li class="waitReply"><span>请耐心等待医生的回复</span></li>-->
    </ul>
    <router-link to="/addPatient" class="btnHome">继续问诊</router-link>
  </section>
</template>
<script type="text/ecmascript-6">
  import "common/js/third-party/flexible";
  import api from 'common/js/util/util';
  export default{
    data() {
      return {

      }
    },
    mounted(){
      localStorage.setItem("PCIMLinks", location.href);
    },
    methods: {

    },
    components: {

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .conGuide{
    box-sizing: border-box;
    padding:rem(160px) rem(75px) 0;
    h2{
      width:100%;
      color:#444;
      @include font-dpr(24px);
      text-align: center;
    }
    .conGuideText{
      margin-top:rem(50px);
      color:#444;
      @include font-dpr(16px);
      li{
        margin-top:rem(30px);
        span{
          display: inline-block;
          vertical-align: middle;
        }
      }
      .waitReply{
        &:before{
          display: inline-block;
          content: "";
          width:rem(36px);
          height:rem(36px);
          background: url("../../../common/image/img00/doctorHome/upLoadTip.png") no-repeat;
          background-size: 100% 100%;
          margin-right:rem(10px);
          vertical-align: middle;
        }
      }
      .btnAttention{
        margin-left:rem(30px);
        color: #2FC5BD;
      }
    }
    .btnHome{
      display:block;
      width:100%;
      margin-top:rem(80px);
      height:rem(110px);
      line-height:rem(110px);
      text-align:center;
      color:#fff;
      background:#2FC5BD;
      border-radius: rem(100px);
      @include font-dpr(20px);
    }
  }
</style>
