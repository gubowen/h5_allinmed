<template>
  <section class="mHome">
    <attention></attention>
    <figure class="banner">
      <!--<div class="banner-img"></div>-->
      <!--<div class="focus"></div>-->
      <slider :loop="true" :autoPlay="true" :interval="5000">
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
        <section class="btn-diagnose" @click="diagnoseEvent">点击问诊</section>
    </figure>
    <figure class="history">
      <header><h3>问诊历史</h3><p class="btn-more" @click="moreEvent">更多></p></header>
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
      <section class="history-info" v-if="loginFlag&&diagnoseList.length>0" v-for="item in diagnoseList">
            <div class="doctor">
              <div class="doctor-img"><img :src="item.img"/></div>
              <div class="doctor-info">
                <p class="doctor-type"><span class="name">{{item.name}}</span>| <span class="career">{{item.career}}</span></p>
                <p class="doctor-time"><span>{{item.diagnoseType}}</span> <span>{{item.createTime}}</span></p>
              </div>
              <div class="doctor-status">已结束</div>
            </div>
            <div class="patient">
              <div class="patient-info"><p class="title">患者</p><p class="detail">{{item.patientName}}</p></div>
              <div class="patient-info"><p class="title">主诉</p><p class="detail">{{item.main}}</p></div>
            </div>
      </section>
    </figure>
    <tabbar :selected="1"></tabbar>
  </section>
</template>
<script type="text/ecmascript-6">
  import"common/js/third-party/flexible";
  import attention from './attention'
  import slider from './slider'
  import tabbar from 'components/tabbar'
  import api from 'common/js/util/util';
  let XHRList = {
      //登录页
      loginUrl:'',
      //问诊
      diagnose:'',
      //问诊历史
      historyUrl:'/dist/consult.html?customerId=' + api.getPara().customerId,
  };
  export default{
    data(){
        return {
          loginFlag:false,
          wxLoginFlag:false,
          diagnoseList:[]
        }
    },
    components: {
      attention,
      slider,
      tabbar
    },
    methods: {
      init(){
        this.loginFlag = true;
        let obj = {
            img:'../../../common/image/img00/index/personal_default.png',
            name:'测试医生',
            career:'住院医生',
            diagnoseType:'图文问诊',
            createTime:'12-06 11:24',
            patientName:'张国良',
            main:'左大腿扭伤、拉伤，3个月，疼啊啊啊啊啊啊啊啊啊啊啊啊'
        };
        this.diagnoseList.push(obj);
      },
      //问诊
      diagnoseEvent(){
          if(this.loginJudge()){
              window.location.href=XHRList.diagnose;
          }else{
              //跳到登录注册页.
            window.location.href=XHRList.loginUrl;
          }
      },
      //更多
      moreEvent(){
        if(this.loginJudge()){
          window.location.href=XHRList.historyUrl;
        }else{
          //跳到登录注册页.
          window.location.href=XHRList.loginUrl;
        }
      },
      //登录
      loginEvent(){

      },
      //登录判断
      loginJudge(){
        if(this.loginFlag){
          //已登录
          console.log("已登录");
        }else{
          //未登录
          console.log("未登录");
          return false ;
        }
      }
    },
    mounted(){
        this.init();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .mHome{
    padding:0 0 rem(100px) 0;
  }
  .banner{
    padding:0 0 rem(140px) 0;
    position: relative;
    .banner-slider {
      & > img {
        width: 100%;
        vertical-align: top;
      }
    }
  }
  .advertising{
    @include font-dpr(24px);
    color: #222222;
    letter-spacing: 0;
    line-height: rem(48px);
    text-align: center;
    margin-bottom:rem(80px);
  }
  .diagnose{
    height:rem(280px);
    margin-bottom:rem(84px);
    background:url("../../../common/image/img00/index/button_bg.png") no-repeat;
    background-size: contain;
    padding-top: 86px;
    .btn-diagnose{
      width:rem(474px);
      height:rem(108px);
      background-image: linear-gradient(90deg, #31CFB3 42%, #2FB9B6 84%);
      border-radius: rem(200px);
      margin: 0 auto ;
      text-align: center;
      @include font-dpr(22px);
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: rem(108px);
      text-shadow: 0 rem(7px) rem(15px) rgba(0,183,175,0.68);
    }
  }
  .history{
    header{
      height:rem(44px);
      margin-bottom:rem(60px);
      padding: 0 rem(40px);
      h3{
        float:left;
        @include font-dpr(22px);
        color: #222222;
        letter-spacing: 0;
        line-height: rem(44px);
      }
      .btn-more{
        float:right;
        @include font-dpr(15px);
        font-size: 15px;
        color: #909090;
        letter-spacing: 0;
        line-height: rem(44px);
      }
    }
    .content{
      margin: 0 rem(25px) rem(48px);
      background:url("../../../common/image/img00/index/inquiry_bg.png") no-repeat;
      height:rem(304px);
      box-sizing: border-box;
      position: relative;
      background-size: contain;
      .login{
        position: absolute;
        top:rem(86px);
        right:rem(100px);
        p{
          @include font-dpr(16px);
          color: #909090;
          letter-spacing: 0;
          line-height: rem(32px);
          margin-bottom:rem(10px);
          text-align: center;
        }
        .btn-login{
          width:rem(254px);
          height:rem(74px);
          background: #FFFFFF;
          border: rem(1px) solid #31CFB3;
          border-radius: rem(100px);
          text-align: center;
          @include font-dpr(18px);
          color: #31CFB3;
          letter-spacing: 0;
          line-height: rem(74px);
        }

      }
    }
    .history-info{
      background: #FFFFFF;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.06);
      border-radius: 8px;
      margin:0 rem(25px) rem(50px);
      padding:rem(34px) rem(26px);
      .doctor{
        padding-bottom:rem(36px);
        border-bottom:rem(2px) solid #F1F1F1;
        .doctor-img{
          display: inline-block;
          width: rem(80px);
          height:rem(80px);
          border-radius: 50%;
          margin-right:rem(20px);
          overflow: hidden;
          background: #000;
          &>img{
            display: block;
            width:100%;
            height:100%;
            background-size: contain;
          }
        }
        .doctor-info{
          display: inline-block;
          margin-top:rem(6px);
          .doctor-type{
            @include font-dpr(12px);
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            line-height: rem(30px);
            margin-bottom:rem(8px);
            .name{
              @include font-dpr(15px);
              margin-right:rem(14px);
              vertical-align: bottom;
            }
            .career{
              @include font-dpr(15px);
              margin-left:rem(14px);
              vertical-align: bottom;
            }
          }
          .doctor-time{
            @include font-dpr(14px);
            color: #808080;
            letter-spacing: 0;
            line-height: rem(30px);
            .diagnoseType{
              margin-right:rem(16px);
            }
            .createTime{

            }
          }
        }
        .doctor-status{
          @include font-dpr(14px);
          height:rem(56px);
          width:rem(114px);
          float: right;
          opacity: 0.49;
          background: #E5E5E5;
          border-radius: rem(8px);
          color: #808080;
          letter-spacing: 0;
          line-height: rem(56px);
          margin-top:rem(14px);
          text-align: center;
          box-sizing: border-box;
        }
      }
      .patient{
        padding:rem(20px) 0 rem(40px);
        .patient-info{
          margin-bottom:rem(26px);
          &:last-child{
            margin-bottom:0;
          }
          p{
            @include font-dpr(17px);
            color: #333333;
            letter-spacing: 0;
            display: inline-block;
            font-weight: 600;
          }
          .title{
            font-weight:normal;
            display: inline-block;
            color: #555555;
            letter-spacing: 0;
            width:rem(100px)
          }
          .detail{
            vertical-align: bottom;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            padding-left:rem(100px);
            margin-left:rem(-100px);
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
