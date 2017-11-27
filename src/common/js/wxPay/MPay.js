/**
 * @Desc： H5-M站支付
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/11/2.
 */

import wxStrings from './wxCommString';
import upOrder from './upOrderStatus';
import api from '../util/util';

export default function MPay(Obj) {
  const XHRList = {
    wxBasePath: '', //微信接口配置
    prepayPth: '/mcall/base/pay/external/v1/createPrepaidOrder/',        //预支付订单
    operationOrderPth: '/mcall/customer/operation/order/v1/update/'      //手术单状态更新
  };
  let op={};
  class payObj{
    constructor(){
      this.init();
    }
    init(){
      console.log("H5支付");
      let _t = this;
      if (parseInt(Obj.isTest) == 1) {
        _t.paySuccess();
      } else {
        _t.wxReady();
      }
    }
    //ready函数
    wxReady() {
      let _t = this;
      wxStrings.wxGetTokenPlus().then(function (res) {
        if (res.data.responseStatus) {
          op.token = res.data.responseData.token;  //token
          op.nonceStr = res.nonceStr;              //随机数
          op.ipAddr = res.data.responseData.ipAddr;  //用户ip
          _t.prepaidOrder({
            token: op.token,
            nonceStr: op.nonceStr,
            ipAddr:op.ipAddr
          }); //生成预支付订单
        }
      }).catch(function (err) {
        console.log("h5,支付接口错误");
      })
    }
    //生成预支付订单
    prepaidOrder (pv) {
      let _t = this;
      let _data = {
        "total_fee": Obj.total_fee * 100,     //订单总金额
        "body": "唯医骨科-" + Obj.body,               //订单描述
        "trade_type": "MWEB",         //支付模式 JSAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付 、MWEB H5支付
        "scene": 1,                     //支付场景
        "siteId": 1,                    //站点
        "roleId": '2',
        // "openid": localStorage.getItem("openId"),
        "nonceStr": pv.nonceStr,         //随机数
        "token": pv.token,
        "ipAddr":pv.ipAddr               //用户的ip
      };
      console.log(_data);
      api.ajax({
        url:  XHRList.prepayPth,
        method: "POST",
        data: _data,
        done (data) {
          if (data && data.return_msg == "OK") {
            console.log(data);
            op.dataL1 = data;
            localStorage.setItem("orderNumber", data.out_trade_no);
            _t.h5AskPay(data);   //H5支付
          }
        }
      });
    }
    //请求支付
    h5AskPay() {
      let _t = this,
        _data = op.dataL1,
        paySuccessUrl = encodeURIComponent(window.location.href.split("#")[0]+"&showSuccess=yes#"+window.location.href.split("#")[1]);
      console.log("-----pay-----");
      // localStorage.setItem("payUrl",paySuccessUrl);
      console.log(_data.mweb_url);
      window.location.href = _data.mweb_url + "&redirect_url=" + paySuccessUrl;
    }
  }
  new payObj(Obj);
}
