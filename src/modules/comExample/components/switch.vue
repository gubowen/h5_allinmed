<template>
  <section style="text-align:center">
    <input class="switch switch-anim" type="checkbox" @click="ShowOff">
    <span v-show="!isShow" style="color:#2FC5BD">选中</span>
    <span v-show="isShow" style="color:#2FC5BD">未选中</span>
  </section>
</template>

<script>
  export default {
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
        if(('.switch-anim').prop('checked')){
          conclusion="选中"
        }else{
          conclusion="未选中"
        }
        return conclusion
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .switch {
    text-align: center;
    width: 57px;
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
  }
  .switch:before {
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
  .switch:checked {
    border-color: #2FC5BD;
    box-shadow: #2FC5BD 0 0 0 16px inset;
    background-color: #2FC5BD;
  }
  .switch:checked:before {
    left: 30px;
  }
  .switch.switch-anim {
    transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
  }
  .switch.switch-anim:before {
    transition: left 0.3s;
  }
  .switch.switch-anim:checked {
    box-shadow: #2FC5BD 0 0 0 16px inset;
    background-color: #2FC5BD;
    transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
  }
  .switch.switch-anim:checked:before {
    transition: left 0.3s;
  }
</style>
