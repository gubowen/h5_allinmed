/**
 * @Desc：Vee-validate验证扩展项
 * @Usage:
 * @Notify：
 * @Depend：Vee-validate
 *
 * Created by Qiangkailiang on 17/8/11.
 */
import VeeValidator, {Validator}  from 'vee-validate';
class ValidateVerifiPolicy {
  constructor() {
    this.verifiPolicy();
  }

  verifiPolicy(){
    Validator.extend('mobile', {
      messages: {
        en: (field, args) => {
          return "请填写真实手机号码"
        },
        cn: (field, args) => {
          return "请填写真实手机号码"
        }
      },
      validate: value => {
        return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/).test(value)
      }
    });

    Validator.extend('special', {
      messages: {
        en: field => '请填写真实姓名，不能输入数字及特殊符号',
      },
      validate: value => {
        return !(/[`~!！？@#$%^&*()_+<>?:"{},，。.\/;'[\] ]/).test(value)
      }
    });

    Validator.extend('max_length', {
      messages: {
        en: field => '请填写真实姓名',
      },
      validate: (value,args) => {
        let len = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i].match(/[^\x00-\xff]/ig) !== null){
            len += 2;
          }
          else{
            len += 1;
          }
        }
        return len <= parseInt(args[0]);
      }
    });

    Validator.extend('isEmoji', {
      messages: {
        en: field => '请填写真实姓名，不能输入数字及特殊符号',
      },
      validate: value => {
        return !(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(value)
      }
    });
    Validator.extend('noNumber', {
      messages: {
        en: field => '请填写真实姓名，不能输入数字及特殊符号',
      },
      validate: value => {
        return !(/^(?=.*\d.*\b)/).test(value)
      }
    });
  }
}
let v=new ValidateVerifiPolicy();

export default v;
