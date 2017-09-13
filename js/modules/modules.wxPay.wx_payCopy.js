/**
 * @Desc：wxPay
 * @Usage:  1-发起支付：
 *             modules.wxPay({
                   total_fee: 1,                         //订单总金额(单位：分)
                   body: "唯医骨科线下支付测试",         //订单描述
                   callBack:function(data){
                       if(data.responseStatus){
                          //支付成功的回调
                       }else{
                          //支付失败的回调
                   }
               })
 *           2-查看回调结果：
 *             modules.checkOrder({
                   out_trade_no:localStorage.getItem("orderNumber")  //订单号
               });
 *           3-取消订单：
 *             modules.closeOrder({
                   out_trade_no:localStorage.getItem("orderNumber")  //订单号
               });
 *           4-申请退款：
 *             modules.applyForRefund({
                   out_trade_no:localStorage.getItem("orderNumber")  //订单号
               });
 *           5-查看退款：
 *             modules.checkDrawBack({
                   out_trade_no:localStorage.getItem("orderNumber"),    //订单号
                   out_refund_no:localStorage.getItem("out_refund_no")  //退款号
               });
 * @Notify：支付模式为公众号支付
 * @Depend： http://res.wx.qq.com/open/js/jweixin-1.0.0.js
 *            https://res.wx.qq.com/open/js/jweixin-1.0.0.js
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
            console.log(data);
        }
    })
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
            console.log({data: data.responseData.token, nonceStr: _nonceStr});
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
modules.wxGetOpenId = function(env){
    var _currentPageUrl = window.location.href,
        _encodeUrl = encodeURIComponent(_currentPageUrl),
        appId = '',
        XHRUrl = '';
    if (env==2){
        appId="wxe8384f7b06c169ef";
        XHRUrl= "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    }else if (env==1){
        appId="wxaa5288ad7f627608";
        XHRUrl= "http://m1.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    }
    var _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
        "appid=" +appId+
        "&redirect_uri=" + _encodeUrl +
        "&response_type=code" +
        "&scope=snsapi_userinfo" +
        "&state=STATE" +
        "#wechat_redirect";
    //检测是否有code
    if (common.getpara().code) {
        console.log(common.getpara().code);
        //检测url是否有OpenID
        if (window.location.href.indexOf("openId")===-1){
            window.location.href = XHRUrl +
                "?ref="+localStorage.getItem("currentUrl") +
                "&response_type=code" +
                "&scope=snsapi_base" +
                "&state=pay" +
                "&code=" + common.getpara().code +
                "#wechat_redirect";
        }
    } else {
        //检测url是否有OpenID
        if (window.location.href.indexOf("openId")!==-1){
            var count=sessionStorage.getItem("count");
            if (!count){
                sessionStorage.setItem("count",1);
                if(localStorage.getItem("currentUrl") && localStorage.getItem("currentUrl").indexOf("?")!=-1) {
                    window.location.href=localStorage.getItem("currentUrl")+"&openId="+common.getpara().openId;
                } else{
                    window.location.href=localStorage.getItem("currentUrl")+"?openId="+common.getpara().openId;
                }
                //localStorage.setItem("openIdValidityTime", Math.round(new Date().getTime() / 1000));   //openId 开始时间戳
                localStorage.setItem("openId",common.getpara().openId);
            }
        }else{
            localStorage.setItem("currentUrl",_currentPageUrl);  //存储页面首次打开URL
            window.location.href = _url;                         //当前连接指向指定链接
        }
    }
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
                    console.log(data);
                    if(data){
                        //取消成功
                        Obj.closeOrdersSuccess();
                    }else{
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
                            console.log(data);
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
                    "total_fee": 1,
                    "refund_fee": 1,
                    "nonceStr": rv._nonceStr,
                    "siteId": 1,
                    "token": rv._token
                };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},
                path: "/mcall/base/pay/external/v1/createRefundOrder/",        //申请退款
                callBack: function (data) {
                    localStorage.setItem("out_refund_no", data.out_refund_no); //退款单号
                    console.log(data);
                    if(data){
                        //取消成功
                        Obj.refundSuccess();
                    }else{
                        //取消失败
                        Obj.refundError();
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
            prepayPth: '/mcall/base/pay/external/v1/createPrepaidOrder/'        //预支付订单
        },
        init: function () {
            var _t = this;
            _t.wxReady();
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
                            console.log(data);
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
            console.log("生成预支付订单");
            var _t = this;
            var _data = {
                "total_fee": 1,                  //订单总金额
                "body": Obj.body,                //订单描述
                "trade_type": "JSAPI",           //支付模式 JSAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付
                "scene": 1,                      //支付场景
                "siteId": 1,                     //站点
                "roleId": '2',
                "openid":localStorage.getItem("openId"),
                "nonceStr": pv.nonceStr,         //随机数
                "token": pv.token
            };
            modules.wxPayCommAjax({
                data: {paramJson: $.toJSON(_data)},   //预支付参数
                path: _t.path.prepayPth,              //预支付URL
                callBack: function (data) {
                    console.log(data);
                    console.log("预支付订单号" + data.out_trade_no);
                    _t.op.dataL1 = data;
                    localStorage.setItem("orderNumber", data.out_trade_no);
                    _t.checkWxPay();            //请求支付
                }
            });
        },
        //判断微信支付
        checkWxPay: function (wpv) {
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
                _timeStamp = Math.round(new Date().getTime() / 1000)+"";
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": _data.appid,                        //公众号名称，由商户传入
                    "timeStamp": _data.timeStamp,                //时间戳，自1970年以来的秒数
                    "nonceStr":_data.nonceStr,                   //随机串
                    "package": "prepay_id="+ _data.prepay_id,    //支付参数
                    "signType": "MD5",                           //微信签名方式
                    "paySign":_data.sign                         //微信签名
                }, function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        //Obj.callBack({
                        //    responseStatus:"true"
                        //});
                    } else {
                        //Obj.callBack({
                        //    responseStatus:"false"
                        //});
                    }
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
            );
        }
    };
    container.init(Obj);
};


/**
 * @Notify：以下为模块测试——误删
 */
$(function () {
    if (modules.checkToken()) {
        console.log("token有效")
    } else {
        console.log("token无效")
    }
    if (!modules.checkOpenId()) {
        modules.wxGetOpenId(1);    //获取openId
    }
    //支付
    $('.ev-pay').on("click", function () {
        modules.wxPay({
            total_fee: 0.01,                    //订单总金额 (单位/元 保留两位小数)
            body: "唯医骨科-线下支付",       //订单描述
            callBack: function (data) {

            }
        })
    });
    //查看支付订单
    $('.ev-viewPay').on("click", function () {
        modules.checkOrder({
            out_trade_no: localStorage.getItem("orderNumber")  //订单号
        });
    });
    //取消订单
    $('.ev-closeOrder').on("click", function () {
        modules.closeOrder({
            out_trade_no: localStorage.getItem("orderNumber"), //订单号
            closeOrdersSuccess:function(){
                common.popup({text:"取消订单成功！"})
            },
            closeOrdersError:function(){
                common.popup({text:"取消订单失败！"})
            }
        });
    });
    //申请退款
    $('.ev-applyBack').on("click", function () {
        modules.applyForRefund({
            out_trade_no: localStorage.getItem("orderNumber"),  //订单号
            refundSuccess:function() {
                common.popup({text:"退款成功！"})
            },
            refundError:function() {
                common.popup({text:"退款失败！"})
            }
        });
    });
    //查看退款
    $('.ev-viewBack').on("click", function () {
        modules.checkDrawBack({
            out_trade_no: localStorage.getItem("orderNumber"),    //订单号
            out_refund_no: localStorage.getItem("out_refund_no")  //退款号
        });
    });
    //获取金额
    //modules.wxPayCommAjax({
    //    data: {paramJson: $.toJSON({
    //        visitSiteId:"17",                        //	string	是	站点
    //        customerId:"1495762174307",                //	string	是	医生id
    //        operationType:1           //	string	是	类型1-互联网手术定金
    //    })},
    //    path:"/mcall/comm/setting/operation/v1/getMapById/",
    //    callBack:function(data){
    //       console.log(data);
    //    },
    //    errorCallBack:function(data){
    //
    //    }
    //});
});
