<template>
  <section class="doctorContent">
    <section class="doctorContent-box">
      <section class="doctor-personalInfo">
        <div class="doctor-personalInfoBox">
          <div class="doc-personalInfo-left">
            <!--<span class="personInfo-tips">唯医骨科认证</span>-->
            <p class="personInfo-name">{{fullName}}</p>
            <div class="doc-presentInfo">
              <span class="doc-major" v-show="false">骨科</span><span class="doc-presents">副主任医师</span><span class="doc-presents-two" v-show="false">博士生导师</span>
            </div>
          </div>
          <div class="doc-personalInfo-right">
            <div class="doc-personPicBox">
              <img :src="logoUrl"  alt="">
              <span class="doc-presentAge" v-show="false">从医36年</span>
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
          <span class="doc-lastPerson" v-show="isShowCureStatus" :class="{'isUsable-num':isUsableNum,'not-usable-num':isNotUsable,'not-usable-off':isOpenCure}">{{isCureStatusText}}</span>
        </section>
        <section class="doc-onlineContentBox">
          <!--图文问诊-->
          <section class="doc-onlineForChart">
            <section class="onlineForChart-left">
              <p>图文问诊<span>60元</span></p>
            </section>
            <section class="onlineForChart-right">
              <p @click="payPopupShow=!isNotUsable,payType='pay'" :class="{'notUsableCure':isNotUsable}">去问诊</p>
            </section>
          </section>
          <!--免费问诊-->
          <section class="doc-onlineForFree" v-show="true">
            <section class="onlineForFree-ticket" @click="payPopupShow=!isUseCureForFree&&!isNotUsable,payType='free'" :class="{'isUse':isUseCureForFree,notUsable:isNotUsable}" ></section>
          </section>
        </section>
      </section>
      <!--专科信息-->
      <section class="college-infoBox doc-commonSty">
        <section class="doc-commonTitle" v-show="areasExpertise.length>0">
          <p class="doc-titleLeft">专科：{{areasExpertise}}</p>
        </section>
        <section class="doc-collegeBox">
          <section class="doc-collegeBoxItem" v-show="illnessMapList.length>0">
            <p class="collegeItem-left">擅治疾病</p>
            <p class="collegeItem-right"><span  v-for="(item,index) in illnessMapList">{{item.illnessName}}、</span></p>
          </section>
          <section class="doc-collegeBoxItem" v-show="operationMapList.length>0">
            <p class="collegeItem-left">擅治手术</p>
            <p class="collegeItem-right" ><span v-for="(item,index) in operationMapList">{{item.operationName}}、</span></p>
          </section>
          <p class="doc-collegeBoxItem-totalNum" v-show="precedingYearOperationNum.length>0&&yesteryearOperationNum.length>0">近年独立完成的骨科手术病历数</p>
          <section class="doc-medicalNumTotalBox" v-show="precedingYearOperationNum.length>0&&yesteryearOperationNum.length>0">
            <section class="doc-medicalNumBox">
              <span class="doc-medicalYear">{{yesteryear}}年</span>
              <span class="doc-medicalNumTotal">{{precedingYearOperationNum}}</span>
              <span class="doc-medicalNumText">例</span>
            </section>
            <section class="doc-medicalNumBox">
              <span class="doc-medicalYear">{{precedingYear}}年</span>
              <span class="doc-medicalNumTotal">{{yesteryearOperationNum}}</span>
              <span class="doc-medicalNumText">例</span>
            </section>
          </section>
        </section>
      </section>
      <!--门诊预约-->
      <section class="outpatient-infoBox doc-commonSty" v-show="outpatientClinic">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">执业地点</p>
          <p class="doc-titleRight" @click="viewCureTime">查看出诊时间</p>
        </section>
        <ul class="doc-hospitalBox">
          <li class="doc-hospitalItem">{{company}}</li>
        </ul>
      </section>
      <!--个人简介斯蒂芬-->
      <section class="individual-infoBox doc-commonSty" v-show="isPersonalShow">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">个人简介</p>
          <p class="doc-titleRight" @click="individualInfoDetail">查看全部</p>
        </section>
        <section class="individual-textBox">北京协和医和医学进步奖。掌握了一套非手术治疗颈肩腰腿痛的有效疗法，即洛阳正骨治筋疗法。优值牵引法：采用床头多功能牵引架，根据患者不同的病情采用相对应的牵引角度、牵引重量、牵引时间，进行牵引治疗以达正骨理筋的治疗。</section>
      </section>
    </section>
    <transition name="fade">
      <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
    <!--支付弹层-->
    <payPopup v-if="payPopupShow" @paySuccess="paySuccessBack" @docCallBack="docStatusChange" :payPopupShow.sync="payPopupShow" :payPopupParams = "{
        docName:docName,
        docId:docId,
        caseId:caseId,
        patientId:patientId,
        patientCustomerId:patientCustomerId,
        from:from,
        payType:payType,
    }"></payPopup>
    <!--支付弹层完成-->
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
    import payPopup from 'components/payLayer';
    const XHRList = {
      getPersonalProXHR: "/mcall/mcall/customer/patent/v1/getMapList/",                    // 个人简介
      getDocMain: "/mcall/customer/auth/v1/getMapById/",                                   //医生信息
      isReceiveClinic: "/mcall/customer/clinic/setting/v1/getMapById/",                    //是否接受门诊 responseData.dataList.isReceive
      getCloseTime: "/mcall/customer/clinic/close/v1/getMapList/",                         //停诊时间
      getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",                    //问诊详情
      getEducationList: "/mcall/customer/auth/v1/getAuthSupplement/",                      //教育
      getHospitalList: "/mcall/customer/multipoint/practice/v1/getMapById2/",              //医院列表
      saveOrderClinic: "/mcall/customer/clinic/v1/create/",                                //保存预约门诊
      changeOrderClinic: "/mcall/customer/clinic/v1/update/",                              //改变患者状态,
      updateTime: "/mcall/customer/case/consultation/v1/updateFrequency/",                 //更新次数
      getConsultantInfo: "/mcall/customer/case/consultation/v1/getMapById/",               //获取会诊信息
      triageAssign: "/mcall/customer/case/consultation/v1/create/",                        //创建会诊信息
      getConsultationId: "/mcall/customer/case/consultation/v1/getConsultationFrequency/", //获取问诊Id
      getOrderDetails: "/mcall/cms/pay/order/v1/getMapById/",                              //获取订单详情
      getCurrentByCustomerId: "/mcall/customer/advice/setting/v1/getCurrentByCustomerId/", //获取剩余人数和状态
      todayIsHasOrder: "/mcall/cms/pay/order/v1/getMapByCustomerId/"                       //是否当天已经预约过门诊
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
          payPopupShow:false,
          isShowCureStatus:true,
          isUsableNum:false,
          isCureStatusText:'',
          docName:'王国强',                     //医生姓名
          docId:api.getPara().doctorId,                        //医生ID
          caseId:api.getPara().caseId,                         //病历ID
          patientId:api.getPara().patientId,                   //患者ID
          patientCustomerId:api.getPara().patientCustomerId,   //患者所属用户ID
          from:'docMain',                       //来源医生主页
          payType:'',                           //是否免费

          logoUrl:'',           //头像
          fullName:'',          //姓名
          company:"",           //医院
          medicalTitle:"",      //职称
          areasExpertise:"",    //专科
          illnessMapList:"",    //擅长疾病
          operationMapList:"",  //擅长手术
          yesteryear: new Date().getFullYear()-2,       //前年年份
          yesteryearOperationNum:"",                    //前年
          precedingYear:new Date().getFullYear()-1,    //去年年份
          precedingYearOperationNum:"",                 //去年
          outpatientClinic:"",                     //门诊是否设置
          isUseCureForFree:"",                     //是否使用过免费问诊
          isOpenCure:false,                        //是否开启问诊
          isNotUsable:false,                       //是否可用
          isPersonalShow:false,                    //个人简介是否显示
          params: {
            getPersonalProParams: {
              customerId: "1461229672002",
              visitSiteId: 1,
              maxResult: 9999,
            },
            getDocMainParams: {
              customerId:api.getPara().doctorId,
              logoUseFlag: 3
            },
            isReceiveClinicParams:{
              customerId: api.getPara().doctorId,
              hospitalId: "24362"
            },
            isCreateChatParams:{
              patientId: api.getPara().patientId,    //患者ID
              doctorId: api.getPara().doctorId,      // 医生ID
              orderType: 1,
              orderSourceType: 0,
              sortType: 2
            },
            currentByCustomerIdParams: {
              customerId: api.getPara().doctorId,
              caseId: api.getPara().caseId
            },
            getConsultationIdParams:{
              caseId: api.getPara().caseId,
              customerId: api.getPara().doctorId,
              isCreate: 1,
              isValid: 1,
              consultationType: 1,
              firstResult: 0,
              maxResult: 999
            },
            createConsultationIdParams:{
              caseId: api.getPara().caseId,
              customerId: api.getPara().doctorId,
              patientCustomerId: api.getPara().patientCustomerId,
              patientId: api.getPara().patientId,
              consultationType: 1,
              consultationState: -1,
              consultationLevel: '',
              siteId: 17,
              caseType: 0
            }
          }
        }
      },
      mounted() {
        document.title="医生主页";
        let _this=this;
        this.getPersonalProDate();
        this.getDocInfo();
        this.getIsReceiveClinic();
        this.isCreateChatForFree();
        this.questionStatus({callBack:(data)=>{
          _this.checkPatientState(data);
        }});
      },
      methods: {
        //view cureTime
        viewCureTime(){
          let _this=this;
          this.ruleShow=true;
          this.$router.push({
            name:'clinicDetails',
            params:{
              docterId: _this.docId,
              hospitalId: _this.hospitalId,
              docName: _this.fullName,
              docTitle: _this.medicalTitle
            }
          })
        },
        //获取医生信息
        getDocInfo(){
          let _this = this;
          api.ajax({
            url: XHRList.getDocMain,
            method: "POST",
            data: _this.params.getDocMainParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              console.log(data);
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let _data = data.responseObject.responseData.dataList[0],
                  _logoUrl = _data.logoUrlMap.logoUrl;
                _this.fullName = _data.authMap.fullName;
                _this.company = _data.authMap.company;
                _this.hospitalId = _data.authMap.companyId;
                _this.medicalTitle = _data.authMap.medicalTitle;
                _this.areasExpertise = _data.authMap.areasExpertise;
                _this.precedingYearOperationNum = _data.authMap.precedingYearOperationNum;
                _this.yesteryearOperationNum = _data.authMap.yesteryearOperationNum;
                _this.illnessMapList = _data.illnessMapList;
                _this.operationMapList = _data.operationMapList;
                if (_logoUrl.length > 0) {
                  _this.logoUrl = _logoUrl;
                } else {
                  _this.logoUrl = require("../../../common/image/img00/doctorHome/docLogo_default.jpg");
                }
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //是否创建过免费聊天
        isCreateChatForFree(isfc) {
          let _this = this;
          api.ajax({
            url: XHRList.getOrderDetails,
            method: "POST",
            data: _this.params.isCreateChatParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              console.log(data);
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let  _orderAmount = data.responseObject.responseData.dataList[0].orderAmount;
                if (!parseInt(_orderAmount) > 0) {
                  //未使用免费问诊
                  _this.isUseCureForFree=false;
                } else {
                  //已使用免费问诊
                  _this.isUseCureForFree=true;
                }
              }else{
                //无数据时   展示未使用免费问诊
                _this.isUseCureForFree=false;
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //支付成功回调
        paySuccessBack(data){
          let _this=this,
              _orderAmount = data.orderAmount,         //金额
              _orderFrequency = data.orderFrequency,   //次数
              _orderType = data.orderType;             //0-免费
          switch (_orderType){
            case 0:
              //免费
              console.log("创建免费问诊");
              _this.getConsultationId({orderType:_orderType,callBackFn:()=>{
                _this.reloadIMTime({
                  data:data,
                  callBack:()=>{
                    console.log("免费--跳页");
                    window.location.href = '/dist/imSceneDoctor.html?caseId=' + _this.caseId + '&doctorCustomerId=' + _this.doctorId + '&patientCustomerId=' + _this.patientCustomerId + '&patientId=' + _this.patientId;
                  }
                });
              }});
              break;
            case 1:
              //图文问诊
              console.log("创建图文问诊");
              _this.getConsultationId({orderType:_orderType,callBackFn:()=>{
                _this.reloadIMTime({
                  data:data,
                  callBack:()=>{
                    console.log("收费--跳页");
                    window.location.href = '/dist/imSceneDoctor.html?caseId=' + _this.caseId + '&doctorCustomerId=' + _this.doctorId + '&patientCustomerId=' + _this.patientCustomerId + '&patientId=' + _this.patientId;
                  }
                });
              }});
              break;
          }
        },
        //获取consultationId
        getConsultationId(org) {
          let _this = this;
          api.ajax({
            url: XHRList.getConsultationId,
            method: "POST",
            data: _this.params.getConsultationIdParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let consultationIds = data.responseObject.responseData.dataList.consultationId;
                if(consultationIds ==0){
                  _this.createConsultationId({
                    createType:org.orderType,
                    callBack:()=>{
                      org.callBackFn();
                    }
                  });
                }else{
                  _this.consultationId = data.responseObject.responseData.dataList.consultationId;
                  org.callBackFn();
                }
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //创建consultationId
        createConsultationId(create){
          let _this = this;
          if (create.createType==0){
            //免费问诊
            _this.params.createConsultationIdParams.consultationLevel=0;
          }else {
            //图文问诊
            _this.params.createConsultationIdParams.consultationLevel=1;
          }
          api.ajax({
            url: XHRList.triageAssign,
            method: "POST",
            data: _this.params.createConsultationIdParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                _this.consultationId = data.responseObject.responseData.dataList.consultationId;
                create.callBack();
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //刷新IM时间
        reloadIMTime(count){
          const _this = this;
          api.ajax({
            url: XHRList.updateCount,
            method: "POST",
            data: {
              consultationId: _this.consultationId,
              frequency: count.data.orderFrequency,
              frequencyType: "2",
              consultationLevel: count.data.orderType,
              consultationState: -1
            },
            beforeSend: function () {
              _this.finish = true;
            },
            done(data) {
              _this.finish = false;
              if (data.responseObject.responseStatus) {
                localStorage.setItem("sendTips",JSON.stringify(count.data));
              }
            }
          })
        },
        //是否开启问诊及剩余咨询人数
        questionStatus (Obj) {
          let _this = this;
          api.ajax({
            url: XHRList.getCurrentByCustomerId,
            method: "POST",
            data: _this.params.currentByCustomerIdParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              console.log(data);
              if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let _dataList = data.responseObject.responseData.dataList;
                Obj.callBack(_dataList);
              }
            },
            fail(err){
              _this.finish = false;
              _this.toastComm("网络信号差，建议您稍后再试");
              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        checkPatientState (cps) {
          let _this=this,
              _remainNum = cps.remainNum,
              _state = cps.state,
              _conState = cps.conState,
              _consultationState = cps.consultationState;    //0-进行中  2-已拒绝
          if (_state == 1) {
            //开启问诊
            _this.isOpenCure=false;
            if (_remainNum !== 0) {    //_remainNum!==0 (-1次数无限)
              //剩余人数>0
              if (_remainNum > 0) {
                _this.isNotUsable=false;
                _this.isUsableNum=true;
                _this.isCureStatusText = `今日剩余名额：${_remainNum}人`;
              }else {
                _this.isShowCureStatus = false;
              }
            } else {
              //无剩余名额
              _this.isNotUsable=true;
              _this.isCureStatusText = `今日名额：0`;
            }
          } else {
            //未开启问诊
            _this.isOpenCure = true;
            _this.isCureStatusText = "医生未开启问诊";
            _this.isNotUsable = true;
          }
          //医生拒绝
          if(_consultationState==2){
            _this.isNotUsable = true;
          }
        },
        //是否接受门诊
        getIsReceiveClinic(){
          let _this = this;
          api.ajax({
            url: XHRList.isReceiveClinic,
            method: "POST",
            data: _this.params.isReceiveClinicParams,
            beforeSend: function () {
              _this.finish = true;
            },
            timeout: 20000,
            done(data) {
              _this.finish = false;
              console.log(data);
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let _isReceive = data.responseObject.responseData.dataList[0].isReceive;
                if(parseInt(_isReceive)==1){
                  _this.outpatientClinic = true;
                }else {
                  _this.outpatientClinic = false;
                }

              }else{
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
        //get  Personal Profile
        getPersonalProDate() {
          let _this = this;
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
              if (data&&data.responseObject.responseData && data.responseObject.responseData.data_list) {
                _this.personalIndividual=data.responseObject.responseData.data_list;

              }else{
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
        //view individualInfo for detail
        individualInfoDetail(){
          let _this=this;
          console.log(_this.personalIndividual);
          this.ruleShow=true;
          this.$router.push({
            name:'individualInfo',
            params:_this.personalIndividual
          })
        },
        //医生端状态更改
        docStatusChange(statueType){
          let _this=this;
          switch (statueType){
            case 1:
              //暂未开启问诊
              _this.isOpenCure = true;
              _this.isCureStatusText = "医生未开启问诊";
              _this.isNotUsable = true;
              break;
            case 2:
              //问诊名额:0
              _this.isNotUsable=true;
              _this.isCureStatusText = `今日名额：0`;
              break;
          }
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
      },
      components: {
        loading,
        toast,
        confirm,
        payPopup
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
                  margin-right: rem(16px);
                }
                .doc-presents{
                  margin-right: rem(16px);
                }
                .doc-presents-two{
                  /*margin-left: rem(16px);*/
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
                background: url("../../../common/image/img00/doctorHome/head- background@2x.png") no-repeat center;
                background-size: 100% 100%;
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
              background: url("../../../common/image/img00/doctorHome/ more@2x.png") no-repeat center;
              background-size: 100% 100%;
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
            &.isUsable-num{
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
          .doc-onlineContentBox{
            //免费问诊
            .doc-onlineForChart{
              @include clearfix();
              padding: rem(24px) rem(30px) rem(38px) rem(50px);
              .onlineForChart-left{
                float: left;
                padding-top: rem(12px);
                p{
                  @include font-dpr(18px);
                  color: #444444;
                  position: relative;
                  span{
                    @include font-dpr(16px);
                    color: #7C98BC;
                    margin-left: rem(22px);
                  }
                  &:before{
                    display: inline-block;
                    content: '';
                    position: absolute;
                    width: rem(8px);
                    height: rem(8px);
                    left: rem(-16px);
                    top: 50%;
                    margin-top:rem(-4px);
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    background-color: #2FC5BD;
                  }
                }
              }
              .onlineForChart-right{
                float: right;
                p{
                  @include font-dpr(18px);
                  color: #FFFFFF;
                  padding: rem(14px) rem(22px) rem(12px) rem(26px);
                  background: #2FC5BD;
                  box-shadow: 0 4px 8px 0 rgba(89,209,202,0.40);
                  border-radius: rem(100px);
                  &.notUsableCure{
                    background: #E2E2E2;
                    box-shadow: none;
                  }
                }
              }
            }
            //图文问诊
            .doc-onlineForFree{
              padding-bottom: rem(34px);
              .onlineForFree-ticket{
                margin: 0 auto;
                width: rem(648px);
                height: rem(182px);
                background:url("../../../common/image/img00/doctorHome/clickable@2x.png") no-repeat center;
                background-size: 100% 100%;
                &.isUse{
                  background:url("../../../common/image/img00/doctorHome/Has been used@2x.png") no-repeat center;
                  background-size: 100% 100%;
                }
                &.notUsable{
                  background:url("../../../common/image/img00/doctorHome/not click@2x.png") no-repeat center;
                  background-size: 100% 100%;
                }
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
              .collegeItem-left{
                @include font-dpr(18px);
                color: #444444;
                padding-left: rem(50px);
                margin-bottom: rem(14px);
                position: relative;
                &:before{
                  display: inline-block;
                  content: '';
                  position: absolute;
                  width: rem(8px);
                  height: rem(8px);
                  top:50%;
                  margin-top: rem(-4px);
                  left:rem(32px);
                  background-color: #2FC5BD;
                  -webkit-border-radius: 50%;
                  -moz-border-radius: 50%;
                  border-radius: 50%;
                }
              }
              .collegeItem-right{
                padding-left: rem(52px);
                @include font-dpr(18px);
                color: #999999;
              }
            }
            .doc-collegeBoxItem-totalNum{
              @include font-dpr(18px);
              color: #444444;
              padding-left: rem(50px);
              margin-bottom: rem(44px);
              position: relative;
              &:before{
                display: inline-block;
                content: '';
                position: absolute;
                width: rem(8px);
                height: rem(8px);
                top:50%;
                margin-top: rem(-4px);
                left:rem(32px);
                background-color: #2FC5BD;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }
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
