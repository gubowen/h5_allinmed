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
import "static/css/base.css";
import fastclick from 'fastclick';


fastclick.attach(document.body);


class Test {
  constructor() {
    this.init();
  }

  init() {
    const app = new Vue({
      render: h => h(App)
    }).$mount("#test");
  }
}


new Test();
