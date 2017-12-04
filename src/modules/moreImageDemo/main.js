
import Vue from 'vue';
import App from './App';
import vueRouter from 'vue-router';
import VueLazyLoad from 'vue-lazyload';
import moreImage from './components/main';
import followWX from 'components/followWechat';
import "static/css/base.css";

class MoreImage {
  constructor() {
    this.init();
  }
init(){
  Vue.use(vueRouter);
  Vue.use(VueLazyLoad,{
    preLoad: 1,
    error:require('../../common/image/imScene/error_tips.png'),
    loading:require('../../common/image/imScene/chat_play.png'),
    attempt:3,
    listenEvents:['scroll']
  });

  const app = new Vue({
    router: new vueRouter({
      routes: [
        {
          path: "/",
          redirect: "/moreImage",
        }, {
          path: '/moreImage',
          name: "moreImage",
          component: moreImage
        },{
          path: '/followWX',
          name: "followWX",
          component: followWX
        }
      ]
    }),
    render: h => h(App)
  }).$mount("#moreImage");
}
}

new MoreImage();
