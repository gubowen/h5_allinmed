webpackJsonp([12],{13:function(e,t){!function(e,t){function n(){var t=r.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;r.style.fontSize=n+"px",l.rem=e.rem=n}var o,i=e.document,r=i.documentElement,a=i.querySelector('meta[name="viewport"]'),s=i.querySelector('meta[name="flexible"]'),c=0,u=0,l=t.flexible||(t.flexible={});if(a){console.warn("将根据已有的meta标签来设置缩放比例");var d=a.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(u=parseFloat(d[1]),c=parseInt(1/u))}else if(s){var p=s.getAttribute("content");if(p){var f=p.match(/initial\-dpr=([\d\.]+)/),m=p.match(/maximum\-dpr=([\d\.]+)/);f&&(c=parseFloat(f[1]),u=parseFloat((1/c).toFixed(2))),m&&(c=parseFloat(m[1]),u=parseFloat((1/c).toFixed(2)))}}if(!c&&!u){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=g?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,u=1/c}if(r.setAttribute("data-dpr",c),!a)if(a=i.createElement("meta"),a.setAttribute("name","viewport"),a.setAttribute("content","initial-scale="+u+", maximum-scale="+u+", minimum-scale="+u+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(a);else{var w=i.createElement("div");w.appendChild(a),i.write(w.innerHTML)}e.addEventListener("resize",function(){clearTimeout(o),o=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(o),o=setTimeout(n,300))},!1),"complete"===i.readyState?i.body.style.fontSize=12*c+"px":i.addEventListener("DOMContentLoaded",function(e){i.body.style.fontSize=12*c+"px"},!1),n(),l.dpr=e.dpr=c,l.refreshRem=n,l.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},l.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},1338:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n.n(o),r=n(2),a=n.n(r),s=n(16),c=n(1339),u=n.n(c),l=n(21);n.n(l);new(function(){function e(){i()(this,e),this.init()}return a()(e,[{key:"init",value:function(){new s.a({render:function(e){return e(u.a)}}).$mount("#moreImage")}}]),e}())},1339:function(e,t,n){function o(e){n(1340)}var i=n(3)(n(1341),n(1342),o,null,null);e.exports=i.exports},1340:function(e,t){},1341:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(4),i=n(13);n.n(i);t.default={data:function(){return{localIdList:[],serverIdList:[]}},mounted:function(){o.a.forbidShare()},methods:{chooseImages:function(){var e=this;wx.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){e.localIdList=t.localIds,console.log("选择图片成功"),e.localIdList.forEach(function(t){e.uploadImages(t)})}})},uploadImages:function(e){var t=this;wx.uploadImage({localId:e,isShowProgressTips:1,success:function(e){t.serverIdList.push(e.serverId),console.log(t.serverIdList)},fail:function(e){console.log("上传失败"),console.log(e)}})}}}},1342:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%",height:"100%"}},[n("ul",{staticClass:"uploadImgBox"},e._l(e.localIdList,function(e){return n("li",[n("img",{attrs:{src:e}})])})),e._v(" "),n("button",{staticClass:"uploadImgBtn",on:{click:e.chooseImages}},[e._v("点击我上传图片")])])},staticRenderFns:[]}},21:function(e,t){},4:function(e,t,n){"use strict";function o(e){h.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),h()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+m()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")},function(t){e.fail&&e.fail(t)})}function i(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==w.a.getPara().patientCustomerId?e.customerId=0===w.a.getPara().patientCustomerId.length?0:w.a.getPara().patientCustomerId:void 0!==w.a.getPara().customerId?e.customerId=0===w.a.getPara().customerId.length?0:w.a.getPara().customerId:e.customerId=0,parseInt(e.customerId)>0)return!0;o({url:"/mcall/patient/customer/unite/v1/getById/",method:"POST",data:e,beforeSend:function(){},timeOut:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",m()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList.patientCustomerUnite.mobile;if(n&&n.length>0)return!0;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}var r=n(46),a=n.n(r),s=n(47),c=n.n(s),u=n(1),l=n.n(u),d=n(2),p=n.n(d),f=n(6),m=n.n(f),g=n(22),h=n.n(g),w=n(5),v=function(){function e(){l()(this,e)}return p()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,o=encodeURIComponent(n),i="";if(window.location.origin.includes("localhost"))return!1;i=window.location.hostname.includes("m9")?2:1,1==i?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==i&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+o+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(w.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+w.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var a=sessionStorage.getItem("count");a||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+w.a.getPara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+w.a.getPara().openId,localStorage.setItem("openId",w.a.getPara().openId))}else localStorage.setItem("currentUrl",n),window.location.href=r}}]),e}(),I=new v,y=function(){function e(){l()(this,e)}return p()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),o({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),x=new y,b=(n(10),function(){function e(){l()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e}}return p()(e,[{key:"forbidShare",value:function(){w.a.getPara().isShare||x.wxforbidShare()}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){o(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=o.split("&"),a=0;a<r.length;a++)i=r[a].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new a.a(e)))}},{key:"isWXBrowse",value:function(){return I.isWXBrowse()}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",o=0,i=0;i<e.length&&(e.charCodeAt(i)>128?o+=2:o++,o<=t);i++)n=n.concat(e[i]);return o>t&&(n+=""),n}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),o=navigator.userAgent;return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?1:0}},{key:"checkOpenId",value:function(){return I.checkOpenId()}},{key:"wxGetOpenId",value:function(){I.wxGetOpenId()}},{key:"mobileCheck",value:function(){i()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),o=new Date(n).getDay(),i="",r="",a=t[o],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:i=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",r=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:i=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),r=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:i,years:r,week:a,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}()),O=new b;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=O},5:function(e,t,n){"use strict";var o=n(1),i=n.n(o),r=n(2),a=n.n(r),s=function(){function e(){i()(this,e)}return a()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=o.split("&"),a=0;a<r.length;a++)i=r[a].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s}},[1338]);