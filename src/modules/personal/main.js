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
import vueg from 'vueg';
import 'vueg/css/transition-min.css'
class Personal {
  constructor() {
    this.init();
  }
  init() {
    //Vue实例启动
    // console.log("启动");
    //表单验证
    const options={
      duration: '0.3',              //转场动画时长，默认为0.3，单位秒
      firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
      firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
      forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
      backAnim: 'fadeInLeft',       //后退动画，默认为fadeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name:'personalIndex'
      },{
        name:'bindAccount'
      },{
        name:'changePsw'
      },{
        name:'createPsw'
      },{
        name:'createPsw'
      },{
        name:'followWechat'
      },{
        name:'verificationCode'
      },{
        name:'aboutAllinmed'
      },{
        name:"contactUs"
      },{
        name:"changePhone"
      }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
      tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
      disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    };
    Vue.use(VeeValidator);
    //注册路由
    Vue.use(Router);
    const router = new Router(routes);
    const app = new Vue({
      render: h => h(App),
      store,
      router,
    }).$mount("#personal");
    Vue.use(vueg, router,options);
  }
}


Validator.extend('mobile', {
  getMessage(){

  },
  messages: {
    en: (field, args) => {
      return "请填写真实手机号码"
    },
    cn: (field, args) => {
      return "请填写真实手机号码"
    }
  },
  validate: value => {
    return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/).test(value)
  }
});
new Personal();
