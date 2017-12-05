<template>
  <footer class="tabbar-box">
    <a href="" class="tabbar-list">
      <dl class="tabbar-item">
          <dt class="tabbar-icon"></dt>
          <dd class="tabbar-des">首页</dd>
      </dl>
    </a>
    <a href="" class="tabbar-list">
      <dl class="tabbar-item">
          <dt class="tabbar-icon"></dt>
          <dd class="tabbar-des">问诊历史</dd>
      </dl>
    </a>
    <a href="" class="tabbar-list">
      <dl class="tabbar-item">
          <dt class="tabbar-icon"></dt>
          <dd class="tabbar-des">我的</dd>
      </dl>
    </a>
  </footer>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/7/24.
   */
  export default{
    data(){
      return {}
    },
    mounted(){
      console.log()
    },
    props: {
      content: {
        type: String
      },
      imgUrl: {
        type: String
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  

</style>