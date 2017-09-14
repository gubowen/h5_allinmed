<template>
  <section>
    <transition name="fadeUp">
      <div class="mask_layer" v-if="payPopupShow">
        <swiper :options="swiperOption" ref="mySwiper" class="onlineVisit_mask">
          <!-- slides -->
          <swiper-slide>
            <div class="swiper-zoom-container">
              <h2 class="moudle_title"><span>网上问诊</span><i class="icon_close_mask" @click="closePopup"></i></h2>
              <p class="visit_tiny_tip">提示：急重症患者不适合网上咨询，请前往当地医院问诊</p>
              <h3 class="inquiryType inquiryType_normal">普通问诊<span>{{priceMessage.generalPrice}}元</span></h3>
              <ul class="dox_cando">
                <li>可获得{{priceMessage.generalTimes}}次医生答复</li>
                <li>医生48小时内未接诊全额退款</li>
              </ul>
              <figure class="why_charge">
                <figcaption @click="openChargeReason(1)">为什么收费</figcaption>
                <section class="charge_reason" v-show="showFlag.item1">
                  医生利用自己的休息时间为您进行医疗服务，让您避免盲目跑医院，减少交通等待时间及花费，足不出户也可以得到医生建议。医生按劳取酬，让付出更有价值，让贴心贴心服务，温暖如影随形。
                </section>
              </figure>
              <a class="go_payment" @click="goToPay({
                                                                                          type:1,
                                                                                          orderAmount:priceMessage.generalPrice,
                                                                                          orderFrequency:priceMessage.generalTimes})">去支付</a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <h2 class="moudle_title"><span>网上问诊</span><i class="icon_close_mask" @click="closePopup"></i></h2>
              <p class="visit_tiny_tip">提示：急重症患者不适合网上咨询，请前往当地医院问诊</p>
              <h3 class="inquiryType inquiryType_special">特需问诊<span>{{priceMessage.vipPrice}}元</span></h3>
              <ul class="dox_cando">
                <li>可获得{{priceMessage.vipTimes}}次医生答复</li>
                <li>医生12小时内未接诊全额退款</li>
              </ul>
              <figure class="why_charge">
                <figcaption @click="openChargeReason(2)">为什么收费</figcaption>
                <section class="charge_reason" v-show="showFlag.item2">
                  医生利用自己的休息时间为您进行医疗服务，让您避免盲目跑医院，减少交通等待时间及花费，足不出户也可以得到医生建议。医生按劳取酬，让付出更有价值，让贴心贴心服务，温暖如影随形。
                </section>
              </figure>
              <a class="go_payment" @click="goToPay({type:3,
                                                                                        orderAmount:priceMessage.vipPrice,
                                                                                        orderFrequency:priceMessage.vipTimes,
                                                                                        })">去支付</a>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <h2 class="moudle_title"><span>网上问诊</span><i class="icon_close_mask" @click="closePopup"></i></h2>
              <p class="visit_tiny_tip">提示：急重症患者不适合网上咨询，请前往当地医院问诊</p>
              <h3 class="inquiryType inquiryType_urgent">免费问诊<span class="freeQuestion_icon"></span></h3>
              <ul class="dox_cando">
                <li>患者拥有一次免费问诊机会，可获得3次医生答复</li>
              </ul>
              <figure class="why_charge">
                <figcaption @click="openChargeReason(3)">为什么收费</figcaption>
                <section class="charge_reason" v-show="showFlag.item3">
                  医生利用自己的休息时间为您进行医疗服务，让您避免盲目跑医院，减少交通等待时间及花费，足不出户也可以得到医生建议。医生按劳取酬，让付出更有价值，让贴心贴心服务，温暖如影随形。'
                </section>
              </figure>
              <a class="go_payment" @click="goToPay({type:0})" v-if="isHasFree != 0">去支付</a>
              <a class="go_payment forbid" v-else-if="isHasFree == 0">已使用</a>
            </div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
          <!--<div class="swiper-button-next" slot="button-next"></div>-->
          <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
      </div>

    </transition>
    <transition name="fade">
      <confirm :confirmParams="{
          'ensure':'去支付',
          'cancel':'取消',
          'content':'您有一份相同订单尚未过期，确定完成支付吗？'
          }" v-if="levelShow" :showFlag.sync="levelShow" @cancelClickEvent="cancelEvent" @ensureClickEvent="ensureEvent">
      </confirm>
    </transition>
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
  import VueAwesomeSwiper from 'vue-awesome-swiper';
  import wxCommon from 'common/js/wxPay/wxComm';
  import confirm from 'components/confirm';

  // mount with global
  Vue.use(VueAwesomeSwiper);
  const XHRList = {
    getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",//获取医生问诊价格及次数
    getConsultationId: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",//获取问诊Id
    getOrderDetails: "/mcall/cms/pay/order/v1/getMapById/"//获取订单详情
  };
  export default{
    name: 'carrousel',
    data() {
      return {
        repeatOrderTitle: "",
        repeatOrderId: "",
        repeatConsultationId: "",
        repeatOrderAmount: "",
        repeatOrderType:"",
        repeatOrderFrequency:"",
        isHasFree: "1",
        levelShow: false,
        chargeReason: false,
        priceMessage: {},
        showFlag: {
          item1: false,
          item2: false,
          item3: false
        },
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 0,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          zoom: true,
//          zoomToggle :false,
          autoHeight: true,
          pagination: '.swiper-pagination',
//          paginationType: 'fraction',
          paginationClickable: true,
//          prevButton:'.swiper-button-prev',
//          nextButton:'.swiper-button-next',
//          scrollbar:'.swiper-scrollbar',
          mousewheelControl: true,
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
//            console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted(){
      this.getPrice();
      this.isHasFreeChat();
    },
    methods: {
      openChargeReason(index){
          this.showFlag["item"+index]=!this.showFlag["item"+index]
      },
      closePopup(){
        this.$emit('update:payPopupShow', false);
      },
      //判断是否已经创建过免费聊天
      isHasFreeChat(){
        const that = this;
        api.ajax({
          url: XHRList.getConsultationId,
          method: "post",
          data: {
            caseId: api.getPara().caseId,
            customerId: api.getPara().doctorCustomerId,
            isCreate: 1,
            isValid: 1,
            consultationType: 1,
            firstResult: 0,
            maxResult: 999
          },
          dataType: "json",
          done(data) {
            if (data.responseObject.responseData.dataList) {
              if (data.responseObject.responseData.dataList.consultationId) {//已经创建过问诊
                let _consultationId = data.responseObject.responseData.dataList.consultationId;
                api.ajax({
                  url: XHRList.getOrderDetails,
                  method: "POST",
                  data: {
                    patientId: api.getPara().patientId,
                    doctorId: api.getPara().doctorCustomerId,
                    orderType: 1,
                    orderSourceId: _consultationId,
                    orderSourceType: 0,
                    sortType: 2
                  },
                  done(data){
                    if (data.responseObject.responseData.dataList) {
                      let orderAmount = data.responseObject.responseData.dataList[0].orderAmount;
                      if (orderAmount == 0) {
                        that.isHasFree = 0;
                      }
                    }
                  }
                })
              }
            }
          }
        })
      },
      //获取问诊价格
      getPrice(){
        const that = this;
        api.ajax({
          url: XHRList.getVisitDetails,
          method: "POST",
          data: {
            customerId: api.getPara().doctorCustomerId
          },
          beforeSend: function () {

          },
          done (data) {
            if (data.responseObject.responseData.dataList) {
              const dataList = data.responseObject.responseData.dataList[0];
              that.priceMessage = dataList;
            }
          },
        });
      },
      //去支付
      goToPay(opt){
        const that = this;
        let isClick = 0;
        if(isClick == 0){
          isClick = 1;
          that.repeatOrderFrequency = opt.orderFrequency;
          let orderSourceTitle = "",
            orderAmount = parseFloat(opt.orderAmount).toFixed(2);
          switch (parseInt(opt.type)) {
            case 1:
              orderSourceTitle = "普通问诊";
              break;
            case 3:
              orderSourceTitle = "特需问诊";
              break;
          }
          api.ajax({
            url: XHRList.getConsultationId,
            method: "post",
            data: {
              caseId: api.getPara().caseId,
              customerId: api.getPara().doctorCustomerId,
              isCreate: 1,
              isValid: 1,
              consultationType: 1,
              firstResult: 0,
              maxResult: 999
            },
            done (data) {
              if (data.responseObject.responseData.dataList) {
                let consultationId = data.responseObject.responseData.dataList.consultationId;
                sessionStorage.setItem("orderSourceId", consultationId);
                //是否有重复订单
                that.isHasOrder({
                  consultationId: consultationId,
                  orderSourceType: opt.type,
                  orderSourceTitle: orderSourceTitle,
                  orderAmount: orderAmount,
                  orderFrequency:opt.orderFrequency
                });
                isClick = 0;
              }
            }
          })
        }
      },
      //是否有重复订单
      isHasOrder(opt){
        const that = this;
        api.ajax({
          url: XHRList.getOrderDetails,
          method: "POST",
          data: {
            patientId: api.getPara().patientId,
            doctorId: api.getPara().doctorCustomerId,
            orderType: 1,
            orderSourceId: opt.consultationId,
            status: 1,
            sortType: 1,
            firstResult: 0,
            maxResult: 1
          },
          done(data){
            if (data.responseObject.responseData.dataList) {
              let items = data.responseObject.responseData.dataList[0];
              if (items.orderSourceId && items.orderSourceId != 0 && opt.orderSourceType == items.orderSourceType) {//有重复订单
                //支付弹层removeClass
                that.closePopup();
                that.repeatOrderId = items.orderId;
                that.repeatConsultationId = items.orderSourceId;
                that.repeatOrderAmount = items.orderAmount;
                that.repeatOrderType = items.orderSourceType;
                debugger;
                switch (Number(items.orderSourceType)) {
                  case 1:
                    that.repeatOrderTitle = "普通问诊";
                    break;
                  case 3:
                    that.repeatOrderTitle = "特需问诊";
                    break;
                }
                that.levelShow = true;
              } else {//没有重复订单
                that.noOrder({
                  cId: opt.consultationId,
                  oType: opt.orderSourceType,
                  oTitle: opt.orderSourceTitle,
                  orderAmount: opt.orderAmount,
                  orderFrequency:opt.orderFrequency
                })
              }
            } else {//没有重复订单
              that.noOrder({
                cId: opt.consultationId,
                oType: opt.orderSourceType,
                oTitle: opt.orderSourceTitle,
                orderAmount: opt.orderAmount,
                orderFrequency:opt.orderFrequency
              })
            }
          }

        })
      },
      //无重复订单去支付
      noOrder(opt){
        const that = this;
        console.log(opt)
        if (opt.oType == 0) {
          wxCommon.wxCreateOrder({
            isTest:0,
            data: {
              caseId: api.getPara().caseId,                       //    string  是  caseId
              patientCustomerId: api.getPara().patientCustomerId, //	string	是	患者所属用户id
              patientId: api.getPara().patientId,                 // 	string	是	患者id
              doctorId: api.getPara().doctorCustomerId,                   //	string	是	医生id
              orderType: 1,     //	string	是	订单类型  1-咨询2-手术3-门诊预约
              orderSourceId: opt.cId,                   //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
              orderSourceType: 0,               //	string	是	来源类型  问诊：1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
              orderAmount: 0,                           //	string	否	订单金额  （单位/元 保留两位小数）
              status: '2',                              //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
              body: '免费问诊',                          //    string  否  订单描述 （微信支付展示用）
              isCharge: "false"                         //    string  是  true-收费  false-免费
            },
            backCreateSuccess: function (_data) {
              that.$emit("paySuccess", {
                orderType: 0,
                orderAmount: 0,
                orderFrequency:3
              });
              that.closePopup();
            },
            backCreateError: function (_data) {
              //创建订单失败  (必选)
            },
            wxPaySuccess: function (_data) {
              //支付成功回调  (问诊/门诊类型 必选)
            },
            wxPayError: function (_data) {
              //支付失败回调  (问诊/门诊类型 必选)

            }
          });
        } else {
          wxCommon.wxCreateOrder({
            isTest:0,
            data: {
              caseId: api.getPara().caseId,                //  string  是  caseId
              patientCustomerId: api.getPara().patientCustomerId, //	string	是	患者所属用户id
              patientId: api.getPara().patientId,         // 	string	是	患者id
              doctorId: api.getPara().doctorCustomerId,          //	string	是	医生id
              orderType: 1,                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
              orderSourceId: opt.cId,     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
              orderSourceType: opt.oType,                //	string	是	来源类型  问诊：1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
              orderAmount: opt.orderAmount,                  //	string	否	订单金额  （单位/元 保留两位小数）$(this).attr("data-price")
              status: '1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
              body: opt.oTitle,   //   string  否  订单描述 （微信支付展示用）
              isCharge: "true"                    //   string  是  true-收费  false-免费
            },
            backCreateSuccess: function (_data) {
              //创建订单成功  （手术必选）
            },
            backCreateError: function (_data) {
              //创建订单失败  (必选)
            },
            wxPaySuccess: function (_data) {
              //支付成功回调  (问诊/门诊类型 必选)
              that.$emit("paySuccess", {
                orderType: opt.oType,//0免费，其他不是
                orderAmount: opt.orderAmount, //价钱
                orderFrequency:opt.orderFrequency//聊天次数
              });
              that.closePopup();
            },
            wxPayError: function (_data) {
              //支付失败回调  (问诊/门诊类型 必选)

            }
          });
        }

      },
      cancelEvent(){
        this.levelShow = false;
      },
      ensureEvent(){
        const that = this;
        wxCommon.wxPay({
          isTest: 0,                                               //  是否跳过支付
          orderId: that.repeatOrderId,                                       //订单ID
          orderType: 1,                                     //订单类型  1-咨询2-手术3-门诊预约
          orderSourceId: that.repeatConsultationId,                                 //来源id，对应 咨询id,手术单id，门诊预约id
          total_fee: that.repeatOrderAmount,                                     //订单总金额 (单位/元)
          body: that.repeatOrderTitle,                              //订单描述
          callBack: function (data) {
            if (data.responseStatus == "true") {
              that.$emit("paySuccess", {
                orderType: that.repeatOrderType,//0免费，其他不是
                orderAmount: that.repeatOrderAmount, //价钱
                orderFrequency:that.repeatOrderFrequency//聊天次数
              });
              that.closePopup();
              that.levelShow = false;
            }
          }
        });
      }
    },
    props: {
      payPopupShow: {
        type: Boolean
      }
    },
    components: {
      confirm
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  @import "../../../../static/css/swiper.min.css";

  .mask_layer {
    width: 100%;
    background: rgba(0, 0, 0, 0.50);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    &.show {
      opacity: 1;
      visibility: visible;
      .onlineVisit_mask {

      }
    }
    .onlineVisit_mask {
      width: 100%;
      background: #ffffff;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3;
      .swiper-slide {
        width: 100%;
        .icon_close_mask {
          float: right;
          margin-right: rem(20px);
          padding-left: rem(40px);
          width: rem(40px);
          height: rem(40px);
          background: url("../../../common/image/img00/doctorMain/pay_close@2x.png") no-repeat center;
        }
        .visit_tiny_tip {
          padding: rem(36px) 0 0 rem(40px);
          color: #aaa;
          @include font-dpr(12px);
        }
        .inquiryType {
          margin-top: rem(90px);
          text-align: center;
          font-weight: normal;
          color: #222;
          @include font-dpr(18px);
          span {
            padding-left: rem(16px);
            color: #777;
            @include font-dpr(15px);
          }
          &.inquiryType_normal:before {
            display: inline-block;
            content: '';
            width: rem(40px);
            height: rem(40px);
            margin-right: rem(12px);
            vertical-align: sub;
            background: url("../../../common/image/img00/doctorMain/normal_inquiry.png") no-repeat;
            background-size: 100% 100%;
          }
          &.inquiryType_special:before {
            display: inline-block;
            content: '';
            width: rem(40px);
            height: rem(40px);
            margin-right: rem(12px);
            vertical-align: sub;
            background: url("../../../common/image/img00/doctorMain/urgent_inquiry.png") no-repeat;
            background-size: 100% 100%;
          }
          &.inquiryType_urgent:before {
            display: inline-block;
            content: '';
            width: rem(40px);
            height: rem(40px);
            margin-right: rem(12px);
            vertical-align: sub;
            background: url("../../../common/image/img00/doctorMain/specail_inquiry.png") no-repeat;
            background-size: 100% 100%;
          }
          &.inquiryType_urgent:after {
            display: inline-block;
            content: '';
            width: rem(168px);
            height: rem(40px);
            margin-right: rem(12px);
            vertical-align: sub;
            background: url("../../../common/image/img00/myServices/home_label@2x.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .dox_cando {
          padding: 0 rem(40px);
          margin-top: rem(50px);
          @include clearfix();
          li {
            float: left;
            margin: 0 rem(50px) rem(30px) 0;
            color: #777;
            @include font-dpr(13px);
            &:before {
              display: inline-block;
              content: "";
              margin-right: rem(15px);
              width: rem(6px);
              height: rem(6px);
              border-radius: 50%;
              background: #909090;
              vertical-align: 0.1rem;
            }
          }
        }
        .why_charge {
          figcaption {
            padding-left: rem(60px);
            color: #aaa;
            @include font-dpr(10px);
            margin-bottom: rem(50px);
            &:before {
              display: inline-block;
              content: "";
              margin-right: rem(6px);
              width: rem(28px);
              height: rem(28px);
              background: url("../../../common/image/img00/doctorMain/pay_prompt@2x.png") no-repeat center;
              background-size: 100% 100%;
              vertical-align: middle;
            }
          }
          .charge_reason {
            margin: rem(24px) rem(48px) rem(56px);
            padding: rem(30px);
            background: #F9FBFB;
            border-radius: 4px;
            color: #aaa;
            @include font-dpr(14px);
            line-height: rem(40px);
          }
        }
        .go_payment {
          display: block;
          width: rem(570px);
          line-height: rem(88px);
          @include font-dpr(16px);
          color: #fff;
          text-align: center;
          background: #00D6C6;
          border-radius: 100px;
          margin: 0 auto rem(48px);
          &.forbid {
            background: #cccccc;
          }
        }
      }
      .swiper-pagination {
        .swiper-pagination-bullet {
          width: rem(12px);
          height: rem(12px);
          border-radius: 50%;
          margin-right: rem(20px);
          opacity: 0.1;
        }
        .swiper-pagination-bullet-active {
          background: #aaa;
          opacity: 1;
        }
      }
    }
  }

  .moudle_title {
    margin-left: rem(28px);
    padding-top: rem(50px);
    color: #555;
    @include font-dpr(16px);
    font-weight: normal;
    &:before {
      display: inline-block;
      content: '';
      width: 3px;
      height: rem(24px);
      vertical-align: middle;
      margin-right: rem(8px);
      background: #00D6C6;
    }
  }

  .fadeUp-enter-active, .fadeUp-leave-active {
    transition: all ease-in-out .5s
  }

  .fadeUp-enter, .fadeUp-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
    transform: translateY(50%);
  }

</style>
