<template>

    <section class="contactMain">
      <section class="con_topBanner">

      </section>
      <section class="con_center">
        <section class="con_itemList">
          <div class="con_workTimeBox">
            <span class="con_point"></span>
            <span class="workingTitle">工作时间</span>
            <span class="workingWeek">周一至周五</span>
            <span class="workingHour">09:00-18:00</span>
            <span class="workingTip">节假日除外</span>
          </div>
          <div class="con_phone">
            <span class="con_phoneText">电话</span><span class="con_phoneNum">023031654651616</span><span class="con_phoneIcon"></span>
          </div>
          <div class="con_weiXin">
            <span class="con_wxText">微信</span><span class="con_wxNum">131651654654</span>
          </div>
        </section>
        <section class="con_itemList">
          <div class="con_workTimeBox">
            <span class="con_point"></span>
            <span class="workingTitle">非工作时间</span>
            <!--<span class="workingWeek">周一至周五</span>-->
            <!--<span class="workingHour">09:00-18:00</span>-->
            <!--<span class="workingTip">节假日除外</span>-->
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
  import fb from "common/js/third-party/flexible";
  export default{
    data() {
      return {}
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";
  .contactMain{
    height: 100%;
    position: relative;
    background-color: #F2F2F2;
    .con_topBanner{
      width: 100%;
      height: rem(320px);
      background: url("../../common/image/img00/contactUs/background.png") no-repeat center;
    }
    .con_center{
      position: absolute;
      width: 95%;
      top: rem(196px);
      left: 2.5%;
      right: 2.5%;
      height: rem(500px);
      background: #ffffff;
      -webkit-border-radius: rem(8px);
      -moz-border-radius: rem(8px);
      border-radius: rem(8px);
      .con_itemList{
        .con_workTimeBox{
          margin-top: rem(84px);
          padding-left: rem(64px);
          .con_point{

          }
          .workingTitle{
            @include font-dpr(18px);
            color: #333333;
            font-weight: bold;
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
          .con_phoneText{
            @include font-dpr(18px);
            color: #909090;
          }
          .con_phoneNum{
            @include font-dpr(18px);
            color: #2FC5BD;
          }
          .con_phoneIcon{
            display: inline-block;
            width: rem(76px);
            height: rem(76px);
            background: url("../../common/image/img00/contactUs/call.png") no-repeat center;
            background-size: 100% 100%;
          }
        }
        .con_weiXin{
          .con_wxText{
            @include font-dpr(18px);
            color: #333333;
          }
          .con_wxNum{
            @include font-dpr(18px);
            color: #2FC5BD;
          }
        }
      }
    }
  }
</style>
