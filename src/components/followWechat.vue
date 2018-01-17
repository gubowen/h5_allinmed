<template>
  <section class="followWXBox">
    <section class="followWX">
      <h2 class="followWX_header"><span>如何快速关注微信号</span></h2>
      <section class="followWX_wayone">
        <h3>微信识别二维码图片关注</h3>
        <ul>
          <li>1.长按图片保存二维码；</li>
          <li>2.打开微信<span>“扫一扫”</span>；</li>
          <li>3.点击<span>“相册”</span>，找到二维码，微信识别后<span>“关注”</span>即可。</li>
        </ul>
        <dl>
          <dt>
            <span>温馨提示：</span>
            <span>不同操作系统进入相册方式有区别。</span>
          </dt>
          <dd>* 苹果用户点击扫一扫页面右上角“相册”即可；</dd>
          <dd>* 安卓用户点击扫一扫页面右上角...后点击“从相册选取二维码”即可。</dd>
          <dd class="QRcodeBox"  data-alcode-mod='749'>
            <img src="../common/image/img00/followWX/qrcode_for_gh.jpg" data-alcode='e161' alt="唯医互联网骨科医院" class="QRcode">
            <img src="../common/image/img00/followWX/code_entrance.png" class="QRtips">
          </dd>
        </dl>
      </section>
      <section class="followWX_waytwo">
        <h3>微信搜索“唯医互联网骨科医院”关注</h3>
        <figure class="searchFollow">
          <img src="../common/image/img00/followWX/picture.png">
        </figure>
      </section>
    </section>
  </section>
</template>
<script type="text/ecmascript-6">
  import api from "common/js/util/util";
  export default{
    data() {
      return {}
    },
    mounted(){
      api.forbidShare();
    },
    methods: {},
    props: {},
    components: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .followWXBox{
    background: url("../common/image/img00/followWX/bg.png") no-repeat top left #E6E6ED;
    background-size: 100% rem(380px);
    overflow: hidden;
    .followWX{
      margin:rem(90px) rem(20px) rem(140px);
      padding-bottom:rem(100px);
      background:#ffffff;
      border-radius: rem(16px);
      .followWX_header{
          color: #000000;
          @include font-dpr(20px);
          padding:rem(40px) 0 rem(34px);
          text-align: center;
          &:before{
            display: inline-block;
            content: '';
            width:rem(40px);
            height:rem(16px);
            margin-right:rem(16px);
            vertical-align: middle;
            background:url("../common/image/img00/followWX/title_label01.png") no-repeat;
            background-size: 100% 100%;
          }
          &:after{
            display: inline-block;
            content: '';
            width:rem(40px);
            height:rem(16px);
            margin-left:rem(16px);
            vertical-align: middle;
            background:url("../common/image/img00/followWX/title_label02.png") no-repeat;
            background-size: 100% 100%;
          }
      }
      .followWX_wayone{
        padding:rem(44px) rem(60px) rem(80px);
        border-top:2px solid #F8F8F8;
        h3{
          margin:0 auto;
          color: #07B6AC;
          @include font-dpr(20px);
          &:before{
            display: inline-block;
            content: '';
            width:rem(126px);
            height:rem(48px);
            padding-right:rem(12px);
            vertical-align: middle;
            background:url("../common/image/img00/followWX/label_first.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        ul{
          padding-bottom:rem(40px);
          border-bottom:2px solid #eeeeee;
          @include font-dpr(18px);
          color: #222222;
          li{
            padding-top:rem(28px);
            line-height:rem(56px);
            span{
              color: #07B6AC;
              font-weight:600;
            }
          }
        }
        dl{
          padding-top:rem(20px);
          color: #888888;
          @include font-dpr(16px);
          span{
            display:block;
            padding-top:rem(20px);
          }
          dd{
            padding-top:rem(24px);
            line-height:rem(45px);
            &.QRcodeBox{
              padding-top:rem(80px);
              .QRcode{
                display: block;
                width:rem(400px);
                height:rem(400px);
                margin:0 auto;
              }
              .QRtips{
                display: block;
                width:rem(480px);
                height:rem(72px);
                margin:rem(60px) auto 0;
              }
            }
          }
        }
      }
      .followWX_waytwo{
        padding:rem(44px) rem(60px) 0;
        border-top:2px solid #F8F8F8;
        h3{
          margin:0 auto;
          color: #07B6AC;
          @include font-dpr(20px);
          &:before{
            display: inline-block;
            content: '';
            width:rem(126px);
            height:rem(48px);
            padding-right:rem(12px);
            vertical-align: middle;
            background:url("../common/image/img00/followWX/label_second.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .searchFollow{
          margin:rem(70px) auto rem(60px);
          img{
            display:block;
            width:rem(568px);
            height:rem(628px);
          }
        }
      }
      .openWX{
        display:block;
        margin:0 auto;
        width:rem(630px);
        height:rem(100px);
        line-height:rem(100px);
        text-align:center;
        background: #1ACAA7;
        box-shadow: 0 rem(12px) rem(24px) 0 #93E1D2;
        border-radius: rem(16px);
        color: #FFFFFF;
        font-weight:600;
        @include font-dpr(18px);
      }
    }
  }
</style>
