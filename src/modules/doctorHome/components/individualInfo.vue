<template>
    <section class="individual-main-inner">
        <section class="individual-content">
          <section class="individual-personInfo">
            <p>个人简介</p>
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
      }
    }
</style>
