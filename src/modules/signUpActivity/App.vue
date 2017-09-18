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
                <input class=" name" type="text" placeholder="填写真实姓名" maxlength="40" v-model="name" name="name" v-validate="'required|special'"/>
              </span>
            </div>
            <p class="nameErrorMessage error-message" v-show="errors.has('name')">{{errors.first('name') }}</p>
          </li>
          <li>
            <div>
              <span class="apply_title">医院</span>
              <span class="apply_text">
                <input class="hospital" type="text" placeholder="填写所在的医院" v-model="hospital" maxlength="40" name="hospital" v-validate="'required|hospital'"/>
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
                  </ul>
                </div>
              </span>
            </div>
          </li>
          <li>
            <div>
              <span class="apply_title">手机号</span>
              <span class="apply_text">
                <input class="apply_text mobile" type="text" placeholder="填写真实手机号码 " maxlength="11" v-model="mobile" name="phone" v-validate="'required|mobile'"/>
              </span>
            </div>
            <p class="nameMobileMessage error-message" v-show="errors.has('phone')">{{errors.first('phone') }}</p>
          </li>
          <li>
            <div>
              <span class="apply_title">验证码</span>
              <span class="apply_text">
                <input class="apply_checkInput" type="text" placeholder="填写短信验证码" v-model="checkInput" maxlength="4"/>
                <a class="apply_checkCode" @click="checkCode()" :class="{'on':checkClickStatus}">{{checkMessage}}</a>
              </span>
            </div>
            <p class="nameCheckMessage error-message"></p>
          </li>
        </ul>
        <a class="saveBtn" @click="submit()"></a>
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
        <img  src="../../common/image/img00/signUpActivity/04.png">
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
        simulateSelectStatus:false,
        selectValue:''
      }
    },
    methods: {
      submit(){
        let _this = this;
        let items = this.$validator.errors.items;
        if (items.length > 0) {
              return false;
        }

        let data = {
          name: _this.name,
          hospital: _this.hospital,
          career: _this.career,
          mobile: _this.mobile,
          checkInput: _this.checkInput
        };

//        axios({
//          method: 'post',
//          url: '',
//          data: data,
//          responseType: 'json',
//          header: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
//          transformRequest: [function (data) {
//            data = "paramJson=" + JSON.stringify(data);
//            return data;
//          }]
//        }).then(function (res) {
//
//
//        }).catch(function (error) {
//          console.log("请求失败：" + error);
//        });
        _this.nameCheckMessage = '验证码错误';
        _this.nameCheckMessage = '验证码失效，请重新获取';
        _this.nameCheckMessage = '验证码获取次数过多，请明日再试';

      },
      popup(obj) {
        if ($(".popup").length == 0) {
          $("body").append('<section class="middle-tip-modal popup">' +

            '<figure class="middle-tip-box-text">' +
            (obj.hasImg ? '<img src="/image/img00/login/save_loading.png" alt="">' : '') +
            '<p class="popup-text">' + obj.text + '</p> ' +

            '</figure>' +
            '</section>');

          setTimeout(function () {
            $(".popup").addClass('show')
          }, 100);
        } else {
          $(".popup").addClass('show');
          $(".tipText").text(obj.text);
          if (!obj.hasImg) {
            $(".middle-tip-box-text img").hide();
          } else {
            $(".middle-tip-box-text img").show();
          }
        }
        setTimeout(function () {
          // $(".popup").removeClass('show');
          $(".popup").remove();
        }, 3000)
      },
      more(){
        this.moreFlag = !this.moreFlag;
      },
      checkCode(){
        let _this = this;
//        axios({
//          method: 'post',
//          url: '',
//          data: data,
//          responseType: 'json',
//          header: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
//          transformRequest: [function (data) {
//            data = "paramJson=" + JSON.stringify(data);
//            return data;
//          }]
//        }).then(function (res) {

        if (!_this.checkClickStatus) {


          let i = 10;
          _this.checkMessage = i + 's';
          _this.checkClickStatus = true;
          _this.time = setInterval(function () {
            i--;
            _this.checkMessage = i + "S";
            if (i === 0) {
              clearInterval(_this.time);
              _this.checkMessage = "重新获取";
              _this.checkClickStatus = false;
              i = 10;
            }
          }, 1000);
        }
      },
      validateBlur(name) {
        console.log(this.$validator);
        this.$validator.validateAll();
        if (this.errors.has(name)) {
          alert("11");
          //this.toastComm(this.errors.first(name));
        }
      },
      simulateSelect(){
        this.simulateSelectStatus = !this.simulateSelectStatus;
      },
      select(data){
        this.simulateSelectStatus = false;
        switch (data){
          case 0: break;
          case 1: this.selectValue = '主任医生' ;break;
          case 2: this.selectValue = '副主任医生' ;break;
          case 3: this.selectValue = '主治医生' ;break;
        }
      }
//        }).catch(function (error) {
//          console.log("请求失败：" + error);
//        });
    },
    mounted(){

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";

  * {
    padding: 0;
    margin: 0;
  }
  .banner{
    display:block;
    margin:0 auto;
    position: relative;
    width: 100%;
    max-width: rem(750px);
  }
  .content {
    max-width: rem(750px);
    margin:0 auto;
    position: relative;
     img{
      display: block;
       width: 100%;
     }
    .content-information{
      width:100%;
      box-sizing: border-box;
      position: absolute;
      top:rem(82px);
      left:0;
      padding: 0 rem(50px)  0 rem(50px);
      height:rem(833px);

    .flagMessage {
      padding-top: rem(54px);
      margin-bottom:rem(40px);
      @include font-dpr(15px);
      color: #FA787A;
      line-height: rem(30px);
      margin-left: rem(130px);
    }

    ul {
      list-style: none;
      margin-top:rem(40px);
      li {
        padding: 0 rem(80px) rem(20px) rem(160px);
        .apply_title {
          @include font-dpr(16px);
          width: rem(124px);
          text-align: right;
          display: inline-block;
          margin-left: rem(-134px);
          margin-bottom:rem(44px);
          padding-right:rem(10px);
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
            height:rem(80px);
            background: #F4F7F9;
            display: inline-block;
            outline: none;
            border: none;
            padding-left:rem(18px);
            box-sizing: border-box;
          }

          .apply_checkInput {
            width: 58%;
          }
          .apply_checkCode {
            color: #FFFFFF;
            letter-spacing: 0;
            line-height:rem(68px);
            height:rem(68px);
            margin-top:rem(6px);
            width: 38%;
            border-radius: 4px;
            background: #009BFF;
            @include font-dpr(14px);
            display: inline-block;
            text-align: center;
            cursor: pointer;
            float:right;
            &.on {
              background: #fff;
              color: #000;
              letter-spacing: 0;
              line-height:rem(68px);
              height:rem(68px);
              margin-top:rem(6px);
              width: 38%;
              border-radius: 4px;
              @include font-dpr(14px);
              display: inline-block;
              text-align: center;
              cursor: pointer;
              float:right;

            }
          }
          .apply_select {
            @include font-dpr(15px);
            width: 100%;
            height:rem(80px);
            background: #F4F7F9;
            display: inline-block;
            outline: none;
            border: none;
            padding-left:rem(18px);
            box-sizing: border-box;
          }
        }
        .simulateSelect{
          position: relative;
          ul{
            display: block;
            position: absolute;
            top:rem(81px);
            margin-top:0;
            width: 100%;
            left:0;
            background: #fff;
            li{
              width: 100%;
              height: rem(80px);
              line-height: rem(80px);
              text-align: center;
              padding:0;
              background: #F4F7F9;
              display: inline-block;
              outline: none;
              border: none;
              box-sizing: border-box;
              border-bottom:1px solid #fff;
            &.active{
              background: #fff;
            }
            }
          }
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
    bottom:rem(-89px);
    left:rem(33px);
    text-align: center;
    background: url("../../common/image/img00/signUpActivity/button.png") no-repeat;
    background-size: 100%;
    display: block;
    height:rem(178px);
    width:rem(684px);
  }
  .saveBtn:active{
    position: absolute;
    bottom:rem(-89px);
    left:rem(33px);
    text-align: center;
    background: url("../../common/image/img00/signUpActivity/button_press.png" ) no-repeat;
    background-size: 100%;
    display: block;
    height:rem(178px);
    width:rem(684px);
  }

  .more {
    text-align: center;
    display: block;
  }
  .popup {
    &.right {
      left: 91%;
    }
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
        width: rem(50px);
        height: rem(50px);
        vertical-align: top;
        margin-bottom: rem(14px);
      }
    }
  }

  .icon-down{
    background: url("../../common/image/img00/signUpActivity/unfolded.png") no-repeat;
    background-size: 100%;
    height:rem(44px);
    width:rem(44px);
    position: absolute;
    right:rem(18px);
    top:rem(18px);
  }

  .icon-up{
    background: url("../../common/image/img00/signUpActivity/up.png") no-repeat;
    background-size: 100%;
    height:rem(44px);
    width:rem(44px);
    position: absolute;
    right:rem(18px);
    top:rem(18px);
  }

</style>
