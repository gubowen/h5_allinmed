import Vue from 'vue';
import App from './App';
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import  "../../common/js/third-party/jweixin-1.0.0.js"
class Contact {
  constructor() {
    this.init();
  }
  init() {
    const app = new Vue({
      render: h => h(App)
    }).$mount("#feedback");
  }
}
let contact = new Contact();
