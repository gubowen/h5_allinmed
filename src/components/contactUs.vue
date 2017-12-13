<template>

    <section class="contactMain">
      <section class="con_topBanner">

      </section>
      <section class="con_center">
        <section class="con_itemList">
          <div class="con_workTimeBox">
            <span class="workingTitle"><span class="con_point"></span>工作时间</span>
            <span class="workingWeek">周一至周五</span>
            <span class="workingHour">09:00-18:00</span>
            <span class="workingTip">节假日除外</span>
          </div>
          <div class="con_phone">
            <a href="tel:010-59007006">
              <span class="con_phoneText">电话</span><span class="con_phoneNum">010-59007006</span><span class="con_phoneIcon"></span>
            </a>
          </div>
          <div class="con_weiXin">
            <span class="con_wxText">微信</span><span class="con_wxNum">weiyi635</span>
          </div>
        </section>
        <section class="con_itemList">
          <div class="con_workTimeBox notWork">
            <span class="workingTitle"><span class="con_point"></span>非工作时间</span>
          </div>
          <div class="con_email">
            <span class="con_wxText">邮箱</span><span class="con_wxNum">help@allinmed.cn</span>
          </div>
        </section>
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
   * Created by JuKun on 2017/11/07.
   */
//  import login from "./contactUs.html";
  import api from "common/js/util/util";
  import fb from "common/js/third-party/flexible";
  export default{
    data() {
      return {}
    },
    mounted() {
      api.forbidShare();
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../scss/library/_common-modules";
  .contactMain{
    height: 100%;
    position: relative;
    background:url("../common/image/background_wave.png") no-repeat bottom center #F2F2F2;
    background-size:100% rem(272px);
    .con_topBanner{
      width: 100%;
      height: rem(320px);
      background: url("../common/image/img00/contactUs/background.png") no-repeat center;
      background-size: 100% 100%;
    }
    .con_center{
      position: absolute;
      width: 95%;
      top: rem(196px);
      left: 2.5%;
      right: 2.5%;
      background: #ffffff;
      -webkit-border-radius: rem(16px);
      -moz-border-radius: rem(16px);
      border-radius: rem(16px);
      padding-bottom: rem(96px);
      .con_itemList{
        .con_workTimeBox{
          margin-top: rem(76px);
          padding-left: rem(64px);
          &.notWork{
            margin-top: rem(110px);
          }
          .workingTitle{
            @include font-dpr(18px);
            color: #333333;
            font-weight: bold;
            position: relative;
            .con_point{
              position: absolute;
              display: inline-block;
              width: rem(16px);
              height: rem(16px);
              -webkit-border-radius: rem(100px);
              -moz-border-radius: rem(100px);
              border-radius: rem(100px);
              background-color: #2FC5BD;
              top: 50%;
              margin-top: rem(-8px);
              left:rem(-32px);
            }
          }
          .workingWeek{
            @include font-dpr(14px);
            color: #909090;
            padding-left: rem(16px);
          }
          .workingHour{
            @include font-dpr(14px);
            color: #909090;
          }
          .workingTip{
            @include font-dpr(14px);
            color: #909090;
          }
        }
        .con_phone{
          padding-left: rem(64px);
          padding-top: rem(62px);
          a{
            display: inline-block;
          }
          .con_phoneText{
            @include font-dpr(18px);
            color: #909090;
            padding-right: rem(32px);
          }
          .con_phoneNum{
            @include font-dpr(18px);
            color: #2FC5BD;
            display: inline-block;
            line-height: 1;
            border-bottom: rem(2px) solid #2FC5BD;
          }
          .con_phoneIcon{
            margin-left: rem(36px);
            display: inline-block;
            width: rem(76px);
            height: rem(76px);
            vertical-align: bottom;
            background: url("../common/image/img00/contactUs/call.png") no-repeat center;
            background-size: 100% 100%;
          }
        }
        .con_weiXin{
          padding-left: rem(64px);
          padding-top: rem(36px);
          .con_wxText{
            @include font-dpr(18px);
            color: #909090;
            padding-right: rem(32px);
          }
          .con_wxNum{
            @include font-dpr(18px);
            color: #333333;
          }
        }
        .con_email{
          padding-left: rem(64px);
          padding-top: rem(68px);
          .con_wxText{
            @include font-dpr(18px);
            color: #909090;
            padding-right: rem(32px);
          }
          .con_wxNum{
            @include font-dpr(18px);
            color: #333333;
          }
        }
      }
    }
  }
</style>
