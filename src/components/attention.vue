<template>
  <section class="header" v-show="!showFlag">
        <div class="btn-close" @click="close()"></div>
        <div class="btn-attention" @click="attentionEvent">点击关注</div>
  </section>
</template>
<script>
export default{
    data(){
        return{
            showFlag:false

        }
    },
    methods:{
        init(){
          let  loginFlag = false;
          let  wxLoginFlag = false;

          //判断用户是否登录
          if(loginFlag){
            //判断用户是否绑定微信
            if(wxLoginFlag){
             this.showFlag = true;
            }
          }else {

          }
        },
        close(){
          this.showFlag = true;
        },
      attentionEvent(){
          alert("跳到关注页。")
      }
    },
    mounted(){
        this.init()
    }
}

</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../scss/library/_common-modules";

.header{
  height:rem(120px);
  background: #E7E7E7 url("../common/image/img00/index/bullet.png") no-repeat;
  width:100%;
  padding:rem(20px) rem(40px);
  box-sizing: border-box;
  position: relative;
  background-size: contain;
  margin-bottom:rem(20px) ;
  .btn-close{
      width:rem(28px);
      height:rem(28px);
      background:url("../common/image/img00/index/close.png") 100% 100% no-repeat ;
      margin:rem(28px) 0 0 0;
      background-size: contain;
  }
  .btn-attention{
    @include font-dpr(16px);
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0;
    line-height: rem(68px);
    width:rem(188px);
    height:rem(68px);
    background-image: linear-gradient(89deg, #31CFB3 42%, #2FB9B6 98%);
    box-shadow: 0 rem(12px) rem(24px) 0 rgba(48,153,141,0.57);
    border-radius: rem(200px);
    position:absolute;
    top:rem(22px);
    right:rem(24px);
  }
}
</style>
