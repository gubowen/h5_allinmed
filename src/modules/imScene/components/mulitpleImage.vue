<template>
     <section class="main-message-box">
          <article
            class="main-message-box-item my-message"
            :data-clientid="imageMessage.idClient">

      <i class="fail-button" style="display:none">
        <img src="../../../common/image/imScene/error_tips.png" alt="">
      </i>
      <figcaption class="main-message-content">
        <!-- <transition name="fade">
          <span class="delete-msg-btn" @click.stop="deleteMsgEvent" v-if="currentIndex===deleteMsgIndex&&showDeleteMsg&&contentMessage.from===userData.account">撤回</span>
        </transition> -->
        <section class="mulitple-image-box">
            <figure class="mulitple-image" v-for="item in imageList">
                <img :src="item.url" alt="">
            </figure>
        </section>
      </figcaption>
      
      <figure class="main-message-img" v-if="imageMessage.from===userData.account">
        <img :src="logoUrl" alt="">
      </figure>
    </article>
     </section>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
      return{
        imageList:[]
      }
  },
  components: {},
  methods: {},
  mounted() {
      this.imageList=JSON.parse(this.imageMessage.content).data.list;

    console.log(JSON.parse(this.imageMessage.content));
  },
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    }
  },
  props: {
    imageMessage: {
      type: Object,
      default: {}
    },
    targetData: {
      type: Object
    },
    userData: {
      type: Object
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
