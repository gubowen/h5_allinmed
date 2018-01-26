<template>
  <section>

  </section>
</template>
<script type="text/ecmascript-6">

  import switcher from"components/switch/switch";
  export default {
    data(){
      return{
        named:"对",
        unnamed:"不对",
        switcherSize:large,
        switcherColor:ren
      }
    },
    components:{
      switcher
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
</style>
