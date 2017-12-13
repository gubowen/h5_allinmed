/**
 * @Desc：检测登录状态
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/12/7.
 */
import axios from "axios";

const XHRList = {
  getCheckSession: "/mcall/patient/customer/unite/v1/checkSession/"
}

export default class checkSession {
  constructor() {

  }

  getStatus() {
    return new Promise((resolve, reject) => {
      axios({
        url: XHRList.getCheckSession,
        method: "POST",
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 30000
      }).then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }
}