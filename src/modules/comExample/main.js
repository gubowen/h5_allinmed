import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import "static/css/base.css";
import "babel-polyfill";
import "common/js/third-party/flexible";
import indexs from "./components/index";
import buttons from "./components/button";
import Switch from "./components/switch";
import MultipleChoice from "./components/MultipleChoice";
import SingleChoice from "./components/SingleChoice";


class ComExample {
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
    }).$mount("#comExample");
  }
  routerStart() {
    this.routes = [
      {
        path:"/",
        redirect:"/indexs"
      },{
        path: '/indexs',
        name: "indexs",
        component: indexs
      },{
        path: '/buttons',
        name: "buttons",
        component: buttons
      },{
        path: '/switch',
        name: "switch",
        component: Switch
      },
      {
        path: '/MultipleChoice.vue',
        name: "MultipleChoice",
        component: MultipleChoice
      },{
        path: '/SingleChoice',
        name: "SingleChoice",
        component: SingleChoice
      },

    ];
  }
}
new ComExample();
