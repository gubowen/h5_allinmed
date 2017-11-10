/**
 * @Desc：微信支付相关模块列表
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/8/21.
 */
import upOrder from './upOrderStatus';
import pay from './pay';
import MPay from './MPay';
import MPayResult from './MPayResult';
import createOrders from './createOrder';
import closeOrder from "./closeOrder";

class WxPayCommon {
  constructor(Obj) {

  }
  //取消订单
  wxCloseOrder() {
    closeOrder
  }
  //创建订单
  wxCreateOrder(Obj){
    createOrders(Obj)
  }
  //更新订单状态
  wxUpOrder(Obj){
    upOrder(Obj);
  }
  //微信支付
  wxPay(Obj){
    pay(Obj);
  }
  //H5支付 (for H5 m站支付)
  H5Pay(Obj){
    MPay(Obj);
  }
  //查询支付结果 (for H5 m站支付)
  PayResult(Obj){
    return MPayResult(Obj);
  }
}
export default new WxPayCommon();
