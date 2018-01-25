<template>
  <button class="amed-button" @click="buttonCallBack">{{buttonText}}</button>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'amed-button',
    methods: {
      buttonCallBack() {
        this.$emit("buttonCallBack");
      }
    },
    props: {
      buttonText: {
        type: String,
        default: "下一页"
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";

  .amed-button {
    height: rem(100px);
    line-height: rem(100px);
    text-align: center;
    @include font-dpr(20px);
    &-large {
      width: 90%;
      margin: 0 auto;
    }
    &-mormal {
      padding: 0 rem(100px);
    }
    &-large {
      padding: 0 rem(30px);
    }
  }
</style>
