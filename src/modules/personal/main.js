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
import Router from "vue-router"
import store from "./store/store.js"
import "static/css/base.css";
import api from '../../common/js/util/util';
fastclick.attach(document.body);
import routes from "./router/router.config"
import "babel-polyfill";
class Personal {
  constructor() {
    this.init();
  }
  init() {
    console.log("启动")
    //Vue实例启动
    Vue.use(Router);
    const router = new Router(routes);
    const app = new Vue({
      render: h => h(App),
      store,
      router,
    }).$mount("#personal");

  }
}






new Personal();
