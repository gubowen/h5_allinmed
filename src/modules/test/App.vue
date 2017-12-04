<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <!-- <p class="H-pay" @click="askH5Pay()">H5支付</p>
    <p class="H-viewPay" v-if="payShow" @click="payHide">支付成功</p>
    <p class="uploadPic" @click="upload()">上传图片</p> -->
  </div>
</template>
<script type="text/ecmascript-6">
import fb from "common/js/third-party/flexible";
import WxPayCommon from "../../common/js/wxPay/wxComm";
// import uploadList from "../../components/uploadList";
export default {
  data() {
    return {
      payShow: false
    };
  },
  mounted() {
    if (localStorage.getItem("askPay") == 1) {
      this.payShow = true;
      this.viewResultH5Pay();
    }
  },
  methods: {
    upload() {
      this.$router.push({
        name: "uploadPic",
        // params: {
        //   hisPicLists: hisPicLists,
        //   caseId: opt.caseId,
        //   consultationId: opt.consultationId,
        //   from: that.$route.name
        // },
        // query: that.$route.query
      });
    },
    askH5Pay() {
      console.log("============H5支付啊===========");
      let data = {
        caseId: "1509972059074", //  string  是  caseId
        patientCustomerId: "1489998682602", //	string	是	患者所属用户id
        patientId: "1491471348694", // 	string	是	患者id
        doctorId: "1234567890123", //	string	是	医生id
        orderType: "1", //	string	是	订单类型  1-咨询2-手术3-门诊预约
        orderSourceId: "1493697450391", //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
        orderSourceType: "1", //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
        orderAmount: 0.01, //	string	否	订单金额  （单位/元 保留两位小数）
        status: "1", //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
        body: "Test支付", //   string  否  订单描述 （微信支付展示用）
        isCharge: "true" //   string  是  true-收费  false-免费
      };
      WxPayCommon.wxCreateOrder({
        data: data, //data为Object 参考下面给出格式
        backCreateSuccess: function(_data) {
          //创建订单成功  （手术必选）
        },
        backCreateError: function(_data) {
          //创建订单失败  (必选)
        },
        wxPaySuccess: function(_data) {
          //支付成功回调  (问诊/门诊类型 必选)
        },
        wxPayError: function(_data) {
          //支付失败回调  (问诊/门诊类型 必选)
        }
      });
    },
    viewResultH5Pay() {
      console.log("H5支付结果查看");
      WxPayCommon.PayResult({
        outTradeNo: localStorage.getItem("orderNumber") //微信订单号
      })
        .then(function(data) {
          console.log("查看回调", data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    payHide() {
      localStorage.removeItem("askPay");
      this.payShow = false;
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../scss/library/_common-modules";
.H-pay {
  @include font-dpr(40px);
  background: #5dbdce;
  opacity: 0.8;
  -webkit-border-radius: rem(20px);
  -moz-border-radius: rem(20px);
  border-radius: rem(20px);
  text-align: center;
  padding: rem(20px) 0;
  /*margin: auto rem(50px);*/
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: rem(-300px);
  margin-top: rem(-146px);
  width: rem(600px);
}
.H-viewPay {
  @include font-dpr(40px);
  background: #5dbdce;
  opacity: 0.8;
  -webkit-border-radius: rem(20px);
  -moz-border-radius: rem(20px);
  border-radius: rem(20px);
  text-align: center;
  padding: rem(20px) 0;
  /*margin: auto rem(50px);*/
  position: fixed;
  top: 45%;
  left: 50%;
  margin-left: rem(-300px);
  width: rem(600px);
}
.uploadPic {
  text-align: center;
  @include font-dpr(16px);
  padding: rem(20px);
  background: #5dbdce;
}
</style>

