webpackJsonp([8],{120:function(e,t,n){"use strict";function i(e,t){var n=new Image;n.src=e.imgSrc,n.onload=function(){var i=document.createElement("canvas"),o=i.getContext("2d"),s="",r=a(n,e);i.width=r.width,i.height=r.height,o.drawImage(n,0,0,r.width,r.height),s=i.toDataURL(e.quality),t&&t(s)}}function a(e,t){var n=e.width/e.height;return e.width>t.width?{width:t.width,height:t.width/n}:e.height>t.height?{width:t.height/n,height:t.height}:{width:e.width,height:e.height}}t.a=i},13:function(e,t){!function(e,t){function n(){var t=o.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;o.style.fontSize=n+"px",u.rem=e.rem=n}var i,a=e.document,o=a.documentElement,s=a.querySelector('meta[name="viewport"]'),r=a.querySelector('meta[name="flexible"]'),c=0,l=0,u=t.flexible||(t.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var d=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(l=parseFloat(d[1]),c=parseInt(1/l))}else if(r){var p=r.getAttribute("content");if(p){var m=p.match(/initial\-dpr=([\d\.]+)/),f=p.match(/maximum\-dpr=([\d\.]+)/);m&&(c=parseFloat(m[1]),l=parseFloat((1/c).toFixed(2))),f&&(c=parseFloat(f[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var h=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),g=e.devicePixelRatio;c=h?g>=3&&(!c||c>=3)?3:g>=2&&(!c||c>=2)?2:1:1,l=1/c}if(o.setAttribute("data-dpr",c),!s)if(s=a.createElement("meta"),s.setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no"),o.firstElementChild)o.firstElementChild.appendChild(s);else{var v=a.createElement("div");v.appendChild(s),a.write(v.innerHTML)}e.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*c+"px":a.addEventListener("DOMContentLoaded",function(e){a.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=e.dpr=c,u.refreshRem=n,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},135:function(e,t,n){"use strict";function i(){var e=a.a.getCookie("env"),t=window.location.host;return"m9.allinmed.cn"===t&&"online"===e?"8b9941431e042a5261dbcf5f0eefe450":"50c93d2ab7e207fd83231a245c07bfbc"}t.a=i;var a=n(4)},1363:function(e,t,n){n(38),e.exports=n(1364)},1364:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=n.n(i),o=n(2),s=n.n(o),r=n(16),c=n(1365),l=n.n(c),u=n(71),d=n(1367),p=n.n(d),m=n(1375),f=n.n(m),h=n(35),g=(n.n(h),n(21)),v=(n.n(g),n(66));n.n(v).a.attach(document.body),new(function(){function e(){a()(this,e),this.init()}return s()(e,[{key:"init",value:function(){r.a.use(u.a),this.routerStart(),this.router=new u.a({routes:this.routes});new r.a({router:this.router,render:function(e){return e(l.a)}}).$mount("#myConsult")}},{key:"routerStart",value:function(){this.routes=[{path:"/",redirect:"/consultHis"},{path:"/consultHis",name:"consultHis",component:p.a,meta:{keepAlive:!1}},{path:"/uploadPic",name:"uploadPic",component:f.a,meta:{keepAlive:!1}}]}}]),e}())},1365:function(e,t,n){var i=n(3)(null,n(1366),null,null,null);e.exports=i.exports},1366:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%",height:"100%"}},[n("keep-alive",[e.$route.meta.keepAlive?n("router-view",{staticStyle:{"min-height":"100%"}}):e._e()],1),e._v(" "),e.$route.meta.keepAlive?e._e():n("router-view",{staticStyle:{"min-height":"100%"}})],1)},staticRenderFns:[]}},1367:function(e,t,n){function i(e){n(1368)}var a=n(3)(n(1369),n(1374),i,null,null);e.exports=a.exports},1368:function(e,t){},1369:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),a=(n.n(i),n(9)),o=n.n(a),s=n(17),r=n.n(s),c=n(4),l=n(1370),u=n.n(l),d=(n(24),n(10)),p=(n.n(d),{getOrderHistoryLists:"/mcall/customer/case/consultation/v1/getMapList/",getPicList:"/mcall/patient/recovery/advice/v1/getMapList/"});t.default={data:function(){return{finish:!1,noFriend:!1,counter:1,num:10,pageStart:0,pageEnd:0,items:[],scrollData:{noFlag:!1}}},mounted:function(){c.a.mobileCheck(),c.a.checkOpenId()||c.a.wxGetOpenId(1),c.a.forbidShare(),this.getOrderHistoryLists()},methods:{getOrderHistoryLists:function(){var e=this;c.a.ajax({url:p.getOrderHistoryLists,method:"post",data:{patientCustomerId:c.a.getPara().customerId,isValid:1,firstResult:0,maxResult:20,logoUseFlag:3},headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4,beforeSend:function(){e.finish=!0},done:function(t){console.log(t.responseObject.responseData.dataList),t&&t.responseObject.responseData.dataList&&t.responseObject.responseData.dataList.length>0?e.items=t.responseObject.responseData.dataList:e.noFriend=!0},fail:function(e){document.querySelector(".ev-loading").style.display="none",console.log("数据错误"),console.log(e)}})},getImgUrl:function(e){return 0==e.consultationType?e.logoUrl?e.logoUrl:"/image/img00/myServices/doctor_portrait.png":e.logoUrl?e.logoUrl:"/image/img00/doctorMain/doc_logo.png"},getFullName:function(e){return e.fullName.length>6?e.fullName.substring(0,6)+"...":e.fullName},getStatusName:function(e){var t="",n="";if(0==e.consultationType)switch(Number(e.consultationState)){case 0:case 2:case 4:case 5:t="问诊中";break;case 1:t="已结束",n="font-gray"}else switch(Number(e.consultationState)){case-1:t="待接诊";break;case 0:t="问诊中";break;case 1:t="已结束",n="font-gray";break;case 2:t="已拒绝",n="font-gray";break;case 3:t="已超时",n="font-gray"}return{statusName:t,fontGray:n}},getInquiryType:function(e){var t="";if(1==e.consultationType)switch(Number(e.consultationLevel)){case 0:case 1:t="图文问诊";break;case 3:t="特需问诊"}return t},getCaseTime:function(e){var t=e.substring(0,19).replace(/-/g,"/"),n=function(e){return e>9?e:"0"+e},i=function(e){var t=new Date(e);return{y:t.getFullYear(),m:n(t.getMonth()+1),dd:n(t.getDate()),h:n(t.getHours()),mm:n(t.getMinutes())}},a="",o=(new Date).getTime();return i(t).y+"-"+i(t).m+"-"+i(t).dd==i(o).y+"-"+i(o).m+"-"+i(o).dd?a=i(t).h+":"+i(t).mm:i(t).y===i(o).y?a=i(t).m+"-"+i(t).dd+"  "+i(t).h+":"+i(t).mm:i(t).y!==i(o).y&&(a=i(t).y+"-"+i(t).m+"-"+i(t).dd+"  "+i(t).h+":"+i(t).mm),a},hrefToConsult:function(){window.location.href="/dist/consult.html?customerId="+c.a.getPara().customerId},hrefToSuggest:function(e){window.location.href="/dist/imScene.html?caseId="+e.caseId+"&shuntCustomerId="+e.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+e.patientId+"&from=health&suggest=1"},getThisItem:function(e){if(sessionStorage.setItem("orderSourceId",e.consultationId),1==e.consultationType){var t=e.logoUrl||"/image/img00/doctorMain/doc_logo.png";localStorage.setItem("doctorName",e.fullName),localStorage.setItem("doctorLogo",t),10==e.caseType||11==e.caseType?window.location.href="/dist/imSceneDoctor.html?caseId="+e.caseId+"&doctorCustomerId="+e.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+e.patientId+"&from=report":window.location.href="/dist/imSceneDoctor.html?caseId="+e.caseId+"&doctorCustomerId="+e.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+e.patientId}else window.location.href="/dist/imScene.html?caseId="+e.caseId+"&shuntCustomerId="+e.customerId+"&patientCustomerId="+c.a.getPara().customerId+"&patientId="+e.patientId+"&from=health"},goToUploadPic:function(e){var t=this;c.a.ajax({url:p.getPicList,method:"post",data:{caseId:e.caseId,patientId:e.patientId,isValid:1,firstResult:0,maxResult:999},headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:3e4,done:function(n){if(console.log(n.responseObject.responseData.dataList),n&&n.responseObject.responseData.dataList.length>0){var i=n.responseObject.responseData.dataList[0],a=[];i.checkMap.length>0&&i.checkMap.forEach(function(e){a.push({adviceType:3,adviceId:e.checkId,adviceName:e.checkName})}),i.inspectionMap.length>0&&i.inspectionMap.forEach(function(e){a.push({adviceType:3,adviceId:e.inspectionId,adviceName:e.inspectionName})}),console.log(),t.$router.push({name:"uploadPic",params:{hisPicLists:a,caseId:e.caseId,consultationId:e.consultationId,from:t.$route.name},query:t.$route.query})}},fail:function(e){console.log("数据错误"),console.log(e)}})},onRefresh:function(e){this.getOrderHistoryLists(),e()},onInfinite:function(e){console.log(2),this.counter++;var t=this.pageEnd=this.num*this.counter,n=this.pageStart=this.pageEnd-this.num,i=this.$el.querySelector(".load-more");for(n;n<t;n++){if(n>=30){i.style.display="none",this.scrollData.noFlag=!0;break}this.listdata.push({date:"2017-06-1"+n,portfolio:"1.5195"+n,drop:n+"+.00 %",state:2}),i.style.display="none"}e()}},components:{loading:o.a,toast:r.a,loadMore:u.a}}},1370:function(e,t,n){function i(e){n(1371)}var a=n(3)(n(1372),n(1373),i,null,null);e.exports=a.exports},1371:function(e,t){},1372:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{top:0,state:0,startY:0,loadMoreShow:!1,touching:!1,infiniteLoading:!1,downFlag:!1}},methods:{touchStart:function(e){this.startY=e.targetTouches[0].pageY,this.startScroll=this.$el.scrollTop||0,this.touching=!0},touchMove:function(e){if(this.touching){var t=e.targetTouches[0].pageY-this.startY-this.startScroll;t>0&&e.preventDefault(),this.top=t+(2===this.state?this.offset:0),this.top>200&&(this.top=200),2!==this.state&&(this.top>=this.offset?this.state=1:this.state=0)}},touchEnd:function(e){if(this.touching=!1,this.top>=this.offset?this.refresh():(this.state=0,this.top=0),this.enableInfinite&&!this.infiniteLoading){var t=this.$el.clientHeight,n=this.$el.querySelector(".scrollInner").clientHeight,i=this.$el.scrollTop,a=this.onRefresh?this.$el.querySelector(".pull-refresh").clientHeight:0,o=n-t-i-a;console.log(o+" __ "+this.offset),o<=this.offset&&0===this.state?(this.downFlag=!0,this.infinite()):(this.loadMoreShow=!1,this.downFlag=!1)}},refresh:function(){var e=this;this.state=2,this.top=this.offset,setTimeout(function(){e.onRefresh(e.refreshDone)},1e3)},refreshDone:function(){this.state=0,this.top=0},infinite:function(){var e=this;this.infiniteLoading=!0,setTimeout(function(){e.onInfinite(e.infiniteDone)},2e3)},infiniteDone:function(){this.infiniteLoading=!1}},props:{offset:{type:Number,default:100},enableInfinite:{type:Boolean,default:!0},onRefresh:{type:Function,default:void 0},onInfinite:{type:Function,default:void 0}}}},1373:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"scrollBox",class:{down:0===e.state,up:1==e.state,refresh:2===e.state,touch:e.touching},on:{touchstart:function(t){e.touchStart(t)},touchmove:function(t){e.touchMove(t)},touchend:function(t){e.touchEnd(t)}}},[n("section",{staticClass:"scrollInner",style:{transform:"translateY("+e.top+"px)"}},[n("header",{staticClass:"pull-refresh"},[e._t("pull-refresh",[n("span",{staticClass:"down-tip"},[e._v("下拉更新")]),e._v(" "),n("span",{staticClass:"up-tip"},[e._v("松开刷新数据")]),e._v(" "),n("span",{staticClass:"refresh-tip"},[e._v("加载中……")])])],2),e._v(" "),e._t("default"),e._v(" "),n("footer",{directives:[{name:"show",rawName:"v-show",value:e.loadMoreShow,expression:"loadMoreShow"}],staticClass:"load-more"},[e._t("load-more",[n("span",{directives:[{name:"show",rawName:"v-show",value:!1===e.downFlag,expression:"downFlag === false"}]},[e._v("上拉加载更多")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!0===e.downFlag,expression:"downFlag === true"}]},[e._v("加载中……")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!0===e.downFlag,expression:"downFlag === true"}]},[e._v("加载完成")])])],2)],2)])},staticRenderFns:[]}},1374:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"orderList"},[e.items.length<=0&&e.noFriend?[e._m(0,!1,!1),e._v(" "),n("section",{staticClass:"noFriendHref"},[n("a",{on:{click:function(t){e.hrefToConsult()}}},[e._v("去问诊>>")])])]:e._e(),e._v(" "),n("div",{attrs:{"data-alcode-mod":"722","data-alcode-item-selector":".orderHistoryItem"}},e._l(e.items,function(t){return t.patientId&&t.patientId.length>0?n("section",{staticClass:"orderHistoryItem",on:{click:function(n){e.getThisItem(t)}}},[n("article",{staticClass:"orderHisItemTop"},[n("figure",{staticClass:"doctorInfo left"},[n("figcaption",{staticClass:"docLogo left"},[n("img",{attrs:{src:e.getImgUrl(t)}})]),e._v(" "),n("section",{staticClass:"docType right"},[n("p",{staticClass:"docName"},[n("span",[e._v(e._s(0==t.consultationType?"唯医门诊医生":e.getFullName(t)))]),n("span",{staticClass:"medicalTitleRight"},[e._v(e._s(t.medicalTitle))])]),e._v(" "),n("p",{staticClass:"inquiryType"},[e._v(e._s(e.getInquiryType(t))+"  "+e._s(e.getCaseTime(t.createTime)))])])]),e._v(" "),n("div",{staticClass:"doctorState right",class:e.getStatusName(t).fontGray},[e._v(e._s(e.getStatusName(t).statusName))])]),e._v(" "),n("div",{staticClass:"orderHistoryItemCenter"},[n("p",[e._v("\n          患者"),n("span",[e._v(e._s(t.patientName&&t.patientName.length>5?t.patientName.substring(0,5)+"...":t.patientName))])]),e._v(" "),n("p",[e._v("主诉"),n("span",{staticClass:"patientComplaint"},[e._v(e._s(t.mainContent.caseMain))])])]),e._v(" "),0==t.consultationType&&0==t.consultationState&&3==t.state||0==t.consultationType&&(0==t.consultationState||1==t.consultationState)&&1==t.isRecommend?n("div",{staticClass:"orderHistoryItemBottom"},[0==t.consultationState&&3==t.state?n("button",{staticClass:"hrefBtn",attrs:{"data-alcode":"e136"},on:{click:function(n){n.stopPropagation(),e.goToUploadPic(t)}}},[e._v("补全检查资料\n        ")]):e._e(),e._v(" "),0!=t.consultationState&&1!=t.consultationState||1!=t.isRecommend?e._e():n("button",{staticClass:"hrefBtn",attrs:{"data-alcode":"e137"},on:{click:function(n){n.stopPropagation(),e.hrefToSuggest(t)}}},[e._v("查看推荐专家\n        ")])]):e._e()]):e._e()})),e._v(" "),n("loading",{directives:[{name:"show",rawName:"v-show",value:e.finish,expression:"finish"}]})],2)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"noFriendText"},[n("p",[e._v("您还没有任何记录")]),e._v(" "),n("p",[e._v("添加关心的人，在线问诊，唯医骨科为您开启全新的就医体验")])])}]}},1375:function(e,t,n){function i(e){n(1376)}var a=n(3)(n(1377),n(1378),i,null,null);e.exports=a.exports},1376:function(e,t){},1377:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),a=n.n(i),o=n(22),s=(n.n(o),n(4)),r=n(15),c=(n.n(r),n(9)),l=n.n(c),u=n(17),d=n.n(u),p=n(135),m=n(120),f={getToken:"/mcall/im/interact/v1/refreshToken/",imgCreate:"/mcall/customer/patient/case/attachment/v1/create/",imgDelete:"/mcall/customer/patient/case/attachment/v1/update/",updateCount:"/mcall/customer/case/consultation/v1/updateFrequency/",updateConsultState:"/mcall/customer/patient/case/v1/update/"};t.default={data:function(){return{uploadList:[],imageList:{},filesObj:{},base64Arr:[],uploadIndex:"",errorShow:!1,errorMsg:"",loading:!1,userData:{account:"",token:""}}},computed:{submitFlag:function(){var e=!1;for(var t in this.imageList)if(0!==this.imageList[t].length){e=!0;break}return e}},mounted:function(){this.getUploadList(),s.a.forbidShare()},methods:{getUploadList:function(){var e=this;this.$route.params.hisPicLists&&(this.uploadList=this.$route.params.hisPicLists,this.uploadList.forEach(function(t){e.$set(e.imageList,t.adviceId,[])}))},imgDelete:function(e,t,n){var i=this;s.a.ajax({url:f.imgDelete,method:"POST",data:{id:e.imgId,isValid:0},beforeSend:function(){},done:function(){i.imageList[n].splice(t,1)}})},upLoadPic:function(e,t,n,i){var a=this;void 0!==n?a.imageList[t.adviceId][n]={blob:i,imgId:"",uploading:!0,fail:!1}:a.imageList[t.adviceId].push({blob:i,imgId:"",uploading:!0,fail:!1}),s.a.ajax({url:f.imgCreate,method:"POST",data:{fileContent:i.split(",")[1].replace(/\+/g,"%2B").replace(/\n/g,""),fileName:e.name,extName:e.name.split(".")[1],caseId:a.$route.params.caseId,imageType:t.adviceType,caseCategoryId:""},timeout:3e5,done:function(e){if(e.responseObject.responseStatus){var i=n||a.imageList[t.adviceId].length-1;a.$set(a.imageList[t.adviceId],i,{blob:e.responseObject.responseMessage.logoUrl,imgId:e.responseObject.responsePk,uploading:!1,fail:!1}),a.uploadIndex=parseInt(a.uploadIndex)+1;var o=a.imageList[t.adviceId].length;"undefined"!==a.filesObj[a.uploadIndex]&&a.uploadIndex<a.filesObj.length&&o<9?a.upLoadPic(a.filesObj[a.uploadIndex],t,n,a.base64Arr[a.uploadIndex]):a.loading=!1}else{var s=n||a.imageList[t.adviceId].length-1;a.imageList[t.adviceId][s].uploading=!1,a.imageList[t.adviceId][s].fail=!0,a.imageList[t.adviceId][s].finish=!0,a.loading=!1}},fail:function(e){var i=n||a.imageList[t.adviceId].length-1;a.imageList[t.adviceId][i].uploading=!1,a.imageList[t.adviceId][i].fail=!0,a.imageList[t.adviceId][i].finish=!0,a.loading=!1}})},onFileChange:function(e,t,n){var i=this,a=e.target.files||e.dataTransfer.files,o=this;if(o.filesObj=a,o.base64Arr=[],o.uploadIndex=0,a.length){this.loading=!0;for(var s=0;s<a.length;s++)!function(e){if(a[e].size>10485760)i.errorShow=!0,i.errorMsg="图片不能超过10M",setTimeout(function(){i.errorMsg="",i.errorShow=!1},3e3);else{var s=new FileReader;s.readAsDataURL(a[e]),s.onload=function(s){Object(m.a)({imgSrc:s.target.result,quality:.8,width:1920,height:1080},function(s){o.base64Arr.push(s),e==a.length-1&&i.upLoadPic(a[o.uploadIndex],t,n,o.base64Arr[o.uploadIndex])})}}}(s)}},backToImPage:function(){var e=this,t=this;if(t.loading)return this.errorShow=!0,this.errorMsg="图片上传中...",void setTimeout(function(){e.errorMsg="",e.errorShow=!1},1e3);s.a.ajax({url:f.updateConsultState,method:"POST",data:{caseId:t.$route.params.caseId,state:"0"},done:function(e){e.responseObject.responseStatus?(t.getUserBaseData(t.$route.params.caseId,t.$route.params.consultationId),t.$router.push({path:"/consultHis"})):console.log("更新状态失败")}})},getUserBaseData:function(e,t){var n=this;s.a.ajax({url:f.getToken,method:"POST",data:{accid:"0_"+e},done:function(i){i.responseObject.responseStatus&&(n.userData={account:"0_"+e,token:i.responseObject.responseData.token},n.connectToNim(t))}})},connectToNim:function(e){var t=this;this.nim=NIM.getInstance({appKey:Object(p.a)(),account:t.userData.account,token:t.userData.token,onconnect:function(n){console.log("连接成功"),t.nimSendSuccess(e)},onwillreconnect:function(e){console.log("已重连"+e.retryCount+"次，"+e.duration+"后将重连...")},ondisconnect:function(){console.log("链接已中断...")}})},nimSendSuccess:function(e){var t=this;t.nim.sendCustomMsg({scene:"p2p",to:"1_doctor00001",custom:a()({cType:"0",cId:e,mType:"0"}),content:a()({type:"checkSuggestSendTips",data:{actionType:"checkSuggest"}}),type:"custom",done:function(n,i){console.log("该患者已上传检查资料"),t.refreashOrderTime(e)}})},refreashOrderTime:function(e){s.a.ajax({url:f.updateCount,method:"POST",data:{consultationId:e,frequency:"0",frequencyType:"2",consultationLevel:"1",consultationState:""},done:function(e){e.responseObject.responseData&&console.log("更新时间成功")}})}},components:{Toast:d.a,Loading:l.a}}},1378:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"upload-wrapper"},[n("section",{staticClass:"main-inner tc-upLoadFile ev-delete"},[e._l(e.uploadList,function(t,i){return n("section",{staticClass:"tc-upLoadBox"},[n("figure",{staticClass:"tc-upLoadTitle ev-upLoadList"},[n("span",{staticClass:"tc-upLoadTitleName",attrs:{"data-treatmentid":t.adviceId,"data-advicetype":t.adviceType}},[e._v(e._s(t.adviceName))]),e._v(" "),n("span",{staticClass:"tc-upLoadRightIcon"}),e._v(" "),n("span",{staticClass:"tc-upLoadRightCover"}),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:0===e.imageList[t.adviceId].length&&!e.loading,expression:"imageList[item.adviceId].length===0&&!loading"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file",multiple:""},on:{change:function(n){e.onFileChange(n,t)}}})]),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.imageList[t.adviceId].length>0,expression:"imageList[item.adviceId].length>0"}],staticClass:"tc-upLoadItemBox docInt"},[e._l(e.imageList[t.adviceId],function(i,a){return n("li",{staticClass:"tc-upLoadItemList ev-imgList success"},[n("img",{attrs:{alt:"",src:i.blob},on:{click:function(t){e.showBigImg(i,a,1)}}}),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:0==i.uploading,expression:"img.uploading==false"}],staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"},on:{click:function(n){e.imgDelete(i,a,t.adviceId)}}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:i.uploading,expression:"img.uploading"}]},[n("span",{staticClass:"tc-upLoadCover"}),e._v(" "),n("span",{staticClass:"tc-upLoading"}),e._v(" "),n("span",{staticClass:"tc-upLoadDel",staticStyle:{cursor:"pointer"}}),e._v(" "),n("span",{staticClass:"tc-upLoadAfreshText"},[e._v("等待上传")])]),e._v(" "),i.fail?n("figure",{staticClass:"upload-fail"},[n("p",[e._v("重新上传")]),e._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:e.imageList[t.adviceId].length>0&&i.finish,expression:"imageList[item.adviceId].length>0 && img.finish"}],staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file",multiple:""},on:{change:function(n){e.onFileChange(n,t,a)}}})]):e._e()])}),e._v(" "),e.imageList[t.adviceId].length>0&&!e.loading?n("li",{staticClass:"tc-upLoadAdd",staticStyle:{display:"list-item"}},[n("a",{attrs:{href:"javascript:;"}},[n("span",{staticClass:"tc-upLoadAddMore"},[n("input",{staticClass:"ev-upLoadInput",attrs:{accept:"image/*",type:"file",multiple:""},on:{change:function(n){e.onFileChange(n,t)}}})])])]):e._e()],2)])}),e._v(" "),n("footer",{staticClass:"tc-upLoadSubmit"},[e.submitFlag?n("button",{staticClass:"tc-submitBtn",on:{click:e.backToImPage}},[e._v("提交")]):e._e(),e._v(" "),e.submitFlag?e._e():n("button",{staticClass:"tc-submitDisabled"},[e._v("提交")])])],2),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.errorShow?n("Toast",{attrs:{content:e.errorMsg}}):e._e()],1)],1)},staticRenderFns:[]}},15:function(e,t,n){function i(e){n(32)}var a=n(3)(n(33),n(34),i,null,null);e.exports=a.exports},17:function(e,t,n){function i(e){n(44)}var a=n(3)(n(45),n(46),i,null,null);e.exports=a.exports},21:function(e,t){},24:function(e,t,n){"use strict";var i=n(1),a=n.n(i),o=n(2),s=n.n(o),r=n(10),c=(n.n(r),function(){function e(){a()(this,e)}return s()(e,[{key:"weChatJudge",value:function(e,t){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?e(n):t(n)}}]),e}());t.a=new c},25:function(e,t,n){e.exports=n.p+"static/img/symptom_photo_loading@2x.9d469f9.png"},29:function(e,t){},30:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{show:{type:Boolean}}}},31:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0,!1,!1)},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"middle-tip-box ev-loading"},[i("section",{staticClass:"middle-tip-modal"},[i("figure",{staticClass:"middle-tip-box-text"},[i("img",{attrs:{src:n(25),alt:"loading..."}})])])])}]}},32:function(e,t){},33:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},methods:{cancelClickEvent:function(){this.$emit("cancelClickEvent")},ensureClickEvent:function(){this.$emit("ensureClickEvent")}},mounted:function(){},props:{confirmParams:{type:Object}}}},34:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"maskers confirmBox-tips show"},[n("section",{staticClass:"confirmBox-inner"},[n("article",{staticClass:"confirmBox-content"},[n("article",[e.confirmParams.title?n("h2",{staticStyle:{"font-weight":"bold"}},[e._v(e._s(e.confirmParams.title))]):e._e(),e._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:e.confirmParams.content,expression:"confirmParams.content"}]},[e._v(e._s(e.confirmParams.content))])])]),e._v(" "),n("footer",{staticClass:"confirmBox-btns"},[n("button",{staticClass:"confirmBox-cancelBtn",on:{click:e.cancelClickEvent}},[e._v(e._s(e.confirmParams.cancel))]),e._v(" "),n("button",{staticClass:"confirmBox-ensureBtn",on:{click:e.ensureClickEvent}},[e._v(e._s(e.confirmParams.ensure))])])])])},staticRenderFns:[]}},35:function(e,t){},4:function(e,t,n){"use strict";function i(e){g.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),g()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+f()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")},function(t){e.fail&&e.fail(t)})}function a(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==v.a.getPara().patientCustomerId?e.customerId=0===v.a.getPara().patientCustomerId.length?0:v.a.getPara().patientCustomerId:void 0!==v.a.getPara().customerId?e.customerId=0===v.a.getPara().customerId.length?0:v.a.getPara().customerId:e.customerId=0,parseInt(e.customerId)>0)return!0;i({url:"/mcall/patient/customer/unite/v1/getById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",f()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList.patientCustomerUnite.mobile;if(n&&n.length>0)return!0;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}var o=n(47),s=n.n(o),r=n(48),c=n.n(r),l=n(1),u=n.n(l),d=n(2),p=n.n(d),m=n(6),f=n.n(m),h=n(22),g=n.n(h),v=n(5),w=function(){function e(){u()(this,e)}return p()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,i=encodeURIComponent(n),a="";if(window.location.origin.includes("localhost"))return!1;a=window.location.hostname.includes("m9")?2:1,1==a?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==a&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var o="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+i+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(v.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+localStorage.getItem("currentUrl")+"&response_type=code&scope=snsapi_base&state=pay&code="+v.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var s=sessionStorage.getItem("count");s||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?window.location.href=localStorage.getItem("currentUrl")+"&openId="+v.a.getPara().openId:window.location.href=localStorage.getItem("currentUrl")+"?openId="+v.a.getPara().openId,localStorage.setItem("openId",v.a.getPara().openId))}else localStorage.setItem("currentUrl",n),window.location.href=o}}]),e}(),I=new w,y=function(){function e(){u()(this,e)}return p()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),i({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),_=(new y,n(10),function(){function e(){u()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e}}return p()(e,[{key:"forbidShare",value:function(){}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){i(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,a=void 0;if(t.lastIndexOf(e||"?")>0){i=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var o=i.split("&"),s=0;s<o.length;s++)a=o[s].split("="),n[a[0]]=decodeURIComponent(a[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new s.a(e)))}},{key:"isWXBrowse",value:function(){return I.isWXBrowse()}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",i=0,a=0;a<e.length&&(e.charCodeAt(a)>128?i+=2:i++,i<=t);a++)n=n.concat(e[a]);return i>t&&(n+=""),n}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),i=navigator.userAgent;return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?i.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?i.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?1:0}},{key:"checkOpenId",value:function(){return I.checkOpenId()}},{key:"wxGetOpenId",value:function(){I.wxGetOpenId()}},{key:"mobileCheck",value:function(){a()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),i=new Date(n).getDay(),a="",o="",s=t[i],r=e.time.substring(11,16);switch(parseInt(e.type)){case 1:a=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",o=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:a=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),o=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:a,years:o,week:s,hour:r}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}()),b=new _;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=b},44:function(e,t){},45:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},mounted:function(){console.log()},props:{content:{type:String},imgUrl:{type:String}}}},46:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"middle-tip-modal popup-tips show"},[e.imgUrl?n("figure",{staticClass:"middle-tips-box-img"},[n("img",{attrs:{src:e.imgUrl,alt:""}})]):e._e(),e._v(" "),n("figure",{staticClass:"middle-tip-box-text"},[n("p",{staticClass:"tipText"},[e._v(e._s(e.content))])])])},staticRenderFns:[]}},5:function(e,t,n){"use strict";var i=n(1),a=n.n(i),o=n(2),s=n.n(o),r=function(){function e(){a()(this,e)}return s()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},i=void 0,a=void 0;if(t.lastIndexOf(e||"?")>0){i=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var o=i.split("&"),s=0;s<o.length;s++)a=o[s].split("="),n[a[0]]=decodeURIComponent(a[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new r},9:function(e,t,n){function i(e){n(29)}var a=n(3)(n(30),n(31),i,null,null);e.exports=a.exports}},[1363]);