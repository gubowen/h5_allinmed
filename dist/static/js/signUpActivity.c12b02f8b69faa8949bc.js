webpackJsonp([15],{14:function(e,t){!function(e,t){function n(){var t=i.getBoundingClientRect().width;t/c>540&&(t=540*c);var n=t/10;i.style.fontSize=n+"px",u.rem=e.rem=n}var a,o=e.document,i=o.documentElement,s=o.querySelector('meta[name="viewport"]'),r=o.querySelector('meta[name="flexible"]'),c=0,l=0,u=t.flexible||(t.flexible={});if(s){console.warn("将根据已有的meta标签来设置缩放比例");var p=s.getAttribute("content").match(/initial\-scale=([\d\.]+)/);p&&(l=parseFloat(p[1]),c=parseInt(1/l))}else if(r){var d=r.getAttribute("content");if(d){var m=d.match(/initial\-dpr=([\d\.]+)/),v=d.match(/maximum\-dpr=([\d\.]+)/);m&&(c=parseFloat(m[1]),l=parseFloat((1/c).toFixed(2))),v&&(c=parseFloat(v[1]),l=parseFloat((1/c).toFixed(2)))}}if(!c&&!l){var g=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;c=g?h>=3&&(!c||c>=3)?3:h>=2&&(!c||c>=2)?2:1:1,l=1/c}if(i.setAttribute("data-dpr",c),!s)if(s=o.createElement("meta"),s.setAttribute("name","viewport"),s.setAttribute("content","initial-scale="+l+", maximum-scale="+l+", minimum-scale="+l+", user-scalable=no, viewport-fit=cover"),i.firstElementChild)i.firstElementChild.appendChild(s);else{var f=o.createElement("div");f.appendChild(s),o.write(f.innerHTML)}e.addEventListener("resize",function(){clearTimeout(a),a=setTimeout(n,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(a),a=setTimeout(n,300))},!1),"complete"===o.readyState?o.body.style.fontSize=12*c+"px":o.addEventListener("DOMContentLoaded",function(e){o.body.style.fontSize=12*c+"px"},!1),n(),u.dpr=e.dpr=c,u.refreshRem=n,u.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},u.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))},1603:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=n.n(a),i=n(2),s=n.n(i),r=n(10),c=n(1604),l=n.n(c),u=n(49),p=n.n(u),d=n(68),m=n(1616),v=n.n(m);p.a.attach(document.body);var g=function(){function e(){o()(this,e),this.init()}return s()(e,[{key:"init",value:function(){d.a.addLocale(v.a);var e={locale:"zh_CN"};r.a.use(d.b,e);var t={zh_CN:{messages:{email:function(){return"邮箱格式不正确哦"},required:function(e){return"请填写"+e}},attributes:{phone:"手机号码",name:"姓名",hospital:"医院名称",checkCodeValidate:"短信验证码"}}};d.a.updateDictionary(t);new r.a({render:function(e){return e(l.a)}}).$mount("#signUpActivity")}}]),e}();d.a.extend("special",{messages:{en:function(e){return"请填写真实姓名"},zh_CN:function(e,t){return"请填写真实姓名"}},validate:function(e){return!/[`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\]\d]/.test(e)}}),d.a.extend("hospital",{messages:{en:function(e){return"请填写真实医院名称"},zh_CN:function(e,t){return"请填写真实医院名称"}},validate:function(e){return!/[A-Za-z`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\]]/.test(e)}}),d.a.extend("mobile",{messages:{en:function(e,t){return"请填写真实手机号码"},cn:function(e,t){return"请填写真实手机号码"},zh_CN:function(e,t){return"请填写真实手机号码"}},validate:function(e){return 11==e.length&&/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(e)}}),new g},1604:function(e,t,n){function a(e){n(1605)}var o=n(0)(n(1606),n(1607),a,null,null);e.exports=o.exports},1605:function(e,t){},1606:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(9),o=n.n(a),i=n(14),s=(n.n(i),n(17)),r=n.n(s),c=n(3);t.default={data:function(){return{name:"",hospital:"",career:"0",mobile:"",checkInput:"",checkClickStatus:!1,checkMessage:"获取验证码",moreFlag:!1,nameCheckMessage:"",simulateSelectStatus:!1,selectValue:"",validCode:"",idKey:"",popupText:"",popupImg:""}},methods:{submit:function(){var e=this,t=window.location.search;t&&-1!=t.indexOf("sendSiteId")&&c.a.getPara().sendSiteId;var n={doctorName:e.name,hospitalName:e.hospital,titleName:e.career,mobile:e.mobile,isValid:"1",sendSiteId:c.a.getPara().sendSiteId};r()({method:"post",url:"/mcall/tocure/cms/activity/doctor/v1/create/",data:n,responseType:"json",header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:[function(e){return e="paramJson="+o()(e)}]}).then(function(t){t.data.responseObject.responseStatus?"9X0001"==t.data.responseObject.responseMessage?e.popup("同一手机号码只能提交一次"):e.popup("提交成功工作人员会在48小时内联系您","successful"):e.popup("网络信号差，建议您稍后再试","fail")}).catch(function(t){e.popup("网络信号差，建议您稍后再试","fail"),console.log("请求失败："+t)})},validator:function(e){var t=this;if(this.$validator.errors.items.length>0)return t.popup("请填写好信息"),!1;if(""==t.name||""==t.hospital||""==t.selectValue||""==t.mobile||""==t.checkInput)return t.popup("请填写好信息"),!1;if(""==t.idKey)return t.popup("请先获得验证码"),!1;var n={validCode:t.checkInput,id:t.idKey,isValid:1,account:t.mobile};r()({method:"post",url:"/mcall/customer/send/code/v1/update/",data:n,responseType:"json",header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:[function(e){return e="paramJson="+o()(e)}]}).then(function(n){n.data.responseObject.responseStatus?"1A0001"==n.data.responseObject.responseCode?t.popup("验证码失效，请重新获取"):"1A0002"==n.data.responseObject.responseCode?t.popup("验证码错误"):e&&e():t.popup("网络信号差，建议您稍后再试","fail")}).catch(function(e){t.popup("网络信号差，建议您稍后再试","fail"),console.log("请求失败："+e)})},more:function(){this.moreFlag=!this.moreFlag},checkCode:function(){var e=this;if(""==e.mobile)return e.popup("请填写手机号"),!1;var t={typeId:"6",account:e.mobile,codeLength:"4",accountType:"0",operateType:"6",mobile:e.mobile};e.checkClickStatus||e.errors.has("phone")||(e.checkClickStatus=!0,r()({method:"post",url:"/mcall/customer/send/code/v1/create/",data:t,responseType:"json",header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:[function(e){return e="paramJson="+o()(e)}]}).then(function(t){if(t.data.responseObject.responseStatus)if("9X0005"==t.data.responseObject.responseCode)e.popup("同一手机号只能注册一次");else{e.validCode=t.data.responseObject.responseData.validCode,e.idKey=t.data.responseObject.responsePk,e.popup("验证码已发送","successful");var n=60;e.checkMessage=n+"s",e.time=setInterval(function(){n--,e.checkMessage=n+"S",0===n&&(clearInterval(e.time),e.checkMessage="重新获取",e.checkClickStatus=!1,n=60)},1e3)}else"9X0005"==t.data.responseObject.responseCode?(e.popup("同一手机号只能注册一次"),e.checkClickStatus=!1):"SMS0003"==t.data.responseObject.responseCode&&(e.popup("  验证码获取次数过多，请明日再试"),e.checkClickStatus=!1)}).catch(function(t){e.checkClickStatus=!1,e.popup("网络信号差，建议您稍后再试","fail"),console.log("请求失败："+t)}))},validateBlur:function(e){this.$validator.validateAll(),this.errors.has(e)},simulateSelect:function(){this.simulateSelectStatus=!this.simulateSelectStatus},select:function(e){switch(this.simulateSelectStatus=!1,e){case 0:break;case 1:this.selectValue="主任医师",this.career="1_主任医师";break;case 2:this.selectValue="副主任医师",this.career="2_副主任医师";break;case 3:this.selectValue="主治医师",this.career="3_主治医师";break;case 4:this.selectValue="其他",this.career="0_其他"}},popup:function(e,t){var n=this;n.popupText=e,void 0!==t&&(console.log(t),n.popupImg=t),setTimeout(function(){n.popupText="",n.popupImg=""},2e3)},nameLength:function(){for(var e=this,t=0,n=0,a=0;a<e.name.length;a++){var o=e.name.charCodeAt(a);t<40?o>=1&&o<=126||65376<=o&&o<=65439?(t++,n++):(t+=2,n++):e.name=e.name.substr(0,n)}},hospitalLength:function(){for(var e=this,t=0,n=0,a=0;a<e.hospital.length;a++){var o=e.hospital.charCodeAt(a);t<40?o>=1&&o<=126||65376<=o&&o<=65439?(t++,n++):(t+=2,n++):e.hospital=e.hospital.substr(0,n)}}}}},1607:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{width:"100%",height:"100%"},on:{click:function(t){e.select(0)}}},[a("img",{staticClass:"banner",attrs:{src:n(1608)}}),e._v(" "),a("div",{staticClass:"content"},[a("img",{attrs:{src:n(1609)}}),e._v(" "),a("div",{staticClass:"content-information"},[a("div",{staticClass:"flagMessage"},[e._v("*请填写真实有效的信息")]),e._v(" "),a("ul",[a("li",[a("div",[a("span",{staticClass:"apply_title"},[e._v("姓名")]),e._v(" "),a("span",{staticClass:"apply_text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"},{name:"validate",rawName:"v-validate",value:"required|special",expression:"'required|special'"}],staticClass:" name",attrs:{type:"text",placeholder:"填写真实姓名",maxlength:"40",name:"name"},domProps:{value:e.name},on:{keyup:function(t){e.nameLength()},input:function(t){t.target.composing||(e.name=t.target.value)}}})])]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("name"),expression:"errors.has('name')"}],staticClass:"nameErrorMessage error-message"},[e._v(e._s(e.errors.first("name")))])]),e._v(" "),a("li",[a("div",[a("span",{staticClass:"apply_title"},[e._v("医院")]),e._v(" "),a("span",{staticClass:"apply_text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.hospital,expression:"hospital"},{name:"validate",rawName:"v-validate",value:"required|hospital",expression:"'required|hospital'"}],staticClass:"hospital",attrs:{type:"text",placeholder:"填写所在医院",maxlength:"40",name:"hospital"},domProps:{value:e.hospital},on:{keyup:function(t){e.hospitalLength()},input:function(t){t.target.composing||(e.hospital=t.target.value)}}})])]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("hospital"),expression:"errors.has('hospital')"}],staticClass:"nameHospitalMessage error-message"},[e._v(e._s(e.errors.first("hospital")))])]),e._v(" "),a("li",[a("div",[a("span",{staticClass:"apply_title"},[e._v("职称")]),e._v(" "),a("span",{staticClass:"apply_text"},[a("div",{staticClass:"simulateSelect"},[a("i",{class:e.simulateSelectStatus?"icon-up":"icon-down",on:{click:function(t){t.stopPropagation(),e.simulateSelect()}}}),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectValue,expression:"selectValue"}],attrs:{type:"text",readonly:"",placeholder:"选择当前职称"},domProps:{value:e.selectValue},on:{click:function(t){t.stopPropagation(),e.simulateSelect()},input:function(t){t.target.composing||(e.selectValue=t.target.value)}}}),e._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:e.simulateSelectStatus,expression:"simulateSelectStatus"}]},[a("li",{class:{active:"主任医师"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(1)}}},[e._v("主任医师")]),e._v(" "),a("li",{class:{active:"副主任医师"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(2)}}},[e._v("副主任医师")]),e._v(" "),a("li",{class:{active:"主治医师"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(3)}}},[e._v("主治医师")]),e._v(" "),a("li",{class:{active:"其他"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(4)}}},[e._v("其他")])])])])])]),e._v(" "),a("li",[a("div",[a("span",{staticClass:"apply_title"},[e._v("手机号")]),e._v(" "),a("span",{staticClass:"apply_text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"},{name:"validate",rawName:"v-validate",value:"required|mobile",expression:"'required|mobile'"}],staticClass:"apply_text mobile",attrs:{type:"tel",placeholder:"填写真实手机号码 ",maxlength:"11",name:"phone"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})])]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("phone"),expression:"errors.has('phone')"}],staticClass:"nameMobileMessage error-message"},[e._v(e._s(e.errors.first("phone")))])]),e._v(" "),a("li",[a("div",[a("span",{staticClass:"apply_title"},[e._v("验证码")]),e._v(" "),a("span",{staticClass:"apply_text"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkInput,expression:"checkInput"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"apply_checkInput",attrs:{type:"tel",placeholder:"填写短信验证码",maxlength:"4",name:"checkCodeValidate"},domProps:{value:e.checkInput},on:{input:function(t){t.target.composing||(e.checkInput=t.target.value)}}}),e._v(" "),a("a",{staticClass:"apply_checkCode",class:{on:e.checkClickStatus},on:{click:function(t){e.checkCode()}}},[e._v(e._s(e.checkMessage))])])]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("checkCodeValidate"),expression:"errors.has('checkCodeValidate')"}],staticClass:"nameCheckMessage error-message"},[e._v(e._s(e.errors.first("checkCodeValidate")))])])]),e._v(" "),a("a",{staticClass:"saveBtn",on:{click:function(t){e.validator(e.submit)}}}),e._v(" "),a("section",{staticClass:"middle-tip-modal popup",class:{show:e.popupText.length>0}},[a("figure",{staticClass:"middle-tip-box-text"},[a("img",{directives:[{name:"show",rawName:"v-show",value:"successful"==e.popupImg,expression:"popupImg == 'successful'"}],attrs:{src:n(1610),alt:""}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:"fail"==e.popupImg,expression:"popupImg == 'fail'"}],attrs:{src:n(1611),alt:""}}),e._v(" "),a("p",{staticClass:"popup-text"},[e._v(e._s(e.popupText))])])])]),e._v(" "),a("div",{staticClass:"more",on:{click:function(t){e.more()}}},[a("img",{directives:[{name:"show",rawName:"v-show",value:e.moreFlag,expression:"moreFlag"}],attrs:{src:n(1612)}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:!e.moreFlag,expression:"!moreFlag"}],attrs:{src:n(1613)}})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.moreFlag,expression:"moreFlag"}]},[a("img",{attrs:{src:n(1614)}})]),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:!e.moreFlag,expression:"!moreFlag"}],attrs:{src:n(1615)}})])])},staticRenderFns:[]}},1608:function(e,t,n){e.exports=n.p+"static/img/01.439dee2.png"},1609:function(e,t,n){e.exports=n.p+"static/img/02.4e13ef7.png"},1610:function(e,t){e.exports="data:image/png;base64,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"},1611:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABY9JREFUeNrsXY11mzAQRnkdgA3CBmEDs0G8QRnBG8SZwN3AzQS2J8CeADoBzgR4Axc1R0vc6A9JcMJ37+npvdgB6T7dfSdZOrEIuVyv16yt0rY8Qh1DrSNVWy5Qv/OaMXbE3F+GTPlc2RyABdSpp1dxgDgwJ163IF0IkM8gLNvyDPUUsm/LgdeYwBndFbVle8UnW3CTdwNE3pbiil94G/O5A1Ffw5N6TGDYGK6prV6ApG2Ek/C5i5YgeuqTdHQTBMS96Cxx9P5X7FGalKzbshk4Kpu27NqyakvqsE0pPHMH7xgiGwhEgiPsZgAInFCXI7ZzCe8c0tYsFDBMraLEQJ7AcaWptWAGIjHsUIFxlIF1F4YDKsHWidTA7IsQzN0QmMYl17kwdd1GBxfXQ/90B1seChi74CKT/yPGHWpQNMFo5jTbNbCWHCMYJRq/6p4vSzSgaIIRtIty6MLyMUaHymS3d7RQup0s+oJRQWAMAyX28eKSwBgMSjn2csjdgmEAysbVizIVgUckna5URJ/ZviBW/KhUzjmaGqivUvFjV+zLVaFYvwElZFBiBO1RRaIbmwfjXbf5uvNYBolqrpYOeWiBnTcE7rQOgE8Kl0TeYOENpyNw/Hlb5so6VohI1E804659K2srUVhHGSES7IBoTKgzW+vICBCn87jCJrIqImQS0MApBvGdYvqfESBerGQr+0dRVFBHCCWwwSNa8Wj633vo/QPfoCYKZ19pYcRaRDqM+5sDH3ofPEsetid9WotMh88m7grt0npILkvB0c0nC4EOiNzVgQa3MzlI3FbWd1nCEcUYI3flSBS6/ATIgrhjci5Z6FjIifTnXE4yC/mmWBmtSH/OpZKtlHALSSU+70j6c84jMp3+ASQh60BjJQkH5Enw4Zn05k1Eun16kMw/fpHevIlIt7HMZZGML4kMECJ0f3KUAUKCSAgQAoSEACFASAiQOwCEjhn4k1gGiGhdJSW9eRORbisOyIX0g0YuHJCz4MMF6cebiHR75oC8i6bxpDdvItLtu4xDEjo/6F5Ap4mMQ84DyIfEPaF/uCzGWCUh9oz051xEOr1wLLp5SDUnYke+F0Ck06o/MRRuTUHOIz80/4aJP0QWcup/McV8/FnRyTUciOFljbytufbBHclma0qd4Q6Qnc4Zke7LstNTNCexByPROUXVX1yU7XLPSaXWItPhQYRiHdKRtsAsREu3t8vve8msnazEgswls/P9UD+H9eAnqmxAhtah5mdF0pQcWUdRZgMyCHV3Og/IvCXgGmfk1cist7Y+C6nIPLBG1GG02YB6k1b7zBgaeRYT5IBgyCyXOM2/qJgoFkgA2SBOrlY4zeIKCDeYXVfvnqsa2rpBYh1rRQK4xMeD0R7QnxgMlbtf276gDCHdH6KoqvGaAE4jOynl7o20cva6i/4UuQNRJjdDRuLuc1VqpNGmZPxjptXVNEm6rmJMl655oUtxD5wCA1TlpvyvrWmCgu+yRfez8HJyMHoNWs7qvljzeYbOTW3LsRume4fhekZgrDX7nE/VwKXmaAn6Cj2Dq/Ka0S1jIKf8tZaQCB+IW9cqUN2HqzuCgrn90/AOXJQ3RpvcF9v9+pgjBaI26AfuSzRhmaUx6FADbiGZsM0JtMG03atQfK+JC7s1/dUY4AAIK4t2hhekDLCW205vIJJLHAGwhGeWA9vk3SrYGCOxrV4i++2o/FARP0Nxjv6dizwKvttNSB+jjw1qfDTb+vmfbXlljJ3ntNxQXMOTYo7XkN8Csw0AiO0UgQabEhhwY98jPEewuTt64+5pKtfEkFhNCsAsJwCHK55veH6DA7CTCkPo0lIg5QWQceIBAK54fqbviAEE1IB8tQIAwHSRU3eKtfv7V9I/6n3qRWRVCwDq3C6/BRgAVOkDjIpEdzUAAAAASUVORK5CYII="},1612:function(e,t,n){e.exports=n.p+"static/img/03.0fa2fe5.png"},1613:function(e,t,n){e.exports=n.p+"static/img/03-on.c5f9969.png"},1614:function(e,t,n){e.exports=n.p+"static/img/04.b6d5932.png"},1615:function(e,t,n){e.exports=n.p+"static/img/05.56e0171.png"},3:function(e,t,n){"use strict";function a(){var e={isValid:1,firstResult:0,maxResult:99999,customerId:0};if(void 0!==v.a.getPara().patientCustomerId)e.customerId=0===v.a.getPara().patientCustomerId.length?0:v.a.getPara().patientCustomerId;else{if(void 0===v.a.getPara().customerId)return void(e.customerId=0);e.customerId=0===v.a.getPara().customerId.length?0:v.a.getPara().customerId}Object(m.a)({url:"/mcall/patient/customer/unite/v1/getMapById/",method:"POST",data:e,beforeSend:function(){},timeout:2e3,done:function(t){if(localStorage.setItem("customerBaseInfo_one",w()(t)),t&&t.responseObject&&t.responseObject.responseData&&t.responseObject.responseData.dataList){var n=t.responseObject.responseData.dataList[0].mobile;if(n&&n.length>0)return sessionStorage.removeItem("isReLoading"),!0;if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}else{if(sessionStorage.getItem("isReLoading")&&"1"==sessionStorage.getItem("isReLoading"))return;sessionStorage.setItem("loginBack",window.location.href),window.location.href="/dist/login.html?customerId="+e.customerId}}})}function o(e){if(e.$root===e)return"root";var t=e._isVue?e.$options&&e.$options.name||e.$options&&e.$options._componentTag:e.name;return(t?"component <"+t+">":"anonymous component")+(e._isVue&&e.$options&&e.$options.__file?" at "+(e.$options&&e.$options.__file):"")}var i=n(41),s=n.n(i),r=n(42),c=n.n(r),l=n(1),u=n.n(l),p=n(2),d=n.n(p),m=n(6),v=n(5),g=function(){function e(){u()(this,e)}return d()(e,[{key:"checkOpenId",value:function(){if("other"===this.isWXBrowse())return!0;if(window.location.href.indexOf("m9.allinmed.cn")>0||window.location.href.indexOf("m.allinmed.cn")>0){var e=localStorage.getItem("openId"),t=localStorage.getItem("userId"),n=localStorage.getItem("openIdCheckCustomer"),a="";return null!=e&&t==n?a=!0:(a=!1,sessionStorage.getItem("count")&&sessionStorage.getItem("count").length>0&&sessionStorage.removeItem("count")),a}return!0}},{key:"isWXBrowse",value:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("iphone")>0?"iphoneWX":"micromessenger"==e.match(/MicroMessenger/i)&&e.indexOf("android")>0?"androidWX":"other"}},{key:"wxGetOpenId",value:function(){var e="",t="",n=window.location.origin+window.location.pathname+window.location.search,a=encodeURIComponent(n),o="";if(window.location.origin.includes("localhost"))return!1;o=window.location.hostname.includes("m9")?2:1,1==o?(e="wxe8384f7b06c169ef",t="http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/"):2==o&&(e="wxaa5288ad7f627608",t="http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/");var i="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+e+"&redirect_uri="+a+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";if(v.a.getPara().code)-1===window.location.href.indexOf("openId")&&(window.location.href=t+"?ref="+(window.location.origin+window.location.pathname)+"&response_type=code&scope=snsapi_base&state=pay&code="+v.a.getPara().code+"#wechat_redirect");else if(-1!==window.location.href.indexOf("openId")){var s=sessionStorage.getItem("count");s||(sessionStorage.setItem("count",1),localStorage.getItem("currentUrl")&&-1!=localStorage.getItem("currentUrl").indexOf("?")?(window.location.href=localStorage.getItem("currentUrl")+"&openId="+v.a.getPara().openId,localStorage.removeItem("isReLoading")):(window.location.href=localStorage.getItem("currentUrl")+"?openId="+v.a.getPara().openId,localStorage.removeItem("isReLoading")),localStorage.setItem("openId",v.a.getPara().openId),localStorage.setItem("openIdCheckCustomer",localStorage.getItem("userId")))}else localStorage.setItem("currentUrl",n),localStorage.setItem("isReLoading","1"),window.location.href=i}}]),e}(),h=new g,f=n(9),w=n.n(f),I=function(){function e(){u()(this,e)}return d()(e,[{key:"wxforbidShare",value:function(){var e=document.createElement("script");e.type="text/javascript",e.src="/static/js/third-party/jweixin-1.0.0.js",document.getElementsByTagName("body")[0].appendChild(e),Object(m.a)({url:"/mcall/wx/api/v1/getJSConfig/",method:"POST",data:{url:encodeURIComponent(window.location.href.split("#")[0])},headers:{"Content-Type":"application/x-www-form-urlencoded"},done:function(e){if(e.responseObject.responseData&&e.responseObject.responseStatus){var t=e.responseObject.responseData;wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","hideOptionMenu","showOptionMenu","getNetworkType","getLocation","openLocation","chooseImage","previewImage","uploadImage","getLocalImgData","scanQRCode","hideMenuItems"]}),wx.ready(function(){console.log("成功了"),wx.hideOptionMenu()}),wx.error(function(e){console.log(e)})}},fail:function(e){document.querySelector(".ev-loading").style.display="none"}})}}]),e}(),y=new I,x=n(7),C=(n(8),n(10)),b=function(){return window.location.host.includes("allinmed")?"production":"development"},A=function(){if("production"===b()){var e=n(43);e.apikey="617001e96c72b7b07126e74ab5c611c473d5f6396e63c1e5a9eef8b98cae3830",C.a.config.errorHandler=function(t,n,a){var i=o(n),s=n.$options&&n.$options.propsData;e.notifyError(t,{metaData:{componeSntName:i,propsData:s,info:a}})}}},k=function(){function e(){u()(this,e),this.removeByValue=function(e,t){for(var n=0;n<this.length;n++)if(e[n]==val){e.splice(n,1);break}return e},A()}return d()(e,[{key:"forbidShare",value:function(){x.a.weChatJudge(function(){window.location.href.includes("m9")||window.location.href.includes("10.1")||window.location.href.includes("localhost")||y.wxforbidShare()},function(){console.log("不需要禁止")})}},{key:"banZoom",value:function(){document.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()});var e=0;document.addEventListener("touchend",function(t){var n=(new Date).getTime();n-e<=300&&t.preventDefault(),e=n},!1)}},{key:"ajax",value:function(e){Object(m.a)(e)}},{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},a=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){a=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var i=a.split("&"),s=0;s<i.length;s++)o=i[s].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"getCookie",value:function(e){var t=void 0,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?decodeURIComponent(t[2]):null}},{key:"removeDub",value:function(e){return[].concat(c()(new s.a(e)))}},{key:"isWXBrowse",value:function(){return h.isWXBrowse()}},{key:"getSiteId",value:function(){return"other"==h.isWXBrowse()?21:17}},{key:"getByteLen",value:function(e){for(var t=0,n=0;n<e.length;n++)null!==e[n].match(/[^\x00-\xff]/gi)?t+=2:t+=1;return t}},{key:"getStrByteLen",value:function(e,t){for(var n="",a=0,o=0;o<e.length&&(e.charCodeAt(o)>128?a+=2:a++,a<=t);o++)n=n.concat(e[o]);return a>t&&(n+=""),n}},{key:"getNetWork",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},t=["unknown","ethernet","wifi","2g","3g","4g","none"];return"number"==typeof e.type?e.type_text=t[e.type||e.effectiveType]:e.type_text=e.effectiveType,"number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),e.type_text}},{key:"getDeviceType",value:function(){var e="",t=this.isWXBrowse();return"androidWX"===t?e="Android":"iphoneWX"===t&&(e="IOS"),e}},{key:"getConnectType",value:function(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:"unknown"},t=["unknown","","wifi","2g","3g","4g","none"],n=this.isWXBrowse(),a=navigator.userAgent,o="";return"number"==typeof e.type?e.type_text=t[e.type]:"androidWX"===n?"WIFI"!==e.type||"wifi"!==e.type?a.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":e.type_text=e.type:"iphoneWX"===n?a.indexOf("WIFI")>0?e.type_text="wifi":e.type_text="other":"undefined"!==e.type?e.type_text=e.type:e.type_text="other","number"==typeof e.bandwidth&&(e.bandwidth>10?e.type="wifi":e.bandwidth>2?e.type="3g":e.bandwidth>0?e.type="2g":0==e.bandwidth?e.type="none":e.type="unknown"),"wifi"==e.type_text?o=1:x.a.weChatJudge(function(){o=0},function(){o=1}),o}},{key:"checkOpenId",value:function(){return h.checkOpenId()}},{key:"wxGetOpenId",value:function(){h.wxGetOpenId()}},{key:"mobileCheck",value:function(){a()}},{key:"timeFormate",value:function(e){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],n=e.time.substring(0,10).replace(/\-/g,"/"),a=new Date(n).getDay(),o="",i="",s=t[a],r=e.time.substring(11,16);switch(parseInt(e.type)){case 1:o=e.time.substring(0,4)+"年"+e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日",i=e.time.substring(5,7)+"月"+e.time.substring(8,10)+"日";break;case 2:o=e.time.substring(0,4)+"."+e.time.substring(5,7)+"."+e.time.substring(8,10),i=e.time.substring(5,7)+"."+e.time.substring(8,10)}return{year:o,years:i,week:s,hour:r}}},{key:"MillisecondToDate",value:function(e){var t=parseInt(parseInt(e)/1e3);return null!=t&&""!=t?t>60&&t<3600?t=parseInt(t/60)+"分钟":t>=3600&&t<=86400?t=parseInt(t/3600)+"小时"+parseInt(60*(parseFloat(t/3600)-parseInt(t/3600)))+"分钟":t>=86400&&(t=Math.round(parseInt(t/86400))+"天"):t="0 时 0 分0 秒",t}},{key:"MillisecondToDateNew",value:function(e){var t=parseFloat(e)/1e3;return t=null!=t&&""!=t?t>60&&t<3600?parseInt(t/60)+"分钟":t>=3600&&t<=86400?parseInt(t/3600)+"小时":parseInt(t)+"秒":"0 时 0 分0 秒"}}]),e}(),S=new k;!function(){Array.prototype.removeByValue=function(e){for(var t=0;t<this.length;t++)if(this[t]==e){this.splice(t,1);break}}}();t.a=S},5:function(e,t,n){"use strict";var a=n(1),o=n.n(a),i=n(2),s=n.n(i),r=function(){function e(){o()(this,e)}return s()(e,[{key:"getPara",value:function(e){var t=window.location.origin+window.location.pathname+window.location.search,n={},a=void 0,o=void 0;if(t.lastIndexOf(e||"?")>0){a=t.substring(t.lastIndexOf(e||"?")+1,t.length);for(var i=a.split("&"),s=0;s<i.length;s++)o=i[s].split("="),n[o[0]]=decodeURIComponent(o[1])}return n}},{key:"browser",value:function(){var e=navigator.userAgent;navigator.appVersion;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}}]),e}();t.a=new r},6:function(e,t,n){"use strict";function a(e){r.a.interceptors.request.use(function(t){return document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="block"),e.beforeSend&&e.beforeSend(t),t}),r()({url:e.url,method:e.method,data:e.data,transformRequest:[function(e){return"paramJson="+i()(e)}],headers:{"X-Requested-With":"XMLHttpRequest"},timeout:3e4}).then(function(t){e.done(t.data),document.querySelector(".ev-loading")&&(document.querySelector(".ev-loading").style.display="none")}).catch(function(t){e.fail&&e.fail(t)})}t.a=a;var o=n(9),i=n.n(o),s=n(17),r=n.n(s)},7:function(e,t,n){"use strict";var a=n(1),o=n.n(a),i=n(2),s=n.n(i),r=n(8),c=(n.n(r),function(){function e(){o()(this,e)}return s()(e,[{key:"weChatJudge",value:function(e,t){var n=window.navigator.userAgent.toLowerCase();n.includes("micromessenger")?e(n):t(n)}}]),e}());t.a=new c}},[1603]);