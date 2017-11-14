/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/9/27.
 */
class Net {
  constructor() {

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

  browser() {
    const u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    }
  }
}

export default new Net();
