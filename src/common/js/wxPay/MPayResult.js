/**
 * @Desc：查看支付结果 （用于m站支付查看支付详情）
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/11/6.
 */

import wxString from './wxCommString';
import api from '../util/util';

export default function (Obj) {
  const XHRList = {
    payResultUrl: '/mcall/base/pay/external/v1/getResultBack/', //查看支付结果
  };

  class payResultObj {
    constructor() {
      this.init();
    }

    init() {
      //获取token
      wxString.wxGetToken({
        callBack: (data) => {
          console.log(data);
          this.apiData();
        }
      });
    }
    //api
    apiData(){
      let _t = this,
        _data = {
          "out_trade_no": _t.op.out_trade_no,   //_out_trade_no
          "scene": 1,
          "roleId": 2,
          "nonceStr": rv._nonceStr,            //随机数(前端生成32位随机数)
          "siteId": 1,
          "token": rv._token                   //token(后台获取)
        };
      api.ajax({
        url: XHRList.payResultUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: _data,
        done(data) {
          console.log("======支付结果=====", data);
        }

      })
    }
  }

  new payResultObj(Obj);
}
