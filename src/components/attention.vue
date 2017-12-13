<template>
  <section class="header" v-show="!showFlag">
        <div class="btn-close" @click="close()"></div>
        <div class="btn-attention" @click="attentionEvent">点击关注</div>
  </section>
</template>
<script>
import GetPersonal from "common/js/auth/getPersonal";
const getPersonal = new GetPersonal();
export default {
  data() {
    return {
      showFlag:true
    };
  },

  methods: {
    init() {
      if (!localStorage.getItem("hasCloseAttention")) {
        this.getPersonal();
      }else{
        this.showFlag=true;
      }
    },
    close() {
      this.showFlag = true;
    },
    attentionEvent() {
      this.$emit("attentionHandle");
    },
    // 获取个人信息
    getPersonal() {
      getPersonal.getMessage(localStorage.getItem("userId")).then(data => {
        const _data = data.responseObject.responseData;
        if (_data && parseInt(_data.uniteFlagWeixin) === 1) {
          localStorage.setItem("hasCloseAttention", true);
           this.showFlag=true;
        }else{
          this.showFlag=false;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../scss/library/_common-modules";

.header {
  height: rem(120px);
  background: #e7e7e7 url("../common/image/img00/index/bullet.png") no-repeat;
  width: 100%;
  padding: rem(20px) rem(40px);
  box-sizing: border-box;
  position: relative;
  background-size: contain;
  margin-bottom: rem(20px);
  .btn-close {
    width: rem(28px);
    height: rem(28px);
    background: url("../common/image/img00/index/close.png") 100% 100% no-repeat;
    margin: rem(28px) 0 0 0;
    background-size: contain;
  }
  .btn-attention {
    @include font-dpr(16px);
    color: #ffffff;
    text-align: center;
    letter-spacing: 0;
    line-height: rem(68px);
    width: rem(188px);
    height: rem(68px);
    background-image: linear-gradient(89deg, #31cfb3 42%, #2fb9b6 98%);
    box-shadow: 0 rem(12px) rem(24px) 0 rgba(48, 153, 141, 0.57);
    border-radius: rem(200px);
    position: absolute;
    top: rem(22px);
    right: rem(24px);
  }
}
</style>
