<template>
  <div>
    <section class="main-message-box">

      <!--新的问诊单-->
      <article class="medical-report-box" data-clientid="" @click="goToDetail">
        <header class="medical-report-title">问诊单</header>
        <section class="medical-report-content">
          <p class="patient-info"><span>患者：</span><span class="patient-name">{{medicalReportMessage.data.patientName | ellipsis(8)}}&nbsp</span><span
            class="patient-age">{{medicalReportMessage.data.sexName}}&nbsp{{medicalReportMessage.data.age}}岁</span></p>
          <p class="case-describe"><span>主诉：</span><span class="case-describe-main">{{mainCase}}</span></p>
        </section>
        <footer class="medical-report-footer">查看已提交信息</footer>
      </article>
    </section>
    <section class="main-message-box">
      <article class="main-message-box-item others-message">
        <figure class="main-message-img">
          <img src="../../../common/image/imScene/chatting_portrait_system@2x.png" alt="">
        </figure>
        <figcaption class="medical-report-tips">
          <p v-if="timeSlot">您好！分诊医生正在详细阅读您提交的资料，将尽快给您答复，并根据情况为您推荐对症专家。</p>
          <p v-else-if="!timeSlot">您好！分诊服务时间为09：00-22：00，如有问题请留言，分诊医生上班后会为您答复。</p>
          <!--<p>①  与您沟通分析病情</p>-->
          <!--<p>②  根据病情推荐对症专家</p>-->
          <!--<p>分诊医生通常会在5分钟内回复，请您耐心等候</p>-->
          <section class="tips-content">
            重要提示：在线咨询不能代替面诊，医生建议仅供参考。
          </section>
        </figcaption>
      </article>
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
   * Created by lichenyang on 2017/8/11.
   */
  import store from "../store/store";
  import api from 'common/js/util/util';

  const XHRList = {
    caseMain: "/mcall/customer/patient/case/v1/getMainMapById/",
  };
  export default {
    data() {
      return {
        mainCase: "",//患者主诉详情
        timeSlot: true,//是否再服务时间段
      }
    },
    mounted() {
      this.getCaseMain();
      this.getTimeSlot();
      store.commit("setPatientName", this.medicalReportMessage.data.patientName)
    },
    methods: {
      getCaseMain() {
        let that = this;
        api.ajax({
          url: XHRList.caseMain,
          method: "POST",
          data: {
            caseId: api.getPara().caseId,//string	是	病例id
            patientId: api.getPara().patientId,//string	是		患者id
          },
          beforeSend: function () {

          },
          done(param) {
            if (param.responseObject.responseStatus) {
              that.mainCase = param.responseObject.responseData.dataList[0].caseMain.caseMain;
            }
          },
          fail(err) {
            console.log("请求失败");
          }
        })
      },
      getTimeSlot() {
        let timeTamp = parseInt(this.medicalReportMessage.data.time.split(" ")[1].split(":")[0]);
        if (timeTamp < 9 || timeTamp > 21) {
          this.timeSlot = false;
        } else {
          this.timeSlot = true;
        }
      },
      goToDetail() {
        this.$router.push({
          name: "MedicalReportDetail",
        })
      }
    },
    filters: {
      ellipsis: function (value, len) {
        if (!value) return ''
        let newStr = '',
          newLength = 0;
        for (let i = 0; i < value.length; i++) {
          if (value.charCodeAt(i) > 128) {
            newLength += 2;
          } else {
            newLength++;
          }
          if (newLength <= len) {
            newStr = newStr.concat(value[i]);
          } else {
            break;
          }
        }
        if (newLength > len) {
          newStr = newStr + "..."
        }
        return newStr;
      }
    },
    computed: {
      logoUrl() {
        return this.$store.state.logoUrl
      }
    },
    props: {
      medicalReportMessage: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
  @import "../../../../scss/library/_common-modules";

  // 问诊单提示术语内容
  .medical-report-tips{
    display: inline-block;
    vertical-align: top;
    max-width: rem(510px);
    margin: 0 rem(30px);
    @include font-dpr(17px);
    word-break: break-all;
    box-sizing: border-box;
    border: 0 solid #E4E9EB;
    box-shadow: 0 1px 0 0 rgba(204, 204, 204, 0.20);
    p{
      background: #FFFFFF;
      padding: rem(34px) rem(36px);
      border-top-right-radius: rem(21px);
    }
    .tips-content{
      padding:rem(18px) rem(36px);
      background: #FAFAFB;
      color: #97A8BA;
      @include font-dpr(13px);
      // border-top: 1px solid #D8D8D8;
      border-bottom-right-radius: rem(21px);
      border-bottom-left-radius: rem(21px);
    }
  }
  //问诊单
  .medical-report-box {
    height: rem(302px);
    width: rem(694px);
    margin: 0 auto;
    background: url("../../../common/image/imScene/interrogation_of_single@2x.png") no-repeat;
    background-size: cover;
    .medical-report-title {
      height: rem(68px);
      line-height: rem(68px);
      @include font-dpr(14px);
      padding-left: rem(72px);
      color: #FFFFFF;
    }
    .medical-report-content {
      height: rem(152px);
      @include font-dpr(16px);
      padding: rem(38px) rem(0px) rem(0px) rem(40px);
      box-sizing: border-box;
      color: #555555;
      line-height: 1;
      .patient-info {
        span {
          display: inline-block;
          vertical-align: text-bottom;
        }
        line-height: 1.2;
        .patient-name {
          color: #333333;
          font-weight: bold;
          display: inline-block;
          /*max-width: rem(160px);*/
          //          @include ellipsis();
        }
        .patient-age {
          margin-left: rem(10px);
          @include font-dpr(14px);
        }
      }
      .case-describe {
        margin-top: rem(20px);
        span {
          vertical-align: middle;
        }
        .case-describe-main {
          font-weight: bold;
          display: inline-block;
          width: rem(520px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          /*vertical-align: sub;*/
          line-height: 1.2;
        }
      }
    }
    .medical-report-footer {
      height: rem(78px);
      @include font-dpr(14px);
      padding-left: rem(40px);
      color: #07B6AC;
      line-height: rem(78px);
    }
  }
</style>
