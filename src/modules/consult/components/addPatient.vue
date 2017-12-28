<template>
  <section class="sticky-wrapper" :class="{'isMB':!isWeChat}">
    <section class="main-inner">
      <section class="main-inner-content">
        <!--头部-->
        <header class="patient-consult-rate add-patient-title">
          <!--无患者时的头部提示-->
          <section class="patient-tips" v-if="headerShow == 1">
            <h2 class="patient-tips-top">添加新患者</h2>
            <p class="patient-tips-bottom">根据国家卫计委规定，网上就诊需实名认证</p>
          </section>
          <!--添加患者-->
          <section class="add-patient"  v-else-if="headerShow == 2">
            <h2 class="patient-tips-top">请选择为谁问诊</h2>
            <p class="patient-tips-bottom">为给您准确诊断，请选择真实患者</p>
          </section>
          <!--取消添加-->
          <section class="cancel-add" v-else-if="headerShow == 3">
            <h2 class="patient-tips-top">添加新患者</h2>
            <p class="patient-tips-bottom">根据国家卫计委相关规定，网上就诊需实名认证</p>
          </section>
        </header>
        <!--渐变的中间层(新版本取消)-->
        <!--<section class="gradient-box"></section>-->
        <!--患者咨询底部-->
        <!--患者列表-->
        <!--<transition name="fadeDown" mode="out-in">-->
        <div data-alcode-mod='708' data-alcode-item-selector=".patient-list-item">
          <section class="patient-list" v-if="!createNewPatient">
            <section
              @click="toSelectPart(index)"
              :class="{'on':createNewPatient===false && currentIndex==index}"
              class="patient-list-item"
              v-for="(item, index) in patientList"
              :key="index"
            >
              <figcaption>
                {{item.patientName}}
              </figcaption>
            </section>
          </section>
          <section class="dutyTips" v-if="!createNewPatient">
            <section class="dutyTips-bg"></section>
            <p class="dutyTips-text">
              提示：危重症、急诊患者不适合在线咨询服务，建议尽快到医院就诊。
            </p>
          </section>
          <section data-alcode='e122' class="add-patient-box" v-if="headerShow == 2" @click="addFun()">
            <span class="add-patient-btn" :class="{'on':createNewPatient}">添加新患者</span>
          </section>
        </div>
        <!--</transition>-->
        <!--添加患者-->
        <!--<transition name="fadeUp">-->
          <section class="add-patient-content" id="ev-add-patient" v-if="createNewPatient">
            <section class="add-patient-content-form">
              <article class="add-patient-content-item">
                <figcaption>与患者关系</figcaption>
                <figure class="add-patient-input">
                  <span class="patient-relation" :class="{'on':relationClick}"
                        @click="relationPicker.show()">{{relationShip.title}}</span>
                  <input type="hidden" name="relationInput" v-validate="'required'" v-model="relationInput">
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>患者姓名</figcaption>
                <figure class="add-patient-input">
                  <input type="text" placeholder="填写真实姓名" id="patientName" @blur="validateBlur('username')" @input="inputMaxLength('username',40)"
                         v-validate="'required|noNumber|isEmoji|special|max_length:40'" name="username" v-model="username">
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>{{credentialTitle}}</figcaption>
                <figure class="add-patient-input">
                  <span class="patient-credential"
                        @click="credentialPicker.show()">{{credentialType.title}}</span>
                  <input type="hidden" name="credentialInput" v-validate="'required'" v-model="credentialInput">
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>证件号码</figcaption>
                <figure class="add-patient-input">
                  <input type="text" @blur="IDBlur()" @input="inputMaxLength('IDNumber',18)" :placeholder="credentialPlaceholder" name="IDNumber" v-model="IDNumber">
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>性别</figcaption>
                <figure class="add-patient-input" id="ev-patient-sex">
                  <section class="add-patient-sex-selector" :class="{'on':sexSelect==1}" @click="selectSex(1)">
                    <i class="add-patient-selector"></i>
                    <span>男</span>
                  </section>
                  <section class="add-patient-sex-selector" :class="{'on':sexSelect==2}" @click="selectSex(2)">
                    <i class="add-patient-selector"></i>
                    <span>女</span>
                  </section>
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>出生日期</figcaption>
                <figure class="add-patient-input">
                  <span class="patient-relation" :class="{'on':birthClick}"
                        @click="selectBirth">{{birthData.title}}</span>
                  <input type="hidden" name="birthInput" v-validate="'required'" v-model="birthInput">
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>所在地</figcaption>
                <figure class="add-patient-input">
                  <span @click="selectArea()" :class="{'on':areaClick}">{{areaParam.result}}</span>
                  <input type="hidden" name="areaInput" v-validate="'required'" v-model="areaParam.districtId">
                </figure>
              </article>
              <article class="add-patient-content-item">
                <figcaption>手机号码</figcaption>
                <figure class="add-patient-input">
                  <input type="number" @blur="validateBlur('phone')" @input="inputMaxLength('phone',11)" placeholder="便于接收必要通知" v-validate="'required|mobile'" name="phone" v-model="phone">
                </figure>
              </article>
              <!--<article class="add-patient-content-item">-->
              <!--<figcaption>年龄</figcaption>-->
              <!--<figure class="add-patient-input">-->
              <!--<input type="number" @blur="validateBlur('age')" placeholder="填写患者年龄" v-validate="'required|max_value:150|min_value:0|special'" name="age"-->
              <!--v-model="userage">-->
              <!--</figure>-->
              <!--</article>-->
            </section>
          </section>
          <section class="dutyTips"  v-if="createNewPatient">
            <section class="dutyTips-bg"></section>
            <p class="dutyTips-text">
              提示：危重症、急诊患者不适合在线咨询服务，建议尽快到医院就诊。
            </p>
          </section>
          <!--联系我们消息-->
          <section class="info-error-tips" v-if="infoErrorShow">
            <p class="tips-box" @click="phoneShow =true">
              <span class="tips-describe">若确认信息填写无误仍无法提交,</span>
              <span class="tips-contact">请联系我们</span>
            </p>
          </section>
        <!--</transition>-->
        <!--无患者提示-->
        <!--<transition name="fade">-->
        <div data-alcode-mod='709'>
          <section v-if="createNewPatient">
            <button data-alcode='e123' class="btn-primary go-next" @click="validate">去问诊</button>
            <p data-alcode='e124' class="cancel-add-btn" v-if="headerShow == 3" @click="cancelAddFun()">取消添加</p>
          </section>
        </div>
        <!--</transition>-->
      </section>
    </section>
    <loading :show="finish"></loading>
    <!--<transition name="fade">-->
      <!--<section class="btnBox-tips maskers show" horizontal="" v-if="hasCase" @click="hasCase=false">-->
        <!--<section class="horizontal-box" @click="hasCase=true">-->
          <!--<a class="btnBox-btn btn-hollow" @click="toSelectPart(patientList[currentIndex])">新问诊</a>-->
          <!--<a class="btnBox-btn btn-hollow" @click="openCasePage()">复诊</a>-->
        <!--</section>-->
      <!--</section>-->
    <!--</transition>-->
    <!--<transition name="fadeRight">-->
      <!--<selectArea v-if="showSelectArea" :show.sync="showSelectArea" :level.sync="cityLevel" :areaParam.sync="areaParam" :listType="listType" class="child-view"></selectArea>-->
    <!--</transition>-->
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
    <transition name="fade">
      <confirm
        :confirmParams="{
          'ensure':'呼叫',
          'cancel':'取消',
          'title':'010-59007006'
          }" v-if="phoneShow" :showFlag.sync="phoneShow" @cancelClickEvent="cancelEvent"
        @ensureClickEvent="ensureEvent">
      </confirm>
    </transition>
    <a href="tel:010-59007006" class="make-call" ref="makeCall"></a>
  </section>
</template>

<script type="text/ecmascript-6">
  /**
   * @Desc：患者选择
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Qiangkailiang/Lichenyang on 17/7/10.
   */
  import api from 'common/js/util/util';
  import validatePlugins from 'common/js/util/validate_plugins';
  import getDate from 'common/js/util/getDate';
//  import PickerDate from 'common/js/util/pickerDate';
  import loading from 'components/loading';
  import area from 'components/selectArea';
  import Picker from 'better-picker';
  import confirm from 'components/confirm';
  import toast from 'components/toast';
  import ustb from 'common/styles/_ustbPicker.css';
  import wxBind from 'common/js/auth/wxBinding';
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import CheckLogin from 'common/js/auth/checkLogin';
  const checkLogin = new CheckLogin();
  const XHRList = {
    addPatient: "/mcall/customer/patient/relation/v1/create/",//增加患者
    deletePatient: "/mcall/customer/patient/relation/v1/update/",//修改和删除患者
    patientList: "/mcall/customer/patient/relation/v1/getMapList/",//患者列表
    getPhone: "/mcall/patient/customer/unite/v1/getById/",//获取患者绑定的手机号
    createCase: "/mcall/customer/patient/case/v1/create/",//创建病例单
    saveOperation: "/mcall/customer/patient/case/v1/createReservation/",//直约手术保存曾就诊信息
    caseList: "/mcall/customer/patient/case/v1/getCaseMapList/",//获取患者病例单
    IDCheckLink:"/mcall/customer/patient/baseinfo/v1/getMapListByCustomerId/",//校验证件号码重复信息
  };

  export default{
    data(){
      return {
        isWeChat:true, //是否是微信
        phoneShow:false,//拨打电话confirm框
        headerShow:2,//头部显示哪个
        patientList: [],//患者列表
        currentIndex: -1,//第几个患者
        finish: true,//加载的菊花转
        hasCase: false,//是否有病例单
        createNewPatient: false,//添加新患者
        showSelectArea: false,//选择部位
        areaParam: {
          provinceId: "",
          province: "",
          cityId: "",
          city: "",
          districtId: "",
          district: "",
          result:"选择患者所在地"
        },//选择城市参数
        areaClick:true,//选择城市是否点击过
        cityLevel:2,//城市选择级别
        sexSelect: -1,//性别选择控制
        relationPicker: null,//与患者关系的仿ios选择器
        relationClick:false,//患者关系是否点击,
        relationShip: {
          title: "本人",
          id: "0"
        },//仿ios选择器确定出的与患者关系
        relationInput:"本人",//用来验证与患者关系是否填写
        credentialTitle:"患者证件",//证件类型需要显示的话术
        credentialPlaceholder:'请填写证件号码(选填)',//证件输入框提示的话术
        credentialPicker: null,//证件类型的仿ios选择器
        credentialClick:false,//证件是否点击,
        credentialType: {
          title: "身份证(选填)",
          id: "1"
        },//仿ios选择器确定出的证件类型
        IDCheckFlag:false,//校验证件号码信息是否通过
        credentialInput:"身份证(选填)",//用来验证证件类型是否填写
        birthClick:true,//出生日期是否点击,
        birthPicker:null,//出生日期的仿ios选择器
        birthData: {
          title: "请选择患者出生日期",
          id: "0"
        },//仿ios选择器确定出的出生日期
        birthInput:"",//用来验证出生日期是否填写
        IDNumber:"",//证件号码
        count:0,//曾经是否来过
        username: "",//添加患者名字
//        userage: "",//患者年龄
        phone: "",//手机号
        errorMsg: "fuck",//提示错误的字段
        errorShow: false,//是否提示错误
        listType:"city", //类型为城市
        bindPhone:"",//用户绑定的手机号
        formCheck:false,//表单是否全部验证通过
        infoErrorShow:false,//信息错误是否显示
      }
    },
    activated(){
      this.finish=false;
      this.initData();
      this.currentIndex = -1;
      document.title="为谁问诊";
    },
    mounted() {
      //微信中绑定微信
      siteSwitch.weChatJudge(()=>{
        this.isWeChat = true;
        wxBind.isBind({
          callBack:()=>{
            this.init();
          }
        });
      },()=>{
        console.log("无需绑定微信");
        this.isWeChat = false;
        this.init();
        checkLogin.getStatus().then((res)=>{
          if(res.data.responseObject.responseStatus){

            this.init();
          }else{
            localStorage.setItem("backUrl",window.location.href);
            window.location.href = '/dist/mLogin.html';
          }
        })
      });
    },
    computed: {

    },
    filters: {

    },
    methods: {
      init(){
        document.title="为谁问诊";
        if(!api.checkOpenId()){
          console.log("获取openId");
          api.wxGetOpenId(1);
        }
        api.forbidShare();
        let customerIdFlag = this.$route.query.customerId?this.$route.query.customerId:(api.getPara().customerId||localStorage.getItem('userId'));
        if (customerIdFlag && customerIdFlag != 0){
          this.getPatientList();
        }
        this.relationPickerInit();//患者关系选择器初始化
        this.credentialPickerInit();//证件类型选择器初始化
        this.birthPickerInit();//出生日期选择器初始化
        this.getPatientPhone();//获取绑定的手机号
        this.$validator.updateDictionary({
          en: {
            custom: {
              //用户姓名的验证
              username: {
                required: '请填写患者姓名',
                noNumber:'请填写真实姓名',
                isEmoji:'请填写真实姓名',
                special:'请填写真实姓名',
                max_length:'请填写真实姓名',
              },
              //用户年龄的验证
              age:{
                required: '请填写年龄',
                max_value:'请填写真实年龄',
                min_value:'请填写真实年龄',
                special:'请填写真实年龄',
              },
              //手机号的验证
              phone:{
                required: '请填写手机号码',
                mobile:'请填写真实手机号码',
              },
              //患者关系的验证规则
              relationInput: {
                required: '请选择与患者关系',
              },
              //患者所在地的验证规则
              areaInput: {
                required: '请选择患者所在地',
              },
              //证件号码的验证规则
              IDNumber: {
                required: '请输入证件号码',
              },
              //出生日期的验证
              birthInput:{
                required: '请选择患者出生日期',
              }
            }
          }
        });
        console.log("添加患者");
        console.log(localStorage.getItem("PCIMLinks"));
        if (localStorage.getItem("PCIMLinks")!==null) {
          localStorage.removeItem("PCIMLinks");
        }
      },
      //重置表单
      resetForm () {
        let that = this;
        that.username="";//添加患者名字
//        this.userage="";//患者年龄
        that.phone = that.bindPhone;//手机重置为绑定的手机
        that. relationShip={
          title: "本人",
          id: "0"
        };
        that.sexSelect = -1;//性别选择控制
        that.areaParam={
          provinceId: "",
          province: "",
          cityId: "",
          city: "",
          districtId: "",
          district: "",
          result:"选择患者所在地"
        };
        that.areaClick=true;//选择城市是否点击过
        that.relationInput="本人";//用来验证与患者关系是否填写
        that.credentialTitle="患者证件";//证件类型需要显示的话术
        that.credentialPlaceholder='请填写证件号码(选填)';//证件输入框提示的话术
        that.credentialType={
          title: "身份证(选填)",
            id: "1"
        };//仿ios选择器确定出的证件类型
        that.IDCheckFlag=false;//校验证件号码信息是否通过
        that.credentialInput="身份证(选填)";//用来验证证件类型是否填写
        that.birthClick=true;//出生日期是否点击,
        that.birthData={
          title: "请选择患者出生日期",
          id: "0",
        };//仿ios选择器确定出的出生日期
        that.birthInput="";//用来验证出生日期是否填写
        that.IDNumber="";//证件号码
        that.formCheck=false;//表单是否全部验证通过
        that.infoErrorShow=false;//信息错误是否显示

        // 选择器无法复位，先删除再重新初始化
        console.log(document.getElementsByClassName('picker'));
        for (let i =document.getElementsByClassName('picker').length-1; i>=0; i --) {
          document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('picker')[i])
        }
        this.relationPickerInit();//患者关系选择器初始化
        this.credentialPickerInit();//证件类型选择器初始化
        this.birthPickerInit();//出生日期选择器初始化
      },
      initData () {

        if (this.$route.params.areaParam) {
          this.areaParam= this.$route.params.areaParam;
          this.areaClick=false;
          document.title="添加患者";
//          this.areaParam.districtId = true;
        }
      },
      //confirm取消
      cancelEvent() {
        this.phoneShow = false;
      },
      //confirm呼叫
      ensureEvent() {
        this.phoneShow = false;
        window.location.href = "tel:010-59007006";
      },
      //获取绑定的手机号
      getPatientPhone(){
        const that = this;
        api.ajax({
          url: XHRList.getPhone,
          method: "POST",
          data:  {
            isValid: 1,                           // string 是   1
            firstResult: 0,                       // string 是  分页参数
            maxResult: 99999,                     //  string 是  分页参数
            customerId: (api.getPara().customerId||localStorage.getItem('userId')),                       //  string 是  用户id
          },
          beforeSend(config) {

          },
          done(param) {
            console.log(param);
            if(param.responseObject.responseStatus && param.responseObject.responseData.dataList && param.responseObject.responseData.dataList.patientCustomerUnite.mobile){
              that.phone=param.responseObject.responseData.dataList.patientCustomerUnite.mobile;
              that.bindPhone=param.responseObject.responseData.dataList.patientCustomerUnite.mobile;
            } else {

            }
          },
          fail(err) {
            console.log(param);
          }
        })
      },
      //选择出生日期
      selectBirth () {
        let that = this;
        if(that.credentialType.id === "1" && that.relationShip.id !== "11" && validatePlugins.identityCard(that.IDNumber) && that.IDNumber.length == 18){
          if (that.errorShow === false){
            that.errorMsg = "出生日期以身份证信息为准,无需编辑";
            that.errorShow = true;
            setTimeout(() => {
              that.errorShow = false;
            }, 2000)
          }
        } else {
          that.birthPicker.show();
        }
      },
      //选择性别时的函数
      selectSex (index){
        let that = this;
        if(that.credentialType.id === "1" && that.relationShip.id !== "11" && validatePlugins.identityCard(that.IDNumber) && that.IDNumber.length == 18){
          if (that.errorShow === false){
            that.errorMsg = "性别以身份证信息为准,无需编辑";
            that.errorShow = true;
            setTimeout(() => {
              that.errorShow = false;
            }, 2000)
          }
        } else {
          that.sexSelect = index;
        }
      },
      //选择城市
      selectArea(){
        this.$router.push({
          name:'selectArea',
          params: {
            listType: 'city',
            level:2,
            from:this.$route.name,
          },
          query:this.$route.query
        })
      },
      //input最大长度事件
      inputMaxLength(attr,length){
        this[attr] = api.getStrByteLen(this[attr], length);
      },
      //获取患者列表
      getPatientList() {
        const that = this;
        api.ajax({
          url: XHRList.patientList,
          method: "POST",
          data: {
            customerId: this.$route.query.customerId?this.$route.query.customerId:(api.getPara().customerId||localStorage.getItem('userId')),
            isValid: "1",
            firstResult: "0",
            maxResult: "9999"
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(param) {
            that.finish = false;
            that.count=param.responseObject.responseData.totalCount;
            if(param.responseObject.responseMessage == "NO DATA"){
              that.createNewPatient = true;
              that.headerShow = 1;
              document.title="添加患者";
            } else {
              that.patientList = param.responseObject.responseData.dataList.reverse();
              that.createNewPatient = false;
              that.headerShow = 2;
              document.title="为谁问诊";
            }
          },
          fail(err) {

          }
        })
      },
      // 点击选择患者...
      selectPatient(index, event) {
        this.currentIndex = index;
        this.createNewPatient = false;
        this.checkHistoryList(this.patientList[index])
      },
      // 判断是否来过...
      checkHistoryList(param) {
        const that = this;
        api.ajax({
          url: XHRList.caseList,
          method: "POST",
          data: {
            patientId: param.patientId,
            caseType: 0
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(data) {
            that.finish = false;
            if (data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                that.hasCase = true;
              } else {
                that.hasCase = false;
                that.toSelectPart(param);
              }
            }
          }
        })
      },
      //点击下一步验证
      validate() {
        this.$validator.validateAll().then(result => {
          console.log(result);
          if (result) {
//            this.messageSubmit();
            this.errorShow = false;
            this.validateOther();//验证其他特殊的字段
          } else {
            console.log(this.$validator.errors);
            this.formCheck = false;
            this.errorMsg = this.$validator.errors.items[0].msg;
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000);
            return;
          }
        });
      },
      //验证其他特殊的字段
      validateOther (){
        let that = this;
        if(!that.IDCheckFlag && this.IDNumber){
          that.errorMsg = "请输入有效证件号码";
//          if (this.credentialType.id === "1" && !validatePlugins.identityCard(this.IDNumber)) {
//            that.errorMsg = "请输入有效证件号码";
//          } else {
//            that.errorMsg = "患者证件号码已存在";
//          }
          that.errorShow = true;
          that.formCheck = false;
          setTimeout(() => {
            that.errorShow = false;
          }, 2000);
          return;
        }
        if (that.sexSelect === -1 ) {
          that.errorMsg = "请选择患者性别";
          that.errorShow = true;
          that.formCheck = false;
          setTimeout(() => {
            that.errorShow = false;
          }, 2000);
          return;
        }
        that.formCheck = true;
        if (that.formCheck) {
          //验证完成，提交
          that.messageSubmit();
        }
      },
      //失焦事件
      validateBlur (name) {
        this.$validator.validateAll();
//        console.log(this.errors.first(name));
//        console.log(this.errors.all());
        console.log(this.errors)
        if (this.errors.has(name)) {
//          switch (name){
//            case "username":
//              console.log(this.errors.first(name));
//              this.errorMsg = this.errors.first(name);
//              break;
//            case "age":
//              console.log(this.errors.first(name));
//              this.errorMsg = this.errors.first(name);
//              break;
//            case "phone":
//              console.log(this.errors.first(name));
//              this.errorMsg = this.errors.first(name);
//              break;
//          }
          this.errorMsg = this.errors.first(name);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000)
        }
      },
      //证件号码失焦
      IDBlur () {
        console.log("失焦验证")
        let flag = true;
        let that = this;
        this.$validator.validateAll();
        console.log(this.errors)
        if (this.errors.has("IDNumber")) {
          this.errorMsg = this.errors.first("IDNumber");
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          return;
        }
        //如果证件类型为1 需要验证身份证号码格式
        if (this.credentialType.id === "1" && this.IDNumber !== "") {
          if (!validatePlugins.identityCard(this.IDNumber)) {
            flag = false;
            this.errorMsg = "请输入有效证件号码";
            this.errorShow = true;
            this.IDCheckFlag = false;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000);
          } else {
            if (this.IDNumber.length == 18) {
              that.computeInfo();
            }
          }
        }
        //如果上面验证通过，关系不为子女（无证件），则需要验证是否存在
//        if (flag && this.relationShip.id !== "11") {
//          this.IDCheck();
//          return;
//        }
        //如果关系为子女（无证件），并且上面验证通过，则把证件验证置为通过
        if (flag) {
          that.IDCheckFlag = true;
          if (that.credentialType.id === "1") {

          }
          this.IDCheckFlag = true;
        }
      },
      //校验证件号码重复信息
      IDCheck () {
        let that = this;
        api.ajax({
          url: XHRList.IDCheckLink,
          method: "POST",
          data: {
            certificateId:that.credentialType.id,	//string	是	证件类型1-身份证2-军官证
            certificateCode:that.IDNumber,//	string	是	证件号码
            customerId: that.$route.query.customerId?that.$route.query.customerId:(api.getPara().customerId||localStorage.getItem('userId')),
            firstResult:"0",	//string	是	分页参数
            maxResult:"999",	//string	是	分页参数
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(data) {
            that.finish = false;
            if (data.responseObject.responseStatus && data.responseObject.responseMessage === "NO DATA") {
//              that.IDCheckFlag = true;
//              if (that.credentialType.id === "1") {
//                that.computeInfo();
//              }
            } else {
              that.IDCheckFlag = false;
              that.errorMsg = "患者证件号码已存在";
              that.errorShow = true;
              setTimeout(() => {
                that.errorShow = false;
              }, 2000);
            }
          }
        })
      },
      //计算用户信息
      computeInfo () {
        this.birthClick = false;
        this.birthData.title=this.IDNumber.substring(6, 10) + "-" + this.IDNumber.substring(10, 12) + "-" + this.IDNumber.substring(12, 14);
        this.birthInput =this.birthData.title;
        //获取性别
        if (parseInt(this.IDNumber.substr(16, 1)) % 2 == 1) {
          this.sexSelect = 1;
          //是男则执行代码 ...
        } else {
          this.sexSelect = 2;
          //是女则执行代码 ...
        }
      },
      messageSubmit() {
        const that = this;
        let dData = new Date();
        dData.getFullYear();
        let userage = parseInt(dData.getFullYear()) - that.birthData.id;
        api.ajax({
          url: XHRList.addPatient,
          method: "POST",
          data: {
            customerId: this.$route.query.customerId?this.$route.query.customerId:(api.getPara().customerId||localStorage.getItem('userId')),//用户id
            patientName: this.username,//患者姓名
//            patientAge: this.userage,
            patientSex: this.sexSelect,
            patientRelationId: this.relationShip.id,
            mobile: this.phone,
            provinceId: this.areaParam.provinceId,
            province: this.areaParam.province,
            cityId: this.areaParam.cityId,
            city: this.areaParam.city,
            districtId: this.areaParam.districtId,
            district: this.areaParam.district,
            patientBirthday:this.birthData.title,//患者出生日期
            certificateId:this.credentialType.id,//证件类型
            certificateCode:this.IDNumber,//证件号码
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(data) {
            that.finish = false;
            if (data.responseObject.responseStatus) {
              that.createNewPatient = false;
              that.headerShow = 2;
              that.patientList.unshift({
                isValid:"1",
                patientAge:userage,
                patientId:data.responseObject.responsePk,
                patientLogoUrl:null,
                patientName:that.username,
                patientRelationId:that.relationShip.id,
                patientSex:that.sexSelect,
              });
//              debugger;
              //去咨询成功后，需要清除表单数据
              that.resetForm();
              setTimeout(function () {
                that.toSelectPart(0);
              },500);
            } else {
              that.errorMsg = data.responseObject.responseMessage;
              that.errorShow = true;
              setTimeout(() => {
                that.errorShow = false;
              }, 2000)
            }
          }
        })
      },
      //与患者关系选择器初始化
      relationPickerInit() {
        const hospitalData = [{
          text: "本人",
          value: "0"
        }, {
          text: "父母",
          value: "3"
        }, {
          text: "配偶",
          value: "1"
        }, {
          text: "子女（有证件）",
          value: "2"
        }, {
          text: "子女（无证件）",
          value: "11"
        }, {
          text: "其他",
          value: "10"
        }];
        this.relationPicker = new Picker({
          data: [hospitalData],//初始化的数据
          selectedIndex:[0],//默认哪个选中
        });
        this.relationPicker.on('picker.select', (e, selectedVal, selectedIndex) => {
          this.relationShip.title = hospitalData[selectedVal[0]].text;
          this.relationShip.id = hospitalData[selectedVal[0]].value;
          if (this.relationShip.id == '11') {
            this.credentialTitle="监护人证件";//证件类型需要显示的话术
            this.credentialPlaceholder='请填写证件号码(选填)';//证件输入框提示的话术
            if (this.IDNumber) {
              this.IDBlur();
            }
          } else {
            this.credentialTitle="患者证件";//证件类型需要显示的话术
            this.credentialPlaceholder='请填写证件号码(选填)';//证件输入框提示的话术
            if (this.IDNumber) {
              this.IDBlur();
            }
          }
          if (this.relationShip.id == '0') {
            this.phone = this.bindPhone;
          } else {
            this.phone = "";
          }
          this.relationClick = false;
          this.relationInput = hospitalData[selectedVal[0]].text;
        });
      },
      //证件类型选择器初始化
      credentialPickerInit () {
        let credentialData = [{
          text: "身份证(选填)",
          value: "1"
        }, {
          text: "军官证(选填)",
          value: "2"
        }];
        this.credentialPicker = new Picker({
          data: [credentialData],//初始化的数据
          selectedIndex:[0],//默认哪个选中
        });
        this.credentialPicker.on('picker.select', (e, selectedVal, selectedIndex) => {
          this.credentialType.title = credentialData[selectedVal[0]].text;
          this.credentialType.id = credentialData[selectedVal[0]].value;
          this.credentialClick = false;
          this.credentialInput = credentialData[selectedVal[0]].text;
          //关系选择器变动时，如果证件号码不为空，需要重新验证
          if (this.IDNumber) {
            this.IDBlur();
          }
        });
      },
      //出生日期选择器初始化
      birthPickerInit(){
        let that = this;
        //年月份数组
        let yearArr = getDate.getYear(1900,2017).reverse(),
          monthArr = getDate.getMonth(),
          dayArr = getDate.getDay();
        //年月份数据
        let yearData = getDate.getPickerArr(yearArr,"年"),
          monthData = getDate.getPickerArr(monthArr,"月"),
          dayData = getDate.getPickerArr(dayArr,"日");
        //年月份的索引值
        let yearChange = yearData.find((n)=>n.text === "1980年").value,
          monthChange = 0,
          dayChange = 0;
        this.birthPicker = new Picker({
          data: [yearData,monthData,dayData],//初始化的数据
          selectedIndex:[yearChange,monthChange,dayChange],//默认哪个选中
        });
        this.birthPicker.on('picker.select', (selectedIndex, selectedVal) => {
          console.log('selectedIndex'+selectedIndex);
          console.log('selectedVal'+ selectedVal);
          let returnArr = selectedVal.toString().split(",");
//          console.log(yearData[returnArr[0]].value);
//          console.log(monthData[returnArr[1]]);
//          console.log(dayData[returnArr[2]]);
          let birthTitle = yearArr[returnArr[0]] + '-' +monthArr[returnArr[1]]  +'-'+ dayArr[returnArr[2]];
          that.birthInput = birthTitle;
          that.birthData={
            title:birthTitle,
            id:yearArr[returnArr[0]],
          };
          that.birthClick =false;
        });
        this.birthPicker.on('picker.change', (index, selectedIndex) => {
          console.log('index:'+index);
          console.log('change:'+selectedIndex);
          switch (index) {
            case 0:
              yearChange = selectedIndex;
              break;
            case 1:
              monthChange = selectedIndex;
              break;
            case 2:
              dayChange = selectedIndex;
              break;
          }
          //得到picker选择器改变后的年月日
          let yearPicker = yearArr[yearChange],
            monthPicker = monthArr[monthChange],
            dayPicker = dayArr[dayChange];
          if (index === 0 || index === 1){
            dayArr = getDate.getDay(yearPicker,monthPicker);
//            debugger;
            dayData = getDate.getPickerArr(dayArr,"日");
            this.birthPicker.refillColumn(2,dayData);
          }
          let dataTemp = new Date();
          //获取当前时间的年月日
          let currentYear = dataTemp.getFullYear(),
            currentMonth = dataTemp.getMonth()+1,
            currentDay = dataTemp.getDate();
//          console.log(yearPicker)
//          console.log(monthPicker)
//          console.log(dayPicker)
          console.log(this.birthPicker)
          console.log(this.birthPicker.selectedIndex)
          //判断滑动日期是否超过当前日期
          if (parseInt(yearPicker) === currentYear) {
            if (parseInt(monthPicker) > currentMonth) {
              this.birthPicker.scrollColumn(1,currentMonth-1);
//              this.birthPicker.trigger("picker.change",1,currentMonth-1);
              this.birthPicker.selectedIndex[1]=currentMonth-1;
              if (parseInt(dayPicker) > currentDay){
                this.birthPicker.scrollColumn(2,currentDay-1);
//                this.birthPicker.trigger("picker.change",2,currentDay-1);
                this.birthPicker.selectedIndex[2]=currentDay-1;
              }
            }
          }
        });
      },
      toSelectPart(index) {
        this.currentIndex = index;
        localStorage.setItem("payPatientId",this.patientList[index].patientId);
        this.$router.push({
          name: "selectPart",
          params:{
            height:this.patientList[index].height,
            weight:this.patientList[index].weight
          },
          query: {
            userId:this.$route.query.customerId?this.$route.query.customerId:(api.getPara().customerId||localStorage.getItem('userId')),
            sex: this.patientList[index].patientSex,
            age: this.patientList[index].patientAge,
            patientId: this.patientList[index].patientId,
            count:this.count
          }
        });
      },
      //添加患者按钮
      addFun(){
        this.createNewPatient=true;
        this.headerShow=3;
        window.scrollTo(0,0);
        document.title="添加患者";
      },
      //取消添加按钮
      cancelAddFun(){
        let that = this;
        that.createNewPatient=false;
        that.headerShow=2;
        that.resetForm();
        document.title="为谁问诊";
//        this.relationClick=true;//选择患者是否点击,
        window.scrollTo(0,0);
      },
      openCasePage(){
        let that = this;
        window.location.href = "/pages/patientConsult/case_list.html?customerId=" +(that.$route.query.customerId?that.$route.query.customerId:api.getPara().customerId) + "&patientId=" + this.patientList[this.currentIndex].patientId
      }
    },
    components: {
      "loading": loading,
      "selectArea": area,
      "toast": toast,
      "confirm":confirm,
    }
  };


</script>
<style lang="scss" scoped="">
  @import "../../../../scss/library/_common-modules";

  html,body{
    width: 100%;
    height: 100%;
  }
  .sticky-wrapper {
    height: auto;
    min-height: 100%;
    box-sizing: border-box;
    background:url("../../../common/image/background_wave.png") no-repeat bottom center #F2F2F2;
    background-size:100% rem(272px);
    &.isMB{
      padding-bottom: rem(100px);
    }
  }

  .main-inner {
    /*width: 100%;*/
    height: 100%;
    padding: rem(0px) rem(30px);

  }

  .main-inner-content {
    overflow: hidden;
    position: relative;
  }
  // 免责声明提示
  .dutyTips{
    background-color: white;
    border-radius:0 0 rem(16px) rem(16px);
    .dutyTips-bg{
      width: 100%;
      height: rem(26px);
      background: url(../../../common/image/img00/patientConsult/line.png) no-repeat  center;
      background-size: cover;
    }
    .dutyTips-text{
      @include font-dpr(14px);
      color: #97A8BA;
      padding: rem(0px) rem(44px) rem(28px);
    }
  }
  /*头部*/
  .patient-consult-rate.add-patient-title{
    /*background-color: yellow;*/
    /*border-radius: rem(16px) rem(16px) 0 0;*/
    /*height: rem(180px);*/
    padding-top: rem(50px);
    padding-left: rem(14px);
    box-sizing: border-box;
    /*没有患者列表时的头部提示*/
    .patient-tips-top{
      @include font-dpr(22px);
      color: #555555;
      font-weight: normal;
    }
    .patient-tips-bottom{
      margin-top: rem(10px);
      margin-bottom: rem(36px);
      @include font-dpr(15px);
      /*padding-left: rem(32px);*/
      color: #909090;
      /*background: url("../../../common/image/img00/patientConsult/patient_tips.png") no-repeat left top;*/
      /*background-size: rem(28px) rem(28px);*/
      /*line-height: 1.3;*/
    }

  }
  //患者咨询
  .add-patient-content {
    background-color: white;
    border-radius: rem(16px) rem(16px) 0 0;
    padding: rem(60px) rem(24px) rem(60px) rem(64px);
    .add-patient-content-form {
      background-color: white;
    }
    &-item + &-item{
      margin-top: rem(76px);
    }
    &-item {
      /*line-height: 1;*/
      font-size: 0;
      & > figcaption {
        display: inline-block;
        vertical-align: middle;
        /*margin-right: rem(100px);*/
        width: rem(218px);
        @include font-dpr(17px);
      }
      & > .add-patient-input {
        display: inline-block;
        vertical-align: middle;
        width: rem(375px);
        @include font-dpr(18px);
        color: #666666;
        & > span {
          width: 100%;
          display: inline-block;
          color: #555;
          /*height: rem(40px);*/
          box-sizing: border-box;
          padding-right: rem(30px);
          vertical-align: middle;
          background: url(../../../common/image/img00/patientConsult/arrow_right.png) no-repeat  right center;
          background-size: rem(16px) rem(30px);
          @include ellipsis();
          &.on{
            color: #AFAFAF;
          }
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #AFAFAF;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #AFAFAF;
          opacity:  1;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #AFAFAF;
          opacity:  1;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #AFAFAF;
        }

        & > input {
          width: 90%;
          border: none;
          background: none;
          color: #555;
          /*padding: rem(45px) 0;*/

        }
        & > select {
          min-height: rem(60px);
          /*font-family: "microsoft yahei";*/
          background: none;
          border: none;
          width: 100%;
          /*padding: rem(45px) 0;*/
          outline: medium;
        }
      }
      .add-patient-sex-selector {
        display: inline-block;
        vertical-align: middle;
        margin-right: rem(64px);
        /*padding: rem(45px) 0;*/
        .add-patient-selector {
          width: rem(30px);
          height: rem(30px);
          background: url("../../../common/image/img00/patientConsult/inquiry_choose_nor@2x.png") no-repeat;
          background-size: contain;
          /*border: 2px solid #cccccc;*/
          display: inline-block;
          vertical-align: middle;
          /*margin-right: rem(8px);*/
          box-sizing: border-box;
        }
        & > span {
          display: inline-block;
          vertical-align: middle;
        }
        &.on {
          .add-patient-selector {
            background: url("../../../common/image/img00/patientConsult/inquiry_choose_sel@2x.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
  /*渐变的中间层*/
  /*.gradient-box{
    margin-top: rem(-1px);
    height: rem(20px);
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#FAFAFA), to(#FFFFFF));
  }*/
  //错误提示
  .info-error-tips{
    margin: rem(10px) rem(14px) rem(68px);
    @include font-dpr(15px);
    line-height: 1;
    .tips-box{
      padding-left: rem(32px);
      line-height: 1;
      background: url("../../../common/image/img00/patientConsult/error_tips.png") no-repeat left rem(2px);
      background-size: rem(26px) rem(26px);
      span{
        line-height: 1;
        display: inline-block;
      }
      .tips-describe{
        color: #FA787A;
      }
      .tips-contact{
        color: #2FC5BD;
        border-bottom: 1px solid #2FC5BD;
      }
    }
  }
  .patient-list {
    background-color: white;
    border-radius: rem(16px) rem(16px) 0 0;
    text-align: left;
    font-size: 0;
    padding: rem(16px) rem(0px) rem(80px) rem(34px);
  }

  .patient-list-item {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-right: rem(20px);
    & > figcaption {
      box-sizing: border-box;
      margin-top: rem(32px);
      @include font-dpr(16px);
      min-width: rem(164px);
      max-width: rem(338px);
      padding: rem(20px) rem(26px) rem(20px) rem(68px);
      border: 1px solid #EDEDED;
      color: #333333;
      line-height: 1;
      @include ellipsis();
      border-radius: rem(4px);
      background: url("../../../common/image/img00/patientConsult/Portrait@2x.png") no-repeat rem(18px) center;
      background-size: rem(40px) rem(40px);
    }
    &.on {
      & > figcaption {
        color: #07b6ac;
        border:1px solid #2fc5bd;
      }
      &.patient-list-item-plus {
        & > figcaption {
          background: url("../../../common/image/img00/patientConsult/add people_yet2@2x.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .add-patient-box{
    border-radius: rem(16px);
    background-color: white;
    margin-bottom: rem(70px);
    margin-top: rem(20px);
    /*有患者列表时的添加患者*/
    .add-patient-btn{
      @include font-dpr(15px);
      line-height: rem(142px);
      color: #07B6AC;
      padding-left: rem(48px);
      position: relative;
      &::before{
        content: '';
        display: inline-block;
        width: rem(40px);
        height: rem(40px);
        background: url("../../../common/image/img00/patientConsult/add_people.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: rem(8px);
      }
    }
  }

  .go-next {
    width: rem(560px);
    height: rem(100px);
    line-height: rem(100px);
    display: block;
    border-radius: 9999px;
    background: #2FC5BD;
    box-shadow: 0 rem(8px) rem(24px) 0 rgba(47,197,189,0.40);
    text-align: center;
    box-sizing: border-box;
    @include font-dpr(18px);
    color: #fff;
    outline: medium;
    padding: 0;
    margin: rem(36px) auto rem(40px);
  }

  .cancel-add-btn{
    @include font-dpr(18px);
    color: #909090;
    text-align: center;
    padding-bottom: rem(60px);
  }

  .horizontal-box {
    padding: rem(100px) rem(130px);
  }


  /*vue组件自定义动画开始*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

  .fadeDown-enter-active, .fadeDown-leave-active {
    transition: all ease-in-out .5s
  }

  .fadeDown-enter, .fadeDown-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateY(-50%);
  }
  .fadeUp-enter-active{
    transition: all ease-in-out .5s
  }
  .fadeUp-leave-active{
    transition: opacity 0s
  }
  .fadeUp-enter /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateY(50%);
  }
  .fadeUp-leave-to{
    opacity: 0;
    /*transform: translateY(50%);*/
  }

  .fadeRight-enter-active, .fadeRight-leave-active {
    transition: all ease-in-out .5s;
    transform: translateX(0);
  }

  .fadeRight-enter, .fadeRight-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateX(100%);
  }
  /*vue组件自定义动画开始*/
</style>
