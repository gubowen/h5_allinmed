webpackJsonp([10],{10:function(t,e,n){function i(t){n(24)}var o=n(2)(n(25),n(26),i,null,null);t.exports=o.exports},12:function(t,e){!function(t,e){function n(){var e=a.getBoundingClientRect().width;e/l>540&&(e=540*l);var n=e/10;a.style.fontSize=n+"px",u.rem=t.rem=n}var i,o=t.document,a=o.documentElement,s=o.querySelector('meta[name="viewport"]'),r=o.querySelector('meta[name="flexible"]'),l=0,c=0,u=e.flexible||(e.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var d=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(c=parseFloat(d[1]),l=parseInt(1/c))}else if(r){var f=r.getAttribute("content");if(f){var g=f.match(/initial\-dpr=([\d\.]+)/),p=f.match(/maximum\-dpr=([\d\.]+)/);g&&(l=parseFloat(g[1]),c=parseFloat((1/l).toFixed(2))),p&&(l=parseFloat(p[1]),c=parseFloat((1/l).toFixed(2)))}}if(!l&&!c){var m=(t.navigator.appVersion.match(/android/gi),t.navigator.appVersion.match(/iphone/gi)),h=t.devicePixelRatio;l=m?h>=3&&(!l||l>=3)?3:h>=2&&(!l||l>=2)?2:1:1,c=1/l}if(a.setAttribute("data-dpr",l),!s)if(s=o.createElement("meta"),s.setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+c+", maximum-scale="+c+", minimum-scale="+c+", user-scalable=no"),a.firstElementChild)a.firstElementChild.appendChild(s);else{var v=o.createElement("div");v.appendChild(s),o.write(v.innerHTML)}t.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),t.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===o.readyState?o.body.style.fontSize=12*l+"px":o.addEventListener("DOMContentLoaded",function(t){o.body.style.fontSize=12*l+"px"},!1),n(),u.dpr=t.dpr=l,u.refreshRem=n,u.rem2px=function(t){var e=parseFloat(t)*this.rem;return"string"==typeof t&&t.match(/rem$/)&&(e+="px"),e},u.px2rem=function(t){var e=parseFloat(t)/this.rem;return"string"==typeof t&&t.match(/px$/)&&(e+="rem"),e}}(window,window.lib||(window.lib={}))},1382:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n.n(i),a=n(1),s=n.n(a),r=n(17),l=n(1383),c=n.n(l),u=n(52),d=n(47),f=n.n(d),g=(n(21),n(78)),p=n.n(g),m=n(1387),h=n.n(m),v=[{path:"/",redirect:"/home"},{path:"/followWeChat",name:"followWeChat",component:p.a,meta:{keepAlive:!0}},{path:"/home",name:"home",component:h.a,meta:{keepAlive:!0}}],I=n(44);r.a.use(I.a);var C=new I.a.Store({state:{attentionFlag:!0,loading:!1},mutations:{setAttentionFlag:function(t,e){t.attentionFlag=e},setLoadingState:function(t,e){t.loading=e}}});n(8);f.a.attach(document.body);var w=function(){function t(){o()(this,t),this.init()}return s()(t,[{key:"init",value:function(){r.a.use(u.a),this.registerRouter(),this.goToRouter(),new r.a({el:"#app",store:C,router:this.router,render:function(t){return t(c.a)}})}},{key:"registerRouter",value:function(){this.router=new u.a({routes:v,scrollBehavior:function(t,e,n){return{x:0,y:0}}})}},{key:"goToRouter",value:function(){}}]),t}();new w},1383:function(t,e,n){function i(t){n(1384)}var o=n(2)(n(1385),n(1386),i,null,null);t.exports=o.exports},1384:function(t,e){},1385:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),o=n.n(i);e.default={components:{Loading:o.a}}},1386:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app"},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view",{staticStyle:{"min-height":"100%"}}):t._e()],1),t._v(" "),t.$store.state.loading?n("Loading"):t._e()],1)},staticRenderFns:[]}},1387:function(t,e,n){function i(t){n(1388)}var o=n(2)(n(1389),n(1394),i,null,null);t.exports=o.exports},1388:function(t,e){},1389:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(12),o=(n.n(i),n(238)),a=n.n(o),s=n(1390),r=n.n(s),l=n(153),c=n.n(l),u=n(4),d=(n(17),n(62)),f=n(242),g=(new f.a,new d.a),p={loginUrl:"/dist/mLogin.html",diagnose:"/dist/consult.html?customerId="+localStorage.getItem("userId"),historyUrl:"/dist/myConsult.html?customerId="+localStorage.getItem("userId"),getOrderHistoryLists:"/mcall/customer/case/consultation/v1/getMapList/",personalMessage:"/mcall/patient/customer/unite/v1/getPatientInfo/",adList:"/mcall/ad/position/profile/getMapList/"};e.default={data:function(){return{loginFlag:!1,wxLoginFlag:!1,diagnoseList:[],dataGetFinish:!1,adList:[]}},components:{attention:a.a,slider:r.a,tabbar:c.a},methods:{init:function(){this.loginJudge(),this.getAdList()},getOrderHistoryLists:function(){var t=this;u.a.ajax({url:p.getOrderHistoryLists,method:"post",data:{patientCustomerId:localStorage.getItem("userId"),isValid:1,firstResult:0,maxResult:1,logoUseFlag:3},timeout:3e4,done:function(e){e&&e.responseObject.responseData.dataList&&e.responseObject.responseData.dataList.length>0&&(t.diagnoseList=e.responseObject.responseData.dataList,t.dataGetFinish=!0),t.$store.commit("setLoadingState",!1)}})},getImgUrl:function(t){return 0==t.consultationType?t.logoUrl?t.logoUrl:"/image/img00/myServices/doctor_portrait.png":t.logoUrl?t.logoUrl:"/image/img00/doctorMain/doc_logo.png"},getFullName:function(t){return t.fullName.length>6?t.fullName.substring(0,6)+"...":t.fullName},getInquiryType:function(t){var e="";if(1==t.consultationType)switch(Number(t.consultationLevel)){case 0:case 1:e="图文问诊";break;case 3:e="特需问诊"}return e},attentionHandle:function(){this.$router.push({name:"followWeChat"})},diagnoseEvent:function(){this.loginFlag?window.location.href=p.diagnose:window.location.href=p.loginUrl},moreEvent:function(){this.loginFlag?window.location.href=p.historyUrl:window.location.href=p.loginUrl},loginEvent:function(){window.location.href=p.loginUrl},getAdList:function(){var t=this;u.a.ajax({url:p.adList,method:"post",data:{siteId:u.a.getSiteId(),channelId:1339,platformId:1,positionId:3305},done:function(e){e.responseObject.responseStatus&&(t.adList=e.responseObject.responseData.data_list[0].ad_profile_attachment,console.log(t.adList)),t.$store.commit("setLoadingState",!1)}})},loginJudge:function(){var t=this;this.$store.commit("setLoadingState",!0),g.getStatus().then(function(e){console.log(e),e.data.responseObject.responseStatus?(t.loginFlag=!0,t.getOrderHistoryLists()):(t.loginFlag=!1,t.dataGetFinish=!0,t.$store.commit("setLoadingState",!1))})}},mounted:function(){this.init()}}},1390:function(t,e,n){function i(t){n(1391)}var o=n(2)(n(1392),n(1393),i,"data-v-29ec06d5",null);t.exports=o.exports},1391:function(t,e){},1392:function(t,e,n){"use strict";function i(t,e){if(!o(t,e)){var n=t.className.split(" ");n.push(e),t.className=n.join(" ")}}function o(t,e){return new RegExp("(^|\\s)"+e+"(\\s|$)").test(t.className)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(233);e.default={name:"slider",props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:4e3},dataList:{type:Array,default:[]}},data:function(){return{dots:[],currentPageIndex:0}},watch:{dataList:function(){var t=this;setTimeout(function(){t._setSliderWidth(),t._initDots(),t._initSlider(),t.autoPlay&&t._play()},20)}},mounted:function(){var t=this;setTimeout(function(){t._setSliderWidth(),t._initDots(),t._initSlider(),t.autoPlay&&t._play()},20),window.addEventListener("resize",function(){t.slider&&t.slider.enabled&&(clearTimeout(t.resizeTimer),t.resizeTimer=setTimeout(function(){t.slider.isInTransition?t._onScrollEnd():t.autoPlay&&t._play(),t.refresh()},60))})},activated:function(){if(this.slider){this.slider.enable();var t=this.slider.getCurrentPage().pageX;t>this.dots.length&&(t%=this.dots.length),this.slider.goToPage(t,0,0),this.loop&&(t-=1),this.currentPageIndex=t,this.autoPlay&&this._play()}},deactivated:function(){this.slider.disable(),clearTimeout(this.timer)},beforeDestroy:function(){this.slider.disable(),clearTimeout(this.timer)},methods:{refresh:function(){this.slider&&(this._setSliderWidth(!0),this.slider.refresh())},_setSliderWidth:function(t){this.children=this.$refs.sliderGroup.children;for(var e=0,n=this.$refs.slider.clientWidth,o=0;o<this.children.length;o++){var a=this.children[o];i(a,"slider-item"),a.style.width=n+"px",e+=n}this.loop&&!t&&(e+=2*n),this.$refs.sliderGroup.style.width=e+"px"},_initSlider:function(){var t=this;this.slider=new a.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:{loop:this.loop,threshold:.3,speed:400}}),this.slider.on("scrollEnd",this._onScrollEnd),this.slider.on("touchend",function(){t.autoPlay&&t._play()}),this.slider.on("beforeScrollStart",function(){t.autoPlay&&clearTimeout(t.timer)})},_onScrollEnd:function(){var t=this.slider.getCurrentPage().pageX;this.loop&&(t-=1),this.currentPageIndex=t,this.autoPlay&&this._play()},_initDots:function(){this.dots=new Array(this.children.length)},_play:function(){var t=this,e=this.slider.getCurrentPage().pageX+1;clearTimeout(this.timer),this.timer=setTimeout(function(){t.slider.goToPage(e,0,400)},this.interval)}}}},1393:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"slider",staticClass:"slider"},[n("div",{ref:"sliderGroup",staticClass:"slider-group"},[t._t("default")],2),t._v(" "),n("div",{staticClass:"dots"},t._l(t.dots,function(e,i){return n("span",{staticClass:"dot",class:{active:t.currentPageIndex===i}})}))])},staticRenderFns:[]}},1394:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mHome"},[n("attention",{on:{attentionHandle:t.attentionHandle}}),t._v(" "),n("figure",{staticClass:"banner"},[n("slider",{attrs:{loop:!0,autoPlay:!0,interval:5e3,dataList:t.adList}},t._l(t.adList,function(t,e){return n("div",{staticClass:"banner-slider"},[n("a",{attrs:{href:t.adAdditionalUrl}},[n("img",{attrs:{src:t.adAttUrl}})])])}))],1),t._v(" "),n("figure",{staticClass:"advertising"},[t._v("12万权威专家在线出诊")]),t._v(" "),n("figure",{staticClass:"diagnose"},[n("section",{staticClass:"btn-diagnose",on:{click:t.diagnoseEvent}},[t._v("点击问诊")])]),t._v(" "),n("figure",{directives:[{name:"show",rawName:"v-show",value:t.dataGetFinish,expression:"dataGetFinish"}],staticClass:"history"},[n("header",[n("h3",[t._v("问诊历史")]),n("p",{staticClass:"btn-more",on:{click:t.moreEvent}},[t._v("更多>")])]),t._v(" "),t.loginFlag?t._e():n("section",{staticClass:"content"},[n("section",{staticClass:"login"},[n("p",[t._v("您还没有登录")]),t._v(" "),n("div",{staticClass:"btn-login",on:{click:t.loginEvent}},[t._v("点击登录")])])]),t._v(" "),t.loginFlag&&0==t.diagnoseList.length?n("section",{staticClass:"content"},[n("section",{staticClass:"login"},[n("p",[t._v("您还没有问诊记录")]),t._v(" "),n("div",{staticClass:"btn-login",on:{click:t.diagnoseEvent}},[t._v("点击看病")])])]):t._e(),t._v(" "),t._l(t.diagnoseList,function(e){return t.loginFlag&&t.diagnoseList.length>0?n("section",{staticClass:"history-info"},[n("div",{staticClass:"doctor"},[n("div",{staticClass:"doctor-img"},[n("img",{attrs:{src:t.getImgUrl(e)}})]),t._v(" "),n("div",{staticClass:"doctor-info"},[n("p",{staticClass:"doctor-type"},[n("span",{staticClass:"name"},[t._v(t._s(0==e.consultationType?"唯医门诊医生":t.getFullName(e)))]),n("span",{staticClass:"career"},[t._v(t._s(e.medicalTitle))])]),t._v(" "),n("p",{staticClass:"doctor-time"},[n("span",[t._v(t._s(t.getInquiryType(e)))]),t._v(" "),n("span",[t._v(t._s(e.createTime.substring(0,e.createTime.length-2)))])])])]),t._v(" "),n("div",{staticClass:"patient"},[n("div",{staticClass:"patient-info"},[n("p",{staticClass:"title"},[t._v("患者")]),n("p",{staticClass:"detail"},[t._v(t._s(e.patientName&&e.patientName.length>5?e.patientName.substring(0,5)+"...":e.patientName))])]),t._v(" "),n("div",{staticClass:"patient-info"},[n("p",{staticClass:"title"},[t._v("主诉")]),n("p",{staticClass:"detail"},[t._v(t._s(e.mainContent.caseMain))])])])]):t._e()})],2),t._v(" "),n("tabbar",{attrs:{selected:1}})],1)},staticRenderFns:[]}},153:function(t,e,n){function i(t){n(154)}var o=n(2)(n(155),n(156),i,null,null);t.exports=o.exports},154:function(t,e){},155:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4);e.default={data:function(){return{homeUrl:"",historyUrl:"",myUrl:""}},mounted:function(){this.initData()},methods:{initData:function(){var t=i.a.getPara().customerId||i.a.getPara().patientCustomerId||localStorage.getItem("userId");this.homeUrl="/",2==this.selected?this.historyUrl="./consult.html":this.historyUrl=t?"/dist/myConsult.html?customerId="+t:"/dist/mLogin.html",this.myUrl="/dist/personal.html"},toUrl:function(t){switch(t){case 1:if(1==this.selected)return!1;location.href=this.homeUrl;break;case 2:location.href=this.historyUrl;break;case 3:if(3==this.selected)return!1;location.href=this.myUrl}}},props:{selected:{default:0,type:Number}}}},156:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"tabbar-box"},[n("a",{staticClass:"tabbar-list",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.toUrl(1)}}},[n("dl",{staticClass:"tabbar-item",class:{selected:1==t.selected}},[n("dt",{staticClass:"tabbar-icon home"}),t._v(" "),n("dd",{staticClass:"tabbar-des"},[t._v("首页")])])]),t._v(" "),n("a",{staticClass:"tabbar-list",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.toUrl(2)}}},[n("dl",{staticClass:"tabbar-item",class:{selected:2==t.selected}},[n("dt",{staticClass:"tabbar-icon history"}),t._v(" "),n("dd",{staticClass:"tabbar-des"},[t._v(t._s(2==t.selected?"去问诊":"问诊历史"))])])]),t._v(" "),n("a",{staticClass:"tabbar-list",attrs:{href:"javascript:void(0);"},on:{click:function(e){t.toUrl(3)}}},[n("dl",{staticClass:"tabbar-item",class:{selected:3==t.selected}},[n("dt",{staticClass:"tabbar-icon my"}),t._v(" "),n("dd",{staticClass:"tabbar-des"},[t._v("我的")])])])])},staticRenderFns:[]}},21:function(t,e){},23:function(t,e,n){t.exports=n.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},238:function(t,e,n){function i(t){n(239)}var o=n(2)(n(240),n(241),i,null,null);t.exports=o.exports},239:function(t,e){},24:function(t,e){},240:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{showFlag:!!localStorage.getItem("hasCloseAttention")}},methods:{init:function(){},close:function(){this.showFlag=!0,localStorage.setItem("hasCloseAttention",!0)},attentionEvent:function(){this.$emit("attentionHandle")}},mounted:function(){this.init()}}},241:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{directives:[{name:"show",rawName:"v-show",value:!t.showFlag,expression:"!showFlag"}],staticClass:"header"},[n("div",{staticClass:"btn-close",on:{click:function(e){t.close()}}}),t._v(" "),n("div",{staticClass:"btn-attention",on:{click:t.attentionEvent}},[t._v("点击关注")])])},staticRenderFns:[]}},242:function(t,e,n){"use strict";n.d(e,"a",function(){return d});var i=n(16),o=n.n(i),a=n(0),s=n.n(a),r=n(1),l=n.n(r),c=n(6),u={getPersonal:"/mcall/patient/customer/unite/v1/getPatientInfo/"},d=function(){function t(){s()(this,t)}return l()(t,[{key:"getMessage",value:function(t){return new o.a(function(e,n){Object(c.a)({url:u.getPersonal,method:"post",data:{customerId:t},timeout:1e4,done:function(t){e(t)},fail:function(t){throw n(t),new Error(t)}})})}}]),t}()},25:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{show:{type:Boolean}}}},26:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0,!1,!1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"middle-tip-box ev-loading"},[i("section",{staticClass:"middle-tip-modal"},[i("figure",{staticClass:"middle-tip-box-text"},[i("img",{attrs:{src:n(23),alt:"loading..."}})])])])}]}},4:function(t,e,n){"use strict";function i(){var t={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==g.a.getPara().patientCustomerId)t.customerId=0===g.a.getPara().patientCustomerId.length?0:g.a.getPara().patientCustomerId;else{if(void 0===g.a.getPara().customerId)return void(t.customerId=0);t.customerId=0===g.a.getPara().customerId.length?0:g.a.getPara().customerId}Object(f.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:t,beforeSend:function(){},timeout:2e3,done:function(e){if(localStorage.setItem("customerBaseInfo_one",v()(e)),e&&e.responseObject&&e.responseObject.responseData&&e.responseObject.responseData.dataList){var n=e.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+t.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+t.customerId}}})}var o=n(41),a=n.n(o),s=n(42),r=n.n(s),l=n(0),c=n.n(l),u=n(1),d=n.n(u),f=n(6),g=n(5),p=function(){function t(){c()(this,t)}return d()(t,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var t=localStorage.getItem("openId"),e="";return null!=t?e=!0:(e=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),e}return!0}},{key:"isWXBrowse",value:function(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)&&t.indexOf("iphone")>0?"iphoneWX":"micromessenger"==t.match(/MicroMessenger/i)&&t.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var t="",e="",n=window.location.origin+window.location.pathname+window.location.search,i=encodeURIComponent(n),o="";if(window.location.origin.includes("localhost"))return!1;o=window.location.hostname.includes("m9")?2:1,1==o?(t="wxe8384f7b06c169ef",e="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==o&&(t="wxaa5288ad7f627608",e="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var a="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+t+"&redirect_uri="+i+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(g.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=e+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+g.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var s=sessionStorage.getItem("count");s||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+g.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+g.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",g.a.getPara().openId))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=a}}]),t}(),m=new p,h=n(7),v=n.n(h),I=function(){function t(){c()(this,t)}return d()(t,[{key:"wxforbidShare",value:function(){var t=document.createElement("script");t.type="text/javascript",t.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(t),Object(f.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(t){if(t.responseObject.responseData&&t.responseObject.responseStatus){var e=t.responseObject.responseData;wx.config({debug:!1,appId:e.appId,timestamp:e.timestamp,nonceStr:e.noncestr,signature:e.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(t){console.log(t)})}},fail:function(t){document.querySelector(".ev-loading").style.display="none"}})}}]),t}(),C=new I,w=n(9),y=(n(8),function(){function t(){c()(this,t),this.removeByValue=function(t,e){for(var n=0;n<this.length;n++)if(t[n]==val){t.splice(n,1);break}return t}}return d()(t,[{key:"forbidShare",value:function(){w.a.weChatJudge(function(){window.location.href.includes("m9")||window.location.href.includes("10.1")||window.location.href.includes("localhost")||C.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(t){t.touches.length>1&&t.preventDefault()});var t=0;document.addEventListener("touchend",function(e){var n=(new Date).getTime();n-t<=300&&e.preventDefault(),t=n},!1)}},{key:"ajax",value:function(t){Object(f.a)(t)}},{key:"getPara",value:function(t){var e=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,o=void 0;if(e.lastIndexOf(t||"?")>0){i=e.substring(e.lastIndexOf(t||"?")+1,e.length);for(var a=i.split("&"),s=0;s<a.length;s++)o=a[s].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"getCookie",value:function(t){var e=void 0,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(n))?decodeURIComponent(e[2]):null}},{key:"removeDub",value:function(t){return[].concat(r()(new a.a(t)))}},{key:"isWXBrowse",value:function(){return m.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==m.isWXBrowse()?21:17}},{key:"getByteLen",value:function(t){for(var e=0,n=0;n<t.length;n++)null!==t[n].match(/[^\x00-\xff]/gi)?e+=2:e+=1;return e}},{key:"getStrByteLen",value:function(t,e){for(var n="",i=0,o=0;o<t.length&&(t.charCodeAt(o)>128?i+=2:i++,i<=e);o++)n=n.concat(t[o]);return i>e&&(n+=""),n}},{key:"getConnectType",value:function(){var t=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},e=["unknown","ethernet","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),i=navigator.userAgent;return"number"==typeof t.type?t.type_text=e[t.type]:"androidWX"===n?"WIFI"!==t.type||"wifi"!==t.type?i.indexOf("WIFI")>0?t.type_text="wifi":t.type_text="other":t.type_text=t.type:"iphoneWX"===n?i.indexOf("WIFI")>0?t.type_text="wifi":t.type_text="other":"undefined"!==t.type?t.type_text=t.type:t.type_text="other","number"==typeof t.bandwidth&&(t.bandwidth>10?t.type="wifi":t.bandwidth>2?t.type="3g":t.bandwidth>0?t.type="2g":0==t.bandwidth?t.type="none":t.type="unknown"),"wifi"==t.type_text?1:0}},{key:"checkOpenId",value:function(){return m.checkOpenId()}},{key:"wxGetOpenId",value:function(){m.wxGetOpenId()}},{key:"mobileCheck",value:function(){i()}},{key:"timeFormate",value:function(t){var e=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=t.time.substring(0,10).replace(/\-/g,"/"),i=new Date(n).getDay(),o="",a="",s=e[i],r=t.time.substring(11,16);switch(parseInt(t.type)){case 1:o=t.time.substring(0,4)+"年"+t.time.substring(5,7)+"月"+t.time.substring(8,10)+"日",a=t.time.substring(5,7)+"月"+t.time.substring(8,10)+"日";break;case 2:o=t.time.substring(0,4)+"."+t.time.substring(5,7)+"."+t.time.substring(8,10),a=t.time.substring(5,7)+"."+t.time.substring(8,10)}return{year:o,years:a,week:s,hour:r}}},{key:"MillisecondToDate",value:function(t){var e=parseInt(parseInt(t)/1e3);return null!=e&&""!=e?e>60&&e<3600?e=parseInt(e/60)+"分钟":e>=3600&&e<=86400?e=parseInt(e/3600)+"小时"+parseInt(60*(parseFloat(e/3600)-parseInt(e/3600)))+"分钟":e>=86400&&(e=Math.round(parseInt(e/86400))+"天"):e="0 时 0 分0 秒",e}},{key:"MillisecondToDateNew",value:function(t){var e=parseFloat(t)/1e3;return e=null!=e&&""!=e?e>60&&e<3600?parseInt(e/60)+"分钟":e>=3600&&e<=86400?parseInt(e/3600)+"小时":parseInt(e)+"秒":"0 时 0 分0 秒"}}]),t}()),b=new y;!function(){Array.prototype.removeByValue=function(t){for(var e=0;e<this.length;e++)if(this[e]==t){this.splice(e,1);break}}}();e.a=b},5:function(t,e,n){"use strict";var i=n(0),o=n.n(i),a=n(1),s=n.n(a),r=function(){function t(){o()(this,t)}return s()(t,[{key:"getPara",value:function(t){var e=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,o=void 0;if(e.lastIndexOf(t||"?")>0){i=e.substring(e.lastIndexOf(t||"?")+1,e.length);for(var a=i.split("&"),s=0;s<a.length;s++)o=a[s].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"browser",value:function(){var t=navigator.userAgent;navigator.appVersion;return{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1==t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1==t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,qq:" qq"==t.match(/\sQQ/i)}}}]),t}();e.a=new r},6:function(t,e,n){"use strict";function i(t){r.a.interceptors.request.use(function(e){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),t.beforeSend&&t.beforeSend(e),e}),r()({url:t.url,method:t.method,data:t.data,transformRequest:[function(t){return"paramJson="+a()(t)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(e){t.done(e.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(e){t.fail&&t.fail(e)})}e.a=i;var o=n(7),a=n.n(o),s=n(18),r=n.n(s)},62:function(t,e,n){"use strict";n.d(e,"a",function(){return f});var i=n(16),o=n.n(i),a=n(0),s=n.n(a),r=n(1),l=n.n(r),c=n(18),u=n.n(c),d={getCheckSession:"/mcall/patient/customer/unite/v1/checkSession/"},f=function(){function t(){s()(this,t)}return l()(t,[{key:"getStatus",value:function(){return new o.a(function(t,e){u()({url:d.getCheckSession,method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(e){t(e)},function(t){e(t)})})}}]),t}()},78:function(t,e,n){function i(t){n(79)}var o=n(2)(n(80),n(81),i,null,null);t.exports=o.exports},79:function(t,e){},80:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},mounted:function(){},methods:{},props:{},components:{}}},81:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0,!1,!1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"followWXBox"},[i("section",{staticClass:"followWX"},[i("h2",{staticClass:"followWX_header"},[i("span",[t._v("如何快速关注微信号")])]),t._v(" "),i("section",{staticClass:"followWX_wayone"},[i("h3",[t._v("微信识别二维码图片关注")]),t._v(" "),i("ul",[i("li",[t._v("1.长按图片保存二维码；")]),t._v(" "),i("li",[t._v("2.打开微信"),i("span",[t._v("“扫一扫”")]),t._v("；")]),t._v(" "),i("li",[t._v("3.点击"),i("span",[t._v("“相册”")]),t._v("，找到二维码，微信识别后"),i("span",[t._v("“关注”")]),t._v("即可。")])]),t._v(" "),i("dl",[i("dt",[i("span",[t._v("温馨提示：")]),t._v(" "),i("span",[t._v("不同操作系统进入相册方式有区别。")])]),t._v(" "),i("dd",[t._v("* 苹果用户点击扫一扫页面右上角“相册”即可；")]),t._v(" "),i("dd",[t._v("* 安卓用户点击扫一扫页面右上角...后点击“从相册选取二维码”即可。")]),t._v(" "),i("dd",{staticClass:"QRcodeBox"},[i("img",{staticClass:"QRcode",attrs:{src:n(82),alt:"唯医互联网骨科医院"}}),t._v(" "),i("img",{staticClass:"QRtips",attrs:{src:n(83)}})])])]),t._v(" "),i("section",{staticClass:"followWX_waytwo"},[i("h3",[t._v("微信搜索“唯医互联网骨科医院”关注")]),t._v(" "),i("figure",{staticClass:"searchFollow"},[i("img",{attrs:{src:n(84)}})])])])])}]}},82:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAIAAAAI7H7bAAAG2ElEQVR4nO3dW67rOAwEwJvB7H/LdxYwDiCBTUoOqj4PcmTl0RBAy9Tn79+/f4Caf05PAH6BIEGAIEGAIEGAIEGAIEHAv49//Xw+w/NYsV6pf5z/t3/fenFlAt9M3oFYn9jjrCbf17t+hFYkCBAkCBAkCBAkCBAkCBAkCHgufz+6s0r7qD7VO2uvdR23ECY/q2t/hFYkCBAkCBAkCBAkCBAkCBAkCNgofz+qlz7H9ghvXahY593aab6uvlF9fYR6pbtjW/36hbbUZ2VFggBBggBBggBBggBBggBBgoBq+ftOW6XbYumzaUN0cfP1tfvfx2riw6xIECBIECBIECBIECBIECBIEPD68vd65bReY2261vFOL8Vhm+4rvIsVCQIECQIECQIECQIECQIECQIECQKq95HuvFfQ1G2n7vjH1TGBn3xTu6xIECBIECBIECBIECBIECBIELBR/r7zWNX6UafFhyO2Su0dB7NOTqD+wRbvTNz5I/xjRYIIQYIAQYIAQYIAQYIAQYKAzw07Z2c0nTS6NWxHofnafvnrfuBHaEWCAEGCAEGCAEGCAEGCAEGCgJbyd1NFuOPf6+o9VYpfwfE+Ldc20S/+irZYkSBAkCBAkCBAkCBAkCBAkCDg/O7vph3NHY5vvp7cft7k7bX+b6xIECBIECBIECBIECBIECBIEPBc/u7YNjtZuKxXhNdNlu9v6N+yOGZ92LrJb9aKBAGCBAGCBAGCBAGCBAGCBAGCBAHPZ8iu322o33HquA/T9LDA5LGq6+5s7d+k6aEVj1HAFQQJAgQJAgQJAgQJAgQJAqqPUbzIDZXTjoZBx9sYNQ17552Vb6xIECBIECBIECBIECBIECBIELCx+3vdVtmxWKNs2qT8OEJT5XR92KZ7FZO3QDrK+vW99nZ/wxUECQIECQIECQIECQIECQI2zpCdLDRPHqvaob5L+s73VXfnGbLrNNGHRoIEAYIEAYIEAYIEAYIEAc+7v8f6cdev1dSPu2jyWte+2bERbjjE1ooEAYIEAYIEAYIEAYIEAYIEAYIEAa9voj/ZGv8HPpaxu3Zbmu4jFa+1NawVCQIECQIECQIECQIECQIECQI2muhPdjpfH6GphXzTv0/WeddHaCrrF38wTUcWNLEiQYAgQYAgQYAgQYAgQYAgQcBGF6H1V9YPYG3aZdwxgfpU14c9fo7Bi76Cby9ef+XWJ2BFggBBggBBggBBggBBggBBgoCW3d9NO7LvnECTpoYkHYfzfrvW5Lb6R5MVfCsSBAgSBAgSBAgSBAgSBAgSBFTPkJ1sBv0DNfHjXbaLXtQ7ZfhaViQIECQIECQIECQIECQIECQIOH/0Zb17+IUTqG++Xh/2eP19sv368d/AN1YkCBAkCBAkCBAkCBAkCBAkCBAkCHi+j9RypdNPMTR18T/+vtbH3Br2zmdh1i+0NcL6sJroQyNBggBBggBBggBBggBBgoDqGbJ1HfX3ppNGixP4NofjDYM6ysRbL266sTFZ67ciQYAgQYAgQYAgQYAgQYAgQcBz+fvRnZuv72zt/836bJs2RK8rfgXXWp+tJvowTZAgQJAgQJAgQJAgQJAgoNpEv159Pn5c7PHeI5ObrycL6GN3Jia7+H9jRYIAQYIAQYIAQYIAQYIAQYKAljNk671HJmvik/vHH431yK6PMHmE6/Gv4JHe39BIkCBAkCBAkCBAkCBAkCBAkCCg2kXo0fHHKI6rN+y/85mRyQk0PaGzPqstViQIECQIECQIECQIECQIECQI2HiMouOBiy13bqG/s2H/8Zr4N5M/mHXK33AFQYIAQYIAQYIAQYIAQYKA5/L3izR1ESpea2uEdcc3xU9u9F432dvoGysSBAgSBAgSBAgSBAgSBAgSBDw3P3n7Ft3jzebrXrTTvMnkrOqfthUJAgQJAgQJAgQJAgQJAgQJAlp6f9dNdm1ev1b9rsB6mbU4q+OV+h8Y1u5vmCZIECBIECBIECBIECBIELBR/n7UVBHumMDWhY634zjeaX2y//sN3Uv+z+5vmCZIECBIECBIECBIECBIECBIEFC9j3Sna5voFydQ13Fg7tYI6yaPLHgc1mMUME2QIECQIECQIECQIECQIOD15e96lXa9zNrUgOZRsfi7VeufrIl3fNr1N1t/GMeKBAGCBAGCBAGCBAGCBAGCBAHV8vfxk0bXNU11cpPyndeabM+0NeZk0yUrEgQIEgQIEgQIEgQIEgQIEgRslL8ni4lFkx3o69Xn+jbnyphbw9Z1vIWmlixbw1qRIECQIECQIECQIECQIECQIODzou3bcC0rEgQIEgQIEgQIEgQIEgQIEgQIEgT8By4Z9/iShM6LAAAAAElFTkSuQmCC"},83:function(t,e,n){t.exports=n.p+"static/img/code_entrance.e621259.png"},84:function(t,e,n){t.exports=n.p+"static/img/picture.9fcc8f7.png"},9:function(t,e,n){"use strict";var i=n(0),o=n.n(i),a=n(1),s=n.n(a),r=n(8),l=(n.n(r),function(){function t(){o()(this,t)}return s()(t,[{key:"weChatJudge",value:function(t,e){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?t(n):e(n)}}]),t}());e.a=new l}},[1382]);