<template>
    <div class="clinicOrder">
      <header class="docMessageBox">
        <figure class="docMessage">
          <figcaption class="docLogoBox">
            <img src="../../../common/image/background_wave.png" class="docLogo">
          </figcaption>
          <div class="docNameBox">
            <span class="docName">王玉轩龙</span>
            <span class="docTitle">副主任医师</span>
          </div>
        </figure>
        <a href="javascript:;" class="jumpToTnfo">前往医生主页</a>
      </header>
      <section class="clinicDetailsBox">
        <h2 class="hospitalName">北京301解放军总医院</h2>
        <section class="illnessClaimBox">
          <h3 class="moduleTitle">疾病要求</h3>
          <article class="illnessClaimDetails">发育异常引起的双侧髋关节病、发育发育发育发育异常引...</article>
          <img src="../../../common/image/background_wave.png" class="btnFoldFewer">
        </section>
        <section class="clinicTimeBox">
          <h3 class="moduleTitle">门诊时间<span>(最近三周出诊安排)</span></h3>
          <article class="stopClinicDetails">提示：2017年11月23日-2017年11月24日，停诊</article>
          <div class="clinicTime">
            <header class="clinicTimeType">
              <span>门诊时间</span>
              <span>上午</span>
              <span>下午</span>
              <span>晚上</span>
            </header>
            <section class="clinicTimeDetails">
              <ul>
                <li>8月30日 周三</li>
                <li>专家</li>
                <li>普通</li>
                <li>特需</li>
              </ul>
              <ul>
                <li>8月31日 周四</li>
                <li>专家</li>
                <li>普通</li>
                <li>特需</li>
              </ul>
              <ul>
                <li>9月1日 周五</li>
                <li>专家</li>
                <li>普通</li>
                <li>特需</li>
              </ul>
            </section>
          </div>
        </section>
        <section class="remarkBox">
          <h3 class="moduleTitle">备注</h3>
          <article class="remarkDetails"></article>
        </section>
      </section>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .clinicOrder{
    overflow: hidden;
    min-height: 100%;
    box-sizing: border-box;
    background:url("../../../common/image/background_wave.png") no-repeat bottom center #F2F2F2;
    background-size:100% rem(272px);
  }
  .docMessageBox{
    @include clearfix();
    margin:rem(20px) rem(30px) 0;
    border-radius: rem(16px);
    background:url("") no-repeat #07b6ac;
    background-size:100% 100%;
    padding:rem(36px) rem(24px);
    .docMessage{
      float:left;
      @include clearfix();
      .docLogoBox{
        float:left;
        width:rem(108px);
        height:rem(108px);
        background:url("../../../common/image/img00/doctorHome/doctorPic.png") no-repeat;
        background-size:100% 100%;
        img{
          width:rem(94px);
          height:rem(94px);
          border-radius: 50%;
          margin:0 auto;
          vertical-align: middle;
        }
      }
      .docNameBox{
        float:left;
        margin-right:rem(24px);
        span{
          display:block;
          &.docName{
            color:#fff;
            @include font-dpr(18px);
            font-weight: bold;
          }
          &.docTitle{
            opacity: 0.5;
            color:#ffff;
            @include font-dpr(16px);
          }
        }
      }
    }
    .jumpToTnfo{
      float:right;
      @include font-dpr(13px);
      color:#979797;
      &:after{
        display:inline-block;
        content: "";
        vertical-align: middle;
        width:rem(10px);
        height:rem(12px);
        background:url("../../../common/image/background_wave.png") no-repeat;
        background-size:100% 100%;
      }
    }
  }
  .clinicDetailsBox{
    margin:rem(20px) rem(30px) 0;
    background:#fff;
    border-radius: rem(16px);
    .hospitalName{
      padding:rem(32px);
      border-bottom:2px solid #F8F8F8;
      color: #416081;
      @include font-dpr(18px);
    }
    .illnessClaimBox{
      &:after{
        display: block;
        content: "";
        padding-top:rem(40px);
        margin:0 rem(30px);
        border-bottom:2px solid #F8F8F8;
      }
      .illnessClaimDetails{
        padding:rem(30px) rem(32px) 0;
        color: #444444;
        @include font-dpr(16px);
        line-height:rem(45px);
      }
    }
    .clinicTimeBox{
      &:after{
        display: block;
        content: "";
        padding-top:rem(40px);
        margin:0 rem(30px);
        border-bottom:2px solid #F8F8F8;
      }
      .stopClinicDetails{
        padding:rem(18px) rem(36px) rem(18px) rem(56px);
        background: rgba(250,120,122,0.1);
        border-radius: rem(100px);
        color: #555555;
        @include font-dpr(13px);
        &:before{
          display:inline-block;
          content: "";
          vertical-align: middle;
          width:rem(28px);
          height:rem(28px);
          background:url("../../../common/image/background_wave.png") no-repeat;
          background-size:100% 100%;
          padding-right:rem(8px);
        }
      }
    }
  }
  .moduleTitle{
    padding-top:rem(50px);
    margin-left:rem(20px);
    color: #222222;
    @include font-dpr(18px);
    span{
      font-weight:normal;
      margin-left:rem(12px);
      color: #BBBBBB;
      @include font-dpr(14px)
    }
    &:before{
      display:inline-block;
      content: "";
      width:rem(4px);
      height:rem(20px);
      background:#2FC5BD;
      vertical-align: middle;
      margin-right:rem(8px);
    }
  }
  .btnFoldFewer{
      display:block;
      width:rem(20px);
      height:rem(10px);
      margin:rem(24px) auto 0;
  }
</style>
