<template>
  <footer class="tabbar-box" data-alcode-mod='743' data-alcode-item-selector=".tabbar-list">
    <a href="javascript:void(0);" class="tabbar-list" @click="toUrl($event,1)">
      <dl class="tabbar-item" :class="{'selected':selected == 1}">
          <dt class="tabbar-icon home"></dt>
          <dd class="tabbar-des">首页</dd>
      </dl>
    </a>
    <a href="javascript:void(0);" class="tabbar-list" @click="toUrl($event,2)">
      <dl class="tabbar-item" :class="{'selected':selected == 2}">
          <dt class="tabbar-icon history"></dt>
          <dd class="tabbar-des">{{selected == 2?'去问诊':'问诊历史'}}</dd>
      </dl>
    </a>
    <a href="javascript:void(0);" class="tabbar-list" @click="toUrl($event,3)">
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
import api from "common/js/util/util";
import CheckLogin from 'common/js/auth/checkLogin';
export default {
  data() {
    return {
      homeUrl: "", //首页的url
      historyUrl: "", //历史页的url
      myUrl: "" //我的页的url
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let userId =
        api.getPara().customerId ||
        api.getPara().patientCustomerId ||
        localStorage.getItem("userId");
      this.homeUrl = `/`;
      if (this.selected == 2) {
        this.historyUrl = `/dist/consult.html`;
      } else {
        this.historyUrl = `/dist/myConsult.html`;
      }
      this.myUrl = `/dist/personal.html`;
    },
    toUrl(e,num) {
      //        if (this.selected == num) return false;
      switch (num) {
        case 1:
          if (this.selected == 1) return false;
          // location.href = this.homeUrl;
          g_sps.jump(e.target,this.homeUrl); 
          break;
        case 2:
          if (!this.isClick) return false;
          // location.href = this.historyUrl;
          // g_sps.jump(e.target,this.historyUrl); 
          this.toMyConsult(e);
          break;
        case 3:
          if (this.selected == 3) return false;
          // location.href = this.myUrl;
          g_sps.jump(e.target,this.myUrl); 
          break;
        default:
          break;
      }
    },

    toMyConsult (e) {
      let checkLogin = new CheckLogin();
      checkLogin.getStatus().then((res) => {
        if (res.data.responseObject.responseStatus) {
          g_sps.jump(e.target,this.historyUrl); 
        } else {
          localStorage.setItem("backUrl", this.historyUrl);
          g_sps.jump(e.target,'/dist/mLogin.html');
        }
      })
    }
  },
  props: {
    selected: {
      default: 0,
      type: Number
    },
    isClick: {
      default: true,
      type: Boolean
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../scss/library/_common-modules";
.tabbar-box {
  width: 100%;
  height: rem(100px);
  opacity: 0.95;
  background: #ffffff;
  box-shadow: 0 -1px 0 0 #e8e8e8;
  position: fixed;
  bottom: 0;
  display: flex;
  .tabbar-list {
    flex: 1;
    justify-content: space-between;
    align-content: center;
    display: block;
    .tabbar-item {
      @include font-dpr(11px);
      color: #97a0b7;
      text-align: center;
      .tabbar-icon {
        height: rem(62px);
        &.home {
          background: url("../common/image/img00/commonImage/home_default.png")
            no-repeat center bottom;
          background-size: rem(44px) rem(44px);
        }
        &.history {
          background: url("../common/image/img00/commonImage/inquiry_default.png")
            no-repeat center bottom;
          background-size: rem(44px) rem(44px);
        }
        &.my {
          background: url("../common/image/img00/commonImage/personal_default.png")
            no-repeat center bottom;
          background-size: rem(44px) rem(44px);
        }
      }
      &.selected {
        color: #09c395;
        .tabbar-icon {
          &.home {
            background: url("../common/image/img00/commonImage/home_press.png")
              no-repeat center bottom;
            background-size: rem(44px) rem(44px);
          }
          &.history {
            background: url("../common/image/img00/commonImage/inquiry_press.png")
              no-repeat center bottom;
            background-size: rem(44px) rem(44px);
          }
          &.my {
            background: url("../common/image/img00/commonImage/personal_press.png")
              no-repeat center bottom;
            background-size: rem(44px) rem(44px);
          }
        }
      }
    }
  }
}
</style>
