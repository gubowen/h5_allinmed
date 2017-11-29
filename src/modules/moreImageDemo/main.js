
import Vue from 'vue';
import App from './App';
import VueLazyLoad from 'vue-lazyload';
import "static/css/base.css";

class MoreImage {
  constructor() {
    this.init();
  }
init(){
  Vue.use(VueLazyLoad,{
    preLoad: 1,
    error:require('../../common/image/imScene/error_tips.png'),
    loading:require('../../common/image/imScene/chat_play.png'),
    attempt:3,
    listenEvents:['scroll']
  });

  const app = new Vue({
    render: h => h(App)
  }).$mount("#moreImage");
}
}

new MoreImage();
