<template>
  <section class="doctorContent">
    <section class="doctorContent-box">
      <section class="doctor-personalInfo">
        <div class="doctor-personalInfoBox">
          <div class="doc-personalInfo-left">
            <!--<span class="personInfo-tips">唯医骨科认证</span>-->
            <p class="personInfo-name">王雨轩</p>
            <div class="doc-presentInfo">
              <span class="doc-major">骨科</span><span class="doc-presents">副主任医师</span><span class="doc-presents-two">博士生导师</span>
            </div>
          </div>
          <div class="doc-personalInfo-right">
            <div class="doc-personPicBox">
              <img :src="{personLogo}" src="../../../common/image/img00/doctorHome/doctorPic.png" alt="">
              <span class="doc-presentAge">从医36年</span>
              <!--<span class="doc-personPicTips">从医36年</span>-->
            </div>
          </div>
        </div>
        <!--<div class="doc-presentInfo">-->
          <!--<span class="doc-presents">副主任医师</span><span class="doc-presentAge">从医36年</span>-->
        <!--</div>-->
        <div class="doc-personalAddress">
          <p>上海交通大学医学院附属第一人民医院</p>
        </div>
        <div class="doc-personal-labelBox">
          <span class="doc-perLabel-item">三甲</span><span class="doc-perLabel-item">全国top10骨科医院</span>
        </div>
      </section>
      <!--网上问诊-->
      <section class="online-visitsBox">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">网上问诊服务</p>
          <span class="doc-lastPerson not-usable-num">剩余人数：20人</span>
        </section>
      </section>
      <!--专科信息-->
      <section class="college-infoBox doc-commonSty">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">专科信息</p>
        </section>
        <section class="doc-collegeBox">
          <section class="doc-collegeBoxItem">
            <p class="collegeItem-left">擅治疾病</p>
            <p class="collegeItem-right">颈椎病、腰椎病</p>
          </section>
          <section class="doc-collegeBoxItem">
            <p class="collegeItem-left">擅治疾病</p>
            <p class="collegeItem-right">脑瘫手术，脊椎脊髓损伤手术与康复微创手术治疗腰间盘突出综合症状</p>
          </section>
          <p class="doc-collegeBoxItem-totalNum">近年独立完成的骨科手术病历数</p>
          <section class="doc-medicalNumTotalBox">
            <section class="doc-medicalNumBox">
              <span class="doc-medicalYear">2017年</span>
              <span class="doc-medicalNumTotal">185</span>
              <span class="doc-medicalNumText">例</span>
            </section>
            <section class="doc-medicalNumBox">
              <span class="doc-medicalYear">2016年</span>
              <span class="doc-medicalNumTotal">185</span>
              <span class="doc-medicalNumText">例</span>
            </section>
          </section>
        </section>
      </section>
      <!--门诊预约-->
      <section class="outpatient-infoBox doc-commonSty">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">门诊预约</p>
          <p class="doc-titleRight">查看出诊时间</p>
        </section>
        <ul class="doc-hospitalBox">
          <li class="doc-hospitalItem">西京医院</li>
          <li class="doc-hospitalItem">马真胜医生工作室</li>
        </ul>
      </section>
      <!--个人简介-->
      <section class="individual-infoBox doc-commonSty">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">个人简介</p>
          <p class="doc-titleRight" @click="individualInfoDetail">查看全部</p>
        </section>
        <section class="individual-textBox">北京协和医和医学进步奖。掌握了一套非手术治疗颈肩腰腿痛的有效疗法，即洛阳正骨治筋疗法。优值牵引法：采用床头多功能牵引架，根据患者不同的病情采用相对应的牵引角度、牵引重量、牵引时间，进行牵引治疗以达正骨理筋的治疗。</section>
      </section>


    </section>

    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'确定',
          'cancel':'取消',
          'content':confirmContentText
//          'title':'当前WIFI未连接'
          }" v-if="levelShow" :showFlag.sync="levelShow" @cancelClickEvent="loginCancelEvent"
        @ensureClickEvent="loginEnsureEvent"></confirm>
    </transition>
    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'离开',
          'cancel':'再想想',
//          'content':'确定离开吗？',
          'title':'确定离开吗？'
          }" v-if="backShow" :showFlag.sync="backShow" @cancelClickEvent="loginBackCancelEvent"
        @ensureClickEvent="loginEnsureEventWait"></confirm>
    </transition>
    <transition name="fade">
      <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
    <loading v-show="finish"></loading>
  </section>
</template>
<script type="text/ecmascript-6">
    /**
     * @Desc：
     * @Usage:
     * @Notify：
     * @Depend：
     *
     * Created by juKun on 2017/9/11.
     */

    import api from 'common/js/util/util';
    import loading from 'components/loading';
    import fb from "common/js/third-party/flexible";
    import toast from 'components/toast';
    import confirm from 'components/confirm';
    const XHRList = {
      getPersonalProXHR: "/mcall/mcall/customer/patent/v1/getMapList/",  // 个人简介
      getCode: "/mcall/customer/send/code/v1/create/",         // get code
      codeCheck: "/mcall/customer/send/code/v1/update/",       // check code
      wxBindCheck: "/mcall/patient/customer/unite/info/v1/getIsWeixinBind/",       // check mobile is bind weiXin
      wxBind: "/mcall/patient/customer/unite/info/v1/createWxUnionIdBind/",        // mobile bind for weiXin
    };
    export default {
      data() {
        return {
          toastImg: {
            wifi: require('../../../common/image/img00/login/wifi@2x.png.png'),
            success: require('../../../common/image/img00/login/Send a success@2x.png')
          },
          personLogo:'../../../common/image/img00/doctorHome/doctorPic.png',
          imgUrl:'',
          RuleIcon: true,
          ruleShow:false,
          confirmContentText:'',
          errorMsg: '',
          errorShow: false,
          finish: false,
          levelShow:false,
          backShow:false,
          params: {
            getPersonalProParams: {
              customerId: "1461229672002",
              visitSiteId: 1,
              maxResult: 9999,
            },
            codeCheck: {
              validCode: '',	  //string	是	验证码CODE
              id: '',           //	string	是	验证码主键
              isValid: 1,       //	string	是	修改验证码信息
              account: '',      //	string	是	手机号
            },
            wxBindCheckParams:{
              isValid: 1,       //	string	是		1
              firstResult: 0,   //	string	是	分页参数
              maxResult: 99999, //	string	是	分页参数
//              customerId: "", //	string	否	用户id
              account: "",      //	string	否	手机号
            },
            wxBindParams:{
              customerId: "",   //  string  否  用户id
              account: "",      // string  否  手机号
              openid: "",       // string  是  微信openId
              isUpdate: 1,     // string  否  是否换绑1 - 换
            },
            phoneCheckParams: {
              isValid: 1,//	string	是		1
              firstResult: 0,//	string	是	分页参数
              maxResult: 99999,//string	是	分页参数
              customerId: "",//string	是	用户id
            }
          }

        }
      },
      mounted() {
        document.title="医生主页";
        this.$validator.updateDictionary({
          en: {
            custom: {
              //手机号的验证
              phone: {
                required: '请输入手机号码',
                mobile: '请输入正确的手机号码',
              },
              //患者关系的验证规则
              codeInput: {
                required: '请输入短信验证码',
                digits: '验证码错误'
              },
            }
          }
        });
//        this.getPersonalProDate();
        console.log(api.timeFormate({time:"2014-05-24 12:25:00",type:2}))
      },
//      beforeRouteLeave (to, from, next) {
//        // 导航离开该组件的对应路由时调用
//        // 可以访问组件实例 `this`
//        if (to.name === "login") {
//          this.backShow = true;
//        }
//        next(this.pageBackEnsure);
//      },
      methods: {
        validateBlur(name) {
          this.$validator.validateAll();
          if (this.errors.has(name)) {
            this.toastComm(this.errors.first(name));
          }
        },
        //get  Personal Profile
        getPersonalProDate() {
          let _this = this;
//          _this.params.getCodeParams.account = _this.phoneMessage;
          api.ajax({
            url: XHRList.getPersonalProXHR,
            method: "POST",
            data: _this.params.getPersonalProParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              console.log(data);
              if (data.responseObject.responsePk !== 0&&data.responseObject.responseStatus) {
//                _this.toastComm("验证码已发送");
//                _this.imgUrl = _this.toastImg.success;
//                _this.countDown(60);
//                _this.params.codeCheck.id=data.responseObject.responsePk
              }else{
//                _this.errorMsg = data.responseObject.responseMessage;
//                _this.errorShow = true;
//                setTimeout(() => {
//                  _this.errorShow = false;
//                }, 2000)
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //view individualInfo for detail
        individualInfoDetail(){
          this.ruleShow=true;
          this.$router.push({
            name:'individualInfo'
          })
        },
        //获取验证码
        getCodeApi() {
          this.$validator.validateAll();
          if (this.getCode){
            if (this.errors.has('phone')) {
              this.toastComm(this.errors.first('phone'));
              return;
            }
          }else{
            return;
          }
          let _this = this;
          _this.params.getCodeParams.account = _this.phoneMessage;
          api.ajax({
            url: XHRList.getCode,
            method: "POST",
            data: _this.params.getCodeParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              if (data.responseObject.responsePk !== 0&&data.responseObject.responseStatus) {
                _this.toastComm("验证码已发送");
                _this.imgUrl = _this.toastImg.success;
                _this.countDown(60);
                _this.params.codeCheck.id=data.responseObject.responsePk
              }else{
                _this.errorMsg = data.responseObject.responseMessage;
                _this.errorShow = true;
                setTimeout(() => {
                  _this.errorShow = false;
                }, 2000)
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //验证码倒计时
        countDown(time) {
          let _this = this;
          let _codeTime = time;
          _this.codeTime = _codeTime-- + "s";
          _this.getCode = false;
          let inn = window.setInterval(()=>{
            if (_codeTime > 0) {
              _this.codeTime = _codeTime-- + "s";
            } else {
              _this.getCode = true;
              _this.codeTime = "重新获取";
              clearInterval(inn);
            }
          }, 1000);
        },
        //同意条款
        ruleClick(){
          this.ruleShow=true;
          this.$router.push({
            name: ""
          });
        },
        //toast提示
        toastComm(text){
          let _this = this;
          _this.errorMsg = text;
          _this.errorShow = true;
          setTimeout(() => {
            _this.errorShow = false;
            _this.imgUrl = '';
          }, 2000)
        },
        loginEnsureEventWait(){
          this.pageBackEnsure = true;
          this.backShow = false;
        },
        loginBackCancelEvent(){
          this.pageBackEnsure = false;
          this.backShow = false;
        },
        //url参数替换
        urlReplace(url, arg, val) {
          let pattern = arg+'=([^&]*)';
          let replaceText = arg+'='+val;
          return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
        }
      },
      components: {
        loading,
        toast,
        confirm
      }
    }

</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  /*@import "../../../../scss/modules/_searchCommTop";*/

  body {
    div{
      height: 100%;
      /*.loginBackBottom{*/
        /*background:url("../../../common/image/background_wave.png") no-repeat bottom center;*/
        /*background-size:100% rem(272px);*/
      /*}*/
    }
    .doctorContent{
      background-color: #F2F2F2;
      .doctorContent-box{
        padding: rem(18px) rem(30px) rem(34px);
        .doctor-personalInfo{
          padding: rem(30px) rem(30px) rem(54px);
          background: url("../../../common/image/img00/doctorHome/background@2x.png") no-repeat center;
          background-size: 100% 100%;
          border-radius: 8px 8px 0 0;
          .doctor-personalInfoBox{
            @include clearfix();
            .doc-personalInfo-left,.doc-personalInfo-right{
              float: left;
            }
            .doc-personalInfo-left{
              width: 70%;
              .personInfo-name{
                @include font-dpr(20px);
                font-weight: bold;
                color: #FFFFFF;
                letter-spacing: 0;
                margin-top: rem(24px);
              }
              .doc-presentInfo{
                margin-top: rem(34px);
                @include font-dpr(14px);
                color: #C1D0E0;
                padding-right: rem(14px);
                display: inline-block;
                .doc-major{

                }
                .doc-presents{
                  margin-left: rem(16px);
                }
                .doc-presents-two{
                  margin-left: rem(16px);
                }
              }
              .doc-presentAge{
                @include font-dpr(12px);
                color: #FFFFFF;
                letter-spacing: 0;
                padding:rem(5px) rem(10px);
                background-color: #738FAC;
                -webkit-border-radius: 100px;
                -moz-border-radius: 100px;
                border-radius: 100px;
              }
            }
            .doc-personalInfo-right{
              width: 30%;
              text-align: right;
              @include clearfix();
              .doc-personPicBox{
                float: right;
                position: relative;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                width: rem(146px);
                height: rem(146px);
                background-color: #BCCBD8;
                img{
                  position: absolute;
                  width: rem(128px);
                  height: rem(128px);
                  -webkit-border-radius: 50%;
                  -moz-border-radius: 50%;
                  border-radius: 50%;
                  top:50%;
                  margin-top: rem(-64px);
                  left: 50%;
                  margin-left:rem(-64px);
                }
                .doc-presentAge{
                  @include font-dpr(12px);
                  text-align: center;
                  color: #FFFFFF;
                  position: absolute;
                  content: '';
                  background: #F5A623;
                  border-radius: rem(100px);
                  bottom:0;
                  left:50%;
                  margin-left: rem(-60px);
                  width: rem(120px);
                }
              }
            }
          }
          .doc-personalAddress{
            @include font-dpr(14px);
            color: #C1D0E0;
            margin-top: rem(8px);
            p{
              position: relative;
              padding-left: rem(30px);
              &:before{
                display: inline-block;
                content: '';
                position: absolute;
                width: rem(22px);
                height: rem(26px);
                background: url("../../../common/image/img00/doctorHome/positioning@2x.png") no-repeat center;
                background-size: 100% 100%;
                left:0;
                top: 50%;
                margin-top: rem(-13px);
              }
            }
          }
          .doc-personal-labelBox{
            margin-top: rem(28px);
            .doc-perLabel-item{
              @include font-dpr(12px);
              display: inline-block;
              color: #C1D0E0;
              padding: rem(8px) rem(16px);
              border: 2px solid #7C97B4;
              border-radius: rem(4px);
              margin-right: rem(16px);
            }
          }
        }
        //公共标题样式
        .doc-commonTitle{
          @include clearfix();
          padding: rem(50px) rem(60px) rem(34px) rem(30px);
          border-bottom: rem(2px) solid #F8F8F8;
          .doc-titleLeft,.doc-titleRight{
            width: 50%;
            float: left;
          }
          .doc-titleLeft{
            @include font-dpr(18px);
            color: #333333;
            position: relative;
            font-weight: bold;
            &:before{
              position: absolute;
              content: '';
              display: inline-block;
              width: rem(4px);
              height: rem(18px);
              background-color: #2FC5BD;
              top:50%;
              margin-top: rem(-9px);
              left: rem(-12px);
            }
          }
          .doc-titleRight{
            @include font-dpr(18px);
            color: #2FC5BD;
            text-align: right;
            position: relative;
            &:after{
              position: absolute;
              content: '';
              display: inline-block;
              width: rem(14px);
              height: rem(28px);
              background: rebeccapurple;
              top:50%;
              margin-top: rem(-14px);
              right: rem(-28px);
            }
          }
        }
        .doc-commonSty{
          margin-top: rem(16px);
          background-color: #FFFFFF;
          -webkit-border-radius: rem(16px);
          -moz-border-radius: rem(16px);
          border-radius: rem(16px);
        }
        //网上问诊样式
        .online-visitsBox {
          background-color: #FFFFFF;
          .doc-commonTitle {
            padding-right: rem(24px);
          }
          .doc-lastPerson {
            @include font-dpr(14px);
            display: inline-block;
            color: #F5A623;
            float: right;
            vertical-align: bottom;
            margin-top: rem(10px);
            position: relative;
            padding-left: rem(24px);
            &:before {
              position: absolute;
              content: '';
              width: rem(20px);
              height: rem(22px);
              background: url("../../../common/image/img00/doctorHome/remaining@2x.png") no-repeat center;
              background-size: 100% 100%;
              top: 50%;
              margin-top: rem(-10px);
              left: 0;
            }
            &.not-usable-off {
              color: #ACACAC;
              padding-left: rem(34px);
              &:before {
                position: absolute;
                content: '';
                width: rem(30px);
                height: rem(24px);
                background: url("../../../common/image/img00/doctorHome/Did not open@2x.png") no-repeat center;
                background-size: 100% 100%;
                top: 50%;
                margin-top: rem(-12px);
                left: 0;
              }
            }
            &.not-usable-num {
              color: #ACACAC;
              padding-left: rem(30px);
              &:before {
                position: absolute;
                content: '';
                width: rem(26px);
                height: rem(26px);
                background: url("../../../common/image/img00/doctorHome/Today's quota@2x.png") no-repeat center;
                background-size: 100% 100%;
                top: 50%;
                margin-top: rem(-13px);
                left: 0;
              }
            }
          }
        }
        //专科信息
        .college-infoBox{
          .doc-collegeBox {
            padding-top: rem(50px);
            .doc-collegeBoxItem{
              padding-bottom: rem(60px);
              @include clearfix();
              .collegeItem-left{
                float: left;
                @include font-dpr(17px);
                color: #AAAAAA;
                letter-spacing: 0;
                padding-left: rem(30px);
              }
              .collegeItem-right{
                padding-left: rem(200px);
                @include font-dpr(18px);
                color: #444444;
                letter-spacing: 0;
              }
            }
            .doc-collegeBoxItem-totalNum{
              @include font-dpr(17px);
              color: #AAAAAA;
              padding-left: rem(30px);
              padding-bottom: rem(44px);
            }
            .doc-medicalNumTotalBox{
              padding-bottom:rem(60px);
              padding-left: rem(60px);
              @include clearfix();
              .doc-medicalNumBox{
                float: left;
                width: rem(152px);
                padding-left: rem(40px);
                position: relative;
                &:first-child{
                  padding-left: 0;
                }
                &:after{
                  position: absolute;
                  content: '';
                  width: rem(2px);
                  height: rem(66px);
                  background-color: #E2E2E2;
                  top:50%;
                  margin-top: rem(-33px);
                  right: 0;
                }
                &:last-child{
                  &:after{
                    display: none;
                  }
                }
                .doc-medicalYear{
                  @include font-dpr(14px);
                  color: #A0A0A0;
                  display: inline-block;
                  border: rem(2px) solid #CECECE;
                  padding: rem(5px) rem(10px);
                  -webkit-border-radius: rem(6px);
                  -moz-border-radius: rem(6px);
                  border-radius: rem(6px);
                  margin-bottom: rem(10px);
                }
                .doc-medicalNumTotal{
                  @include font-dpr(24px);
                  color: #7C98BC;
                }
                .doc-medicalNumText{
                  @include font-dpr(14px);
                  color: #7C98BC;
                }
              }
            }
          }
        }
        //门诊预约
        .outpatient-infoBox{
          .doc-hospitalBox{
            padding: rem(38px) rem(60px);
            .doc-hospitalItem{
              @include font-dpr(18px);
              color: #444444;
              margin-bottom: rem(10px);
              position: relative;
              &:before{
                content: '';
                display: inline-block;
                width: rem(8px);
                height: rem(8px);
                position: absolute;
                left: rem(-28px);
                top:50%;
                margin-top: rem(-4px);
                background-color: #2FC5BD;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }
            }
          }
        }
        //个人简介
        .individual-infoBox{
          .individual-textBox{
            padding: rem(30px) rem(80px) rem(50px) rem(60px);
            @include font-dpr(16px);
            color: #666666;
            line-height: rem(48px);
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
