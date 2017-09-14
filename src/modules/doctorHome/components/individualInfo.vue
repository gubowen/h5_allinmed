<template>
    <section class="individual-main-inner">
        <section class="individual-content">
          <section class="individual-personInfo">
            <p>个人简介</p>
          </section>
          <section class="individual-baseInfo">
            <section class="individual-baseInfo-title">北京协和医和医学进步奖。掌握了一套非
              手术治疗颈肩腰腿痛的有效疗法，即洛阳
              正骨治筋疗法。优值牵引法：采用床头多
              功能牵引架根据患者采用最好的发育异常
              引起的双侧关节病。</section>
            <section class="individual-baseInfo-item">
              <p class="individual-baseInfoItem-title individual-education-title">教育与进修经历</p>
              <section class="individual-education-item">
                <span>sdfsf斯蒂芬</span><span>所发生的方式</span><span>北京协和医和医学进步奖。掌握了一套非
              手术治疗颈肩腰腿痛的有效疗法，即洛阳
              正骨治筋疗法。优值牵引法：采用床头多
              功能牵引架根据患者采用最好的发育异常
              引起的双侧关节病。</span>
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
              finish:false
            }
        },
        activated() {

        },
        mounted() {

        },
        methods: {},
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

            }
          }
        }
      }
    }
</style>
