/**
 * @Desc：找回密码
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 17/12/08.
 */


import api from "common/js/util/util";
const XHRList = {
    searchPasswordUrl: "/mcall/patient/customer/send/code/v1/searchPassword/"
};
export default class searchPassword {
  constructor() {

  }

  searchInit(param) {
    return new Promise((resolve, reject) => {
      api.ajax({
        url: XHRList.searchPasswordUrl,
        method: "POST",
        data: {
          userType: 1,
          account: param.account, //账号
          codeId: param.codeId,
          validCode: param.validCode,
          isValid: 1,
          password: param.password,
          optType: 1,
          typeId: 1
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
