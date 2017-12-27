<template>
  <section class="allinmed-personal-linkUs">
    <router-link tag='section' class="allinmed-personal-link" to='/contactUs'>
      <p class='allinmed-personal-des'>
      <span class="icon about"></span>
      <span class="title">联系我们</span>
      </p>
      <span class="jump"></span>
    </router-link>
    <router-link tag='section' class="allinmed-personal-link" to='/contactUs'>
      <p class='allinmed-personal-des'>
        <span class="icon feedback"></span>
        <span class="title">建议反馈</span>
      </p>
      <span class="jump"></span>
    </router-link>
    <router-link tag='section' class="allinmed-personal-about"  to='/aboutAllinmed'>
      <p class='allinmed-personal-des'>
      <span class="icon  link"></span>
      <span class="title">关于唯医互联网骨科医院</span>
      </p>
      <span class="jump"></span>
    </router-link>
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
      height: rem(55px);
      display: block;
    }
  .allinmed-personal-link{
    padding-top: 0;
  }
    .allinmed-personal-about{
      padding-bottom: 0;
      border-top: 1.5px solid #EAEAEA;
    }
  }
</style>
