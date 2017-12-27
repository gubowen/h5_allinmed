<template>
  <section class="al-mainInner">
    <feedback></feedback>
  </section>
</template>

<script>
  import feedback from "./components/feedback.vue"

  export default {
    data(){
      return {
      }
    },
    components:{
      feedback
    }
  }
</script>

<style rel="stylesheet" lang="scss">
  @import "../../../scss/library/_common-modules.scss";
  .al-mainInner{
    top:0;
    min-height: 100%;
    height:auto;
  }
</style>
