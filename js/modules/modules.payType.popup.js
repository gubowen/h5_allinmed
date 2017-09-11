/**
 * @Desc：支付弹层
 * @Usage:  modules.payTypePopup({
					container: $(".docMain") ,    //添加DOM外层类                      必需
					index: 0  ,                   //问诊类型  0.普通  1.特需  2.加急    不必需
					caseId:      ,                //  string  是  caseId              必需
					patientCustomerId:   ,        //	string	是	患者所属用户id     必需
					patientId:,                   // 	string	是	患者id            必需
					doctorId:,                    //  医生Id                          必需
					type:1,                       //订单类型  1-咨询2-手术3-门诊预约    不必需
					successCallback:function(){}  //支付成功后回调
				})
 * @Notify：
 * @Depend：         /js/third-party/swiper/js/swiper-3.4.2.jquery.min.js
 *                  <link rel="stylesheet" href="/css/vander/swiper.min.css">
 * Created by qiangkailiang on 2017/5/9
 * Fixed by WangJingrong
 */

modules.payTypePopup = function (obj) {
  var container = {
    init: function () {

      var t = this;
      t.config = $.extend(false, t.config, obj);
      t.addHtml();
    },
    config: {
      container: $(".docMain"),
      index: 0,
      type: 1
    },
    path: {
      getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",//获取医生问诊价格及次数
      getConsultationId: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",//获取问诊Id
      getOrderDetails: "/mcall/cms/pay/order/v1/getMapById/",//获取订单详情
      getCurrentByCustomerId: "/mcall/customer/advice/setting/v1/getCurrentByCustomerId/",//获取剩余人数和状态
    },
    template: {
      payPopup: function (data, isHasFree) {
        //是否已经创建过免费咨询，每个患者只有3次免费聊天机会
        var generalPrice, generalTime,freeText;
        if(data.freeTimes<=0){
          $('.goInquiry[data-type="2"]').addClass("forbid").text("暂关闭问诊")
        }else{
          $('.goInquiry[data-type="2"]').removeClass("forbid").text("去问诊")
        }
        if (isHasFree == 1) {
          freeText="已使用";
          generalPrice = data.generalPrice + '元';
          generalTime = data.generalTimes;
        } else {
          freeText="去支付";
          generalPrice = data.generalPrice + '元';
          generalTime = data.generalTimes;
        }
        return '<div class="mask_layer">' +
          '    <section class="swiper-container onlineVisit_mask">' +
          '        <div class="swiper-wrapper">' +
          '            <div class="swiper-slide">' +
          '                <h2 class="moudle_title"><span>网上问诊</span><i class="icon_close_mask"></i></h2>' +
          '                <p class="visit_tiny_tip">提示：急重症患者不适合网上咨询，请前往当地医院问诊</p>' +
          '                <h3 class="inquiryType inquiryType_normal">普通问诊<span>' + generalPrice + '</span></h3>' +
          '                <ul class="dox_cando">' +
          '                    <li>可获得' + generalTime + '医生答复</li>' +
          '                    <li>医生48小时未接诊全额退款</li>' +
          '                </ul>' +
          '                <figure class="why_charge">' +
          '                    <figcaption>为什么收费</figcaption>' +
          '                    <section class="charge_reason">' +
          '                        医生利用自己的休息时间为您进行医疗服务，让您避免盲目跑医院，减少交通等待时间及花费，足不出户也可以得到医生建议。医生按劳取酬，让付出更有价值，让贴心贴心服务，温暖如影随形。' +
          '                    </section>' +
          '                </figure>' +
          '                <a class="go_payment" data-type="1" data-price="' + data.generalPrice + '" data-times=' + generalTime + '>去支付</a>' +
          '            </div>' +
          '            <div class="swiper-slide">' +
          '                <h2 class="moudle_title"><span>网上问诊</span><i class="icon_close_mask"></i></h2>' +
          '                <p class="visit_tiny_tip">提示：急重症患者不适合网上咨询，请前往当地医院问诊</p>' +
          '                <h3 class="inquiryType inquiryType_special">特需问诊<span>' + data.vipPrice + '元</span></h3>' +
          '                <ul class="dox_cando">' +
          '                    <li>可获得' + data.vipTimes + '医生答复</li>' +
          '                    <li>医生12小时内未接诊全额退款</li>' +
          '                </ul>' +
          '                <figure class="why_charge">' +
          '                    <figcaption>为什么收费</figcaption>' +
          '                    <section class="charge_reason">' +
          '                        医生利用自己的休息时间为您进行医疗服务，让您避免盲目跑医院，减少交通等待时间及花费，足不出户也可以得到医生建议。医生按劳取酬，让付出更有价值，让贴心贴心服务，温暖如影随形。' +
          '                    </section>' +
          '                </figure>' +
          '                <a class="go_payment" data-type="3" data-price="' + data.vipPrice + '" data-times=' + data.vipTimes + '>去支付</a>' +
          '            </div>' +
          '            <div class="swiper-slide">' +
          '                <h2 class="moudle_title"><span>网上问诊</span><i class="icon_close_mask"></i></h2>' +
          '                <p class="visit_tiny_tip">提示：急重症患者不适合网上咨询，请前往当地医院问诊</p>' +
          '                <h3 class="inquiryType inquiryType_urgent">免费问诊<span class="freeQuestion_icon"></span></h3>' +
          '                <ul class="dox_cando">' +
          '                    <li>患者拥有一次免费问诊机会，可获得3次医生答复</li>' +
          '                </ul>' +
          '                <figure class="why_charge">' +
          '                    <figcaption>为什么收费</figcaption>' +
          '                    <section class="charge_reason">' +
          '                        医生利用自己的休息时间为您进行医疗服务，让您避免盲目跑医院，减少交通等待时间及花费，足不出户也可以得到医生建议。医生按劳取酬，让付出更有价值，让贴心贴心服务，温暖如影随形。' +
          '                    </section>' +
          '                </figure>' +
          '                <a class="go_payment '+(data.freeTimes<=0?"default":"")+'" data-type="0" data-times="3">'+(data.freeTimes<=0?"暂关闭问诊":freeText)+'</a>' +
          '            </div>' +
          '        </div>' +
          '        <!--分页器 -->' +
          '        <div class="swiper-pagination swiper-pagination-onlineVisit"></div>' +
          '    </section>' +
          '</div>';
      }
    },
    addHtml: function () {
      var t = this;
      $.ajax({
        url: t.path.getVisitDetails,
        type: "post",
        async: false,
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId || common.getpara().doctorCustomerId
          })
        },
        beforeSend: function () {
          common.loading.show();
        },
        dataType: "json",
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0];
            $(".mask_layer").remove();
            t.isHasFreeChat(items);

            var mySwiper = new Swiper('.swiper-container', {
              direction: 'horizontal',
              initialSlide: obj.index ? obj.index : t.config.index,
              // 分页器
              pagination: '.swiper-pagination'
            });
            setTimeout(function () {
              $(".mask_layer").addClass("show");
              $("html,body").css("overflow", "hidden");
            });
            t.goToPay();
            t.closePopup();

          } else {

          }
          common.loading.hide()
        },
        error: function () {

        }
      })
    },
    closePopup: function () {
      $(".why_charge > figcaption").on("click", function () {
        $(".why_charge .charge_reason").toggle();
      });
      $(".mask_layer").on('click', ".icon_close_mask", function () {
        $(".mask_layer").removeClass("show");
        $(".mask_layer").on("transitionend WebkitTransitionEnd", function () {
          $(".mask_layer").remove();
        })
        $("html,body").css("overflow", "scroll");
      })
    },
    //点击去支付
    goToPay: function () {
      var t = this;

      $('.go_payment:not(".default")').off("click").on("click",function () {
        var isClick = 0;
        //问诊类型
        if(isClick==0){
          isClick =1;
          var orderSourceType = $(this).attr("data-type"),
            orderSourceTitle,
            orderAmount = parseFloat($(this).attr("data-price")).toFixed(2);
          localStorage.setItem("orderPayType", $(this).attr("data-type"));
          switch (Number(orderSourceType)) {
            case 1:
              orderSourceTitle = "普通问诊";
              break;
            case 2:
              orderSourceTitle = "加急问诊";
              break;
            case 3:
              orderSourceTitle = "特需问诊";
              break;
          }
          //创建订单
          t.questionStatus({
            callBack: function (data) {
              t.questionCheck({
                dataList: data,
                isOpenQuestion: function (data) {
                  //未开启问诊
                  common.confirmBox({
                    title: "暂未开启问诊服务",
                    content: '医生暂不能为您提供帮助，请医生开启问诊服务后再来沟通。',
                    textCenter: true,
                    cancel: '取消',
                    ensure: '确定',
                    contentColor: "#777777",
                    cancelCallback: function () {
                    },
                    ensureCallback: function () {
                    }
                  });
                },
                remainNumBack: function (data) {
                  //有剩余名额 0-无沟通中数据 1-有
                  if (data == 1) {
                    common.confirmBox({
                      title: "您与该医生有正在进行中的问诊服务，现在去继续沟通吗？",
                      // content: '医生今日的名额已全部预约，请改日再来',
                      textCenter: true,
                      cancel: '取消',
                      ensure: '去沟通',
                      cancelCallback: function () {
                      },
                      ensureCallback: function () {
                        window.location.href = '/dist/imSceneDoctor.html?caseId=' + common.getpara().caseId + '&doctorCustomerId=' + common.getpara().customerId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&patientId=' + common.getpara().patientId;
                      }
                    });
                  } else {
                    //问诊类型弹层
                    t.createOrderPlus({orderSourceType:orderSourceType,orderSourceTitle: orderSourceTitle, orderAmount: orderAmount});
                    isClick = 0;
                  }
                },
                notRemainBack: function (data) {
                  //没有剩余名额
                  common.confirmBox({
                    title: "问诊名额已满",
                    content: '医生今日的名额已全部预约 请改日再来',
                    textCenter: true,
                    cancel: '取消',
                    ensure: '确定',
                    contentColor: "#777777",
                    cancelCallback: function () {
                    },
                    ensureCallback: function () {
                    }
                  });
                }
              });
            }
          });
        }
      })
    },
    //创建订单
    createOrderPlus:function (datas) {
      var t=this;
      $.ajax({
        url: t.path.getConsultationId,
        type: "post",
        async: false,
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            caseId: obj.caseId,
            customerId: obj.doctorId,
            isCreate: 1,
            isValid: 1,
            consultationType: 1,
            firstResult: 0,
            maxResult: 999
          })
        },
        dataType: "json",
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var consultationId = data.responseObject.responseData.dataList.consultationId;
            sessionStorage.setItem("orderSourceId", consultationId);
            //是否有重复订单
            t.isHasOrder({
              consultationId: consultationId,
              orderSourceType: datas.orderSourceType,
              orderSourceTitle: datas.orderSourceTitle,
              orderAmount: datas.orderAmount
            });
          } else {
            common.popup({
              text: "数据错误"
            })
          }
        }
      })
    },
    questionCheck: function (qct) {
      var _remainNum = qct.dataList.remainNum, //剩余人数
        _state = qct.dataList.state,           //开关：0-关，1-开
        _conState = qct.dataList.conState;     //有无沟通 0-无 1-有
      if (_state == 1) {  //_state==1
        //开启问诊
        if (_remainNum !== 0) {      //_remainNum!==0  (-1次数无限)
          //剩余人数>0
          qct.remainNumBack(_conState);  //可咨询回调
          if (_remainNum > 0) {
            var _text = "剩余名额" + _remainNum + "人";
            $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('lastNumTotal').siblings().text(_text).addClass('isLastNum');
          }
        } else {
          //无剩余名额
          qct.notRemainBack();  //无剩余名额回调
          $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('lastNumNull').siblings().text("今日名额已用完").addClass('isNullNum');
          $('.onlineVisit .goInquiryBox').find('.inquiryType').siblings().addClass('forbid');
          $('.goRefer').addClass('forbid');
        }
      } else {
        //未开启问诊
        qct.isOpenQuestion();  //未开启问诊回调
        $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('isOpenQuestion').siblings().text("医生未开启问诊").addClass('isNotOpenQues');
        $('.onlineVisit .goInquiryBox').find('.inquiryType').siblings().text("暂不接诊").addClass('forbid');
        $('.goRefer').addClass('forbid');
      }
    },
    questionStatus: function (Obj) {
      var _t = this;
      $.ajax({
        url: _t.path.getCurrentByCustomerId,
        dataType: "json",
        type: 'POST',
        async: false,
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId,
            caseId: common.getpara().caseId
          })
        },
        beforeSend: function () {
          common.loading.show();
        },
        success: function (data) {
          common.loading.hide();
          if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
            var _dataList = data.responseObject.responseData.dataList;
            Obj.callBack(_dataList);
            // _t.checkPatientState({dataList:_dataList});
          }
        },
        error: function () {
          common.loading.hide();
        }
      })
    },
    //无重复订单去支付
    noOrder: function (opt) {
      var t = this;
      if (opt.oType == 0) {
        modules.createOrders({
          isTest: obj.isTest,
          data: {
            caseId: obj.caseId,                       //    string  是  caseId
            patientCustomerId: obj.patientCustomerId, //	string	是	患者所属用户id
            patientId: obj.patientId,                 // 	string	是	患者id
            doctorId: obj.doctorId,                   //	string	是	医生id
            orderType: obj.type || t.config.type,     //	string	是	订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: opt.cId,                   //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
            orderSourceType: opt.oType,               //	string	是	来源类型  问诊：1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
            orderAmount: 0,                           //	string	否	订单金额  （单位/元 保留两位小数）$(this).attr("data-price")
            status: '2',                              //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
            body: '免费咨询',                          //    string  否  订单描述 （微信支付展示用）
            isCharge: "false"                         //    string  是  true-收费  false-免费
          },
          backCreateSuccess: function (_data) {
            //创建订单成功  （手术必选）
            obj.successCallback && obj.successCallback({
              orderId: _data,
              isFree: opt.oType,
              isNoSource: opt.cId
            });
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
        modules.createOrders({
          isTest: obj.isTest,
          data: {
            caseId: obj.caseId,                //  string  是  caseId
            patientCustomerId: obj.patientCustomerId, //	string	是	患者所属用户id
            patientId: obj.patientId,         // 	string	是	患者id
            doctorId: obj.doctorId,          //	string	是	医生id
            orderType: obj.type,                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
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
            obj.successCallback && obj.successCallback();
            setTimeout(function () {
              $(".mask_layer").remove();
            }, 300)
          },
          wxPayError: function (_data) {
            //支付失败回调  (问诊/门诊类型 必选)

          }
        });
      }

    },
    //是否有重复订单
    isHasOrder: function (iho) {
      var t = this;
      $.ajax({
        url: t.path.getOrderDetails,
        type: "POST",
        dateType: "json",
        async: false,
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            patientId: obj.patientId,
            doctorId: obj.doctorId,
            orderType: 1,
            orderSourceId: iho.consultationId,
            status: 1,
            sortType: 1,
            firstResult: 0,
            maxResult: 1
          })
        },
        beforeSend: function () {
          common.loading.show();
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0];
            if (items.orderSourceId && items.orderSourceId != 0 && iho.orderSourceType == items.orderSourceType) {//有重复订单
              common.loading.hide();
              //支付弹层removeClass
              $(".mask_layer").removeClass("show");
              var orderTitle;
              switch (Number(items.orderSourceType)) {
                case 1:
                  orderTitle = "普通问诊";
                  break;
                case 2:
                  orderTitle = "加急问诊";
                  break;
                case 3:
                  orderTitle = "特需问诊";
                  break;
              }
              common.confirmBox({
                content: "您有一份相同订单尚未过期，确定完成支付吗？",
                cancel: "取消",
                ensure: "去支付",
                cancelCallback: function () {

                },
                ensureCallback: function () {
                  //直接支付
                  modules.wxPay({
                    isTest: obj.isTest,                                               //  是否跳过支付
                    orderId: items.orderId,                                       //订单ID
                    orderType: obj.type,                                     //订单类型  1-咨询2-手术3-门诊预约
                    orderSourceId: iho.consultationId,                                 //来源id，对应 咨询id,手术单id，门诊预约id
                    total_fee: iho.orderAmount,                                     //订单总金额 (单位/元)
                    body: orderTitle,                              //订单描述
                    callBack: function (data) {
                      if (data.responseStatus == "true") {
                        //支付成功
                        obj.successCallback && obj.successCallback();
                        setTimeout(function () {
                          $(".mask_layer").remove();
                        }, 300)
                      }
                    }
                  });
                }
              })
            } else {//没有重复订单
              t.noOrder({
                cId: iho.consultationId,
                oType: iho.orderSourceType,
                oTitle: iho.orderSourceTitle,
                orderAmount: iho.orderAmount
              })
            }
          } else {//没有重复订单
            t.noOrder({
              cId: iho.consultationId,
              oType: iho.orderSourceType,
              oTitle: iho.orderSourceTitle,
              orderAmount: iho.orderAmount
            })
          }
        }

      })
    },
    //判断是否已经创建过免费聊天
    isHasFreeChat: function (isfc) {
      var t = this;
      // $.ajax({
      //   url: t.path.getConsultationId,
      //   type: "post",
      //   async: false,
      //   timeout: 10000,
      //   data: {
      //     paramJson: $.toJSON({
      //       caseId: obj.caseId,
      //       customerId: obj.doctorId,
      //       isCreate: 1,
      //       isValid: 1,
      //       consultationType: 1,
      //       firstResult: 0,
      //       maxResult: 999
      //     })
      //   },
      //   dataType: "json",
      //   success: function (data) {
      //     if (data.responseObject.responseData.dataList) {
      //       if (data.responseObject.responseData.dataList.consultationId) {//已经创建过问诊
      //         var _consultationId = data.responseObject.responseData.dataList.consultationId;
      //       } else {//没有创建过问诊
      //         t.config.container.append(t.template.payPopup(isfc, 0));
      //       }
      //     } else {
      //       common.popup({
      //         text: "数据错误"
      //       })
      //     }
      //   }
      // })
      $.ajax({
        url: t.path.getOrderDetails,
        type: "POST",
        dateType: "json",
        async: false,
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            patientId: obj.patientId,
            doctorId: obj.doctorId,
            orderType: 1,
            orderSourceType: 0,
            sortType: 2
          })
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var orderAmount = data.responseObject.responseData.dataList[0].orderAmount;
            if (orderAmount > 0) {
              t.config.container.append(t.template.payPopup(isfc, 0));
            } else {
              t.config.container.append(t.template.payPopup(isfc, 1));

              $('.mask_layer').find('.inquiryType.inquiryType_urgent').siblings('.go_payment').addClass('default').attr("disabled","disabled");
            }
          } else {
            t.config.container.append(t.template.payPopup(isfc, 0));
          }
        }

      })
    }
  };
  container.init();
};
