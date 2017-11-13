/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/8/18.
 */
import api from '../util/util'
class wxStrings {
  constructor(Obj) {

  }
  //随机数
  mathRandomNum(Obj) {
    let code = "";
    let codeLength = Obj.numberValue,
      random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < codeLength; i++) {
      let index = Math.floor(Math.random() * 10);    //取得随机数的索引（0~35）
      code += random[index];
    }
    return code;
  }
  //随机串
  mathRandom(Obj) {
    let code = "";
    let codeLength = Obj.numberValue,
      random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < codeLength; i++) {
      let index = Math.floor(Math.random() * 36);    //取得随机数的索引（0~35）
      code += random[index];
    }
    return code.toLowerCase();
  }
  //获取token
  wxGetToken() {
    let _nonceStr = this.mathRandom({numberValue: 32});
    return new Promise(function (resolve, reject) {
      api.ajax({
        url: '/mcall/base/pay/external/v1/getToken/',
        method: "POST",
        data: {
          "roleId": 2,
          "nonceStr": _nonceStr,     //随机数
          "siteId": 1
        },
        done (data) {
          localStorage.setItem("validityTime", Math.round(new Date().getTime() / 1000));   //token
          localStorage.setItem("token", data.responseData.token);   //token
          localStorage.setItem("nonceStr", _nonceStr);              //随机数
          resolve({data: data, nonceStr: _nonceStr});
        }
      });
    })
  }
  checkToken(){
    let _validityTime = Math.round(new Date().getTime() / 1000),
      _validityLocal = localStorage.getItem("validityTime"),   //localStorage.getItem("validityTime")
      _checkKey = '';
    if (_validityLocal != null) {
      if (_validityTime - _validityLocal < 7200) {
        _checkKey = true;
      } else {
        _checkKey = false;
      }
    } else {
      _checkKey = false;
    }
    return _checkKey;
  }
  //获取openId
  checkOpenId(){
    let _openId = localStorage.getItem("openId"),
      _checkKey = '';
    if (_openId != null) {
      _checkKey = true;
    } else {
      _checkKey = false;
      if (sessionStorage.getItem("count") && sessionStorage.getItem("count").length > 0) {
        sessionStorage.removeItem("count");
      }
    }
    return _checkKey;
  }
  wxGetOpenId(){
    let _currentPageUrl = window.location.href,
      _encodeUrl = encodeURIComponent(_currentPageUrl);
    let _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
      "appid=wxaa5288ad7f627608" +
      "&redirect_uri=" + _encodeUrl +
      "&response_type=code" +
      "&scope=snsapi_userinfo" +
      "&state=STATE" +
      "#wechat_redirect";
    if (common.getpara().code) {
      if (window.location.href.indexOf("openId") === -1) {
        window.location.href = "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/" +
          "?ref=" + localStorage.getItem("currentUrl") +
          "&response_type=code" +
          "&scope=snsapi_base" +
          "&state=pay" +
          "&code=" + common.getpara().code +
          "#wechat_redirect";
      }
    } else {
      if (window.location.href.indexOf("openId") !== -1) {

        var count = sessionStorage.getItem("count");
        if (!count) {
          sessionStorage.setItem("count", 1);
          if (localStorage.getItem("currentUrl") && localStorage.getItem("currentUrl").indexOf("?") != -1) {
            window.location.href = localStorage.getItem("currentUrl") + "&openId=" + common.getpara().openId;
          } else {
            window.location.href = localStorage.getItem("currentUrl") + "?openId=" + common.getpara().openId;
          }
          localStorage.setItem("openId", common.getpara().openId);
        }

      } else {
        localStorage.setItem("currentUrl", _currentPageUrl);
        window.location.href = _url;
      }
    }
  }
}

export default new wxStrings();
