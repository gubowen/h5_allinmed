<template>
  <div style="width: 100%;height: 100%;background-color: #ffffff;">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <Loading v-if="$store.state.loading"></Loading>
  </div>
</template>
<script>
import Loading from "components/loading";

export default {
  data() {
    return {};
  },
  components: {
    Loading
  },
  mounted() {
    
  }
};
</script>

