<template>
  <section>
    <attention></attention>
    <figure class="banner">
      <!--<div class="banner-img"></div>-->
      <!--<div class="focus"></div>-->
      <slider :loop="true" :autoPlay="true" :interval="4000">
          <div class="banner-slider">
            <a href=""><img src="../../../common/image/img00/index/banner_default.png" /></a>
            </div>
          <div class="banner-slider">
            <a href=""><img src="../../../common/image/img00/index/banner_default.png" /></a>
          </div>
      </slider>
    </figure>
    <figure class="advertising">12万权威专家在线出诊</figure>
    <figure class="diagnose">
        <section class="btn-diagnose">点击问诊</section>
    </figure>
    <figure class="history">
      <header><h3>问诊历史</h3><p class="btn-more">更多></p></header>
      <section class="content">
            <section class="login">
              <p>您还没有登录</p>
              <div class="btn-login">点击登录</div>
            </section>
      </section>
      <section class="history-info">
            <div class="doctor">
              <div class="doctor-img"></div>
              <div class="doctor-info">
                <p class="doctor-type">测试医生|住院医生</p>
                <p class="doctor-time">图文问诊 12-06 11:24</p>
              </div>
              <div class="doctor-status">已结束</div>
            </div>
            <div class="patient">
              <div class="patient-info"><p class="title">患者</p><p>张国良</p></div>
              <div class="patient-info"><p class="title">主诉</p><p>左大腿扭伤、拉伤，3个月，疼…</p></div>
            </div>
      </section>
    </figure>
    <tabbar :selected="1"></tabbar>
  </section>
</template>
<script type="text/ecmascript-6">
import "common/js/third-party/flexible";
import attention from "./attention";
import slider from "./slider";
import tabbar from "components/tabbar";
export default {
  data() {
    return {};
  },
  components: {
    attention,
    slider,
    tabbar
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
.banner {
  padding: rem(32px) 0 rem(140px) 0;
  position: relative;
  overflow: hidden;
  .banner-slider {
    & > img {
      width: 100%;
      vertical-align: top;
    }
  }
}
.advertising {
  @include font-dpr(24px);
  color: #222222;
  letter-spacing: 0;
  line-height: rem(48px);
  text-align: center;
  margin-bottom: rem(80px);
}
.diagnose {
  height: rem(280px);
  margin-bottom: rem(84px);
  background: url("../../../common/image/img00/index/button_bg.png") no-repeat;
  padding-top: 86px;
  .btn-diagnose {
    width: rem(474px);
    height: rem(108px);
    background-image: linear-gradient(90deg, #31cfb3 42%, #2fb9b6 84%);
    border-radius: rem(200px);
    margin: 0 auto;
    text-align: center;
    @include font-dpr(22px);
    color: #ffffff;
    letter-spacing: 0;
    line-height: rem(108px);
    text-shadow: 0 rem(7px) rem(15px) rgba(0, 183, 175, 0.68);
  }
}
.history {
  header {
    height: rem(44px);
    margin-bottom: rem(60px);
    padding: 0 rem(40px);
    h3 {
      float: left;
      @include font-dpr(22px);
      color: #222222;
      letter-spacing: 0;
      line-height: rem(44px);
    }
    .btn-more {
      float: right;
      @include font-dpr(15px);
      font-size: 15px;
      color: #909090;
      letter-spacing: 0;
      line-height: rem(44px);
    }
  }
  .content {
    margin: 0 rem(25px) rem(48px);
    background: url("../../../common/image/img00/index/inquiry_bg.png")
      no-repeat;
    height: rem(304px);
    box-sizing: border-box;
    position: relative;
    .login {
      position: absolute;
      top: rem(86px);
      right: rem(100px);
      p {
        @include font-dpr(16px);
        color: #909090;
        letter-spacing: 0;
        line-height: rem(32px);
        margin-bottom: rem(10px);
        text-align: center;
      }
      .btn-login {
        width: rem(254px);
        height: rem(74px);
        background: #ffffff;
        border: rem(1px) solid #31cfb3;
        border-radius: rem(100px);
        text-align: center;
        @include font-dpr(18px);
        color: #31cfb3;
        letter-spacing: 0;
        line-height: rem(74px);
      }
    }
  }
  .history-info {
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    margin: 0 rem(25px) rem(50px);
    padding: rem(40px) rem(26px);
    .doctor {
      padding-bottom: rem(36px);
      border-bottom: rem(2px) solid #f1f1f1;
      .doctor-img {
        display: inline-block;
        width: rem(80px);
        height: rem(80px);
        border-radius: 50%;
        background: #000
          url("../../../common/image/img00/index/personal_default.png") 100%
          100% no-repeat;
        background-size: 100% 100%;
        margin-right: rem(20px);
      }
      .doctor-info {
        display: inline-block;
        .doctor-type {
          @include font-dpr(15px);
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          line-height: rem(32px);
          margin-bottom: rem(8px);
        }
        .doctor-time {
          @include font-dpr(14px);
          color: #808080;
          letter-spacing: 0;
          line-height: rem(30px);
        }
      }
      .doctor-status {
        height: rem(56px);
        width: rem(114px);
        float: right;
        opacity: 0.49;
        background: #e5e5e5;
        border-radius: rem(8px);
        @include font-dpr(14px);
        color: #808080;
        letter-spacing: 0;
        line-height: rem(28px);
        padding: rem(14px) rem(8px);
        margin-top: rem(4px);
        text-align: center;
        box-sizing: border-box;
      }
    }
    .patient {
      padding: rem(20px) 0 rem(40px);
      .patient-info {
        margin-bottom: rem(26px);
        &:last-child {
          margin-bottom: 0;
        }
        p {
          @include font-dpr(17px);
          color: #333333;
          letter-spacing: 0;
          line-height: rem(36px);
          display: inline-block;
          font-weight: 600;
        }
        .title {
          font-weight: normal;
          @include font-dpr(17px);
          display: inline-block;
          color: #555555;
          letter-spacing: 0;
          line-height: rem(32px);
          margin-right: rem(30px);
        }
      }
    }
  }
}
</style>
