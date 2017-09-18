webpackJsonp([9],{1077:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(2),i=a.n(s),n=a(3),o=a.n(n),r=a(6),l=a(1078),c=a.n(l),p=a(31),u=a.n(p),m=a(58),d=a.n(m),v=a(1088),h=a.n(v);u.a.attach(document.body);var f=function(){function e(){i()(this,e),this.init()}return o()(e,[{key:"init",value:function(){m.Validator.addLocale(h.a);var e={locale:"zh_CN"};r.a.use(d.a,e);new r.a({render:function(e){return e(c.a)}}).$mount("#signUpActivity")}}]),e}(),g={zh_CN:{messages:{email:function(){return"邮箱格式不正确哦"},required:function(e){return"请填写"+e}},attributes:{phone:"手机号",name:"姓名",hospital:"医院"}},cn:{messages:{email:function(){return"请输入正确的邮箱格式"},required:function(e){return"请填写"+e}},attributes:{phone:"手机号",name:"姓名",hospital:"医院"}},en:{messages:{email:function(){return"请输入正确的邮箱格式"},required:function(e){return"请填写"+e}},attributes:{phone:"手机号",name:"姓名",hospital:"医院"}}};m.Validator.updateDictionary(g),m.Validator.extend("special",{messages:{en:function(e){return"请填写真实姓名"},zh_CN:function(e,t){return"请填写真实姓名"}},validate:function(e){return!/[`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\]\d]/.test(e)}}),m.Validator.extend("hospital",{messages:{en:function(e){return"请填写真实医院名称"},zh_CN:function(e,t){return"请填写真实医院名称"}},validate:function(e){return!/[`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\]]/.test(e)}}),m.Validator.extend("mobile",{messages:{en:function(e,t){return"请填写真实手机号码"},cn:function(e,t){return"请填写真实手机号码"},zh_CN:function(e,t){return"请填写真实手机号码"}},validate:function(e){return 11==e.length&&/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(e)}}),new f},1078:function(e,t,a){function s(e){a(1079)}var i=a(0)(a(1080),a(1081),s,null,null);e.exports=i.exports},1079:function(e,t){},1080:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(5),i=a.n(s),n=a(7),o=(a.n(n),a(13)),r=a.n(o);t.default={data:function(){return{name:"",hospital:"",career:"0",mobile:"",checkInput:"",checkClickStatus:!1,checkMessage:"获取验证码",moreFlag:!1,nameCheckMessage:"",simulateSelectStatus:!1,selectValue:"",validCode:"",id:"",popupText:"",popupImg:""}},methods:{submit:function(){var e={doctorName:_this.name,hospitalName:_this.hospital,titleName:_this.career,mobile:_this.mobile,isValid:"1",sendSiteId:"",checkInput:_this.checkInput};r()({method:"post",url:"/mcall/tocure/cms/activity/doctor/v1/create",data:e,responseType:"json",header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:[function(e){return e="paramJson="+i()(e)}]}).then(function(e){e.data.responseStatus,console.log(e)}).catch(function(e){console.log("请求失败："+e)}),_this.nameCheckMessage="验证码错误",_this.nameCheckMessage="验证码失效，请重新获取",_this.nameCheckMessage="验证码获取次数过多，请明日再试"},validator:function(e){var t=this;if(this.$validator.errors.items.length>0)return!1;var a={validCode:t.validCode,id:t.id,isValid:1};r()({method:"post",url:"mcall/customer/send/code/v1/update",data:a,responseType:"json",header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:[function(e){return e="paramJson="+i()(e)}]}).then(function(a){a.data.responseStatus?e&&e():t.popup({text:"验证码错误",hasImg:"../../common/image/img00/signUpActivity/fail.png"}),console.log(a)}).catch(function(e){console.log("请求失败："+e)})},more:function(){this.moreFlag=!this.moreFlag},checkCode:function(){var e=this,t={typeId:"6",account:e.mobile,codeLength:"4",accountType:"0",operateType:"6"};r()({method:"post",url:"/mcall/customer/send/code/v1/create/",data:t,responseType:"json",header:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},transformRequest:[function(e){return e="paramJson="+i()(e)}]}).then(function(t){if(console.log(t),t.data.responseObject.responseStatus&&(e.validCode=t.data.responseObject.responseData.validCode,e.id=t.data.responseObject.responseData.responsePk,e.popupText="验证码已发送",e.popupImg="../../common/image/img00/signUpActivity/successful.png",setTimeout(function(){e.popupText=""},2e3),!e.checkClickStatus)){var a=10;e.checkMessage=a+"s",e.checkClickStatus=!0,e.time=setInterval(function(){a--,e.checkMessage=a+"S",0===a&&(clearInterval(e.time),e.checkMessage="重新获取",e.checkClickStatus=!1,a=10)},1e3)}})},validateBlur:function(e){console.log(this.$validator),this.$validator.validateAll(),this.errors.has(e)&&alert("11")},simulateSelect:function(){this.simulateSelectStatus=!this.simulateSelectStatus},select:function(e){switch(this.simulateSelectStatus=!1,e){case 0:break;case 1:this.selectValue="主任医生";break;case 2:this.selectValue="副主任医生";break;case 3:this.selectValue="主治医生";break;case 4:this.selectValue="其他"}}},mounted:function(){}}},1081:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{width:"100%",height:"100%"},on:{click:function(t){e.select(0)}}},[s("img",{staticClass:"banner",attrs:{src:a(1082)}}),e._v(" "),s("div",{staticClass:"content"},[s("img",{attrs:{src:a(1083)}}),e._v(" "),s("div",{staticClass:"content-information"},[s("div",{staticClass:"flagMessage"},[e._v("*请填写真实有效的信息")]),e._v(" "),s("ul",[s("li",[s("div",[s("span",{staticClass:"apply_title"},[e._v("姓名")]),e._v(" "),s("span",{staticClass:"apply_text"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"},{name:"validate",rawName:"v-validate",value:"required|special",expression:"'required|special'"}],staticClass:" name",attrs:{type:"text",placeholder:"填写真实姓名",maxlength:"40",name:"name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})])]),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("name"),expression:"errors.has('name')"}],staticClass:"nameErrorMessage error-message"},[e._v(e._s(e.errors.first("name")))])]),e._v(" "),s("li",[s("div",[s("span",{staticClass:"apply_title"},[e._v("医院")]),e._v(" "),s("span",{staticClass:"apply_text"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.hospital,expression:"hospital"},{name:"validate",rawName:"v-validate",value:"required|hospital",expression:"'required|hospital'"}],staticClass:"hospital",attrs:{type:"text",placeholder:"填写所在的医院",maxlength:"40",name:"hospital"},domProps:{value:e.hospital},on:{input:function(t){t.target.composing||(e.hospital=t.target.value)}}})])]),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("hospital"),expression:"errors.has('hospital')"}],staticClass:"nameHospitalMessage error-message"},[e._v(e._s(e.errors.first("hospital")))])]),e._v(" "),s("li",[s("div",[s("span",{staticClass:"apply_title"},[e._v("职称")]),e._v(" "),s("span",{staticClass:"apply_text"},[s("div",{staticClass:"simulateSelect"},[s("i",{class:e.simulateSelectStatus?"icon-up":"icon-down",on:{click:function(t){t.stopPropagation(),e.simulateSelect()}}}),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.selectValue,expression:"selectValue"}],attrs:{type:"text",readonly:"",placeholder:"请选择"},domProps:{value:e.selectValue},on:{click:function(t){t.stopPropagation(),e.simulateSelect()},input:function(t){t.target.composing||(e.selectValue=t.target.value)}}}),e._v(" "),s("ul",{directives:[{name:"show",rawName:"v-show",value:e.simulateSelectStatus,expression:"simulateSelectStatus"}]},[s("li",{class:{active:"主任医生"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(1)}}},[e._v("主任医生")]),e._v(" "),s("li",{class:{active:"副主任医生"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(2)}}},[e._v("副主任医生")]),e._v(" "),s("li",{class:{active:"主治医生"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(3)}}},[e._v("主治医生")]),e._v(" "),s("li",{class:{active:"其他"==this.selectValue},on:{click:function(t){t.stopPropagation(),e.select(4)}}},[e._v("其他")])])])])])]),e._v(" "),s("li",[s("div",[s("span",{staticClass:"apply_title"},[e._v("手机号")]),e._v(" "),s("span",{staticClass:"apply_text"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"},{name:"validate",rawName:"v-validate",value:"required|mobile",expression:"'required|mobile'"}],staticClass:"apply_text mobile",attrs:{type:"tel",placeholder:"填写真实手机号码 ",maxlength:"11",name:"phone"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})])]),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:e.errors.has("phone"),expression:"errors.has('phone')"}],staticClass:"nameMobileMessage error-message"},[e._v(e._s(e.errors.first("phone")))])]),e._v(" "),s("li",[s("div",[s("span",{staticClass:"apply_title"},[e._v("验证码")]),e._v(" "),s("span",{staticClass:"apply_text"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.checkInput,expression:"checkInput"}],staticClass:"apply_checkInput",attrs:{type:"tel",placeholder:"填写短信验证码",maxlength:"4"},domProps:{value:e.checkInput},on:{input:function(t){t.target.composing||(e.checkInput=t.target.value)}}}),e._v(" "),s("a",{staticClass:"apply_checkCode",class:{on:e.checkClickStatus},on:{click:function(t){e.checkCode()}}},[e._v(e._s(e.checkMessage))])])]),e._v(" "),s("p",{staticClass:"nameCheckMessage error-message"})])]),e._v(" "),s("a",{staticClass:"saveBtn",on:{click:function(t){e.validator(e.submit)}}})]),e._v(" "),s("div",{staticClass:"more",on:{click:function(t){e.more()}}},[s("img",{directives:[{name:"show",rawName:"v-show",value:e.moreFlag,expression:"moreFlag"}],attrs:{src:a(1084)}}),e._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:!e.moreFlag,expression:"!moreFlag"}],attrs:{src:a(1085)}})]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.moreFlag,expression:"moreFlag"}]},[s("img",{attrs:{src:a(1086)}})]),e._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:!e.moreFlag,expression:"!moreFlag"}],attrs:{src:a(1087)}}),e._v(" "),s("section",{staticClass:"middle-tip-modal popup",class:{show:e.popupText.length>0}},[s("figure",{staticClass:"middle-tip-box-text"},[s("p",{staticClass:"popup-text"},[e._v(e._s(e.popupText))])])])])])},staticRenderFns:[]}},1082:function(e,t,a){e.exports=a.p+"static/img/01.439dee2.png"},1083:function(e,t,a){e.exports=a.p+"static/img/02.4e13ef7.png"},1084:function(e,t,a){e.exports=a.p+"static/img/03.0fa2fe5.png"},1085:function(e,t,a){e.exports=a.p+"static/img/03-on.c5f9969.png"},1086:function(e,t,a){e.exports=a.p+"static/img/04.b6d5932.png"},1087:function(e,t,a){e.exports=a.p+"static/img/05.56e0171.png"},7:function(e,t){!function(e,t){function a(){var t=n.getBoundingClientRect().width;t/l>540&&(t=540*l);var a=t/10;n.style.fontSize=a+"px",p.rem=e.rem=a}var s,i=e.document,n=i.documentElement,o=i.querySelector('meta[name="viewport"]'),r=i.querySelector('meta[name="flexible"]'),l=0,c=0,p=t.flexible||(t.flexible={});if(o){console.warn("将根据已有的meta标签来设置缩放比例");var u=o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);u&&(c=parseFloat(u[1]),l=parseInt(1/c))}else if(r){var m=r.getAttribute("content");if(m){var d=m.match(/initial\-dpr=([\d\.]+)/),v=m.match(/maximum\-dpr=([\d\.]+)/);d&&(l=parseFloat(d[1]),c=parseFloat((1/l).toFixed(2))),v&&(l=parseFloat(v[1]),c=parseFloat((1/l).toFixed(2)))}}if(!l&&!c){var h=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),f=e.devicePixelRatio;l=h?f>=3&&(!l||l>=3)?3:f>=2&&(!l||l>=2)?2:1:1,c=1/l}if(n.setAttribute("data-dpr",l),!o)if(o=i.createElement("meta"),o.setAttribute("name","viewport"),o.setAttribute("content","initial-scale="+c+", maximum-scale="+c+", minimum-scale="+c+", user-scalable=no"),n.firstElementChild)n.firstElementChild.appendChild(o);else{var g=i.createElement("div");g.appendChild(o),i.write(g.innerHTML)}e.addEventListener("resize",function(){clearTimeout(s),s=setTimeout(a,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(s),s=setTimeout(a,300))},!1),"complete"===i.readyState?i.body.style.fontSize=12*l+"px":i.addEventListener("DOMContentLoaded",function(e){i.body.style.fontSize=12*l+"px"},!1),a(),p.dpr=e.dpr=l,p.refreshRem=a,p.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},p.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}))}},[1077]);