<template>
    <section class="individual-main-inner">
        <section class="individual-content">
          <section class="individual-personInfo">
            <p>个人简介</p>
          </section>
          <section class="individual-baseInfo">
            <section class="individual-baseInfo-title" v-show="personalIndividualInfo.length>0">{{personalIndividualInfo}}</section>
            <section class="individual-baseInfo-item">
              <p class="individual-baseInfoItem-title individual-education-title">教育与进修经历</p>
              <section class="individual-education-item" v-for="(item ,index) in continuingEducationList">
                <span class="education-item-time">{{timeDeal(item.startTime)}}-{{timeDeal(item.endTime)}}，</span><span class="education-item-address">{{item.organization}}，</span><span class="education-item-information">{{item.cmeDesc}}</span>
              </section>
              <section class="individual-education-item" v-for="(item ,index) in educationList">
                <span class="education-item-time">{{timeDeal(item.startTime)}}-{{timeDeal(item.endTime)}}，</span><span class="education-item-address">{{item.university}}，</span><span class="education-item-information">{{item.major}}，</span><span class="education-item-information">{{item.education}}</span>
              </section>
              <p class="individual-baseInfoItem-title individual-education-title"> 科研成果及荣誉</p>
              <section class="individual-education-item" v-for="(item ,index) in honorList">
                <span class="education-item-time">{{item.awardYear}}年，</span><span class="education-item-address">{{item.awardDepartment}}，</span><span class="education-item-information">{{item.honorName}}</span>
              </section>
              <section class="individual-education-item" v-for="(item ,index) in fundList">
                <span class="education-item-time">{{timeDeals(item.approvalTime)}}，</span><span class="education-item-address">完成科研项目{{item.fundName}}</span>
              </section>
            </section>
          </section>
        </section>
        <transition name="fade">
            <toast :content="errorMsg" v-if="errorShow"></toast>
        </transition>
        <loading v-show="finish"></loading>
    </section>
</template>
<script type="text/ecmascript-6">
    /**
     * @Desc：
     * @Usage:
     * @Notify：
     * @Depend：
     *
     * Created by jukun on 2017/9/11.
     */

    import selectArea from 'components/selectArea';
    import api from 'common/js/util/util';
    import loading from 'components/loading';
    import toast from 'components/toast';
    import autosize from 'autosize';
    import axios from "axios";
    import confirm from 'components/confirm';

    const XHRList = {
        upload: "",
        create: "",
        triage: ""
    };
    export default {
        data() {
            return {
              errorShow:false,
              finish:false,
              personalIndividualInfo:'',
              continuingEducationList:'',
              educationList:'',
              fundList:'',
              honorList:'',
              CESTimeBox:[],
              CEETimeBox:[],

            }
        },
        activated() {
          let _this =this;
          const _data=this.$route.params;
//          _this.personalIndividualInfo=_data.;    //个人简介
          _this.continuingEducationList=_data.continuingEducationList;  //继续教育
          _this.educationList=_data.educationList;                      //教育
          _this.fundList=_data.fundList;                                //科研
          _this.honorList=_data.honorList;                              //荣誉
        },
        mounted() {

        },
        methods: {
          timeDeal(time){
            let _year = api.timeFormate({time:time,type:2}).year;
            return _year;
          },
          timeDeals(time){
            let _year = `${api.timeFormate({time:time,type:2}).year.substring(0,4)}年`;
            return _year;
          }
        },
        components: {
            loading,
            toast,
            confirm
        },
    }


</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../scss/library/_common-modules";
    body{
      div{
        height: 100%;
      }
    }
    .individual-main-inner{
      padding: 0 rem(30px) rem(40px);
      background-color: #F2F2F2;
      .individual-content{
        background-color: #FFFFFF;
        -webkit-border-radius: rem(8px);
        -moz-border-radius: rem(8px);
        border-radius: rem(8px);
        .individual-personInfo{
          padding-top: rem(38px);
          padding-bottom: rem(62px);
          border-bottom: 2px solid #F8F8F8;
          p{
            @include font-dpr(18px);
            color: #333333;
            position: relative;
            padding-left: rem(30px);
            &:before{
              display: inline-block;
              content: '';
              position: absolute;
              width:rem(4px);
              height:rem(20px);
              left:rem(18px);
              top:50%;
              margin-top: rem(-10px);
              background-color: #2FC5BD;
              -webkit-border-radius: rem(5px);
              -moz-border-radius: rem(5px);
              border-radius: rem(5px);
            }
          }
        }
        .individual-baseInfo{
          .individual-baseInfo-title{
            padding: rem(36px) rem(60px) 0;
            @include font-dpr(16px);
            color: #666666;
          }
          .individual-baseInfo-item{
            padding-bottom: rem(60px);
            .individual-baseInfoItem-title{
              @include font-dpr(18px);
              color: #444444;
              padding-left: rem(60px);
              position: relative;
              margin-top: rem(52px);
              &:before{
                display: inline-block;
                content: '';
                position: absolute;
                width: rem(8px);
                height: rem(8px);
                top:50%;
                margin-top: rem(-4px);
                left: rem(32px);
                background-color: #2FC5BD;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }
            }
            .individual-education-item{
              padding: rem(32px) rem(60px) 0;
            .education-item-address,.education-item-information{
              @include font-dpr(16px);
              color: #2A2A2A;
            }
            .education-item-time{
              @include font-dpr(16px);
              color: #525252;
              font-weight: bold;
            }
            }
          }
        }
      }
    }
</style>
