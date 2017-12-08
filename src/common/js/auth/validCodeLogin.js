/**
 * @Desc：验证码登录
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/12/08.
 */

import api from "common/js/util/util";
const XHRList = {
  validLogin: "/mcall/customer/send/code/v1/validCodelogin/"
};
export default class ValidCodeLogin {
  constructor() {

  }

  validInit(param) {
    return new Promise((resolve, reject) => {
      api.ajax({
        url: XHRList.validLogin,
        method: "POST",
        data: {
          userType: 1,
          account: param.account,
          isValid: 1,
          codeId: param.codeId,
          validCode: param.validCode,
          password: param.password,
          optType: 1,
          typeId: param.typeId
        },
        timeout: 10000,
        done(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
          throw new Error(err);
        }
      })
    })
  }
}
