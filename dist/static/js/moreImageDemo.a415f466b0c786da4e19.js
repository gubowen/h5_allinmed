webpackJsonp([13],{12:function(e,t){!function(e,t){function n(){var t=a.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;a.style.fontSize=n+"px",u.rem=e.rem=n}var o,i=e.document,a=i.documentElement,r=i.querySelector('meta[name="viewport"]'),s=i.querySelector('meta[name="flexible"]'),c=0,l=0,u=t.flexible||(t.flexible={});if(r){console.warn("将根据已有的meta标签来设置缩放比例");var d=r.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(l=parseFloat(d[1]),c=parseInt(1/l))}else if(s){var m=s.getAttribute("content");if(m){var g=m.match(/initial\-dpr=([\d\.]+)/),p=m.match(/maximum\-dpr=([\d\.]+)/);g&&(c=parseFloat(g[1]),l=parseFloat((1/c).toFixed(2))),p&&(c=parseFloat(p[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var f=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=f?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,l=1/c}if(a.setAttribute("data-dpr",c),!r)if(r=i.createElement("meta"),r.setAttribute("name","viewport"),r.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no"),a.firstElementChild)a.firstElementChild.appendChild(r);else{var I=i.createElement("div");I.appendChild(r),i.write(I.innerHTML)}e.addEventListener("resize",function(){clearTimeout(o),o=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(o),o=setTimeout(n,300))},!1),"complete"===i.readyState?i.body.style.fontSize=12*c+"px":i.addEventListener("DOMContentLoaded",function(e){i.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=e.dpr=c,u.refreshRem=n,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},1239:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABP9JREFUWAm9mGtoHFUUx7PZJLtx4zakEkXFR2hKcNVASEIeqFVMEaVgVPxQUGtFUFAEPwiC+CH5ItVaELGiIqIgNmoUUYRSBK15wYaQ+sKqDYK6EkWwmsTFPPydtWc4c2dm2zi7Dtw95/zvuef858yde+9soqbK1+Tk5AFS7N3Y2JhJpVK7u7u7f91MysRmnDfrC7leIWbGTbW2tl7b3t5eNFhZtbZsb/zOFSdE/+Li4vMOVtasKsGBgYHPyP6Sw2DP1NTUww4WaVaVoGTlkT6A+NQyWF9f38fjv8FiUXpV56Amzefz5xSLRZmLbYolEokf0LdTZXcaqEtJVryCvBSBm5Y3N5lM7oLUSc2O34XoD6kdJQPBohwrgcvc4/Hu11gQ/h29jSr+ppgrY1VQqkXSe5lPB2dmZq5yg7t2Npt9FlILijN+C/pjaofJWBWcmJi4m6AvS2AS/40Yohofix11cUO3U8VDpr/Y2NjY1tXV9ZPBPDVWBSF1hUaiGvXo41Rzm2Jhsr+/f4xxdvFOrays3BHmK1gsgrW1ta8Q4y8JJBckWxBvI5MlIPrnBaerOgT7+vqOQXIPFdnQhJC7cnp6eq/aYbKhoeE98DXTl4uqfKwKSgIe2SFIPWmSSSVH5ufnMxazuiw73NRRi6Ff59glMzZBidLc3DxKwp81AQTPW1paulXtMInPOw6+w7FLZkUI5nK5P4n2hJNg2LF9Jjd02AfU1Fzu2CWzIgQlUjqdftPORaCdzKvGUpaQH6bGt/jL0lS6qGg7LcAnAIg3kzzLGvcM7XPaYdrV/4aJ/j21juXVg2Rn8QK1q+1KyK3ic8Lg6dnZ2XONXVJDCa6trb1F74O0HG2IYEfYKTpLI8r8kPC47ca+wNohum+Lwz/r+gQIUq2LcRqyjgysh/RdFovQf7Q44863doj+h8XYYc62tugBgqxRoYssVQzFbUAeqbceCs6YQHzrT7/Pf3V1NbD1BgL09PScYOCEDYQui+rrDhYw3YpRkdD91Qz0VYy8voqKX4CggLyRwzi/hioJ8ug389bZ/VPcAhcEffsw405HULZG7yKvd15UMFBS7disZO62QqgASb3pYlNT09bOzs6lsFj4JVmGpC91qr/ISShDDLsFhlcwLODpMObfLYaczL8jUeQkFqtCG0LJCSTroo+cgHq3ov/na2FhIc18e9QGINm71nZ1buZ6i+H/hbVVrwjBQqHwCAEv0qBIOQyMGTugckPuVvhJwAkgNkHm3k1U43En+ChHscCEV5+5ublmbmCH2iKxP7K26rEIMo+2E+gNml0jj/MfzEFNECaXl5d3cVP12ge5b1glvlLbylgEeUzy2dikAUl0ks/LYc573iFA+6zE7x5ro8uSFnrFJVjQqCRdpyq7ebRfKhYm+WiS6l1j+uTQ8KqxfWosgpDaTztA+5A2PDg4+IEvumNApI62z4FfZNz3DuaZFVuovYhlFKp3P9PiOXXhppbq6uq29fb2eqdx7VMZq4Ia5EwkL9SlVG/U8X26HDnx/V8I8ufRFo5r70NwqyH4S0tLi+9jy/R5atUJQirJP1tjyMs0K492g63xvo6OjsDpRX1UVp0g8+4pku3UhCIhO8K6N26xKL2qLwnkLoHMdzSvEFRvHHK3SRWjSFncG2jBSum8oSmH3LFMJnPnmZITHlUlyOn8a8iM0OR/wKO0G8sdwYSQe/0DdCW7Zws0ZEsAAAAASUVORK5CYII="},1432:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n.n(o),a=n(1),r=n.n(a),s=n(17),c=n(1433),l=n.n(c),u=n(53),d=n(1435),m=n.n(d),g=n(1436),p=n.n(g),f=n(83),h=n.n(f),I=n(21);n.n(I);new(function(){function e(){i()(this,e),this.init()}return r()(e,[{key:"init",value:function(){s.a.use(u.a),s.a.use(m.a,{preLoad:1,error:n(1440),loading:n(1239),attempt:3,listenEvents:["scroll"]});new s.a({router:new u.a({routes:[{path:"/",redirect:"/moreImage"},{path:"/moreImage",name:"moreImage",component:p.a},{path:"/followWX",name:"followWX",component:h.a}]}),render:function(e){return e(l.a)}}).$mount("#moreImage")}}]),e}())},1433:function(e,t,n){var o=n(2)(null,n(1434),null,null,null);e.exports=o.exports},1434:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"100%",height:"100%"}},[n("router-view")],1)},staticRenderFns:[]}},1436:function(e,t,n){function o(e){n(1437)}var i=n(2)(n(1438),n(1439),o,null,null);e.exports=i.exports},1437:function(e,t){},1438:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=n(12);n.n(i);t.default={data:function(){return{localIdList:[],serverIdList:[],lazyImageList:[n(98),n(98),n(98),n(98),n(98),n(98),n(98),n(98)]}},mounted:function(){o.a.forbidShare()},methods:{chooseImages:function(){var e=this;e.$router.push({name:"followWX",query:e.$route.query})},uploadImages:function(e){var t=this;wx.uploadImage({localId:e,isShowProgressTips:1,success:function(e){t.serverIdList.push(e.serverId),console.log(t.serverIdList)},fail:function(e){console.log("上传失败"),console.log(e)}})}}}},1439:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",{staticClass:"uploadImgBox"},e._l(e.localIdList,function(e){return n("li",[n("img",{attrs:{src:e}})])})),e._v(" "),n("button",{staticClass:"uploadImgBtn",on:{click:e.chooseImages}},[e._v("点击我上传图片")]),e._v(" "),n("section",{staticStyle:{height:"100%"}}),e._v(" "),n("section",{staticClass:"imageLazyBox"},[n("ul",{staticClass:"uploadImgBox"},e._l(e.lazyImageList,function(e){return n("li",[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"}],attrs:{alt:""}})])}))])])},staticRenderFns:[]}},1440:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1MENCMTc0NEZCNTExRTVBREMzRkQ4NDM0MTY1QUVDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1MENCMTc1NEZCNTExRTVBREMzRkQ4NDM0MTY1QUVDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjUwQ0IxNzI0RkI1MTFFNUFEQzNGRDg0MzQxNjVBRUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjUwQ0IxNzM0RkI1MTFFNUFEQzNGRDg0MzQxNjVBRUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gz9e1AAADoUlEQVR42txaTUwTURCeLVCwFEOMciARUROJXDAED6gxVg1eQL1UREwInOCiJ+ONg3qSi15ELkiICsJF8SQmNiqRRFE5qWgCCAkmamKjWIHy48x2Vpu6i93tLN32S740fWnfzLf73ps3854SrG4CIWxG+pAVyBJkMXIjMhepIGeRX5GTyDHkCDKAnJYwnpng/4uQDciTyNL//HYDcweyKqr9DbIX2Y38aNURl8X/lSH7kBPIC3GIWA2l3Mc491m2FkIKkF3I10h/Ag/CyBc/993FtmwR4uex3cBj3i4obGOMbYoJcSOv8WvPh7VDPttsZx8SEuJF3ke2QPLQzD54rQrxIAdjVphkoYp98ZgV4uanUAnOAfkyYDTMjIRcQR4E5+EQ8mq8AbFWZE5kZsK6Jj9kHagEJS8XVmZDEA48g1+d/QCLi4nOmcccRA3fSCHyusSjy2n0g7vmsCpCXVO9HvV7Tv1xie7b2VdDIW1SS6zbpz+93Ef2Sy3NbUZCypF1YlGN30S87RZQxz7/I6TV5ohtxw6gNVbIFmQNpB7I563RQk4LbwDXCuRzY7SQekhd1GpCKLPbmcJCKFHb5nJoBDcLn4tz7FTHLhe/mlRHCQnZngZC1DmyKQ2E5JOQ9WkgJM+2ILjy46epdonI+N2OjhcCw/rtg0/sMDdLidUXO4bX3I1+UHBbl+Xbo+YiWmI1d/OuHUK+KcHqpgcOKTAkgoc0tN6nwWQfIyEjaSBklIQ8SgMhARJC5xNvU1jEB+S4Vg66hbwkbSFr327IrjsKGYUFsDTzGeZ7BiA89ELazJ3oxIqELIuK2FsBnvPNkFFUqNa46JO+kzhBkM+d0UImIVIiFUP2qWP67fiGBEE+T8RWUS7SDkLKAg0nM+1WdkEQOemCWCEvkT1SVmhOmGm3APL1lZ4QwjlkUMLKfM89/fZekREcZF/BSMgMCB3qhIdGIHS5A5anPwEsLqmf9D389LlE9y3s6x8oBufsVCRudmjc6NDzzSgfOevQiE8+nTHKR3TTBoiUI4cdJGKYfVowI4QQgr9nd8mGdpYZWi1DXDXz4qfQkeQ5UcO+gFUh2jCjyXVCamk2scTWsu2FeHL2eNEPkVs/3ZI7AIOI3c22+swUH8yAwjJdryhnYZIbzWXus5xtmNoCWL3mNMpDTbvmRMdgViv675C3IcFrTorgxTMSRRfPaJ9O9eRiiFw880YtHNrFM6oTUGJCF8+mJIz/FmAAtznP7jRwyogAAAAASUVORK5CYII="},21:function(e,t){},3:function(e,t,n){"use strict";function o(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==g.a.getPara().patientCustomerId)e.customerId=0===g.a.getPara().patientCustomerId.length?0:g.a.getPara().patientCustomerId;else{if(void 0===g.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===g.a.getPara().customerId.length?0:g.a.getPara().customerId}Object(m.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",I()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}var i=n(41),a=n.n(i),r=n(42),s=n.n(r),c=n(0),l=n.n(c),u=n(1),d=n.n(u),m=n(6),g=n(5),p=function(){function e(){l()(this,e)}return d()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t="";return null!=e?t=!0:(t=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),t}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,o=encodeURIComponent(n),i="";if(window.location.origin.includes("localhost"))return!1;i=window.location.hostname.includes("m9")?2:1,1==i?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==i&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var a="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+o+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(g.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+g.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var r=sessionStorage.getItem("count");r||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+g.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+g.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",g.a.getPara().openId))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=a}}]),e}(),f=new p,h=n(8),I=n.n(h),w=function(){function e(){l()(this,e)}return d()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(m.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),v=new w,A=n(9),b=(n(7),function(){function e(){l()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e}}return d()(e,[{key:"forbidShare",value:function(){A.a.weChatJudge(function(){window.location.href.includes("m9")||window.location.href.includes("10.1")||window.location.href.includes("localhost")||v.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){Object(m.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var a=o.split("&"),r=0;r<a.length;r++)i=a[r].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(s()(new a.a(e)))}},{key:"isWXBrowse",value:function(){return f.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==f.isWXBrowse()?21:17}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",o=0,i=0;i<e.length&&(e.charCodeAt(i)>128?o+=2:o++,o<=t);i++)n=n.concat(e[i]);return o>t&&(n+=""),n}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),o=navigator.userAgent,i="";return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?o.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?i=1:A.a.weChatJudge(function(){i=0},function(){i=1}),i}},{key:"checkOpenId",value:function(){return f.checkOpenId()}},{key:"wxGetOpenId",value:function(){f.wxGetOpenId()}},{key:"mobileCheck",value:function(){o()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),o=new Date(n).getDay(),i="",a="",r=t[o],s=e.time.substring(11,16);switch(parseInt(e.type)){case 1:i=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",a=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:i=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),a=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:i,years:a,week:r,hour:s}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}()),y=new b;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=y},5:function(e,t,n){"use strict";var o=n(0),i=n.n(o),a=n(1),r=n.n(a),s=function(){function e(){i()(this,e)}return r()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},o=void 0,i=void 0;if(t.lastIndexOf(e||"?")>0){o=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var a=o.split("&"),r=0;r<a.length;r++)i=a[r].split("="),n[i[0]]=decodeURIComponent(i[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new s},6:function(e,t,n){"use strict";function o(e){s.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),s()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+a()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(t){e.fail&&e.fail(t)})}t.a=o;var i=n(8),a=n.n(i),r=n(18),s=n.n(r)},83:function(e,t,n){function o(e){n(84)}var i=n(2)(n(85),n(86),o,null,null);e.exports=i.exports},84:function(e,t){},85:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3);t.default={data:function(){return{}},mounted:function(){o.a.forbidShare()},methods:{},props:{},components:{}}},86:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0,!1,!1)},staticRenderFns:[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",{staticClass:"followWXBox"},[o("section",{staticClass:"followWX"},[o("h2",{staticClass:"followWX_header"},[o("span",[e._v("如何快速关注微信号")])]),e._v(" "),o("section",{staticClass:"followWX_wayone"},[o("h3",[e._v("微信识别二维码图片关注")]),e._v(" "),o("ul",[o("li",[e._v("1.长按图片保存二维码；")]),e._v(" "),o("li",[e._v("2.打开微信"),o("span",[e._v("“扫一扫”")]),e._v("；")]),e._v(" "),o("li",[e._v("3.点击"),o("span",[e._v("“相册”")]),e._v("，找到二维码，微信识别后"),o("span",[e._v("“关注”")]),e._v("即可。")])]),e._v(" "),o("dl",[o("dt",[o("span",[e._v("温馨提示：")]),e._v(" "),o("span",[e._v("不同操作系统进入相册方式有区别。")])]),e._v(" "),o("dd",[e._v("* 苹果用户点击扫一扫页面右上角“相册”即可；")]),e._v(" "),o("dd",[e._v("* 安卓用户点击扫一扫页面右上角...后点击“从相册选取二维码”即可。")]),e._v(" "),o("dd",{staticClass:"QRcodeBox"},[o("img",{staticClass:"QRcode",attrs:{src:n(87),alt:"唯医互联网骨科医院"}}),e._v(" "),o("img",{staticClass:"QRtips",attrs:{src:n(88)}})])])]),e._v(" "),o("section",{staticClass:"followWX_waytwo"},[o("h3",[e._v("微信搜索“唯医互联网骨科医院”关注")]),e._v(" "),o("figure",{staticClass:"searchFollow"},[o("img",{attrs:{src:n(89)}})])])])])}]}},87:function(e,t,n){e.exports=n.p+"static/img/qrcode_for_gh.5adf1bb.jpg"},88:function(e,t,n){e.exports=n.p+"static/img/code_entrance.e621259.png"},89:function(e,t,n){e.exports=n.p+"static/img/picture.9fcc8f7.png"},9:function(e,t,n){"use strict";var o=n(0),i=n.n(o),a=n(1),r=n.n(a),s=n(7),c=(n.n(s),function(){function e(){i()(this,e)}return r()(e,[{key:"weChatJudge",value:function(e,t){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?e(n):t(n)}}]),e}());t.a=new c},98:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MTMzN2JlMC1iNjJhLTRiMzQtYTIwOC0yYTE1OWQ4ZWNmYzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEY5MUM5NUM1NTM5MTFFNkI4M0Q5NzU4NTJBM0IzODciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEY5MUM5NUI1NTM5MTFFNkI4M0Q5NzU4NTJBM0IzODciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGFmMjJhNDItMmIxZi00ODAxLWFiZTgtOTMxMjRmNzc0YmNiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkxMzM3YmUwLWI2MmEtNGIzNC1hMjA4LTJhMTU5ZDhlY2ZjNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pst7/R8AAAJUSURBVHja7Nk9SJVxFMfxe5USRWhqa3CQBhHBRaFNiQTTKxi+YJQKkhI0ZOoiJImDIL7gECgO4huCEvSCoJXOthlNkZubi4kkKXr9/uk3PDiKV66nc+HH8fkPXj74PP/nnL/xZDIZ+58+cQc72MEOdrCDHexgBzvYwQ6+luDaJ92llCny6N3s0M/L/v0ZaYYtp3whhWQuFd+RkUbYBOUTySXhL1tr9pYG20iZITfId3Kf23nXJBhsG2VCd9smqQD72+SmBfYlZUSXG6QK7B+TuzTY15Q3uvxI6sD+NfdaAhqnDJFXWlogLWCPzb2HwWZS3pJnWpokz8GemGs8wIYdeJo0aWmYdIO90lvsSsBgsyhLpFpLfUD7TbaWYHPUUJRpqRPsqMleGuwtyhopIaekHeyUyeEB7G31xUUk7MBPwS6anJbA3qF8JXfJIWkE+8HkeAg2n/KZ5JEDUgN2PV2GlFRMS/PCxvTaSRtsqsCPybZ+HtGMa/vEQ8/wKikgoT+uN/sMn9ulA7pYu3Qr6Hmz4Mh7eIXc03s49M0TZsGRTut9OMXQUhfoYbNgoW+ql05oqR90n1lwZDSciUxLY+qrkybBkeE/zMMdWgp9dYfJefgcepD0aCn0182gj0yCI/BeyoAuw5lWA+hDs2ChX1DGdRlOLROgD8yChW7Vsxza3G+xf+fSe2bBQtdp6AjnXj9Iudn/PETQlZRlkk1+kTLQO9dhWrrQB1xoQR+SfZKv7ixmFix02LgekC2NmXZvabONh4Md7GAHO9jBDnawgx1s5HMmwAAcD1Sxe4VzHAAAAABJRU5ErkJggg=="}},[1432]);