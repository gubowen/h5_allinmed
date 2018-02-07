/**
 * @Desc：首页 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by gubowen on 17/12/04.
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import fastclick from 'fastclick';
import "static/css/base.css";
import route from "./route/route.config";
import store from "./store/store";
import "babel-polyfill";
fastclick.attach(document.body);

/* eslint-disable no-new */


class Home{
  constructor(){
      this.init();
  }

  init(){
    Vue.use(VueRouter);

    this.registerRouter();

    this.goToRouter();

    //Vue实例启动
    new Vue({
      el: '#app',
      store,
      router: this.router,
      render: h => h(App)
    });
  }

  //路由实例化生成
  registerRouter(){
    const options={
      duration: '0.3',              //转场动画时长，默认为0.3，单位秒
      firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
      firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
      forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
      backAnim: 'fadeInRight',       //后退动画，默认为fedeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name:'home'
      },{
        name:'my'
      }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
      tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
      disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    };
    this.router = new VueRouter({
      routes: route,
    });
  }

  //抓取缓存跳转当前路由页
  //Vue-router自身带有保存机制，参数通过query传递即可
  goToRouter() {
    // const path=localStorage.getItem("currentPath")?localStorage.getItem("currentPath"):"addPatient";
    // this.router.push("addPatient");
  }
}

let home = new Home();
if (module.hot) {
  module.hot.accept();
}
