<template>
  <div style="width: 100%;height: 100%;">
    <router-view></router-view>
    <Loading v-if="$store.state.loading"></Loading>
  </div>
</template>
<script>
import Loading from "components/loading";
export default {
  data(){
    return {

    }
  },
  components:{
    Loading
  }
}
</script>

