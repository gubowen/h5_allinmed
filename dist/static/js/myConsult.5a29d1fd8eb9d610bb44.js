webpackJsonp([8],{1:function(t,e,n){"use strict";function i(t){g.a.interceptors.request.use(function(e){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),t.beforeSend&&t.beforeSend(e),e}),g()({url:t.url,method:t.method,data:t.data,transformRequest:[function(t){return"paramJson="+f()(t)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(e){t.done(e.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")},function(e){t.fail&&t.fail(e)})}function a(){var t={isValid:1,firstResult:0,maxResult:99999,customerId:""};if(w.getPara().openId||(void 0!==w.getPara().patientCustomerId?t.customerId=w.getPara().patientCustomerId:void 0!==w.getPara().customerId?t.customerId=w.getPara().customerId:t.customerId=0),parseInt(t.customerId)>0)return!0;i({url:"/mcall/patient/customer/unite/v1/getById/",method:"POST",data:t,beforeSend:function(){},timeOut:2e3,done:function(e){if(localStorage.setItem("customerBaseInfo_one",f()(e)),e&&e.responseObject&&e.responseObject.responseData&&e.responseObject.responseData.dataList){var n=e.responseObject.responseData.dataList.patientCustomerUnite.mobile;if(n&&n.length>0)return!0;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+t.customerId}}})}var o=n(33),s=n.n(o),r=n(34),c=n.n(r),l=n(2),u=n.n(l),d=n(3),p=n.n(d),m=n(4),f=n.n(m),h=n(10),g=n.n(h),v=function(){function t(){u()(this,t)}return p()(t,[{key:"getPara",value:function(t){var e=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,a=void 0;if(e.lastIndexOf(t||"?")>0){i=e.substring(e.lastIndexOf(t||"?")+1,e.length);for(var o=i.split("&"),s=0;s<o.length;s++)a=o[s].split("="),n[a[0]]=decodeURIComponent(a[1])}return n}}]),t}(),w=new v,I=function(){function t(){u()(this,t)}return p()(t,[{key:"checkOpenId",value:function(){var t=localStorage.getItem("openId"),e="";return null!=t?e=!0:(e=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),e}},{key:"isWXBrowse",value:function(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)&&t.indexOf("iphone")>0?"iphoneWX":"micromessenger"==t.match(/MicroMessenger/i)&&t.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var t="",e="",n=window.location.origin+window.location.pathname+window.location.search,i=encodeURIComponent(n),a="";if(window.location.origin.includes("localhost"))return!1;a=window.location.hostname.includes("m1")?2:1,1==a?(t="wxe8384f7b06c169ef",e="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==a&&(t="wxaa5288ad7f627608",e="http://m1.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var o="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+t+"&redirect_uri="+i+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(w.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=e+"?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+w.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var s=sessionStorage.getItem("count");s||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+w.getPara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+w.getPara().openId,localStorage.setItem("openId",w.getPara().openId))}else localStorage.setItem("currentUrl",n),window.location.href=o}}]),t}(),y=new I,_=function(){function t(){u()(this,t),this.removeByValue=function(t,e){for(var n=0;n<this.length;n++)if(t[n]==val){t.splice(n,1);break}return t}}return p()(t,[{key:"ajax",value:function(t){i(t)}},{key:"getPara",value:function(t){var e=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,a=void 0;if(e.lastIndexOf(t||"?")>0){i=e.substring(e.lastIndexOf(t||"?")+1,e.length);for(var o=i.split("&"),s=0;s<o.length;s++)a=o[s].split("="),n[a[0]]=decodeURIComponent(a[1])}return n}},{key:"removeDub",value:function(t){return[].concat(c()(new s.a(t)))}},{key:"isWXBrowse",value:function(){y.isWXBrowse()}},{key:"getByteLen",value:function(t){for(var e=0,n=0;n<t.length;n++)null!==t[n].match(/[^\x00-\xff]/gi)?e+=2:e+=1;return e}},{key:"getStrByteLen",value:function(t,e){for(var n="",i=0,a=0;a<t.length&&(t.charCodeAt(a)>128?i+=2:i++,i<=e);a++)n=n.concat(t[a]);return i>e&&(n+=""),n}},{key:"getConnectType",value:function(){var t=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},e=["unknown","ethernet","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),i=navigator.userAgent;return"number"==typeof t.type?t.type_text=e[t.type]:"androidWX"===n?"WIFI"!==t.type||"wifi"!==t.type?i.indexOf("WIFI")>0?t.type_text="wifi":t.type_text="other":t.type_text=t.type:"iphoneWX"===n?i.indexOf("WIFI")>0?t.type_text="wifi":t.type_text="other":"undefined"!==t.type?t.type_text=t.type:t.type_text="other","number"==typeof t.bandwidth&&(t.bandwidth>10?t.type="wifi":t.bandwidth>2?t.type="3g":t.bandwidth>0?t.type="2g":0==t.bandwidth?t.type="none":t.type="unknown"),"wifi"==t.type_text?1:0}},{key:"checkOpenId",value:function(){return y.checkOpenId()}},{key:"wxGetOpenId",value:function(){y.wxGetOpenId()}},{key:"mobileCheck",value:function(){a()}},{key:"timeFormate",value:function(t){var e=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=t.time.substring(0,10).replace(/\-/g,"/"),i=new Date(n).getDay(),a="",o="",s=e[i],r=t.time.substring(11,16);switch(parseInt(t.type)){case 1:a=t.time.substring(0,4)+"年"+t.time.substring(5,7)+"月"+t.time.substring(8,10)+"日",o=t.time.substring(5,7)+"月"+t.time.substring(8,10)+"日";break;case 2:a=t.time.substring(0,4)+"."+t.time.substring(5,7)+"."+t.time.substring(8,10),o=t.time.substring(5,7)+"."+t.time.substring(8,10)}return{year:a,years:o,week:s,hour:r}}},{key:"MillisecondToDate",value:function(t){var e=parseFloat(t)/1e3;return null!=e&&""!=e?e>60&&e<3600?e=parseInt(e/60)+"分钟":e>=3600&&e<86400?e=parseInt(e/3600)+"小时"+parseInt(60*(parseFloat(e/3600)-parseInt(e/3600)))+"分钟":e>=86400&&(e=Math.round(parseInt(e/86400))+"天"):e="0 时 0 分0 秒",e}},{key:"MillisecondToDateNew",value:function(t){var e=parseFloat(t)/1e3;return e=null!=e&&""!=e?e>60&&e<3600?parseInt(e/60)+"分钟":e>=3600&&e<86400?parseInt(e/3600)+"小时":parseInt(e)+"秒":"0 时 0 分0 秒"}}]),t}(),b=new _;!function(){Array.prototype.removeByValue=function(t){for(var e=0;e<this.length;e++)if(this[e]==t){this.splice(e,1);break}}}();e.a=b},1e3:function(t,e,n){function i(t){n(1001)}var a=n(0)(n(1002),n(1003),i,null,null);t.exports=a.exports},1001:function(t,e){},1002:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),a=n.n(i),o=n(10),s=n.n(o),r=n(1),c=n(6),l=(n.n(c),n(5)),u=n.n(l),d=n(7),p=n.n(d),m={getToken:"/mcall/im/interact/v1/refreshToken/",imgCreate:"/mcall/customer/patient/case/attachment/v1/create/",imgDelete:"/mcall/customer/patient/case/attachment/v1/update/",updateConsultState:"/mcall/customer/patient/case/v1/update/"};e.default={data:function(){return{uploadList:[],imageList:{},errorShow:!1,errorMsg:"",loading:!1,userData:{account:"",token:""}}},computed:{submitFlag:function(){var t=!1;for(var e in this.imageList)if(0!==this.imageList[e].length){t=!0;break}return t}},mounted:function(){this.getUploadList()},methods:{getUploadList:function(){var t=this;this.$route.params.hisPicLists&&(this.uploadList=this.$route.params.hisPicLists,this.uploadList.forEach(function(e){t.$set(t.imageList,e.adviceId,[])}))},upLoadPic:function(t,e,n){var i=this,o=n,s=new FormData,r=t.adviceId,c=t.adviceType;s.append("file",o),s.append("paramJson",a()({caseId:i.$route.params.caseId,imageType:c,caseCategoryId:r})),this.imagePreview(t,e,n),this.submitCreateImg(t,e,s)},imagePreview:function(t,e,n){var i=window.URL.createObjectURL(n);this.imageList[t.adviceId]&&this.$set(this.imageList[t.adviceId],e,{blob:i,imgId:"",uploading:!0,fail:!1})},imgDelete:function(t,e,n){var i=this;r.a.ajax({url:m.imgDelete,method:"POST",data:{id:t.imgId,isValid:0},beforeSend:function(){},done:function(){i.imageList[n].splice(e,1)}})},submitCreateImg:function(t,e,n){var i=this,a=this;s()({url:m.imgCreate,method:"post",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4}).then(function(n){var o=n.data;a.$set(i.imageList[t.adviceId],e,{blob:o.responseObject.responseMessage.logoUrl,imgId:o.responseObject.responsePk,uploading:!1,fail:!1}),a.loading=!1},function(t){})},onFileChange:function(t,e,n){var i=this,a=n.target.files||n.dataTransfer.files;a.length&&(this.loading=!0,a[0].size>5242880?(this.errorShow=!0,this.errorMsg="图片不能超过5M",setTimeout(function(){i.errorMsg="",i.errorShow=!1},3e3)):this.upLoadPic(t,e,a[0]))},backToImPage:function(){var t=this;r.a.ajax({url:m.updateConsultState,method:"POST",data:{caseId:t.$route.params.caseId,state:"0"},done:function(e){e.responseObject.responseStatus?(t.getUserBaseData(t.$route.params.caseId),t.$router.push({path:"/consultHis"})):console.log("更新状态失败")}})},getUserBaseData:function(t){var e=this;r.a.ajax({url:m.getToken,method:"POST",data:{accid:"0_"+t},done:function(n){n.responseObject.responseStatus&&(e.userData={account:"0_"+t,token:n.responseObject.responseData.token},e.connectToNim())}})},connectToNim:function(){var t=this;this.nim=NIM.getInstance({appKey:"50c93d2ab7e207fd83231a245c07bfbc",account:t.userData.account,token:t.userData.token,onconnect:function(e){console.log("连接成功"),t.nimSendSuccess()},onwillreconnect:function(t){console.log("已重连"+t.retryCount+"次，"+t.duration+"后将重连...")},ondisconnect:function(){console.log("链接已中断...")}})},nimSendSuccess:function(){this.nim.sendText({scene:"p2p",to:"1_doctor00001",text:"患者已上传检查资料",done:function(t,e){console.log("患者已上传检查资料")}})}},components:{Toast:p.a,Loading:u.a}}},1003:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"upload-wrapper"},[n("section",{staticClass:"main-inner tc-upLoadFile ev-delete"},[t._l(t.uploadList,function(e,i){return n("section",{staticClass:"tc-upLoadBox"},[n("figure",{staticClass:"tc-upLoadTitle ev-upLoadList"},[n("span",{staticClass:"tc-upLoadTitleName",attrs:{"data-treatmentid":e.adviceId,"data-advicetype":e.adviceType}},[t._v(t._s(e.adviceName))]),t._v(" "),n("span",{staticClass:"tc-upLoadRightIcon"}),t._v(" "),n("span",{staticClass:"tc-upLoadRightCover"}),t._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:0===t.imageList[e.adviceId].length,expression:"imageList[item.adviceId].length===0"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/gif,image/jpeg,image/jpg,image/png",type:"file"},on:{change:function(n){t.onFileChange(e,0,n)}}})]),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.imageList[e.adviceId].length>0,expression:"imageList[item.adviceId].length>0"}],staticClass:"tc-upLoadItemBox docInt"},[t._l(t.imageList[e.adviceId],function(i,a){return n("li",{staticClass:"tc-upLoadItemList ev-imgList success"},[n("img",{attrs:{alt:"",src:i.blob},on:{click:function(e){t.showBigImg(i,a,1)}}}),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:0==i.uploading,expression:"img.uploading==false"}],staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"},on:{click:function(n){t.imgDelete(i,a,e.adviceId)}}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.uploading,expression:"img.uploading"}]},[n("span",{staticClass:"tc-upLoadCover"}),t._v(" "),n("span",{staticClass:"tc-upLoading"}),t._v(" "),n("span",{staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"}}),t._v(" "),n("span",{staticClass:"tc-upLoadAfreshText"},[t._v("等待上传")])]),t._v(" "),e.fail?n("figure",{staticClass:"upload-fail"},[n("p",[t._v("重新上传")]),t._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:t.imageList[e.adviceId].length>0&&i.finish,expression:"imageList[item.adviceId].length>0 && img.finish"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/gif,image/jpeg,image/jpg,image/png",type:"file"},on:{change:function(e){t.onFileChange(i,a,e)}}})]):t._e()])}),t._v(" "),t.imageList[e.adviceId].length>0&&!t.loading?n("li",{staticClass:"tc-upLoadAdd",staticStyle:{display:"list-item"}},[n("a",{attrs:{href:"javascript:;"}},[n("span",{staticClass:"tc-upLoadAddMore"},[n("input",{staticClass:"ev-upLoadInput",attrs:{accept:"image/gif,image/jpeg,image/jpg,image/png",type:"file"},on:{change:function(n){t.onFileChange(e,t.imageList[e.adviceId].length,n)}}})])])]):t._e()],2)])}),t._v(" "),n("footer",{staticClass:"tc-upLoadSubmit"},[t.submitFlag?n("button",{staticClass:"tc-submitBtn",on:{click:t.backToImPage}},[t._v("提交")]):t._e(),t._v(" "),t.submitFlag?t._e():n("button",{staticClass:"tc-submitDisabled"},[t._v("提交")])])],2),t._v(" "),n("transition",{attrs:{name:"fade"}},[t.errorShow?n("Toast",{attrs:{content:t.errorMsg}}):t._e()],1)],1)},staticRenderFns:[]}},11:function(t,e,n){t.exports=n.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},12:function(t,e){},13:function(t,e){},14:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{show:{type:Boolean}}}},15:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"middle-tip-box ev-loading"},[i("section",{staticClass:"middle-tip-modal"},[i("figure",{staticClass:"middle-tip-box-text"},[i("img",{attrs:{src:n(11),alt:"loading..."}})])])])}]}},16:function(t,e){},17:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},methods:{cancelClickEvent:function(){this.$emit("cancelClickEvent")},ensureClickEvent:function(){this.$emit("ensureClickEvent")}},mounted:function(){},props:{confirmParams:{type:Object}}}},18:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"maskers confirmBox-tips show"},[n("section",{staticClass:"confirmBox-inner"},[n("article",{staticClass:"confirmBox-content"},[n("article",[t.confirmParams.title?n("h2",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.confirmParams.title))]):t._e(),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:t.confirmParams.content,expression:"confirmParams.content"}]},[t._v(t._s(t.confirmParams.content))])])]),t._v(" "),n("footer",{staticClass:"confirmBox-btns"},[n("button",{staticClass:"confirmBox-cancelBtn",on:{click:t.cancelClickEvent}},[t._v(t._s(t.confirmParams.cancel))]),t._v(" "),n("button",{staticClass:"confirmBox-ensureBtn",on:{click:t.ensureClickEvent}},[t._v(t._s(t.confirmParams.ensure))])])])])},staticRenderFns:[]}},19:function(t,e){},20:function(t,e){},21:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},mounted:function(){console.log()},props:{content:{type:String},imgUrl:{type:String}}}},22:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"middle-tip-modal popup-tips show"},[t.imgUrl?n("figure",{staticClass:"middle-tips-box-img"},[n("img",{attrs:{src:t.imgUrl,alt:""}})]):t._e(),t._v(" "),n("figure",{staticClass:"middle-tip-box-text"},[n("p",{staticClass:"tipText"},[t._v(t._s(t.content))])])])},staticRenderFns:[]}},5:function(t,e,n){function i(t){n(13)}var a=n(0)(n(14),n(15),i,null,null);t.exports=a.exports},6:function(t,e,n){function i(t){n(16)}var a=n(0)(n(17),n(18),i,null,null);t.exports=a.exports},7:function(t,e,n){function i(t){n(20)}var a=n(0)(n(21),n(22),i,null,null);t.exports=a.exports},9:function(t,e){!function(t,e){function n(){var e=o.getBoundingClientRect().width;e/c>540&&(e=540*c);var n=e/10;o.style.fontSize=n+"px",u.rem=t.rem=n}var i,a=t.document,o=a.documentElement,s=a.querySelector('meta[name="viewport"]'),r=a.querySelector('meta[name="flexible"]'),c=0,l=0,u=e.flexible||(e.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var d=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(l=parseFloat(d[1]),c=parseInt(1/l))}else if(r){var p=r.getAttribute("content");if(p){var m=p.match(/initial\-dpr=([\d\.]+)/),f=p.match(/maximum\-dpr=([\d\.]+)/);m&&(c=parseFloat(m[1]),l=parseFloat((1/c).toFixed(2))),f&&(c=parseFloat(f[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var h=(t.navigator.appVersion.match(/android/gi),t.navigator.appVersion.match(/iphone/gi)),g=t.devicePixelRatio;c=h?g>=3&&(!c||c>=3)?3:g>=2&&(!c||c>=2)?2:1:1,l=1/c}if(o.setAttribute("data-dpr",c),!s)if(s=a.createElement("meta"),s.setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no"),o.firstElementChild)o.firstElementChild.appendChild(s);else{var v=a.createElement("div");v.appendChild(s),a.write(v.innerHTML)}t.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),t.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*c+"px":a.addEventListener("DOMContentLoaded",function(t){a.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=t.dpr=c,u.refreshRem=n,u.rem2px=function(t){var e=parseFloat(t)*this.rem;return"string"==typeof t&&t.match(/rem$/)&&(e+="px"),e},u.px2rem=function(t){var e=parseFloat(t)/this.rem;return"string"==typeof t&&t.match(/px$/)&&(e+="rem"),e}}(window,window.lib||(window.lib={}))},989:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=n.n(i),o=n(3),s=n.n(o),r=n(8),c=n(990),l=n.n(c),u=n(37),d=n(992),p=n.n(d),m=n(1e3),f=n.n(m),h=n(19),g=(n.n(h),n(12)),v=(n.n(g),n(31));n.n(v).a.attach(document.body),new(function(){function t(){a()(this,t),this.init()}return s()(t,[{key:"init",value:function(){r.a.use(u.a),this.routerStart(),this.router=new u.a({routes:this.routes});new r.a({router:this.router,render:function(t){return t(l.a)}}).$mount("#myConsult")}},{key:"routerStart",value:function(){this.routes=[{path:"/",redirect:"/consultHis"},{path:"/consultHis",name:"consultHis",component:p.a,meta:{keepAlive:!1}},{path:"/uploadPic",name:"uploadPic",component:f.a,meta:{keepAlive:!1}}]}}]),t}())},990:function(t,e,n){var i=n(0)(null,n(991),null,null,null);t.exports=i.exports},991:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100%",height:"100%"}},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view",{staticStyle:{"min-height":"100%"}}):t._e()],1),t._v(" "),t.$route.meta.keepAlive?t._e():n("router-view",{staticStyle:{"min-height":"100%"}})],1)},staticRenderFns:[]}},992:function(t,e,n){function i(t){n(993)}var a=n(0)(n(994),n(999),i,null,null);t.exports=a.exports},993:function(t,e){},994:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(9),a=(n.n(i),n(5)),o=n.n(a),s=n(7),r=n.n(s),c=n(1),l=n(995),u=n.n(l),d={getOrderHistoryLists:"/mcall/customer/case/consultation/v1/getMapList/",getPicList:"/mcall/patient/recovery/advice/v1/getMapList/"};e.default={data:function(){return{finish:!1,noFriend:!1,counter:1,num:10,pageStart:0,pageEnd:0,items:[],scrollData:{noFlag:!1}}},mounted:function(){c.a.mobileCheck(),c.a.checkOpenId()||c.a.wxGetOpenId(1),this.getOrderHistoryLists()},methods:{getOrderHistoryLists:function(){var t=this;c.a.ajax({url:d.getOrderHistoryLists,method:"post",data:{patientCustomerId:c.a.getPara().customerId,isValid:1,firstResult:0,maxResult:20,logoUseFlag:3},headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4,beforeSend:function(){t.finish=!0},done:function(e){console.log(e.responseObject.responseData.dataList),e&&e.responseObject.responseData.dataList&&e.responseObject.responseData.dataList.length>0?t.items=e.responseObject.responseData.dataList:t.noFriend=!0},fail:function(t){document.querySelector(".ev-loading").style.display="none",console.log("数据错误"),console.log(t)}})},getImgUrl:function(t){return 0==t.consultationType?t.logoUrl?t.logoUrl:"/image/img00/myServices/doctor_portrait.png":t.logoUrl?t.logoUrl:"/image/img00/doctorMain/doc_logo.png"},getStatusName:function(t){var e="",n="";if(0==t.consultationType)switch(Number(t.consultationState)){case 0:case 2:e="问诊中";break;case 1:e="已结束",n="font-gray"}else switch(Number(t.consultationState)){case-1:e="待接诊";break;case 0:e="问诊中";break;case 1:e="已结束",n="font-gray";break;case 2:e="已拒绝",n="font-gray";break;case 3:e="已超时",n="font-gray"}return{statusName:e,fontGray:n}},getInquiryType:function(t){var e="";if(1==t.consultationType)switch(Number(t.consultationLevel)){case 0:case 1:e="图文问诊";break;case 3:e="特需问诊"}return e},getCaseTime:function(t){var e=t.substring(0,19).replace(/-/g,"/"),n=function(t){return t>9?t:"0"+t},i=function(t){var e=new Date(t);return{y:e.getFullYear(),m:n(e.getMonth()+1),dd:n(e.getDate()),h:n(e.getHours()),mm:n(e.getMinutes())}},a="",o=(new Date).getTime();return i(e).y+"-"+i(e).m+"-"+i(e).dd==i(o).y+"-"+i(o).m+"-"+i(o).dd?a=i(e).h+":"+i(e).mm:i(e).y===i(o).y?a=i(e).m+"-"+i(e).dd+"  "+i(e).h+":"+i(e).mm:i(e).y!==i(o).y&&(a=i(e).y+"-"+i(e).m+"-"+i(e).dd+"  "+i(e).h+":"+i(e).mm),a},hrefToConsult:function(){window.location.href="/dist/consult.html?customerId="+c.a.getPara().customerId},hrefToSuggest:function(t){window.location.href="/dist/imScene.html?caseId="+t.caseId+"&shuntCustomerId="+t.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+t.patientId+"&from=health&suggest=1"},getThisItem:function(t){if(sessionStorage.setItem("orderSourceId",t.consultationId),1==t.consultationType){var e=t.logoUrl||"/image/img00/doctorMain/doc_logo.png";localStorage.setItem("doctorName",t.fullName),localStorage.setItem("doctorLogo",e),window.location.href="/dist/imSceneDoctor.html?caseId="+t.caseId+"&doctorCustomerId="+t.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+t.patientId}else window.location.href="/dist/imScene.html?caseId="+t.caseId+"&shuntCustomerId="+t.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+t.patientId+"&from=health"},goToUploadPic:function(t){var e=this;c.a.ajax({url:d.getPicList,method:"post",data:{caseId:t.caseId,customerId:t.customerId,isValid:1,firstResult:0,maxResult:999},headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4,done:function(n){if(console.log(n.responseObject.responseData.dataList),n&&n.responseObject.responseData.dataList.length>0){var i=n.responseObject.responseData.dataList[0],a=[];i.checkMap.length>0&&i.checkMap.forEach(function(t){a.push({adviceType:3,adviceId:t.checkId,adviceName:t.checkName})}),i.inspectionMap.length>0&&i.inspectionMap.forEach(function(t){a.push({adviceType:3,adviceId:t.inspectionId,adviceName:t.inspectionName})}),e.$router.push({name:"uploadPic",params:{hisPicLists:a,caseId:t.caseId,from:e.$route.name},query:e.$route.query})}},fail:function(t){console.log("数据错误"),console.log(t)}})},onRefresh:function(t){this.getOrderHistoryLists(),t()},onInfinite:function(t){console.log(2),this.counter++;var e=this.pageEnd=this.num*this.counter,n=this.pageStart=this.pageEnd-this.num,i=this.$el.querySelector(".load-more");for(n;n<e;n++){if(n>=30){i.style.display="none",this.scrollData.noFlag=!0;break}this.listdata.push({date:"2017-06-1"+n,portfolio:"1.5195"+n,drop:n+"+.00 %",state:2}),i.style.display="none"}t()}},components:{loading:o.a,toast:r.a,loadMore:u.a}}},995:function(t,e,n){function i(t){n(996)}var a=n(0)(n(997),n(998),i,null,null);t.exports=a.exports},996:function(t,e){},997:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{top:0,state:0,startY:0,loadMoreShow:!1,touching:!1,infiniteLoading:!1,downFlag:!1}},methods:{touchStart:function(t){this.startY=t.targetTouches[0].pageY,this.startScroll=this.$el.scrollTop||0,this.touching=!0},touchMove:function(t){if(this.touching){var e=t.targetTouches[0].pageY-this.startY-this.startScroll;e>0&&t.preventDefault(),this.top=e+(2===this.state?this.offset:0),this.top>200&&(this.top=200),2!==this.state&&(this.top>=this.offset?this.state=1:this.state=0)}},touchEnd:function(t){if(this.touching=!1,this.top>=this.offset?this.refresh():(this.state=0,this.top=0),this.enableInfinite&&!this.infiniteLoading){var e=this.$el.clientHeight,n=this.$el.querySelector(".scrollInner").clientHeight,i=this.$el.scrollTop,a=this.onRefresh?this.$el.querySelector(".pull-refresh").clientHeight:0,o=n-e-i-a;console.log(o+" __ "+this.offset),o<=this.offset&&0===this.state?(this.downFlag=!0,this.infinite()):(this.loadMoreShow=!1,this.downFlag=!1)}},refresh:function(){var t=this;this.state=2,this.top=this.offset,setTimeout(function(){t.onRefresh(t.refreshDone)},1e3)},refreshDone:function(){this.state=0,this.top=0},infinite:function(){var t=this;this.infiniteLoading=!0,setTimeout(function(){t.onInfinite(t.infiniteDone)},2e3)},infiniteDone:function(){this.infiniteLoading=!1}},props:{offset:{type:Number,default:100},enableInfinite:{type:Boolean,default:!0},onRefresh:{type:Function,default:void 0},onInfinite:{type:Function,default:void 0}}}},998:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"scrollBox",class:{down:0===t.state,up:1==t.state,refresh:2===t.state,touch:t.touching},on:{touchstart:function(e){t.touchStart(e)},touchmove:function(e){t.touchMove(e)},touchend:function(e){t.touchEnd(e)}}},[n("section",{staticClass:"scrollInner",style:{transform:"translateY("+t.top+"px)"}},[n("header",{staticClass:"pull-refresh"},[t._t("pull-refresh",[n("span",{staticClass:"down-tip"},[t._v("下拉更新")]),t._v(" "),n("span",{staticClass:"up-tip"},[t._v("松开刷新数据")]),t._v(" "),n("span",{staticClass:"refresh-tip"},[t._v("加载中……")])])],2),t._v(" "),t._t("default"),t._v(" "),n("footer",{directives:[{name:"show",rawName:"v-show",value:t.loadMoreShow,expression:"loadMoreShow"}],staticClass:"load-more"},[t._t("load-more",[n("span",{directives:[{name:"show",rawName:"v-show",value:!1===t.downFlag,expression:"downFlag === false"}]},[t._v("上拉加载更多")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!0===t.downFlag,expression:"downFlag === true"}]},[t._v("加载中……")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!0===t.downFlag,expression:"downFlag === true"}]},[t._v("加载完成")])])],2)],2)])},staticRenderFns:[]}},999:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"orderList"},[t.items.length<=0&&t.noFriend?[t._m(0),t._v(" "),n("section",{staticClass:"noFriendHref"},[n("a",{on:{click:function(e){t.hrefToConsult()}}},[t._v("去问诊>>")])])]:t._e(),t._v(" "),t._l(t.items,function(e){return[n("section",{staticClass:"orderHistoryItem",on:{click:function(n){t.getThisItem(e)}}},[n("article",{staticClass:"orderHisItemTop"},[n("figure",{staticClass:"doctorInfo left"},[n("figcaption",{staticClass:"docLogo left"},[n("img",{attrs:{src:t.getImgUrl(e)}})]),t._v(" "),n("section",{staticClass:"docType right"},[n("p",{staticClass:"docName"},[n("span",[t._v(t._s(0==e.consultationType?"唯医门诊医生":e.fullName))]),n("span",{staticClass:"medicalTitleRight"},[t._v(t._s(e.medicalTitle))])]),t._v(" "),n("p",{staticClass:"inquiryType"},[t._v(t._s(t.getInquiryType(e))+"  "+t._s(t.getCaseTime(e.createTime)))])])]),t._v(" "),n("div",{staticClass:"doctorState right",class:t.getStatusName(e).fontGray},[t._v(t._s(t.getStatusName(e).statusName))])]),t._v(" "),n("div",{staticClass:"orderHistoryItemCenter"},[n("p",[t._v("患者"),n("span",[t._v(t._s(e.patientName.length>5?e.patientName.substring(0,5)+"...":e.patientName))])]),t._v(" "),n("p",[t._v("主诉"),n("span",{staticClass:"patientComplaint"},[t._v(t._s(e.mainContent.caseMain))])])]),t._v(" "),0==e.consultationType&&0==e.consultationState&&3==e.state||0==e.consultationType&&(0==e.consultationState||1==e.consultationState)&&e.diagnosisId.length>1?n("div",{staticClass:"orderHistoryItemBottom"},[0==e.consultationState&&3==e.state?n("button",{staticClass:"hrefBtn",on:{click:function(n){n.stopPropagation(),t.goToUploadPic(e)}}},[t._v("补全检查资料")]):t._e(),t._v(" "),(0==e.consultationState||1==e.consultationState)&&e.diagnosisId.length>1?n("button",{staticClass:"hrefBtn",on:{click:function(n){n.stopPropagation(),t.hrefToSuggest(e)}}},[t._v("查看推荐专家")]):t._e()]):t._e()])]}),t._v(" "),n("loading",{directives:[{name:"show",rawName:"v-show",value:t.finish,expression:"finish"}]})],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"noFriendText"},[n("p",[t._v("您还没有任何记录")]),t._v(" "),n("p",[t._v("添加关心的人，在线问诊，唯医骨科为您开启全新的就医体验")])])}]}}},[989]);