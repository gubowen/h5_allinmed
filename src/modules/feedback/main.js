/**
 * @Desc：注册 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */
import Vue from 'vue';
import App from './App';
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import  "../../common/js/third-party/jweixin-1.0.0.js"
import api from '../../common/js/util/util';
import fastclick from 'fastclick';
fastclick.attach(document.body);

class Contact {
  constructor() {
    this.init();
  }
  init() {
    //Vue实例启动
    const app = new Vue({
      render: h => h(App)
    }).$mount("#contactUs");
  }
}
let contact = new Contact();
