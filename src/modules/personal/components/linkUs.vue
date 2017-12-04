<template>
  <section class="allinmed-personal-linkUs">
    <section class="allinmed-personal-link">
      <span class="icon link"></span>
      <span class="title">联系我们</span>
      <span class="jump"></span>
    </section>
    <section class="allinmed-personal-about">
      <span class="icon about"></span>
      <span class="title">关于唯医互联网骨科医院</span>
      <span class="jump"></span>
    </section>
  </section>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules.scss";
  .allinmed-personal-linkUs{
    margin:rem(20px) auto;
    background: #fff;
    width: rem(606px);
    border-radius: rem(16px);
    padding: rem(58px) rem(46px) rem(62px) rem(46px);
    .allinmed-personal-link,.allinmed-personal-about{
      padding: rem(58px) 0 rem(62px) 0;
      height: rem(40px);
    }
    .allinmed-personal-about{
      border-top: 2px solid #EAEAEA;
    }
  }
</style>
