/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/7/4.
 */
//openId check

common.checkOpenId = function () {
  var _openId = localStorage.getItem("openId"),
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
};

//get openID
common.wxGetOpenId = function (env) {
  /* env环境变量参数
   * 1代表唯医骨科-正式线上环境
   * 2代表唯仁唯医社区-线下调试环境
   *
   * 08.11 目前新商户平台未申请 参数是反过来的 唯医骨科为预上线调试环境
   */
  var appId = "";
  var XHRUrl = "";
  var _currentPageUrl = (window.location.origin + window.location.pathname + window.location.search),
    _encodeUrl = encodeURIComponent(_currentPageUrl);
  if (env == 2) {
    appId = "wxe8384f7b06c169ef";
    XHRUrl = "http://m.allinmed.cn/mcall/wx/allinmed/interact/v1/view/";
  } else if (env == 1) {
    appId = "wxaa5288ad7f627608";
    XHRUrl = "http://m1.allinmed.cn/mcall/wx/allinmed/interact/v1/view/";
  }
  var _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
    "appid=" + appId +
    "&redirect_uri=" + _encodeUrl +
    "&response_type=code" +
    "&scope=snsapi_userinfo" +
    "&state=STATE" +
    "#wechat_redirect";
  if (common.getpara().code) {
    if (window.location.href.indexOf("openId") === -1) {
      window.location.href = XHRUrl +
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
};

//微信手机号验证
common.wxPhoneCheck = function (flag) {
  //手机号验证
  var _phoneCheckParams = {
    isValid: 1,                              //	string	是		1
    firstResult: 0,                          //	string	是	分页参数
    maxResult: 99999,                        //  string	是	分页参数
    customerId: "",                          //  string	是	用户id
  };
  //customsId获取（customerId和patientCustomerId同时存在的话取patientCustomerId）
  if (!common.getpara().openId) {
    if (common.getpara().patientCustomerId !== undefined) {
      _phoneCheckParams.customerId = common.getpara().patientCustomerId;
    } else if (common.getpara().customerId !== undefined) {
      _phoneCheckParams.customerId = common.getpara().customerId;
    } else {
      _phoneCheckParams.customerId = 0;
    }
  }

  if(parseInt(_phoneCheckParams.customerId)>0) {
    return true;
  }else{
    $.ajax({
      url: "/mcall/patient/customer/unite/v1/getById/",
      method: 'POST',
      data: {paramJson: $.toJSON(_phoneCheckParams)},
      timeOut: 2000,
      success: function (data) {
        localStorage.setItem("customerBaseInfo_one",JSON.stringify(data));
        if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
          var _mobile = data.responseObject.responseData.dataList.patientCustomerUnite.mobile;
          if (_mobile && _mobile.length > 0) {
            //已绑定手机号
            return true;
          } else {
            //未绑定手机号
            sessionStorage.setItem("loginBack", window.location.href);
            if (flag) {
              window.location.href = '/dist/login.html?customerId=' + _phoneCheckParams.customerId;
            } else {
              return;
            }
          }
        }
      },
      error: function () {
      }
    })
  }
};

if (window.location.href.indexOf("contact_doctor") >= 0 || window.location.href.indexOf("download_code.html") >= 0 || window.location.href.indexOf("download_page.html") >= 0 || window.location.href.indexOf("share_page.html") >= 0) {
  //联系我们,医生分享页不注册
} else {
  var flag = true;
  if (sessionStorage.getItem("goToLogin") == 1) {
    flag = false;
  }
  common.wxPhoneCheck(flag);
  sessionStorage.removeItem("goToLogin");
}

