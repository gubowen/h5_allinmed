/**
 * @Desc：登录注册 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjingrong on 17/12/6.
 */
import Vue from 'vue';
import vueg from 'vueg'
import App from './App';
import VeeValidator, {Validator}  from 'vee-validate';
import VueRouter from 'vue-router';
import login from './components/login';
import register from './components/register';
import loginRule from './components/loginRule';
import forgetPassword from './components/forgetPassword';
import wechat from 'components/followWechat';
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import fastclick from 'fastclick';
import store from "./store/store";
import valiadteMethods from '../../common/js/util/validate_methods';
import CheckSubscribe from "common/js/auth/checkSubscribe";
import siteSwitch from "common/js/siteSwitch/siteSwitch";
import api from '../../common/js/util/util';
// fastclick.attach(document.body);


const checkSubscribe=new CheckSubscribe();
class MLogin {
  constructor() {
    this.init();
  }

  init() {



    Vue.use(VueRouter);
    Vue.use(VeeValidator);//vue使用验证插件

    this.routerStart();
    this.registerRouter();
    //vue路由
    this.router = new VueRouter({
      routes: this.routes,
    });
    //Vue实例启动
    const app = new Vue({
      store,
      router: this.router,
      render: h => h(App)
    }).$mount("#mLogin");
  }

  //路由实例化生成
  registerRouter () {
    const options={
      duration: '0.3',              //转场动画时长，默认为0.3，单位秒
      firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
      firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
      forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
      backAnim: 'fedeInLeft',       //后退动画，默认为fedeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name:'login'
      },{
        name:'register'
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
    Vue.use(vueg, this.router,options);
  }

  routerStart() {
    this.routes = [
      {
        path: "/",
        redirect: "/login",
      },{
        path: '/login',
        name: "login",
        meta: {
          keepAlive: false
        },
        component: login
      },{
        path: '/loginRule',
        name: "loginRule",
        meta: {
          keepAlive: false
        },
        component: loginRule
      },{
        path: '/forgetPassword',
        name: "forgetPassword",
        meta: {
          keepAlive: false
        },
        component: forgetPassword
      },{
        path: '/wechat',
        name: "wechat",
        meta: {
          keepAlive: false
        },
        component: wechat
      },{
        path: '/register',
        name: "register",
        meta: {
          keepAlive: true
        },
        component: register
      }
    ];
  }
}


// Validator.extend('mobile', {
//   messages: {
//     en: (field, args) => {
//       return "请填写真实手机号码"
//     },
//     cn: (field, args) => {
//       return "请填写真实手机号码"
//     }
//   },
//   validate: value => {
//     return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/).test(value)
//   }
// });

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


new MLogin();
if (module.hot) {
  module.hot.accept();
}
