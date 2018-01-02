<template>
  <div data-alcode-mod='719'>
    <section class="doctorContent" >
    <section class="doctorContent-box">
      <section class="doctor-personalInfo">
        <div class="doctor-personalInfoBox">
          <div class="doc-personalInfo-left">
            <p class="personInfo-name">{{fullName}}</p>
            <div class="doc-presentInfo">
              <span class="doc-major" v-show="platformId.length>0">{{(platformId==1?"骨科":"手外科")}}</span><span class="doc-presents" v-show="medicalTitleNewArr[0]&&medicalTitleNewArr[0].length>0">{{medicalTitleNewArr[0]}}</span><span class="doc-presents-two" v-show="medicalTitleNewArr[1]&&medicalTitleNewArr[1].length>0">{{medicalTitleNewArr[1]}}</span><span class="doc-presents-two" v-show="medicalTeacher.length>0">{{medicalTeacher}}</span>
            </div>
          </div>
          <div class="doc-personalInfo-right">
            <div class="doc-personPicBox">
              <img :src="logoUrl"  alt="">
              <span class="doc-presentAge" v-show="jobDoctorYear>0">从医{{jobDoctorYear}}年</span>
            </div>
          </div>
        </div>
        <div class="doc-personalAddress" v-show="company.length>0">
          <p>{{company}}</p>
        </div>
        <div class="doc-personal-labelBox" v-show="hospitalLevel.length>0||isTop==1">
          <span class="doc-perLabel-item" v-show="hospitalLevel.length>0">{{hospitalLevel}}</span><span class="doc-perLabel-item" v-show="isTop==1">全国top10骨科医院</span>
        </div>
      </section>
      <!--网上问诊-->
      <section class="online-visitsBox" v-show="!isDoctorID">
        <section class="doc-commonTitle">
          <p class="doc-titleLeft">网上问诊服务</p>
          <span class="doc-lastPerson" v-show="isShowCureStatus" :class="{'isUsable-num':isUsableNum,'not-usable-num':isNotUsable,'not-usable-off':isOpenCure}">{{isCureStatusText}}</span>
        </section>
        <section class="doc-onlineContentBox">
          <!--图文问诊-->
          <section class="doc-onlineForChart">
            <section class="onlineForChart-left">
              <p>图文问诊<span v-show="generalPrice.length>0">{{generalPrice}}元</span></p>
            </section>
            <section class="onlineForChart-right">
              <p data-alcode='e133' @click="payPopupShow=!isNotUsable&&!isOpenCure,payType='pay'" :class="{'notUsableCure':isNotUsable||isOpenCure}">去问诊</p>
            </section>
          </section>
          <!--免费问诊-->
          <section class="doc-onlineForFree" v-show="inquiryState>0">
            <section class="onlineForFree-ticket" @click="payPopupShow=!isUseCureForFree&&!isNotUsable&&!isOpenCure,payType='free'" :class="{'isUse':isUseCureForFree,notUsable:isNotUsable||isOpenCure}" ></section>
          </section>
        </section>
      </section>
      <!--立即问诊-->
      <section class="physician-immediately" v-show="isDoctorID">
        <section class="doc-commonTitle hasBtnForLink">
          <p class="doc-titleLeft">您是我的新患者</p>
          <p class="doc-titleRight-bigLabel" @click="newCurePatient"></p>
        </section>
        <section class="immediately-contentBox">
          <p class="immediately-title">我可以帮您</p>
          <span class="immediately-item">1.在线问诊</span><span class="immediately-item">2.预约门诊</span>
        </section>
      </section>
      <!--诊后报道-->
      <section class="cureAfterReport" v-show="isDoctorID">
        <section class="doc-commonTitle hasBtnForLink">
          <p class="doc-titleLeft">您是我的门诊/住院患者</p>
          <p class="doc-titleRight-bigLabel copyOne" @click="oldCurePatient"></p>
        </section>
        <section class="immediately-contentBox">
          <p class="immediately-title">我可以帮您</p>
          <span class="immediately-item">1.在线问诊</span><span class="immediately-item">2.预约门诊</span><span class="immediately-item">3.在线复查评估</span>
        </section>
      </section>
      <!--专科信息-->
      <section class="college-infoBox doc-commonSty" v-show="areasExpertise.length>0||illnessMapList.length>0||operationMapList.length>0||precedingYearOperationNum.length>0||yesteryearOperationNum.length>0">
        <section class="doc-commonTitle " v-show="areasExpertise.length>0">
          <section class="overFlowHidden">
            <p class="doc-titleLeft doc-majorItem">专科：{{areasExpertise}}</p>
          </section>
        </section>
        <section class="doc-collegeBox">
          <section class="doc-collegeBoxItem" v-show="illnessMapList.length>0">
            <p class="collegeItem-left">擅治疾病</p>
            <p class="collegeItem-right"><span  v-for="(item,index) in illnessMapList">{{item.illnessName}}{{((index==illnessMapList.length-1)?"":"、")}}</span></p>
          </section>
          <section class="doc-collegeBoxItem" v-show="operationMapList.length>0">
            <p class="collegeItem-left">擅治手术</p>
            <p class="collegeItem-right" ><span v-for="(item,index) in operationMapList">{{item.operationName}}{{((index==operationMapList.length-1)?"":"、")}}</span></p>
          </section>
          <p class="doc-collegeBoxItem-totalNum" v-show="precedingYearOperationNum>0||yesteryearOperationNum>0">近年独立完成的骨科手术病历数</p>
          <section class="doc-medicalNumTotalBox" v-show="precedingYearOperationNum>0||yesteryearOperationNum>0">
            <section class="doc-medicalNumBox">
              <span class="doc-medicalYear">{{yesteryear}}年</span>
              <span class="doc-delTextBox"><span class="doc-medicalNumTotal">{{precedingYearOperationNum}}</span><span class="doc-medicalNumText">例</span></span>
            </section>
            <section class="doc-medicalNumBox">
              <span class="doc-medicalYear">{{precedingYear}}年</span>
              <span class="doc-delTextBox"><span class="doc-medicalNumTotal">{{yesteryearOperationNum}}</span><span class="doc-medicalNumText">例</span></span>
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
        <ul class="doc-hospitalBox" v-show="company.length>0">
          <li class="doc-hospitalItem">{{company}}</li>
        </ul>
      </section>
      <!--个人简介-->
      <section class="individual-infoBox doc-commonSty" v-show="isPersonalIndividualShow">
        <section class="doc-commonTitle forPersonal">
          <p class="doc-titleLeft">个人简介</p>
          <p class="doc-titleRight-personInfo" @click="individualInfoDetail"></p>
        </section>
        <section class="individual-textBox" v-show="summary.length>0">
          <p>{{summary}}</p>
        </section>
      </section>
    </section>
    <transition name="fade">
      <toast :content="errorMsg" :imgUrl="imgUrl" v-if="errorShow"></toast>
    </transition>
    <!--支付弹层-->
    <payPopup v-if="payPopupShow" @paySuccess="paySuccessBack" @docCallBack="docStatusChange" :payPopupShow.sync="payPopupShow" :payPopupParams = "{
        docName:fullName,
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
  </div>
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
    import wxBind from 'common/js/auth/wxBinding';
    import siteSwitch from '@/common/js/siteSwitch/siteSwitch';

    const XHRList = {
      getPersonalProXHR: "/mcall/mcall/customer/patent/v1/getMapList/",                    // 个人简介
      getDocMain: "/mcall/customer/auth/v1/getMapById/",                                   //医生信息
      isReceiveClinic: "/mcall/customer/clinic/setting/v1/getMapById/",                    //是否接受门诊 responseData.dataList.isReceive
      getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",                    //问诊详情
      updateTime: "/mcall/customer/case/consultation/v1/updateFrequency/",                 //更新次数
      getConsultationId: "/mcall/customer/case/consultation/v1/getConsultationFrequency/", //获取问诊Id
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
          isDoctorID:false,
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
          docId:api.getPara().doctorCustomerId,                //医生ID
          caseId:api.getPara().caseId,                         //病历ID
          patientId:api.getPara().patientId,                   //患者ID
          patientCustomerId:api.getPara().patientCustomerId?api.getPara().patientCustomerId:localStorage.getItem("customerId"),   //患者所属用户ID(医生主页、医生名片)
          from:'docMain',                       //来源医生主页
          payType:'',                           //是否免费
          logoUrl:'',           //头像
          fullName:'',          //姓名
          company:"",           //医院
          hospitalId:'',        //医院Id
          medicalTitleNewArr:[],
          medicalTeacher:"",
          personalIndividual:[
            ""
          ],
//          hospitalTitle:"",      //职称
//          eduTitle:"",           //职称
          jobDoctorYear:"",           //职称
          medicalTitle:"",      //职称
          platformId:'',        //科室
          hospitalLevel:'',     //三甲
          isTop:'',             //全国top10   1-是 0-否
          areasExpertise:"",    //专科
          illnessMapList:"",    //擅长疾病
          operationMapList:"",  //擅长手术
          generalPrice:'',      //咨询的价格 (图文问诊)
          yesteryear: new Date().getFullYear()-2,       //前年年份
          yesteryearOperationNum:"",                    //前年
          precedingYear:new Date().getFullYear()-1,    //去年年份
          precedingYearOperationNum:"",                 //去年
          inquiryState:"",                         //问诊是否设置免费   >0 开通
          outpatientClinic:"",                     //门诊是否设置
          isUseCureForFree:"",                     //是否使用过免费问诊
          isOpenCure:false,                       //是否开启问诊
          isNotUsable:false,                      //是否可用
          summary:"",                              //个人简介内容
          isPersonalIndividualShow:false,               //个人简介是否显示
          params: {
            getPersonalProParams: {
              customerId: api.getPara().doctorCustomerId,
              visitSiteId: 1,
              maxResult: 9999,
            },
            getDocMainParams: {
              customerId:api.getPara().doctorCustomerId,
              logoUseFlag: 3
            },
            isReceiveClinicParams:{
              customerId: api.getPara().doctorCustomerId,
              hospitalId: ""
            },
            isCreateChatParams:{
              patientId: api.getPara().patientId,    //患者ID
              doctorId: api.getPara().doctorCustomerId,      // 医生ID
              orderType: 1,
              orderSourceType: 0,
              sortType: 2
            },
            currentByCustomerIdParams: {
              customerId: api.getPara().doctorCustomerId,
              caseId: api.getPara().caseId,
              patientId: api.getPara().patientId,    //患者ID
//              doctorId: api.getPara().doctorCustomerId,      // 医生ID
              orderType: 1,
              orderSourceType: 0,
              sortType: 2
            },
            getConsultationIdParams:{
              caseId: api.getPara().caseId,
              customerId: api.getPara().doctorCustomerId,
              isCreate: 1,
              isValid: 1,
              consultationType: 1,
              firstResult: 0,
              maxResult: 999
            },
            createConsultationIdParams:{
              caseId: api.getPara().caseId,
              customerId: api.getPara().doctorCustomerId,
              patientCustomerId: api.getPara().patientCustomerId?api.getPara().patientCustomerId:localStorage.getItem("customerId"),
              patientId: api.getPara().patientId,
              consultationType: 1,
              consultationState: -1,
              consultationLevel: '',
              siteId: 17,
              caseType: 0
            },
            getGoodsInfoParams:{
              customerId: api.getPara().doctorCustomerId
            }
          }
        }
      },
      mounted() {
        if(api.getPara().doctorCustomerId){//医生主页
          localStorage.setItem("bindDocId",api.getPara().doctorCustomerId);
        }
        debugger
        console.log(api.getPara().from);
        if(api.getPara().from&&api.getPara().from=='report'){
          this.isDoctorID = true;
          if(!api.getPara().doctorCustomerId&&typeof Number(api.getPara().wxState) == 'number'){
            window.location.href=`${window.location.href.split("#")[0]}&doctorCustomerId=${localStorage.getItem("bindDocId")}`;
          }else{
            //微信中绑定微信
            wxBind.isBind({
              callBack:()=>{
                this.init();
              }
            });
          }
        }else{
          this.init();
        }
      },
      methods: {
        init(){
          this.getPersonalProDate();
          this.getDocInfo();
          this.questionStatus({callBack:(data)=>{
            _this.checkPatientState(data);
          }});
          this.getGoodsInfo();
          api.forbidShare();
        },
        viewCureTime(){
          let _this=this;
          this.ruleShow=true;
          this.$router.push({
            name:'clinicDetails',
            params:{
              docLogo:_this.logoUrl,
              doctorId: _this.docId,
              hospitalId: _this.hospitalId,
              docName: _this.fullName,
              docTitle: _this.medicalTitleNewArr
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
//            timeout: 20000,
            done(data) {
              _this.finish = false;
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let _data = data.responseObject.responseData.dataList[0],
                  _logoUrl = _data.logoUrlMap.logoUrl;
                _this.fullName = api.getStrByteLen(_data.authMap.fullName,20);  //医生姓名 10
                _this.company = _data.authMap.company;
                _this.hospitalId = _data.authMap.companyId;
                _this.medicalTitle = _data.authMap.medicalTitle;
                _this.platformId = _data.authMap.platformId;           //科室
                _this.summary = _data.authMap.summary;                 //个人简介
                _this.isTop = _data.authMap.isTop;                    //全国   1-是 0-否
                _this.precedingYearOperationNum = _data.authMap.precedingYearOperationNum;
                _this.yesteryearOperationNum = _data.authMap.yesteryearOperationNum;
                _this.illnessMapList = _data.illnessMapList;
                _this.operationMapList = _data.operationMapList;
                _this.jobDoctorYear = _data.authMap.jobDoctorYear;            //从医年限

                let _hospitalLevel = _data.authMap.hospitalLevelId;     //三甲
                let _areasExpertise = _data.authMap.areasExpertise;     //专科字符串
                //职称
                let _medicalTitleArr=_this.medicalTitle.split(",");
                _medicalTitleArr.forEach((element,index) => {
                  _this.medicalTitleNewArr.push(element.substring(element.indexOf("_")+1));
                });
                if(_this.medicalTitleNewArr.indexOf("博士生导师")>0){
                  _this.medicalTeacher="博导";
                }else if(_this.medicalTitleNewArr.indexOf("硕士生导师")>0){
                  _this.medicalTeacher="硕导";
                }
                //头像
                if (_logoUrl.length > 0) {
                  _this.logoUrl = _logoUrl;
                } else {
                  _this.logoUrl = require("../../../common/image/img00/doctorHome/docLogo_default.jpg");
                }
                //三甲医院
                switch (_hospitalLevel){
                  case 0:
                    _this.hospitalLevel='';
                    break;
                  case 1:
                    _this.hospitalLevel="三甲";
                    break;
                  case 2:
                    _this.hospitalLevel="三乙";
                    break;
                  case 3:
                    _this.hospitalLevel="三丙";
                    break;
                  case 4:
                    _this.hospitalLevel="二甲";
                    break;
                  case 5:
                    _this.hospitalLevel="二乙";
                    break;
                  case 6:
                    _this.hospitalLevel="二丙";
                    break;
                  case 7:
                    _this.hospitalLevel="一甲";
                    break;
                  case 8:
                    _this.hospitalLevel="一乙";
                    break;
                  case 9:
                    _this.hospitalLevel="一丙";
                    break;
                  case 10:
                    _this.hospitalLevel="一级";
                    break;
                }
                //专科字符串
                let _areasExpertiseArr=_areasExpertise.split(",");
                _areasExpertiseArr.forEach((element,index) => {
                  if(index==_areasExpertiseArr.length-1){
                    _this.areasExpertise += element.substring(element.indexOf("_")+1);   //专科字符串
                  }else{
                    _this.areasExpertise += element.substring(element.indexOf("_")+1)+"、";   //专科字符串
                  }
                });
                // 标题 医生姓名
                let _fullName = _this.fullName;
                document.title=`${_fullName}医生`;
                //是否接受门诊
                _this.getIsReceiveClinic();
              }
            },
            fail(err){
              _this.finish = false;
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //获取商品详情
        getGoodsInfo(){
          let _this=this;
          api.ajax({
            url:XHRList.getVisitDetails,
            method:"POST",
            data:_this.params.getGoodsInfoParams,
            beforeSend:function () {
              _this.finish = true;
            },
            timeout:20000,
            done(data){
              _this.finish = false;
              if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                let _dataList = data.responseObject.responseData.dataList[0];
                _this.generalPrice=_dataList.generalPrice;   // 图文问诊 (老接口普通问诊价格)
                _this.inquiryState=_dataList.freeTimes;      //  >0 已开通免费问诊
              }
            },
            fail(){
              _this.finish = false;
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
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
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
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
//              console.log("创建免费问诊");
              _this.getConsultationId({callBackFn:()=>{
                _this.reloadIMTime({
                  data:data,
                  callBack:()=>{
//                    console.log("免费--跳页");
                    window.location.href = '/dist/imSceneDoctor.html?caseId=' + _this.caseId + '&doctorCustomerId=' + _this.docId + '&patientCustomerId=' + _this.patientCustomerId + '&patientId=' + _this.patientId;
                  }
                });
              }});
              break;
            case 1:
              //图文问诊
//              console.log("创建图文问诊");
              _this.getConsultationId({callBackFn:()=>{
                _this.reloadIMTime({
                  data:data,
                  callBack:()=>{
//                    console.log("收费--跳页");
                      window.location.href = '/dist/imSceneDoctor.html?caseId=' + _this.caseId + '&doctorCustomerId=' + _this.docId + '&patientCustomerId=' + _this.patientCustomerId + '&patientId=' + _this.patientId;
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
//              console.log("获取consultationId成功");
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                  _this.consultationId = data.responseObject.responseData.dataList.consultationId;
                  console.log(_this.consultationId);
                  org.callBackFn();
              }
            },
            fail(err){
//              console.log("获取consultationId失败");
              _this.finish = false;
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //刷新IM时间
        reloadIMTime(count){
          const _this = this;
          api.ajax({
            url: XHRList.updateTime,
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
//              console.log(data);
//              console.log("刷新时间...");
              if (data.responseObject.responseStatus) {
                localStorage.setItem("sendTips",JSON.stringify(count.data));
                count.callBack();
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
              if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let _dataList = data.responseObject.responseData.dataList;
                Obj.callBack(_dataList);
              }
            },
            fail(err){
              _this.finish = false;
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        checkPatientState (cps) {
          let _this=this,
              _remainNum = cps.remainNum,
              _state = cps.state,
              _conState = cps.conState,
              _isFree = cps.isFree,
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
            _this.isNotUsable = false;
          }
          //医生拒绝
          if(_consultationState==2){
            _this.isNotUsable = true;
          }
          //是否使用过免费问诊
          if(_isFree==0){
            //试用过
            _this.isUseCureForFree=true;
          }else {
            //未使用
            _this.isUseCureForFree=false;
          }
        },
        //是否接受门诊
        getIsReceiveClinic(){
          let _this = this;
          _this.params.isReceiveClinicParams.hospitalId = _this.hospitalId;
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
              if (data&&data.responseObject.responseData && data.responseObject.responseData.dataList) {
                let _isReceive = data.responseObject.responseData.dataList[0].clinicState;   //0-未开启   1-开启
                if(parseInt(_isReceive)==1){
                  _this.outpatientClinic = true;
                }else {
                  _this.outpatientClinic = false;
                }

              }else{
//                _this.errorShow = true;
//                setTimeout(() => {
//                  _this.errorShow = false;
//                }, 2000)
              }
            },
            fail(err){
              _this.finish = false;
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
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
              if (data && data.responseObject.responseData && data.responseObject.responseData.data_list) {
                _this.personalIndividual = data.responseObject.responseData.data_list;
                const _personalIndividual = data.responseObject.responseData.data_list;
                if (_personalIndividual.continuingEducationList && _personalIndividual.continuingEducationList.length > 0   ) {
                  _this.isPersonalIndividualShow = true;
                }else if( _personalIndividual.educationList && _personalIndividual.educationList.length > 0){
                  _this.isPersonalIndividualShow = true;
                }else if( _personalIndividual.honorList && _personalIndividual.honorList.length > 0){
                  _this.isPersonalIndividualShow = true;
                }else if( _personalIndividual.fundList && _personalIndividual.fundList.length > 0){
                  _this.isPersonalIndividualShow = true;
                }else {
                  _this.isPersonalIndividualShow = true;
                }
              }
            },
            fail(err){
              _this.finish = false;
//              _this.toastComm("网络信号差，建议您稍后再试");
//              _this.imgUrl = _this.toastImg.wifi;
            }
          })
        },
        //view individualInfo for detail
        individualInfoDetail(){
          let _this=this,
          _summary ={summary:_this.summary},
          _fullName ={fullName:_this.fullName};
//          _this.personalIndividual.summary=_this.summary;
//          _this.personalIndividual.fullName=_this.fullName;
          Object.assign(_this.personalIndividual, _summary, _fullName);
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
        //新患者立即问诊
        newCurePatient(){
          let _patientCustomerId=api.getPara().customerId;
          window.location.href=`/dist/consult.html?customerId=${_patientCustomerId}&doctorId=${this.docId}`;
        },
        //诊后报道
        oldCurePatient(){
          let _patientCustomerId=api.getPara().customerId;
          window.location.href=`/dist/patientReport.html?customerId=${_patientCustomerId}&doctorId=${this.docId}`;
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

  body {
    div{
      height: 100%;
    }
    .doctorContent{
      background-color: #F2F2F2;
      .doctorContent-box{
        padding: rem(32px) rem(30px) rem(34px);
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
              width: 75%;
              .personInfo-name{
                @include font-dpr(20px);
                font-weight: bold;
                color: #FFFFFF;
                letter-spacing: 0;
                margin-top: rem(24px);
              }
              .doc-presentInfo{
                margin-top: rem(22px);
                @include font-dpr(14px);
                color: #C1D0E0;
                /*padding-right: rem(14px);*/
                display: inline-block;
                .doc-major{
                  margin-right: rem(16px);
                }
                .doc-presents{
                  margin-right: rem(16px);
                }
                .doc-presents-two{
                  margin-right: rem(16px);
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
              width: 25%;
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
              padding: rem(4px) rem(16px);
              border: rem(2px) solid #7C97B4;
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
          .overFlowHidden{
            @include clearfix();
            position: relative;
            &:before{
              position: absolute;
              content: '';
              display: inline-block;
              width: rem(6px);
              height: rem(24px);
              background: url("../../../common/image/img00/doctorHome/Line Copy 4@2x.png") no-repeat center;
              background-size: rem(5px) rem(20px);
              top:50%;
              margin-top: rem(-12px);
              left: rem(-12px);
            }
          }
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
              width: rem(6px);
              height: rem(24px);
              background: url("../../../common/image/img00/doctorHome/Line Copy 4@2x.png") no-repeat center;
              background-size: rem(5px) rem(20px);
              top:50%;
              margin-top: rem(-12px);
              left: rem(-12px);
            }
            //专科
            &.doc-majorItem{
              width: 100%;
              -ms-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space:nowrap;
              overflow: hidden;
            }
          }
          .doc-titleRight{
            @include font-dpr(18px);
            color: #07B6AC;
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
              margin-top: rem(-10px);
              right: rem(-28px);
            }
          }
          //医生名片问诊
          &.hasBtnForLink{
            position: relative;
            .doc-titleLeft{
              width: 100%;
            }
            .doc-titleRight-bigLabel{
              position: absolute;
              width: rem(224px);
              height: rem(92px);
              background: url("../../../common/image/img00/doctorHome/Group 2@2x.png") no-repeat center;
              background-size: 100% 100%;
              right: rem(10px);
              top:62%;
              margin-top: rem(-46px);
              &.copyOne{
                background: url("../../../common/image/img00/doctorHome/Group 31@2x.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
          }
          //个人简介图标
          &.forPersonal{
            position: relative;
            .doc-titleRight-personInfo{
              position: absolute;
              width: rem(172px);
              height: rem(34px);
              background: url("../../../common/image/img00/doctorHome/Group 5@2x.png") no-repeat center;
              background-size: 100% 100%;
              right: rem(34px);
              top:56%;
              margin-top: rem(-17px);
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
          -webkit-border-radius:0 0 rem(16px) rem(16px);
          -moz-border-radius:0 0 rem(16px) rem(16px);
          border-radius:0 0 rem(16px) rem(16px);
          .doc-commonTitle {
            padding-right: rem(30px);
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
                height: rem(28px);
                background: url("../../../common/image/img00/doctorHome/remaining@2x.png") no-repeat center;
                background-size: rem(20px) rem(26px);
                top: 50%;
                margin-top: rem(-14px);
                left: rem(-2px);
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
                  font-weight:bold;
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
                  padding: rem(8px) rem(22px) rem(8px) rem(26px);
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
        //立即问诊
        .physician-immediately,.cureAfterReport{
          background-color: #ffffff;
          .immediately-contentBox{
            padding:rem(28px) rem(32px) rem(56px) rem(36px);
            @include font-dpr(16px);
            color: #444444;
            .immediately-title{
              margin-bottom: rem(6px);
            }
            .immediately-item{
              margin-right: rem(20px);
            }
          }
        }
        .physician-immediately{
          -webkit-border-radius:0 0 rem(16px) rem(16px);
          -moz-border-radius:0 0 rem(16px) rem(16px);
          border-radius:0 0 rem(16px) rem(16px);
        }
        .cureAfterReport{
          margin-top: rem(16px);
          -webkit-border-radius: rem(16px);
          -moz-border-radius: rem(16px);
          border-radius: rem(16px);
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
                  width: rem(15px);
                  height: rem(15px);
                  top:50%;
                  margin-top: rem(-7px);
                  left:rem(32px);
                  background: url("../../../common/image/img00/doctorHome/Oval 8 Copy 14@2x.png") no-repeat center;
                  background-size: rem(8px) rem(8px);
                  /*-webkit-border-radius: 100px;*/
                  /*-moz-border-radius: 100px;*/
                  /*border-radius: 100px;*/
                }
              }
              .collegeItem-right{
                padding-left: rem(52px);
                padding-right: rem(32px);
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
                width: rem(120px);
                padding-left: rem(92px);
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
                  right: rem(-46px);
                }
                &:last-child{
                  &:after{
                    display: none;
                  }
                }
                .doc-delTextBox{
                  display: inline-block;
                  width: 98%;
                  text-align: right;
                }
                .doc-medicalYear{
                  @include font-dpr(14px);
                  color: #A0A0A0;
                  display: inline-block;
                  border: rem(2px) solid #CECECE;
                  padding: rem(5px) 0;
                  width: rem(120px);
                  text-align: center;
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
            p{
              font-size: rem(32px);
              color: #666666;
              line-height: rem(45px);
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              word-break: break-all;
              overflow: hidden;
            }
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
