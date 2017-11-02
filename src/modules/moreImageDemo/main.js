
import Vue from 'vue';
import App from './App';
import "static/css/base.css";

class MoreImage {
  constructor() {
        this.init();
  }
init(){
  const app = new Vue({
    render: h => h(App)
  }).$mount("#moreImage");
}
}

new MoreImage();
