webpackJsonp([10],{18:function(e,t){!function(e,t){function n(){var t=a.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;a.style.fontSize=n+"px",l.rem=e.rem=n}var o,i=e.document,a=i.documentElement,r=i.querySelector('meta[name="viewport"]'),s=i.querySelector('meta[name="flexible"]'),c=0,u=0,l=t.flexible||(t.flexible={});if(r){console.warn("将根据已有的meta标签来设置缩放比例");var d=r.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(u=parseFloat(d[1]),c=parseInt(1/u))}else if(s){var p=s.getAttribute("content");if(p){var f=p.match(/initial\-dpr=([\d\.]+)/),m=p.match(/maximum\-dpr=([\d\.]+)/);f&&(c=parseFloat(f[1]),u=parseFloat((1/c).toFixed(2))),m&&(c=parseFloat(m[1]),u=parseFloat((1/c).toFixed(2)))}}if(!c&&!u){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),v=e.devicePixelRatio;c=g?v>=3&&(!c||c>=3)?3:v>=2&&(!c||c>=2)?2:1:1,u=1/c}if(a.setAttribute("data-dpr",c),!r)if(r=i.createElement("meta"),r.setAttribute("name","viewport"),r.setAttribute("content","initial-scale="+u+", maximum-scale="+u+", minimum-scale="+u+", user-scalable=no, viewport-fit=cover"),a.firstElementChild)a.firstElementChild.appendChild(r);else{var h=i.createElement("div");h.appendChild(r),i.write(h.innerHTML)}e.addEventListener("resize",function(){clearTimeout(o),o=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(o),o=setTimeout(n,300))},!1),"complete"===i.readyState?i.body.style.fontSize=12*c+"px":i.addEventListener("DOMContentLoaded",function(e){i.body.style.fontSize=12*c+"px"},!1),n(),l.dpr=e.dpr=c,l.refreshRem=n,l.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},l.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},23:function(e,t){},355:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n.n(o),a=n(2),r=n.n(a),s=n(10),c=n(360),u=n.n(c),l=n(71),d=n(23),p=(n.n(d),n(8)),f=(n.n(p),n(18)),m=(n.n(f),n(565)),g=n.n(m),v=n(568),h=n.n(v),w=n(619),y=n.n(w),b=n(627),x=n.n(b),_=n(631),S=n.n(_);new(function(){function e(){i()(this,e),this.init()}return r()(e,[{key:"init",value:function(){s.a.use(l.a),this.routerStart(),this.router=new l.a({routes:this.routes});new s.a({router:this.router,render:function(e){return e(u.a)}}).$mount("#comExample")}},{key:"routerStart",value:function(){this.routes=[{path:"/",redirect:"/indexs"},{path:"/indexs",name:"indexs",component:g.a},{path:"/buttons",name:"buttons",component:h.a},{path:"/switch",name:"switch",component:y.a},{path:"/MultipleChoice.vue",name:"MultipleChoice",component:x.a},{path:"/SingleChoice",name:"SingleChoice",component:S.a}]}}]),e}())},360:function(e,t,n){function o(e){n(361)}var i=n(0)(null,n(363),o,null,null);e.exports=i.exports},361:function(e,t){},363:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"com-exa-box"},[n("router-view")],1)},staticRenderFns:[]}},4:function(e,t,n){"use strict";function o(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==m.a.getPara().patientCustomerId)e.customerId=0===m.a.getPara().patientCustomerId.length?0:m.a.getPara().patientCustomerId;else{if(void 0===m.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===m.a.getPara().customerId.length?0:m.a.getPara().customerId}Object(f.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",w()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}function i(e){if(e.$root===e)return"root";var t=e._isVue?e.$options&&e.$options.name||e.$options&&e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options&&e.$options.__file?" at "+(e.$options&&e.$options.__file):"")}var a=n(49),r=n.n(a),s=n(50),c=n.n(s),u=n(1),l=n.n(u),d=n(2),p=n.n(d),f=n(6),m=n(5),g=function(){function e(){l()(this,e)}return p()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t=localStorage.getItem("userId"),n=localStorage.getItem("openIdCheckCustomer");return null!=e&&t==n}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,o=encodeURIComponent(n),i="";if(window.location.origin.includes("localhost"))return!1;i=window.location.hostname.includes("m9")?2:1,1==i?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==i&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var a="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+o+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(m.a.getPara().code)-1===window.location.href.indexOf("openId")&&(localStorage.removeItem("count"),window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+m.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var r=localStorage.getItem("count");r||(localStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+m.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+m.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",m.a.getPara().openId),localStorage.setItem("openIdCheckCustomer",localStorage.getItem("userId")))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=a}}]),e}(),v=new g,h=n(11),w=n.n(h),y=function(){function e(){l()(this,e)}return p()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(f.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems","startRecord","stopRecord","playVoice"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),b=new y,x=n(7),_=(n(8),n(10)),S=function(){return window.location.host.includes("m.allinmed")?"production":"development"},I=function(){if("production"===S()){var e=n(51);e.apikey="617001e96c72b7b07126e74ab5c611c473d5f6396e63c1e5a9eef8b98cae3830",_.a.config.errorHandler=function(t,n,o){var a=i(n),r=n.$options&&n.$options.propsData;e.notifyError(t,{metaData:{componeSntName:a,propsData:r,info:o}})}}},C=function(){function e(){l()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e},I()}return p()(e,[{key:"forbidShare",value:function(){x.a.weChatJudge(function(){b.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){Object(f.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var a=o.split("&"),r=0;r<a.length;r++)i=a[r].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new r.a(e)))}},{key:"isWXBrowse",value:function(){return v.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==v.isWXBrowse()?21:17}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",o=0,i=0;i<e.length&&(e.charCodeAt(i)>128?o+=2:o++,o<=t);i++)n=n.concat(e[i]);return o>t&&(n+=""),n}},{key:"getNetWork",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"];return"number"==typeof e.type?e.type_text=t[e.type||e.effectiveType]:e.type_text=e.effectiveType,"number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),e.type_text}},{key:"getDeviceType",value:function(){var e="",t=this.isWXBrowse();return"androidWX"===t?e="Android":"iphoneWX"===t&&(e="IOS"),e}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:"unknown"},t=["unknown","","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),o=navigator.userAgent,i="";return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?i=1:x.a.weChatJudge(function(){i=0},function(){i=1}),i}},{key:"checkOpenId",value:function(){return v.checkOpenId()}},{key:"wxGetOpenId",value:function(){v.wxGetOpenId()}},{key:"mobileCheck",value:function(){o()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),o=new Date(n).getDay(),i="",a="",r=t[o],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:i=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",a=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:i=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),a=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:i,years:a,week:r,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}(),k=new C;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}},window.version="1.1.3"}();t.a=k},5:function(e,t,n){"use strict";var o=n(1),i=n.n(o),a=n(2),r=n.n(a),s=function(){function e(){i()(this,e)}return r()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var a=o.split("&"),r=0;r<a.length;r++)i=a[r].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s},565:function(e,t,n){function o(e){n(566)}var i=n(0)(null,n(567),o,null,null);e.exports=i.exports},566:function(e,t){},567:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"com-exa-list"},[n("li",[n("router-link",{attrs:{to:"/buttons"}},[e._v("Buttons")])],1),e._v(" "),n("li",[n("router-link",{attrs:{to:"/Switch"}},[e._v("Switch")])],1),e._v(" "),n("li",[n("router-link",{attrs:{to:"/MultipleChoice"}},[e._v("Multiple Choice")])],1),e._v(" "),n("li",[n("router-link",{attrs:{to:"/SingleChoice"}},[e._v("Single Choice")])],1)])},staticRenderFns:[]}},568:function(e,t,n){function o(e){n(569)}var i=n(0)(n(570),n(618),o,null,null);e.exports=i.exports},569:function(e,t){},570:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=(n(4),n(614)),i=n.n(o);t.default={data:function(){return{}},components:{buttons:i.a}}},6:function(e,t,n){"use strict";function o(e){s.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),s()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+a()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(t){e.fail&&e.fail(t)})}t.a=o;var i=n(11),a=n.n(i),r=n(20),s=n.n(r)},614:function(e,t,n){function o(e){n(615)}var i=n(0)(n(616),n(617),o,null,null);e.exports=i.exports},615:function(e,t){},616:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"amed-button",methods:{buttonCallBack:function(){this.$emit("buttonCallBack")}},props:{buttonText:{type:String,default:"下一页"},buttonSize:{type:String,default:"normal",validator:function(e){return["large","normal","small"].indexOf(e)>-1}},buttonStyle:{type:String,default:"light",validator:function(e){return["light","disable","warning"].indexOf(e)>-1}}}}},617:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("button",{staticClass:"amed-button",class:["amed-button-"+e.buttonSize,"amed-button-"+e.buttonStyle],on:{click:e.buttonCallBack}},[e._v(e._s(e.buttonText))])},staticRenderFns:[]}},618:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("buttons")],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonStyle:"disable"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonStyle:"warning"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonSize:"large",buttonStyle:"light"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonSize:"large",buttonStyle:"disable"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonSize:"large",buttonStyle:"warning"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonSize:"small",buttonStyle:"light"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonSize:"small",buttonStyle:"disable"}})],1),e._v(" "),n("li",[n("buttons",{attrs:{buttonSize:"small",buttonStyle:"warning"}})],1)])},staticRenderFns:[]}},619:function(e,t,n){function o(e){n(620)}var i=n(0)(n(621),n(626),o,null,null);e.exports=i.exports},620:function(e,t){},621:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(622),i=n.n(o);t.default={data:function(){return{named:"对",unnamed:"不对",switcherSize:large,switcherColor:ren}},components:{switcher:i.a}}},622:function(e,t,n){function o(e){n(623)}var i=n(0)(n(624),n(625),o,null,null);e.exports=i.exports},623:function(e,t){},624:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"amed-switcher",data:function(){return{isShow:!0,conclusion:""}},methods:{ShowOff:function(){this.isShow=!this.isShow},function:function(){return".switcher-anim".prop("checked")?conclusion="选中":conclusion="未选中",conclusion}},props:{named:{type:String,default:"未选中"},unnamed:{type:String,default:"选中"},switcherSize:{style:String,default:"normal",validator:function(e){return["large","small"].indexOf(e)>-1}},switcherColor:{type:String,default:"green",validator:function(e){return["green","red"].indexOf(e)>-1}}}}},625:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticStyle:{"text-align":"center"}},[n("input",{staticClass:"amed-switcher switcher-anim",class:["amed-switcher-"+e.switcherColor,"amed-switcher-"+e.switcherSize],attrs:{type:"checkbox"},on:{click:e.ShowOff}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.isShow,expression:"!isShow"}],staticStyle:{color:"#2FC5BD"}},[e._v(e._s(e.named))]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticStyle:{color:"#2FC5BD"}},[e._v(e._s(e.unnamed))])])},staticRenderFns:[]}},626:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("section")},staticRenderFns:[]}},627:function(e,t,n){function o(e){n(628)}var i=n(0)(n(629),n(630),o,null,null);e.exports=i.exports},628:function(e,t){},629:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{suggestionType:{A:!1,B:!1,C:!1}}}}},630:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("section",{staticClass:"feedback-main"},[n("section",{staticClass:"question"},[n("p",{staticClass:"question-type",class:{on:e.suggestionType.A},on:{click:function(t){t.stopPropagation(),e.suggestionType.A=!e.suggestionType.A}}},[n("span",[e._v("龍神の剣を喰え!")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("品尝神龙之力吧!")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.B},on:{click:function(t){t.stopPropagation(),e.suggestionType.B=!e.suggestionType.B}}},[n("span",[e._v("龍が我が敵を喰らう!")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("龙神啊，吞噬我的敌人吧！")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.C},on:{click:function(t){t.stopPropagation(),e.suggestionType.C=!e.suggestionType.C}}},[n("span",[e._v("疾きこと風の如く")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("死亡如风，常伴吾身")])]),e._v(" "),n("button",{staticClass:"btn-primary go-next"},[e._v("Genji")])])])},staticRenderFns:[]}},631:function(e,t,n){function o(e){n(632)}var i=n(0)(n(633),n(634),o,null,null);e.exports=i.exports},632:function(e,t){},633:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{question:1,suggestionType:{A:!1,B:!1,C:!1}}}}},634:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("section",{staticClass:"main"},[n("section",{staticClass:"question"},[n("p",{staticClass:"question-type",class:{on:e.suggestionType.A},on:{click:function(t){t.stopPropagation(),e.suggestionType.A=!e.suggestionType.A}}},[n("span",[e._v("龍神の剣を喰え!")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("品尝神龙之力吧!")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.B},on:{click:function(t){t.stopPropagation(),e.suggestionType.B=!e.suggestionType.B}}},[n("span",[e._v("龍が我が敵を喰らう!")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("龙神啊，吞噬我的敌人吧！")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.C},on:{click:function(t){t.stopPropagation(),e.suggestionType.C=!e.suggestionType.C}}},[n("span",[e._v("疾きこと風の如く")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("死亡如风，常伴吾身")])]),e._v(" "),n("button",{staticClass:"submit"},[e._v("gogogo")])])])},staticRenderFns:[]}},7:function(e,t,n){"use strict";var o=n(1),i=n.n(o),a=n(2),r=n.n(a),s=n(8),c=(n.n(s),function(){function e(){i()(this,e)}return r()(e,[{key:"weChatJudge",value:function(e,t){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?e(n):t(n)}}]),e}());t.a=new c}},[355]);