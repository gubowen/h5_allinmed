<template>
  <!--<loadMore :on-refresh="onRefresh" :on-infinite="onInfinite">-->
  <section class="orderList">
    <template v-if="items.length <= 0 && noFriend">
      <section class="noFriendText">
        <p>您还没有任何记录</p>
        <p>添加关心的人，在线咨询预约，唯医骨科为您开启全新的就医体验</p>
      </section>
      <section class="noFriendHref">
        <a @click="hrefToConsult()">去问诊&gt;</a>
      </section>
    </template>
    <div class="orderHistoryBox" data-alcode-mod='722' data-alcode-item-selector=".orderHistoryItem" v-else>
      <section class="orderHistoryItem" @click="getThisItem(item)" v-for="item in items"
               v-if="item.patientId&&item.patientId.length>0">
        <article class="orderHisItemTop">
          <figure class="doctorInfo left">
            <figcaption class="docLogo left"><img :src="getImgUrl(item)"></figcaption>
            <section class="docType right">
              <p class="docName"><span>{{item.consultationType == 0 ? "唯医门诊医生" : getFullName(item)}}</span><span
                class="medicalTitleRight">{{item.medicalTitle}}</span></p>
              <p class="inquiryType">{{getInquiryType(item)}}  {{getCaseTime(item.createTime)}}</p>
            </section>
          </figure>
          <div class="doctorState right" :class="getStatusName(item).fontGray">{{getStatusName(item).statusName}}</div>
        </article>
        <div class="orderHistoryItemCenter">
          <p>
            患者<span>{{item.patientName && item.patientName.length > 5 ? item.patientName.substring(0, 5) + "..." : item.patientName}}</span>
          </p>
          <p>主诉<span class="patientComplaint">{{item.mainContent.caseMain}}</span></p>
        </div>
        <div class="orderHistoryItemBottom"
             v-if="(item.consultationType==0&&item.consultationState==0&&item.state==3) || (item.consultationType==0&&(item.consultationState==0||item.consultationState==1)&&item.isRecommend==1)">
          <button data-alcode='e136' class="hrefBtn" v-if="item.consultationState==0&&item.state==3"
                  @click.stop="goToUploadPic(item)">补全检查资料
          </button>
          <button data-alcode='e137' class="hrefBtn"
                  v-if="(item.consultationState==0||item.consultationState==1)&&item.isRecommend==1"
                  @click.stop="hrefToSuggest(item)">查看推荐专家
          </button>
        </div>
      </section>
      <infinite-loading @infinite="onInfinite">
        <!--<span slot="{{no-more}}">{{没有更多了}}</span>-->
      </infinite-loading>
    </div>
    <loading v-show="finish"></loading>
  </section>
  <!--</loadMore>-->
</template>
<script type="text/ecmascript-6">

  import fb from "../../../common/js/third-party/flexible";
  import loading from "../../../components/loading";
  import toast from "../../../components/toast";
  import api from '../../../common/js/util/util';
  import loadMore from '../../../components/loadMore';
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';
  import InfiniteLoading from 'vue-infinite-loading';
  import "babel-polyfill";

  const XHRList = {
    getOrderHistoryLists: '/mcall/customer/case/consultation/v1/getMapList/', //咨询历史接口
    getPicList: '/mcall/patient/recovery/advice/v1/getMapList/'//图片列表
  }
  export default{
    data() {
      return {
        finish: false,
        noFriend: false,
        pageNum: 20,
        pageStart:0,
        items: []
      }
    },
    mounted(){
//      api.mobileCheck();
      if (!api.checkOpenId()) {
        api.wxGetOpenId(1);    //获取openId
      }
      api.forbidShare();
    },
    methods: {
      onInfinite($state){
        const that = this;
        api.ajax({
          url: XHRList.getOrderHistoryLists,
          method: "post",
          data: {
            patientCustomerId: api.getPara().customerId,
            isValid: 1,
            firstResult: that.pageStart,
            maxResult: that.pageNum,
            logoUseFlag: 3
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
          beforeSend(){
            that.finish = true;
          },
          done(response){
            if (response && response.responseObject.responseData.dataList && response.responseObject.responseData.dataList.length > 0) {
              that.pageStart += that.pageNum;
              let temp = response.responseObject.responseData.dataList;
              that.items = that.items.concat(temp);
              $state.loaded();
            }else{
              if(that.pageStart>0){
                $state.complete()
              }else{
                that.noFriend = true;
              }
            }
            that.finish = false;
          }
        })
      },
      getImgUrl(opt){
        let logoImg = '';
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
      getFullName(opt){
        if (opt.fullName.length > 6) {
          return opt.fullName.substring(0, 6) + "..."
        } else {
          return opt.fullName;
        }
      },
      getStatusName(opt){
        let statusName = '', fontGray = '';
        if (opt.consultationType == 0) {
          //分诊医生
          switch (Number(opt.consultationState)) {
            case 0:
            case 2:
            case 4:
            case 5:
              statusName = '问诊中';
              break;
            case 1:
              statusName = '已结束';
              fontGray = 'font-gray';
              break;
          }
        } else {
          //医生
          switch (Number(opt.consultationState)) {
            case -1:
              statusName = '待接诊';
              break;
            case 0:
              statusName = '问诊中';
              break;
            case 1:
              statusName = '已结束';
              fontGray = 'font-gray';
              break;
            case 2:
              statusName = '已拒绝';
              fontGray = 'font-gray';
              break;
            case 3:
              statusName = '已超时';
              fontGray = 'font-gray';
              break;
          }
        }
        return {
          statusName: statusName,
          fontGray: fontGray
        }
      },
      getInquiryType(opt){
        //判断问诊类型
        let consultationLevel = '';
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
          ;
        }
        return consultationLevel;
      },
      getCaseTime(times){
        let time = times.substring(0, 19).replace(/-/g, "/");
        let format = function (num) {
          return num > 9 ? num : "0" + num;
        };
        let normalTime = function (time) {
          let d = new Date(time);
          let obj = {
            y: d.getFullYear(),
            m: format(d.getMonth() + 1),
            dd: format(d.getDate()),
            h: format(d.getHours()),
            mm: format(d.getMinutes())
          };
          return obj;
        };
        let result = "";
        let now = new Date().getTime(),
          day1 = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd,
          day2 = normalTime(now).y + "-" + normalTime(now).m + "-" + normalTime(now).dd;
        if (day1 === day2) {
          result = normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y === normalTime(now).y) {
          result = normalTime(time).m + "-" + normalTime(time).dd + "  " + normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y !== normalTime(now).y) {
          result = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd + "  " + normalTime(time).h + ":" + normalTime(time).mm;
        }
        return result;
      },
      hrefToConsult(){
        window.location.href = '/dist/consult.html?customerId=' + api.getPara().customerId;
      },
      hrefToSuggest(opt){
        window.location.href = '/dist/imScene.html?caseId=' + opt.caseId + '&shuntCustomerId=' + opt.customerId + '&patientCustomerId=' + api.getPara().customerId + '&patientId=' + opt.patientId + '&from=health&suggest=1'
      },
      getThisItem(opt){
        //缓存orderSourceId
        sessionStorage.setItem("orderSourceId", opt.consultationId);
        //缓存医生信息
        if (opt.consultationType == 1) {
          let docLogo = (opt.logoUrl || "/image/img00/doctorMain/doc_logo.png");
          localStorage.setItem("doctorName", opt.fullName);
          localStorage.setItem("doctorLogo", docLogo);
          if (opt.caseType == 10 || opt.caseType == 11) {
            window.location.href = '/dist/imSceneDoctor.html?caseId=' + opt.caseId + '&doctorCustomerId=' + opt.customerId + '&patientCustomerId=' + api.getPara().customerId + '&patientId=' + opt.patientId + '&from=report';
          } else {
            window.location.href = '/dist/imSceneDoctor.html?caseId=' + opt.caseId + '&doctorCustomerId=' + opt.customerId + '&patientCustomerId=' + api.getPara().customerId + '&patientId=' + opt.patientId;
          }
        } else {
          window.location.href = '/dist/imScene.html?caseId=' + opt.caseId +'&patientCustomerId=' + api.getPara().customerId + '&patientId=' + opt.patientId
        }
      },
      goToUploadPic(opt){
        let that = this;
        api.ajax({
          url: XHRList.getPicList,
          method: "post",
          data: {
            caseId: opt.caseId,
            patientId: opt.patientId,
            isValid: 1,
            firstResult: 0,
            maxResult: 999
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
          done(response){
            console.log(response.responseObject.responseData.dataList)
            if (response && response.responseObject.responseData.dataList.length > 0) {
              let items = response.responseObject.responseData.dataList[0];
              let hisPicLists = [];
              if (items.checkMap.length > 0) {
                items.checkMap.forEach((element) => {
                  hisPicLists.push({
                    "adviceType": 3,
                    "adviceId": element.checkId,
                    "adviceName": element.checkName
                  })
                })
              }
              ;
              if (items.inspectionMap.length > 0) {
                items.inspectionMap.forEach((elemen) => {
                  hisPicLists.push({
                    "adviceType": 3,
                    "adviceId": elemen.inspectionId,
                    "adviceName": elemen.inspectionName
                  })
                })
              };
              localStorage.setItem("picList",JSON.stringify(hisPicLists));
              that.$router.push({
                name: "uploadPic",
                params: {
                  hisPicLists: hisPicLists,
                  caseId: opt.caseId,
                  consultationId: opt.consultationId,
                  from: that.$route.name,
                },
                query: that.$route.query
              });
            }
          },
          fail(error){
//            document.querySelector(".ev-loading").style.display="none";
            console.log("数据错误");
            console.log(error);
          }
        })
      }
    },
    components: {
      loading,
      toast,
      loadMore,
      InfiniteLoading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  //字号定义
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  //没有历史
  .noFriendText {
    padding: rem(450px) rem(86px) 0;
    &:before {
      content: '';
      display: block;
      width: rem(320px);
      height: rem(320px);
      background: url("../../../common/image/img00/myServices/inquiry_bg.png") no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      top: rem(90px);
      left: 50%;
      margin-left: rem(-160px);
    }
    p {
      &:nth-child(1) {
        @include font-dpr(18px);
        color: #222;
        text-align: center;
        font-weight: 600;
      }
      &:nth-child(2) {
        margin-top: rem(30px);
        @include font-dpr(16px);
        color: #AAA;
        line-height: rem(40px);
      }
    }
  }

  .noFriendHref {
    a {
      text-align: center;
      margin-top: rem(60px);
      color: #07B6AC;
      display: block;
      @include font-dpr(18px);
    }
  }

  //咨询历史
  .orderList {
    box-sizing: border-box;
    min-height: 100%;
    .orderHistoryBox{
      background:#eeeeee;
      border-top: 1px solid transparent;
      padding-bottom:rem(110px);
    }
    .orderHistoryItem {
      margin: rem(20px) rem(20px) 0;
      background: #ffffff;
      border-radius: rem(16px);
      .orderHisItemTop {
        padding: rem(32px) rem(60px) rem(20px) rem(32px);
        @include clearfix();
        .doctorInfo {
          @include clearfix();
          .docLogo > img {
            display: block;
            width: rem(64px);
            height: rem(64px);
            border-radius: 50%;
          }
          .docType {
            padding-left: rem(20px);
            .docName {
              color: #666666;
              @include font-dpr(14px);
              .medicalTitleRight {
                margin-left: rem(16px);
                color: #909090;
              }
            }
            .inquiryType {
              color: #909090;
              @include font-dpr(12px);
            }
          }
        }
        .doctorState {
          line-height: rem(60px);
          @include font-dpr(14px);
          color: #FF8E32;
          &.font-gray {
            color: #ccc;
          }
        }
      }
      .orderHistoryItemCenter {
        &:before {
          display: block;
          content: "";
          height: 1px;
          background: #EDEDED;
          margin-bottom: rem(32px);
          margin-right: rem(40px);
        }
        position: relative;
        padding: 0 rem(20px) rem(32px) rem(32px);
        @include font-dpr(16px);
        &:after {
          position: absolute;
          top: 50%;
          right: 10px;
          margin-top: -(rem(18px));
          width: rem(36px);
          height: rem(36px);
          content: "";
          background: url("../../../../image/img00/myServices/arrow@2x.png") no-repeat;
          background-size: 100% 100%;
        }
        p {
          color: #909090;
          &:nth-child(2) {
            padding-top: rem(20px);
          }
          span {
            color: #222222;
            font-weight: bold;
            margin-left: rem(20px);
          }
        }
        .patientComplaint {
          display: inline-block;
          width: rem(480px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: bottom;
        }
      }
      .orderHistoryItemBottom {
        margin: 0 rem(60px) 0 rem(32px);
        border-top: 1px solid #EDEDED;
        display: flex;
        display: -webkit-flex;
        -webkit-justify-content: space-around;
        .hrefBtn {
          margin: rem(20px) 0;
          padding: rem(10px) rem(28px);
          background: #fff;
          color: #2FC5BD;
          @include font-dpr(14px);
          border: 1px solid #2FC5BD;
          border-radius: rem(50px);
        }
      }
    }
  }

</style>
