<template>
    <div class="tc-articleDetails">
      <h2 class="tc-articlTitle">{{params.knowledgeName}}</h2>
      <section class="tc-articleMain" v-html="knowledgeContent"></section>
    </div>
</template>

<script type="text/ecmascript-6">
  /**
   * @Desc：患教知识详情
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Lichenyang on 17/9/4.
   */
  import api from 'common/js/util/util';
  const XHRList = {
    getTeachingDetail:"/mcall/comm/data/knowledge/content/v1/getMapById/"
  };
  export default{
    data(){
      return {
        params:{},//上一页传过来的参数
        knowledgeContent:''//文章详情
      }
    },
    activated(){
      console.log(this.$route.params);
      window.scrollTo(0,0);
      this.params = this.$route.params;
      this.knowledgeContent = '';
      this.initData();
    },
    mounted() {
      api.forbidShare();
    },
    computed: {

    },
    methods: {
      initData(){
        let that = this;
        api.ajax({
          url: XHRList.getTeachingDetail,
          method: "POST",
          data: {
            isValid:1,
            firstResult:0,
            maxResult:999,
            knowledgeId:that.$route.params.knowledgeId
          },
          beforeSend(){
          },
          done(data){
            if(data.responseObject.responseData.dataList){
              let items = data.responseObject.responseData.dataList[0];
              that.knowledgeContent = items.knowledgeContent
            }else{

            }
          }
        })
      },
    },
    components: {

    }
  };


</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .tc-articleDetails{
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding:0 rem(40px);
    box-sizing: border-box;
    background:#FFF;
    .tc-articlTitle{
      padding:rem(54px) 0 rem(40px) 0;
      @include font-dpr(20px);
      color: #222222;
      font-weight:normal;
    }
    .tc-articlOrigin{
      padding-top:rem(30px);
      @include font-dpr(14px);
      color: #979AA6;
      span{
        &:first-child{
          margin-right:rem(20px);
        }
      }
      &:before{
        display:block;
        width:rem(36px);
        height:1px;
        border-top:1px solid #ccc;
      }
    }
  }
  .tc-articleMain>p{
    padding-top:rem(56px);
    color:#444;
    @include font-dpr(16px);
    line-height:rem(46px);
  }
  .tc-articleMain>figure{
    padding-top:rem(56px);
    img{
      display:block;
      width:100%;
    }
    figcaption{
      margin-top:rem(24px);
      color:#aaa;
      text-align:center;
      @include font-dpr(13px);
    }
  }
</style>
