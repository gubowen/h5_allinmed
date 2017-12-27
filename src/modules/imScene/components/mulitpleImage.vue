<template>
     <section class="main-message-box" v-touch:long.stop="longTouchHandler">
          <article
            class="main-message-box-item my-message"
            :data-clientid="imageMessage.idClient">

      <i class="fail-button" style="display:none">
        <img src="../../../common/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content multiple-box">
        <transition name="fade">
          <button class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&imageMessage.from===userData.account">撤回</button>
        </transition>
        <header class="mulit-title">图片({{imageList.length}})</header>
        <section class="mulitple-image-box" @click.stop="showBigImg">
            <figure class="mulitple-image" v-for="item in imageList.slice(0,3)">
                <img :src="item.url" alt="">
            </figure>
        </section>
      </figcaption>

      <figure class="main-message-img" v-if="imageMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
    </article>
     </section>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      imageList: [],
      showDeleteMsg:false,//撤回按钮是否显示
    };
  },
  components: {},
  methods: {
    showBigImg() {
      let that = this;
      let _indexNum =0;
      this.showDeleteMsg = false;
      let _params = {
        imgBlob: (function() {
          let result = [];
          that.imageList.forEach((element, index) => {
            result.push({ blob: element.url });
          });
          return result;
        })(),
        indexNum: 0
      };

      this.$router.push({
        name: "showBigImg",
        params: _params
      });
    },
    longTouchHandler() {
      this.showDeleteMsg = true;
      this.$emit("longTouchEmitHandler");
    },
    deleteMsgEvent() {
      this.showDeleteMsg = false;
      console.log("video组件里的我要删除");
      this.$emit("deleteMsgEvent");
    }
  },
  mounted() {
    this.imageList = JSON.parse(this.imageMessage.content).data.list;
  },
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    }
  },
  props: {
    imageMessage: {
      type: Object,
      default: {}
    },
    targetData: {
      type: Object
    },
    userData: {
      type: Object
    },
    deleteMsgIndex: {
      type: Number
    },
    currentIndex: {
      type: Number
    },
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../../../scss/library/_common-modules";
.mulit-title {
  padding-bottom: rem(24px);
  border-bottom: 1px solid #d8d8d8;
  @include font-dpr(17px);
  color: #222222;
}
.multiple-box{
  min-width: 6.8rem;
}
.mulitple-image-box {
  text-align: left;
  padding-top: rem(24px);

  & > .mulitple-image {
    display: inline-block;
    margin-right: rem(18px);
    & > img {
      width: rem(132px);
      height: rem(132px);
      vertical-align: top;
    }
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
</style>
