webpackJsonp([9],{14:function(e,t){!function(e,t){function a(){var t=r.getBoundingClientRect().width;t/c>540&&(t=540*c);var a=t/10;r.style.fontSize=a+"px",u.rem=e.rem=a}var n,o=e.document,r=o.documentElement,i=o.querySelector('meta[name="viewport"]'),s=o.querySelector('meta[name="flexible"]'),c=0,d=0,u=t.flexible||(t.flexible={});if(i){console.warn("将根据已有的meta标签来设置缩放比例");var l=i.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(d=parseFloat(l[1]),c=parseInt(1/d))}else if(s){var p=s.getAttribute("content");if(p){var m=p.match(/initial\-dpr=([\d\.]+)/),f=p.match(/maximum\-dpr=([\d\.]+)/);m&&(c=parseFloat(m[1]),d=parseFloat((1/c).toFixed(2))),f&&(c=parseFloat(f[1]),d=parseFloat((1/c).toFixed(2)))}}if(!c&&!d){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=g?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,d=1/c}if(r.setAttribute("data-dpr",c),!i)if(i=o.createElement("meta"),i.setAttribute("name","viewport"),i.setAttribute("content","initial-scale="+d+", maximum-scale="+d+", minimum-scale="+d+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(i);else{var v=o.createElement("div");v.appendChild(i),o.write(v.innerHTML)}e.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(a,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(n),n=setTimeout(a,300))},!1),"complete"===o.readyState?o.body.style.fontSize=12*c+"px":o.addEventListener("DOMContentLoaded",function(e){o.body.style.fontSize=12*c+"px"},!1),a(),u.dpr=e.dpr=c,u.refreshRem=a,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},1445:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(1),o=a.n(n),r=a(2),i=a.n(r),s=a(18),c=a(1446),d=a.n(c),u=a(72),l=a(68),p=a.n(l),m=a(23),f=(a.n(m),a(35),a(1450)),g=a.n(f),h=a(1454),v=a.n(h),y=a(4),I=a(11);a.n(I);p.a.attach(document.body),new(function(){function e(){o()(this,e),this.wxBind()}return i()(e,[{key:"init",value:function(){s.a.use(u.a),this.routerStart(),this.router=new u.a({routes:this.routes});new s.a({router:this.router,render:function(e){return e(d.a)}}).$mount("#test")}},{key:"routerStart",value:function(){this.routes=[{path:"/",redirect:"/test"},{path:"/test",name:"test",component:v.a,meta:{keepAlive:!0}},{path:"/uploadPic",name:"uploadPic",component:g.a,meta:{keepAlive:!0}}]}},{key:"wxBind",value:function(){var e="",t="",a=window.location.origin+window.location.pathname+window.location.search,n=encodeURIComponent(a),o="";if(window.location.origin.includes("localhost"))return!1;o=window.location.hostname.includes("m9")?2:1,1==o?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==o&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+n+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";y.a.getPara().code?window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=bundingWx&code="+y.a.getPara().code+"#wechat_redirect":window.location.href=r}}]),e}())},1446:function(e,t,a){function n(e){a(1447)}var o=a(3)(a(1448),a(1449),n,null,null);e.exports=o.exports},1447:function(e,t){},1448:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(14),o=(a.n(n),a(35));t.default={data:function(){return{payShow:!1}},mounted:function(){1==localStorage.getItem("askPay")&&(this.payShow=!0,this.viewResultH5Pay())},methods:{upload:function(){this.$router.push({name:"uploadPic"})},askH5Pay:function(){console.log("============H5支付啊===========");var e={caseId:"1509972059074",patientCustomerId:"1489998682602",patientId:"1491471348694",doctorId:"1234567890123",orderType:"1",orderSourceId:"1493697450391",orderSourceType:"1",orderAmount:.01,status:"1",body:"Test支付",isCharge:"true"};o.a.wxCreateOrder({data:e,backCreateSuccess:function(e){},backCreateError:function(e){},wxPaySuccess:function(e){},wxPayError:function(e){}})},viewResultH5Pay:function(){console.log("H5支付结果查看"),o.a.PayResult({outTradeNo:localStorage.getItem("orderNumber")}).then(function(e){console.log("查看回调",e)}).catch(function(e){console.log(e)})},payHide:function(){localStorage.removeItem("askPay"),this.payShow=!1}}}},1449:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("keep-alive",[e.$route.meta.keepAlive?a("router-view",{staticStyle:{"min-height":"100%"}}):e._e()],1),e._v(" "),e.$route.meta.keepAlive?e._e():a("router-view",{staticStyle:{"min-height":"100%"}})],1)},staticRenderFns:[]}},1450:function(e,t,a){function n(e){a(1451)}var o=a(3)(a(1452),a(1453),n,null,null);e.exports=o.exports},1451:function(e,t){},1452:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(7),o=a.n(n),r=a(19),i=a.n(r),s=a(4),c=a(15),d=(a.n(c),a(9)),u=a.n(d),l=a(17),p=a.n(l),m={imgCreate:"/mcall/customer/patient/case/attachment/v1/create/",imgDelete:"/mcall/customer/patient/case/attachment/v1/update/",resetTime:"/mcall/customer/case/consultation/v1/updateFrequency/",updateCase:"/mcall/customer/patient/case/v1/update/"};t.default={data:function(){return{uploadList:[],imageList:{},errorShow:!1,errorMsg:"",loading:!1}},computed:{submitFlag:function(){var e=!1;for(var t in this.imageList)if(0!==this.imageList[t].length){e=!0;break}return e}},mounted:function(){this.getUploadList()},methods:{getUploadList:function(){var e=this;localStorage.getItem("upload")||localStorage.setItem("upload",o()(this.$route.params)),this.uploadList=JSON.parse(localStorage.getItem("upload")),this.uploadList.forEach(function(t,a){e.$set(e.imageList,t.adviceId,[])})},upLoadPic:function(e,t,a){var n=a,r=new FormData,i=e.adviceId,c=e.adviceType;r.append("file",n),r.append("paramJson",o()({caseId:s.a.getPara().caseId,imageType:c,caseCategoryId:i})),this.imagePreview(e,t,a),this.submitCreateImg(e,t,r)},imagePreview:function(e,t,a){var n=window.URL.createObjectURL(a);this.imageList[e.adviceId]&&this.$set(this.imageList[e.adviceId],t,{blob:n,imgId:"",uploading:!0,fail:!1})},submitCreateImg:function(e,t,a){var n=this,o=this;i()({url:m.imgCreate,method:"post",data:a,headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4}).then(function(a){var r=a.data;o.$set(n.imageList[e.adviceId],t,{blob:r.responseObject.responseMessage.logoUrl,imgId:r.responseObject.responsePk,uploading:!1,fail:!1}),o.loading=!1},function(e){})},imgDelete:function(e,t,a){var n=this;s.a.ajax({url:m.imgDelete,method:"POST",data:{id:e.imgId,isValid:0},beforeSend:function(){},done:function(){n.imageList[a].splice(t,1)}})},onFileChange:function(e,t,a){var n=this,o=a.target.files||a.dataTransfer.files;o.length&&(this.loading=!0,o[0].size>5242880?(this.errorShow=!0,this.errorMsg="图片不能超过5M",setTimeout(function(){n.errorMsg="",n.errorShow=!1},3e3)):this.upLoadPic(e,t,o[0]))},backToImPage:function(){this.$emit("csFn",["11"]),s.a.ajax({url:m.resetTime,method:"POST",data:{consultationId:"1503368110114",frequency:"0",frequencyType:"4",consultationState:0},beforeSend:function(){},done:function(){that.imageList[id].splice(index,1)}})}},components:{Toast:p.a,Loading:u.a}}},1453:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"upload-wrapper"},[a("section",{staticClass:"main-inner tc-upLoadFile ev-delete"},[e._l(e.uploadList,function(t,n){return a("section",{staticClass:"tc-upLoadBox"},[a("figure",{staticClass:"tc-upLoadTitle ev-upLoadList"},[a("span",{staticClass:"tc-upLoadTitleName",attrs:{"data-treatmentid":t.adviceId,"data-advicetype":t.adviceType}},[e._v(e._s(t.adviceName))]),e._v(" "),a("span",{staticClass:"tc-upLoadRightIcon"}),e._v(" "),a("span",{staticClass:"tc-upLoadRightCover"}),e._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:0===e.imageList[t.adviceId].length,expression:"imageList[item.adviceId].length===0"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file"},on:{change:function(a){e.onFileChange(t,0,a)}}})]),e._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:e.imageList[t.adviceId].length>0,expression:"imageList[item.adviceId].length>0"}],staticClass:"tc-upLoadItemBox docInt"},[e._l(e.imageList[t.adviceId],function(n,o){return a("li",{staticClass:"tc-upLoadItemList ev-imgList success"},[a("img",{attrs:{alt:"",src:n.blob},on:{click:function(t){e.showBigImg(n,o,1)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:0==n.uploading,expression:"img.uploading==false"}],staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"},on:{click:function(a){e.imgDelete(n,o,t.adviceId)}}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:n.uploading,expression:"img.uploading"}]},[a("span",{staticClass:"tc-upLoadCover"}),e._v(" "),a("span",{staticClass:"tc-upLoading"}),e._v(" "),a("span",{staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"}}),e._v(" "),a("span",{staticClass:"tc-upLoadAfreshText"},[e._v("等待上传")])]),e._v(" "),t.fail?a("figure",{staticClass:"upload-fail"},[a("p",[e._v("重新上传")]),e._v(" "),a("input",{directives:[{name:"show",rawName:"v-show",value:e.imageList[t.adviceId].length>0&&n.finish,expression:"imageList[item.adviceId].length>0 && img.finish"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file"},on:{change:function(t){e.onFileChange(n,o,t)}}})]):e._e()])}),e._v(" "),e.imageList[t.adviceId].length>0&&!e.loading?a("li",{staticClass:"tc-upLoadAdd",staticStyle:{display:"list-item"}},[a("a",{attrs:{href:"javascript:;"}},[a("span",{staticClass:"tc-upLoadAddMore"},[a("input",{staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file"},on:{change:function(a){e.onFileChange(t,e.imageList[t.adviceId].length,a)}}})])])]):e._e()],2)])}),e._v(" "),a("footer",{staticClass:"tc-upLoadSubmit"},[e.submitFlag?a("button",{staticClass:"tc-submitBtn",on:{click:e.backToImPage}},[e._v("提交")]):e._e(),e._v(" "),e.submitFlag?e._e():a("button",{staticClass:"tc-submitDisabled"},[e._v("提交")])])],2),e._v(" "),a("transition",{attrs:{name:"fade"}},[e.errorShow?a("Toast",{attrs:{content:e.errorMsg}}):e._e()],1)],1)},staticRenderFns:[]}},1454:function(e,t,a){function n(e){a(1455)}var o=a(3)(a(1456),a(1457),n,null,null);e.exports=o.exports},1455:function(e,t){},1456:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(14);a.n(n);t.default={data:function(){return{payShow:!1}},mounted:function(){},methods:{upload:function(){this.$router.push({name:"uploadPic"})},askH5Pay:function(){console.log("============H5支付啊===========");var e={caseId:"1509972059074",patientCustomerId:"1489998682602",patientId:"1491471348694",doctorId:"1234567890123",orderType:"1",orderSourceId:"1493697450391",orderSourceType:"1",orderAmount:.01,status:"1",body:"Test支付",isCharge:"true"};WxPayCommon.wxCreateOrder({data:e,backCreateSuccess:function(e){},backCreateError:function(e){},wxPaySuccess:function(e){},wxPayError:function(e){}})},viewResultH5Pay:function(){console.log("H5支付结果查看"),WxPayCommon.PayResult({outTradeNo:localStorage.getItem("orderNumber")}).then(function(e){console.log("查看回调",e)}).catch(function(e){console.log(e)})},payHide:function(){localStorage.removeItem("askPay"),this.payShow=!1}}}},1457:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0,!1,!1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a",{attrs:{href:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5288ad7f627608&redirect_uri=http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/?ref=https://m9.allinmed.cn/dist/consult.html&response_type=code&scope=snsapi_base&state=b6#wechat_redirect"}},[e._v("喵！")])])}]}},15:function(e,t,a){function n(e){a(31)}var o=a(3)(a(32),a(33),n,null,null);e.exports=o.exports},17:function(e,t,a){function n(e){a(38)}var o=a(3)(a(39),a(40),n,null,null);e.exports=o.exports},23:function(e,t){},25:function(e,t,a){e.exports=a.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},26:function(e,t,a){"use strict";var n=a(1),o=a.n(n),r=a(2),i=a.n(r),s=a(11),c=(a.n(s),function(){function e(){o()(this,e)}return i()(e,[{key:"weChatJudge",value:function(e,t){var a=window.navigator.userAgent.toLowerCase();a.includes("micromessenger")?e(a):t(a)}}]),e}());t.a=new c},28:function(e,t){},29:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{show:{type:Boolean}}}},30:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0,!1,!1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"middle-tip-box ev-loading"},[n("section",{staticClass:"middle-tip-modal"},[n("figure",{staticClass:"middle-tip-box-text"},[n("img",{attrs:{src:a(25),alt:"loading..."}})])])])}]}},31:function(e,t){},32:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},methods:{cancelClickEvent:function(){this.$emit("cancelClickEvent")},ensureClickEvent:function(){this.$emit("ensureClickEvent")}},mounted:function(){},props:{confirmParams:{type:Object}}}},33:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"maskers confirmBox-tips show"},[a("section",{staticClass:"confirmBox-inner"},[a("article",{staticClass:"confirmBox-content"},[a("article",[e.confirmParams.title?a("h2",{staticStyle:{"font-weight":"bold"}},[e._v(e._s(e.confirmParams.title))]):e._e(),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.confirmParams.content,expression:"confirmParams.content"}]},[e._v(e._s(e.confirmParams.content))])])]),e._v(" "),a("footer",{staticClass:"confirmBox-btns"},[a("button",{staticClass:"confirmBox-cancelBtn",on:{click:e.cancelClickEvent}},[e._v(e._s(e.confirmParams.cancel))]),e._v(" "),a("button",{staticClass:"confirmBox-ensureBtn",on:{click:e.ensureClickEvent}},[e._v(e._s(e.confirmParams.ensure))])])])])},staticRenderFns:[]}},35:function(e,t,a){"use strict";function n(e){var t={upOrderStatusUrl:"/mcall/cms/pay/order/v1/update/"},a={orderId:e.orderId};new(function(){function n(){d()(this,n),this.init()}return l()(n,[{key:"init",value:function(){switch(e.outTradeNo=1==parseInt(e.isTest)?"":e.outTradeNo,parseInt(e.operationType)){case 1:a.outTradeNo=e.outTradeNo;break;case 2:a.status=e.status,a.payTime=e.payTime,a.outTradeNo=e.outTradeNo,a.orderType=e.orderType,a.orderSourceId=e.orderSourceId;break;case 3:a.status=e.status,a.outTradeNo=e.outTradeNo,a.orderType=e.orderType,a.orderSourceId=e.orderSourceId;break;case 4:a.status=e.status,a.orderType=e.orderType,a.orderSourceId=e.orderSourceId,e.charge&&"true"==e.charge&&(a.outTradeNo=e.outTradeNo,a.refundReason=e.refundReason,a.refundReasonDesc=e.refundReasonDesc);break;case 5:a.status=e.status,a.outRefundNo=e.outRefundNo,a.refundAmount=e.refundAmount,a.refundTime=e.refundTime;break;case 6:a.status=e.status}2==e.orderType&&(a.reservationStatus=e.reservationStatus),p.a.ajax({url:t.upOrderStatusUrl,method:"POST",data:a,done:function(t){e.callBack(t)},fail:function(t){e.errorCallBack()}})}}]),n}())(e)}function o(e){var t={wxBasePath:"",prepayPth:"/mcall/base/pay/external/v1/createPrepaidOrder/",operationOrderPth:"/mcall/customer/operation/order/v1/update/"},a={};new(function(){function o(){d()(this,o),this.init(),console.log(e)}return l()(o,[{key:"init",value:function(){console.log("微信支付");var t=this;1==parseInt(e.isTest)?t.paySuccess():t.wxReady()}},{key:"wxReady",value:function(){var e=this;h.wxGetToken({callBack:function(t){t.data.responseStatus&&(a.token=t.data.responseData.token,a.nonceStr=t.nonceStr,a.ipAddr=t.data.responseData.ipAddr,console.log("-------------token数据--------------"),console.log(t),e.prepaidOrder({token:a.token,nonceStr:a.nonceStr,ipAddr:a.ipAddr}))}})}},{key:"prepaidOrder",value:function(o){var r=this,i={total_fee:100*e.total_fee,body:"唯医骨科-"+e.body,trade_type:"JSAPI",scene:1,siteId:1,roleId:"2",openid:localStorage.getItem("openId"),nonceStr:o.nonceStr,token:o.token,ipAddr:o.ipAddr};console.log("-------------预支付参数--------------"),console.log(i),p.a.ajax({url:t.prepayPth,method:"POST",data:i,done:function(t){console.log(t),t&&"OK"==t.return_msg&&(console.log(t),a.dataL1=t,localStorage.setItem("orderNumber",t.out_trade_no),n({operationType:"1",orderId:e.orderId,outTradeNo:t.out_trade_no,callBack:function(e){e&&e.responseObject&&e.responseObject.responseStatus&&r.checkWxPay()},errorCallBack:function(){}}))}})}},{key:"checkWxPay",value:function(){var e=this;"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e.onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e.onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",e.onBridgeReady)):e.onBridgeReady()}},{key:"onBridgeReady",value:function(){var t=this,n=a.dataL1;Math.round((new Date).getTime()/1e3);console.log("-----pay-----"),WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:n.appid,timeStamp:n.timeStamp,nonceStr:n.nonceStr,package:"prepay_id="+n.prepay_id,signType:"MD5",paySign:n.sign},function(a){"get_brand_wcpay_request:ok"==a.err_msg?1==e.orderType&&0==e.orderSourceId?"shuntDoctor"==e.doctorType?t.creatShuntInquiryId({queryCallBack:function(a){e.orderSourceId=a,t.paySuccess()}}):t.creatInquiryId({queryCallBack:function(a){e.orderSourceId=a,t.paySuccess()}}):t.paySuccess():t.payError()})}},{key:"paySuccess",value:function(){n({operationType:"2",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:1==parseInt(e.isTest)?h.mathRandomNum({numberValue:10}):localStorage.getItem("orderNumber"),status:"2",payTime:"1",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus?e.callBack({responseStatus:"true",out_trade_no:localStorage.getItem("orderNumber")}):common.popup({text:"更新订单失败"})},errorCallBack:function(){common.popup({text:"更新订单失败"})}})}},{key:"payError",value:function(){n({operationType:"3",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:localStorage.getItem("orderNumber"),status:"1",payTime:"",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus&&e.callBack({responseStatus:"false"})},errorCallBack:function(){}})}},{key:"creatInquiryId",value:function(e){p.a.ajax({url:"/mcall/customer/case/consultation/v1/getMapById/",method:"POST",data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),consultationType:1,siteId:17},done:function(t){"NO DATA"==t.responseObject.responseMessage&&p.a.ajax({url:"/mcall/customer/case/consultation/v1/create/",method:"POST",data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),patientCustomerId:p.a.getPara().patientCustomerId,patientId:p.a.getPara().patientId,consultationType:1,consultationState:-1,consultationLevel:localStorage.getItem("orderPayType"),siteId:17,caseType:0},done:function(t){t.responseObject.responseStatus&&(localStorage.removeItem("docId"),sessionStorage.setItem("orderSourceId",t.responseObject.responsePk),e.queryCallBack(t.responseObject.responsePk))}})}})}},{key:"creatShuntInquiryId",value:function(t){p.a.ajax({url:"/mcall/customer/case/consultation/v1/getMapById/",method:"POST",data:{caseId:e.caseId,customerId:0,consultationType:0,siteId:17},done:function(a){"NO DATA"==a.responseObject.responseMessage&&p.a.ajax({url:"/mcall/customer/case/consultation/v1/create/",method:"POST",data:{caseId:e.caseId,customerId:0,patientCustomerId:e.patientCustomerId,patientId:e.patientId,consultationType:0,consultationState:4,siteId:17,caseType:0},done:function(e){e.responseObject.responseStatus&&t.queryCallBack(e.responseObject.responsePk)}})}})}}]),o}())(e)}function r(e){var t={wxBasePath:"",prepayPth:"/mcall/base/pay/external/v1/createPrepaidOrder/",operationOrderPth:"/mcall/customer/operation/order/v1/update/"},a={};new(function(){function n(){d()(this,n),this.init()}return l()(n,[{key:"init",value:function(){console.log("H5支付");var t=this;1==parseInt(e.isTest)?t.paySuccess():t.wxReady()}},{key:"wxReady",value:function(){var e=this;h.wxGetTokenPlus().then(function(t){t.data.responseStatus&&(a.token=t.data.responseData.token,a.nonceStr=t.nonceStr,a.ipAddr=t.data.responseData.ipAddr,e.prepaidOrder({token:a.token,nonceStr:a.nonceStr,ipAddr:a.ipAddr}))}).catch(function(e){console.log("h5,支付接口错误")})}},{key:"prepaidOrder",value:function(n){var o=this,r={total_fee:100*e.total_fee,body:"唯医骨科-"+e.body,trade_type:"MWEB",scene:1,siteId:1,roleId:"2",nonceStr:n.nonceStr,token:n.token,ipAddr:n.ipAddr};console.log(r),p.a.ajax({url:t.prepayPth,method:"POST",data:r,done:function(e){e&&"OK"==e.return_msg&&(console.log(e),a.dataL1=e,localStorage.setItem("orderNumber",e.out_trade_no),o.h5AskPay(e))}})}},{key:"h5AskPay",value:function(){var e=a.dataL1;console.log("-----pay-----"),localStorage.setItem("payOk",1),console.log(e.mweb_url),window.location.href=e.mweb_url+"&redirect_url="+encodeURIComponent(window.location.href)}}]),n}())(e)}function i(e){var t={outTradeNo:e.outTradeNo,scene:1,roleId:2,nonceStr:localStorage.getItem("nonceStr"),siteId:1,token:localStorage.getItem("token"),ipAddr:localStorage.getItem("ipAddr")};return console.log(t),new f.a(function(e,a){p.a.ajax({url:v.payResultUrl,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:t,done:function(t){t&&t.responseData&&t.responseData.dataList?e(t.responseData.dataList):a(new Error("望天，接口出错了"))}})})}function s(e){var t={createOrder:"/mcall/cms/pay/order/v1/create/",updateOrder:"/mcall/cms/pay/order/v1/update/"};new(function(){function a(){d()(this,a),this.init()}return l()(a,[{key:"init",value:function(){this.firstLoad(),console.log(e)}},{key:"firstLoad",value:function(){var a=this;this.createOrderData={caseId:e.data.caseId,patientCustomerId:e.data.patientCustomerId,patientId:e.data.patientId,doctorId:e.data.doctorId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,orderSourceType:e.data.orderSourceType,visitSiteId:"17"},"true"==e.data.isCharge?(this.createOrderData.orderAmount=e.data.orderAmount,this.createOrderData.status="1"):this.createOrderData.status="2",p.a.ajax({url:t.createOrder,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:this.createOrderData,done:function(t){t&&t.responseObject&&t.responseObject.responsePk?(a.orderId=t.responseObject.responsePk,a.orderSuccess({orderId:t.responseObject.responsePk})):e.backCreateError()},fail:function(e){}})}},{key:"orderSuccess",value:function(){var t=this;switch(parseInt(e.data.orderType)){case 1:case 3:"true"===e.data.isCharge?y.a.weChatJudge(function(e){t.goWxPay(e)},function(e){t.goH5Pay(e)}):e.backCreateSuccess(this.orderId);break;case 2:e.backCreateSuccess(this.orderId)}}},{key:"goWxPay",value:function(){o({isTest:0,orderId:this.orderId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,total_fee:e.data.orderAmount,body:e.data.body,doctorType:e.data.doctorType,caseId:e.data.caseId,patientCustomerId:e.data.patientCustomerId,patientId:e.data.patientId,callBack:function(t){"true"===t.responseStatus?e.wxPaySuccess():e.wxPayError()}})}},{key:"goH5Pay",value:function(){r({isTest:0,orderId:this.orderId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,total_fee:e.data.orderAmount,body:e.data.body,callBack:function(e){}})}}]),a}())(e)}var c=a(1),d=a.n(c),u=a(2),l=a.n(u),p=a(4),m=a(34),f=a.n(m),g=(a(11),function(){function e(t){d()(this,e)}return l()(e,[{key:"mathRandomNum",value:function(e){for(var t="",a=e.numberValue,n=[0,1,2,3,4,5,6,7,8,9],o=0;o<a;o++){t+=n[Math.floor(10*Math.random())]}return t}},{key:"mathRandom",value:function(e){for(var t="",a=e.numberValue,n=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],o=0;o<a;o++){t+=n[Math.floor(36*Math.random())]}return t.toLowerCase()}},{key:"wxGetTokenPlus",value:function(){var e=this.mathRandom({numberValue:32});return new f.a(function(t,a){p.a.ajax({url:"/mcall/base/pay/external/v1/getToken/",method:"POST",data:{roleId:2,nonceStr:e,siteId:1},done:function(n){localStorage.setItem("validityTime",Math.round((new Date).getTime()/1e3)),localStorage.setItem("token",n.responseData.token),localStorage.setItem("ipAddr",n.responseData.ipAddr),localStorage.setItem("nonceStr",e),n&&n.responseStatus?t({data:n,nonceStr:e}):a(err)}})})}},{key:"wxGetToken",value:function(e){var t=this.mathRandom({numberValue:32});p.a.ajax({url:"/mcall/base/pay/external/v1/getToken/",method:"POST",data:{roleId:2,nonceStr:t,siteId:1},done:function(a){localStorage.setItem("validityTime",Math.round((new Date).getTime()/1e3)),localStorage.setItem("token",a.responseData.token),localStorage.setItem("nonceStr",t),a&&a.responseData&&a.responseData.token&&a.responseData.token.length>0&&e.callBack({data:a,nonceStr:t})}})}},{key:"checkToken",value:function(){var e=Math.round((new Date).getTime()/1e3),t=localStorage.getItem("validityTime");return null!=t&&e-t<7200}},{key:"checkOpenId",value:function(){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}},{key:"wxGetOpenId",value:function(){var e=window.location.href,t=encodeURIComponent(e),a="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5288ad7f627608&redirect_uri="+t+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(common.getpara().code)-1===window.location.href.indexOf("openId")&&(window.location.href="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+common.getpara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var n=sessionStorage.getItem("count");n||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+common.getpara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+common.getpara().openId,localStorage.setItem("openId",common.getpara().openId))}else localStorage.setItem("currentUrl",e),window.location.href=a}}]),e}()),h=new g,v=(a(78),{payResultUrl:"/mcall/base/pay/external/v1/getResultBack/"}),y=a(26),I=function(){function e(t){d()(this,e)}return l()(e,[{key:"wxCloseOrder",value:function(){}},{key:"wxCreateOrder",value:function(e){s(e)}},{key:"wxUpOrder",value:function(e){n(e)}},{key:"wxPay",value:function(e){o(e)}},{key:"H5Pay",value:function(e){r(e)}},{key:"PayResult",value:function(e){return i(e)}}]),e}();t.a=new I},38:function(e,t){},39:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},mounted:function(){console.log()},props:{content:{type:String},imgUrl:{type:String}}}},4:function(e,t,a){"use strict";function n(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==m.a.getPara().patientCustomerId)e.customerId=0===m.a.getPara().patientCustomerId.length?0:m.a.getPara().patientCustomerId;else{if(void 0===m.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===m.a.getPara().customerId.length?0:m.a.getPara().customerId}Object(p.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",v()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var a=t.responseObject.responseData.dataList[0].mobile;if(a&&a.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}var o=a(48),r=a.n(o),i=a(49),s=a.n(i),c=a(1),d=a.n(c),u=a(2),l=a.n(u),p=a(6),m=a(5),f=function(){function e(){d()(this,e)}return l()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",a=window.location.origin+window.location.pathname+window.location.search,n=encodeURIComponent(a),o="";if(window.location.origin.includes("localhost"))return!1;o=window.location.hostname.includes("m9")?2:1,1==o?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==o&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+n+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(m.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+m.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var i=sessionStorage.getItem("count");i||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+m.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+m.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",m.a.getPara().openId))}else localStorage.setItem("currentUrl",a),localStorage.setItem("isReLoading","1"),window.location.href=r}}]),e}(),g=new f,h=a(7),v=a.n(h),y=function(){function e(){d()(this,e)}return l()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(p.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),I=new y,w=(a(11),function(){function e(){d()(this,e),this.removeByValue=function(e,t){for(var a=0;a<this.length;a++)if(e[a]==val){e.splice(a,1);break}return e}}return l()(e,[{key:"forbidShare",value:function(){m.a.getPara().isShare||I.wxforbidShare()}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var a=(new Date).getTime();a-e<=300&&t.preventDefault(),e=a},!1)}},{key:"ajax",value:function(e){Object(p.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,a={},n=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){n=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=n.split("&"),i=0;i<r.length;i++)o=r[i].split("="),a[o[0]]=decodeURIComponent(o[1])}return a}},{key:"getCookie",value:function(e){var t=void 0,a=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(a))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(s()(new r.a(e)))}},{key:"isWXBrowse",value:function(){return g.isWXBrowse()}},{key:"getByteLen",value:function(e){for(var t=0,a=0;a<e.length;a++)null!==e[a].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var a="",n=0,o=0;o<e.length&&(e.charCodeAt(o)>128?n+=2:n++,n<=t);o++)a=a.concat(e[o]);return n>t&&(a+=""),a}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"],a=this.isWXBrowse(),n=navigator.userAgent;return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===a?"WIFI"!==e.type||"wifi"!==e.type?n.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===a?n.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?1:0}},{key:"checkOpenId",value:function(){return g.checkOpenId()}},{key:"wxGetOpenId",value:function(){g.wxGetOpenId()}},{key:"mobileCheck",value:function(){n()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],a=e.time.substring(0,10).replace(/\-/g,"/"),n=new Date(a).getDay(),o="",r="",i=t[n],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:o=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",r=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:o=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),r=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:o,years:r,week:i,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}()),S=new w;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=S},40:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"middle-tip-modal popup-tips show"},[e.imgUrl?a("figure",{staticClass:"middle-tips-box-img"},[a("img",{attrs:{src:e.imgUrl,alt:""}})]):e._e(),e._v(" "),a("figure",{staticClass:"middle-tip-box-text"},[a("p",{staticClass:"tipText"},[e._v(e._s(e.content))])])])},staticRenderFns:[]}},5:function(e,t,a){"use strict";var n=a(1),o=a.n(n),r=a(2),i=a.n(r),s=function(){function e(){o()(this,e)}return i()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,a={},n=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){n=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=n.split("&"),i=0;i<r.length;i++)o=r[i].split("="),a[o[0]]=decodeURIComponent(o[1])}return a}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s},6:function(e,t,a){"use strict";function n(e){s.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),s()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+r()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")},function(t){e.fail&&e.fail(t)})}t.a=n;var o=a(7),r=a.n(o),i=a(19),s=a.n(i)},9:function(e,t,a){function n(e){a(28)}var o=a(3)(a(29),a(30),n,null,null);e.exports=o.exports}},[1445]);