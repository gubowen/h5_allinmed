/*
/**
 * @D/esc：多图上传AJAX
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2018/1/12.
 */
import ajax from "../util/ajax";
export default function upLoadAjax() {
  return new Promise((resolve, reject) => {
    ajax({
      url: '/mcall/base/pay/external/v1/getToken/',
      method: "POST",
      data: {
        "roleId": 2,
        "nonceStr": _nonceStr, //随机数
        "siteId": 1
      },
      done(data) {
        localStorage.setItem("validityTime", Math.round(new Date().getTime() / 1000)); //token
        localStorage.setItem("token", data.responseData.token); //token
        localStorage.setItem("ipAddr", data.responseData.ipAddr); //token
        localStorage.setItem("nonceStr", _nonceStr); //随机数
        if (data && data.responseStatus) {
          resolve({
            data: data,
            nonceStr: _nonceStr
          });
        } else {
          reject(err);
        }
      }
    })
  })
}
