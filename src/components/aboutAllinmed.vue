<template>
  <section class="main-box">
    <div class="placeholder-ele"></div>
    <attention></attention>
    <section class="main-content">
      <h2 class="main-title">关于唯医互联网医院</h2>
      <p class="main-details">
        唯医互联网骨科医院隶属于唯医网，是中国首家骨科专家互联网医院，经国家卫计委批准，于2017年获得医疗机构执业许可证。<br/>
        为全国骨科患者提供“线上问诊-线下手术-术后康复”的标准话流程服务，通过融合线上线下，连接骨科患者，骨科医生，医院和药械厂商，打造全新的骨科疾病诊疗模式。最大程度的帮助患者提升治疗效果，降低治疗成本，提升就医体验。<br/>
        唯医实体医院将于明年开始在全国各大城市落地，未来，唯医将打造中国顶尖骨科专家医院以及包括康复中心。
      </p>
      <button class="main-btn" @click='goConsult()'>点击看病</button>
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
      goConsult () {
        location.href = this.consultUrl;
      }
    },
    mounted(){
      let userId = api.getPara().customerId || api.getPara().patientCustomerId;
      this.consultUrl = `./consult.html?customerId=${userId}`;
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
