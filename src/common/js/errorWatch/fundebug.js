/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 2018/1/15.
 */
import Vue from "vue";
import fundebug from "fundebug-javascript";
import siteEnv from "common/js/siteEnv/dev.env";

export default function () {
  if (siteEnv() === "production") {
    fundebug.apikey = "617001e96c72b7b07126e74ab5c611c473d5f6396e63c1e5a9eef8b98cae3830";

    Vue.config.errorHandler = function (err, vm, info) {
      let componentName = formatComponentName(vm);
      let propsData = vm.$options && vm.$options.propsData;

      fundebug.notifyError(err, {
        metaData: {
          componeSntName: componentName,
          propsData: propsData,
          info: info
        }
      });
    };
  }

}

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  let name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}
