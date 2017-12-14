/**
 * @Desc：微信认证
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjinglong on 17/12/11.
 */

import PersonalInfo from "./getPersonal";
import api from 'common/js/util/util';
import "babel-polyfill";

class Wxbinding {
  constructor() {}
  isBind(obj){
    let cId = "";
    let personalInfo = new PersonalInfo();

    if(api.getPara().customerId && api.getPara().customerId != 0){
      cId = api.getPara().customerId;
    }else{
      cId = localStorage.getItem('userId');
    }

    if(cId){
      personalInfo.getMessage(cId).then((res)=>{
        if(res && res.responseObject.responseData){
          let result = res.responseObject.responseData;
          if(result.mobile&&result.mobile.length>0){
            if(result.uniteFlagWeixin == 1){
              console.log("该用户已绑定手机号（微信）");
              obj.callBack && obj.callBack();
            }else{
              let url = `${window.location.origin}${window.location.pathname}?customerId=${localStorage.getItem('userId')}`;
              this.wxBind(url);
            }
          }else{
            window.location.href = `/dist/mLogin.html?customerId=${cId}#/register`;
          }
        }else{
          console.log("获取个人信息失败");
        }
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      if(api.getPara().wxState == 0){
        console.log("绑定微信成功");
        obj.callBack && obj.callBack();
      }else if(api.getPara().wxState == 1){
        console.log("您已绑定其他用户");
      }else if(api.getPara().wxState == 2){
        console.log("绑定失败");
      }else{
        window.location.href = `/dist/mLogin.html`;
      }
    }



    // let isBinding = new Isbinding();
    // let customerId = localStorage.getItem("userId");
    // if(!(api.getPara().wxState || api.getPara().wxState == 0)){
    //   // alert(localStorage.getItem('protoUrl'));
    //   // window.location.href = localStorage.getItem('protoUrl') + '&wxState=' + api.getPara().wxState;
    //   isBinding.getMessage(customerId).then((res)=>{
    //     if(res && res.responseObject.responseData && res.responseObject.responseData.uniteFlagWeixin == 0){
    //       this.wxBind();
    //     }
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
    // }
  }
  wxBind(url) {
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


    let encodeUrl = XHRUrl + "?ref=" + url + "&response_type=code&scope=snsapi_base&state=bundingWx#wechat_redirect";

    // alert(encodeUrl);
    if(!api.getPara().code){
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeUrl;
    }
  }




}

export default new Wxbinding();
