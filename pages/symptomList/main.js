/**
 * @Desc：复诊单 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import vueg from 'vueg'
import VeeValidator, {Validator}  from 'vee-validate';
import mainSymptom from "./components/mainSymptom"
import discription from "./components/discription"
import selectArea from 'components/selectArea';
import fixMedical from './components/fixMedical';
import fixPhone from './components/fixPhone';
import complication from './components/complication';
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import fastclick from 'fastclick';


fastclick.attach(document.body);


class SymptomLists {
  constructor() {
    this.init();
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
    }).$mount("#symptomLists");
  }

  //路由实例化生成
  registerRouter() {
    // const options={
    //   duration: '0.3',              //转场动画时长，默认为0.3，单位秒
    //   firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
    //   firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
    //   forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
    //   backAnim: 'fadeInRight',       //后退动画，默认为fedeInLeft
    //   sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
    //   tabs: [{
    //     name:'home'
    //   },{
    //     name:'my'
    //   }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
    //   tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
    //   disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    // }

    this.router = new VueRouter({
      routes: this.routes,
    });
    // Vue.use(vueg, this.router,options);
  }

  routerStart() {
    this.routes = [
      {
        path: '/mainSymptom',
        name: "mainSymptom",
        component: mainSymptom,
        meta: {
          keepAlive: true
        },
      }, {
        path: '/discription',
        name: "discription",
        component: discription,
        meta: {
          keepAlive: false
        },
      }, {
        path: '/selectArea',
        name: "selectArea",
        component: selectArea,
        meta: {
          keepAlive: true
        }
      },{
        path: '/fixPhone',
        name: "fixPhone",
        component: fixPhone,
        meta: {
          keepAlive: false
        }
      },{
        path: '/fixMedical',
        name: "fixMedical",
        component: fixMedical,
        meta: {
          keepAlive: false
        }
      },{
        path: '/complication',
        name: "complication",
        component: complication,
        meta: {
          keepAlive: false
        }
      }
    ];
  }


  goToRouter() {
    // this.router.push("mainSymptom");
  }
}


let symptomLists = new SymptomLists();
Validator.extend('mobile', {
  messages: {
    en: (field, args) => {
      return "请填写真实手机号码"
    },
    cn: (field, args) => {
      return "请填写真实手机号码"
    }
  },
  validate: value => {
    return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/).test(value)
  }
});
