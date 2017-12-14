/**
 * @Desc：医生主页 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */
import Vue from 'vue';
import App from './App';
import VeeValidator, {Validator}  from 'vee-validate';
import VueRouter from 'vue-router';
import doctorMain from './components/doctorMain';
import individualInfo from './components/individualInfo';
import clinicDetails from './components/clinicDetails';
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import  "../../common/js/third-party/jweixin-1.0.0.js"
import CheckLogin from 'common/js/auth/checkLogin';
import siteSwitch from 'common/js/siteSwitch/siteSwitch';
import wxBind from 'common/js/auth/wxBinding';
import api from 'common/js/util/util';
import fastclick from 'fastclick';
import WxPayCommon from '../../common/js/wxPay/wxComm';
// import vconsole from 'vconsole';
// import eruda from 'eruda'
fastclick.attach(document.body);


class Consult {
  constructor() {
    let checkLogin = new CheckLogin();
    checkLogin.getStatus().then((res)=>{
      if(res.data.responseObject.responseStatus){
        this.init();
      }else{
        window.location.href = '/dist/mLogin.html';
      }
    })
  }

  init() {
    //微信中绑定微信
    siteSwitch.weChatJudge(()=>{
      wxBind.isBind();
    },()=>{
      console.log("无需绑定微信");
    });

    //路由系统注册
    Vue.use(VeeValidator);
    Vue.use(VueRouter);

    this.routerStart();
    this.registerRouter();
    this.goToRouter();
    // this.forbidShare();
    //Vue实例启动
    const app = new Vue({
      router: this.router,
      render: h => h(App)
    }).$mount("#doctorHome");
  }

  //路由实例化生成
  registerRouter() {
    const options={
      duration: '0.3',              //转场动画时长，默认为0.3，单位秒
      firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
      firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
      forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
      backAnim: 'fadeInRight',       //后退动画，默认为fedeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name:'home'
      },{
        name:'my'
      }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
      tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
      disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    };
    this.router = new VueRouter({
      routes: this.routes,
      scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
      }
    });
    // Vue.use(vueg, this.router,options);
  }

  //路由注册
  routerStart() {
    this.routes = [
      {
        path:"/",
        redirect:"/doctorMain"
      },
      {
        path: "/doctorMain",
        name: "doctorMain",
        component: doctorMain,
        meta: {
          keepAlive: false
        },
      },
      {
        path: "/clinicDetails",
        name: "clinicDetails",
        component: clinicDetails,
        meta: {
          keepAlive: false
        },
      },
      {
        path: "/individualInfo",
        name: "individualInfo",
        component: individualInfo,
        meta: {
          keepAlive: true
        },
      }
    ];
  }

  //抓取缓存跳转当前路由页
  //Vue-router自身带有保存机制，参数通过query传递即可
  goToRouter() {
    // const path=localStorage.getItem("currentPath")?localStorage.getItem("currentPath"):"addPatient";
    // this.router.push("addPatient");
  }

  //禁用微信内置分享---(如果想开放分享，则在url中拼接ishare=1)
  forbidShare(){
    api.ajax({
      url: "/mcall/wx/api/v1/getJSConfig/",
      method: 'POST',
      data: {
          url: window.location.href
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      done: function (data) {
        if (data.responseObject.responseData && data.responseObject.responseStatus) {
          let item = data.responseObject.responseData;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: item.appId, // 必填，公众号的唯一标识
            timestamp: item.timestamp, // 必填，生成签名的时间戳
            nonceStr: item.noncestr, // 必填，生成签名的随机串
            signature: item.signature,// 必填，签名，见附录1
            jsApiList: [
              "onMenuShareTimeline",
              "hideOptionMenu",
              "showOptionMenu",
              "getNetworkType",
              "getLocation",
              "openLocation",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "getLocalImgData",
              "scanQRCode",
              "hideMenuItems"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function(){
            console.log("成功了");
            wx.hideOptionMenu();
          });
          wx.error(function(res){
            console.log(res);
          });
        }
      },
      fail:function (err) {
        document.querySelector(".ev-loading").style.display="none";
      }
  })
}
}


let consult = new Consult();

Validator.extend('mobile', {
  messages: {
    en: (field, args) => {
      return "请填写真实手机号码"
    },
    cn: (field, args) => {
      return "请填写真实手机号码"
    }
  },
  validate: value => {
    return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/).test(value)
  }
});

Validator.extend('special', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/[`~!！？@#$%^&*()_+<>?:"{},，。.\/;'[\] ]/).test(value)
  }
});

Validator.extend('max_length', {
  messages: {
    en: field => '请填写真实姓名',
  },
  validate: (value,args) => {
    let len = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i].match(/[^\x00-\xff]/ig) !== null){
        len += 2;
      }
      else{
        len += 1;
      }
    }
    return len <= parseInt(args[0]);
  }
});

Validator.extend('isEmoji', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(value)
  }
});
Validator.extend('noNumber', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/^(?=.*\d.*\b)/).test(value)
  }
});
