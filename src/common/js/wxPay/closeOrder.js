/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/8/22.
 */
import api from '../util/util'
import strings from './wxCommString';
export default function closeOrder(Obj) {
  let op= {};
  class closeOrderFn{
    constructor(){
      this.init();
    }
    init() {
      let _t = this;
      op.out_trade_no = Obj.out_trade_no ? Obj.out_trade_no : '';        //订单号
      if (parseInt(Obj.isTest) == 1) {
        Obj.closeOrdersSuccess();          //取消订单成功
      } else {
        _t.checkToken();
      }
    }
    checkToken () {
      let _t = this;
      strings.wxGetToken({
        callBack: function (data) {
          if (data.data.responseStatus) {
            console.log(data);
            _t.closeOrderRequest({
              _token: data.data.responseData.token ? data.data.responseData.token : '',  //token
              _nonceStr: data.nonceStr ? data.nonceStr : ''                              //随机数
            });
          }
        }
      });
      // if (strings.checkToken()) {
      //   _t.closeOrderRequest({
      //     _token: localStorage.getItem("token"),                    //token
      //     _nonceStr: localStorage.getItem("nonceStr")               //随机数
      //   });
      // } else {
      //
      // }
    }
    closeOrderRequest(rv) {
      let _data = {
        "out_trade_no": op.out_trade_no,
        "scene": 1,
        "roleId": 2,
        "nonceStr": rv._nonceStr,
        "siteId": 1,
        "token": rv._token
      };
      api.ajax({
        url:"/mcall/base/pay/external/v1/updateCloseOrder/",
        method: "POST",
        data:_data,
        done(data){
          if (data && data.return_msg == "OK") {
            //取消成功
            Obj.closeOrdersSuccess();          //取消订单成功
          } else {
            //取消失败
            Obj.closeOrdersError();
          }
        },
        fail(err){
          Obj.closeOrdersError();
        }
      });
    }
  }
  new closeOrderFn(Obj)
}
