<template>
  <div class="clinicOrder">
    <header class="docMessageBox">
      <figure class="docMessage">
        <figcaption class="docLogoBox">
          <img :src="doctorLogo" class="docLogo">
        </figcaption>
        <div class="docNameBox">
          <span class="docName">{{docName}}</span>
          <span class="docTitle" v-show="docTitle[0]&&docTitle[0].length>0">{{docTitle[0]}}</span>
          <span class="docTitle" v-show="docTitle[1]&&docTitle[1].length>0">{{docTitle[1]}}</span>
          <span class="docTitle" v-show="docTitle[2]&&docTitle[2].length>0">{{docTitle[2]}}</span>
        </div>
      </figure>
      <a href="javascript:history.go(-1)" class="jumpToTnfo">医生主页</a>
    </header>
    <section class="clinicDetailsBox">
      <h2 class="hospitalName">{{items.hospitalList[0].hospital}}</h2>
      <section class="illnessClaimBox">
        <h3 class="moduleTitle">门诊主治</h3>
        <article class="illnessClaimDetails" :class="{spill:isMore}">{{illnessList}}</article>
        <img src="../../../common/image/img00/doctorHome/unfolded.png" class="btnFoldFewer" v-show="isShowMore" @click="btnToMoreLess()" :class="{on:isMore}">
      </section>
      <section class="clinicTimeBox">
        <h3 class="moduleTitle">出诊时间<span>(最近三周出诊安排)</span></h3>
        <article class="stopClinicDetails" v-show="stopTimeShow">{{stopTimeText}}</article>
        <div class="clinicTime">
          <header class="clinicTimeType">
            <span>门诊日期</span>
            <span>上午</span>
            <span>下午</span>
            <span>晚上</span>
          </header>
          <section class="clinicTimeDetails">
             <template v-if="items.hospitalList[0].clinicTime.length>0">
               <ul v-for="item in items.hospitalList[0].clinicTime">
                 <li>{{getClinicTime(item).time}}</li>
                 <li>{{getClinicTime(item).amClinicType}}</li>
                 <li>{{getClinicTime(item).pmClinicType}}</li>
                 <li>{{getClinicTime(item).nmClinicType}}</li>
               </ul>
             </template>
            <template v-else>
              <span class="noClinicTime">近三周无出诊安排</span>
            </template>
          </section>
        </div>
      </section>
      <section class="remarkBox">
        <h3 class="moduleTitle">备注</h3>
        <article class="remarkDetails">{{items.hospitalList[0].remark}}</article>
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
        items:{
          hospitalList:[
            {
              hospital:"",
              clinicTime:[],
              remark:""
            }
          ]
        },
        illnessList:"",
        doctorId:"",//医生Id
        hospitalId:"",//医院Id
        docName:"",
        docTitle:[],
        doctorLogo:'',
      }
    },
    mounted(){
        this.getClinicDetails();
        this.getCloseTime();
        document.title="门诊信息";
    },
    methods:{
      getClinicDetails(){
        const that = this;
        this.doctorId = this.$route.params.doctorId;
        this.hospitalId = this.$route.params.hospitalId;
        this.docName = this.$route.params.docName;
        this.docTitle = this.$route.params.docTitle;
        this.doctorLogo = this.$route.params.docLogo;
        api.ajax({
          url: XHRList.getClinicDetails,
          method: "post",
          data: {
            customerId:that.doctorId,
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
            that.finish =false;
            if(response && response.responseObject.responseData.dataList){
              that.items = response.responseObject.responseData.dataList[0];
              that.items.illnessList.forEach((element)=>{
                that.illnessList += element.illnessName + "、"
              })
              if(that.items.clinicRemark.length>0){
                that.illnessList += that.items.clinicRemark;
              }else{
                that.illnessList = that.illnessList.substring(0,that.illnessList.length-1);
              }
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
            customerId:that.doctorId,
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
        let week = "",amClinicType="",pmClinicType="",nmClinicType="",dateTime = opt.dateTime.split("-");
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
        for(let i=0;i<3;i++){
          if(opt.data && opt.data[i] && opt.data[i].timeType == 1){
            switch(Number(opt.data[i].clinicType)){
              case 1:
                amClinicType = "普通";
                break;
              case 2:
                amClinicType = "专家";
                break;
              case 3:
                amClinicType = "特需";
                break;
            }
          }else if(opt.data && opt.data[i] && opt.data[i].timeType == 2){
            switch(Number(opt.data[i].clinicType)){
              case 1:
                pmClinicType = "普通";
                break;
              case 2:
                pmClinicType = "专家";
                break;
              case 3:
                pmClinicType = "特需";
                break;
            }
          }else if(opt.data && opt.data[i] && opt.data[i].timeType == 3){
            switch(Number(opt.data[i].clinicType)){
              case 1:
                nmClinicType = "普通";
                break;
              case 2:
                nmClinicType = "专家";
                break;
              case 3:
                nmClinicType = "特需";
                break;
            }
          };
        }
        console.log({
          time:`${dateTime[1]}月${dateTime[2]}日 ${week}`,
          amClinicType:amClinicType,
          pmClinicType:pmClinicType,
          nmClinicType:nmClinicType
        })
        return {
            time:`${dateTime[1]}月${dateTime[2]}日 ${week}`,
            amClinicType:amClinicType,
            pmClinicType:pmClinicType,
            nmClinicType:nmClinicType
        }
      },
      btnToMoreLess(){
        const that = this;
        that.isMore = !(that.isMore);
      },
      goToDocMain(){
        this.$router.push({
          name:'doctorMain'
        })
      }
    },
    components:{
      loading
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules";
  .clinicOrder{
    min-height: 100%;
    height:auto;
    padding-bottom:rem(100px);
    box-sizing: border-box;
    background:url("../../../common/image/background_wave.png") no-repeat bottom center #F2F2F2;
    background-size:100% rem(272px);
    border-top:1px solid transparent;
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
        border:rem(2px) solid #BCCBD8;
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
        width:rem(12px);
        height:rem(18px);
        margin-left:rem(8px);
        background:url("../../../common/image/img00/doctorHome/arrow.png") no-repeat;
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
        transition: all 0.1s;
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
          width:rem(25px);
          height:rem(25px);
          background:url("../../../common/image/img00/doctorHome/inform.png") no-repeat;
          background-size:100% 100%;
          margin-right:rem(10px);
          vertical-align: middle;
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
              height:rem(100px);
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
        .noClinicTime{
          width:100%;
          display: inline-block;
          @include font-dpr(14px);
          color: #909090;
          border-left:1px solid rgba(198,207,217,0.3);
          border-right:1px solid rgba(198,207,217,0.3);
          text-align: center;
          line-height:rem(200px);
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
        line-height:rem(45px);
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
    height:rem(12px);
    margin:rem(24px) auto 0;
    transition: all 0.1s;
    &.on{
      transform:rotate(180deg);
    }
  }
</style>
