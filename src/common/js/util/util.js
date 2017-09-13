/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/14.
 */

import axios from "axios";

class Api {
  constructor() {

  }

  ajax(param) {
    axios.interceptors.request.use(function (config) { //在请求发出之前进行一些操作
      if (document.querySelector(".ev-loading")) {
        document.querySelector(".ev-loading").style.display = "block";
      }
      param.beforeSend && param.beforeSend(config);
      return config;
    });

    axios({
      url: param.url,
      method: param.method,
      data: param.data,
      transformRequest: [function (data) {
        return "paramJson=" + JSON.stringify(data);
      }],
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      timeout: 30000
    }).then((res) => {
      param.done(res.data);
      if (document.querySelector(".ev-loading")) {
        document.querySelector(".ev-loading").style.display = "none";
      }
    }, (err) => {
      param.fail && param.fail(err);
    });
  }

  getPara(symbol) {
    let url = window.location.origin + window.location.pathname + window.location.search;

    let param = {};
    let str, item;
    if (url.lastIndexOf(symbol ? symbol : "?") > 0) {
      str = url.substring(url.lastIndexOf(symbol ? symbol : "?") + 1, url.length);
      let arr = str.split("&");
      for (let i = 0; i < arr.length; i++) {
        item = arr[i].split("=");
        param[item[0]] = decodeURIComponent(item[1]);
      }
    }
    return param;
  }

  removeDub(arr) {
    return [...new Set(arr)];
  }

  removeByValue = function (arr, value) {
    for (let i = 0; i < this.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
    return arr;
  }

  isWXBrowse() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("iphone") > 0) {
      return "iphoneWX";
    } else if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("android") > 0) {
      return "androidWX";
    }
    return "other";
  }

  getByteLen(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) !== null) {
        len += 2;
      }
      else {
        len += 1;
      }
    }
    return len;
  }

  getStrByteLen(str, len) {
    let newStr = '',
      newLength = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 128) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength <= len) {
        newStr = newStr.concat(str[i]);
      } else {
        break;
      }
    }
    if (newLength > len) {
      newStr = newStr + ""
    }
    return newStr;
  }

  getConnectType() {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {tyep: 'unknown'};
    let type_text = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'none'];
    let _browseType = this.isWXBrowse(),
      userAgentInfo = navigator.userAgent;
    let checkKey = '';
    if (typeof(connection.type) == "number") {
      connection.type_text = type_text[connection.type];
    } else {
      if (_browseType === "androidWX") {
        //Android通过返回type判断
        if (connection.type !== "WIFI" || connection.type !== "wifi") {
          if (userAgentInfo.indexOf("WIFI") > 0) {
            connection.type_text = 'wifi';
          } else {
            connection.type_text = 'other';
          }
        } else {
          connection.type_text = connection.type;
        }
      } else if (_browseType === "iphoneWX") {
        //ios没有返回type 通过设备类型里的NetType判断联网类型（尝试中 需测试）
        if (userAgentInfo.indexOf("WIFI") > 0) {
          connection.type_text = 'wifi';
        } else {
          connection.type_text = 'other';
        }
      } else {
        //除Android、ios微信浏览器之外的其他浏览器
        if (connection.type !== "undefined") {
          connection.type_text = connection.type;
        } else {
          //不识别网络或不兼容
          connection.type_text = 'other';
        }
      }
    }
    //通过Bandwidth判断网络类型（多数浏览器没有返回改字段）
    if (typeof(connection.bandwidth) == "number") {
      if (connection.bandwidth > 10) {
        connection.type = 'wifi';
      } else if (connection.bandwidth > 2) {
        connection.type = '3g';
      } else if (connection.bandwidth > 0) {
        connection.type = '2g';
      } else if (connection.bandwidth == 0) {
        connection.type = 'none';
      } else {
        connection.type = 'unknown';
      }
    }
    //返回类型 (1-wifi、0-other)
    if (connection.type_text == 'wifi') {
      checkKey = 1;
    } else {
      checkKey = 0;
    }
    return checkKey;
  }

  //openId check
  checkOpenId() {
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
  };

  //get openID
  wxGetOpenId(env) {
    /* env环境变量参数
     * 1代表唯医骨科-正式线上环境
     * 2代表唯仁唯医社区-线下调试环境
     *
     * 08.11 目前新商户平台未申请 参数是反过来的 唯医骨科为预上线调试环境
     */
    let appId = "";
    let XHRUrl = "";
    let _currentPageUrl =  (window.location.origin + window.location.pathname + window.location.search),
      _encodeUrl = encodeURIComponent(_currentPageUrl);
    if (env ==1) {
      appId = "wxe8384f7b06c169ef";
      XHRUrl = "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    } else if (env == 2) {
      appId = "wxaa5288ad7f627608";
      XHRUrl = "http://m1.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    }

    let _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
      "appid=" + appId +
      "&redirect_uri=" + _encodeUrl +
      "&response_type=code" +
      "&scope=snsapi_userinfo" +
      "&state=STATE" +
      "#wechat_redirect";
    if (this.getPara().code) {
      if (window.location.href.indexOf("openId") === -1) {
        window.location.href = XHRUrl +
          "?ref=" + localStorage.getItem("currentUrl") +
          "&response_type=code" +
          "&scope=snsapi_base" +
          "&state=pay" +
          "&code=" + this.getPara().code +
          "#wechat_redirect";
      }
    } else {
      if (window.location.href.indexOf("openId") !== -1) {
        let count = sessionStorage.getItem("count");
        if (!count) {
          sessionStorage.setItem("count", 1);
          if (localStorage.getItem("currentUrl") && localStorage.getItem("currentUrl").indexOf("?") != -1) {
            window.location.href = localStorage.getItem("currentUrl") + "&openId=" + this.getPara().openId;
          } else {
            window.location.href = localStorage.getItem("currentUrl") + "?openId=" + this.getPara().openId;
          }
          localStorage.setItem("openId", this.getPara().openId);
        }

      } else {
        localStorage.setItem("currentUrl", _currentPageUrl);
        window.location.href = _url;
      }
    }
  };

  //手机号验证
  mobileCheck() {
    let _phoneCheckParams = {
      isValid: 1,                           //	string	是		1
      firstResult: 0,                       //	string	是	分页参数
      maxResult: 99999,                     //  string	是	分页参数
      customerId: '',                       //  string	是	用户id
    };
    //customsId获取（customerId和patientCustomerId同时存在的话取patientCustomerId）
    if (!api.getPara().openId) {
      if (api.getPara().patientCustomerId !== undefined) {
        _phoneCheckParams.customerId = api.getPara().patientCustomerId;
      } else if (api.getPara().customerId !== undefined) {
        _phoneCheckParams.customerId = api.getPara().customerId;
      } else {
        _phoneCheckParams.customerId = 0;
      }
    }
    if (parseInt(_phoneCheckParams.customerId) > 0) {
      return true;
    } else {
      api.ajax({
        url: "/mcall/patient/customer/unite/v1/getById/",
        method: 'POST',
        data: _phoneCheckParams,
        beforeSend: function () {
        },
        timeOut: 2000,
        done (data) {
          localStorage.setItem("customerBaseInfo_one", JSON.stringify(data));
          if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
            let _mobile = data.responseObject.responseData.dataList.patientCustomerUnite.mobile;
            if (_mobile && _mobile.length > 0) {
              //已绑定手机号
              return true;
            } else {
              //未绑定手机号
              sessionStorage.setItem("loginBack", window.location.href);
              window.location.href = '/dist/login.html?customerId=' + _phoneCheckParams.customerId;
            }
          }
        }
      })
    }
  }

  //时间处理  2017年05月08日 星期一 14:20 / 2017.05.08 星期一 14:20
  timeFormate(op){
    let _operationTime = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
      _timeDeal = op.time.substring(0,10).replace(/\-/g, "\/"),
      _timesList = new Date(_timeDeal).getDay(),
      _timeCompare = '' ,                        //  2017年05月08日 星期一 14:20
      _timeCompares = '' ,                       //  05月08日 星期一 14:20
      _week = _operationTime[_timesList],
      _hours = op.time.substring(11,16);
    switch (parseInt(op.type)) {
      case 1:      //2017年05月08日
        _timeCompare = op.time.substring(0, 4) + "年" + op.time.substring(5, 7) + "月" + op.time.substring(8, 10) + "日"; //  2017年05月08日 星期一 14:20
        _timeCompares = op.time.substring(5, 7) + "月" + op.time.substring(8, 10) + "日";                                 //  05月08日 星期一 14:20
        break;
      case 2:      //2017.05.08
        _timeCompare = op.time.substring(0, 4) + "." + op.time.substring(5, 7) + "." + op.time.substring(8, 10);  //  2017.05.08 星期一 14:20
        _timeCompares = op.time.substring(5, 7) + "." + op.time.substring(8, 10);                                  //  05.08 星期一 14:20
        break;
      case 3:
        break;
    }
    return {year:_timeCompare,years:_timeCompares,week:_week,hour:_hours};
  }

  MillisecondToDate(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + "分钟";//+ parseInt((parseFloat(time /60.0) -parseInt(time /60.0)) *60) +"秒";
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60) + "分钟";//+
        // parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
        //     parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";
      } else if (time >= 60 * 60 * 24) {
        time = Math.round(parseInt(time / (3600 * 24))) + "天";
      }
    } else {
      time = "0 时 0 分0 秒";
    }
    return time;

  }

  MillisecondToDateNew(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + "分钟";//+ parseInt((parseFloat(time /60.0) -parseInt(time /60.0)) *60) +"秒";
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time = parseInt(time / 3600.0) + "小时"
        // parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
        //     parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";
      } else {
        time = parseInt(time) + "秒";
      }
    } else {
      time = "0 时 0 分0 秒";
    }
    return time;

  }
}
Array.prototype.removeByValue = function (val) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
};
let api = new Api();
export default api;
