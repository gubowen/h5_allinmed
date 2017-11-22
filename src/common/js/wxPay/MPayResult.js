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
      "outTradeNo": Obj.outTradeNo,   //outTradeNo
      "scene": 1,
      "roleId": 2,
      "nonceStr": localStorage.getItem("nonceStr"),            //随机数(前端生成32位随机数)
      "siteId": 1,
      "token":localStorage.getItem("token"),                   //token(后台获取)
      "ipAddr":localStorage.getItem("ipAddr")                   //ip地址(后台获取)
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
      done(res) {
        if(res&&res.responseData&&res.responseData.data){
          resolve(res.responseData.data[0]);
        }else{
          reject(new Error("望天，接口出错了"));
        }
      }
    })
  })
}
