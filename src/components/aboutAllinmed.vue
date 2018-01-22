<template>
  <section class="main-box">
    <div class="placeholder-ele"></div>
      <attention @attentionHandle="focusAllinmed"></attention>
    <section class="main-content">
      <h2 class="main-title">关于唯医互联网医院</h2>
      <p class="main-details">
        唯医互联网骨科医院隶属于唯医网，是中国首家骨科专科互联网医院，经国家卫计委批准，于2017年获得医疗机构执业许可证。 为全国骨科患者提供“线上问诊-线下手术-术后康复”的标准化流程服务。通过融合线上与线下，连接骨科患者、骨科医生、医院和药械厂商， 打造全新的骨科疾病诊疗模式。最大程度地帮助患者提升治疗效果、降低治疗成本、提升就医体验。
        唯医实体医院将于明年开始在全国各大城市落地，旨在提升中国骨科诊疗水平。
      </p>
      <button class="main-btn" @click='goConsult'>点击看病</button>
    </section>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by lichenyang on 2017/12/06.
   */
  import api from 'common/js/util/util';
  import attention from 'components/attention'
  export default{
    data(){
      return {
        consultUrl:'',
      }
    },
    methods: {
      focusAllinmed(){
        this.$router.push({path: '/followWechat'});
      },
      goConsult (e) {
        if (localStorage.getItem("userId")){
          // location.href = this.consultUrl;
          g_sps.jump(e.target,this.consultUrl); 
        }else{
          // window.location.href="/dist/mLogin.html";
          g_sps.jump(e.target,"/dist/mLogin.html"); 
        }

      }
    },
    mounted(){
      api.forbidShare();
      let userId = api.getPara().customerId || api.getPara().patientCustomerId || localStorage.getItem("userId");
      this.consultUrl = `/dist/consult.html?customerId=${userId}`;
    },
    components: {
      attention
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";
  .main-box{
    height: 100%;
    width: 100%;
    background: url("../common/image/background_wave.png") no-repeat center bottom;
    background-size: 100% rem(272px);
    .placeholder-ele{
      width: 100%;
      height: 1px;
    }
    .main-content{
      background: #FFFFFF;
      border-radius: rem(8px);
      padding-top: rem(50px);
      padding-bottom: rem(76px);
      margin: rem(24px) rem(20px) 0;
      .main-title{
        text-align: center;
        @include font-dpr(22px);
        color: #333333;
      }
      .main-details{
        @include font-dpr(16px);
        color: #888888;
        padding: rem(46px) rem(60px) 0;
      }
      .main-btn{
        display: block;
        width: rem(630px);
        height: rem(100px);
        line-height: rem(100px);
        background: #1ACAA7;
        box-shadow: 0 rem(6px) rem(12px) 0 #93E1D2;
        border-radius: rem(8px);
        @include font-dpr(18px);
        color: #FFFFFF;
        margin:rem(80px) auto 0;

      }
    }
  }
</style>
