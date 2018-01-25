<template>
  <ul class="com-exa-list">
    <li><router-link to="/buttons">Buttons</router-link></li>
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
    a{
      color:#444;
    }
  }
</style>

