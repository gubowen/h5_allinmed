/**
 * @Desc：云信环境变量适配
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/10/9.
 */

import api from "common/js/util/util";
import ajax from "common/js/util/ajax";

const XHRList = "/mcall/im/interact/v1/getToken/";
export default function nimEnv() {
  const env = api.getCookie("env");
  const host = window.location.host;
  let nimKey = "";

  if (host === "m9.allinmed.cn" && env === "online") {
    /*
    * m1线上测试环境
    * 使用云信测试账号
    * */
    return new Promise((resolve, reject) => {
      ajax({
        url: XHRList,
        method: "POST",
        data: {
          firstResult: 0,
          maxResult: 1
        },
        done(res) {
          if (res.responseObject.responseStatus) {
            nimKey = res.responseData.accessKey;
            resolve(nimKey);
          }
        }
      })
    });
  } else {
    /*
    * 其余任何环境
    * 使用正式账号
    *
    * 注意，该key任何人员不允许修改
    * */
    return new Promise((resolve, reject) => {
      resolve("50c93d2ab7e207fd83231a245c07bfbc");
    })
  }
}
