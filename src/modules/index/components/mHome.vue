<template>
  <section class="mHome">
    <attention @attentionHandle="attentionHandle"></attention>
    <figure class="banner">
      <swiper :options="swiperOption" ref="mySwiper" style="width:90%" v-if="adList.length>0">
        <swiper-slide v-for="(item,index) in adList" :key="item.imgId" class="banner-slider"
                      :class="{'swiper-no-swiping':adList.length<=1}">
          <a :href="item.adAdditionalUrl" @click="bannerHref(item)">
            <img :src="item.adAttUrl"/>
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </figure>
    <figure class="advertising">12万权威专家在线出诊</figure>
    <figure class="diagnose">
      <section class="btn-diagnose" @click="diagnoseEvent">点击问诊</section>
    </figure>
    <figure class="history" v-show="dataGetFinish">
      <header><h3>问诊历史</h3>
        <p class="btn-more" @click="moreEvent">更多</p></header>
      <!--未登录-->
      <section class="content" v-if="!loginFlag">
        <section class="login">
          <p>您还没有登录</p>
          <div class="btn-login" @click="loginEvent">点击登录</div>
        </section>
      </section>
      <!--已登录-->
      <!--无问诊历史-->
      <section class="content" v-if="loginFlag&&diagnoseList.length==0">
        <section class="login">
          <p>您还没有问诊记录</p>
          <div class="btn-login" @click="diagnoseEvent">点击看病</div>
        </section>
      </section>
      <!--有问诊历史-->
      <section class="history-info" v-if="loginFlag&&diagnoseList.length>0" v-for="item in diagnoseList"
               @click="moreEvent">
        <div class="doctor">
          <div class="doctor-img"><img :src="getImgUrl(item)"/></div>
          <div class="doctor-info">
            <p class="doctor-type"><span
              class="name">{{item.consultationType == 0 ? '唯医门诊医生' : getFullName(item)}}</span><span class="career">{{item.medicalTitle}}</span>
            </p>
            <p class="doctor-time"><span>{{getInquiryType(item)}}</span> <span>{{item.createTime.substring(0,item.createTime.length-2)}}</span>
            </p>
          </div>
        </div>
        <div class="patient">
          <div class="patient-info"><p class="title">患者</p>
            <p class="detail">{{item.patientName && item.patientName.length > 5 ? item.patientName.substring(0, 5) +
              "..." : item.patientName}}</p></div>
          <div class="patient-info"><p class="title">主诉</p>
            <p class="detail">{{item.mainContent.caseMain}}</p></div>
        </div>
      </section>
    </figure>
    <tabbar :selected="1"></tabbar>
  </section>
</template>
<script type="text/ecmascript-6">
  import "common/js/third-party/flexible";
  import attention from "components/attention";
  import tabbar from "components/tabbar";
  import api from "common/js/util/util";
  import Vue from "vue";

  import CheckLogin from "common/js/auth/checkLogin";

  const checkLogin = new CheckLogin();
  import VueAwesomeSwiper from "vue-awesome-swiper";
  import "swiper";
  import "swiper/dist/css/swiper.css";

  let XHRList = {
    //登录页
    loginUrl: "/dist/mLogin.html?from=index",
    //问诊
    diagnose: `/dist/consult.html`,
    //问诊历史
    historyUrl: `/dist/myConsult.html`,
    getOrderHistoryLists: "/mcall/customer/case/consultation/v1/getMapList/", //咨询历史接口
    personalMessage: "/mcall/patient/customer/unite/v1/getPatientInfo/",
    adList: "/mcall/ad/position/profile/getMapList/"
  };
  Vue.use(VueAwesomeSwiper);
  export default {
    data() {
      return {
        loginFlag: false,
        wxLoginFlag: false,
        diagnoseList: [],
        dataGetFinish: false,
        adList: [],
        swiperOption: {
          notNextTick: true,
          loop: true,
//          autoplay: 3000,
          direction: "horizontal",
          grabCursor: true,
          setWrapperSize: true,
          zoom: false,
          autoHeight: true,
          pagination: ".swiper-pagination",
          paginationType: "bullets",
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          debugger: true
        }
      };
    },
    components: {
      attention,
      // slider,
      tabbar
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      init() {
        this.loginJudge();
        this.getAdList();
      },
      getOrderHistoryLists() {
        const that = this;
        api.ajax({
          url: XHRList.getOrderHistoryLists,
          method: "post",
          data: {
            patientCustomerId: localStorage.getItem("userId"),
            isValid: 1,
            firstResult: 0,
            maxResult: 1,
            logoUseFlag: 3
          },
          timeout: 30000,
          done(response) {
            if (
              response.responseObject.responseData.dataList &&
              response.responseObject.responseData.dataList.length > 0
            ) {
              that.diagnoseList = response.responseObject.responseData.dataList;
            } else {
              that.diagnoseList = [];
            }
            that.dataGetFinish = true;
            that.$store.commit("setLoadingState", false);
          }
        });
      },
      getImgUrl(opt) {
        let logoImg = "";
        //分诊医生
        if (opt.consultationType == 0) {
          //判断头像
          if (opt.logoUrl) {
            logoImg = opt.logoUrl;
          } else {
            logoImg = "/image/img00/myServices/doctor_portrait.png";
          }
        } else {
          //判断头像
          if (opt.logoUrl) {
            logoImg = opt.logoUrl;
          } else {
            logoImg = "/image/img00/doctorMain/doc_logo.png";
          }
        }
        return logoImg;
      },
      bannerHref(item) {
        // window.location.href = item.adAdditionalUrl;
      },
      getFullName(opt) {
        if (opt.fullName.length > 6) {
          return opt.fullName.substring(0, 6) + "...";
        } else {
          return opt.fullName;
        }
      },
      getInquiryType(opt) {
        //判断问诊类型
        let consultationLevel = "";
        if (opt.consultationType == 1) {
          switch (Number(opt.consultationLevel)) {
            case 0:
            case 1:
              consultationLevel = "图文问诊";
              break;
            case 3:
              consultationLevel = "特需问诊";
              break;
          }
        }
        return consultationLevel;
      },
      attentionHandle() {
        this.$router.push({
          name: "followWeChat"
        });
      },
      //问诊
      diagnoseEvent() {
        if (this.loginFlag) {
          window.location.href = XHRList.diagnose;
        } else {
          //跳到登录注册页.
          localStorage.setItem("backUrl", window.location.href);
          window.location.href = XHRList.loginUrl;
        }
      },
      //更多
      moreEvent() {
        if (this.loginFlag) {
          window.location.href = XHRList.historyUrl;
        } else {
          //跳到登录注册页.
          localStorage.setItem("backUrl", window.location.href);
          window.location.href = XHRList.loginUrl;
        }
      },
      //登录
      loginEvent() {
        localStorage.setItem("backUrl", window.location.href);
        window.location.href = XHRList.loginUrl;
      },
      getAdList() {
        const that = this;

        api.ajax({
          url: XHRList.adList,
          method: "post",
          data: {
            siteId: api.getSiteId(),
            channelId: 170,
            platformId: 1,
            positionId: 583
          },
          done(data) {
            if (data.responseObject.responseStatus) {
              if (data.responseObject.responseData.data_list[0].ad_profile_attachment<= 1) {
                that.swiper.loop = false;
                that.swiper.destory();
              }
              that.adList = data.responseObject.responseData.data_list[0].ad_profile_attachment;

            }

            that.$store.commit("setLoadingState", false);
          }
        });
      },
      //登录判断
      loginJudge() {
        this.$store.commit("setLoadingState", true);
        checkLogin.getStatus().then(res => {
          console.log(res);
          if (res.data.responseObject.responseStatus) {
            this.loginFlag = true;
            this.getOrderHistoryLists();
          } else {
            this.loginFlag = false;
            this.dataGetFinish = true;
            this.$store.commit("setLoadingState", false);
          }
        });
      }
    },

    created() {
      this.init();
    },

  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .mHome {
    padding: 0 0 rem(100px) 0;
  }

  .banner {
    padding: 0 0 rem(70px) 0;
    position: relative;
    overflow: hidden;
    .swiper-container {
      overflow: visible;
      padding-bottom: rem(60px);
    }
    .swiper-pagination-bullet {
      width: rem(12px);
      height: rem(12px);
      background-color: #7f7c7c;
    }
    .swiper-pagination-bullet-active {
      width: rem(12px);
      height: rem(12px);
      background-color: #00D6C6;
    }
    .banner-slider {
      width: 86%;
      height: 3.6rem;
      opacity: 0.4;
      vertical-align: middle;
      & > a {
        display: block;
        height: 100%;
        width: 100%;
        vertical-align: middle;
        > img {
          padding: rem(10px);
          width: 100%;
          height: 100%;
          vertical-align: top;
          border-radius: rem(30px);
          box-sizing: border-box;
        }
      }
    }
    .swiper-slide-active {
      opacity: 1;
      height: 3.8666rem;
    }
  }

  .advertising {
    @include font-dpr(24px);
    color: #222222;
    letter-spacing: 0;
    line-height: rem(48px);
    text-align: center;
    margin-bottom: rem(80px);
    font-weight: 600;
  }

  .diagnose {
    height: rem(280px);
    margin-bottom: rem(84px);
    margin-top: rem(40px);
    background: url("../../../common/image/img00/index/button_bg.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
    .btn-diagnose {
      width: rem(474px);
      height: rem(108px);
      background: linear-gradient(90deg, #31cfb3 42%, #2fb9b6 84%);
      border-radius: rem(200px);
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      @include font-dpr(22px);
      color: #ffffff;
      letter-spacing: 0;
      line-height: rem(108px);
      text-shadow: 0 rem(7px) rem(15px) rgba(0, 183, 175, 0.68);
      margin-top: rem(-50px);
      box-shadow: 0 8px 16px #B3B3B3
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
        &:after {
          content: '';
          background: url("../../../common/image/img00/index/arrow.png") no-repeat;
          background-size: contain;
          display: inline-block;
          vertical-align: middle;
          width: rem(25px);
          height: rem(25px);
          margin-left: rem(10px);
        }
      }
    }
    .content {
      margin: 0 rem(25px) rem(48px);
      background: url("../../../common/image/img00/index/inquiry_bg.png") no-repeat;
      height: rem(304px);
      box-sizing: border-box;
      position: relative;
      background-size: contain;
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
      padding: rem(34px) rem(26px);
      .doctor {
        padding-bottom: rem(36px);
        border-bottom: rem(2px) solid #f1f1f1;
        .doctor-img {
          display: inline-block;
          width: rem(80px);
          height: rem(80px);
          border-radius: 50%;
          margin-right: rem(20px);
          overflow: hidden;
          & > img {
            display: block;
            width: 100%;
            height: 100%;
            background-size: contain;
          }
        }
        .doctor-info {
          display: inline-block;
          margin-top: rem(6px);
          .doctor-type {
            @include font-dpr(12px);
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            line-height: rem(30px);
            margin-bottom: rem(8px);
            .name {
              @include font-dpr(15px);
              margin-right: rem(14px);
              vertical-align: bottom;
            }
            .career {
              @include font-dpr(15px);
              margin-left: rem(14px);
              vertical-align: bottom;
            }
          }
          .doctor-time {
            @include font-dpr(14px);
            color: #808080;
            letter-spacing: 0;
            line-height: rem(30px);
            .diagnoseType {
              margin-right: rem(16px);
            }
            .createTime {
            }
          }
        }
        .doctor-status {
          @include font-dpr(14px);
          height: rem(56px);
          width: rem(114px);
          float: right;
          opacity: 0.49;
          background: #e5e5e5;
          border-radius: rem(8px);
          color: #808080;
          letter-spacing: 0;
          line-height: rem(56px);
          margin-top: rem(14px);
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
            display: inline-block;
            font-weight: 600;
          }
          .title {
            font-weight: normal;
            display: inline-block;
            color: #555555;
            letter-spacing: 0;
          }
          .detail {
            vertical-align: bottom;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            padding-left: rem(100px);
            margin-left: rem(-100px);
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
