<template>
  <section v-if="payPopupShow">
    <transition name="fadeIn">
      <div class="mask_layer" v-if="payOrderShow">
        <div data-alcode-mod='721'>
          <div class="onlineVisit_mask">
            <section class="docNameBox">
              <span class="docName">{{getDocName()}}</span>提供的服务<i class="icon_close_mask" @click="closePopup"></i>
            </section>
            <section class="inquiryTypeBox">
              <h2 class="imgInquiry">
                <span>图文问诊</span>
                <span class="inquiryMoney">{{priceMessage.generalPrice}}元</span>
              </h2>
              <dl class="docAdvantage">
                <dt>服务保障</dt>
                <dd>本人回复</dd>
                <dd>超时退款</dd>
                <dd>权威认证医生</dd>
              </dl>
              <ul class="doxCando">
                <li>可获得{{priceMessage.generalTimes}}次医生答复</li>
                <li>医生48小时内未接诊全额退款</li>
                <li>问诊5天有效</li>
              </ul>
              <a data-alcode='e135' class="goPayment"
                 @click="goToPay({type:1,orderAmount:priceMessage.generalPrice,orderFrequency:priceMessage.generalTimes})">购买</a>
            </section>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadeIn">
      <confirm :confirmParams="{
          'ensure':'确定',
          'cancel':'取消',
          'content':'医生关闭了今天的问诊服务，暂不能为您提供帮助',
          'title':'今日暂不接诊'
          }" v-if="noStateShow" @cancelClickEvent="cancelEvent(1)" @ensureClickEvent="cancelEvent(1)">
      </confirm>
    </transition>
    <transition name="fadeIn">
      <confirm :confirmParams="{
          'ensure':'确定',
          'cancel':'取消',
//          'content':'医生今日的名额已全部预约 请改日再来',
          'title':'抱歉，该医生今天已经没有问诊名额了'
          }" v-if="noMoreShow" @cancelClickEvent="cancelEvent(2)" @ensureClickEvent="cancelEvent(2)">
      </confirm>
    </transition>
    <transition name="fadeIn">
      <confirm :confirmParams="{
          'ensure':'去沟通',
          'cancel':'取消',
          'title':'您与该医生有正在进行中的问诊服务，现在去继续沟通吗？'
          }" v-if="hasCommunShow" @cancelClickEvent="cancelEvent" @ensureClickEvent="ensureCommunEvent">
      </confirm>
    </transition>
    <transition name="fadeIn">
      <confirm :confirmParams="{
          'ensure':'支付成功',
          'cancel':'支付失败',
          'title':'请确认微信支付是否已经完成'
          }" v-if="noWXPayShow" @cancelClickEvent="closePopup()" @ensureClickEvent="viewPayResult()">
      </confirm>
    </transition>
    <loading v-if="finish"></loading>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/25.
   */
  import api from "common/js/util/util";
  import Vue from 'vue';
  import wxCommon from 'common/js/wxPay/wxComm';
  import confirm from 'components/confirm';
  import loading from 'components/loading';
  import siteSwitch from "common/js/siteSwitch/siteSwitch";

  const XHRList = {
    getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",//获取医生问诊价格及次数
    getConsultationId: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",//获取问诊Id
    getOrderDetails: "/mcall/cms/pay/order/v1/getMapById/",//获取订单详情
    getCurrentState: "/mcall/customer/advice/setting/v1/getCurrentByCustomerId/",//获取剩余人数和状态
  };
  export default {
    data() {
      return {
        mOrderAmount: "",
        mOrderType: "",
        mOrderFrequency: "",
        orderId:"",
        payOrderShow: false,
        noWXPayShow: false,
        noStateShow: false,
        noMoreShow: false,
        hasCommunShow: false,
        finish: false,
        priceMessage: {}
      }
    },
    mounted() {
      siteSwitch.weChatJudge(() => {
        console.log("这是微信呦")
      }, () => {
        localStorage.setItem("payDate", JSON.stringify(this.payPopupParams))
      });

      if (localStorage.getItem("payOk") == 1) {
        this.noWXPayShow = true;
      } else {
        this.noWXPayShow = false;
        this.toJudge({
          type: 0
        });
      }
    },
    methods: {
      //关闭支付弹层
      closePopup() {
        localStorage.removeItem("mOrder");
        localStorage.removeItem("payOk");
        this.$emit('update:payPopupShow', false);
      },
      //判断是否还有剩余名额
      toJudge(opt) {
        const that = this;
        api.ajax({
          url: XHRList.getCurrentState,
          method: "POST",
          data: {
            customerId: that.payPopupParams.docId,
            caseId: that.payPopupParams.caseId
          },
          done(data) {
            if (data && data.responseObject.responseData.dataList) {
              that.finish = false;
              const items = data.responseObject.responseData.dataList;
              if (items.state == 0) {
                that.noStateShow = true;
              } else if (items.remainNum <= 0 && items.remainNum != -1) {
                that.noMoreShow = true;
              } else if (items.conState == 1 && that.payPopupParams.from != "imDoctor") {
                that.hasCommunShow = true;
              } else {
                if (that.payPopupParams.payType == "free") {
                  that.freeToPay();
                } else {
                  if (opt.type == 0) {
                    that.payOrderShow = true;
                    that.getPrice();
                  } else {
                    that.noOrder(opt);
                  }
                }
              }
            }
          },
          fail() {
            that.finish = false;
          }
        });
      },
      //获取医生名字
      getDocName() {
        if (this.payPopupParams.docName.length > 6) {
          return this.payPopupParams.docName.substring(0, 6) + "..."
        } else {
          return this.payPopupParams.docName
        }
      },
      //获取问诊价格
      getPrice() {
        const that = this;
        api.ajax({
          url: XHRList.getVisitDetails,
          method: "POST",
          data: {
            customerId: that.payPopupParams.docId
          },
          done(data) {
            if (data.responseObject.responseData.dataList) {
              const dataList = data.responseObject.responseData.dataList[0];
              that.priceMessage = dataList;
            }
          },
        });
      },
      //去支付
      goToPay(opt) {
        const that = this;
        let isClick = 0;
        if (isClick == 0) {
          isClick = 1;
          let orderSourceTitle = "图文问诊",
            orderAmount = parseFloat(opt.orderAmount).toFixed(2);
          api.ajax({
            url: XHRList.getConsultationId,
            method: "post",
            data: {
              caseId: that.payPopupParams.caseId,
              customerId: that.payPopupParams.docId,
              isCreate: 1,
              isValid: 1,
              consultationType: 1,
              firstResult: 0,
              maxResult: 999
            },
            beforeSend() {
              that.finish = true;
            },
            done(data) {
              that.finish = false;
              if (data.responseObject.responseData.dataList) {
                let consultationId = data.responseObject.responseData.dataList.consultationId;
                sessionStorage.setItem("orderSourceId", consultationId);
                //是否有重复订单
                that.toJudge({
                  consultationId: consultationId,
                  orderSourceType: opt.type,
                  orderSourceTitle: orderSourceTitle,
                  orderAmount: orderAmount,
                  orderFrequency: opt.orderFrequency
                });
                isClick = 0;
              }
            },
            fail() {
              that.finish = false;
            }
          });
        }
      },
      //无重复订单去支付
      noOrder(opt) {
        const that = this;
        localStorage.setItem("docId", that.payPopupParams.docId);
        localStorage.setItem("mOrder", JSON.stringify({
          "mOrderType": opt.orderSourceType,
          "mOrderAmount": opt.orderAmount,
          "mOrderFrequency": opt.orderFrequency
        }));
        wxCommon.wxCreateOrder({
          isTest: 0,
          data: {
            caseId: that.payPopupParams.caseId,                //  string  是  caseId
            patientCustomerId: that.payPopupParams.patientCustomerId, //	string	是	患者所属用户id
            patientId: that.payPopupParams.patientId,         // 	string	是	患者id
            doctorId: that.payPopupParams.docId,          //	string	是	医生id
            orderType: 1,                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: opt.consultationId,     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
            orderSourceType: opt.orderSourceType,                //	string	是	来源类型  问诊：1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
            orderAmount: opt.orderAmount,                  //	string	否	订单金额  （单位/元 保留两位小数）
            status: '1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
            body: "图文问诊",   //   string  否  订单描述 （微信支付展示用）
            isCharge: "true"                    //   string  是  true-收费  false-免费
          },
          backCreateSuccess: function (_data) {
            //创建订单成功  （手术必选）
            localStorage.setItem("orderId",_data);
          },
          backCreateError: function (_data) {
            //创建订单失败  (必选)
          },
          wxPaySuccess: function (_data) {
            //支付成功回调  (问诊/门诊类型 必选)
            that.$emit("paySuccess", {
              orderType: opt.orderSourceType,//0免费，其他不是
              orderAmount: opt.orderAmount, //价钱
              orderFrequency: opt.orderFrequency//聊天次数
            });
            that.closePopup();
          },
          wxPayError: function (_data) {
            //支付失败回调  (问诊/门诊类型 必选);
            window.location.reload();
          }
        });
      },
      //提示弹层关闭执行
      cancelEvent(_type) {
        this.noStateShow = false;
        this.noMoreShow = false;
        this.hasCommunShow = false;
        this.closePopup();
        if (this.payPopupParams.from == "docMain") {
          this.$emit('docCallBack', _type);
        }
      },
      ensureCommunEvent() {
        window.location.href = `/dist/imSceneDoctor.html?caseId=${this.payPopupParams.caseId}&doctorCustomerId=${this.payPopupParams.docId}&patientCustomerId=${this.payPopupParams.patientCustomerId}&patientId=${this.payPopupParams.patientId}`
      },
      //免费直接支付
      freeToPay() {
        const that = this;
        api.ajax({
          url: XHRList.getConsultationId,
          method: "post",
          data: {
            caseId: that.payPopupParams.caseId,
            customerId: that.payPopupParams.docId,
            isCreate: 1,
            isValid: 1,
            consultationType: 1,
            firstResult: 0,
            maxResult: 999
          },
          done(data) {
            if (data.responseObject.responseData.dataList) {
              let consultationId = data.responseObject.responseData.dataList.consultationId;
              localStorage.setItem("docId", that.payPopupParams.docId);
              sessionStorage.setItem("orderSourceId", consultationId);
              wxCommon.wxCreateOrder({
                isTest: 0,
                data: {
                  caseId: that.payPopupParams.caseId,                //  string  是  caseId
                  patientCustomerId: that.payPopupParams.patientCustomerId, //	string	是	患者所属用户id
                  patientId: that.payPopupParams.patientId,         // 	string	是	患者id
                  doctorId: that.payPopupParams.docId,          //	string	是	医生id
                  orderType: 1,     //	string	是	订单类型  1-咨询2-手术3-门诊预约
                  orderSourceId: consultationId,                   //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
                  orderSourceType: 0,               //	string	是	来源类型  问诊：1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
                  orderAmount: 0,                           //	string	否	订单金额  （单位/元 保留两位小数）
                  status: '2',                              //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
                  body: '免费问诊',                          //    string  否  订单描述 （微信支付展示用）
                  isCharge: "false"                         //    string  是  true-收费  false-免费
                },
                backCreateSuccess: function (_data) {
                  that.creatInquiryId(_data);
                },
                backCreateError: function (_data) {
                  //创建订单失败  (必选)
                },
                wxPaySuccess: function (_data) {
                  //支付成功回调  (问诊/门诊类型 必选)
                },
                wxPayError: function (_data) {
                  //支付失败回调  (问诊/门诊类型 必选)
                  window.location.reload();
                }
              });
            }
          }
        })
      },
      //免费咨询支付成功后创建问诊id
      creatInquiryId(orderId) {
        let that = this;
        //获取是否已经存在问诊id
        api.ajax({
          url: "/mcall/customer/case/consultation/v1/getMapById/",
          method: "POST",
          data: {
            caseId: that.payPopupParams.caseId,
            customerId: that.payPopupParams.docId,
            consultationType: 1,
            siteId: api.getSiteId()
          },
          done(data) {
            if (data.responseObject.responseMessage == "NO DATA") {
              api.ajax({
                url: "/mcall/customer/case/consultation/v1/create/",
                method: "POST",
                data: {
                  caseId: that.payPopupParams.caseId,
                  customerId: that.payPopupParams.docId,
                  patientCustomerId: that.payPopupParams.patientCustomerId,
                  patientId: that.payPopupParams.patientId,
                  consultationType: 1,
                  consultationState: -1,
                  consultationLevel: 0,
                  siteId: api.getSiteId(),
                  caseType: 0
                },
                done(d) {
                  if (d.responseObject.responseStatus) {
                    let orderSourceId = d.responseObject.responsePk;
                    localStorage.removeItem("docId");
                    sessionStorage.setItem("orderSourceId", orderSourceId);
                    wxCommon.wxUpOrder({
                      operationType: "2",
                      orderId: orderId,
                      orderType: "1",
                      orderSourceId: orderSourceId,
                      outTradeNo: "",
                      status: '2',
                      payTime: '1',
                      callBack: function (data) {
                        that.$emit("paySuccess", {
                          orderType: 0,
                          orderAmount: 0,
                          orderFrequency: 3
                        });
                      }
                    });
                  }
                }
              });
            } else {
              that.$emit("paySuccess", {
                orderType: 0,
                orderAmount: 0,
                orderFrequency: 3
              });
            }
          }
        });
      },
      //查看m站支付结果
      viewPayResult() {
        let that = this;
        wxCommon.PayResult({
          outTradeNo: localStorage.getItem("orderNumber")       //微信订单号
        }).then(function (data) {
          console.log("查看回调", data);
          let payDate = JSON.parse(localStorage.getItem("payDate")),
            mOrder = JSON.parse(localStorage.getItem("mOrder"));

          if (data.resultCode == "SUCCESS") {
            api.ajax({
              url: "/mcall/customer/case/consultation/v1/getMapById/",
              method: "POST",
              data: {
                caseId: payDate.caseId,
                customerId: payDate.docId,
                consultationType: 1
              },
              done(data) {
                if (data.responseObject.responseMessage == "NO DATA") {
                  api.ajax({
                    url: "/mcall/customer/case/consultation/v1/create/",
                    method: "POST",
                    data: {
                      caseId: payDate.caseId,
                      customerId: payDate.docId,
                      patientCustomerId: payDate.patientCustomerId,
                      patientId: payDate.patientId,
                      consultationType: 1,
                      consultationState: -1,
                      consultationLevel: 1,
                      caseType: 0
                    },
                    done(d) {
                      if (d.responseObject.responseStatus) {
                        sessionStorage.setItem("orderSourceId", d.responseObject.responsePk);
                        that.upDateStatus({
                          osId:d.responseObject.responsePk,
                          callBack:function () {
                            that.$emit("paySuccess", {
                              orderType: mOrder.mOrderType,//0免费，其他不是
                              orderAmount: mOrder.mOrderAmount, //价钱
                              orderFrequency: mOrder.mOrderFrequency//聊天次数
                            });
                            that.closePopup();
                          }
                        });
                      }
                    }
                  });
                } else {
                  console.log(111);
                  that.upDateStatus({
                    osId:localStorage.getItem("orderSourceId"),
                    callBack:function () {
                      that.$emit("paySuccess", {
                        orderType: mOrder.mOrderType,//0免费，其他不是
                        orderAmount: mOrder.mOrderAmount, //价钱
                        orderFrequency: mOrder.mOrderFrequency//聊天次数
                      });
                      that.closePopup();
                    }
                  });
                }
              }
            });
          } else {
            console.log("未支付成功");
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      //更新订单状态
      upDateStatus(obj){
        let that =this;
        console.log(222);
        api.ajax({
          url:'/mcall/cms/pay/order/v1/update/',
          method: "POST",
          data:{
            operationType: '2',                                    //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
            orderId: localStorage.getItem("orderId"),                                  // 订单ID
            outTradeNo: localStorage.getItem("orderNumber"),
            orderType: "1",                                         //订单类型  2-手术 3-门诊
            orderSourceId: obj.osId,                                    // 订单资源ID
            status: '2',                                           //1-待支付2-已支付3-已完成4-已取消5-退款中6-支付超时7-退款完成8-退款失败',
          },
          done(data){
            console.log("订单已更新……")
            obj.callBack();
          }
        });
      }
    },
    props: {
      payPopupShow: {
        type: Boolean
      },
      payPopupParams: {
        type: Object
      }
    },
    components: {
      confirm,
      loading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../scss/library/_common-modules";

  .mask_layer {
    width: 100%;
    background: rgba(0, 0, 0, 0.50);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    .onlineVisit_mask {
      width: 100%;
      height: auto;
      background: #ffffff;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 5;
      .docNameBox {
        @include clearfix();
        padding: 0 rem(40px) 0 rem(60px);
        line-height: rem(80px);
        background: #70859F;
        color: #C1D0E0;
        @include font-dpr(12px);
        .docName {
          margin-right: rem(16px);
          font-weight: bold;
          opacity: 0.8;
          @include font-dpr(16px);
        }
        .icon_close_mask {
          float: right;
          margin-top: rem(20px);
          width: rem(36px);
          height: rem(36px);
          background: url("../common/image/img00/doctorMain/pay_close@2x.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
      .inquiryTypeBox {
        padding: rem(40px) rem(60px) rem(50px);
        .imgInquiry {
          @include font-dpr(20px);
          color: #525252;
          .inquiryMoney {
            @include font-dpr(18px);
            margin-left: rem(26px);
          }
        }
        .docAdvantage {
          padding-top: rem(24px);
          @include font-dpr(14px);
          color: #FA787A;
          dt {
            display: inline-block;
            vertical-align: middle;
          }
          dd {
            display: inline-block;
            position: relative;
            margin-left: rem(15px);
            vertical-align: middle;
            &:before {
              background: #828282;
              display: inline-block;
              position: absolute;
              content: "";
              width: rem(6px);
              height: rem(6px);
              border-radius: 50%;
              top: 50%;
              margin-top: rem(-3px);
              left: rem(-12px);
            }
          }
        }
        .doxCando {
          padding-top: rem(20px);
          li {
            margin-top: rem(20px);
            color: #555555;
            @include font-dpr(16px);
            opacity: 0.8;
            position: relative;
            &:before {
              display: inline-block;
              content: "";
              position: absolute;
              margin-right: rem(12px);
              width: rem(12px);
              height: rem(12px);
              border-radius: 50%;
              background: url("../common/image/img00/doctorHome/Oval 8 Copy 14@2x.png") no-repeat center;
              background-size: rem(8px) rem(8px);
              top: 50%;
              left: rem(-20px);
              margin-top: rem(-6px);
            }
          }
        }
        .goPayment {
          display: block;
          width: rem(570px);
          line-height: rem(88px);
          @include font-dpr(18px);
          color: #fff;
          text-align: center;
          background: #2FC5BD;
          border-radius: 100px;
          margin: rem(50px) auto 0;
        }
      }
    }
  }

  .fadeUp-enter-active, .fadeUp-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .fadeUp-enter, .fadeUp-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }

  .fadeIn-enter-active, .fadeIn-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .fadeIn-enter, .fadeIn-leave-to {
    opacity: 0;
  }
</style>
