webpackJsonp([10],{1291:function(e,t,n){n(52),e.exports=n(1292)},1292:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=n.n(i),r=n(2),s=n.n(r),a=n(11),c=n(1293),u=n.n(c),d=n(37),l=(n.n(d),n(27)),p=(n.n(l),n(161),n(19)),f=(n.n(p),function(){function e(){o()(this,e),this.init()}return s()(e,[{key:"init",value:function(){new a.a({render:function(e){return e(u.a)}}).$mount("#feedback")}}]),e}());new f},1293:function(e,t,n){function i(e){n(1294)}var o=n(0)(n(1295),n(1300),i,null,null);e.exports=o.exports},1294:function(e,t){},1295:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1296),o=n.n(i);t.default={data:function(){return{}},components:{feedback:o.a}}},1296:function(e,t,n){function i(e){n(1297)}var o=n(0)(n(1298),n(1299),i,null,null);e.exports=o.exports},1297:function(e,t){},1298:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(4),o=n(16),r=n.n(o),s=n(13),a=n.n(s);n(7);t.default={data:function(){return{customerId:"",doctorId:"",suggestionType:{service:!1,setting:!1,others:!1},suggestionNumbers:"",suggestionContent:"",errorShow:!1,errorMsg:"",submitSuccess:!1,backTimeout:3,finish:!1}},components:{toast:r.a,Loading:a.a},watch:{},mounted:function(){this.CheckFrom()},methods:{CheckFrom:function(){return"im"===i.a.getPara().from},checkAllData:function(e){var t=this;if(!(this.suggestionType.service||this.suggestionType.setting||this.suggestionType.others))return this.validateToast("您还有问题未完善"),document.body.scrollTop=this.$el.querySelector(".question").offsetTop,!1;"undefined"===i.a.getPara().customerId?t.customerId=0:t.customerId=localStorage.getItem("userId"),t.submitAllData(e)},submitAllData:function(e){var t=this,n=[];console.log(t.customerId);for(var o in this.suggestionType)if(this.suggestionType[o])switch(o){case"service":n.push(3);break;case"setting":n.push(4);break;case"others":n.push(5)}i.a.ajax({url:"/mcall/customer/suggestion/v1/create/",method:"POST",data:{suggestionType:n.join(""),suggestionContent:this.suggestionContent,suggestionNumbers:this.suggestionNumbers,customerId:t.customerId||0,doctorId:i.a.getPara().doctorCustomerId||"",visitSiteId:i.a.getSiteId(),equipmentVersion:i.a.getDeviceType(),networkEnvironment:i.a.getNetWork(),systemVersion:"1.1.2"},done:function(n){t.finish=!0,n.responseObject.responseStatus?(t.submitSuccess=!0,t.backToPast(e)):(t.submitSuccess=!1,t.validateToast("提交失败，请检查您的网络"))},fail:function(e){}})},backToPast:function(e){var t=this,n=void 0;n=setInterval(function(){t.backTimeout=t.backTimeout-1,0===t.backTimeout&&(clearInterval(n),t.goToHref(e))},1e3)},goToHref:function(e){"im"===i.a.getPara().from?g_sps.jump(e.target,document.referrer):g_sps.jump(e.target,"/")},validateToast:function(e){var t=this;this.errorShow=!0,this.errorMsg=e,setTimeout(function(){t.errorShow=!1},2e3)},contentLimit:function(){i.a.getByteLen(this.suggestionContent)>1e3&&(this.suggestionContent=i.a.getStrByteLen(this.suggestionContent,1e3),this.errorShow=!0,this.validateToast("最多只能输入500字"))},Limit:function(){i.a.getByteLen(this.suggestionNumbers)>50&&(this.suggestionNumbers=i.a.getStrByteLen(this.suggestionNumbers,50))},getByteLen:function(e){return i.a.getByteLen(e)},textAreaFocus:function(){this.$el.querySelector(".input-textArea").focus()}}}},1299:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.submitSuccess?e.submitSuccess?n("section",{staticClass:"get-back"},[n("section",{staticClass:"icon"}),e._v(" "),n("section",{staticClass:"title"},[e._v("提交成功")]),e._v(" "),e._m(1),e._v(" "),n("section",{staticClass:"back",on:{click:e.goToHref}},[n("span",{staticClass:"back-timing"},[e._v(e._s(e.backTimeout)+"s后")]),n("em",[e._v(e._s(e.CheckFrom()?"自动返回":"返回首页"))])])]):e._e():n("section",{staticClass:"main-inner"},[n("section",{staticClass:"main-inner-content"},[e._m(0),e._v(" "),n("section",{staticClass:"feedback-main"},[n("section",{staticClass:"question"},[n("span",{staticClass:"question-feedback"},[e._v("您遇到什么问题了?")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.service},on:{click:function(t){t.stopPropagation(),e.suggestionType.service=!e.suggestionType.service}}},[n("span",[e._v("服务问题")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("医生回复慢回复质量差、推荐的医生不合理")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.setting},on:{click:function(t){t.stopPropagation(),e.suggestionType.setting=!e.suggestionType.setting}}},[n("span",[e._v("使用问题")])]),e._v(" "),n("p",{staticClass:"question-description"},[e._v("产品使用报错功能缺失、使用障碍、流程不顺畅")]),e._v(" "),n("p",{staticClass:"question-type",class:{on:e.suggestionType.others},on:{click:function(t){t.stopPropagation(),e.suggestionType.others=!e.suggestionType.others}}},[n("span",[e._v("其他问题")])])]),e._v(" "),n("section",{staticClass:"question"},[n("span",{staticClass:"question-feedback"},[e._v("请简要描述你的问题?")]),e._v(" "),n("em",{staticClass:"question-em"},[e._v("(选填)")]),e._v(" "),n("figure",{staticClass:"main-input-box-textarea-inner"},[n("section",{staticClass:"area-content"},[n("section",{on:{click:e.textAreaFocus}},[n("pre",[n("span",[e._v(e._s(e.suggestionContent))])]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.suggestionContent,expression:"suggestionContent",modifiers:{trim:!0}}],staticClass:"input-textArea",attrs:{name:"question",placeholder:"请输入问题",autofocus:"autofocus"},domProps:{value:e.suggestionContent},on:{input:[function(t){t.target.composing||(e.suggestionContent=t.target.value.trim())},e.contentLimit],blur:function(t){e.$forceUpdate()}}})])])]),e._v(" "),n("span",{staticClass:"qu-underline"}),e._v(" "),n("p",{staticClass:"text-num-tips"},[e._v("\n          "+e._s(e.suggestionContent.length)+"/500")])]),e._v(" "),n("section",{staticClass:"question"},[n("span",{staticClass:"question-feedback"},[e._v("我们通过何种方式联系您?")]),e._v(" "),n("em",{staticClass:"question-em"},[e._v("(选填)")]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.suggestionNumbers,expression:"suggestionNumbers"}],staticClass:"input-textArea2",attrs:{placeholder:"请填写QQ号/电话/邮箱"},domProps:{value:e.suggestionNumbers},on:{input:[function(t){t.target.composing||(e.suggestionNumbers=t.target.value)},e.Limit]}}),e._v(" "),n("span",{staticClass:"qu-underline"})])]),e._v(" "),n("button",{staticClass:"btn-primary go-next",on:{click:e.checkAllData}},[e._v("提交")])]),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.errorShow?n("toast",{attrs:{content:e.errorMsg}}):e._e()],1),e._v(" "),e.finish?n("loading"):e._e()],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"feedback-header"},[n("h2",{staticClass:"feedback-header-top"},[e._v("建议反馈")]),e._v(" "),n("p",{staticClass:"feedback-header-bottom"},[e._v("如果您在使用过程中有任何问题或建议，请给我们留言，并留下您的联系方式。")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"description"},[e._v("您的反馈我们已经收到"),n("br"),e._v("\n    感谢对我们的支持理解")])}]}},13:function(e,t,n){function i(e){n(29)}var o=n(0)(n(30),n(31),i,null,null);e.exports=o.exports},1300:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"al-mainInner"},[n("feedback")],1)},staticRenderFns:[]}},16:function(e,t,n){function i(e){n(34)}var o=n(0)(n(35),n(36),i,null,null);e.exports=o.exports},161:function(e,t,n){"use strict";var i=n(8),o=n.n(i);!function(e,t){"function"==typeof define&&(n(162)||define.cmd)?define(function(){return t(e)}):t(e,!0)}(window,function(e,t){function n(t,n,i){e.WeixinJSBridge?WeixinJSBridge.invoke(t,r(n),function(e){a(t,e,i)}):d(t,i)}function i(t,n,i){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){i&&i.trigger&&i.trigger(e),a(t,e,n)}):i?d(t,i):d(t,n)}function r(e){return e=e||{},e.appId=L.appId,e.verifyAppId=L.appId,e.verifySignType="sha1",e.verifyTimestamp=L.timestamp+"",e.verifyNonceStr=L.nonceStr,e.verifySignature=L.signature,e}function s(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function a(e,t,n){var i,r;switch(delete t.err_code,delete t.err_desc,delete t.err_detail,i=t.errMsg,i||(i=t.err_msg,delete t.err_msg,i=c(e,i),t.errMsg=i),n=n||{},n._complete&&(n._complete(t),delete n._complete),i=t.errMsg||"",L.debug&&!n.isInnerInvoke&&alert(o()(t)),r=i.indexOf(":"),i.substring(r+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function c(e,t){var n,i,o=e,r=h[o];return r&&(o=r),n="ok",t&&(i=t.indexOf(":"),n=t.substring(i+1),"confirm"==n&&(n="ok"),"failed"==n&&(n="fail"),-1!=n.indexOf("failed_")&&(n=n.substring(7)),-1!=n.indexOf("fail_")&&(n=n.substring(5)),n=n.replace(/_/g," "),n=n.toLowerCase(),("access denied"==n||"no permission to execute"==n)&&(n="permission denied"),"config"==o&&"function not exist"==n&&(n="ok"),""==n&&(n="fail")),t=o+":"+n}function u(e){var t,n,i,o;if(e){for(t=0,n=e.length;n>t;++t)i=e[t],(o=g[i])&&(e[t]=o);return e}}function d(e,t){if(!(!L.debug||t&&t.isInnerInvoke)){var n=h[e];n&&(e=n),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function l(){0!=P.preVerifyState&&(I||b||L.debug||"6.0.2">T||P.systemType<0||C||(C=!0,P.appId=L.appId,P.initTime=M.initEndTime-M.initStartTime,P.preVerifyTime=M.preVerifyEndTime-M.preVerifyStartTime,q.getNetworkType({isInnerInvoke:!0,success:function(e){var t,n;P.networkType=e.networkType,t="http://open.weixin.qq.com/sdk/report?v="+P.version+"&o="+P.preVerifyState+"&s="+P.systemType+"&c="+P.clientVersion+"&a="+P.appId+"&n="+P.networkType+"&i="+P.initTime+"&p="+P.preVerifyTime+"&u="+P.url,n=new Image,n.src=t}})))}function p(){return(new Date).getTime()}function f(t){x&&(e.WeixinJSBridge?t():v.addEventListener&&v.addEventListener("WeixinJSBridgeReady",t,!1))}function m(){q.invoke||(q.invoke=function(t,n,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,r(n),i)},q.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})}var g,h,v,w,y,_,I,b,x,S,k,T,C,O,M,P,L,A,V,q;if(!e.jWeixin)return g={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},h=function(){var e,t={};for(e in g)t[g[e]]=e;return t}(),v=e.document,w=v.title,y=navigator.userAgent.toLowerCase(),_=navigator.platform.toLowerCase(),I=!(!_.match("mac")&&!_.match("win")),b=-1!=y.indexOf("wxdebugger"),x=-1!=y.indexOf("micromessenger"),S=-1!=y.indexOf("android"),k=-1!=y.indexOf("iphone")||-1!=y.indexOf("ipad"),T=function(){var e=y.match(/micromessenger\/(\d+\.\d+\.\d+)/)||y.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),C=!1,O=!1,M={initStartTime:p(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},P={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",preVerifyState:1,systemType:k?1:S?2:-1,clientVersion:T,url:encodeURIComponent(location.href)},L={},A={_completes:[]},V={state:0,data:{}},f(function(){M.initEndTime=p()}),q={config:function(e){L=e,d("config",e);var t=!1!==L.check;f(function(){var e,i,o;if(t)n(g.config,{verifyJsApiList:u(L.jsApiList)},function(){A._complete=function(e){M.preVerifyEndTime=p(),V.state=1,V.data=e},A.success=function(){P.preVerifyState=0},A.fail=function(e){A._fail?A._fail(e):V.state=-1};var e=A._completes;return e.push(function(){l()}),A.complete=function(){for(var t=0,n=e.length;n>t;++t)e[t]();A._completes=[]},A}()),M.preVerifyStartTime=p();else{for(V.state=1,e=A._completes,i=0,o=e.length;o>i;++i)e[i]();A._completes=[]}}),L.beta&&m()},ready:function(e){0!=V.state?e():(A._completes.push(e),!x&&L.debug&&e())},error:function(e){"6.0.2">T||O||(O=!0,-1==V.state?e(V.data):A._fail=e)},checkJsApi:function(e){var t=function(e){var t,n,i=e.checkResult;for(t in i)(n=h[t])&&(i[n]=i[t],delete i[t]);return e};n("checkJsApi",{jsApiList:u(e.jsApiList)},function(){return e._complete=function(e){if(S){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=t(e)},e}())},onMenuShareTimeline:function(e){i(g.onMenuShareTimeline,{complete:function(){n("shareTimeline",{title:e.title||w,desc:e.title||w,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){i(g.onMenuShareAppMessage,{complete:function(){n("sendAppMessage",{title:e.title||w,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){i(g.onMenuShareQQ,{complete:function(){n("shareQQ",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){i(g.onMenuShareWeibo,{complete:function(){n("shareWeiboApp",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){i(g.onMenuShareQZone,{complete:function(){n("shareQZone",{title:e.title||w,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){n("startRecord",{},e)},stopRecord:function(e){n("stopRecord",{},e)},onVoiceRecordEnd:function(e){i("onVoiceRecordEnd",e)},playVoice:function(e){n("playVoice",{localId:e.localId},e)},pauseVoice:function(e){n("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){n("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){i("onVoicePlayEnd",e)},uploadVoice:function(e){n("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){n("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){n("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){n("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},function(){return e._complete=function(e){if(S){var t=e.localIds;t&&(e.localIds=JSON.parse(t))}},e}())},previewImage:function(e){n(g.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){n("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){n("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getNetworkType:function(e){var t=function(e){var t,n,i,o=e.errMsg;if(e.errMsg="getNetworkType:ok",t=e.subtype,delete e.subtype,t)e.networkType=t;else switch(n=o.indexOf(":"),i=o.substring(n+1)){case"wifi":case"edge":case"wwan":e.networkType=i;break;default:e.errMsg="getNetworkType:fail"}return e};n("getNetworkType",{},function(){return e._complete=function(e){e=t(e)},e}())},openLocation:function(e){n("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},n(g.getLocation,{type:e.type||"wgs84"},function(){return e._complete=function(e){delete e.type},e}())},hideOptionMenu:function(e){n("hideOptionMenu",{},e)},showOptionMenu:function(e){n("showOptionMenu",{},e)},closeWindow:function(e){e=e||{},n("closeWindow",{},e)},hideMenuItems:function(e){n("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){n("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){n("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){n("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){e=e||{},n("scanQRCode",{needResult:e.needResult||0,scanType:e.scanType||["qrCode","barCode"]},function(){return e._complete=function(e){var t,n;k&&(t=e.resultStr)&&(n=JSON.parse(t),e.resultStr=n&&n.scan_code&&n.scan_code.scan_result)},e}())},openProductSpecificView:function(e){n(g.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){var t,i,o,r,s=e.cardList,a=[];for(t=0,i=s.length;i>t;++t)o=s[t],r={card_id:o.cardId,card_ext:o.cardExt},a.push(r);n(g.addCard,{card_list:a},function(){return e._complete=function(e){var t,n,i,o=e.card_list;if(o){for(o=JSON.parse(o),t=0,n=o.length;n>t;++t)i=o[t],i.cardId=i.card_id,i.cardExt=i.card_ext,i.isSuccess=!!i.is_succ,delete i.card_id,delete i.card_ext,delete i.is_succ;e.cardList=o,delete e.card_list}},e}())},chooseCard:function(e){n("chooseCard",{app_id:L.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},function(){return e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e}())},openCard:function(e){var t,i,o,r,s=e.cardList,a=[];for(t=0,i=s.length;i>t;++t)o=s[t],r={card_id:o.cardId,code:o.code},a.push(r);n(g.openCard,{card_list:a},e)},chooseWXPay:function(e){n(g.chooseWXPay,s(e),e)}},t&&(e.wx=e.jWeixin=q),q})},19:function(e,t){!function(e,t){function n(){var t=r.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;r.style.fontSize=n+"px",d.rem=e.rem=n}var i,o=e.document,r=o.documentElement,s=o.querySelector('meta[name="viewport"]'),a=o.querySelector('meta[name="flexible"]'),c=0,u=0,d=t.flexible||(t.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var l=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(u=parseFloat(l[1]),c=parseInt(1/u))}else if(a){var p=a.getAttribute("content");if(p){var f=p.match(/initial\-dpr=([\d\.]+)/),m=p.match(/maximum\-dpr=([\d\.]+)/);f&&(c=parseFloat(f[1]),u=parseFloat((1/c).toFixed(2))),m&&(c=parseFloat(m[1]),u=parseFloat((1/c).toFixed(2)))}}if(!c&&!u){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=g?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,u=1/c}if(r.setAttribute("data-dpr",c),!s)if(s=o.createElement("meta"),s.setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+u+", maximum-scale="+u+", minimum-scale="+u+", user-scalable=no, viewport-fit=cover"),r.firstElementChild)r.firstElementChild.appendChild(s);else{var v=o.createElement("div");v.appendChild(s),o.write(v.innerHTML)}e.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===o.readyState?o.body.style.fontSize=12*c+"px":o.addEventListener("DOMContentLoaded",function(e){o.body.style.fontSize=12*c+"px"},!1),n(),d.dpr=e.dpr=c,d.refreshRem=n,d.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},d.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},25:function(e,t,n){e.exports=n.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},27:function(e,t){},29:function(e,t){},30:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{show:{type:Boolean}}}},31:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"middle-tip-box ev-loading"},[i("section",{staticClass:"middle-tip-modal"},[i("figure",{staticClass:"middle-tip-box-text"},[i("img",{attrs:{src:n(25),alt:"loading..."}})])])])}]}},34:function(e,t){},35:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},mounted:function(){console.log()},props:{content:{type:String},imgUrl:{type:String}}}},36:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"middle-tip-modal popup-tips show"},[e.imgUrl?n("figure",{staticClass:"middle-tips-box-img"},[n("img",{attrs:{src:e.imgUrl,alt:""}})]):e._e(),e._v(" "),n("figure",{staticClass:"middle-tip-box-text"},[n("p",{staticClass:"tipText"},[e._v(e._s(e.content))])])])},staticRenderFns:[]}},37:function(e,t){},4:function(e,t,n){"use strict";function i(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==m.a.getPara().patientCustomerId)e.customerId=0===m.a.getPara().patientCustomerId.length?0:m.a.getPara().patientCustomerId;else{if(void 0===m.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===m.a.getPara().customerId.length?0:m.a.getPara().customerId}Object(f.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",w()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}function o(e){if(e.$root===e)return"root";var t=e._isVue?e.$options&&e.$options.name||e.$options&&e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options&&e.$options.__file?" at "+(e.$options&&e.$options.__file):"")}var r=n(53),s=n.n(r),a=n(54),c=n.n(a),u=n(1),d=n.n(u),l=n(2),p=n.n(l),f=n(6),m=n(5),g=function(){function e(){d()(this,e)}return p()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t=localStorage.getItem("userId"),n=localStorage.getItem("openIdCheckCustomer"),i="";return null!=e&&t==n?i=!0:(i=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),i}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,i=encodeURIComponent(n),o="";if(window.location.origin.includes("localhost"))return!1;o=window.location.hostname.includes("m9")?2:1,1==o?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==o&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+i+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(m.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+m.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var s=sessionStorage.getItem("count");s||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+m.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+m.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",m.a.getPara().openId),localStorage.setItem("openIdCheckCustomer",localStorage.getItem("userId")))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=r}}]),e}(),h=new g,v=n(8),w=n.n(v),y=function(){function e(){d()(this,e)}return p()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(f.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems","startRecord","stopRecord","playVoice"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),_=new y,I=n(7),b=(n(9),n(11)),x=function(){return window.location.host.includes("allinmed")?"production":"development"},S=function(){if("production"===x()){var e=n(59);e.apikey="617001e96c72b7b07126e74ab5c611c473d5f6396e63c1e5a9eef8b98cae3830",b.a.config.errorHandler=function(t,n,i){var r=o(n),s=n.$options&&n.$options.propsData;e.notifyError(t,{metaData:{componeSntName:r,propsData:s,info:i}})}}},k=function(){function e(){d()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e},S()}return p()(e,[{key:"forbidShare",value:function(){I.a.weChatJudge(function(){_.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){Object(f.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){i=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=i.split("&"),s=0;s<r.length;s++)o=r[s].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new s.a(e)))}},{key:"isWXBrowse",value:function(){return h.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==h.isWXBrowse()?21:17}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",i=0,o=0;o<e.length&&(e.charCodeAt(o)>128?i+=2:i++,i<=t);o++)n=n.concat(e[o]);return i>t&&(n+=""),n}},{key:"getNetWork",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"];return"number"==typeof e.type?e.type_text=t[e.type||e.effectiveType]:e.type_text=e.effectiveType,"number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),e.type_text}},{key:"getDeviceType",value:function(){var e="",t=this.isWXBrowse();return"androidWX"===t?e="Android":"iphoneWX"===t&&(e="IOS"),e}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:"unknown"},t=["unknown","","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),i=navigator.userAgent,o="";return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?i.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?i.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?o=1:I.a.weChatJudge(function(){o=0},function(){o=1}),o}},{key:"checkOpenId",value:function(){return h.checkOpenId()}},{key:"wxGetOpenId",value:function(){h.wxGetOpenId()}},{key:"mobileCheck",value:function(){i()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),i=new Date(n).getDay(),o="",r="",s=t[i],a=e.time.substring(11,16);switch(parseInt(e.type)){case 1:o=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",r=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:o=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),r=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:o,years:r,week:s,hour:a}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}(),T=new k;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}},window.version="1.1.3"}();t.a=T},5:function(e,t,n){"use strict";var i=n(1),o=n.n(i),r=n(2),s=n.n(r),a=function(){function e(){o()(this,e)}return s()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){i=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=i.split("&"),s=0;s<r.length;s++)o=r[s].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new a},6:function(e,t,n){"use strict";function i(e){a.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),a()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+r()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(t){e.fail&&e.fail(t)})}t.a=i;var o=n(8),r=n.n(o),s=n(20),a=n.n(s)},7:function(e,t,n){"use strict";var i=n(1),o=n.n(i),r=n(2),s=n.n(r),a=n(9),c=(n.n(a),function(){function e(){o()(this,e)}return s()(e,[{key:"weChatJudge",value:function(e,t){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?e(n):t(n)}}]),e}());t.a=new c}},[1291]);