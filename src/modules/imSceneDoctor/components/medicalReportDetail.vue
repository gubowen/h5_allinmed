<template>
  <section class="main-inner medical-report-detail">
    <section class="tc-caseContentBox">
      <section class="tc-baseInfo">
        <ul class="tc-baseInfoList">
          <li class="tc-baseInfoItem">
            <div class="tc-baseInfoItemLeft">
              <img :src="logoUrl" alt="">
            </div>
            <div class="tc-baseInfoItemRight">
              <span
                class="tc-baseInfoName">{{patientCasemap.patientName.length > 5 ? patientCasemap.patientName.substring(0, 5) + "..." : patientCasemap.patientName}}</span>
              <span class="tc-baseInfoSex"> {{patientCasemap.sexName}}</span>
              <span class="tc-baseInfoAge">{{patientCasemap.age}}  岁</span>
            </div>
          </li>
          <li class="tc-baseInfoItem">
            <div class="tc-baseInfoItemLeft">问诊日期</div>
            <div class="tc-baseInfoItemRight">{{caseTime}}</div>
          </li>
        </ul>
        <section class="tc-baseInfoItem">
          <div class="tc-baseInfoItemLeft">主诉</div>
          <div class="tc-baseInfoItemRight tc-recommendUserMain">{{patientCasemap.caseMain.caseMain}}</div>
        </section>
      </section>
      <section class="tc-caseDescribe tc-module">
        <section class="tc-caseDescribeTitle title"><h3>症状描述</h3>
        </section>
        <ul class="tc-caseDescribeList">
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">不适部位</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{partName}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">症状描述</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{symptomDescription}}</span>
          </li>
          <li class="tc-caseDescribeItem" v-if="acheType.length">
            <span class="tc-caseDescribeItemLeft">疼痛性质</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{acheType}}</span>
          </li>
          <li class="tc-caseDescribeItem" v-if="VASGrade.length">
            <span class="tc-caseDescribeItemLeft">VAS评分</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{VASGrade}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">持续时间</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{illnessTime || "未填写"}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">加重时间</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{heavyTime || "未填写"}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">其他症状</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{complication || "未填写"}}</span>
          </li>
        </ul>
      </section>
      <section class="tc-caseDescribe tc-module">
        <section class="tc-caseDescribeTitle title"><h3>现病史</h3></section>
        <ul class="tc-caseDescribeList">
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">曾就诊医院</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{patientCasemap.treatmentName || "未填写"}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">确诊疾病</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{patientCasemap.illnessName || "未填写"}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">检查资料</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{imageList1.length===0?"未填写":"&nbsp&nbsp"}}</span>
            <ul class="uploadListsBox" v-if="imageList1.length!==0">
              <li v-for="(item,index) in imageList1" @click="showBigImg(item,index,1)">
                <img :src="item">
              </li>
            </ul>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">患处照片</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{imageList2.length===0?"未填写":"&nbsp&nbsp"}}</span>
            <ul class="uploadListsBox" v-if="imageList2.length!==0">
              <li v-for="(item,index) in imageList2" @click="showBigImg(item,index,2)">
                <img :src="item">
              </li>
            </ul>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">服用药物</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{patientCasemap.takeMedicine || "未填写"}}</span>
          </li>
        </ul>
      </section>
      <section class="tc-caseDescribe tc-module">
        <section class="tc-caseDescribeTitle title">
          <h3>基本信息</h3>
        </section>
        <ul class="tc-caseDescribeList">
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">患者所在地</span>
            <span
              class="tc-caseDescribeItemRight tc-noRevice">{{patientCasemap.provinceName + "&nbsp" + patientCasemap.cityName + "&nbsp" + patientCasemap.districtName}}</span>
          </li>
          <li class="tc-caseDescribeItem">
            <span class="tc-caseDescribeItemLeft">手机号码</span>
            <span class="tc-caseDescribeItemRight tc-noRevice">{{patientCasemap.mobile}}</span>
          </li>
        </ul>
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
   * Created by qiangkailiang on 2017/8/21.
   */
  import api from "common/js/util/util";
  const XHRList = {
    getInquiryPage: '/mcall/customer/patient/case/v1/getMapById/',           //问诊单
  };
  export default{
    data(){
      return {
        finish: false,
        patientCasemap: {
          patientName: "",
          caseMain: "",
          attachmentList: ""
        },
        partName: "",
        logoUrl: "",
        remarkContent: "",
        illnessTime: "",
        caseTime: "",
        heavyTime: "",
        complication: "",
        resultMainList: [],
        imageList1: [],
        imageList2: [],
        symptomDescription:'',//症状描述
        acheType:"",//疼痛类型
        VASGrade:'',//VAS评分
      }
    },
    activated(){

    },
    mounted(){
      this.getMedicalReport();
    },
    methods: {
      getMedicalReport() {
        const that = this;
        api.ajax({
          url: XHRList.getInquiryPage,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,
            attUseFlag: 1,
            isOrder: 0
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(data) {
            if (data.responseObject && data.responseObject.responseData) {

              let _data = data.responseObject.responseData.dataList[0];
              that.patientCasemap = data.responseObject.responseData.dataList[0].patientCasemap;
              that.resultMainList = data.responseObject.responseData.dataList[0].resultMainList;
              that.resultMainList[0].symptomOptions.forEach((element)=>{
                that.symptomDescription += element.optionName + '、';
              });
              that.symptomDescription = that.symptomDescription.substring(0,that.symptomDescription.length-1);
              if(that.resultMainList[0].symptomOptions[0].refQuestionList.length){
                that.acheType=that.resultMainList[0].symptomOptions[0].refQuestionList[0].symptomOptions[0].optionName;
                that.VASGrade=that.resultMainList[0].symptomOptions[0].refQuestionList[1].symptomOptions[0].optionName + that.resultMainList[0].symptomOptions[0].refQuestionList[1].symptomOptions[0].optionDesc;//VAS评分
              }
              let caseTime = that.patientCasemap.caseTime.split(' ')[0];

              that.caseTime = caseTime.split('-')[0] + '年' + caseTime.split('-')[1] + '月' + caseTime.split('-')[2] + '日'
              that.illnessTime = ((that.resultMainList[1].symptomOptions[0].optionDesc && that.resultMainList[1].symptomOptions[0].optionDesc.length > 0) ? that.resultMainList[1].symptomOptions[0].optionDesc : that.resultMainList[1].symptomOptions[0].optionName);
              that.heavyTime = ((that.resultMainList[2].symptomOptions[0].optionDesc && that.resultMainList[2].symptomOptions[0].optionDesc.length > 0) ? that.resultMainList[2].symptomOptions[0].optionDesc : that.resultMainList[2].symptomOptions[0].optionName);
              that.partName = that.resultMainList[0].partName;
              that.complication = that.patientCasemap.caseMain.caseAlong;

              that.patientCasemap.attachmentList.forEach((element, index) => {
                if (element.caseAttSource == 0) {
                  that.imageList1.push(element.caseAttUrl);
                } else {
                  that.imageList2.push(element.caseAttUrl);
                }
              });
              that.getLogoUrl();
            }
            that.finish = false;
          }
        })
      },
      showBigImg(item, index,type){
        let that = this;
        let _params = {
          imgBlob: (function () {
            let result = [];
            that["imageList"+type].forEach((element, index) => {
              result.push({blob: element});
            });
            return result;
          }()),
          indexNum: index
        };
        this.$router.push({
          name: "showBigImg",
          params: _params
        });
      },
      getLogoUrl() {
        let sex = this.patientCasemap.sexName,
          age = parseInt(this.patientCasemap.age),
          img = "";
        if (age <= 12) {
          img = require('../../../common/image/img00/myServices/chatting_portrait_child@2x.png');
        } else if (age > 12 && age <= 59) {
          img = (sex === "男" ? require('../../../common/image/img00/myServices/chatting_chatting_man@2x.png') : require('../../../common/image/img00/myServices/chatting_portrait_woman@2x.png'));
        } else if (age >= 60) {
          img = (sex === "男" ? require('../../../common/image/img00/myServices/chatting_portrait_old_man@2x.png') : require('../../../common/image/img00/myServices/chatting_portrait_old_woman@2x.png'));
        }
        this.logoUrl = img;
      },
    },
    props: {},

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .main-inner {
    //基本信息以下模块样式
    .tc-caseContentBox {
      background: #E6E6ED;
      padding: rem(30px);
      .tc-baseInfo {
        margin-bottom: rem(16px);
        border-radius: rem(16px);
        background: #ffffff;
        .tc-baseInfoList {
          padding-top: rem(40px);
          /*background: url("../../../common/image/img00/myServices/interrogation_bg.png") no-repeat;*/
          background-size: 100%;
        }
        .tc-baseInfoItem {
          padding-bottom: rem(50px);
          @include clearfix();
          &:first-child {
            padding-bottom: rem(90px);
          }
          .tc-baseInfoItemLeft {
            width: rem(170px);
            padding-left: rem(32px);
            @include font-dpr(17px);
            float: left;
            color: #AAA;
            img {
              display: block;
              width: rem(120px);
              height: rem(120px);
              margin: 0 auto;
              box-shadow: 0 6px 12px 0 rgba(0,0,0,0.05);
              border-radius:50%;
            }
          }
          .tc-baseInfoItemRight {
            margin-left: rem(230px);
            margin-right: rem(30px);
            color: #222222;
            @include font-dpr(18px);
            span {
              display: inline-block;
              margin-top: rem(44px);
            }
            .tc-baseInfoName {
              @include font-dpr(20px);
              margin-right: rem(32px);
              font-weight: bold;
            }
            .tc-baseInfoSex {
              margin-right: rem(28px);
            }
            .tc-baseInfoDate {
              display: block;
              @include font-dpr(13px);
              line-height: rem(26px);
              color: #909090;
              margin-top: rem(16px);
            }
            .tc-goCase {
              @include font-dpr(14px);
              position: absolute;
              right: rem(70px);
              top: rem(46px);
              color: #78849C;
              line-height: rem(28px);
              &::after {
                display: inline-block;
                content: "";
                width: rem(12px);
                height: rem(20px);
                position: absolute;
                top: 50%;
                margin-top: rem(-14px);
                right: rem(-27px);
                background: url("/image/img00/patientConsult/arrow_right.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            &.tc-recommendUserMain {
              line-height: rem(52px);
            }
          }
        }
      }
      .tc-module {
        margin-bottom: rem(16px);
        border-radius: rem(16px);
        background-color: #ffffff;
        .title {
          padding: rem(40px) 0 rem(40px) rem(30px);
          border-bottom: 1px solid #F8F8F8;
          h3 {
            color: #666666;;
            @include font-dpr(18px);
            &:before {
              display: inline-block;
              content: '';
              width: rem(4px);
              height: rem(20px);
              margin-right: rem(10px);
              background: #4CD3C6;
              /*vertical-align: middle;*/
              margin-top:-(rem(4px));
              border-radius: 999px;
            }
          }
        }
        .tc-recommendRightComm {
          @include font-dpr(14px);
          position: absolute;
          right: 0;
          top: 0;
          display: block;
          width: rem(200px);
          text-align: right;
          color: #9798A6;
          padding-right: rem(24px);
          &:after {
            position: absolute;
            content: '';
            top: 50%;
            right: 0;
            margin-top: rem(-8px);
            display: inline-block;
            width: rem(20px);
            height: rem(20px);
            background: url("../../../common/image/img00/recoveryReport/suggestion_enter@2x.png");
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
        .tc-caseDescribeList {
          .tc-caseDescribeItem {
            @include clearfix();
            padding: rem(40px) 0;
            .tc-caseDescribeItemLeft {
              float: left;
              width: rem(170px);
              @include font-dpr(17px);
              color: #AAAAAA;
              padding-left: rem(32px);
            }
            .tc-caseDescribeItemRight {
              word-wrap: break-word;
              word-break: break-all;
              position: relative;
              display: block;
              margin-left: rem(230px);
              margin-right: rem(30px);
              @include font-dpr(18px);
              color: #444444;
              &:after {
                display: inline-block;
                position: absolute;
                content: '';
                width: rem(20px);
                height: rem(20px);
                background: url("../../../common/image/img00/recoveryReport/suggestion_enter@2x.png");
                background-size: 100% 100%;
                right: 0;
                top: 50%;
                margin-top: rem(-8px);
              }
            }
            .tc-noRevice {
              &:after {
                display: none;
              }
            }
          }
        }
        .tc-caseOtherBox {
          position: relative;
        }
        .text-num-tips {
          position: absolute;
          right: rem(60px);
          bottom: 0;
          color: #0ab375;
          @include font-dpr(12px);
        }
        //输入框 备注
        .tc-caseDesOther {
          width: 100%;
          height: rem(340px);
          padding: rem(60px) rem(32px);
          box-sizing: border-box;
          border-style: none;
          border-bottom: 1px solid #F4F4F4;
          @include font-dpr(18px);
          @include placeholder() {
            color: #aaaaaa;
          }
        }
      }
      .tc-comment {
        padding-bottom: rem(60px);
      }
      .submit_symptom_box {
        padding: rem(70px) 0 rem(100px);
        .submit_symptom {
          display: block;
          width: rem(560px);
          line-height: rem(100px);
          text-align: center;
          color: #FFF;
          background: #00d6c6;
          margin: 0 auto;
          border-radius: 100px;
          @include font-dpr(18px)
        }
      }
      //上传图片
      .imgList-box {
        padding: rem(50px) 0 0 rem(32px);
      }

      .tc-upLoadItemList {
        width: rem(180px);
        height: rem(180px);
        display: inline-block;
        position: relative;
        vertical-align: top;
        margin: 0 rem(20px) rem(20px) 0;

        & > img {
          display: block;
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }

      .ev-upLoadInput {
        opacity: 0;
        width: 100%;
        height: 100%;
      }

      .ev-upLoadAdd {
        width: rem(180px);
        height: rem(180px);
        text-align: center;
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin: 0 rem(20px) rem(20px) 0;
        //padding:rem(8px);
        background: url("../../../common/image/img00/consult_V1.2/addto@2x.png") center;
        background-size: contain;
        //span{
        //  display: block;
        //  width: rem(136px);
        //  height: rem(136px);
        //  background: url("/image/img00/patientConsult/addto@2x.png");
        //  background-size: 100% 100%;
        //
        //}
      }

      .tc-upLoadDel {
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        top: 0;
        right: 0;
        background: url(../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png) no-repeat;
        background-position: top right;
        background-size: 0.50667rem 0.50667rem;
        z-index: 1;
      }

      .tc-upLoadItemList {
        position: relative;

        .ev-loading {
          position: absolute;
          opacity: 0.83;
          background: #545454;
          .middle-tip-modal {
            position: absolute;
          }
        }
      }

      .upload-fail {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.83;
        background: #545454;
        & > input {
          opacity: 0;
          width: 100%;
          height: 100%;
        }
        & > p {
          @include font-dpr(12px);
          color: #FFFFFF !important;
          text-align: center;
          position: absolute;
          top: 50%;
          width: 100%;
          left: 50%;
          transform: translate(-50%, -50%)

        }
      }
    }
  }

  .au-main {
    min-height: 100%;
    height: auto;
    //position: relative;
    box-sizing: border-box;
    padding-bottom: rem(184px);
    .au-infoBox {
      //第六题样式
      .au-cureHisList {
        padding-top: rem(52px);
        li li {
          margin-top: rem(72px);
        }
        .au-cureHisItem {
          .au-cureHisItemTop {
            color: #222222;
            @include font-dpr(16px);
            line-height: 1;
            padding: 0 rem(48px);
          }
          .au-cureHisItemBottom {
            padding: 0 rem(48px);
            @include clearfix();
            font-size: 0;
            span {
              //box-sizing: border-box;
              border: rem(1px) solid #BDBDBD;
              border-radius: 100px;
              display: table;
              float: left;
              margin-right: rem(18px);
              margin-top: rem(32px);
              @include font-dpr(14px);
              color: #808080;
              padding: rem(10px) rem(22px);
              line-height: 1;
              &.selected {
                color: #5BD7CF;
                border: rem(1px) solid #5BD7CF;
                background: #E4FDFC;
              }
            }
          }
          .au-cureHisItemInfo {
            display: none;
            width: 100%;
            height: rem(284px);
            box-sizing: border-box;
            margin-top: rem(46px);
            background-color: #F9FBFB;
            padding: rem(40px) rem(48px);
            textarea {
              width: 100%;
              height: 100%;
              border: none;
              text-align: justify;
              @include font-dpr(15px);
              color: #222;
              line-height: 1.5;
              background-color: #F9FBFB;
            }
          }
        }
      }

      //第七题样式
      .au-perfectInfoList {
        padding-top: rem(52px);
        .au-perfectInfoItem {
          padding: 0 rem(48px);
          display: table;
          height: rem(120px);
          @include font-dpr(15px);
          .au-perfectInfoItemLeft {
            display: table-cell;
            width: rem(248px);
            color: #222;
            vertical-align: top;

          }
          .au-perfectInfoItemRight {
            display: table-cell;
            width: rem(405px);
            color: #CCCCCC;
            position: relative;
            .fontGray {
              color: #ccc;
            }
            .ev-change-city {
              color: #222;
              &:after {
                display: inline-block;
                position: absolute;
                content: '';
                width: 0.26667rem;
                height: 0.26667rem;
                background: url(/image/img00/recoveryReport/suggestion_enter@2x.png);
                background-size: 100% 100%;
                right: 0;
                top: 10%;
              }
            }
            &.hasSelect {
              span.show {
                position: absolute;
                z-index: 1;
                &.selected {
                  color: #555555;
                }
              }
              select {
                position: absolute;
                z-index: 2;
                opacity: 0;
                display: block;
                height: 50%;
                width: 100%;
              }
            }
          }
          .au-perfectInfoItemTop {

          }
          .au-perfectInfoItemBottom {
            margin-top: rem(38px);
            margin-bottom: rem(50px);
            background-color: #F9FBFB;
            width: rem(654px);
            height: rem(276px);
            box-sizing: border-box;
            padding: rem(40px);
            textarea {
              display: block;
              height: 100%;
              background-color: #F9FBFB;
            }
          }
          input, textarea, span {
            border: none;
            display: block;
            width: 100%;
          }
        }
      }
    }
  }

  .symptom-desc-title {

    color: #222;
    @include font-dpr(17px);
    padding: 0 rem(48px);
    //line-height: 1;
    & > h4 {
      font-weight: normal;
    }
    .num {
      padding-right: rem(8px);
      em {
        color: #00bedf;
        font-style: normal;
      }
    }
    .tips {
      color: #7f858e;
      @include font-dpr(15px);
    }
  }

  .symptom-desc-item {
    &.multiple-choices {
      margin: rem(40px) 0;
      box-sizing: border-box;
    }
    &.single-choices {
      margin: rem(40px) 0;
      box-sizing: border-box;
    }
    .icon-select {
      margin-right: rem(24px);
    }
    &.selected.multiple-choices {
      & > p {
        .icon-select {
          background: url("/image/img00/patientConsult/symptom_square_sel@2x.png") no-repeat center;
          background-size: contain;
        }
        .icon-arrow {
          display: block;
        }
      }

    }
    &.selected.single-choices {
      & > p {
        .icon-select {
          background: url("/image/img00/patientConsult/symptom_circle_sel@2x.png") no-repeat center;
          background-size: contain;
        }
        .icon-arrow {
          display: block;
        }
      }
    }
    &.selected .symptom-desc-second-form {

      display: block;
    }
    & > p {
      color: #555;
      padding-left: rem(84px);
      @include font-dpr(15px);
      @include clearfix();
      .icon-arrow {
        float: right;
        background: url("/image/img00/patientConsult/symptom_pack up@2x.png") no-repeat;
        @include square(rem(28px));
        display: none;
      }
      & > span {
        vertical-align: text-top;
        display: inline-block;
        width: 81%;
        word-break: break-all;
      }
    }
    &.selected > p {
      color: #63C7BF;
    }

  }
  .uploadListsBox{
    @include clearfix();
    padding:rem(50px) 0 0 rem(32px);
    li{
      float:left;
      list-style: none;
      margin:0 rem(20px) rem(20px) 0;
      img{
        display: block;
        width:rem(180px);
        height:rem(180px);
      }
    }
  }
  //选择列表弹层
  #ev-choiceList {
    display: block;
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    margin-top: 0;
    background: #fff;
  }

  section.symptom-list {
    padding-bottom: 0;
  }

  .symptom-desc-controller .disabled {
    background: #ccc;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
