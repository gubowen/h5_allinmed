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
import VueRouter from 'vue-router';
import login from './components/login';
import register from './components/register';
import loginRule from './components/loginRule';
import forgetPassword from './components/forgetPassword';
import wechat from 'components/followWechat';
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import fastclick from 'fastclick';


fastclick.attach(document.body);


class MLogin {
  constructor() {
    this.init();
  }

  init() {
    Vue.use(VueRouter);
    this.routerStart();
    this.registerRouter();
    //vue路由
    this.router = new VueRouter({
      routes: this.routes,
    });
    //Vue实例启动
    const app = new Vue({
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
        component: login
      },{
        path: '/loginRule',
        name: "loginRule",
        component: loginRule
      },{
        path: '/forgetPassword',
        name: "forgetPassword",
        component: forgetPassword
      },{
        path: '/wechat',
        name: "wechat",
        component: wechat
      },{
        path: '/register',
        name: "register",
        component: register
      }
    ];
  }
}


new MLogin();
