/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjingrong on 17/8/10.
 */
import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';

fastclick.attach(document.body);


class SignUp {
  constructor() {
    this.init();
  }

  init() {
    //Vue实例启动
    const app = new Vue({
      render: h => h(App)
    }).$mount("#signUpActivity");
  }
}


new SignUp();
