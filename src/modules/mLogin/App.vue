<template>
  <div style="width: 100%;height: 100%">
    <navigation>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    </navigation>
    <Loading v-if="$store.state.loading"></Loading>
  </div>
</template>
<script>
  import Loading from "components/loading";

  export default {
    data() {
      return {}
    },
    components: {
      Loading
    },
    mounted() {
      this.$navigation.on('back', (to, from) => {
        alert(5)
      });
    }
  }
</script>

