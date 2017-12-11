<template>
  <footer class="tabbar-box">
    <a href="javascript:void(0);" class="tabbar-list" @click="toUrl(1)">
      <dl class="tabbar-item" :class="{'selected':selected == 1}">
          <dt class="tabbar-icon home"></dt>
          <dd class="tabbar-des">首页</dd>
      </dl>
    </a>
    <a href="javascript:void(0);" class="tabbar-list" @click="toUrl(2)">
      <dl class="tabbar-item" :class="{'selected':selected == 2}">
          <dt class="tabbar-icon history"></dt>
          <dd class="tabbar-des">{{selected == 2?'去问诊':'问诊历史'}}</dd>
      </dl>
    </a>
    <a href="javascript:void(0);" class="tabbar-list" @click="toUrl(3)">
      <dl class="tabbar-item" :class="{'selected':selected == 3}">
          <dt class="tabbar-icon my"></dt>
          <dd class="tabbar-des">我的</dd>
      </dl>
    </a>
  </footer>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:  引入此公共组件，需要传一个参数 selected （必传，代表哪个高亮且不可点击）
   * @Notify：
   * @Depend：
   *
   * Created by lichenyang on 2017/12/25.
   */
  import api from 'common/js/util/util';
  export default{
    data(){
      return {
        homeUrl:'',//首页的url
        historyUrl:'',//历史页的url
        myUrl:'',//我的页的url
      }
    },
    mounted(){
      this.initData();
    },
    methods : {
      initData () {
        let userId = api.getPara().customerId || api.getPara().patientCustomerId||localStorage.getItem("userId");
        this.homeUrl = `/`;
        if(this.selected == 2){
          this.historyUrl = `./consult.html?customerId=${userId}`;
        }else{
          this.historyUrl = `./myConsult.html?customerId=${userId}`;
        }
        this.myUrl = `./personal.html`;
      },
      toUrl (num) {
//        if (this.selected == num) return false;
        switch(num) {
          case 1:
            if (this.selected == 1) return false;
            location.href = this.homeUrl;
            break;
          case 2:
            location.href = this.historyUrl;
            break;
          case 3:
            if (this.selected == 3) return false;          
            location.href = this.myUrl;
            break;
          default:
            break;
        }
      },
    },
    props: {
      selected: {
        default: 0,
        type: Number
      },
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .tabbar-box{
    width: 100%;
    height: rem(100px);
    opacity: 0.95;
    background: #FFFFFF;
    box-shadow: 0 -1px 0 0 #E8E8E8;
    position: fixed;
    bottom:0;
    display: flex;
    .tabbar-list{
      flex:1;
      justify-content: space-between;
      align-content: center;
      .tabbar-item{
        @include font-dpr(11px);
        color: #97A0B7;
        text-align: center;
        .tabbar-icon{
          height: rem(62px);
          &.home{
            background: url("../common/image/img00/commonImage/home_default.png") no-repeat center bottom;
            background-size:rem(44px) rem(44px);
          }
          &.history{
            background: url("../common/image/img00/commonImage/inquiry_default.png") no-repeat center bottom;
            background-size:rem(44px) rem(44px);
          }
          &.my{
            background: url("../common/image/img00/commonImage/personal_default.png") no-repeat center bottom;
            background-size:rem(44px) rem(44px);
          }
        }
        &.selected {
          color: #09C395;
          .tabbar-icon{
            &.home{
            background: url("../common/image/img00/commonImage/home_press.png") no-repeat center bottom;
            background-size:rem(44px) rem(44px);
          }
          &.history{
            background: url("../common/image/img00/commonImage/inquiry_press.png") no-repeat center bottom;
            background-size:rem(44px) rem(44px);
          }
          &.my{
            background: url("../common/image/img00/commonImage/personal_press.png") no-repeat center bottom;
            background-size:rem(44px) rem(44px);
          }
          }
        }
      }
    }
  }

</style>
