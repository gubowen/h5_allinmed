/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 2017/12/21.
 */
import api from 'common/js/util/util';
import "babel-polyfill";


export default class CheckSubscribe{
  constructor(){

  }

  check(url){
    let appId = "",XHRUrl = "",envCode = "";
    if (window.location.origin.includes("localhost") || window.location.origin.includes("10")) {
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
    let encodeUrl = XHRUrl + "?ref=" + url + "&response_type=code&scope=snsapi_base&state=subscribe#wechat_redirect";

    if(api.getPara().isSubscribe==1) {
      localStorage.setItem("isSubscribe", "1");
    }else if (api.getPara().isSubscribe==0){
      localStorage.setItem("isSubscribe", "0");
    }else{
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeUrl;
    }
  }
}
