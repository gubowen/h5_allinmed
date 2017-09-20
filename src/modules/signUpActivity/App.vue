<template>
  <div style="width: 100%;height: 100%;" @click="select(0)">
    <img class="banner" src="../../common/image/img00/signUpActivity/01.png"/>
    <div class="content">
      <img class="" src="../../common/image/img00/signUpActivity/02.png"/>
      <div class="content-information">
        <div class="flagMessage">*请填写真实有效的信息</div>
        <ul>
          <li>
            <div>
              <span class="apply_title">姓名</span>
              <span class="apply_text">
                <input class=" name" type="text" placeholder="填写真实姓名" maxlength="40" @keyup="nameLength()" v-model="name" name="name" v-validate="'required|special'"/>
              </span>
            </div>
            <p class="nameErrorMessage error-message" v-show="errors.has('name')">{{errors.first('name') }}</p>
          </li>
          <li>
            <div>
              <span class="apply_title">医院</span>
              <span class="apply_text">
                <input class="hospital" type="text" placeholder="填写所在的医院" v-model="hospital" maxlength="40"   @keyup="hospitalLength()" name="hospital" v-validate="'required|hospital'"/>
              </span>
            </div>
            <p class="nameHospitalMessage error-message" v-show="errors.has('hospital')">{{errors.first('hospital') }}</p>
          </li>
          <li>
            <div>
              <span class="apply_title">职称</span>
              <span class="apply_text">
                <!--<select class="career apply_select" v-model="career">-->
                <!--<option value="0">主任医生</option>-->
                <!--<option value="1">副主任医生</option>-->
                <!--<option value="2">主治医生</option>-->
                <!--</select>-->
                <div class="simulateSelect">
                  <i :class=" simulateSelectStatus ? 'icon-up':'icon-down'" @click.stop="simulateSelect()"></i>
                  <input type="text" readonly placeholder="请选择" @click.stop="simulateSelect()" v-model="selectValue"/>
                  <ul v-show="simulateSelectStatus">
                    <li @click.stop="select(1)" :class="{'active':this.selectValue=='主任医生'}">主任医生</li>
                    <li @click.stop="select(2)" :class="{'active':this.selectValue=='副主任医生'}">副主任医生</li>
                    <li @click.stop="select(3)" :class="{'active':this.selectValue=='主治医生'}">主治医生</li>
                    <li @click.stop="select(4)" :class="{'active':this.selectValue=='其他'}">其他</li>
                  </ul>
                </div>
              </span>
            </div>
          </li>
          <li>
            <div>
              <span class="apply_title">手机号</span>
              <span class="apply_text">
                <input class="apply_text mobile" type="tel" placeholder="填写真实手机号码 " maxlength="11" v-model="mobile" name="phone" v-validate="'required|mobile'"/>
              </span>
            </div>
            <p class="nameMobileMessage error-message" v-show="errors.has('phone')">{{errors.first('phone') }}</p>
          </li>
          <li>
            <div>
              <span class="apply_title">验证码</span>
              <span class="apply_text">
                <input class="apply_checkInput" type="tel" placeholder="填写短信验证码" v-model="checkInput" maxlength="4" name="checkCodeValidate" v-validate="'required'"/>
                <a class="apply_checkCode" @click="checkCode()" :class="{'on':checkClickStatus}">{{checkMessage}}</a>
              </span>
            </div>
            <p class="nameCheckMessage error-message" v-show="errors.has('checkCodeValidate')">{{errors.first('checkCodeValidate') }}</p>
          </li>
        </ul>
        <a class="saveBtn" @click="validator(submit)"></a>
        <section class="middle-tip-modal popup" :class="{'show':popupText.length>0}">
          <figure class="middle-tip-box-text">
            <img v-show="popupImg == 'successful'" src="../../common/image/img00/signUpActivity/successful.png" alt=""/>
            <img v-show="popupImg == 'fail'" src="../../common/image/img00/signUpActivity/fail.png" alt=""/>
            <p class="popup-text">{{popupText}}</p>
          </figure>
        </section>
      </div>

      <!--<div class="apply_message">-->
      <!--<p class="title">报名咨询</p>-->
      <!--<p>电话：010-59007006</p>-->
      <!--<p>微信：weiyi635</p>-->
      <!--<p class="">报名成功后工作人员会在48小时内联系您，请耐心等待</p>-->
      <!--</div>-->
      <div class="more" @click="more()">
        <img v-show="moreFlag" src="../../common/image/img00/signUpActivity/03.png">
        <img v-show="!moreFlag" src="../../common/image/img00/signUpActivity/03-on.png">
      </div>
      <div v-show="moreFlag">
        <img src="../../common/image/img00/signUpActivity/04.png">
      </div>
      <img v-show="!moreFlag" src="../../common/image/img00/signUpActivity/05.png">

    </div>

  </div>
</template>
<script type="text/ecmascript-6">

  import fb from "common/js/third-party/flexible";
  import axios from "axios";
  export default{
    data(){
      return {
        name: '',
        hospital: '',
        career: '0',
        mobile: '',
        checkInput: '',
        checkClickStatus: false,
        checkMessage: '获取验证码',
        moreFlag: false,
        nameCheckMessage: '',
        simulateSelectStatus: false,
        selectValue: '',
        validCode: '',
        idKey: '',
        popupText: '',
        popupImg: ''
      }
    },
    methods: {
      submit(){
        let _this = this;


        let data = {
          doctorName: _this.name,
          hospitalName: _this.hospital,
          titleName: _this.career,
          mobile: _this.mobile,
          isValid: '1',
          sendSiteId: '17'
        };
        axios({
          method: 'post',
          url: '/mcall/tocure/cms/activity/doctor/v1/create/',
          data: data,
          responseType: 'json',
          header: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          transformRequest: [function (data) {
            data = "paramJson=" + JSON.stringify(data);
            return data;
          }]
        }).then(function (res) {
          if (res.data.responseObject.responseStatus) {
            if (res.data.responseObject.responseMessage == '9X0001') {
              _this.popup("同一手机号码只能提交一次");
            } else {
              _this.popup("提交成功工作人员会在48小时内联系您", 'successful');
            }
          } else {
            _this.popup("网络信号差，建议您稍后再试", 'fail');
          }
        }).catch(function (error) {
          _this.popup("网络信号差，建议您稍后再试", 'fail');
          console.log("请求失败：" + error);
        });
      },
      validator(callback){
        let _this = this;
        let items = this.$validator.errors.items;
        if (items.length > 0) {
          _this.popup("请填写好信息");
          return false;
        }

        if (_this.name == '' || _this.hospital == '' || _this.selectValue == '' || _this.mobile == '' || _this.checkInput == '') {
          _this.popup("请填写好信息");
          return false;
        }

        if (_this.idKey == '') {
          _this.popup("请先获得验证码");
          return false;
        }


        let data = {
          validCode: _this.checkInput,
          id: _this.idKey,
          isValid: 1,
          account: _this.mobile
        };
        axios({
          method: 'post',
          url: '/mcall/customer/send/code/v1/update/',
          data: data,
          responseType: 'json',
          header: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          transformRequest: [function (data) {
            data = "paramJson=" + JSON.stringify(data);
            return data;
          }]
        }).then(function (res) {
          if (res.data.responseObject.responseStatus) {
            if (res.data.responseObject.responseCode == "1A0001") {

              _this.popup("验证码失效，请重新获取");
            } else if (res.data.responseObject.responseCode == "1A0002") {
              _this.popup("验证码错误");
            } else {
              if (callback) {
                callback();
              }
            }
          } else {
            _this.popup("网络信号差，建议您稍后再试", 'fail');
          }
        }).catch(function (error) {
          _this.popup("网络信号差，建议您稍后再试", 'fail');
          console.log("请求失败：" + error);
        });
      },
      more(){
        this.moreFlag = !this.moreFlag;
      },
      checkCode(){
        let _this = this;
        if (_this.mobile == '') {
          _this.popup("请填写手机号");
          return false;
        }
        let data = {
          typeId: '6',      //	1-手机号找回密码 2-账号验证(1.绑定手机、手机号注册) 3-手机验证码快捷登录4-老患者报到5-患者注册6-医生报名
          account: _this.mobile,      //账号
          codeLength: '4',  //代码长度
          accountType: '0', //0-手机 1-邮箱
          operateType: '6',  //1-绑定手机 2－修改手机号 3-手机号找回密码 5-手机号注册 8-手机号快捷登录6-医生报名
          mobile: _this.mobile      //账号
        };
        if (!_this.checkClickStatus && !_this.errors.has('phone')) {
          axios({
            method: 'post',
            url: '/mcall/customer/send/code/v1/create/',
            data: data,
            responseType: 'json',
            header: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: [function (data) {
              data = "paramJson=" + JSON.stringify(data);
              return data;
            }]
          }).then(function (res) {
            if (res.data.responseObject.responseStatus) {

              if (res.data.responseObject.responseCode == '9X0005') {
                _this.popup("同一手机号只能注册一次");
              } else {
                _this.validCode = res.data.responseObject.responseData.validCode;
                _this.idKey = res.data.responseObject.responsePk;

                _this.popup("验证码已发送", 'successful');
                if (!_this.checkClickStatus) {

                  let i = 60;
                  _this.checkMessage = i + 's';
                  _this.checkClickStatus = true;
                  _this.time = setInterval(function () {
                    i--;
                    _this.checkMessage = i + "S";
                    if (i === 0) {
                      clearInterval(_this.time);
                      _this.checkMessage = "重新获取";
                      _this.checkClickStatus = false;
                      i = 60;
                    }
                  }, 1000);
                }
              }
            } else {
              if (res.data.responseObject.responseCode == '9X0005') {
                _this.popup("同一手机号只能注册一次");
              } else if (res.data.responseObject.responseCode == 'SMS0003') {
                _this.popup("  验证码获取次数过多，请明日再试");
              }
            }
          }).catch(function (error) {
            _this.popup('网络信号差，建议您稍后再试', 'fail');
            console.log("请求失败：" + error);
          });
        }
      },
      validateBlur(name) {
        this.$validator.validateAll();
        if (this.errors.has(name)) {
          //this.toastComm(this.errors.first(name));
        }
      },
      simulateSelect(){
        this.simulateSelectStatus = !this.simulateSelectStatus;
      },
      select(data){
        this.simulateSelectStatus = false;
        switch (data) {
          case 0:
            break;
          case 1:
            this.selectValue = '主任医生';
            this.career = '1_主任医生';
            break;
          case 2:
            this.selectValue = '副主任医生';
            this.career = '2_副主任医生';
            break;
          case 3:
            this.selectValue = '主治医生';
            this.career = '3_主治医生';
            break;
          case 4:
            this.selectValue = '其他';
            this.career = '0_其他';
            break;
        }
      },
      popup(text, img){

        let _this = this;
        _this.popupText = text;
        if (typeof (img) != 'undefined') {
          console.log(img);
          _this.popupImg = img;
        }

        setTimeout(function () {
          _this.popupText = '';
          _this.popupImg = '';

        }, 2000);
      },
      nameLength(){
        var _this = this;
        var len = 0;
        let count = 0;
        for (let i=0; i < _this.name.length; i++) {
          var c =  _this.name.charCodeAt(i);
          if(len<40){
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
            count++
          }
          else {
            len += 2;
            count++
          }
          }else{
            _this.name = _this.name.substr(0, count);
          }
        }
      },
      hospitalLength(){

        var _this = this;
        var len = 0;
        let count = 0;
        for (let i=0; i < _this.hospital.length; i++) {
          var c =  _this.hospital.charCodeAt(i);
          if(len<40){
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
              len++;
              count++
            }
            else {
              len += 2;
              count++
            }
          }else{
            _this.hospital = _this.hospital.substr(0, count);
          }
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";

  * {
    padding: 0;
    margin: 0;
  }

  .banner {
    display: block;
    margin: 0 auto;
    position: relative;
    width: 100%;
    max-width: rem(750px);
  }

  .content {
    max-width: rem(750px);
    margin: 0 auto;
    position: relative;
    img {
      display: block;
      width: 100%;
    }
    .content-information {
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      top: rem(82px);
      left: 0;
      padding: 0 rem(50px) 0 rem(50px);
      height: rem(833px);

      .flagMessage {
        padding-top: rem(54px);
        margin-bottom: rem(40px);
        @include font-dpr(15px);
        color: #FA787A;
        line-height: rem(30px);
        margin-left: rem(130px);
      }

      ul {
        list-style: none;
        margin-top: rem(40px);
        li {
          padding: 0 rem(80px) rem(20px) rem(160px);
          .apply_title {
            @include font-dpr(16px);
            width: rem(124px);
            text-align: right;
            display: inline-block;
            margin-left: rem(-134px);
            margin-bottom: rem(44px);
            padding-right: rem(10px);
            box-sizing: border-box;
            color: #5E6266;
            letter-spacing: 0;
            line-height: rem(32px);
            white-space: nowrap;
          }
          .apply_text {
            width: 100%;
            height: 100%;
            display: inline-block;
            input {
              @include font-dpr(15px);
              width: 100%;
              height: rem(80px);
              background: #F4F7F9;
              display: inline-block;
              outline: none;
              border: none;
              padding-left: rem(18px);
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .apply_checkInput {
              width: 58%;
            }
            .apply_checkCode {
              color: #FFFFFF;
              letter-spacing: 0;
              line-height: rem(68px);
              height: rem(68px);
              margin-top: rem(6px);
              width: 38%;
              border-radius: rem(4px);
              background: #009BFF;
              @include font-dpr(14px);
              display: inline-block;
              text-align: center;
              cursor: pointer;
              float: right;
              &.on {
                background: #C9CDCF;
                border-radius: rem(4px);
                color: #FFFFFF;
                letter-spacing: 0;
                line-height: rem(68px);
                height: rem(68px);
                margin-top: rem(6px);
                width: 38%;
                @include font-dpr(14px);
                display: inline-block;
                text-align: center;
                cursor: pointer;
                float: right;

              }
            }
            .apply_select {

              @include font-dpr(15px);
              width: 100%;
              height: rem(80px);
              background: #F4F7F9;
              display: inline-block;
              outline: none;
              border: none;
              padding-left: rem(18px);
              box-sizing: border-box;
            }
          }
          .simulateSelect {
            position: relative;
            ul {
              display: block;
              position: absolute;
              top: rem(81px);
              margin-top: 0;
              width: 100%;
              left: 0;
              background: #F4F7F9;
              box-shadow: 0 rem(16px) rem(30px) 0 rgba(0, 0, 0, 0.20);
              border-radius: rem(8px);
              z-index: 2;
              li {
                @include font-dpr(17px);
                color: #222222;
                letter-spacing: 0;
                width: 100%;
                height: rem(80px);
                line-height: rem(80px);
                text-align: center;
                padding: 0;
                background: #FFFFFF;
                display: inline-block;
                outline: none;
                border: none;
                box-sizing: border-box;
                border-bottom: 1px solid #F4F7F9;
                &.active {
                  background: #F4F7F9;
                }
                &:last-child {
                  border-bottom-right-radius: rem(8px);
                  border-bottom-left-radius: rem(8px);
                }
              }
            }
          }
          .error-message {
            @include font-dpr(12px);
            color: #FA787A;
            line-height: rem(24px);
          }
        }
      }
      .apply_message {
        .title {
          padding-left: rem(0px);
        }
        p {

          padding-left: rem(20px)
        }
      }
      .detail_message {
      }

    }
  }

  .saveBtn {
    position: absolute;
    bottom: rem(-115px);
    left: rem(33px);
    text-align: center;
    background: url("../../common/image/img00/signUpActivity/button.png") no-repeat;
    background-size: 100%;
    display: block;
    height: rem(178px);
    width: rem(684px);
    &:active {
      position: absolute;
      bottom: rem(-115px);
      left: rem(33px);
      text-align: center;
      background: url("../../common/image/img00/signUpActivity/button_press.png") no-repeat;
      background-size: 100%;
      display: block;
      height: rem(178px);
      width: rem(684px);
    }
  }

  .more {
    text-align: center;
    display: block;
  }

  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(0) translate(-50%, -50%);
    background: #000000;
    opacity: 0;
    padding: rem(20px) rem(28px);
    border-radius: 8px;
    transform-origin: 0% 0%;
    //transform-origin:25% 25%;
    transition: all 0.2s linear;
    z-index: 6;
    .popup-text {
      @include font-dpr(16px);
      color: #FFFFFF;
    }
    &.show {
      opacity: 0.7;
      transform: scale(1) translate(-50%, -50%)
    }
    .middle-tip-box-text {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      @include font-dpr(16px);
      color: #FFFFFF;
      & > img {
        width: rem(100px);
        height: rem(100px);
        vertical-align: top;
        margin: 0 auto rem(14px);
      }
    }
  }

  .icon-down {
    background: url("../../common/image/img00/signUpActivity/unfolded.png") no-repeat;
    background-size: 100%;
    height: rem(44px);
    width: rem(44px);
    position: absolute;
    right: rem(18px);
    top: rem(18px);
  }

  .icon-up {
    background: url("../../common/image/img00/signUpActivity/up.png") no-repeat;
    background-size: 100%;
    height: rem(44px);
    width: rem(44px);
    position: absolute;
    right: rem(18px);
    top: rem(18px);
  }

</style>
