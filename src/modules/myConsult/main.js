/**
 * @Desc：问诊历史 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjingrong on 17/8/10.
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import consultHis from "./components/consultHis"
import uploadPic from "./components/upLoadPicHis"
import upLoadTip from 'components/shootTips';
import showBigImg from '../../components/showBigImg';
import wechat from 'components/followWechat';
import fastclick from 'fastclick';
import "static/css/base.css";

fastclick.attach(document.body);

class Myconsult {
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
    }).$mount("#myConsult");
  }
  routerStart() {
    this.routes = [
      {
        path: "/",
        redirect: "/consultHis",
      },{
        path: '/consultHis',
        name: "consultHis",
        component: consultHis,
        meta: {
          keepAlive: false
        }
      }, {
        path: '/uploadPic',
        name: "uploadPic",
        component: uploadPic,
        meta: {
          keepAlive: true
        }
      }, {
        path: "/upLoadTip",
        name: "upLoadTip",
        component: upLoadTip,
        meta: {
          keepAlive: true
        },
      },
      {
        path: "/showBigImg",
        name: "showBigImg",
        component: showBigImg,
        meta: {
          keepAlive: false
        },
      },{
        path: '/wechat',
        name: "wechat",
        meta: {
          keepAlive: false
        },
        component: wechat
      },{
        path: "*",
        redirect: "/consultHis"
      }
    ];
  }
}

new Myconsult();
