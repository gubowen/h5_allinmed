<template>
  <buttons></buttons>
  <!--<buttons :buttonStyle="'light'"></buttons>-->
  <!--<buttons :buttonStyle="'disable'"></buttons>-->
  <!--<buttons :buttonStyle="'warning'"></buttons>-->
  <!--<buttons :buttonSize="'large'" :buttonStyle="'light'"></buttons>-->
  <!--<buttons :buttonSize="'large'" :buttonStyle="'disable'"></buttons>-->
  <!--<buttons :buttonSize="'large'" :buttonStyle="'warning'"></buttons>-->
</template>
<script type="text/ecmascript-6">
  import api from "common/js/util/util";
  import buttons from "components/button/button";
  export default {
    data() {
      return {
        btnText:"点死我",
        btnSize:"large",
        btnStyle:"light"
      };
    },
    components: {
      buttons
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
</style>

