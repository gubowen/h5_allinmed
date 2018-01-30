/**
 * @Desc：登录注册 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjingrong on 17/12/6.
 */
import Vue from 'vue';
import App from './App';
import VeeValidator, {Validator}  from 'vee-validate';
import VueRouter from 'vue-router';
import login from './components/login';
import register from './components/register';
import loginRule from './components/loginRule';
import forgetPassword from './components/forgetPassword';
import wechat from 'components/followWechat';
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


    api.forbidShare();
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
    this.router = new VueRouter({
      routes: this.routes,
    });
    // Vue.use(vueg, this.router,options);
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
      },{
        path: "*",
        redirect: "/login",
      },
    ];
  }
}

Validator.extend('password', {
  getMessage:field=>"密码长度应在6-20位之间",

  validate: value => {
    return /^(\w){6,20}$/.test(value)
  }
});
Validator.extend('mobile', {
  getMessage:field=>"请填写真实手机号码",

  validate: value => {
    return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/).test(value)
  }
});

Validator.extend('special', {
  getMessage(field, args) {

  },
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/[`~!！？@#$%^&*()_+<>?:"{},，。.\/;'[\] ]/).test(value)
  }
});

Validator.extend('max_length', {
  getMessage(){

  },
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
  getMessage(){

  },
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(value)
  }
});
Validator.extend('noNumber', {
  getMessage(){

  },
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/^(?=.*\d.*\b)/).test(value)
  }
});


new MLogin();
