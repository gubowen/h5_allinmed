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
import addPatient from './components/addPatient';
import selectPart from './components/selectPart';
import discription from './components/discription';
import history from './components/history';
import upLoadTip from './components/upLoadTip';
import conGuide from './components/consultGuide';
import showBigImg from 'components/showBigImg';
import followWechat from 'components/followWechat';
// import vueg from 'vueg'
// import 'vueg/css/transition-min.css';
import "static/css/base.css";
import CheckLogin from 'common/js/auth/checkLogin';
import api from 'common/js/util/util';
import selectArea from 'components/selectArea';
import siteSwitch from 'common/js/siteSwitch/siteSwitch';
import wxBind from 'common/js/auth/wxBinding';
import searchList from 'components/searchList';
import fastclick from 'fastclick';

import valiadteMethods from '../../common/js/util/validate_methods';
// fastclick.attach(document.body);

class Consult {
  constructor() {
    //ios中Safari禁止缩放（并不能完全禁止）
    api.banZoom();
    let checkLogin = new CheckLogin();
    checkLogin.getStatus().then((res)=>{
      if(res.data.responseObject.responseStatus){
        this.init();
      }else{
        window.location.href = '/dist/mLogin.html';
      }
    })
  }

  init() {
    //微信中绑定微信
    siteSwitch.weChatJudge(()=>{
      wxBind.isBind();
    },()=>{
      console.log("无需绑定微信");
    });

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
      backAnim: 'fadeInLeft',       //后退动画，默认为fadeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name:'addPatient'
      },{
        name:'selectArea'
      },{
        name:'selectPart'
      },{
        name:'discription'
      },{
        name:'history'
      },{
        name:'upLoadTip'
      },{
        name:'searchList'
      },{
        name:'showBigImg'
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
    // this.router.afterEach((to,from)=>{
    //   $(window).trigger("hashchange");
    // })
    // Vue.use(vueg, this.router,options);
  }

  //路由注册
  routerStart() {
    this.routes = [
      {
        path:"/",
        redirect:"/addPatient"
      },
      {
        path: '/addPatient',
        name: "addPatient",
        component: addPatient,
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/selectPart',
        name: "selectPart",
        component: selectPart,
        meta: {
          keepAlive: false
        },
      },
      {
        path: '/discription',
        name: "discription",
        component: discription,
        meta: {
          keepAlive: false
        },
      },
      {
        path: '/searchList',
        name: "searchList",
        component: searchList,
        meta: {
          keepAlive: false
        },
      },
      {
        path: '/selectArea',
        name: "selectArea",
        component: selectArea,
        meta: {
          keepAlive: false
        },
      },
      {
        path: '/history',
        name: "history",
        component: history,
        meta: {
          keepAlive: true
        },
      },
      {
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
      },
      {
        path:"/conGuide",
        name:"conGuide",
        component:conGuide,
        meta: {
          keepAlive: false
        }
      },
      {
        path:"/followWechat",
        name:"followWechat",
        component:followWechat,
        meta: {
          keepAlive: false
        }
      }
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
