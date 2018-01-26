<template>
  <section style="text-align:center">
    <input class="amed-switcher switcher-anim" type="checkbox" @click="ShowOff" :class="[
    'amed-switcher-'+ switcherColor,
    'amed-switcher-'+ switcherSize
    ]">
    <span v-show="!isShow" style="color:#2FC5BD">{{named}}</span>
    <span v-show="isShow" style="color:#2FC5BD">{{unnamed}}</span>
  </section>
</template>

<script>
  export default {
    name:'amed-switcher',
    data(){
      return{
        isShow:true,
        conclusion:""
      }
    },
    methods:{
      ShowOff:function(){
        this.isShow = !this.isShow
      },
      function(){
        if(('.switcher-anim').prop('checked')){
          conclusion="选中"
        }else{
          conclusion="未选中"
        }
        return conclusion
      }
    },
    props:{
      named:{
        type:String,
        default:"未选中"
      },
      unnamed:{
        type:String,
        default:"选中"
      },
      switcherSize:{
        style:String,
        default:"normal",
        validator(value){
          return[
            'large',
            'small'
          ].indexOf(value)>-1;
        }
      },
      switcherColor:{
        type:String,
        default:"green",
        validator(value){
          return[
            'green',
            'red',
          ].indexOf(value)>-1;
        }
      },

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";

  .amed-switcher {
    height: 28px;
    position: relative;
    border: 1px solid #dfdfdf;
    background-color: #fdfdfd;
    box-shadow: #dfdfdf 0 0 0 0 inset;
    border-radius: 20px;
    background-clip: content-box;
    display: inline-block;
    -webkit-appearance: none;
    user-select: none;
    outline: none;
    &-large{
      width: 100px;
    }
    &-small{
      width:57px;
    }

    .switcher:before {
      content: '';
      width: 26px;
      height: 26px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    .switcher:checked {
      &-green{
        border-color: #2FC5BD;
      }
      &-red{
        border-color: red;
      }
    }
    .switcher:checked:before {
      &-large{
        left:73px;
      }
      &-small{
        left: 30px;
      }
    }
    .switcher.switcher-anim {
      transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
    }
    .switcher.switcher-anim:before {
      transition: left 0.3s;
    }
    .switcher.switcher-anim:checked {
      transition: border ease 0.3s, box-shadow ease 0.4s, background-color ease 1.2s;
      &-green{
        box-shadow: #2FC5BD 0 0 0 16px inset;
        background-color: #2FC5BD;
      }
      &red{
        box-shadow: red 0 0 0 16px inset;
        background-color: red;
      }
    }
    .switcher.switcherswitcherswitcher-anim:checked:before {
      transition: left 0.3s;
    }
  }
</style>
