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
        _timeStamp = Math.round(new Date().getTime() / 1000) + "";
      console.log("-----pay-----");
      window.location.href = _data.mweb_url;
    }
    paySuccess () {
      upOrder({
        operationType: '2',                                    //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
        orderId: Obj.orderId,                                  // 订单ID
        orderType: Obj.orderType,                               //订单类型  2-手术 3-门诊
        reservationStatus: Obj.orderType == 2 ? Obj.reservationStatus : "",                 //手术类型
        orderSourceId: Obj.orderSourceId,                       // 订单资源ID
        outTradeNo: (parseInt(Obj.isTest) == 1) ? wxStrings.mathRandomNum({numberValue: 10}) : localStorage.getItem("orderNumber"),       //微信支付订单Id
        status: '2',                                           //1-待支付2-已支付3-已完成4-已取消5-退款中6-支付超时7-退款完成8-退款失败',
        payTime: '1',                                           //支付时间 传1
        callBack: function (data) {
          if (data && data.responseObject && data.responseObject.responseStatus) {
            Obj.callBack({
              responseStatus: "true",
              out_trade_no: localStorage.getItem("orderNumber")
            });
          } else {
            common.popup({
              text: "更新订单失败"
            })
          }
        },
        errorCallBack: function () {
          common.popup({
            text: "更新订单失败"
          })
        }
      });
    }
    payError () {
      upOrder({
        operationType: '3',                                    //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
        orderId: Obj.orderId,                                  // 订单ID
        orderType: Obj.orderType,                               //订单类型  2-手术 3-门诊
        reservationStatus: Obj.orderType == 2 ? Obj.reservationStatus : "",                 //手术类型
        orderSourceId: Obj.orderSourceId,                       // 订单资源ID
        outTradeNo: localStorage.getItem("orderNumber"),       //微信支付订单Id
        status: '1',                                           //支付失败 状态 1-待支付
        payTime: '',                                            //支付时间 传1
        callBack: function (data) {
          if (data && data.responseObject && data.responseObject.responseStatus) {
            Obj.callBack({
              responseStatus: "false"
            });
          } else {
            // common.popup({
            //   text: "更新订单失败"
            // })
          }
        },
        errorCallBack: function () {
          // common.popup({
          //   text: "更新订单失败"
          // })
        }
      });
    }
    //咨询支付成功后创建问诊id
    creatInquiryId (opt) {
      //获取是否已经存在问诊id
      api.ajax({
        url:  "/mcall/customer/case/consultation/v1/getMapById/",
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          caseId: api.getPara().caseId,
          customerId: api.getPara().doctorCustomerId || localStorage.getItem("docId"),
          consultationType: 1,
          siteId: 17
        },
        done (data) {
          if (data.responseObject.responseMessage == "NO DATA"){
            api.ajax({
              url:  "/mcall/customer/case/consultation/v1/create/",
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                caseId: api.getPara().caseId,
                customerId: api.getPara().doctorCustomerId || localStorage.getItem("docId") ,
                patientCustomerId: api.getPara().patientCustomerId,
                patientId: api.getPara().patientId,
                consultationType: 1,
                consultationState: -1,
                consultationLevel: localStorage.getItem("orderPayType"),
                siteId: 17,
                caseType: 0
              },
              done (d) {
                if (d.responseObject.responseStatus) {
                  localStorage.removeItem("docId");
                  sessionStorage.setItem("orderSourceId", d.responseObject.responsePk);
                  opt.queryCallBack(d.responseObject.responsePk);
                }
              }
            });
          }
        }
      });
    }
  }
  new payObj(Obj);
}
