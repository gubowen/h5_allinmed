/**
 * @Desc：wxPay
 * @Usage:  1-发起支付：
 *             modules.wxPay({
 *                  isTest:'',                                         //0-线上 1-线下
                    orderId: '',                                       //订单ID
                    orderType: '',                                     //订单类型  1-咨询2-手术3-门诊预约
                    orderSourceId: '',                                 //来源id，对应 咨询id,手术单id，门诊预约id
                    total_fee: '',                                     //订单总金额 (单位/元)
                    body: "合作医院手术",                              //订单描述
                    callBack: function (data) {
                        if (data.responseStatus == "true") {
                            //支付成功
                          }
                    }
                 });
 *           2-查看回调结果：
 *             modules.checkOrder({
                   out_trade_no:localStorage.getItem("orderNumber")  //订单号
               });
 *           3-取消订单：
 *             1）收费
 *             modules.closeOrder({
                   out_trade_no: localStorage.getItem("orderNumber"), //微信支付订单号
                   orderType:'',                     //订单类型     1-问诊 2-手术 3-门诊
                   orderSourceType:'' ,              //来源类型     1-普通2-特需3-加急|手术：1-互联网2-公立|门诊1-普通2-专家',
                   orderId:'',                       // 订单ID
                   refundReason:'',                  //拒绝描述
                   refundReasonDesc:'',              //拒绝原因描述
                   closeOrdersSuccess:function(){

                   },
                   closeOrdersError:function(){

                   },

              });

              2）免费 更新订单状态
              modules.tcUpOrderStatus({
                   operationType:'',    //操作类型        1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                   orderId:'',          // 订单ID
                   outTradeNo:'',       //微信支付订单Id  (免费订单非必填)
                   status:'',           //订单状态        1-待支付  2-已支付  3-已完成  4-已取消  5-退款中
                   callBack:function(data){
                         //更新成功
                   },
                   errorCallBack:function(){
                         //更新失败
                   }
               });

 *           4-申请退款：
 *             modules.applyForRefund({
                   orderId:'',                           // 订单ID
                   //outTradeNo:data.out_trade_no,       //微信支付订单Id
                   totalFee:'',                          //总金额
                   refundAmount:'',                      //退款金额
                   refundTime:'',                        //退款时间 （微信是否返回，未返回拿系统当前时间）
                   out_trade_no: localStorage.getItem("orderNumber"),   //微信支付订单Id
                   callBack:function(data){

                   }
             });
 *           5-查看退款：
 *             modules.checkDrawBack({
                   out_trade_no:localStorage.getItem("orderNumber"),    //订单号
                   out_refund_no:localStorage.getItem("out_refund_no")  //退款号
               });
 * @Notify：支付模式为公众号支付
 * @Depend：  （支付无css依赖）
 *            "https://res.wx.qq.com/open/js/jweixin-1.0.0.js"
 *
 * Created by JuKun on 2017/4/5.
 */


/**
 *
 * @param: wxPay 基础方法
 */
//wx Ajax
modules.wxPayCommAjax = function (Obj) {
    common.loading.show();
    $.ajax({
        url: Obj.path,
        data: Obj.data,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            common.loading.hide();
            Obj.callBack(data);
        },
        error: function (data) {
            common.loading.hide();
        }
    })
};
//create random
modules.mathRandomNum = function (Obj) {
    var code = "";
    var codeLength = Obj.numberValue,
        random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 10);    //取得随机数的索引（0~35）
        code += random[index];
    }
    return code;
};
//create random
modules.mathRandom = function (Obj) {
    var code = "";
    var codeLength = Obj.numberValue,
        random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);    //取得随机数的索引（0~35）
        code += random[index];
    }
    return code.toLowerCase();
};
//get token
modules.wxGetToken = function (Obj) {
    var _nonceStr = modules.mathRandom({numberValue: 32}),
        _data = {
            "roleId": 2,
            "nonceStr": _nonceStr,     //随机数
            "siteId": 1
        };
    modules.wxPayCommAjax({
        data: {paramJson: $.toJSON(_data)},
        path: '/mcall/base/pay/external/v1/getToken/',
        callBack: function (data) {
            localStorage.setItem("validityTime", Math.round(new Date().getTime() / 1000));   //token
            localStorage.setItem("token", data.responseData.token);   //token
            localStorage.setItem("nonceStr", _nonceStr);              //随机数
            Obj.callBack({data: data, nonceStr: _nonceStr});
        }
    });
};
//token check
modules.checkToken = function () {
    var _validityTime = Math.round(new Date().getTime() / 1000),
        _validityLocal = localStorage.getItem("validityTime"),   //localStorage.getItem("validityTime")
        _checkKey = '';
    if (_validityLocal != null) {
        if (_validityTime - _validityLocal < 7200) {
            _checkKey = true;
        } else {
            _checkKey = false;
        }
    } else {
        _checkKey = false;
    }
    return _checkKey;
};
//openId check
modules.checkOpenId = function () {
    var _openId = localStorage.getItem("openId"),
        _checkKey = '';
    if (_openId != null) {
        _checkKey = true;
    } else {
        _checkKey = false;
        if(sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0){
            sessionStorage.removeItem("count");
        }
    }
    return _checkKey;
};
//get openID
modules.wxGetOpenId = function (env) {
  var _currentPageUrl = window.location.href,
    _encodeUrl = encodeURIComponent(_currentPageUrl),
    appId = '',
    XHRUrl = '';
  if (env == 1) {
    appId = "wxe8384f7b06c169ef";
    XHRUrl = "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
  } else if (env == 2) {
    appId = "wxaa5288ad7f627608";
    XHRUrl = "http://m1.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
  }
  var _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
    "appid=" + appId +
    "&redirect_uri=" + _encodeUrl +
    "&response_type=code" +
    "&scope=snsapi_userinfo" +
    "&state=STATE" +
    "#wechat_redirect";
  if (common.getpara().code) {
    if (window.location.href.indexOf("openId") === -1) {
      window.location.href = XHRUrl +
        "?ref=" + localStorage.getItem("currentUrl") +
        "&response_type=code" +
        "&scope=snsapi_base" +
        "&state=pay" +
        "&code=" + common.getpara().code +
        "#wechat_redirect";
    }
  } else {
    if (window.location.href.indexOf("openId") !== -1) {
      var count = sessionStorage.getItem("count");
      if (!count) {
        sessionStorage.setItem("count", 1);
        if (localStorage.getItem("currentUrl") && localStorage.getItem("currentUrl").indexOf("?") != -1) {
          window.location.href = localStorage.getItem("currentUrl") + "&openId=" + common.getpara().openId;
        } else {
          window.location.href = localStorage.getItem("currentUrl") + "?openId=" + common.getpara().openId;
        }
        localStorage.setItem("openId", common.getpara().openId);
      }
    } else {
      localStorage.setItem("currentUrl", _currentPageUrl);
      window.location.href = _url;
    }
  }
};

/**
 *   患者端支付场景应用  更新订单状态
 *
 */
modules.tcUpOrderStatus = function (Obj) {
    var _data = {
        orderId: Obj.orderId                             //   string  是  订单ID
    };
    Obj.outTradeNo = parseInt(Obj.isTest)==1?"":Obj.outTradeNo;
    switch (parseInt(Obj.operationType)) {    //1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
        case 1:
            //预支付
            _data.outTradeNo = Obj.outTradeNo; //微信支付订单号
            break;
        case 2:
            //2-已支付
            _data.status = Obj.status;               //订单状态
            _data.payTime = Obj.payTime;             //支付时间
            _data.outTradeNo = Obj.outTradeNo;       //微信支付订单Id
            _data.orderType = Obj.orderType;         //订单类型
            _data.orderSourceId = Obj.orderSourceId;       //订单资源ID
            break;
        case 3:
            //3-支付失败
            _data.status = Obj.status;               //订单状态
            _data.outTradeNo = Obj.outTradeNo;       //微信支付订单ID
            _data.orderType = Obj.orderType;         //订单类型
            _data.orderSourceId = Obj.orderSourceId;       //订单资源ID
            break;
        case 4:
            //4-取消
            _data.status = Obj.status;                             //订单状态
            _data.orderType = Obj.orderType;                       //订单类型    '订单类型1-咨询2-手术3-门诊预约',
            _data.orderSourceId = Obj.orderSourceId;               //订单资源ID  '来源id，对应咨询id,手术单id，门诊预约id',
            if (Obj.charge && Obj.charge == "true") {
                _data.outTradeNo = Obj.outTradeNo;             //拒绝描述
                _data.refundReason = Obj.refundReason;             //拒绝描述
                _data.refundReasonDesc = Obj.refundReasonDesc;     //拒绝原因描述
            }
            break;
        case 5:
            //5-退款
            _data.status = Obj.status;                         //订单状态
            _data.outRefundNo = Obj.outRefundNo;               //退款单号
            _data.refundAmount = Obj.refundAmount;             //退款金额
            _data.refundTime = Obj.refundTime;                 //退款时间 （微信是否返回，未返回拿系统当前时间）
            break;
        case 6:
            //6-已完成
            _data.status = Obj.status;         //订单状态
            break;
    }
    //手术单更新手术类型 （2-合作医院手术 3-公立医院手术）
    if(Obj.orderType == 2){
        _data.reservationStatus = Obj.reservationStatus;
    }
    var params = {paramJson: $.toJSON(_data)};
    common.loading.show();
    $.ajax({
        url: '/mcall/cms/pay/order/v1/update/',
        type: "POST",
        data: params,
        dataType: "json",
        //time : 5000,
        success: function (data) {
            common.loading.hide();
            Obj.callBack(data);
        },
        error: function () {
            common.loading.hide();
            Obj.errorCallBack();
        }
    });
};

/**
 *
 * @param: wxPay基础回调
 */

//查看回调结果
modules.checkOrder = function (Obj) {
    var _container = {
        op: {},
        init: function () {
            var _t = this;
            _t.op.out_trade_no = Obj.out_trade_no ? Obj.out_trade_no : '';        //订单号
            if (modules.checkToken()) {
                _t.checkOrderRequest({
                    _token: localStorage.getItem("token"),                    //token
                    _nonceStr: localStorage.getItem("nonceStr")               //随机数
                });
            } else {
                modules.wxGetToken({
                    callBack: function (data) {
                        if (data.data.responseStatus) {
                            console.log(data);
                            _t.checkOrderRequest({
                                _token: data.data.responseData.token ? data.data.responseData.token : '',  //token
                                _nonceStr: data.nonceStr ? data.nonceStr : ''                              //随机数
                            });
                        }
                    }
                });
            }
        },
        checkOrderRequest: function (rv) {
            var _t = this,
                _data = {
                    "out_trade_no": _t.op.out_trade_no,   //_out_trade_no
                    "scene": 1,
                    "roleId": 2,
                    "nonceStr": rv._nonceStr,
                    "siteId": 1,
                    "token": rv._token
                };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},
                path: "/mcall/base/pay/external/v1/getResultBack/",
                callBack: function (data) {
                    console.log(data);
                }
            });
        }
    };
    _container.init(Obj);
};

//取消订单
modules.closeOrder = function (Obj) {
    var _container = {
        op: {},
        init: function () {
            var _t = this;
            _t.op.out_trade_no = Obj.out_trade_no ? Obj.out_trade_no : '';        //订单号
            if(parseInt(Obj.isTest) ==1){
                Obj.closeOrdersSuccess();          //取消订单成功
            }else {
                _t.checkToken();
            }
        },
        checkToken:function(){
            var _t =this;
            if (modules.checkToken()) {
                _t.closeOrderRequest({
                    _token: localStorage.getItem("token"),                    //token
                    _nonceStr: localStorage.getItem("nonceStr")               //随机数
                });
            } else {
                modules.wxGetToken({
                    callBack: function (data) {
                        if (data.data.responseStatus) {
                            console.log(data);
                            _t.closeOrderRequest({
                                _token: data.data.responseData.token ? data.data.responseData.token : '',  //token
                                _nonceStr: data.nonceStr ? data.nonceStr : ''                              //随机数
                            });
                        }
                    }
                });
            }
        },
        closeOrderRequest: function (rv) {
            var _t = this,
                _data = {
                    "out_trade_no": _t.op.out_trade_no,
                    "scene": 1,
                    "roleId": 2,
                    "nonceStr": rv._nonceStr,
                    "siteId": 1,
                    "token": rv._token
                };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},
                path: "/mcall/base/pay/external/v1/updateCloseOrder/",     //取消订单
                callBack: function (data) {
                    if (data&&data.return_msg == "OK") {
                        //取消成功
                        Obj.closeOrdersSuccess();          //取消订单成功

                    } else {
                        //取消失败
                        Obj.closeOrdersError();
                    }
                }
            });
        }
    };
    _container.init(Obj);
};

//申请退款
modules.applyForRefund = function (Obj) {
    var _container = {
        op: {},
        init: function () {
            var _t = this;
            _t.op.out_trade_no = Obj.out_trade_no ? Obj.out_trade_no : '';        //订单号
            if (modules.checkToken()) {
                _t.applyForRefundRequest({
                    _token: localStorage.getItem("token"),                    //token
                    _nonceStr: localStorage.getItem("nonceStr"),              //随机数
                    _out_trade_no: _t.op.out_trade_no
                });
            } else {
                modules.wxGetToken({
                    callBack: function (data) {
                        if (data.data.responseStatus) {
                            _t.applyForRefundRequest({
                                _token: data.data.responseData.token ? data.data.responseData.token : '',  //token
                                _nonceStr: data.nonceStr ? data.nonceStr : '',                             //随机数
                                _out_trade_no: _t.op.out_trade_no
                            });
                        }
                    }
                });
            }
        },
        applyForRefundRequest: function (rv) {
            var _t = this,
                _data = {
                    "out_trade_no": _t.op.out_trade_no,
                    "scene": 1,
                    "roleId": 2,
                    "total_fee": Obj.totalFee,
                    "refund_fee": Obj.refundAmount,
                    "nonceStr": rv._nonceStr,
                    "siteId": 1,
                    "token": rv._token
                };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},
                path: "/mcall/base/pay/external/v1/createRefundOrder/",        //申请退款
                callBack: function (data) {
                    if (data && data.return_msg == "OK") {
                        //更新订单状态
                        modules.tcUpOrderStatus({
                            operationType: '5',                  //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                            orderId: Obj.orderId,                // 订单ID
                            //outTradeNo:data.out_trade_no,     //微信支付订单Id
                            outRefundNo: data.out_refund_no,     //退款单号
                            refundAmount: Obj.refundAmount,      //退款金额
                            refundTime: common.date.local_time(),  //退款时间 （微信是否返回，未返回拿系统当前时间）
                            status: '5',                         //退款中
                            callBack: function (data) {
                                if (data && data.responseObject && data.responseObject.responseStatus) {
                                    Obj.callBack(true);          //退款申请成功
                                } else {
                                    Obj.callBack(false);
                                    common.popup({
                                        text: "退款申请失败"
                                    })
                                }
                            },
                            errorCallBack: function () {
                                Obj.callBack(false);
                                common.popup({
                                    text: "退款申请失败"
                                })
                            }
                        });
                    } else {
                        Obj.callBack(false);
                    }
                }
            });
        }
    };
    _container.init(Obj);
};

//查看退款
modules.checkDrawBack = function (Obj) {
    var _container = {
        op: {},
        init: function () {
            var _t = this;
            _t.op.out_trade_no = Obj.out_trade_no ? Obj.out_trade_no : '';         //订单号
            _t.op.out_refund_no = Obj.out_refund_no ? Obj.out_refund_no : '';      //退款号
            if (modules.checkToken()) {
                _t.checkDrawBackRequest({
                    _token: localStorage.getItem("token"),                    //token
                    _nonceStr: localStorage.getItem("nonceStr")               //随机数
                });
            } else {
                modules.wxGetToken({
                    callBack: function (data) {
                        if (data.data.responseStatus) {
                            console.log(data);
                            _t.checkDrawBackRequest({
                                _token: data.data.responseData.token ? data.data.responseData.token : '',  //token
                                _nonceStr: data.nonceStr ? data.nonceStr : ''                              //随机数
                            });
                        }
                    }
                });
            }
        },
        checkDrawBackRequest: function (rv) {
            var _t = this,
                _data = {
                    "out_trade_no": _t.op.out_trade_no,
                    "out_refund_no": _t.op.out_refund_no,
                    "scene": 1,
                    "roleId": 2,
                    "nonceStr": rv._nonceStr,
                    "siteId": 1,
                    "token": rv._token
                };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},
                path: "/mcall/base/pay/external/v1/queryRefundOrder/",      //查看退款
                callBack: function (data) {
                    console.log(data);
                }
            });
        }
    };
    _container.init();
};

//支付
modules.wxPay = function (Obj) {

    var container = {
        op: {},
        path: {
            wxBasePath: '', //微信接口配置
            prepayPth: '/mcall/base/pay/external/v1/createPrepaidOrder/',        //预支付订单
            operationOrderPth: '/mcall/customer/operation/order/v1/update/'      //手术单状态更新
        },
        init: function () {
            var _t = this;
            if(parseInt(Obj.isTest) ==1){
                _t.paySuccess();
            }else{
                _t.wxReady();
            }
        },
        //ready函数
        wxReady: function () {
            var _t = this;
            if (modules.checkToken()) {
                _t.prepaidOrder({
                    token: localStorage.getItem("token"),
                    nonceStr: localStorage.getItem("nonceStr")
                }); //生成预支付订单
            } else {
                modules.wxGetToken({
                    callBack: function (data) {
                        if (data.data.responseStatus) {
                            _t.op.token = data.data.responseData.token;  //token
                            _t.op.nonceStr = data.nonceStr;              //随机数
                            _t.prepaidOrder({
                                token: _t.op.token,
                                nonceStr: _t.op.nonceStr
                            }); //生成预支付订单
                        }
                    }
                });
            }
        },
        //生成预支付订单
        prepaidOrder: function (pv) {
            var _t = this;
            var _data = {
                "total_fee": Obj.total_fee * 100,     //订单总金额
                "body": "唯医骨科-"+Obj.body,               //订单描述
                "trade_type": "JSAPI",         //支付模式 JSAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付
                "scene": 1,                     //支付场景
                "siteId": 1,                    //站点
                "roleId": '2',
                "openid": localStorage.getItem("openId"),
                "nonceStr": pv.nonceStr,         //随机数
                "token": pv.token
            };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},   //预支付参数
                path: _t.path.prepayPth,              //预支付URL
                callBack: function (data) {
                    if (data && data.return_msg == "OK") {
                        _t.op.dataL1 = data;
                        localStorage.setItem("orderNumber", data.out_trade_no);
                        //更新订单状态
                        modules.tcUpOrderStatus({
                            operationType: '1',                  //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                            orderId: Obj.orderId,                // 订单ID
                            outTradeNo: data.out_trade_no,       //微信支付订单Id
                            callBack: function (data) {
                                if (data && data.responseObject && data.responseObject.responseStatus) {
                                    _t.checkWxPay();            //请求支付
                                } else {
                                    common.popup({
                                        text: "订单生成失败"
                                    })
                                }
                            },
                            errorCallBack: function () {
                                common.popup({
                                    text: "订单生成失败"
                                })
                            }
                        });
                    }
                }
            });
        },
        //判断微信支付
        checkWxPay: function () {
            var _t = this;
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', _t.onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', _t.onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', _t.onBridgeReady);
                }
            } else {
                _t.onBridgeReady();
            }
        },
        //请求支付
        onBridgeReady: function () {
            var _t = this,
                _data = _t.op.dataL1,
                _timeStamp = Math.round(new Date().getTime() / 1000) + "";
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": _data.appid,                        //公众号名称，由商户传入
                    "timeStamp": _data.timeStamp,                //时间戳，自1970年以来的秒数
                    "nonceStr": _data.nonceStr,                   //随机串
                    "package": "prepay_id=" + _data.prepay_id,    //支付参数
                    "signType": "MD5",                           //微信签名方式
                    "paySign": _data.sign                         //微信签名
                }, function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        //更新订单状态
                        if(Obj.orderType ==1 && Obj.orderSourceId ==0){
                            //咨询创建ID
                            _t.creatInquiryId({
                                queryCallBack:function(sourceId){
                                    Obj.orderSourceId = sourceId;
                                    _t.paySuccess();
                                }
                            })
                        }else {
                            _t.paySuccess();
                        }
                    } else {
                        //取消支付 支付失败 更新订单状态
                        _t.payError();
                    }
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
        },
        paySuccess:function(){
            var _t = this;
            modules.tcUpOrderStatus({
                operationType: '2',                                    //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                orderId: Obj.orderId,                                  // 订单ID
                orderType:Obj.orderType,                               //订单类型  2-手术 3-门诊
                reservationStatus:Obj.orderType==2?Obj.reservationStatus:"",                 //手术类型
                orderSourceId:Obj.orderSourceId,                       // 订单资源ID
                outTradeNo: (parseInt(Obj.isTest) ==1)?modules.mathRandomNum({numberValue: 10}):localStorage.getItem("orderNumber"),       //微信支付订单Id
                status: '2',                                           //1-待支付2-已支付3-已完成4-已取消5-退款中6-支付超时7-退款完成8-退款失败',
                payTime:'1',                                           //支付时间 传1
                callBack: function (data) {
                    if (data && data.responseObject && data.responseObject.responseStatus) {
                        Obj.callBack({
                            responseStatus: "true",
                            out_trade_no: localStorage.getItem("orderNumber")
                        });
                    } else {
                        common.popup({
                            text: "更新订单失败"
                        })
                    }
                },
                errorCallBack: function () {
                    common.popup({
                        text: "更新订单失败"
                    })
                }
            });
        },
        payError:function(){
            var _t = this;
            modules.tcUpOrderStatus({
                operationType: '3',                                    //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                orderId: Obj.orderId,                                  // 订单ID
                orderType:Obj.orderType,                               //订单类型  2-手术 3-门诊
                reservationStatus:Obj.orderType==2?Obj.reservationStatus:"",                 //手术类型
                orderSourceId:Obj.orderSourceId,                       // 订单资源ID
                outTradeNo: localStorage.getItem("orderNumber"),       //微信支付订单Id
                status: '1',                                           //支付失败 状态 1-待支付
                payTime:'',                                            //支付时间 传1
                callBack: function (data) {
                    if (data && data.responseObject && data.responseObject.responseStatus) {
                        Obj.callBack({
                            responseStatus: "false"
                        });
                    } else {
                        common.popup({
                            text: "更新订单失败"
                        })
                    }
                },
                errorCallBack: function () {
                    common.popup({
                        text: "更新订单失败"
                    })
                }
            });
        },
        //咨询支付成功后创建问诊id
        creatInquiryId:function(opt){
            //获取是否已经存在问诊id
            $.ajax({
                url: "/mcall/customer/case/consultation/v1/getMapById/",
                type: "POST",
                async:false,
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON({
                        caseId: common.getpara().caseId,
                        customerId: common.getpara().customerId,
                        consultationType: 1,
                        siteId: 17
                    })
                },
                success:function(data){
                    if(data.responseObject.responseMessage=="NO DATA"){
                        //如果没有问诊id，创建问诊id
                        $.ajax({
                                url: "/mcall/customer/case/consultation/v1/create/",
                                type: "POST",
                                dataType: "json",
                                timeout: 10000,
                                async: false,
                                data: {
                                    paramJson: $.toJSON({
                                        caseId: common.getpara().caseId,
                                        customerId: common.getpara().customerId,
                                        patientCustomerId: common.getpara().patientCustomerId,
                                        patientId: common.getpara().patientId,
                                        consultationType: 1,
                                        consultationState: -1,
                                        consultationLevel:$(".swiper-slide-active .go_payment").attr("data-type"),
                                        siteId: 17,
                                        caseType:common.getpara().caseType
                                    })
                                },
                                success:function(d){
                                    if (d.responseObject.responseStatus) {
                                        sessionStorage.setItem("orderSourceId", d.responseObject.responsePk);
                                        opt.queryCallBack(d.responseObject.responsePk);
                                    }
                                }
                            })
                    }
                },
                error:function(data){

                }
            })
        }
    };
    container.init(Obj);
};

/**
 * @param：openId校验
 */
$(function () {
    if (window.location.href.indexOf("from=symptom")>-1 || window.location.href.indexOf("from=operation")>-1) {
        return;
    }
    // if (!common.checkOpenId()) {
    //     common.wxGetOpenId(1);    //获取openId
    // }
});
