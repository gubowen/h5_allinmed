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
import "babel-polyfill";

fastclick.attach(document.body);


class Test {
  constructor() {
    this.init();
  }
  init() {
    Vue.use(VueRouter);
    //Vue实例启动
    const app = new Vue({
      // router: this.router,
      render: h => h(App)
    }).$mount("#test");
  }
}
new Test();
