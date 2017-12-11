/**
 * @Desc：患者咨询 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */
import Vue from 'vue';
import App from './App';
import VeeValidator, {Validator}  from 'vee-validate';
import VueRouter from 'vue-router';
import vueg from 'vueg'
import 'vueg/css/transition-min.css';
import "static/css/base.css";
import CheckLogin from 'common/js/auth/checkLogin';
import api from '../../common/js/util/util';

import valiadteMethods from '../../common/js/util/validate_methods';

import fastclick from 'fastclick';
import selectArea from 'components/selectArea';
// import medicalInfo from './components/medicalInfo';
import patientInfo from './components/patientInfo';

fastclick.attach(document.body);


class Consult {
  constructor() {
    let checkLogin = new CheckLogin();
    checkLogin.getStatus().then((res)=>{
      if(res.data.responseObject.responseStatus){
        this.init();
      }else{
        window.location.href = '/mLogin.html';
      }
    })
  }

  init() {

    //表单验证注册
    //路由系统注册
    Vue.use(VeeValidator);
    Vue.use(VueRouter);

    this.routerStart();
    this.registerRouter();
    this.goToRouter();
    //Vue实例启动
    const app = new Vue({
      router: this.router,
      render: h => h(App)
    }).$mount("#patientConfult");
  }

  //路由实例化生成
  registerRouter() {
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
      routes: this.routes,
      scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
      }
    });
   // Vue.use(vueg, this.router,options);
  }

  //路由注册
  routerStart() {
    this.routes = [
      {
        path:"/",
        redirect:"/patientInfo"
      },
      // {
      //   path: '/medicalInfo',
      //   name: "medicalInfo",
      //   component: medicalInfo,
      //   meta: {
      //     keepAlive: true
      //   },
      // },
      {
        path: '/patientInfo',
        name: "patientInfo",
        component: patientInfo,
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/selectArea',
        name: "selectArea",
        component: selectArea,
        meta: {
          keepAlive: true
        },
      },
    ];
  }

  //抓取缓存跳转当前路由页
  //Vue-router自身带有保存机制，参数通过query传递即可
  goToRouter() {
    // const path=localStorage.getItem("currentPath")?localStorage.getItem("currentPath"):"addPatient";
    // this.router.push("addPatient");
  }
}


let consult = new Consult();
