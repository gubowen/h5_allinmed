 <template>
  <section>
    <!--<section class="main-message-box" :data-caseid="message.caseId">-->
      <!--<article class="main-message-box-item others-message">-->
        <!--<figure class="main-message-img">-->
          <!--<img src="//m.allinmed.cn/image/imScene/chatting_portrait_system@2x.png" alt="">-->
        <!--</figure>-->
        <!--<figcaption class="check-suggestion message-result preview-suggestion" @click="goToHref">-->
          <!--<article class="message-result-item">-->
            <!--<header class="message-result-item-title">初诊建议</header>-->
            <!--<section class="message-result-item-message" style="padding-bottom: 0;">-->
              <!--<figure class="message-result-item-img">-->
                <!--<img src="../../../../image/img00/patientConsult/dialogue_report@2x.png" alt=""></figure>-->
              <!--<figcaption><h2>{{message.patientName}}&nbsp;&nbsp;&nbsp;{{message.createTime}}</h2>-->
                <!--<p><span class="illness">初诊:{{message.illnessName}}</span></p>-->
              <!--</figcaption>-->
            <!--</section>-->
          <!--</article>-->
        <!--</figcaption>-->
      <!--</article>-->
    <!--</section>-->

    <!--检查检验-->
    <section class="main-message-box" v-if="checkSuggestObj.allData.length">
      <article class="check-suggest-box">
        <header class="check-suggest-title">建议您进行以下检查，并上传检查资料，分诊将继续为您解答，并推荐对症专家</header>
        <section class="check-suggest-bg"></section>
        <section class="check-suggest-content">
          <ul class="check-suggest-list">
            <li class="check-suggest-item"
                :data-adviceid="item.adviceId"
                :data-advicetype="item.adviceType"
                v-for="item in checkSuggestObj.tempData"
            >
              <span>{{item.adviceName}}</span>
            </li>
          </ul>
          <section class="more-box" v-if="checkSuggestObj.moreBoxShow">
            <span class="more-box-btn more-btn" v-show="checkSuggestObj.moreData" @click.stop="moreDataShow('checkSuggestObj',$event)">查看更多</span>
            <span class="more-box-btn less-btn" v-show="!checkSuggestObj.moreData" @click.stop="lessDataShow('checkSuggestObj')">收起</span>
          </section>
          <section class="check-suggest-btn" data-role="videoTriage"
                   @click="goToUpload">
            上传检查资料
          </section>
        </section>
      </article>
    </section>

    <!--处置建议-->
    <section class="main-message-box" v-if="treatmentObj.allData.length">
      <article class="check-suggest-box">
        <header class="check-suggest-title">根据您的情况，为您推荐以下康复方式，请务必在医生的指导下进行</header>
        <section class="check-suggest-bg"></section>
        <section class="check-suggest-content">
          <ul class="check-suggest-list">
            <li class="check-suggest-item"
                v-for="item in treatmentObj.tempData"
            >
              <span>{{item.treatmentName}}</span>
            </li>
          </ul>
          <section class="more-box" v-if="treatmentObj.moreBoxShow">
            <span class="more-box-btn more-btn" v-show="treatmentObj.moreData" @click.stop="moreDataShow('treatmentObj',$event)">查看更多</span>
            <span class="more-box-btn less-btn" v-show="!treatmentObj.moreData" @click.stop="lessDataShow('treatmentObj')">收起</span>
          </section>
        </section>
      </article>
    </section>

    <!--患教知识-->
    <section class="main-message-box" v-if="knowledgeObj.allData.length">
      <article class="knowledge-box">
        <header class="knowledge-title">以下骨科知识有助于您早日康复，点击查看详情</header>
        <section class="knowledge-bg"></section>
        <section class="knowledge-content">
          <ul class="knowledge-list">
            <li class="knowledge-item"
                v-for="(item , index) in knowledgeObj.tempData"
                @click="goKnowledgeDetail(index)"
            >
              <span class="knowledge-name">{{item.knowledgeName}}</span>
              <span class="knowledge-detail">详情</span>
            </li>
          </ul>
          <section class="more-box" v-if="knowledgeObj.moreBoxShow">
            <span class="more-box-btn more-btn" v-show="knowledgeObj.moreData" @click.stop="moreDataShow('knowledgeObj',$event)">查看更多</span>
            <span class="more-box-btn less-btn" v-show="!knowledgeObj.moreData" @click.stop="lessDataShow('knowledgeObj')">收起</span>
          </section>
        </section>
      </article>
    </section>

    <!--推荐医生-->
    <section class="main-message-box" v-if="doctorObj.allData.length">
      <article class="doctor-box">
        <header class="doctor-header">
          <h3 class="doctor-title">匹配医生</h3>
          <p class="doctor-introduce"><span>直达三甲名医</span><span>超时未回复全额退款</span></p>
          <!--<p class="doctor-tips">根据您的情况，推荐以下对症专家，请点击查看详情</p>-->
        </header>
        <section class="doctor-content">
          <ul class="doctor-list">
            <li class="doctor-item"
                v-for="(item , index) in doctorObj.tempData"
            >
              <section class="doctor-item-top" @click="goDoctorHome(index)">
                <figure class="doctor-item-img">
                  <img :src="item.logoUrl" alt="">
                </figure>
                <figcaption class="doctor-item-info">
                  <p class="doctor-base-info">
                    <span class="doctor-name">{{item.fullName}}</span>
                    <span class="doctor-post">{{item.medicalTitle}}</span>
                    <!--<span class="doctor-free">首次免费问诊</span>-->
                  </p>
                  <p class="doctor-hospital">{{item.hospitalName}}</p>
                  <p class="doctor-good">擅长：&nbsp{{item.illnessNameList}}</p>
                </figcaption>
              </section>
              <section class="doctor-item-bottom" v-if="item.isFreeTimes">
                <span class="go-consult" @click="goConsult(index,'free')" v-if="item.adviceStatus==='1' && item.adviceNum && !item.isRefuse">免费问诊</span>
                <span class="free-consult">免费问诊</span>
                <span class="free-price">{{item.generalPrice}}元</span>
                <!--<span class="general-money">{{item.generalPrice}}元</span>-->
              </section>
              <section class="doctor-item-bottom" v-else-if="!item.isFreeTimes">
                <span class="go-consult" @click="goConsult(index,'pay')" v-if="item.adviceStatus==='1' && item.adviceNum && !item.isRefuse">去问诊</span>
                <span class="general-money">{{item.generalPrice}}元</span>
              </section>
            </li>
          </ul>
          <section class="more-box doctor-more-box" v-if="doctorObj.moreBoxShow">
            <span class="more-box-btn more-btn" v-if="doctorObj.moreData" @click="moreDataShow('doctorObj',$event)">查看更多</span>
            <span class="more-box-btn less-btn" v-if="!doctorObj.moreData" @click="lessDataShow('doctorObj')">收起</span>
          </section>
        </section>
      </article>
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
   * Created by lichenyang on 2017/8/18.
   */
  import api from "common/js/util/util";
  import store from "../store/store";

  const XHRList = {
    getCheckSuggestion: "/mcall/patient/case/diagnosis/v1/getMapList/",//预览初诊建议
    getRecommedDoctor: "/mcall/patient/recommend/v1/getMapList/",//推荐医生
    getToken: "/mcall/im/interact/v1/refreshToken/",
    getCurrentByCustomerId:'/mcall/customer/advice/setting/v1/getCurrentByCustomerId/',//获取是否与专业医生建立过im
  };

  export default{
    data(){
      return {
        message:{},
        suggestResponse:false,//检查检验预览响应是否完成
        doctorResponse:false,//推荐医生预览是否完成
        //检查检验里的数据
        checkSuggestObj:{
          allData: [],//全部数据
          moreBoxShow:false,//展开更多盒子是否显示
          moreData:false,//显示展开更多还是显示收起按钮
          tempData:[],//展示的数组
          lessData:[],//五条建议的数据
          initNum:5,//初始展示的数据条数
          pageNum:5,//分页数据条数
          position:0,//记录卡片的位置
          hasPosition:false,//卡片的位置是否已经记录
        },
        //处置建议里的数据
        treatmentObj:{
          allData: [],//全部数据
          moreBoxShow:false,//展开更多盒子是否显示
          moreData:false,//显示展开更多还是显示收起按钮
          tempData:[],//展示的数组
          lessData:[],//五条建议的数据
          initNum:5,//初始展示的数据条数
          pageNum:5,//分页数据条数
          position:0,//记录卡片的位置
          hasPosition:false,//卡片的位置是否已经记录
        },
        //患教知识里的数据
        knowledgeObj:{
          allData: [],//全部数据
          moreBoxShow:false,//展开更多盒子是否显示
          moreData:false,//显示展开更多还是显示收起按钮
          tempData:[],//展示的数组
          lessData:[],//五条建议的数据
          initNum:5,//初始展示的数据条数
          pageNum:5,//分页数据条数
          position:0,//记录卡片的位置
          hasPosition:false,//卡片的位置是否已经记录
        },
        //推荐医生的的数据
        doctorObj:{
          allData: [],//全部数据
          moreBoxShow:false,//展开更多盒子是否显示
          moreData:false,//显示展开更多还是显示收起按钮
          tempData:[],//展示的数组
          lessData:[],//五条建议的数据
          initNum:3,//初始展示的数据条数
          pageNum:5,//分页数据条数
          position:0,//记录卡片的位置
          hasPosition:false,//卡片的位置是否已经记录
        },

      }

      },
    mounted(){
      this.message=this.previewSuggestionMessage.data[0];
      this.initData();
      },
    methods:{

      goToHref(){
        window.location.href = "/pages/myServices/check_suggestion.html?caseId=" + this.message.caseId +
          "&diagnosisId=" + this.message.diagnosisId +
          "&patientCustomerId=" + api.getPara().patientCustomerId +
          "&patientId=" + api.getPara().patientId +
          '&caseType=0'  +
          '&shuntCustomerId=' + api.getPara().shuntCustomerId;

      },
      goKnowledgeDetail (index) {
        this.$router.push({
          name: "knowledgeDetail",
          params: this.knowledgeObj.allData[index],
        })
      },
      initData(){
        const that = this;
        that.uploadVideo = true;
        api.ajax({
          url: XHRList.getCheckSuggestion,
          method: "POST",
          data: {
            caseId: that.message.caseId,
            diagnosisId: that.message.diagnosisId,
            diagnosisType: 1,
            isValid: 1,
            firstResult: 0,
            maxResult: 1,
            sortType: 1
          },
          beforeSend(){

          },
          done(data){
            if (data.responseObject.responseData.dataList) {
              let items = data.responseObject.responseData.dataList[0];
              //检查检验DOM添加
              if ((items.checkList && items.checkList.length > 0) || (items.inspectionList && items.inspectionList.length > 0)) {
                if (items.checkList.length > 0) {
                  that.checkSuggestObj.allData = that.checkSuggestObj.allData.concat(items.checkList);
                }
                if (items.inspectionList.length > 0) {
                  that.checkSuggestObj.allData = that.checkSuggestObj.allData.concat(items.inspectionList);
                }
                that.checkSuggestObj.allData.map(function (item,index) {
                  item.adviceId = item.checkId || item.inspectionId;
                  item.adviceName = item.checkName|| item.inspectionName;
                  item.adviceTypeisAttachment = item.isAttachment;
                });
                that.checkSuggestData('checkSuggestObj')
              }
              //患教知识DOM添加
              if (items.knowledgeList && items.knowledgeList.length > 0) {
                that.knowledgeObj.allData = items.knowledgeList;
                that.checkSuggestData('knowledgeObj')
              }
              //处置建议DOM添加
              if (items.treatmentList && items.treatmentList.length > 0) {
                that.treatmentObj.allData = items.treatmentList;
                that.checkSuggestData('treatmentObj')
              }
            }
            that.suggestResponse = true;
            that.checkResponse();
          },
          fail(){
            that.suggestResponse = true;
            that.checkResponse();
          },
        });
        api.ajax({
          url: XHRList.getRecommedDoctor,
          method: "POST",
          data: {
            diagnosisId: that.message.diagnosisId,
            caseId:api.getPara().caseId,
            isValid: 1,
            firstResult: 0,
            maxResult: 9999,
            sortType: 1,
            logoUseFlag: 3
          },
          beforeSend(){

          },
          done(data){
            if (data.responseObject.responseData.dataList) {
              that.doctorObj.allData = data.responseObject.responseData.dataList;
//              that.doctorObj.allData = data.responseObject.responseData.dataList;
              console.log(data.responseObject.responseData.dataList);
              that.checkSuggestData('doctorObj');
            }
            that.doctorResponse = true;
            that.checkResponse();
          },
          fail(){
            that.doctorResponse = true;
            that.checkResponse();
          },
        })
      },
      //检查响应是否都完成
      checkResponse(){
        let that = this;
        if (that.suggestResponse && that.doctorResponse) {
          store.commit("addRenderSuggestionNum");
        }
        console.log(that.$store.state.previewSuggestionNum);
        console.log(that.$store.state.renderSuggestionNum);
        //渲染完成后进行定位
        if (that.$store.state.previewSuggestionNum === that.$store.state.renderSuggestionNum) {
          that.$nextTick(function () {
            if (!api.getPara().suggest) {
              document.body.scrollTop = Math.pow(10, 20);
            } else {
              document.body.scrollTop = that.$el.querySelectorAll(".doctor-box")[that.$el.querySelectorAll(".doctor-box").length-1].offsetTop;
            }
          })
        }
      },
      //检查检验数据
      checkSuggestData (param) {
        let that = this;
        if (that[param].allData.length > that[param].initNum) {
          that[param].moreBoxShow = true;
          that[param].lessData = that[param].allData.slice(0,that[param].initNum);
          that[param].tempData = that[param].lessData;
          that[param].moreData = true;
        } else {
          that[param].moreBoxShow = false;
          that[param].tempData = that[param].allData;
        }
      },
      //展示更多
      moreDataShow(param,e){
        let that = this;

        if (!that[param].hasPosition){
          that[param].position = e.currentTarget.parentNode.parentNode.parentNode.offsetTop;
          that[param].hasPosition = true;
        }

        if (that[param].allData.length-that[param].tempData.length>that[param].pageNum) {
          that[param].tempData = that[param].allData.slice(0,that[param].pageNum+that[param].tempData.length);
        } else {
          that[param].moreData = false;
          that[param].tempData = that[param].allData;
        }
      },
      //去医生主页
      goDoctorHome(index){
        let that = this;
        window.location.href = '/dist/doctorHome.html?doctorCustomerId=' + that.doctorObj.allData[index].customerId + '&patientId=' + api.getPara().patientId + '&caseId=' + api.getPara().caseId + '&patientCustomerId=' + api.getPara().patientCustomerId;
      },
      //免费问诊
      goConsult(index,type){
        let that = this;
        that.$emit('update:payPopupShow', true);

        store.commit("setTargetMsg", {customerId:that.doctorObj.allData[index].customerId});
        store.commit("setTargetMsg", {nick:that.doctorObj.allData[index].fullName});
        store.commit("setTargetMsg", {payType:type});

      },
      //收起
      lessDataShow(param){
        let that = this;
        document.body.scrollTop = that[param].position;
        that[param].moreData = true;
        that[param].hasPosition = false;
        that[param].tempData = that[param].lessData;
      },
      goToUpload(){
        localStorage.removeItem("upload");
        this.$router.push({
          name: "UploadList",
          params: this.checkSuggestObj.allData
        })
      }
    },
    props:{
      previewSuggestionMessage:{
        type:Object
      },
      payPopupShow:{
        type:Boolean
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
  @import "../../../../scss/library/_common-modules";
  /*展开更多的公共样式*/
  .more-box{
    padding-top: rem(40px);
    @include font-dpr(14px);
    color: #909090;
    text-align: center;
    .more-box-btn{
      padding: rem(0px) rem(50px) rem(0px) rem(10px);

    }
    /*.more-btn{*/
      /*background: url("../../../common/image/imScene/under_arrow@2x.png") no-repeat top right;*/
      /*background-size: rem(32px) rem(32px);*/
    /*}*/
    /*.less-btn{*/
      /*background: url("../../../common/image/imScene/pack_up@2x.png") no-repeat top right;*/
      /*background-size: rem(32px) rem(32px);*/
    /*}*/
  }
  /*检查检验样式和处置建议样式，两者一样*/
  .check-suggest-box{
    width: rem(690px);
    margin: 0 auto;
    .check-suggest-title{
      box-sizing: border-box;
      padding: rem(36px) rem(36px) rem(10px);
      background: #EDEEEE;
      color: #666666;
      @include font-dpr(14px);
      border: 1px solid #E4E9EB;
      border-radius: rem(12px) rem(12px) rem(0px) rem(0px);
      border-bottom: none;
    }
    .check-suggest-bg{
      width: rem(690px);
      height: rem(54px);
      background: url("../../../common/image/imScene/list_style@2x.png") no-repeat;
      background-size: cover;
    }
    .check-suggest-content{
      color: #333333;
      padding: rem(20px) 0 rem(70px);
      @include font-dpr(17px);
      background: #FFFFFF;
      border: 1px solid #E4E9EB;
      border-top: none;
      border-radius:rem(0px) rem(0px) rem(12px) rem(12px);
      .check-suggest-list{
        .check-suggest-item{
          color: #222222;
          box-sizing: border-box;
          line-height: 1;
          padding: rem(0px) rem(64px);
          position: relative;
          font-weight: bold;
          &::before{
            content: '';
            width: rem(8px);
            height: rem(8px);
            display: inline-block;
            position: absolute;
            top: 50%;
            margin-top: rem(-6px);
            left: rem(39px);
            background: #406181;
            border-radius: rem(4px);
          }
        }
        .check-suggest-item +.check-suggest-item{
          margin-top: rem(50px);
        }
      }
      .check-suggest-btn{
        background: #2FC5BD;
        border-radius: 999px;
        width: rem(560px);
        margin: rem(56px) auto rem(0px);
        color: #FFFFFF;
        text-align: center;
        line-height: 1;
        @include font-dpr(18px);
        padding: rem(30px) 0;
      }
    }
  }
  //患教知识
  .knowledge-box{
    width: rem(690px);
    margin: 0 auto;
    .knowledge-title{
      box-sizing: border-box;
      padding: rem(36px) rem(36px) rem(10px);
      background: #EDEEEE;
      color: #666666;
      @include font-dpr(14px);
      border: 1px solid #E4E9EB;
      border-radius: rem(12px) rem(12px) rem(0px) rem(0px);
      border-bottom: none;
    }
    .knowledge-bg{
      width: rem(690px);
      height: rem(54px);
      background: url("../../../common/image/imScene/list_style@2x.png") no-repeat;
      background-size: cover;
    }
    .knowledge-content{
      color: #333333;
      padding: rem(20px) 0 rem(0px);
      @include font-dpr(17px);
      background: #FFFFFF;
      border: 1px solid #E4E9EB;
      border-top: none;
      border-radius:rem(0px) rem(0px) rem(12px) rem(12px);
      .knowledge-list{
        .knowledge-item{
          color: #333333;
          box-sizing: border-box;
          padding: rem(38px) rem(0px);
          margin: 0 rem(30px);
          position: relative;
          font-weight: bold;
          .knowledge-name{
            display: inline-block;
            max-width: rem(480px);
          }
          .knowledge-detail{
            position: absolute;
            color: #AAAAAA;
            @include font-dpr(14px);
            padding-right: rem(34px);
            right: rem(15px);
            top: 50%;
            transform: translateY(-50%);
            background: url("../../../common/image/imScene/right_arrow@2x.png") center right no-repeat;
            background-size: rem(28px) rem(28px);
          }
        }
        .knowledge-item +.knowledge-item{
          border-top: 2px solid #F4F4F4;
        }
      }
      .more-box{
        border-top: 1px solid #F4F4F4;
        padding-bottom: rem(60px);
      }
    }
  }
  //推荐医生
  .doctor-box{
    width: rem(690px);
    margin: 0 auto;
    background: #FFFFFF;
    border: 1px solid #E4E9EB;
    border-radius: rem(12px);
    .doctor-header{
      .doctor-title{
        color: #333333;
        @include font-dpr(20px);
        /*font-weight: 100;*/
        padding: rem(24px) rem(30px);
        position: relative;
        &::before{
          width: rem(6px);
          height: rem(24px);
          content: '';
          display: inline-block;
          position: absolute;
          left: 0;
          background: #43CBC3;
          top:50%;
          transform: translateY(-50%);
        }
      }
      .doctor-introduce{
        color: #333333;
        @include font-dpr(15px);
        span{
          &::before{
            content:'';
            display: inline-block;
            width: rem(8px);
            height: rem(8px);
            background: #43CBC3;
            border-radius: rem(4px);
            vertical-align: middle;
            margin: rem(0px) rem(8px) rem(0px) rem(30px);
          }
        }
        /*font-weight: bold;*/
        /*padding:0 rem(30px);*/
      }
      .doctor-tips{
        border: 1px solid #F4F4F4;
        width: rem(650px);
        border-radius: rem(8px);
        color: #AAAAAA;
        @include font-dpr(13px);
        margin: rem(18px) auto;
        padding: rem(14px) 0;
        text-align: center;
      }
    }
    .doctor-content{
      .doctor-list{
        padding: 0 rem(30px);
        .doctor-item{
          padding: rem(56px) 0;
          .doctor-item-top{
            display: flex;
            .doctor-item-img{
              margin-top: rem(6px);
              width: rem(108px);
              height: rem(108px);
              margin-right: rem(16px);
              border-radius: 50%;
              overflow: hidden;
              img{
                width: rem(108px);
                height: rem(108px);
              }
            }
            .doctor-item-info{
              flex: 1;
              .doctor-base-info{
                @include clearfix();
                line-height: 1;
                .doctor-name{
                  color: #333333;
                  font-weight: bold;
                  @include font-dpr(16px);
                  display: inline-block;
                  max-width: rem(160px);
                  @include ellipsis();
                  vertical-align: text-bottom;
                }
                .doctor-post{
                  @include font-dpr(14px);
                  color: #333333;
                  vertical-align: text-bottom;
                  margin-left: rem(16px);
                }
                .doctor-free{
                  background: rgba(255,222,195,0.45);
                  @include font-dpr(13px);
                  padding-left: rem(22px);
                  padding-right: rem(8px);
                  border-radius: 999px rem(4px) rem(4px) 999px;
                  color: #FF8E32;
                  float: right;
                  position: relative;
                  &::before{
                    content: "";
                    display: block;
                    width: rem(6px);
                    height: rem(6px);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: rem(10px);
                    background: #ffffff;
                  }
                }
              }
              .doctor-hospital{
                color: #666666;
                @include font-dpr(14px);
                margin-top: rem(10px);
                @include ellipsis();
                max-width: rem(506px);
              }
              .doctor-good{
                @include font-dpr(14px);
                color: #AAAAAA;
                @include ellipsis();
                margin-top: rem(10px);
                max-width: rem(506px);
              }
            }
          }
          .doctor-item-bottom{
            @include font-dpr(14px);
            @include clearfix();
            margin-top: rem(40px);
            padding-left: rem(120px);
            .go-consult{
              float: right;
              width: rem(224px);
              text-align: center;
              background: rgba(47,197,189,0.90);
              border-radius: 52px;
              padding: rem(12px);
              box-sizing: border-box;
              color: #ffffff;
            }
            .free-consult{
              float: left;
              color: #FA787A;
              font-weight: bold;
              margin-top: rem(12px);
            }
            .free-price{
              @include font-dpr(13px);
              color: #BBBBBB;
              top: rem(12px);
              margin-left: rem(12px);
              position: relative;
              text-decoration: line-through;
            }
            .general-money{
              float: left;
              color: #07B6AC;
              padding-left: rem(34px);
              margin-top: rem(12px);
              background: url("../../../common/image/imScene/money@2x.png") no-repeat left center;
              background-size: rem(32px) rem(32px);
            }
          }
        }
        .doctor-item + .doctor-item{
          border-top: 1px solid #F4F4F4;
        }
      }
      .more-box.doctor-more-box{
        border-top: 1px solid #F4F4F4;
        margin: 0 0;
        padding: rem(34px) 0;
      }
    }
  }
</style>
