<template>
  <section class="allinmed-personal-account">
    <section class="allinmed-personal-bindAccount">
      <section class="account-item border-bottom" @click.stop="bindWeixin">
        <span class="title">微信</span>
        <span class="operate">
          <em v-if="weixinName.length>0">{{weixinName}}</em>
          <a class="bind ev-bind-weixin" v-if="weixinName.length===0">去绑定</a>
          <!--<i class="jump"></i>-->
        </span>
      </section>
      <section class="account-item">
        <span class="title">手机</span>
        <span class="operate">
          <i class="phone-number">{{customerPhoneNum|hidePhone}}</i>
          <router-link tag="i" to='/changePhone' class="bind phone ev-bind-phone" @click.native="clearPhoneNum">更换</router-link>
        </span>
      </section>
    </section>
    <router-link class="allinmed-personal-changePsw" tag="section" :to="'/'+pswRouterLink">
      <span class="title">修改密码</span>
      <span class="jump"></span>
    </router-link>
  </section>

</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules.scss";
  .allinmed-personal-bindAccount{
    width: rem(610px);
    height: rem(318px);
    padding: 0 rem(48px);
    background:#fff;
    border-radius: rem(16px);
    margin:0 auto rem(20px) auto;
    .border-bottom{
      border-bottom: 2px solid #EAEAEA;
    }
    .account-item{
      width: rem(610px);
      padding: rem(60px) 0;
      height: rem(36px);
      .title{
      @include font-dpr(18px);
        color: #222222;
        line-height: rem(36px);
      }
      .operate{
        float: right;
        /*&> i,&> a{
           display: inline-block;
           vertical-align: middle;
         }*/
      em{
        font-style: normal;
        font-size: rem(28px);
        color: #AAAAAA;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        max-width: rem(164px);
        vertical-align: middle;
      }
      .phone-number{
      @include font-dpr(14px);
        color: #AAAAAA;
        line-height: rem(36px);
        margin-right: rem(12px);
        display:inline-block;
        vertical-align: middle;
      }
        .bind{
          color: #00BEAF;
          font-size: rem(28px);
          display:inline-block;
          vertical-align: middle;
        &.phone{
           width: rem(92px);
           height: rem(44px);
           border-radius: rem(200px);
           border: 1px solid #1ACAA7;
           line-height: rem(44px);
           text-align: center;
            display: inline-block;
         }
        }
        .jump{
          margin-left: rem(12px);
        }
      }

    }
  }
  .allinmed-personal-changePsw{
    padding: rem(62px) rem(48px);
    height: rem(36px);
    background:#fff;
    border-radius: rem(16px);
    .title{
     @include font-dpr(18px);
      color: #222222;

    }
  }
  .allinmed-personal-account{
    position: absolute;
    top: 0;
    left: rem(20px);
  }

</style>
<script  type="text/ecmascript-6">
  import {mapGetters,mapActions} from "vuex";
  import api from "common/js/util/util";
  export default  {
    computed:{
      ...mapGetters(['weixinName','customerPhoneNum','isExistPwd']),
      pswRouterLink(){
        return (this.isExistPwd)?"changePsw":"createPsw";
      }
    },
    methods:{
      ...mapActions(['changePhoneNum']),
      bindWeixin(){
        let t = this;
        if(t.weixinName.length){
          return false;
        }else{//当用户已经绑定过微信后，不用再跳转微信关注页
          t.$router.push({//当用户没有绑定过微信后，不用再跳转微信关注页
            path: "/followWechat"
          });
        }
        //console.log(this.weixinName);/*data.responseObject*/
      },
      clearPhoneNum(){
       this.changePhoneNum("");
      }
    },
    mounted(){
      api.forbidShare();
    },
    filters:{
      hidePhone(val){
        val = val+"";
        return val.substring(0,3)+"****"+val.substring(7,100)
      }
    }
  }
</script>
