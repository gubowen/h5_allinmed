webpackJsonp([10],{13:function(e,t){!function(e,t){function o(){var t=r.getBoundingClientRect().width;t/c>540&&(t=540*c);var o=t/10;r.style.fontSize=o+"px",u.rem=e.rem=o}var n,a=e.document,r=a.documentElement,i=a.querySelector('meta[name="viewport"]'),s=a.querySelector('meta[name="flexible"]'),c=0,d=0,u=t.flexible||(t.flexible={});if(i){console.warn("将根据已有的meta标签来设置缩放比例");var l=i.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(d=parseFloat(l[1]),c=parseInt(1/d))}else if(s){var p=s.getAttribute("content");if(p){var m=p.match(/initial\-dpr=([\d\.]+)/),f=p.match(/maximum\-dpr=([\d\.]+)/);m&&(c=parseFloat(m[1]),d=parseFloat((1/c).toFixed(2))),f&&(c=parseFloat(f[1]),d=parseFloat((1/c).toFixed(2)))}}if(!c&&!d){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),y=e.devicePixelRatio;c=g?y>=3&&(!c||c>=3)?3:y>=2&&(!c||c>=2)?2:1:1,d=1/c}if(r.setAttribute("data-dpr",c),!i)if(i=a.createElement("meta"),i.setAttribute("name","viewport"),i.setAttribute("content","initial-scale="+d+", maximum-scale="+d+", minimum-scale="+d+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(i);else{var I=a.createElement("div");I.appendChild(i),a.write(I.innerHTML)}e.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(o,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(n),n=setTimeout(o,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*c+"px":a.addEventListener("DOMContentLoaded",function(e){a.body.style.fontSize=12*c+"px"},!1),o(),u.dpr=e.dpr=c,u.refreshRem=o,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},1422:function(e,t,o){o(37),e.exports=o(1423)},1423:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(1),a=o.n(n),r=o(2),i=o.n(r),s=o(16),c=o(1424),d=o.n(c),u=o(71),l=o(58),p=o.n(l),m=o(21),f=(o.n(m),o(26),o(11));o.n(f);p.a.attach(document.body),new(function(){function e(){a()(this,e),this.init()}return i()(e,[{key:"init",value:function(){s.a.use(u.a);new s.a({render:function(e){return e(d.a)}}).$mount("#test")}}]),e}())},1424:function(e,t,o){function n(e){o(1425)}var a=o(3)(o(1426),o(1427),n,null,null);e.exports=a.exports},1425:function(e,t){},1426:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(13),a=(o.n(n),o(26));t.default={data:function(){return{payShow:!0}},mounted:function(){1==localStorage.getItem("askPay")&&(this.payShow=!0,this.viewResultH5Pay())},methods:{askH5Pay:function(){console.log("============H5支付啊===========");var e={caseId:"1509972059074",patientCustomerId:"1489998682602",patientId:"1491471348694",doctorId:"1234567890123",orderType:"1",orderSourceId:"1493697450391",orderSourceType:"1",orderAmount:.01,status:"1",body:"Test支付",isCharge:"true"};a.a.wxCreateOrder({data:e,backCreateSuccess:function(e){},backCreateError:function(e){},wxPaySuccess:function(e){},wxPayError:function(e){}})},viewResultH5Pay:function(){console.log("H5支付结果查看"),a.a.PayResult({out_trade_no:localStorage.getItem("orderNumber")}).then(function(e){console.log("查看回调"),console.log(e)}).catch(function(e){console.log("望天，接口错误")})},payHide:function(){localStorage.removeItem("askPay")}}}},1427:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("p",{staticClass:"H-pay",on:{click:function(t){e.askH5Pay()}}},[e._v("H5支付")]),e._v(" "),e.payShow?o("p",{staticClass:"H-viewPay",on:{click:e.viewResultH5Pay}},[e._v("支付成功")]):e._e()])},staticRenderFns:[]}},21:function(e,t){},26:function(e,t,o){"use strict";function n(e){var t={upOrderStatusUrl:"/mcall/cms/pay/order/v1/update/"},o={orderId:e.orderId};new(function(){function n(){d()(this,n),this.init()}return l()(n,[{key:"init",value:function(){switch(e.outTradeNo=1==parseInt(e.isTest)?"":e.outTradeNo,parseInt(e.operationType)){case 1:o.outTradeNo=e.outTradeNo;break;case 2:o.status=e.status,o.payTime=e.payTime,o.outTradeNo=e.outTradeNo,o.orderType=e.orderType,o.orderSourceId=e.orderSourceId;break;case 3:o.status=e.status,o.outTradeNo=e.outTradeNo,o.orderType=e.orderType,o.orderSourceId=e.orderSourceId;break;case 4:o.status=e.status,o.orderType=e.orderType,o.orderSourceId=e.orderSourceId,e.charge&&"true"==e.charge&&(o.outTradeNo=e.outTradeNo,o.refundReason=e.refundReason,o.refundReasonDesc=e.refundReasonDesc);break;case 5:o.status=e.status,o.outRefundNo=e.outRefundNo,o.refundAmount=e.refundAmount,o.refundTime=e.refundTime;break;case 6:o.status=e.status}2==e.orderType&&(o.reservationStatus=e.reservationStatus),p.a.ajax({url:t.upOrderStatusUrl,method:"POST",data:o,done:function(t){e.callBack(t)},fail:function(t){e.errorCallBack()}})}}]),n}())(e)}function a(e){var t={wxBasePath:"",prepayPth:"/mcall/base/pay/external/v1/createPrepaidOrder/",operationOrderPth:"/mcall/customer/operation/order/v1/update/"},o={};new(function(){function a(){d()(this,a),this.init()}return l()(a,[{key:"init",value:function(){console.log("微信支付");var t=this;1==parseInt(e.isTest)?t.paySuccess():t.wxReady()}},{key:"wxReady",value:function(){var e=this;y.wxGetToken({callBack:function(t){t.data.responseStatus&&(o.token=t.data.responseData.token,o.nonceStr=t.nonceStr,o.ipAddr=t.data.responseData.ipAddr,console.log("-------------token数据--------------"),console.log(t),e.prepaidOrder({token:o.token,nonceStr:o.nonceStr,ipAddr:o.ipAddr}))}})}},{key:"prepaidOrder",value:function(a){var r=this,i={total_fee:100*e.total_fee,body:"唯医骨科-"+e.body,trade_type:"JSAPI",scene:1,siteId:1,roleId:"2",openid:localStorage.getItem("openId"),nonceStr:a.nonceStr,token:a.token,ipAddr:a.ipAddr};console.log("-------------预支付参数--------------"),console.log(i),p.a.ajax({url:t.prepayPth,method:"POST",data:i,done:function(t){console.log(t),t&&"OK"==t.return_msg&&(console.log(t),o.dataL1=t,localStorage.setItem("orderNumber",t.out_trade_no),n({operationType:"1",orderId:e.orderId,outTradeNo:t.out_trade_no,callBack:function(e){e&&e.responseObject&&e.responseObject.responseStatus&&r.checkWxPay()},errorCallBack:function(){}}))}})}},{key:"checkWxPay",value:function(){var e=this;"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e.onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e.onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",e.onBridgeReady)):e.onBridgeReady()}},{key:"onBridgeReady",value:function(){var t=this,n=o.dataL1;Math.round((new Date).getTime()/1e3);console.log("-----pay-----"),WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:n.appid,timeStamp:n.timeStamp,nonceStr:n.nonceStr,package:"prepay_id="+n.prepay_id,signType:"MD5",paySign:n.sign},function(o){"get_brand_wcpay_request:ok"==o.err_msg?1==e.orderType&&0==e.orderSourceId?t.creatInquiryId({queryCallBack:function(o){e.orderSourceId=o,t.paySuccess()}}):t.paySuccess():t.payError()})}},{key:"paySuccess",value:function(){n({operationType:"2",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:1==parseInt(e.isTest)?y.mathRandomNum({numberValue:10}):localStorage.getItem("orderNumber"),status:"2",payTime:"1",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus?e.callBack({responseStatus:"true",out_trade_no:localStorage.getItem("orderNumber")}):common.popup({text:"更新订单失败"})},errorCallBack:function(){common.popup({text:"更新订单失败"})}})}},{key:"payError",value:function(){n({operationType:"3",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:localStorage.getItem("orderNumber"),status:"1",payTime:"",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus&&e.callBack({responseStatus:"false"})},errorCallBack:function(){}})}},{key:"creatInquiryId",value:function(e){p.a.ajax({url:"/mcall/customer/case/consultation/v1/getMapById/",method:"POST",data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),consultationType:1,siteId:17},done:function(t){"NO DATA"==t.responseObject.responseMessage&&p.a.ajax({url:"/mcall/customer/case/consultation/v1/create/",method:"POST",data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),patientCustomerId:p.a.getPara().patientCustomerId,patientId:p.a.getPara().patientId,consultationType:1,consultationState:-1,consultationLevel:localStorage.getItem("orderPayType"),siteId:17,caseType:0},done:function(t){t.responseObject.responseStatus&&(localStorage.removeItem("docId"),sessionStorage.setItem("orderSourceId",t.responseObject.responsePk),e.queryCallBack(t.responseObject.responsePk))}})}})}}]),a}())(e)}function r(e){var t={wxBasePath:"",prepayPth:"/mcall/base/pay/external/v1/createPrepaidOrder/",operationOrderPth:"/mcall/customer/operation/order/v1/update/"},o={};new(function(){function a(){d()(this,a),this.init()}return l()(a,[{key:"init",value:function(){console.log("H5支付");var t=this;1==parseInt(e.isTest)?t.paySuccess():t.wxReady()}},{key:"wxReady",value:function(){var e=this;y.wxGetTokenPlus().then(function(t){t.data.responseStatus&&(o.token=t.data.responseData.token,o.nonceStr=t.nonceStr,o.ipAddr=data.data.responseData.ipAddr,e.prepaidOrder({token:o.token,nonceStr:o.nonceStr,ipAddr:o.ipAddr}))}).catch(function(e){console.log("h5,支付接口错误")})}},{key:"prepaidOrder",value:function(n){var a=this,r={total_fee:100*e.total_fee,body:"唯医骨科-"+e.body,trade_type:"MWEB",scene:1,siteId:1,roleId:"2",nonceStr:n.nonceStr,token:n.token,ipAddr:n.ipAddr};console.log(r),p.a.ajax({url:t.prepayPth,method:"POST",data:r,done:function(e){console.log(e),e&&"OK"==e.return_msg&&(console.log(e),o.dataL1=e,localStorage.setItem("orderNumber",e.out_trade_no),a.h5AskPay(e))}})}},{key:"h5AskPay",value:function(){var e=o.dataL1;Math.round((new Date).getTime()/1e3);console.log("-----pay-----"),localStorage.setItem("askPay",1),window.location.href=e.mweb_url}},{key:"paySuccess",value:function(){n({operationType:"2",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:1==parseInt(e.isTest)?y.mathRandomNum({numberValue:10}):localStorage.getItem("orderNumber"),status:"2",payTime:"1",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus?e.callBack({responseStatus:"true",out_trade_no:localStorage.getItem("orderNumber")}):common.popup({text:"更新订单失败"})},errorCallBack:function(){common.popup({text:"更新订单失败"})}})}},{key:"payError",value:function(){n({operationType:"3",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:localStorage.getItem("orderNumber"),status:"1",payTime:"",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus&&e.callBack({responseStatus:"false"})},errorCallBack:function(){}})}},{key:"creatInquiryId",value:function(e){p.a.ajax({url:"/mcall/customer/case/consultation/v1/getMapById/",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),consultationType:1,siteId:17},done:function(t){"NO DATA"==t.responseObject.responseMessage&&p.a.ajax({url:"/mcall/customer/case/consultation/v1/create/",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),patientCustomerId:p.a.getPara().patientCustomerId,patientId:p.a.getPara().patientId,consultationType:1,consultationState:-1,consultationLevel:localStorage.getItem("orderPayType"),siteId:17,caseType:0},done:function(t){t.responseObject.responseStatus&&(localStorage.removeItem("docId"),sessionStorage.setItem("orderSourceId",t.responseObject.responsePk),e.queryCallBack(t.responseObject.responsePk))}})}})}}]),a}())(e)}function i(e){var t={out_trade_no:e.out_trade_no,scene:1,roleId:2,nonceStr:localStorage.getItem("nonceStr"),siteId:1,token:localStorage.getItem("token")};return console.log(t),new f.a(function(e,o){p.a.ajax({url:I.payResultUrl,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:t,done:function(t){console.log(t),e(t)},fail:function(e){o(e)}})})}function s(e){var t={createOrder:"/mcall/cms/pay/order/v1/create/",updateOrder:"/mcall/cms/pay/order/v1/update/"};new(function(){function o(){d()(this,o),this.init()}return l()(o,[{key:"init",value:function(){this.firstLoad(),console.log(e)}},{key:"firstLoad",value:function(){var o=this;this.createOrderData={caseId:e.data.caseId,patientCustomerId:e.data.patientCustomerId,patientId:e.data.patientId,doctorId:e.data.doctorId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,orderSourceType:e.data.orderSourceType,visitSiteId:"17"},"true"==e.data.isCharge?(this.createOrderData.orderAmount=e.data.orderAmount,this.createOrderData.status="1"):this.createOrderData.status="2",p.a.ajax({url:t.createOrder,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:this.createOrderData,done:function(t){t&&t.responseObject&&t.responseObject.responsePk?(o.orderId=t.responseObject.responsePk,o.orderSuccess({orderId:t.responseObject.responsePk})):e.backCreateError()},fail:function(e){}})}},{key:"orderSuccess",value:function(){var t=this;switch(parseInt(e.data.orderType)){case 1:case 3:"true"===e.data.isCharge?h.a.weChatJudge(function(e){t.goWxPay(e)},function(e){t.goH5Pay(e)}):e.backCreateSuccess(this.orderId);break;case 2:e.backCreateSuccess(this.orderId)}}},{key:"goWxPay",value:function(){a({isTest:0,orderId:this.orderId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,total_fee:e.data.orderAmount,body:e.data.body,callBack:function(t){"true"===t.responseStatus?e.wxPaySuccess():e.wxPayError()}})}},{key:"goH5Pay",value:function(){r({isTest:0,orderId:this.orderId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,total_fee:e.data.orderAmount,body:e.data.body,callBack:function(e){}})}}]),o}())(e)}var c=o(1),d=o.n(c),u=o(2),l=o.n(u),p=o(4),m=o(53),f=o.n(m),g=(o(11),function(){function e(t){d()(this,e)}return l()(e,[{key:"mathRandomNum",value:function(e){for(var t="",o=e.numberValue,n=[0,1,2,3,4,5,6,7,8,9],a=0;a<o;a++){t+=n[Math.floor(10*Math.random())]}return t}},{key:"mathRandom",value:function(e){for(var t="",o=e.numberValue,n=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],a=0;a<o;a++){t+=n[Math.floor(36*Math.random())]}return t.toLowerCase()}},{key:"wxGetTokenPlus",value:function(){var e=this.mathRandom({numberValue:32});return new f.a(function(t,o){p.a.ajax({url:"/mcall/base/pay/external/v1/getToken/",method:"POST",data:{roleId:2,nonceStr:e,siteId:1},done:function(o){localStorage.setItem("validityTime",Math.round((new Date).getTime()/1e3)),localStorage.setItem("token",o.responseData.token),localStorage.setItem("nonceStr",e),t({data:o,nonceStr:e})},fail:function(e){o(e)}})})}},{key:"wxGetToken",value:function(e){var t=this.mathRandom({numberValue:32});p.a.ajax({url:"/mcall/base/pay/external/v1/getToken/",method:"POST",data:{roleId:2,nonceStr:t,siteId:1},done:function(o){localStorage.setItem("validityTime",Math.round((new Date).getTime()/1e3)),localStorage.setItem("token",o.responseData.token),localStorage.setItem("nonceStr",t),o&&o.responseData&&o.responseData.token&&o.responseData.token.length>0&&e.callBack({data:o,nonceStr:t})}})}},{key:"checkToken",value:function(){var e=Math.round((new Date).getTime()/1e3),t=localStorage.getItem("validityTime");return null!=t&&e-t<7200}},{key:"checkOpenId",value:function(){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}},{key:"wxGetOpenId",value:function(){var e=window.location.href,t=encodeURIComponent(e),o="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5288ad7f627608&redirect_uri="+t+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(common.getpara().code)-1===window.location.href.indexOf("openId")&&(window.location.href="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+common.getpara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var n=sessionStorage.getItem("count");n||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+common.getpara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+common.getpara().openId,localStorage.setItem("openId",common.getpara().openId))}else localStorage.setItem("currentUrl",e),window.location.href=o}}]),e}()),y=new g,I={payResultUrl:"/mcall/base/pay/external/v1/getResultBack/"},h=o(45),v=function(){function e(t){d()(this,e)}return l()(e,[{key:"wxCloseOrder",value:function(){}},{key:"wxCreateOrder",value:function(e){s(e)}},{key:"wxUpOrder",value:function(e){n(e)}},{key:"wxPay",value:function(e){a(e)}},{key:"H5Pay",value:function(e){r(e)}},{key:"PayResult",value:function(e){return i(e)}}]),e}();t.a=new v},4:function(e,t,o){"use strict";function n(e){y.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),y()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+f()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")},function(t){e.fail&&e.fail(t)})}function a(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==I.a.getPara().patientCustomerId?e.customerId=0===I.a.getPara().patientCustomerId.length?0:I.a.getPara().patientCustomerId:void 0!==I.a.getPara().customerId?e.customerId=0===I.a.getPara().customerId.length?0:I.a.getPara().customerId:e.customerId=0,parseInt(e.customerId)>0)return!0;n({url:"/mcall/patient/customer/unite/v1/getById/",method:"POST",data:e,beforeSend:function(){},timeOut:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",f()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var o=t.responseObject.responseData.dataList.patientCustomerUnite.mobile;if(o&&o.length>0)return!0;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}var r=o(47),i=o.n(r),s=o(48),c=o.n(s),d=o(1),u=o.n(d),l=o(2),p=o.n(l),m=o(6),f=o.n(m),g=o(22),y=o.n(g),I=o(5),h=function(){function e(){u()(this,e)}return p()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",o=window.location.origin+window.location.pathname+window.location.search,n=encodeURIComponent(o),a="";if(window.location.origin.includes("localhost"))return!1;a=window.location.hostname.includes("m9")?2:1,1==a?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==a&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+n+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(I.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+I.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var i=sessionStorage.getItem("count");i||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+I.a.getPara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+I.a.getPara().openId,localStorage.setItem("openId",I.a.getPara().openId))}else localStorage.setItem("currentUrl",o),window.location.href=r}}]),e}(),v=new h,S=function(){function e(){u()(this,e)}return p()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),n({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),w=new S,k=(o(11),function(){function e(){u()(this,e),this.removeByValue=function(e,t){for(var o=0;o<this.length;o++)if(e[o]==val){e.splice(o,1);break}return e}}return p()(e,[{key:"forbidShare",value:function(){I.a.getPara().isShare||w.wxforbidShare()}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var o=(new Date).getTime();o-e<=300&&t.preventDefault(),e=o},!1)}},{key:"ajax",value:function(e){n(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,o={},n=void 0,a=void 0;if(t.lastIndexOf(e||"?")>0){n=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=n.split("&"),i=0;i<r.length;i++)a=r[i].split("="),o[a[0]]=decodeURIComponent(a[1])}return o}},{key:"getCookie",value:function(e){var t=void 0,o=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(o))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new i.a(e)))}},{key:"isWXBrowse",value:function(){return v.isWXBrowse()}},{key:"getByteLen",value:function(e){for(var t=0,o=0;o<e.length;o++)null!==e[o].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var o="",n=0,a=0;a<e.length&&(e.charCodeAt(a)>128?n+=2:n++,n<=t);a++)o=o.concat(e[a]);return n>t&&(o+=""),o}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"],o=this.isWXBrowse(),n=navigator.userAgent;return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===o?"WIFI"!==e.type||"wifi"!==e.type?n.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===o?n.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?1:0}},{key:"checkOpenId",value:function(){return v.checkOpenId()}},{key:"wxGetOpenId",value:function(){v.wxGetOpenId()}},{key:"mobileCheck",value:function(){a()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],o=e.time.substring(0,10).replace(/\-/g,"/"),n=new Date(o).getDay(),a="",r="",i=t[n],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:a=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",r=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:a=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),r=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:a,years:r,week:i,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseFloat(e)/1e3;return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}()),b=new k;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=b},45:function(e,t,o){"use strict";var n=o(1),a=o.n(n),r=o(2),i=o.n(r),s=o(11),c=(o.n(s),function(){function e(){a()(this,e)}return i()(e,[{key:"weChatJudge",value:function(e,t){var o=window.navigator.userAgent.toLowerCase();o.includes("micromessenger")?e(o):t(o)}}]),e}());t.a=new c},5:function(e,t,o){"use strict";var n=o(1),a=o.n(n),r=o(2),i=o.n(r),s=function(){function e(){a()(this,e)}return i()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,o={},n=void 0,a=void 0;if(t.lastIndexOf(e||"?")>0){n=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=n.split("&"),i=0;i<r.length;i++)a=r[i].split("="),o[a[0]]=decodeURIComponent(a[1])}return o}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s}},[1422]);