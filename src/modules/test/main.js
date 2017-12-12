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
import uploadPic from '../../components/uploadList';
import test from './components/test';
import api from "common/js/util/util";
import "babel-polyfill";

fastclick.attach(document.body);


class Test {
  constructor() {
    this.wxBind();
    // let that =this;
    // api.ajax({
    //   url: "/mcall/patient/customer/unite/v1/getPatientInfo/",
    //   method: "POST",
    //   data: {
    //     customerId: api.getPara().customerId
    //   },
    //   done(data) {
    //     if(data&&data.responseObject.responseData){
    //       if(data.responseObject.responseData.uniteFlagWeixin == 0){
    //
    //       }else{
    //         that.init();
    //       }
    //     }
    //   }
    // });
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
    }).$mount("#test");
  }
  routerStart() {
    this.routes = [
      {
        path: "/",
        redirect: "/test",
      },{
        path: '/test',
        name: "test",
        component: test,
        meta: {
          keepAlive: true
        }
      },{
        path: '/uploadPic',
        name: "uploadPic",
        component: uploadPic,
        meta: {
          keepAlive: true
        }
      }
    ];
  }
  wxBind() {
    /* env环境变量参数
     * 1代表唯医骨科-正式线上环境
     * 2代表唯仁唯医社区-线下调试环境
     *
     *
     */

    let appId = "";
    let XHRUrl = "";
    let _currentPageUrl = (window.location.origin + window.location.pathname + window.location.search),
      _encodeUrl = encodeURIComponent(_currentPageUrl);

    let envCode = "";
    if (window.location.origin.includes("localhost")) {
      return false;
    }
    if (!window.location.hostname.includes("m9")) {
      envCode = 1;
    } else {
      envCode = 2;
    }

    if (envCode == 1) {
      appId = "wxe8384f7b06c169ef";
      XHRUrl = "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    } else if (envCode == 2) {
      appId = "wxaa5288ad7f627608";
      XHRUrl = "http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    }

    let _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
      "appid=" + appId +
      "&redirect_uri=" + _encodeUrl +
      "&response_type=code" +
      "&scope=snsapi_userinfo" +
      "&state=STATE" +
      "#wechat_redirect";
    if (api.getPara().code) {
      window.location.href = XHRUrl +
        "?ref=" + (window.location.origin + window.location.pathname)+
        "&response_type=code" +
        "&scope=snsapi_base" +
        "&state=bundingWx" +
        "&code=" + api.getPara().code +
        "#wechat_redirect";
    } else {
      window.location.href = _url;
    }
  };
}
new Test();
