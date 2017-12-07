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
import VueRouter from 'vue-router';
import login from './components/login';
import forgetPassword from './components/forgetPassword';
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
  routerStart() {
    this.routes = [
      {
        path: "/",
        redirect: "/login",
      },{
        path: '/login',
        name: "login",
        component: login
      }, {
        path: '/forgetPassword',
        name: "forgetPassword",
        component: forgetPassword
      }
    ];
  }
}


new MLogin();
