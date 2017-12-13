<template>
  <section class="allinmed-mainInner">
    <Loading :show="loadingOnOff"></Loading>
    <router-view  :class="{'have-padding':paddingOnOff}"></router-view>
    <tab :selected=3></tab>
  </section>
</template>
<script>
  import fb from 'common/js/third-party/flexible'
  import tab from 'components/tabbar';
  import Loading from "components/loading";
  import {mapGetters} from "vuex"

  export default {
    data () {
      return {
        msg: 'hello'
      }
    },
    computed:{
      ...mapGetters(["loadingOnOff"]),
      paddingOnOff(){
        return ((this.$route.path==='/aboutAllinmed')||(this.$route.path==='/contactUs'))?false:true;
      }
    },
    components:{
      tab,Loading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules.scss";

  .allinmed-mainInner {
    top:0;
    min-height: 100%;
    height: auto;
    background: #eee;
    padding: 0;
    position:relative;
    .padding-plus{
      padding-top: rem(20px);
    }
    .allinmed-personal-des{
      float: left;
    &> span{
       display: inline-block;
       vertical-align: middle;
     }
    }
  img {
    width: 100%;
    height: 100%;

  }
  .allinmed-personal-logout {
    width: rem(698px);
    height: rem(100px);
    margin: rem(20px) auto;
    background: #fff;
    border-radius: rem(16px);
    font-family: PingFangSC-Regular;
    color: #FA787A;
    letter-spacing: 0;
    line-height: rem(100px);
    @include font-dpr(18px);
    text-align: center;
    display: block;
  }

  .icon {
    width: rem(36px);
    height: rem(36px);
    display:inline-block;

  &.safe {
    background: #fff url("../../../src/common/image/img00/personal/icon_01.png") no-repeat center 50%;
    background-size: contain;
  }

  &.link {
    background: #fff url("../../../src/common/image/img00/personal/icon_03.png") no-repeat center 50%;
     background-size: contain;
  }

  &.about {
    background: #fff url("../../../src/common/image/img00/personal/icon_02.png") no-repeat center 50%;
    background-size: contain;
  }

  }
  .title {
    font-family: PingFangSC-Regular;
  @include font-dpr(18px);
    color: #222222;
    letter-spacing: 0;
    line-height: rem(40px);
    margin-left: rem(16px);
    display:inline-block;
    height: 100%;
  }

  .jump {
    width: rem(20px);
    height: rem(40px);
    background: url("../../../src/common/image/img00/personal/arrow.png") no-repeat center 50%;
    background-size: contain;
    float: right;
    vertical-align: middle;
  }
    .allinmed-personal-tableModule{
      position: relative;
      min-height:rem(454px);
      height:auto;
    .allinmed-personal-tableModuleItem,.allinmed-changeMobileContent{
      margin: 0 rem(28px);
      padding: rem(30px) 0;
      position:relative;
      box-sizing: border-box;
      border-bottom: 2px solid #EAEAEA;
      height:rem(101px);
      .icon-searchCancel:before {
        content: "";
        width: rem(26px);
        height: rem(26px);
        display: inline-block;
        vertical-align: middle;
        background: url("../../../src/common/image/img00/personal/icon_searchCancel.png") center center no-repeat;
        background-size: contain;
        right: 0;
        margin-top: rem(14px);
        margin-right: rem(10px);
        position: absolute;
      }
      .icon-mobile{
        display: inline-block;
        &:before{
           content: "";
           display: inline-block;
           width: rem(17px);
           height: rem(30px);
           background: url('../../../src/common/image/img00/personal/icon_mobile.png') center center no-repeat;
           background-size: cover;
           vertical-align: middle;
         }
      }
      .icon-mobile-on{
            &:before{
               background: url('../../../src/common/image/img00/personal/icon_mobileOn.png') center center no-repeat;
               background-size: cover;
               vertical-align: middle;
             }
      }
    h3{
      float: left;
      font-size: rem(30px);
      color: #555;
      font-weight: 400;
      display: inline-block;
      line-height:rem(50px);
    }
    .allinmed-tableModuleItemInput{
      color: #aaa;
      position: absolute;
      left: rem(156px);
      font-size: rem(30px);
      display: inline-block;
      width: 75%;
      .close{
        background: url('../../../src/common/image/img00/personal/close.png') no-repeat;
        display: inline-block;
        width: rem(29px);
        height: rem(29px);
        -webkit-background-size: contain;
        background-size: contain;
        vertical-align: middle;
        margin:0 rem(20px) 0 rem(15px);
        position: absolute;
        top: 50%;
        margin-top: rem(-15px);
      }
      .eye{
        display: inline-block;
        width: rem(38px);
        vertical-align: middle;
        margin:0 rem(20px) 0 rem(15px);
        position: absolute;
        top: 50%;
        margin-top: rem(-10px);
      }
      .eyeOpen{
        background: url('../../../src/common/image/img00/personal/eye.png') no-repeat;
        -webkit-background-size: contain;
        background-size: contain;
        height: rem(20px);
      }
      .eyeClose{
        background: url('../../../src/common/image/img00/personal/Eye_Close.png') no-repeat;
        -webkit-background-size: contain;
        background-size: contain;
        height: rem(27px);
        margin-top: rem(-14px);
      }

    & > input {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        font-size: rem(32px);
        display: inline-block;
        vertical-align: middle;
        min-width: rem(100px);
      }
    }

    &:nth-last-child(1){
       border-bottom: none;
     }
    }
    .allinmed-changeMobileContent{
      min-height:rem(136px);
      height: auto;
      color: gray;
      font-size: rem(30px);
      line-height: rem(45px);
      border: none;
    }
    .btn-primary-lg {
      display: block;
      width: 100%;
      text-align: center;
      height: rem(90px);
      line-height: rem(90px);
      background-color: #00BEAF;
      border-radius: rem(10px);
      color: #fff;
      font-size: rem(40px);
    }
    .allinmed-personal-msgWriting{
      opacity: .5;
    }
    }
  }
  .have-padding{
    padding:rem(20px) 0 0 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
  .middle-tip-modal{
    position: absolute;
  }
  [v-cloak]{
    display: none;
  }

</style>



