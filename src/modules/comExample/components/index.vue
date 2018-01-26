<template>
  <ul class="com-exa-list">
    <li><router-link to="/buttons">Buttons</router-link></li>
    <li><router-link to="/Switch">Switch</router-link></li>
    <li><router-link to="/MultipleChoice">Multiple Choice</router-link></li>
    <li><router-link to="/SingleChoice">Single Choice</router-link></li>
  </ul>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .com-exa-list{
    margin:rem(20px);
    background:#fff;
    @include font-dpr(20px);
    text-align:center;
    line-height:rem(80px);
    height:rem(80px);
    border-bottom:1px solid #000000;
    a{
      color:#444;
    }
    li{

    }
  }
</style>

