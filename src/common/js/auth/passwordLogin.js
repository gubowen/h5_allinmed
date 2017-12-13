/**
 * @Desc：账号密码登录
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/12/08.
 */


import ajax from "common/js/util/ajax";
import api from "common/js/util/util";
const XHRList = {
  login: "/mcall/patient/customer/unite/v1/accountlogin/"
}

export default class PassLogin {
  constructor() {

  }

  loginInit(param) {
    return new Promise((resolve, reject) => {
      ajax({
        url: XHRList.login,
        method: "POST",
        data: {
          siteId: api.getSiteId(),
          account: param.account,
          password: param.password
        },
        timeout: 10000,
        done(res) {
          resolve(res);
        },
        fail(err) {
          if (err) {
            reject(err);
            throw new Error(err);
          }
        }
      })
    })
  }
}
