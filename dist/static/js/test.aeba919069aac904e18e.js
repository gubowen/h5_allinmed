webpackJsonp([13],{12:function(e,t,n){function o(e){n(24)}var a=n(0)(n(25),n(26),o,null,null);e.exports=a.exports},13:function(e,t,n){function o(e){n(27)}var a=n(0)(n(28),n(29),o,null,null);e.exports=a.exports},14:function(e,t){!function(e,t){function n(){var t=r.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;r.style.fontSize=n+"px",u.rem=e.rem=n}var o,a=e.document,r=a.documentElement,i=a.querySelector('meta[name="viewport"]'),s=a.querySelector('meta[name="flexible"]'),c=0,d=0,u=t.flexible||(t.flexible={});if(i){console.warn("将根据已有的meta标签来设置缩放比例");var l=i.getAttribute("content").match(/initial\-scale=([\d\.]+)/);l&&(d=parseFloat(l[1]),c=parseInt(1/d))}else if(s){var p=s.getAttribute("content");if(p){var m=p.match(/initial\-dpr=([\d\.]+)/),f=p.match(/maximum\-dpr=([\d\.]+)/);m&&(c=parseFloat(m[1]),d=parseFloat((1/c).toFixed(2))),f&&(c=parseFloat(f[1]),d=parseFloat((1/c).toFixed(2)))}}if(!c&&!d){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=g?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,d=1/c}if(r.setAttribute("data-dpr",c),!i)if(i=a.createElement("meta"),i.setAttribute("name","viewport"),i.setAttribute("content","initial-scale="+d+", maximum-scale="+d+", minimum-scale="+d+", user-scalable=no, viewport-fit=cover"),r.firstElementChild)r.firstElementChild.appendChild(i);else{var v=a.createElement("div");v.appendChild(i),a.write(v.innerHTML)}e.addEventListener("resize",function(){clearTimeout(o),o=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(o),o=setTimeout(n,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*c+"px":a.addEventListener("DOMContentLoaded",function(e){a.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=e.dpr=c,u.refreshRem=n,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},1659:function(e,t,n){n(40),e.exports=n(1660)},1660:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),a=n.n(o),r=n(2),i=n.n(r),s=n(10),c=n(1661),d=n.n(c),u=n(59),l=n(50),p=n.n(l),m=n(21),f=(n.n(m),n(46),n(1665)),g=n.n(f),h=n(1669),v=n.n(h),y=n(8);n.n(y);p.a.attach(document.body),new(function(){function e(){a()(this,e),this.init()}return i()(e,[{key:"init",value:function(){s.a.use(u.a),this.routerStart(),this.router=new u.a({routes:this.routes});new s.a({router:this.router,render:function(e){return e(d.a)}}).$mount("#test")}},{key:"routerStart",value:function(){this.routes=[{path:"/",redirect:"/test"},{path:"/test",name:"test",component:v.a,meta:{keepAlive:!0}},{path:"/uploadPic",name:"uploadPic",component:g.a,meta:{keepAlive:!0}}]}}]),e}())},1661:function(e,t,n){function o(e){n(1662)}var a=n(0)(n(1663),n(1664),o,null,null);e.exports=a.exports},1662:function(e,t){},1663:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),a=(n.n(o),n(46));t.default={data:function(){return{payShow:!1}},mounted:function(){1==localStorage.getItem("askPay")&&(this.payShow=!0,this.viewResultH5Pay())},methods:{upload:function(){this.$router.push({name:"uploadPic"})},askH5Pay:function(){console.log("============H5支付啊===========");var e={caseId:"1509972059074",patientCustomerId:"1489998682602",patientId:"1491471348694",doctorId:"1234567890123",orderType:"1",orderSourceId:"1493697450391",orderSourceType:"1",orderAmount:.01,status:"1",body:"Test支付",isCharge:"true"};a.a.wxCreateOrder({data:e,backCreateSuccess:function(e){},backCreateError:function(e){},wxPaySuccess:function(e){},wxPayError:function(e){}})},viewResultH5Pay:function(){console.log("H5支付结果查看"),a.a.PayResult({outTradeNo:localStorage.getItem("orderNumber")}).then(function(e){console.log("查看回调",e)}).catch(function(e){console.log(e)})},payHide:function(){localStorage.removeItem("askPay"),this.payShow=!1}}}},1664:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("keep-alive",[e.$route.meta.keepAlive?n("router-view",{staticStyle:{"min-height":"100%"}}):e._e()],1),e._v(" "),e.$route.meta.keepAlive?e._e():n("router-view",{staticStyle:{"min-height":"100%"}})],1)},staticRenderFns:[]}},1665:function(e,t,n){function o(e){n(1666)}var a=n(0)(n(1667),n(1668),o,null,null);e.exports=a.exports},1666:function(e,t){},1667:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),a=n.n(o),r=n(17),i=n.n(r),s=n(3),c=n(19),d=(n.n(c),n(12)),u=n.n(d),l=n(13),p=n.n(l),m={imgCreate:"/mcall/customer/patient/case/attachment/v1/create/",imgDelete:"/mcall/customer/patient/case/attachment/v1/update/",resetTime:"/mcall/customer/case/consultation/v1/updateFrequency/",updateCase:"/mcall/customer/patient/case/v1/update/"};t.default={data:function(){return{uploadList:[],imageList:{},errorShow:!1,errorMsg:"",loading:!1}},computed:{submitFlag:function(){var e=!1;for(var t in this.imageList)if(0!==this.imageList[t].length){e=!0;break}return e}},mounted:function(){this.getUploadList()},methods:{getUploadList:function(){var e=this;localStorage.getItem("upload")||localStorage.setItem("upload",a()(this.$route.params)),this.uploadList=JSON.parse(localStorage.getItem("upload")),this.uploadList.forEach(function(t,n){e.$set(e.imageList,t.adviceId,[])})},upLoadPic:function(e,t,n){var o=n,r=new FormData,i=e.adviceId,c=e.adviceType;r.append("file",o),r.append("paramJson",a()({caseId:s.a.getPara().caseId,imageType:c,caseCategoryId:i})),this.imagePreview(e,t,n),this.submitCreateImg(e,t,r)},imagePreview:function(e,t,n){var o=window.URL.createObjectURL(n);this.imageList[e.adviceId]&&this.$set(this.imageList[e.adviceId],t,{blob:o,imgId:"",uploading:!0,fail:!1})},submitCreateImg:function(e,t,n){var o=this,a=this;i()({url:m.imgCreate,method:"post",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4}).then(function(n){var r=n.data;a.$set(o.imageList[e.adviceId],t,{blob:r.responseObject.responseMessage.logoUrl,imgId:r.responseObject.responsePk,uploading:!1,fail:!1}),a.loading=!1},function(e){})},imgDelete:function(e,t,n){var o=this;s.a.ajax({url:m.imgDelete,method:"POST",data:{id:e.imgId,isValid:0},beforeSend:function(){},done:function(){o.imageList[n].splice(t,1)}})},onFileChange:function(e,t,n){var o=this,a=n.target.files||n.dataTransfer.files;a.length&&(this.loading=!0,a[0].size>5242880?(this.errorShow=!0,this.errorMsg="图片不能超过5M",setTimeout(function(){o.errorMsg="",o.errorShow=!1},3e3)):this.upLoadPic(e,t,a[0]))},backToImPage:function(){this.$emit("csFn",["11"]),s.a.ajax({url:m.resetTime,method:"POST",data:{consultationId:"1503368110114",frequency:"0",frequencyType:"4",consultationState:0},beforeSend:function(){},done:function(){that.imageList[id].splice(index,1)}})}},components:{Toast:p.a,Loading:u.a}}},1668:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"upload-wrapper"},[n("section",{staticClass:"main-inner tc-upLoadFile ev-delete"},[e._l(e.uploadList,function(t,o){return n("section",{staticClass:"tc-upLoadBox"},[n("figure",{staticClass:"tc-upLoadTitle ev-upLoadList"},[n("span",{staticClass:"tc-upLoadTitleName",attrs:{"data-treatmentid":t.adviceId,"data-advicetype":t.adviceType}},[e._v(e._s(t.adviceName))]),e._v(" "),n("span",{staticClass:"tc-upLoadRightIcon"}),e._v(" "),n("span",{staticClass:"tc-upLoadRightCover"}),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:0===e.imageList[t.adviceId].length,expression:"imageList[item.adviceId].length===0"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file"},on:{change:function(n){e.onFileChange(t,0,n)}}})]),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.imageList[t.adviceId].length>0,expression:"imageList[item.adviceId].length>0"}],staticClass:"tc-upLoadItemBox docInt"},[e._l(e.imageList[t.adviceId],function(o,a){return n("li",{staticClass:"tc-upLoadItemList ev-imgList success"},[n("img",{attrs:{alt:"",src:o.blob},on:{click:function(t){e.showBigImg(o,a,1)}}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:0==o.uploading,expression:"img.uploading==false"}],staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"},on:{click:function(n){e.imgDelete(o,a,t.adviceId)}}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:o.uploading,expression:"img.uploading"}]},[n("span",{staticClass:"tc-upLoadCover"}),e._v(" "),n("span",{staticClass:"tc-upLoading"}),e._v(" "),n("span",{staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"}}),e._v(" "),n("span",{staticClass:"tc-upLoadAfreshText"},[e._v("等待上传")])]),e._v(" "),t.fail?n("figure",{staticClass:"upload-fail"},[n("p",[e._v("重新上传")]),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:e.imageList[t.adviceId].length>0&&o.finish,expression:"imageList[item.adviceId].length>0 && img.finish"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file"},on:{change:function(t){e.onFileChange(o,a,t)}}})]):e._e()])}),e._v(" "),e.imageList[t.adviceId].length>0&&!e.loading?n("li",{staticClass:"tc-upLoadAdd",staticStyle:{display:"list-item"}},[n("a",{attrs:{href:"javascript:;"}},[n("span",{staticClass:"tc-upLoadAddMore"},[n("input",{staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file"},on:{change:function(n){e.onFileChange(t,e.imageList[t.adviceId].length,n)}}})])])]):e._e()],2)])}),e._v(" "),n("footer",{staticClass:"tc-upLoadSubmit"},[e.submitFlag?n("button",{staticClass:"tc-submitBtn",on:{click:e.backToImPage}},[e._v("提交")]):e._e(),e._v(" "),e.submitFlag?e._e():n("button",{staticClass:"tc-submitDisabled"},[e._v("提交")])])],2),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.errorShow?n("Toast",{attrs:{content:e.errorMsg}}):e._e()],1)],1)},staticRenderFns:[]}},1669:function(e,t,n){function o(e){n(1670)}var a=n(0)(n(1671),n(1672),o,null,null);e.exports=a.exports},1670:function(e,t){},1671:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),a=(n.n(o),n(3));t.default={data:function(){return{payShow:!1}},mounted:function(){this.wxTest()},methods:{upload:function(){this.$router.push({name:"uploadPic"})},askH5Pay:function(){console.log("============H5支付啊===========");var e={caseId:"1509972059074",patientCustomerId:"1489998682602",patientId:"1491471348694",doctorId:"1234567890123",orderType:"1",orderSourceId:"1493697450391",orderSourceType:"1",orderAmount:.01,status:"1",body:"Test支付",isCharge:"true"};WxPayCommon.wxCreateOrder({data:e,backCreateSuccess:function(e){},backCreateError:function(e){},wxPaySuccess:function(e){},wxPayError:function(e){}})},viewResultH5Pay:function(){console.log("H5支付结果查看"),WxPayCommon.PayResult({outTradeNo:localStorage.getItem("orderNumber")}).then(function(e){console.log("查看回调",e)}).catch(function(e){console.log(e)})},payHide:function(){localStorage.removeItem("askPay"),this.payShow=!1},wxLogin:function(){a.a.ajax({url:"/mcall/patient/customer/unite/v1/accountlogin/",method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},data:{account:"18810289689",password:"111111",siteId:a.a.getSiteId()},done:function(e){}})},wxTest:function(){var e=this;a.a.ajax({url:"/mcall/patient/customer/unite/v1/getPatientInfo/",method:"POST",data:{customerId:a.a.getPara().customerId},done:function(t){if(t&&t.responseObject.responseData){if(0!=t.responseObject.responseData.uniteFlagWeixin)return!1;e.wxBind()}}})},wxBind:function(){var e="",t="",n="";if(window.location.origin.includes("localhost"))return!1;n=window.location.hostname.includes("m9")?2:1,1==n?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==n&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var o=t+"?ref="+window.location.href.split("#")[0]+"&response_type=code&scope=snsapi_base&state=bundingWx#wechat_redirect",a=encodeURIComponent(o),r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+a;window.location.href=r}}}},1672:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a",{attrs:{href:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5288ad7f627608&redirect_uri=http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/?ref=https://m9.allinmed.cn/dist/consult.html&response_type=code&scope=snsapi_base&state=b6#wechat_redirect"}},[e._v("喵！")]),e._v(" "),n("p",{staticStyle:{width:"500px","line-height":"100px","text-align":"center",background:"red"},on:{click:function(t){e.wxLogin()}}},[e._v("点击登录")]),e._v(" "),n("p",{staticStyle:{width:"500px","line-height":"100px","text-align":"center",background:"red","margin-top":"100px"}},[e._v("点击绑定")])])},staticRenderFns:[]}},19:function(e,t,n){function o(e){n(35)}var a=n(0)(n(36),n(37),o,null,null);e.exports=a.exports},21:function(e,t){},22:function(e,t,n){e.exports=n.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},24:function(e,t){},25:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{show:{type:Boolean}}}},26:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",{staticClass:"middle-tip-box ev-loading"},[o("section",{staticClass:"middle-tip-modal"},[o("figure",{staticClass:"middle-tip-box-text"},[o("img",{attrs:{src:n(22),alt:"loading..."}})])])])}]}},27:function(e,t){},28:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},mounted:function(){console.log()},props:{content:{type:String},imgUrl:{type:String}}}},29:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"middle-tip-modal popup-tips show"},[e.imgUrl?n("figure",{staticClass:"middle-tips-box-img"},[n("img",{attrs:{src:e.imgUrl,alt:""}})]):e._e(),e._v(" "),n("figure",{staticClass:"middle-tip-box-text"},[n("p",{staticClass:"tipText"},[e._v(e._s(e.content))])])])},staticRenderFns:[]}},3:function(e,t,n){"use strict";function o(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==f.a.getPara().patientCustomerId)e.customerId=0===f.a.getPara().patientCustomerId.length?0:f.a.getPara().patientCustomerId;else{if(void 0===f.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===f.a.getPara().customerId.length?0:f.a.getPara().customerId}Object(m.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",y()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}function a(e){if(e.$root===e)return"root";var t=e._isVue?e.$options&&e.$options.name||e.$options&&e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options&&e.$options.__file?" at "+(e.$options&&e.$options.__file):"")}var r=n(42),i=n.n(r),s=n(43),c=n.n(s),d=n(1),u=n.n(d),l=n(2),p=n.n(l),m=n(6),f=n(5),g=function(){function e(){u()(this,e)}return p()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t=localStorage.getItem("userId"),n=localStorage.getItem("openIdCheckCustomer"),o="";return null!=e&&t==n?o=!0:(o=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),o}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,o=encodeURIComponent(n),a="";if(window.location.origin.includes("localhost"))return!1;a=window.location.hostname.includes("m9")?2:1,1==a?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==a&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+o+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(f.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+f.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var i=sessionStorage.getItem("count");i||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+f.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+f.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",f.a.getPara().openId),localStorage.setItem("openIdCheckCustomer",localStorage.getItem("userId")))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=r}}]),e}(),h=new g,v=n(9),y=n.n(v),I=function(){function e(){u()(this,e)}return p()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(m.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems","startRecord","stopRecord","playVoice"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),w=new I,S=n(7),x=(n(8),n(10)),b=function(){return window.location.host.includes("allinmed")?"production":"development"},k=function(){if("production"===b()){var e=n(44);e.apikey="617001e96c72b7b07126e74ab5c611c473d5f6396e63c1e5a9eef8b98cae3830",x.a.config.errorHandler=function(t,n,o){var r=a(n),i=n.$options&&n.$options.propsData;e.notifyError(t,{metaData:{componeSntName:r,propsData:i,info:o}})}}},_=function(){function e(){u()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e},k()}return p()(e,[{key:"forbidShare",value:function(){S.a.weChatJudge(function(){w.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){Object(m.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,a=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=o.split("&"),i=0;i<r.length;i++)a=r[i].split("="),n[a[0]]=decodeURIComponent(a[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new i.a(e)))}},{key:"isWXBrowse",value:function(){return h.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==h.isWXBrowse()?21:17}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",o=0,a=0;a<e.length&&(e.charCodeAt(a)>128?o+=2:o++,o<=t);a++)n=n.concat(e[a]);return o>t&&(n+=""),n}},{key:"getNetWork",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"];return"number"==typeof e.type?e.type_text=t[e.type||e.effectiveType]:e.type_text=e.effectiveType,"number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),e.type_text}},{key:"getDeviceType",value:function(){var e="",t=this.isWXBrowse();return"androidWX"===t?e="Android":"iphoneWX"===t&&(e="IOS"),e}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:"unknown"},t=["unknown","","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),o=navigator.userAgent,a="";return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?a=1:S.a.weChatJudge(function(){a=0},function(){a=1}),a}},{key:"checkOpenId",value:function(){return h.checkOpenId()}},{key:"wxGetOpenId",value:function(){h.wxGetOpenId()}},{key:"mobileCheck",value:function(){o()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),o=new Date(n).getDay(),a="",r="",i=t[o],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:a=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",r=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:a=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),r=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:a,years:r,week:i,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}(),T=new _;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=T},35:function(e,t){},36:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},methods:{cancelClickEvent:function(){this.$emit("cancelClickEvent")},ensureClickEvent:function(){this.$emit("ensureClickEvent")}},mounted:function(){},props:{confirmParams:{type:Object}}}},37:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"maskers confirmBox-tips show"},[n("section",{staticClass:"confirmBox-inner"},[n("article",{staticClass:"confirmBox-content"},[n("article",[e.confirmParams.title?n("h2",{staticStyle:{"font-weight":"bold"}},[e._v(e._s(e.confirmParams.title))]):e._e(),e._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:e.confirmParams.content,expression:"confirmParams.content"}]},[e._v(e._s(e.confirmParams.content))])])]),e._v(" "),n("footer",{staticClass:"confirmBox-btns"},[n("button",{staticClass:"confirmBox-cancelBtn",on:{click:e.cancelClickEvent}},[e._v(e._s(e.confirmParams.cancel))]),e._v(" "),n("button",{staticClass:"confirmBox-ensureBtn",on:{click:e.ensureClickEvent}},[e._v(e._s(e.confirmParams.ensure))])])])])},staticRenderFns:[]}},46:function(e,t,n){"use strict";function o(e){var t={upOrderStatusUrl:"/mcall/cms/pay/order/v1/update/"},n={orderId:e.orderId};new(function(){function o(){d()(this,o),this.init()}return l()(o,[{key:"init",value:function(){switch(e.outTradeNo=1==parseInt(e.isTest)?"":e.outTradeNo,parseInt(e.operationType)){case 1:n.outTradeNo=e.outTradeNo;break;case 2:n.status=e.status,n.payTime=e.payTime,n.outTradeNo=e.outTradeNo,n.orderType=e.orderType,n.orderSourceId=e.orderSourceId;break;case 3:n.status=e.status,n.outTradeNo=e.outTradeNo,n.orderType=e.orderType,n.orderSourceId=e.orderSourceId;break;case 4:n.status=e.status,n.orderType=e.orderType,n.orderSourceId=e.orderSourceId,e.charge&&"true"==e.charge&&(n.outTradeNo=e.outTradeNo,n.refundReason=e.refundReason,n.refundReasonDesc=e.refundReasonDesc);break;case 5:n.status=e.status,n.outRefundNo=e.outRefundNo,n.refundAmount=e.refundAmount,n.refundTime=e.refundTime;break;case 6:n.status=e.status}2==e.orderType&&(n.reservationStatus=e.reservationStatus),p.a.ajax({url:t.upOrderStatusUrl,method:"POST",data:n,done:function(t){e.callBack(t)},fail:function(t){e.errorCallBack()}})}}]),o}())(e)}function a(e){var t={wxBasePath:"",prepayPth:"/mcall/base/pay/external/v1/createPrepaidOrder/",operationOrderPth:"/mcall/customer/operation/order/v1/update/"},n={};new(function(){function a(){d()(this,a),this.init(),console.log(e)}return l()(a,[{key:"init",value:function(){console.log("微信支付");var t=this;1==parseInt(e.isTest)?t.paySuccess():t.wxReady()}},{key:"wxReady",value:function(){var e=this;h.wxGetToken({callBack:function(t){t.data.responseStatus&&(n.token=t.data.responseData.token,n.nonceStr=t.nonceStr,n.ipAddr=t.data.responseData.ipAddr,console.log("-------------token数据--------------"),console.log(t),e.prepaidOrder({token:n.token,nonceStr:n.nonceStr,ipAddr:n.ipAddr}))}})}},{key:"prepaidOrder",value:function(a){var r=this,i={total_fee:100*e.total_fee,body:"唯医骨科-"+e.body,trade_type:"JSAPI",scene:1,siteId:1,roleId:"2",openid:localStorage.getItem("openId"),nonceStr:a.nonceStr,token:a.token,ipAddr:a.ipAddr};console.log("-------------预支付参数--------------"),console.log(i),p.a.ajax({url:t.prepayPth,method:"POST",data:i,done:function(t){console.log(t),t&&"OK"==t.return_msg&&(console.log(t),n.dataL1=t,localStorage.setItem("orderNumber",t.out_trade_no),o({operationType:"1",orderId:e.orderId,outTradeNo:t.out_trade_no,callBack:function(e){e&&e.responseObject&&e.responseObject.responseStatus&&r.checkWxPay()},errorCallBack:function(){}}))}})}},{key:"checkWxPay",value:function(){var e=this;"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e.onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e.onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",e.onBridgeReady)):e.onBridgeReady()}},{key:"onBridgeReady",value:function(){var t=this,o=n.dataL1;Math.round((new Date).getTime()/1e3);console.log("-----pay-----"),WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:o.appid,timeStamp:o.timeStamp,nonceStr:o.nonceStr,package:"prepay_id="+o.prepay_id,signType:"MD5",paySign:o.sign},function(n){"get_brand_wcpay_request:ok"==n.err_msg?1==e.orderType&&0==e.orderSourceId?"shuntDoctor"==e.doctorType?t.creatShuntInquiryId({queryCallBack:function(n){e.orderSourceId=n,t.paySuccess()}}):t.creatInquiryId({queryCallBack:function(n){e.orderSourceId=n,t.paySuccess()}}):t.paySuccess():t.payError()})}},{key:"paySuccess",value:function(){o({operationType:"2",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:1==parseInt(e.isTest)?h.mathRandomNum({numberValue:10}):localStorage.getItem("orderNumber"),status:"2",payTime:"1",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus?e.callBack({responseStatus:"true",out_trade_no:localStorage.getItem("orderNumber")}):common.popup({text:"更新订单失败"})},errorCallBack:function(){common.popup({text:"更新订单失败"})}})}},{key:"payError",value:function(){o({operationType:"3",orderId:e.orderId,orderType:e.orderType,reservationStatus:2==e.orderType?e.reservationStatus:"",orderSourceId:e.orderSourceId,outTradeNo:localStorage.getItem("orderNumber"),status:"1",payTime:"",callBack:function(t){t&&t.responseObject&&t.responseObject.responseStatus&&e.callBack({responseStatus:"false"})},errorCallBack:function(){}})}},{key:"creatInquiryId",value:function(e){p.a.ajax({url:"/mcall/customer/case/consultation/v1/getMapById/",method:"POST",data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),consultationType:1},done:function(t){"NO DATA"==t.responseObject.responseMessage&&p.a.ajax({url:"/mcall/customer/case/consultation/v1/create/",method:"POST",data:{caseId:p.a.getPara().caseId,customerId:p.a.getPara().doctorCustomerId||localStorage.getItem("docId"),patientCustomerId:localStorage.getItem("userId"),patientId:p.a.getPara().patientId,consultationType:1,consultationState:-1,consultationLevel:localStorage.getItem("orderPayType"),caseType:0},done:function(t){t.responseObject.responseStatus&&(localStorage.removeItem("docId"),sessionStorage.setItem("orderSourceId",t.responseObject.responsePk),e.queryCallBack(t.responseObject.responsePk))}})}})}},{key:"creatShuntInquiryId",value:function(t){p.a.ajax({url:"/mcall/customer/case/consultation/v1/getMapById/",method:"POST",data:{caseId:e.caseId,customerId:0,consultationType:0,siteId:p.a.getSiteId()},done:function(n){"NO DATA"==n.responseObject.responseMessage&&p.a.ajax({url:"/mcall/customer/case/consultation/v1/create/",method:"POST",data:{caseId:e.caseId,customerId:0,patientCustomerId:e.patientCustomerId,patientId:e.patientId,consultationType:0,consultationState:4,siteId:p.a.getSiteId(),caseType:0},done:function(e){e.responseObject.responseStatus&&t.queryCallBack(e.responseObject.responsePk)}})}})}}]),a}())(e)}function r(e){var t={wxBasePath:"",prepayPth:"/mcall/base/pay/external/v1/createPrepaidOrder/",operationOrderPth:"/mcall/customer/operation/order/v1/update/"},n={};new(function(){function o(){d()(this,o),this.init()}return l()(o,[{key:"init",value:function(){console.log("H5支付");var t=this;1==parseInt(e.isTest)?t.paySuccess():t.wxReady()}},{key:"wxReady",value:function(){var e=this;h.wxGetTokenPlus().then(function(t){t.data.responseStatus&&(n.token=t.data.responseData.token,n.nonceStr=t.nonceStr,n.ipAddr=t.data.responseData.ipAddr,e.prepaidOrder({token:n.token,nonceStr:n.nonceStr,ipAddr:n.ipAddr}))}).catch(function(e){console.log("h5,支付接口错误")})}},{key:"prepaidOrder",value:function(o){var a=this,r={total_fee:100*e.total_fee,body:"唯医骨科-"+e.body,trade_type:"MWEB",scene:1,siteId:1,roleId:"2",nonceStr:o.nonceStr,token:o.token,ipAddr:o.ipAddr};console.log(r),p.a.ajax({url:t.prepayPth,method:"POST",data:r,done:function(e){e&&"OK"==e.return_msg&&(console.log(e),n.dataL1=e,localStorage.setItem("orderNumber",e.out_trade_no),a.h5AskPay(e))}})}},{key:"h5AskPay",value:function(){var e=n.dataL1;console.log("-----pay-----"),localStorage.setItem("payOk",1),console.log(e.mweb_url),window.location.href=e.mweb_url+"&redirect_url="+encodeURIComponent(window.location.href)}}]),o}())(e)}function i(e){var t={outTradeNo:e.outTradeNo,scene:1,roleId:2,nonceStr:localStorage.getItem("nonceStr"),siteId:1,token:localStorage.getItem("token"),ipAddr:localStorage.getItem("ipAddr")};return console.log(t),new f.a(function(e,n){p.a.ajax({url:v.payResultUrl,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:t,done:function(t){t&&t.responseData&&t.responseData.dataList?e(t.responseData.dataList):n(new Error("望天，接口出错了"))}})})}function s(e){var t={createOrder:"/mcall/cms/pay/order/v1/create/",updateOrder:"/mcall/cms/pay/order/v1/update/"};new(function(){function n(){d()(this,n),this.init()}return l()(n,[{key:"init",value:function(){this.firstLoad(),console.log(e)}},{key:"firstLoad",value:function(){var n=this;this.createOrderData={caseId:e.data.caseId,patientCustomerId:e.data.patientCustomerId,patientId:e.data.patientId,doctorId:e.data.doctorId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,orderSourceType:e.data.orderSourceType,visitSiteId:p.a.getSiteId()},"true"==e.data.isCharge?(this.createOrderData.orderAmount=e.data.orderAmount,this.createOrderData.status="1"):this.createOrderData.status="2",p.a.ajax({url:t.createOrder,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:this.createOrderData,done:function(t){t&&t.responseObject&&t.responseObject.responsePk?(n.orderId=t.responseObject.responsePk,n.orderSuccess({orderId:t.responseObject.responsePk})):e.backCreateError()},fail:function(e){}})}},{key:"orderSuccess",value:function(){var t=this;switch(parseInt(e.data.orderType)){case 1:case 3:"true"===e.data.isCharge?y.a.weChatJudge(function(e){t.goWxPay(e)},function(e){t.goH5Pay(e)}):e.backCreateSuccess(this.orderId);break;case 2:e.backCreateSuccess(this.orderId)}}},{key:"goWxPay",value:function(){a({isTest:0,orderId:this.orderId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,total_fee:e.data.orderAmount,body:e.data.body,doctorType:e.data.doctorType,caseId:e.data.caseId,patientCustomerId:e.data.patientCustomerId,patientId:e.data.patientId,callBack:function(t){"true"===t.responseStatus?e.wxPaySuccess():e.wxPayError()}})}},{key:"goH5Pay",value:function(){r({isTest:0,orderId:this.orderId,orderType:e.data.orderType,orderSourceId:e.data.orderSourceId,total_fee:e.data.orderAmount,body:e.data.body,callBack:function(e){}})}}]),n}())(e)}var c=n(1),d=n.n(c),u=n(2),l=n.n(u),p=n(3),m=n(11),f=n.n(m),g=(n(8),function(){function e(t){d()(this,e)}return l()(e,[{key:"mathRandomNum",value:function(e){for(var t="",n=e.numberValue,o=[0,1,2,3,4,5,6,7,8,9],a=0;a<n;a++){t+=o[Math.floor(10*Math.random())]}return t}},{key:"mathRandom",value:function(e){for(var t="",n=e.numberValue,o=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],a=0;a<n;a++){t+=o[Math.floor(36*Math.random())]}return t.toLowerCase()}},{key:"wxGetTokenPlus",value:function(){var e=this.mathRandom({numberValue:32});return new f.a(function(t,n){p.a.ajax({url:"/mcall/base/pay/external/v1/getToken/",method:"POST",data:{roleId:2,nonceStr:e,siteId:1},done:function(o){localStorage.setItem("validityTime",Math.round((new Date).getTime()/1e3)),localStorage.setItem("token",o.responseData.token),localStorage.setItem("ipAddr",o.responseData.ipAddr),localStorage.setItem("nonceStr",e),o&&o.responseStatus?t({data:o,nonceStr:e}):n(err)}})})}},{key:"wxGetToken",value:function(e){var t=this.mathRandom({numberValue:32});p.a.ajax({url:"/mcall/base/pay/external/v1/getToken/",method:"POST",data:{roleId:2,nonceStr:t,siteId:1},done:function(n){localStorage.setItem("validityTime",Math.round((new Date).getTime()/1e3)),localStorage.setItem("token",n.responseData.token),localStorage.setItem("nonceStr",t),n&&n.responseData&&n.responseData.token&&n.responseData.token.length>0&&e.callBack({data:n,nonceStr:t})}})}},{key:"checkToken",value:function(){var e=Math.round((new Date).getTime()/1e3),t=localStorage.getItem("validityTime");return null!=t&&e-t<7200}},{key:"checkOpenId",value:function(){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}},{key:"wxGetOpenId",value:function(){var e=window.location.href,t=encodeURIComponent(e),n="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa5288ad7f627608&redirect_uri="+t+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(common.getpara().code)-1===window.location.href.indexOf("openId")&&(window.location.href="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+common.getpara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var o=sessionStorage.getItem("count");o||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+common.getpara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+common.getpara().openId,localStorage.setItem("openId",common.getpara().openId))}else localStorage.setItem("currentUrl",e),window.location.href=n}}]),e}()),h=new g,v=(n(106),{payResultUrl:"/mcall/base/pay/external/v1/getResultBack/"}),y=n(7),I=function(){function e(t){d()(this,e)}return l()(e,[{key:"wxCloseOrder",value:function(){}},{key:"wxCreateOrder",value:function(e){s(e)}},{key:"wxUpOrder",value:function(e){o(e)}},{key:"wxPay",value:function(e){a(e)}},{key:"H5Pay",value:function(e){r(e)}},{key:"PayResult",value:function(e){return i(e)}}]),e}();t.a=new I},5:function(e,t,n){"use strict";var o=n(1),a=n.n(o),r=n(2),i=n.n(r),s=function(){function e(){a()(this,e)}return i()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,a=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var r=o.split("&"),i=0;i<r.length;i++)a=r[i].split("="),n[a[0]]=decodeURIComponent(a[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s},6:function(e,t,n){"use strict";function o(e){s.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),s()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+r()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(t){e.fail&&e.fail(t)})}t.a=o;var a=n(9),r=n.n(a),i=n(17),s=n.n(i)},7:function(e,t,n){"use strict";var o=n(1),a=n.n(o),r=n(2),i=n.n(r),s=n(8),c=(n.n(s),function(){function e(){a()(this,e)}return i()(e,[{key:"weChatJudge",value:function(e,t){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?e(n):t(n)}}]),e}());t.a=new c}},[1659]);