<template>
  <section class="allinmed-personal-logo">
    <figure class="allinmed-personal-userLogo">
      <img src="http://d.hiphotos.baidu.com/image/pic/item/00e93901213fb80e18b8444b3dd12f2eb83894c4.jpg" alt="">
    </figure>
    <article class="allinmed-personal-userName">zym12345</article>
  </section>

</template>
<style scoped lang="scss"  rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules.scss";
  /*@import "../../../../scss/library/_common-modules.scss";*/
  .allinmed-personal-logo{
    width: rem(614px);
    padding: rem(48px);
    height: rem(146px);
    background: #FFFFFF;
    border-radius: rem(16px);

    margin: 0 auto;
    .allinmed-personal-userLogo{
      width: rem(136px);
      height: rem(136px);
      margin-right: rem(38px);
      float: left;
      img{
        border-radius: 50%;
      }
    }
    .allinmed-personal-userName{
      font-family: PingFangSC-Medium;
      @include font-dpr(20px);
      color: #222222;
      letter-spacing: 0;
      line-height: rem(146px);
      float: left;
    }
  }
</style>
