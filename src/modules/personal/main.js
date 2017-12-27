/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by zhangheng on 17/8/10.
 */
import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';
import Router from "vue-router";
import VeeValidator, {Validator}  from 'vee-validate';
import store from "./store/store.js"
import "static/css/base.css";
import '../../common/js/util/util';
fastclick.attach(document.body);
import routes from "./router/router.config"
import "babel-polyfill";
class Personal {
  constructor() {
    this.init();
  }
  init() {
    //Vue实例启动
    // console.log("启动");
    //表单验证
    Vue.use(VeeValidator);
    //注册路由
    Vue.use(Router);
    const router = new Router(routes);
    const app = new Vue({
      render: h => h(App),
      store,
      router,
    }).$mount("#personal");

  }
}


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
new Personal();
