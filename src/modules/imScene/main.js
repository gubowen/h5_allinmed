/**
 * @Desc：IM 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import vueg from 'vueg';
import Vuex from 'vuex';
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import fastclick from 'fastclick';

import BaseIm from "./components/baseIm";
import ShowBigImg from "components/showBigImg";
import MedicalReportDetail from "./components/medicalReportDetail";
import UploadList from "./components/uploadList";
import TriageDetail from "./components/triageDetail";
import knowledgeDetail from "./components/knowledgeDetail";

import store from "./store/store";
fastclick.attach(document.body);


class ImScene {
  constructor() {
    this.init();
  }

  init() {
    //表单验证注册
    //路由系统注册
    Vue.use(VueRouter);

    this.routerStart();
    this.registerRouter();
    //Vue实例启动
    const app = new Vue({
      store,
      router: this.router,
      render: h => h(App)
    }).$mount("#imScene");
  }

  //路由实例化生成
  registerRouter() {
    const options = {
      duration: '0.3',              //转场动画时长，默认为0.3，单位秒
      firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
      firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
      forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
      backAnim: 'fadeInRight',       //后退动画，默认为fedeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name: 'home'
      }, {
        name: 'my'
      }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
      tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
      disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    };

    this.router = new VueRouter({
      routes: this.routes,
    });
    Vue.use(vueg, this.router, options);
  }

  routerStart() {

    this.routes = [{
      path: "/",
      redirect: "/BaseIm",
    }, {
      path: "/BaseIm",
      name: "BaseIm",
      meta: {
        keepAlive: true
      },
      component: BaseIm
    }, {
      path: "/ShowBigImg",
      name: "showBigImg",
      meta: {
        keepAlive: true
      },
      component: ShowBigImg
    }, {
      path: "/MedicalReportDetail",
      name: "MedicalReportDetail",
      meta: {
        keepAlive: true
      },
      component: MedicalReportDetail
    }, {
      path: "/UploadList",
      name: "UploadList",
      meta: {
        keepAlive: true
      },
      component: UploadList
    }, {
      path: "/TriageDetail",
      name: "TriageDetail",
      meta: {
        keepAlive: false,
      },
      component: TriageDetail
    }, {
      path: "/knowledgeDetail",
      name: "knowledgeDetail",
      meta: {
        keepAlive: true
      },
      component: knowledgeDetail
      }
    ]
  }
}


let imScene = new ImScene();
