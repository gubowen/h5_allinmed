<template>
  <div data-alcode-mod='715'>
    <section class="main-message-box">
    <!--<article class="main-message-box-item others-message">-->
      <!--<figure class="main-message-img">-->
        <!--<img src="//m.allinmed.cn/image/imScene/chatting_portrait_system@2x.png" alt="">-->
      <!--</figure>-->
      <!--<figcaption class="check-suggestion message-result ev-upLoadBtn" data-role="checkSuggestion" @click="goToUpload">-->
        <!--<article class="message-result-item">-->
          <!--<header class="message-result-item-title">检查/检验建议</header>-->
          <!--<section class="message-result-item-message">-->
            <!--<p class="check-suggestion-item"-->
               <!--:data-adviceid="item.adviceId"-->
               <!--:data-advicetype="item.adviceType"-->
               <!--v-for="item in checkSuggestMessage.data"-->
            <!--&gt;-->
              <!--<span>{{item.adviceName}}</span>-->
            <!--</p>-->
          <!--</section>-->
        <!--</article>-->
      <!--</figcaption>-->
    <!--</article>-->
    <article class="check-suggest-box">
      <header class="check-suggest-title">为确保分诊准确和专家问诊的效率，建议您进行以下检查并上传检查资料，分诊计时已停止，有关检查疑问您可继续向分诊医生询问，资料上传后分诊医生将继续为您服务。</header>
      <section class="check-suggest-bg"></section>
      <section class="check-suggest-content">
        <ul class="check-suggest-list">
          <li class="check-suggest-item"
              :data-adviceid="item.adviceId"
              :data-advicetype="item.adviceType"
              v-for="(item, index) in tempSuggest"
              :key="index"
              :scrollToBottom="scrollToBottom"
              :scrollElement='scrollElement'
              :refreshScroll='refreshScroll'
          >
            <span>{{item.adviceName}}</span>
          </li>
        </ul>
        <section class="more-box" v-if="moreBoxShow">
          <span class="more-box-btn more-btn" v-show="moreData" @click="moreDataShow($event)">查看更多</span>
          <span class="more-box-btn less-btn" v-show="!moreData" @click="lessDataShow($event)">收起</span>
        </section>
        <section data-alcode='e129' class="check-suggest-btn" data-role="videoTriage"
                    @click="goToUpload">
          上传检查资料
        </section>
      </section>
    </article>
  </section>
  </div>
</template>
<script type="text/ecmascript-6">
/**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by lichenyang on 2017/8/21.
   */
import api from 'common/js/util/util';
import store from "../store/store";
export default {
  data() {
    return {
      moreBoxShow: false, //展开更多盒子是否显示
      moreData: false, //显示展开更多还是显示收起按钮
      tempSuggest: [], //展示的数组
      moreSuggest: [], //最多的数组
      lessSuggest: [], //五条建议的数据
      position: 0, //记录卡片的位置
      hasPosition: false, //卡片的位置是否已经记录
      paramsData: [] //上传检查检验的参数
    };
  },
  mounted() {
    console.log(this.checkSuggestMessage);
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      let that = this;
      //检查检验Imagetype手动改为3，与pc展示相对应
      that.paramsData = that.checkSuggestMessage.data;
      that.paramsData.map((item, index) => {
        Object.assign(item, { adviceType: 3 });
      });
      if (that.checkSuggestMessage.data.length > 5) {
        that.moreBoxShow = true;
        that.moreSuggest = that.checkSuggestMessage.data;
        that.lessSuggest = that.checkSuggestMessage.data.slice(0, 5);
        that.tempSuggest = that.lessSuggest;
        that.moreData = true;
      } else {
        that.moreBoxShow = false;
        that.tempSuggest = that.checkSuggestMessage.data;
      }
      that.$nextTick(function() {
        if (!api.getPara().suggest) {
//          that.scrollToBottom();
        }
      });
    },
    //展示更多
    moreDataShow(e) {
      let that = this;
      // if (!that.hasPosition) {
      //   that.position = e.path["4"].offsetTop;
      //   that.hasPosition = true;
      // }
      that.moreData = false;
      that.tempSuggest = that.moreSuggest;
      that.$nextTick(function () {
        that.refreshScroll();
      })
    },
    //收起
    lessDataShow(e) {
      let that = this;
      // document.body.scrollTop = that.position;
      that.moreData = true;
      that.tempSuggest = that.lessSuggest;
      that.$nextTick(function () {
        // that.refreshScroll();
        that.scrollElement(e.srcElement.parentElement.parentElement.parentElement);
      })
    },
    goToUpload() {
      localStorage.removeItem("upload");
      if (this.$store.state.consultationState == 7 || this.$store.state.consultationState == 1 || this.$store.state.consultationState == 8) {
        store.commit("setToastTips","分诊服务已结束");
        store.commit('setToastShow');
      } else {
        this.$router.push({
          name: "UploadList",
          params: this.paramsData
        });
      }
    }
  },
  props: {
    checkSuggestMessage: {
      type: Object
    },
    scrollToBottom: {
      type: Function,
      default: null
    },
    scrollElement: {
      type: Function,
      default: null
    },
    refreshScroll: {
      type: Function,
      default: null
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
@import "../../../../scss/library/_common-modules";
/*检查检验样式*/
.check-suggest-box {
  width: rem(690px);
  margin: 0 auto;
  .check-suggest-title {
    box-sizing: border-box;
    padding: rem(36px) rem(36px) rem(10px);
    background: #edeeee;
    color: #666666;
    @include font-dpr(14px);
    border: 1px solid #e4e9eb;
    border-radius: rem(12px) rem(12px) rem(0px) rem(0px);
    border-bottom: none;
  }
  .check-suggest-bg {
    width: rem(690px);
    height: rem(54px);
    background: url("../../../common/image/imScene/list_style@2x.png") no-repeat;
    background-size: cover;
  }
  .check-suggest-content {
    color: #333333;
    padding: rem(20px) 0 rem(70px);
    @include font-dpr(17px);
    background: #ffffff;
    border: 1px solid #e4e9eb;
    border-top: none;
    border-radius: rem(0px) rem(0px) rem(12px) rem(12px);
    .check-suggest-list {
      .check-suggest-item {
        color: #222222;
        box-sizing: border-box;
        padding: rem(0px) rem(58px);
        position: relative;
        font-weight: bold;
        &::before {
          content: "";
          width: rem(8px);
          height: rem(8px);
          display: inline-block;
          position: absolute;
          top: 50%;
          margin-top: rem(-4px);
          left: rem(39px);
          background: #406181;
          border-radius: rem(4px);
        }
      }
      .check-suggest-item + .check-suggest-item {
        margin-top: rem(50px);
      }
    }
    .more-box {
      margin-top: rem(50px);
      @include font-dpr(14px);
      color: #909090;
      text-align: center;
      .more-box-btn {
        padding: rem(0px) rem(50px) rem(0px) rem(10px);
      }
      .more-btn {
        background: url("../../../common/image/imScene/under_arrow@2x.png")
          no-repeat top right;
        background-size: rem(32px) rem(32px);
      }
      .less-btn {
        background: url("../../../common/image/imScene/pack_up@2x.png")
          no-repeat top right;
        background-size: rem(32px) rem(32px);
      }
    }
    .check-suggest-btn {
      background: #2fc5bd;
      border-radius: 999px;
      width: rem(560px);
      margin: rem(56px) auto 0px;
      color: #ffffff;
      text-align: center;
      line-height: 1;
      @include font-dpr(18px);
      padding: rem(30px) 0;
    }
  }
}
</style>
