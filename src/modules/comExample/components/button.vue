<template>
  <ul>
    <li><buttons></buttons></li>
    <li><buttons buttonStyle="disable"></buttons></li>
    <li><buttons buttonStyle="warning"></buttons></li>
    <li><buttons buttonSize="large" buttonStyle="light"></buttons></li>
    <li><buttons buttonSize="large" buttonStyle="disable"></buttons></li>
    <li><buttons buttonSize="large" buttonStyle="warning"></buttons></li>
    <li><buttons buttonSize="small" buttonStyle="light"></buttons></li>
    <li><buttons buttonSize="small" buttonStyle="disable"></buttons></li>
    <li><buttons buttonSize="small" buttonStyle="warning"></buttons></li>
  </ul>
</template>
<script type="text/ecmascript-6">
  import api from "common/js/util/util";
  import buttons from "components/button/button";
  export default {
    data() {
      return {};
    },
    components: {
      buttons
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  ul li{
    margin:rem(20px) 0;
  }
</style>
