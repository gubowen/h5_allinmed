webpackJsonp([9],{13:function(t,e,n){function o(t){n(29)}var i=n(0)(n(30),n(31),o,null,null);t.exports=i.exports},1471:function(t,e,n){n(52),t.exports=n(1472)},1472:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n.n(o),a=n(2),s=n.n(a),r=n(11),c=n(1473),l=n.n(c),u=n(86),d=n(69),p=n.n(d),f=(n(27),n(91)),g=n.n(f),m=n(1477),h=n.n(m),v=[{path:"/",redirect:"/home"},{path:"/followWeChat",name:"followWeChat",component:g.a,meta:{keepAlive:!0}},{path:"/home",name:"home",component:h.a,meta:{keepAlive:!0}}],w=n(26);r.a.use(w.a);var _=new w.a.Store({state:{attentionFlag:!0,loading:!1},mutations:{setAttentionFlag:function(t,e){t.attentionFlag=e},setLoadingState:function(t,e){t.loading=e}}});n(9);p.a.attach(document.body);var y=function(){function t(){i()(this,t),this.init()}return s()(t,[{key:"init",value:function(){r.a.use(u.a),this.registerRouter(),this.goToRouter(),new r.a({el:"#app",store:_,router:this.router,render:function(t){return t(l.a)}})}},{key:"registerRouter",value:function(){this.router=new u.a({routes:v,scrollBehavior:function(t,e,n){return{x:0,y:0}}})}},{key:"goToRouter",value:function(){}}]),t}();new y},1473:function(t,e,n){function o(t){n(1474)}var i=n(0)(n(1475),n(1476),o,null,null);t.exports=i.exports},1474:function(t,e){},1475:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(13),i=n.n(o);e.default={components:{Loading:i.a}}},1476:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app"},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view",{staticStyle:{"min-height":"100%"}}):t._e()],1),t._v(" "),t.$store.state.loading?n("Loading"):t._e()],1)},staticRenderFns:[]}},1477:function(t,e,n){function o(t){n(1478)}var i=n(0)(n(1479),n(1480),o,null,null);t.exports=i.exports},1478:function(t,e){},1479:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=o(19),a=(o.n(i),o(272)),s=o.n(a),r=o(81),c=o.n(r),l=o(4),u=o(11),d=o(38),p=o(60),f=o.n(p),g=o(68),m=(o.n(g),o(61)),h=(o.n(m),new d.a),v={loginUrl:"/dist/mLogin.html?from=index",diagnose:"/dist/consult.html",historyUrl:"/dist/myConsult.html",getOrderHistoryLists:"/mcall/customer/case/consultation/v1/getMapList/",personalMessage:"/mcall/patient/customer/unite/v1/getPatientInfo/",adList:"/mcall/ad/position/profile/getMapList/"};u.a.use(f.a),n.default={data:function(){return{loginFlag:!1,wxLoginFlag:!1,diagnoseList:[],dataGetFinish:!1,adList:[]}},components:{attention:s.a,tabbar:c.a},computed:{swiper:function(){return this.$refs.mySwiper.swiper},swiperOption:function(){return{notNextTick:!0,loop:this.adList.length>1,direction:"horizontal",grabCursor:!0,setWrapperSize:!0,zoom:!1,autoHeight:!0,pagination:".swiper-pagination",paginationType:"bullets",paginationClickable:!0,mousewheelControl:!0,observeParents:!0,debugger:!0}}},methods:{init:function(){this.loginJudge(),this.getAdList()},getOrderHistoryLists:function(){var t=this;l.a.ajax({url:v.getOrderHistoryLists,method:"post",data:{patientCustomerId:localStorage.getItem("userId"),isValid:1,firstResult:0,maxResult:1,logoUseFlag:3},timeout:3e4,done:function(e){e.responseObject.responseData.dataList&&e.responseObject.responseData.dataList.length>0?t.diagnoseList=e.responseObject.responseData.dataList:t.diagnoseList=[],t.dataGetFinish=!0,t.$store.commit("setLoadingState",!1)}})},getImgUrl:function(t){return 0==t.consultationType?t.logoUrl?t.logoUrl:"/image/img00/myServices/doctor_portrait.png":t.logoUrl?t.logoUrl:"/image/img00/doctorMain/doc_logo.png"},bannerHref:function(t){},getFullName:function(t){return t.fullName.length>6?t.fullName.substring(0,6)+"...":t.fullName},getInquiryType:function(t){var e="";if(1==t.consultationType)switch(Number(t.consultationLevel)){case 0:case 1:e="图文问诊";break;case 3:e="特需问诊"}return e},attentionHandle:function(){this.$router.push({name:"followWeChat"})},diagnoseEvent:function(t){console.log(t.target),this.loginFlag?g_sps.jump(t.target,v.diagnose):(localStorage.setItem("backUrl",window.location.href),g_sps.jump(t.target,v.loginUrl))},moreEvent:function(t){this.loginFlag?g_sps.jump(t.target,v.historyUrl):(localStorage.setItem("backUrl",window.location.href),g_sps.jump(t.target,v.loginUrl))},loginEvent:function(){localStorage.setItem("backUrl",window.location.href),g_sps.jump(e.target,v.loginUrl)},getAdList:function(){var t=this;l.a.ajax({url:v.adList,method:"post",data:{siteId:l.a.getSiteId(),channelId:170,platformId:1,positionId:583},done:function(e){e.responseObject.responseStatus&&(t.adList=e.responseObject.responseData.data_list[0].ad_profile_attachment),t.$store.commit("setLoadingState",!1)}})},loginJudge:function(){var t=this;this.$store.commit("setLoadingState",!0),h.getStatus().then(function(e){console.log(e),e.data.responseObject.responseStatus?(t.loginFlag=!0,t.getOrderHistoryLists()):(t.loginFlag=!1,t.dataGetFinish=!0,t.$store.commit("setLoadingState",!1))})}},created:function(){this.init()}}},1480:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mHome"},[n("attention",{on:{attentionHandle:t.attentionHandle}}),t._v(" "),n("figure",{staticClass:"banner"},[t.adList.length>0?n("swiper",{ref:"mySwiper",staticStyle:{width:"90%"},attrs:{options:t.swiperOption}},[t._l(t.adList,function(e,o){return n("swiper-slide",{key:e.imgId,staticClass:"banner-slider",class:{"swiper-no-swiping":t.adList.length<=1}},[n("a",{attrs:{href:e.adAdditionalUrl},on:{click:function(n){t.bannerHref(e)}}},[n("img",{attrs:{src:e.adAttUrl}})])])}),t._v(" "),n("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2):t._e()],1),t._v(" "),n("figure",{staticClass:"advertising"},[t._v("12万权威专家在线出诊")]),t._v(" "),n("div",{attrs:{"data-alcode-mod":"740"}},[n("figure",{staticClass:"diagnose"},[n("section",{staticClass:"btn-diagnose",attrs:{"data-alcode":"e144"},on:{click:t.diagnoseEvent}},[t._v("点击问诊")])]),t._v(" "),n("figure",{directives:[{name:"show",rawName:"v-show",value:t.dataGetFinish,expression:"dataGetFinish"}],staticClass:"history"},[n("header",[n("h3",[t._v("问诊历史")]),t._v(" "),n("p",{staticClass:"btn-more",attrs:{"data-alcode":"e145"},on:{click:t.moreEvent}},[t._v("更多")])]),t._v(" "),t.loginFlag?t._e():n("section",{staticClass:"content"},[n("section",{staticClass:"login"},[n("p",[t._v("您还没有登录")]),t._v(" "),n("div",{staticClass:"btn-login",on:{click:t.loginEvent}},[t._v("点击登录")])])]),t._v(" "),t.loginFlag&&0==t.diagnoseList.length?n("section",{staticClass:"content"},[n("section",{staticClass:"login"},[n("p",[t._v("您还没有问诊记录")]),t._v(" "),n("section",{staticClass:"btn-login",attrs:{"data-alcode":"e146"},on:{click:t.diagnoseEvent}},[t._v("点击看病")])])]):t._e(),t._v(" "),t._l(t.diagnoseList,function(e){return t.loginFlag&&t.diagnoseList.length>0?n("section",{staticClass:"history-info",attrs:{"data-alcode":"e146"},on:{click:t.moreEvent}},[n("div",{staticClass:"doctor"},[n("div",{staticClass:"doctor-img"},[n("img",{attrs:{src:t.getImgUrl(e)}})]),t._v(" "),n("div",{staticClass:"doctor-info"},[n("p",{staticClass:"doctor-type"},[n("span",{staticClass:"name"},[t._v(t._s(0==e.consultationType?"唯医门诊医生":t.getFullName(e)))]),n("span",{staticClass:"career"},[t._v(t._s(e.medicalTitle))])]),t._v(" "),n("p",{staticClass:"doctor-time"},[n("span",[t._v(t._s(t.getInquiryType(e)))]),t._v(" "),n("span",[t._v(t._s(e.createTime.substring(0,e.createTime.length-2)))])])])]),t._v(" "),n("div",{staticClass:"patient"},[n("div",{staticClass:"patient-info"},[n("p",{staticClass:"title"},[t._v("患者")]),t._v(" "),n("p",{staticClass:"detail"},[t._v(t._s(e.patientName&&e.patientName.length>5?e.patientName.substring(0,5)+"...":e.patientName))])]),t._v(" "),n("div",{staticClass:"patient-info"},[n("p",{staticClass:"title"},[t._v("主诉")]),t._v(" "),n("p",{staticClass:"detail"},[t._v(t._s(e.mainContent.caseMain))])])])]):t._e()})],2)]),t._v(" "),n("tabbar",{attrs:{selected:1}})],1)},staticRenderFns:[]}},157:function(t,e,n){var o=n(0)(n(87),n(88),null,null,null);t.exports=o.exports},158:function(t,e,n){var o=n(0)(n(89),n(90),null,null,null);t.exports=o.exports},19:function(t,e){!function(t,e){function n(){var e=a.getBoundingClientRect().width;e/c>540&&(e=540*c);var n=e/10;a.style.fontSize=n+"px",u.rem=t.rem=n}var o,i=t.document,a=i.documentElement,s=i.querySelector('meta[name="viewport"]'),r=i.querySelector('meta[name="flexible"]'),c=0,l=0,u=e.flexible||(e.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var d=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(l=parseFloat(d[1]),c=parseInt(1/l))}else if(r){var p=r.getAttribute("content");if(p){var f=p.match(/initial\-dpr=([\d\.]+)/),g=p.match(/maximum\-dpr=([\d\.]+)/);f&&(c=parseFloat(f[1]),l=parseFloat((1/c).toFixed(2))),g&&(c=parseFloat(g[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var m=(t.navigator.appVersion.match(/android/gi),t.navigator.appVersion.match(/iphone/gi)),h=t.devicePixelRatio;c=m?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,l=1/c}if(a.setAttribute("data-dpr",c),!s)if(s=i.createElement("meta"),s.setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no, viewport-fit=cover"),a.firstElementChild)a.firstElementChild.appendChild(s);else{var v=i.createElement("div");v.appendChild(s),i.write(v.innerHTML)}t.addEventListener("resize",function(){clearTimeout(o),o=setTimeout(n,300)},!1),t.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(o),o=setTimeout(n,300))},!1),"complete"===i.readyState?i.body.style.fontSize=12*c+"px":i.addEventListener("DOMContentLoaded",function(t){i.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=t.dpr=c,u.refreshRem=n,u.rem2px=function(t){var e=parseFloat(t)*this.rem;return"string"==typeof t&&t.match(/rem$/)&&(e+="px"),e},u.px2rem=function(t){var e=parseFloat(t)/this.rem;return"string"==typeof t&&t.match(/px$/)&&(e+="rem"),e}}(window,window.lib||(window.lib={}))},25:function(t,e,n){t.exports=n.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},27:function(t,e){},272:function(t,e,n){function o(t){n(273)}var i=n(0)(n(274),n(275),o,null,null);t.exports=i.exports},273:function(t,e){},274:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(41),i=new o.a;e.default={data:function(){return{showFlag:!0}},methods:{init:function(){localStorage.getItem("userId")?localStorage.getItem("hasCloseAttention")?this.showFlag=!0:this.getPersonal():this.showFlag=!1},close:function(){this.showFlag=!0},attentionEvent:function(){this.$emit("attentionHandle")},getPersonal:function(){var t=this;i.getMessage(localStorage.getItem("userId")).then(function(e){var n=e.responseObject.responseData;n&&1===parseInt(n.uniteFlagWeixin)?(localStorage.setItem("hasCloseAttention",!0),t.showFlag=!0):t.showFlag=!1})}},mounted:function(){this.init()}}},275:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{directives:[{name:"show",rawName:"v-show",value:!t.showFlag,expression:"!showFlag"}],staticClass:"header",attrs:{"data-alcode-mod":"742"}},[n("div",{staticClass:"btn-close",on:{click:function(e){t.close()}}}),t._v(" "),n("div",{staticClass:"btn-attention",attrs:{"data-alcode":"e143"},on:{click:t.attentionEvent}},[t._v("点击关注")])])},staticRenderFns:[]}},29:function(t,e){},30:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{show:{type:Boolean}}}},31:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"middle-tip-box ev-loading"},[o("section",{staticClass:"middle-tip-modal"},[o("figure",{staticClass:"middle-tip-box-text"},[o("img",{attrs:{src:n(25),alt:"loading..."}})])])])}]}},38:function(t,e,n){"use strict";n.d(e,"a",function(){return p});var o=n(10),i=n.n(o),a=n(1),s=n.n(a),r=n(2),c=n.n(r),l=n(20),u=n.n(l),d={getCheckSession:"/mcall/patient/customer/unite/v1/checkSession/"},p=function(){function t(){s()(this,t)}return c()(t,[{key:"getStatus",value:function(){return new i.a(function(t,e){u()({url:d.getCheckSession,method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(e){e.data.responseObject.responseStatus?(console.log(e.data.responseObject.responsePk),localStorage.setItem("userId",e.data.responseObject.responsePk)):(localStorage.removeItem("userId"),localStorage.removeItem("userName"),localStorage.removeItem("mobile"),localStorage.removeItem("logoUrl")),t(e)},function(t){e(t)})})}}]),t}()},4:function(t,e,n){"use strict";function o(){var t={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==g.a.getPara().patientCustomerId)t.customerId=0===g.a.getPara().patientCustomerId.length?0:g.a.getPara().patientCustomerId;else{if(void 0===g.a.getPara().customerId)return void(t.customerId=0);t.customerId=0===g.a.getPara().customerId.length?0:g.a.getPara().customerId}Object(f.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:t,beforeSend:function(){},timeout:2e3,done:function(e){if(localStorage.setItem("customerBaseInfo_one",w()(e)),e&&e.responseObject&&e.responseObject.responseData&&e.responseObject.responseData.dataList){var n=e.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+t.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+t.customerId}}})}function i(t){if(t.$root===t)return"root";var e=t._isVue?t.$options&&t.$options.name||t.$options&&t.$options._componentTag:t.name;return(e?"component <"+e+">":"anonymous component")+(t._isVue&&t.$options&&t.$options.__file?" at "+(t.$options&&t.$options.__file):"")}var a=n(53),s=n.n(a),r=n(54),c=n.n(r),l=n(1),u=n.n(l),d=n(2),p=n.n(d),f=n(6),g=n(5),m=function(){function t(){u()(this,t)}return p()(t,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var t=localStorage.getItem("openId"),e=localStorage.getItem("userId"),n=localStorage.getItem("openIdCheckCustomer"),o="";return null!=t&&e==n?o=!0:(o=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),o}return!0}},{key:"isWXBrowse",value:function(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)&&t.indexOf("iphone")>0?"iphoneWX":"micromessenger"==t.match(/MicroMessenger/i)&&t.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var t="",e="",n=window.location.origin+window.location.pathname+window.location.search,o=encodeURIComponent(n),i="";if(window.location.origin.includes("localhost"))return!1;i=window.location.hostname.includes("m9")?2:1,1==i?(t="wxe8384f7b06c169ef",e="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==i&&(t="wxaa5288ad7f627608",e="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var a="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+t+"&redirect_uri="+o+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(g.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=e+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+g.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var s=sessionStorage.getItem("count");s||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+g.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+g.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",g.a.getPara().openId),localStorage.setItem("openIdCheckCustomer",localStorage.getItem("userId")))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=a}}]),t}(),h=new m,v=n(8),w=n.n(v),_=function(){function t(){u()(this,t)}return p()(t,[{key:"wxforbidShare",value:function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",document.getElementsByTagName("body")[0].appendChild(t),Object(f.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(t){if(t.responseObject.responseData&&t.responseObject.responseStatus){var e=t.responseObject.responseData;wx.config({debug:!1,appId:e.appId,timestamp:e.timestamp,nonceStr:e.noncestr,signature:e.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems","startRecord","stopRecord","playVoice"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(t){console.log(t)})}},fail:function(t){document.querySelector(".ev-loading").style.display="none"}})}}]),t}(),y=new _,b=n(7),I=(n(9),n(11)),x=function(){return window.location.host.includes("allinmed")?"production":"development"},C=function(){if("production"===x()){var t=n(59);t.apikey="617001e96c72b7b07126e74ab5c611c473d5f6396e63c1e5a9eef8b98cae3830",I.a.config.errorHandler=function(e,n,o){var a=i(n),s=n.$options&&n.$options.propsData;t.notifyError(e,{metaData:{componeSntName:a,propsData:s,info:o}})}}},S=function(){function t(){u()(this,t),this.removeByValue=function(t,e){for(var n=0;n<this.length;n++)if(t[n]==val){t.splice(n,1);break}return t},C()}return p()(t,[{key:"forbidShare",value:function(){b.a.weChatJudge(function(){y.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(t){t.touches.length>1&&t.preventDefault()});var t=0;document.addEventListener("touchend",function(e){var n=(new Date).getTime();n-t<=300&&e.preventDefault(),t=n},!1)}},{key:"ajax",value:function(t){Object(f.a)(t)}},{key:"getPara",value:function(t){var e=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(e.lastIndexOf(t||"?")>0){o=e.substring(e.lastIndexOf(t||"?")+1,e.length);for(var a=o.split("&"),s=0;s<a.length;s++)i=a[s].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"getCookie",value:function(t){var e=void 0,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(n))?decodeURIComponent(e[2]):null}},{key:"removeDub",value:function(t){return[].concat(c()(new s.a(t)))}},{key:"isWXBrowse",value:function(){return h.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==h.isWXBrowse()?21:17}},{key:"getByteLen",value:function(t){for(var e=0,n=0;n<t.length;n++)null!==t[n].match(/[^\x00-\xff]/gi)?e+=2:e+=1;return e}},{key:"getStrByteLen",value:function(t,e){for(var n="",o=0,i=0;i<t.length&&(t.charCodeAt(i)>128?o+=2:o++,o<=e);i++)n=n.concat(t[i]);return o>e&&(n+=""),n}},{key:"getNetWork",value:function(){var t=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},e=["unknown","ethernet","wifi","2g","3g","4g","none"];return"number"==typeof t.type?t.type_text=e[t.type||t.effectiveType]:t.type_text=t.effectiveType,"number"==typeof t.bandwidth&&(t.bandwidth>10?t.type="wifi":t.bandwidth>2?t.type="3g":t.bandwidth>0?t.type="2g":0==t.bandwidth?t.type="none":t.type="unknown"),t.type_text}},{key:"getDeviceType",value:function(){var t="",e=this.isWXBrowse();return"androidWX"===e?t="Android":"iphoneWX"===e&&(t="IOS"),t}},{key:"getConnectType",value:function(){var t=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:"unknown"},e=["unknown","","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),o=navigator.userAgent,i="";return"number"==typeof t.type?t.type_text=e[t.type]:"androidWX"===n?"WIFI"!==t.type||"wifi"!==t.type?o.indexOf("WIFI")>0?t.type_text="wifi":t.type_text="other":t.type_text=t.type:"iphoneWX"===n?o.indexOf("WIFI")>0?t.type_text="wifi":t.type_text="other":"undefined"!==t.type?t.type_text=t.type:t.type_text="other","number"==typeof t.bandwidth&&(t.bandwidth>10?t.type="wifi":t.bandwidth>2?t.type="3g":t.bandwidth>0?t.type="2g":0==t.bandwidth?t.type="none":t.type="unknown"),"wifi"==t.type_text?i=1:b.a.weChatJudge(function(){i=0},function(){i=1}),i}},{key:"checkOpenId",value:function(){return h.checkOpenId()}},{key:"wxGetOpenId",value:function(){h.wxGetOpenId()}},{key:"mobileCheck",value:function(){o()}},{key:"timeFormate",value:function(t){var e=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=t.time.substring(0,10).replace(/\-/g,"/"),o=new Date(n).getDay(),i="",a="",s=e[o],r=t.time.substring(11,16);switch(parseInt(t.type)){case 1:i=t.time.substring(0,4)+"年"+t.time.substring(5,7)+"月"+t.time.substring(8,10)+"日",a=t.time.substring(5,7)+"月"+t.time.substring(8,10)+"日";break;case 2:i=t.time.substring(0,4)+"."+t.time.substring(5,7)+"."+t.time.substring(8,10),a=t.time.substring(5,7)+"."+t.time.substring(8,10)}return{year:i,years:a,week:s,hour:r}}},{key:"MillisecondToDate",value:function(t){var e=parseInt(parseInt(t)/1e3);return null!=e&&""!=e?e>60&&e<3600?e=parseInt(e/60)+"分钟":e>=3600&&e<=86400?e=parseInt(e/3600)+"小时"+parseInt(60*(parseFloat(e/3600)-parseInt(e/3600)))+"分钟":e>=86400&&(e=Math.round(parseInt(e/86400))+"天"):e="0 时 0 分0 秒",e}},{key:"MillisecondToDateNew",value:function(t){var e=parseFloat(t)/1e3;return e=null!=e&&""!=e?e>60&&e<3600?parseInt(e/60)+"分钟":e>=3600&&e<=86400?parseInt(e/3600)+"小时":parseInt(e)+"秒":"0 时 0 分0 秒"}}]),t}(),k=new S;!function(){Array.prototype.removeByValue=function(t){for(var e=0;e<this.length;e++)if(this[e]==t){this.splice(e,1);break}},window.version="1.1.3"}();e.a=k},41:function(t,e,n){"use strict";n.d(e,"a",function(){return d});var o=n(10),i=n.n(o),a=n(1),s=n.n(a),r=n(2),c=n.n(r),l=n(6),u={getPersonal:"/mcall/patient/customer/unite/v1/getPatientInfo/"},d=function(){function t(){s()(this,t)}return c()(t,[{key:"getMessage",value:function(t){return new i.a(function(e,n){Object(l.a)({url:u.getPersonal,method:"post",data:{customerId:t},timeout:1e4,done:function(t){e(t)},fail:function(t){throw n(t),new Error(t)}})})}}]),t}()},5:function(t,e,n){"use strict";var o=n(1),i=n.n(o),a=n(2),s=n.n(a),r=function(){function t(){i()(this,t)}return s()(t,[{key:"getPara",value:function(t){var e=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(e.lastIndexOf(t||"?")>0){o=e.substring(e.lastIndexOf(t||"?")+1,e.length);for(var a=o.split("&"),s=0;s<a.length;s++)i=a[s].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"browser",value:function(){var t=navigator.userAgent;navigator.appVersion;return{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1==t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1==t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,qq:" qq"==t.match(/\sQQ/i)}}}]),t}();e.a=new r},6:function(t,e,n){"use strict";function o(t){r.a.interceptors.request.use(function(e){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),t.beforeSend&&t.beforeSend(e),e}),r()({url:t.url,method:t.method,data:t.data,transformRequest:[function(t){return"paramJson="+a()(t)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(e){t.done(e.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(e){t.fail&&t.fail(e)})}e.a=o;var i=n(8),a=n.n(i),s=n(20),r=n.n(s)},61:function(t,e){},7:function(t,e,n){"use strict";var o=n(1),i=n.n(o),a=n(2),s=n.n(a),r=n(9),c=(n.n(r),function(){function t(){i()(this,t)}return s()(t,[{key:"weChatJudge",value:function(t,e){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?t(n):e(n)}}]),t}());e.a=new c},81:function(t,e,n){function o(t){n(82)}var i=n(0)(n(83),n(84),o,null,null);t.exports=i.exports},82:function(t,e){},83:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4);e.default={data:function(){return{homeUrl:"",historyUrl:"",myUrl:""}},mounted:function(){this.initData()},methods:{initData:function(){o.a.getPara().customerId||o.a.getPara().patientCustomerId||localStorage.getItem("userId");this.homeUrl="/",2==this.selected?this.historyUrl="/dist/consult.html":this.historyUrl="/dist/myConsult.html",this.myUrl="/dist/personal.html"},toUrl:function(t,e){switch(e){case 1:if(1==this.selected)return!1;g_sps.jump(t.target,this.homeUrl);break;case 2:if(!this.isClick)return!1;g_sps.jump(t.target,this.historyUrl);break;case 3:if(3==this.selected)return!1;g_sps.jump(t.target,this.myUrl)}}},props:{selected:{default:0,type:Number},isClick:{default:!0,type:Boolean}}}},84:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"tabbar-box",attrs:{"data-alcode-mod":"743","data-alcode-item-selector":".tabbar-list"}},[n("a",{staticClass:"tabbar-list",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.toUrl(e,1)}}},[n("dl",{staticClass:"tabbar-item",class:{selected:1==t.selected}},[n("dt",{staticClass:"tabbar-icon home"}),t._v(" "),n("dd",{staticClass:"tabbar-des"},[t._v("首页")])])]),t._v(" "),n("a",{staticClass:"tabbar-list",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.toUrl(e,2)}}},[n("dl",{staticClass:"tabbar-item",class:{selected:2==t.selected}},[n("dt",{staticClass:"tabbar-icon history"}),t._v(" "),n("dd",{staticClass:"tabbar-des"},[t._v(t._s(2==t.selected?"去问诊":"问诊历史"))])])]),t._v(" "),n("a",{staticClass:"tabbar-list",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.toUrl(e,3)}}},[n("dl",{staticClass:"tabbar-item",class:{selected:3==t.selected}},[n("dt",{staticClass:"tabbar-icon my"}),t._v(" "),n("dd",{staticClass:"tabbar-des"},[t._v("我的")])])])])},staticRenderFns:[]}},87:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="undefined"!=typeof window;o&&(window.Swiper=n(68)),e.default={name:"swiper",props:{options:{type:Object,default:function(){return{autoplay:3500}}},notNextTick:{type:Boolean,default:function(){return!1}}},data:function(){return{defaultSwiperClasses:{wrapperClass:"swiper-wrapper"}}},ready:function(){!this.swiper&&o&&(this.swiper=new Swiper(this.$el,this.options))},mounted:function(){var t=this,e=function(){if(!t.swiper&&o){delete t.options.notNextTick;var e=!1;for(var n in t.defaultSwiperClasses)t.defaultSwiperClasses.hasOwnProperty(n)&&t.options[n]&&(e=!0,t.defaultSwiperClasses[n]=t.options[n]);var i=function(){t.swiper=new Swiper(t.$el,t.options)};e?t.$nextTick(i):i()}}(this.options.notNextTick||this.notNextTick)?e():this.$nextTick(e)},updated:function(){this.swiper&&this.swiper.update()},beforeDestroy:function(){this.swiper&&(this.swiper.destroy(),delete this.swiper)}}},88:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"swiper-container"},[t._t("parallax-bg"),t._v(" "),n("div",{class:t.defaultSwiperClasses.wrapperClass},[t._t("default")],2),t._v(" "),t._t("pagination"),t._v(" "),t._t("button-prev"),t._v(" "),t._t("button-next"),t._v(" "),t._t("scrollbar")],2)},staticRenderFns:[]}},89:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"swiper-slide",data:function(){return{slideClass:"swiper-slide"}},ready:function(){this.update()},mounted:function(){this.update(),this.$parent.options.slideClass&&(this.slideClass=this.$parent.options.slideClass)},updated:function(){this.update()},attached:function(){this.update()},methods:{update:function(){this.$parent&&this.$parent.swiper&&this.$parent.swiper.update&&(this.$parent.swiper.update(!0),this.$parent.options.loop&&this.$parent.swiper.reLoop())}}}},90:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.slideClass},[t._t("default")],2)},staticRenderFns:[]}},91:function(t,e,n){function o(t){n(92)}var i=n(0)(n(93),n(94),o,null,null);t.exports=i.exports},92:function(t,e){},93:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4);e.default={data:function(){return{}},mounted:function(){o.a.forbidShare()},methods:{},props:{},components:{}}},94:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"followWXBox"},[o("section",{staticClass:"followWX"},[o("h2",{staticClass:"followWX_header"},[o("span",[t._v("如何快速关注微信号")])]),t._v(" "),o("section",{staticClass:"followWX_wayone"},[o("h3",[t._v("微信识别二维码图片关注")]),t._v(" "),o("ul",[o("li",[t._v("1.长按图片保存二维码；")]),t._v(" "),o("li",[t._v("2.打开微信"),o("span",[t._v("“扫一扫”")]),t._v("；")]),t._v(" "),o("li",[t._v("3.点击"),o("span",[t._v("“相册”")]),t._v("，找到二维码，微信识别后"),o("span",[t._v("“关注”")]),t._v("即可。")])]),t._v(" "),o("dl",[o("dt",[o("span",[t._v("温馨提示：")]),t._v(" "),o("span",[t._v("不同操作系统进入相册方式有区别。")])]),t._v(" "),o("dd",[t._v("* 苹果用户点击扫一扫页面右上角“相册”即可；")]),t._v(" "),o("dd",[t._v("* 安卓用户点击扫一扫页面右上角...后点击“从相册选取二维码”即可。")]),t._v(" "),o("dd",{staticClass:"QRcodeBox",attrs:{"data-alcode-mod":"749"}},[o("img",{staticClass:"QRcode",attrs:{src:n(95),"data-alcode":"e161",alt:"唯医互联网骨科医院"}}),t._v(" "),o("img",{staticClass:"QRtips",attrs:{src:n(96)}})])])]),t._v(" "),o("section",{staticClass:"followWX_waytwo"},[o("h3",[t._v("微信搜索“唯医互联网骨科医院”关注")]),t._v(" "),o("figure",{staticClass:"searchFollow"},[o("img",{attrs:{src:n(97)}})])])])])}]}},95:function(t,e,n){t.exports=n.p+"static/img/qrcode_for_gh.5adf1bb.jpg"},96:function(t,e,n){t.exports=n.p+"static/img/code_entrance.e621259.png"},97:function(t,e,n){t.exports=n.p+"static/img/picture.9fcc8f7.png"}},[1471]);