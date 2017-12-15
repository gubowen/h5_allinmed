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
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import showBigImg from '../../components/showBigImg';
import fastclick from 'fastclick';
import CheckLogin from 'common/js/auth/checkLogin';
import siteSwitch from 'common/js/siteSwitch/siteSwitch';
import wxBind from 'common/js/auth/wxBinding';
import api from 'common/js/util/util';

fastclick.attach(document.body);

class Myconsult {
  constructor() {
    //微信中绑定微信
    siteSwitch.weChatJudge(()=>{
      wxBind.isBind({
        callBack:()=>{
          this.init();
        }
      });
    },()=>{
      console.log("无需绑定微信");
      this.init();
    });
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
      },
      {
        path: "/showBigImg",
        name: "showBigImg",
        component: showBigImg,
        meta: {
          keepAlive: false
        },
      }
    ];
  }
}

new Myconsult();
