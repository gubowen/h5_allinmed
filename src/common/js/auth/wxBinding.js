/**
 * @Desc：微信认证
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjinglong on 17/12/11.
 */

import api from "common/js/util/util";
import Isbinding from "./getPersonal";

export default class Wxbinding {
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
    /* env环境变量参数
     * 1代表唯医骨科-正式线上环境
     * 2代表唯仁唯医社区-线下调试环境
     */

    let appId = "";
    let XHRUrl = "";
    let _currentPageUrl = (window.location.origin + window.location.pathname + window.location.search),
      _encodeUrl = encodeURIComponent(_currentPageUrl);

    let envCode = "";
    if (window.location.origin.includes("localhost")) {
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

    let _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
      "appid=" + appId +
      "&redirect_uri=" + _encodeUrl +
      "&response_type=code" +
      "&scope=snsapi_userinfo" +
      "&state=STATE" +
      "#wechat_redirect";
    if (api.getPara().code) {
      window.location.href = XHRUrl +
        "?ref=" + (window.location.origin + window.location.pathname)+
        "&response_type=code" +
        "&scope=snsapi_base" +
        "&state=bundingWx" +
        "&code=" + api.getPara().code +
        "#wechat_redirect";
    } else {
      window.location.href = _url;
    }
  }
}

let wxApprove = new Wxbinding();
