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

        if (!res.data.responseObject.responseStatus){
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          localStorage.removeItem("mobile");
          localStorage.removeItem("logoUrl");
        }else{
          console.log(res.data.responseObject.responsePk);
          localStorage.setItem("userId",res.data.responseObject.responsePk)
        }
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }
}
