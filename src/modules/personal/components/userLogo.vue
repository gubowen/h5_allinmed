<template>
  <section class="allinmed-personal-logo" v-if="(customerName.length>0)&&(logUrl.length>0)">
    <figure class="allinmed-personal-userLogo">
      <img :src="logUrl" alt="">
    </figure>
    <article class="allinmed-personal-userName">{{customerName|hidePhone}}</article>
  </section>

</template>
<style scoped lang="scss"  rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules.scss";
  /*@import "../../../../scss/library/_common-modules.scss";*/
  .allinmed-personal-logo{
    width: rem(602px);
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
      width: rem(420px);
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
</style>
<script  type="text/ecmascript-6">
  import {mapGetters} from "vuex"
  export default  {
    computed:{
      ...mapGetters(['customerName','logUrl'])
    },
    filters:{
      hidePhone(val){
        if(isNaN(val)){
          return val;
        }else{
          val = val+"";
          return val.substring(0,3)+"****"+val.substring(7,100)
        }
      }
    }
  }
</script>
<style>
  [v-cloak]{
    display: none;
  }
</style>
