<template>
  <div class="clinicOrder">
    <header class="docMessageBox">
      <figure class="docMessage">
        <figcaption class="docLogoBox">
          <img src="../../../common/image/img00/doctorHome/doctorPic.png" class="docLogo">
        </figcaption>
        <div class="docNameBox">
          <span class="docName">王玉轩</span>
          <span class="docTitle">副主任医师</span>
        </div>
      </figure>
      <a href="javascript:;" class="jumpToTnfo">医生主页</a>
    </header>
    <section class="clinicDetailsBox">
      <h2 class="hospitalName">{{items.hospitalList[0].hospital}}</h2>
      <section class="illnessClaimBox">
        <h3 class="moduleTitle">门诊主治</h3>
        <article class="illnessClaimDetails" :class="{spill:isMore}">{{illnessList}}</article>
        <img src="../../../common/image/background_wave.png" class="btnFoldFewer" v-show="isShowMore" @click="btnToMoreLess()" :class="{on:isMore}">
      </section>
      <section class="clinicTimeBox">
        <h3 class="moduleTitle">出诊时间<span>(最近三周出诊安排)</span></h3>
        <article class="stopClinicDetails" v-if="stopTimeShow">{{stopTimeText}}</article>
        <div class="clinicTime">
          <header class="clinicTimeType">
            <span>门诊日期</span>
            <span>上午</span>
            <span>下午</span>
            <span>晚上</span>
          </header>
          <section class="clinicTimeDetails">
            <ul v-for="item in items.hospitalList[0].clinicTime">
              <li>{{getClinicTime(item).time}}</li>
              <li>专家</li>
              <li>普通</li>
              <li>特需</li>
            </ul>
          </section>
        </div>
      </section>
      <section class="remarkBox">
        <h3 class="moduleTitle">备注</h3>
        <article class="remarkDetails">请先到一楼挂号，再到二楼骨科二诊室找我请先到一楼挂号，再到二楼骨科二诊室找我</article>
      </section>
    </section>
    <loading v-show="finish"></loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import fb from "../../../common/js/third-party/flexible";
  import loading from "../../../components/loading";
  import api from '../../../common/js/util/util';
  const XHRList = {
    getCloseTime: "/mcall/customer/clinic/close/v1/getMapList/",//停诊时间
    getClinicDetails:"/mcall/customer/clinic/setting/v1/getMapById/"//门诊详情
  }
  export default{
    data(){
      return {
        finish:false,
        isMore:false,
        isShowMore:false,
        stopTimeText:"",
        stopTimeShow:false,
        items:[],
        illnessList:"",
        docterId:"1493879076659",//医生Id
        hospitalId:"24362"//医院Id
      }
    },
    mounted(){
        this.getClinicDetails();
        this.getCloseTime();
    },
    methods:{
      getClinicDetails(){
        const that = this;
        api.ajax({
          url: XHRList.getClinicDetails,
          method: "post",
          data: {
            customerId:that.docterId,
            hospitalId:that.hospitalId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
          beforeSend(){
            that.finish = true;
          },
          done(response){
            if(response && response.responseObject.responseData.dataList){
              that.finish =false;
              that.items = response.responseObject.responseData.dataList[0];
              that.items.illnessList.forEach((element)=>{
                that.illnessList += element.illnessName
              })
              that.illnessList += that.items.clinicRemark
              if(that.illnessList.length>35){
                  that.isMore = true;
                  that.isShowMore = true;
              }
            }
          }
        })
      },
      getCloseTime(){
        const that = this;
        api.ajax({
          url: XHRList.getCloseTime,
          method: "post",
          data: {
            customerId:that.docterId,
            firstResult:0,
            maxResult:1,
            isAll:0
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
          done(response){
            if(response && response.responseObject.responseData.dataList){
              that.stopTimeShow = true;
              let item = response.responseObject.responseData.dataList[0];
              that.stopTimeText = `提示：${api.timeFormate({time:item.startTime,type:1}).year}-${api.timeFormate({time:item.endTime,type:1}).year}，停诊`
            }
          }
        })
      },
      getClinicTime(opt){
        let week = "",dateTime = opt.dateTime.split("-");
        switch(Number(opt.dateType)){
          case 1:
            week = "周一";
            break;
          case 2:
            week = "周二";
            break;
          case 3:
            week = "周三";
            break;
          case 4:
            week = "周四";
            break;
          case 5:
            week = "周五";
            break;
          case 6:
            week = "周六";
            break;
          case 7:
            week = "周日";
            break;
        }
        return {
            time:`${dateTime[1]}月${dateTime[2]}日 ${week}`
        }
      },
      btnToMoreLess(){
        const that = this;
        that.isMore = !(that.isMore);
      },
    },
    components:{
      loading
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .clinicOrder{
    overflow: hidden;
    min-height: 100%;
    padding-bottom:rem(100px);
    box-sizing: border-box;
    background:url("../../../common/image/background_wave.png") no-repeat bottom center #F2F2F2;
    background-size:100% rem(272px);
  }
  .docMessageBox{
    position:relative;
    @include clearfix();
    margin:rem(20px) rem(30px) 0;
    border-radius: rem(16px);
    background:url("../../../common/image/img00/doctorHome/bg.png") no-repeat;
    background-size:100% 100%;
    padding:rem(36px) rem(24px);
    .docMessage{
      float:left;
      @include clearfix();
      .docLogoBox{
        display:inline-block;
        vertical-align: middle;
        width:rem(108px);
        height:rem(108px);
        border-radius: 50%;
        border:2px solid #BCCBD8;
        img{
          display:block;
          width:rem(100px);
          height:rem(100px);
          position: relative;
          top: 50%;
          border-radius: 50%;
          margin:-(rem(50px)) auto 0;
        }
      }
      .docNameBox{
        display:inline-block;
        margin-left:rem(20px);
        vertical-align: middle;
        span{
          display:block;
          &.docName{
            color:#fff;
            @include font-dpr(18px);
            font-weight: bold;
          }
          &.docTitle{
            opacity: 0.5;
            color:#fff;
            @include font-dpr(16px);
          }
        }
      }
    }
    .jumpToTnfo{
      position:absolute;
      right:rem(30px);
      bottom:rem(50px);
      @include font-dpr(13px);
      color:#fff;
      &:after{
        display:inline-block;
        content: "";
        vertical-align: middle;
        width:rem(10px);
        height:rem(12px);
        background:url("../../../common/image/background_wave.png") no-repeat;
        background-size:100% 100%;
      }
    }
  }
  .clinicDetailsBox{
    margin:rem(20px) rem(30px) 0;
    background:#fff;
    border-radius: rem(16px);
    .hospitalName{
      padding:rem(32px) rem(30px);
      border-bottom:2px solid #F8F8F8;
      color: #416081;
      @include font-dpr(18px);
    }
    .illnessClaimBox{
      &:after{
        display: block;
        content: "";
        padding-top:rem(40px);
        margin:0 rem(30px);
        border-bottom:2px solid #F8F8F8;
      }
      .illnessClaimDetails{
        &.spill{
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        padding:rem(30px) rem(30px) 0;
        color: #444444;
        font-size:rem(32px);
        line-height:rem(45px);
      }
    }
    .clinicTimeBox{
      &:after{
        display: block;
        content: "";
        padding-top:rem(40px);
        margin:0 rem(30px);
        border-bottom:2px solid #F8F8F8;
      }
      .stopClinicDetails{
        margin: rem(36px) rem(30px) 0;
        padding:rem(10px);
        background: rgba(250,120,122,0.1);
        border-radius: rem(100px);
        color: #555555;
        @include font-dpr(12px);
        &:before{
          display:inline-block;
          content: "";
          width:rem(28px);
          height:rem(28px);
          background:url("../../../common/image/img00/doctorMain/pay_warning@2x.png") no-repeat;
          background-size:100% 100%;
          padding-right:rem(10px);
          vertical-align: sub;
        }
      }
      .clinicTime{
        box-sizing:border-box;
        padding:rem(34px) rem(30px) 0;
        border-radius:5px;
        .clinicTimeType{
          width:100%;
          line-height:rem(80px);
          color: #777777;
          @include font-dpr(14px);
          @include clearfix();
          background: rgba(107,129,157,0.12);
          border:1px solid rgba(198,207,217,0.3);
          span{
            width:21%;
            float:left;
            box-sizing:border-box;
            border-right:1px solid rgba(198,207,217,0.3);
            text-align:center;
            &:nth-child(1){
              width:35%;
            }
            &:last-child{
              border-right:0;
            }
          }
        }
        .clinicTimeDetails{
          width:100%;
          box-sizing:border-box;
          color: #416081;
          @include font-dpr(15px);
          ul{
            @include clearfix();
            width:100%;
            box-sizing:border-box;
            line-height:rem(100px);
            border:1px solid rgba(198,207,217,0.3);
            border-top:0;
            li{
              width:21%;
              float:left;
              box-sizing:border-box;
              border-right:1px solid rgba(198,207,217,0.3);
              text-align:center;
              &:nth-child(1){
                width:35%;
                color: #333333;
                @include font-dpr(14px);
              }
              &:last-child{
                border-right:0;
              }
            }
          }
        }
      }
    }
    .remarkBox{
      &:after{
        display: block;
        content: "";
        padding-top:rem(40px);
        margin:0 rem(30px);
      }
      .remarkDetails{
        padding:rem(30px) ;
        @include font-dpr(16px);
        line-height:rem(40px);
        color: #444444;
      }
    }
  }
  .moduleTitle{
    padding-top:rem(50px);
    margin-left:rem(20px);
    color: #222222;
    @include font-dpr(18px);
    span{
      font-weight:normal;
      margin-left:rem(12px);
      color: #BBBBBB;
      @include font-dpr(14px)
    }
    &:before{
      display:inline-block;
      content: "";
      width:rem(4px);
      height:rem(20px);
      background:#2FC5BD;
      vertical-align: middle;
      margin-right:rem(8px);
    }
  }
  .btnFoldFewer{
    display:block;
    width:rem(20px);
    height:rem(10px);
    margin:rem(24px) auto 0;
    transition: all 0.1s;
    &.on{
      transform:rotate(180deg);
    }
  }
</style>
