/**
 * @Desc：微信认证
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjinglong on 17/12/11.
 */

import Isbinding from "./getPersonal";
import "babel-polyfill";

class Wxbinding {
  constructor() {}
  isBind(){
    let isBinding = new Isbinding();
    let customerId = localStorage.getItem("userId");
    isBinding.getMessage(customerId).then((res)=>{
      if(res && res.responseObject.responseData && res.responseObject.responseData.uniteFlagWeixin == 0){
        this.wxBind();
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  wxBind() {
    let appId = "",XHRUrl = "",envCode = "";
    if (window.location.origin.includes("localhost") || window.location.origin.includes("10.1")) {
      return false;
    }
    if (!window.location.hostname.includes("m9")) {
      envCode = 1;
    } else {
      envCode = 2;
    }

    if (envCode == 1) {
      appId = "wxe8384f7b06c169ef";
      XHRUrl = "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    } else if (envCode == 2) {
      appId = "wxaa5288ad7f627608";
      XHRUrl = "http://m9.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    }

    let encodeUrl = XHRUrl + "?ref=" + window.location.href.split('#')[0] + "&response_type=code&scope=snsapi_base&state=bundingWx#wechat_redirect",
      _encodeUrl = encodeURIComponent(encodeUrl);

    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + _encodeUrl;
  }
}

export default new Wxbinding();
