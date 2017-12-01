/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by ? on 17/8/10.
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import fastclick from 'fastclick';
import "static/css/base.css";
import WxPayCommon from '../../common/js/wxPay/wxComm';
import uploadPic from '../../components/uploadList';
import test from './components/test';
import "babel-polyfill";

fastclick.attach(document.body);


class Test {
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
    }).$mount("#test");
  }
  routerStart() {
    this.routes = [
      {
        path: "/",
        redirect: "/test",
      },{
        path: '/test',
        name: "test",
        component: test,
        meta: {
          keepAlive: true
        }
      },{
        path: '/uploadPic',
        name: "uploadPic",
        component: uploadPic,
        meta: {
          keepAlive: true
        }
      }
    ];
  }
}
new Test();
