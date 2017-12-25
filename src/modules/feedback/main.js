import Vue from 'vue';
import 'static/js/third-party/flexible.js';
import 'scss/base.scss';
import App from './App';
import Router from 'vue-router';
import routes from "./router/router.config"
/* eslint-disable no-new */
Vue.use(Router);
const router  = new Router(routes);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
