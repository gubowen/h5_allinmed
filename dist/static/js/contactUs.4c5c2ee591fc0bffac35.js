webpackJsonp([12],{1176:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=n.n(i),r=n(2),a=n.n(r),s=n(18),c=n(1177),d=n.n(c),u=n(108),l=(n.n(u),n(41)),p=(n.n(l),n(23)),f=(n.n(p),n(133),n(4),n(58));n.n(f).a.attach(document.body);var m=function(){function e(){o()(this,e),this.init()}return a()(e,[{key:"init",value:function(){new s.a({render:function(e){return e(d.a)}}).$mount("#contactUs")}}]),e}();new m},1177:function(e,t,n){function i(e){n(1178)}var o=n(3)(n(1179),n(1180),i,null,null);e.exports=o.exports},1178:function(e,t){},1179:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(14);n.n(i);t.default={data:function(){return{}},components:{}}},1180:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0,!1,!1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"contactMain"},[n("section",{staticClass:"con_topBanner"}),e._v(" "),n("section",{staticClass:"con_center"},[n("section",{staticClass:"con_itemList"},[n("div",{staticClass:"con_workTimeBox"},[n("span",{staticClass:"workingTitle"},[n("span",{staticClass:"con_point"}),e._v("工作时间")]),e._v(" "),n("span",{staticClass:"workingWeek"},[e._v("周一至周五")]),e._v(" "),n("span",{staticClass:"workingHour"},[e._v("09:00-18:00")]),e._v(" "),n("span",{staticClass:"workingTip"},[e._v("节假日除外")])]),e._v(" "),n("div",{staticClass:"con_phone"},[n("a",{attrs:{href:"tel:010-59007006"}},[n("span",{staticClass:"con_phoneText"},[e._v("电话")]),n("span",{staticClass:"con_phoneNum"},[e._v("010-59007006")]),n("span",{staticClass:"con_phoneIcon"})])]),e._v(" "),n("div",{staticClass:"con_weiXin"},[n("span",{staticClass:"con_wxText"},[e._v("微信")]),n("span",{staticClass:"con_wxNum"},[e._v("weiyi635")])])]),e._v(" "),n("section",{staticClass:"con_itemList"},[n("div",{staticClass:"con_workTimeBox notWork"},[n("span",{staticClass:"workingTitle"},[n("span",{staticClass:"con_point"}),e._v("非工作时间")])]),e._v(" "),n("div",{staticClass:"con_email"},[n("span",{staticClass:"con_wxText"},[e._v("邮箱")]),n("span",{staticClass:"con_wxNum"},[e._v("help@allinmed.cn")])])])])])}]}},133:function(e,t,n){"use strict";var i=n(7),o=n.n(i);!function(e,t){"function"==typeof define&&(n(164)||define.cmd)?define(function(){return t(e)}):t(e,!0)}(window,function(e,t){function n(t,n,i){e.WeixinJSBridge?WeixinJSBridge.invoke(t,r(n),function(e){s(t,e,i)}):u(t,i)}function i(t,n,i){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){i&&i.trigger&&i.trigger(e),s(t,e,n)}):i?u(t,i):u(t,n)}function r(e){return e=e||{},e.appId=P.appId,e.verifyAppId=P.appId,e.verifySignType="sha1",e.verifyTimestamp=P.timestamp+"",e.verifyNonceStr=P.nonceStr,e.verifySignature=P.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e,t,n){var i,r;switch(delete t.err_code,delete t.err_desc,delete t.err_detail,i=t.errMsg,i||(i=t.err_msg,delete t.err_msg,i=c(e,i),t.errMsg=i),n=n||{},n._complete&&(n._complete(t),delete n._complete),i=t.errMsg||"",P.debug&&!n.isInnerInvoke&&alert(o()(t)),r=i.indexOf(":"),i.substring(r+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function c(e,t){var n,i,o=e,r=h[o];return r&&(o=r),n="ok",t&&(i=t.indexOf(":"),n=t.substring(i+1),"confirm"==n&&(n="ok"),"failed"==n&&(n="fail"),-1!=n.indexOf("failed_")&&(n=n.substring(7)),-1!=n.indexOf("fail_")&&(n=n.substring(5)),n=n.replace(/_/g," "),n=n.toLowerCase(),("access denied"==n||"no permission to execute"==n)&&(n="permission denied"),"config"==o&&"function not exist"==n&&(n="ok"),""==n&&(n="fail")),t=o+":"+n}function d(e){var t,n,i,o;if(e){for(t=0,n=e.length;n>t;++t)i=e[t],(o=g[i])&&(e[t]=o);return e}}function u(e,t){if(!(!P.debug||t&&t.isInnerInvoke)){var n=h[e];n&&(e=n),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function l(){0!=L.preVerifyState&&(_||S||P.debug||"6.0.2">T||L.systemType<0||C||(C=!0,L.appId=P.appId,L.initTime=M.initEndTime-M.initStartTime,L.preVerifyTime=M.preVerifyEndTime-M.preVerifyStartTime,W.getNetworkType({isInnerInvoke:!0,success:function(e){var t,n;L.networkType=e.networkType,t="http://open.weixin.qq.com/sdk/report?v="+L.version+"&o="+L.preVerifyState+"&s="+L.systemType+"&c="+L.clientVersion+"&a="+L.appId+"&n="+L.networkType+"&i="+L.initTime+"&p="+L.preVerifyTime+"&u="+L.url,n=new Image,n.src=t}})))}function p(){return(new Date).getTime()}function f(t){x&&(e.WeixinJSBridge?t():w.addEventListener&&w.addEventListener("WeixinJSBridgeReady",t,!1))}function m(){W.invoke||(W.invoke=function(t,n,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,r(n),i)},W.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}var g,h,w,v,y,I,_,S,x,k,b,T,C,O,M,L,P,V,R,W;if(!e.jWeixin)return g={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},h=function(){var e,t={};for(e in g)t[g[e]]=e;return t}(),w=e.document,v=w.title,y=navigator.userAgent.toLowerCase(),I=navigator.platform.toLowerCase(),_=!(!I.match("mac")&&!I.match("win")),S=-1!=y.indexOf("wxdebugger"),x=-1!=y.indexOf("micromessenger"),k=-1!=y.indexOf("android"),b=-1!=y.indexOf("iphone")||-1!=y.indexOf("ipad"),T=function(){var e=y.match(/micromessenger\/(\d+\.\d+\.\d+)/)||y.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),C=!1,O=!1,M={initStartTime:p(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},L={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",preVerifyState:1,systemType:b?1:k?2:-1,clientVersion:T,url:encodeURIComponent(location.href)},P={},V={_completes:[]},R={state:0,data:{}},f(function(){M.initEndTime=p()}),W={config:function(e){P=e,u("config",e);var t=!1!==P.check;f(function(){var e,i,o;if(t)n(g.config,{verifyJsApiList:d(P.jsApiList)},function(){V._complete=function(e){M.preVerifyEndTime=p(),R.state=1,R.data=e},V.success=function(){L.preVerifyState=0},V.fail=function(e){V._fail?V._fail(e):R.state=-1};var e=V._completes;return e.push(function(){l()}),V.complete=function(){for(var t=0,n=e.length;n>t;++t)e[t]();V._completes=[]},V}()),M.preVerifyStartTime=p();else{for(R.state=1,e=V._completes,i=0,o=e.length;o>i;++i)e[i]();V._completes=[]}}),P.beta&&m()},ready:function(e){0!=R.state?e():(V._completes.push(e),!x&&P.debug&&e())},error:function(e){"6.0.2">T||O||(O=!0,-1==R.state?e(R.data):V._fail=e)},checkJsApi:function(e){var t=function(e){var t,n,i=e.checkResult;for(t in i)(n=h[t])&&(i[n]=i[t],delete i[t]);return e};n("checkJsApi",{jsApiList:d(e.jsApiList)},function(){return e._complete=function(e){if(k){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){i(g.onMenuShareTimeline,{complete:function(){n("shareTimeline",{title:e.title||v,desc:e.title||v,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){i(g.onMenuShareAppMessage,{complete:function(){n("sendAppMessage",{title:e.title||v,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){i(g.onMenuShareQQ,{complete:function(){n("shareQQ",{title:e.title||v,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){i(g.onMenuShareWeibo,{complete:function(){n("shareWeiboApp",{title:e.title||v,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){i(g.onMenuShareQZone,{complete:function(){n("shareQZone",{title:e.title||v,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){n("startRecord",{},e)},stopRecord:function(e){n("stopRecord",{},e)},onVoiceRecordEnd:function(e){i("onVoiceRecordEnd",e)},playVoice:function(e){n("playVoice",{localId:e.localId},e)},pauseVoice:function(e){n("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){n("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){i("onVoicePlayEnd",e)},uploadVoice:function(e){n("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){n("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){n("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){n("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(k){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},previewImage:function(e){n(g.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){n("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){n("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getNetworkType:function(e){var t=function(e){var t,n,i,o=e.errMsg;if(e.errMsg="getNetworkType:ok",t=e.subtype,delete e.subtype,t)e.networkType=t;else switch(n=o.indexOf(":"),i=o.substring(n+1)){case"wifi":case"edge":case"wwan":e.networkType=i;break;default:e.errMsg="getNetworkType:fail"}return e};n("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){n("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},n(g.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())},hideOptionMenu:function(e){n("hideOptionMenu",{},e)},showOptionMenu:function(e){n("showOptionMenu",{},e)},closeWindow:function(e){e=e||{},n("closeWindow",{},e)},hideMenuItems:function(e){n("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){n("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){n("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){n("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){e=e||{},n("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){var t,n;b&&(t=e.resultStr)&&(n=JSON.parse(t),e.resultStr=n&&n.scan_code&&n.scan_code.scan_result)},e}())},openProductSpecificView:function(e){n(g.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){var t,i,o,r,a=e.cardList,s=[];for(t=0,i=a.length;i>t;++t)o=a[t],r={card_id:o.cardId,card_ext:o.cardExt},s.push(r);n(g.addCard,{card_list:s},function(){return e._complete=function(e){var t,n,i,o=e.card_list;if(o){for(o=JSON.parse(o),t=0,n=o.length;n>t;++t)i=o[t],i.cardId=i.card_id,i.cardExt=i.card_ext,i.isSuccess=!!i.is_succ,delete i.card_id,delete i.card_ext,delete i.is_succ;e.cardList=o,delete e.card_list}},e}())},chooseCard:function(e){n("chooseCard",{app_id:P.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())},openCard:function(e){var t,i,o,r,a=e.cardList,s=[];for(t=0,i=a.length;i>t;++t)o=a[t],r={card_id:o.cardId,code:o.code},s.push(r);n(g.openCard,{card_list:s},e)},chooseWXPay:function(e){n(g.chooseWXPay,a(e),e)}},t&&(e.wx=e.jWeixin=W),W})},14:function(e,t){!function(e,t){function n(){var t=r.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;r.style.fontSize=n+"px",u.rem=e.rem=n}var i,o=e.document,r=o.documentElement,a=o.querySelector('meta[name="viewport"]'),s=o.querySelector('meta[name="flexible"]'),c=0,d=0,u=t.flexible||(t.flexible={});if(a){console.warn("将根据已有的meta标签来设置缩放比例");var l=a.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(d=parseFloat(l[1]),c=parseInt(1/d))}else if(s){var p=s.getAttribute("content");if(p){var f=p.match(/initial\-dpr=([\d\.]+)/),m=p.match(/maximum\-dpr=([\d\.]+)/);f&&(c=parseFloat(f[1]),d=parseFloat((1/c).toFixed(2))),m&&(c=parseFloat(m[1]),d=parseFloat((1/c).toFixed(2)))}}if(!c&&!d){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=g?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,d=1/c}if(r.setAttribute("data-dpr",c),!a)if(a=o.createElement("meta"),a.setAttribute("name","viewport"),a.setAttribute("content","initial-scale="+d+", maximum-scale="+d+", minimum-scale="+d+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(a);else{var w=o.createElement("div");w.appendChild(a),o.write(w.innerHTML)}e.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===o.readyState?o.body.style.fontSize=12*c+"px":o.addEventListener("DOMContentLoaded",function(e){o.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=e.dpr=c,u.refreshRem=n,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},23:function(e,t){},4:function(e,t,n){"use strict";function i(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==f.a.getPara().patientCustomerId)e.customerId=0===f.a.getPara().patientCustomerId.length?0:f.a.getPara().patientCustomerId;else{if(void 0===f.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===f.a.getPara().customerId.length?0:f.a.getPara().customerId}Object(p.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",w()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}var o=n(48),r=n.n(o),a=n(49),s=n.n(a),c=n(1),d=n.n(c),u=n(2),l=n.n(u),p=n(6),f=n(5),m=function(){function e(){d()(this,e)}return l()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,i=encodeURIComponent(n),o="";if(window.location.origin.includes("localhost"))return!1;o=window.location.hostname.includes("m9")?2:1,1==o?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==o&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+i+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(f.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+f.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var a=sessionStorage.getItem("count");a||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+f.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+f.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",f.a.getPara().openId))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=r}}]),e}(),g=new m,h=n(7),w=n.n(h),v=function(){function e(){d()(this,e)}return l()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(p.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),y=new v,I=(n(11),function(){function e(){d()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e}}return l()(e,[{key:"forbidShare",value:function(){f.a.getPara().isShare||y.wxforbidShare()}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){Object(p.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){i=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=i.split("&"),a=0;a<r.length;a++)o=r[a].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(s()(new r.a(e)))}},{key:"isWXBrowse",value:function(){return g.isWXBrowse()}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",i=0,o=0;o<e.length&&(e.charCodeAt(o)>128?i+=2:i++,i<=t);o++)n=n.concat(e[o]);return i>t&&(n+=""),n}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),i=navigator.userAgent;return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?i.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?i.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?1:0}},{key:"checkOpenId",value:function(){return g.checkOpenId()}},{key:"wxGetOpenId",value:function(){g.wxGetOpenId()}},{key:"mobileCheck",value:function(){i()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),i=new Date(n).getDay(),o="",r="",a=t[i],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:o=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",r=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:o=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),r=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:o,years:r,week:a,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}()),_=new I;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=_},41:function(e,t){},5:function(e,t,n){"use strict";var i=n(1),o=n.n(i),r=n(2),a=n.n(r),s=function(){function e(){o()(this,e)}return a()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){i=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=i.split("&"),a=0;a<r.length;a++)o=r[a].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s},6:function(e,t,n){"use strict";function i(e){s.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),s()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+r()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")},function(t){e.fail&&e.fail(t)})}t.a=i;var o=n(7),r=n.n(o),a=n(19),s=n.n(a)}},[1176]);