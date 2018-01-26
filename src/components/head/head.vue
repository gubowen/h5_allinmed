<template>
  <button class="amed-button" @click="buttonCallBack" :class="[
    'amed-button-' + buttonSize,
    'amed-button-' + buttonStyle
  ]">{{buttonText}}</button>
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
        type:String,
        default: "下一页"
      },
      buttonSize:{
        type:String,
        default:"normal",
        validator(value) {
          return [
            'large',
            'normal',
            'small'
          ].indexOf(value) > -1;
        }
      },
      buttonStyle:{
        type:String,
        default:"light",
        validator(value) {
          return [
            'light',
            'disable',
            'warning'
          ].indexOf(value) > -1;
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";

  .amed-button {
    display:block;
    height: rem(100px);
    line-height: rem(100px);
    text-align: center;
    border-radius: rem(20px);
    @include font-dpr(20px);
    margin: 0 auto;
    &-large {
      width: 90%;
    }
    &-normal {
      padding: 0 rem(100px);
    }
    &-small {
      padding: 0 rem(30px);
    }
    &-light{
      background: linear-gradient(90deg,#31cfb3 42%,#2fb9b6 84%);
      color:#fff;
    }
    &-disable{
      background: #aaa;
      color:#444;
    }
    &-warning{
      background: red;
      color:#fff;
    }
  }
</style>
