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
import VeeValidator, {Validator}  from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';//引入中文文件
fastclick.attach(document.body);

class SignUp {
  constructor() {
    this.init();
  }

  init() {
    Validator.addLocale(zh_CN);
    const config = {
      locale: 'zh_CN'
    };
    Vue.use(VeeValidator, config);
    //Vue实例启动
    const app = new Vue({
      render: h => h(App)
    }).$mount("#signUpActivity");

  }
}

const dictionary = {
  zh_CN: {
    message: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => "请输入" + field
    },
    attributes: {
      phone: '手机号',
      name: '姓名',
      hospital: '医院'
    }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('special', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
    zh_CN: (field, args) => {
      return "请填写真实姓名，不能输入数字及特殊符号"
    }
  },
  validate: value => {
    return !(/[`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\]\d]/).test(value)
  }
});

Validator.extend('hospital', {
  messages: {
    en: field => '请填写真实医院名称',
    zh_CN: (field, args) => {
      return "请填写真实医院名称"
    }
  },
  validate: value => {
    return !(/[`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\]]/).test(value)
  }
});

Validator.extend('mobile', {
  messages: {
    en: (field, args) => {
      return "请填写真实手机号码"
    },
    cn: (field, args) => {
      return "请填写真实手机号码"
    },
    zh_CN: (field, args) => {
      return "请填写真实手机号码"
    }
  },
  validate: value => {
    return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/).test(value)
  }
});

new SignUp();
