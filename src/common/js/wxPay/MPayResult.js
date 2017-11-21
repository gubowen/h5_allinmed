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

const XHRList = {
  payResultUrl: '/mcall/base/pay/external/v1/getResultBack/', //查看支付结果
};
export default function MPayResult(Obj) {
  const that = this;
  let  _data = {
      "outTradeNo": Obj.out_trade_no,   //_out_trade_no
      "scene": 1,
      "roleId": 2,
      "nonceStr": localStorage.getItem("nonceStr"),            //随机数(前端生成32位随机数)
      "siteId": 1,
      "token":localStorage.getItem("token")                   //token(后台获取)
    };
  console.log(_data);
  return new Promise(function(resolve, reject) {
    api.ajax({
      url: XHRList.payResultUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: _data,
      done(data) {
        console.log(data)
        resolve(data);
      },
      fail(err){
        reject(err);
      }
    })
  })
}
