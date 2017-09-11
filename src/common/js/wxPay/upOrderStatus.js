/**
 * @Desc：wxPay
 * @Usage:

 2）免费 更新订单状态
 modules.tcUpOrderStatus({
                   operationType:'',    //操作类型        1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                   orderId:'',          // 订单ID
                   outTradeNo:'',       //微信支付订单Id  (免费订单非必填)
                   status:'',           //订单状态        1-待支付  2-已支付  3-已完成  4-已取消  5-退款中
                   callBack:function(data){
                         //更新成功
                   },
                   errorCallBack:function(){
                         //更新失败
                   }
               });

 * @Notify：支付模式为公众号支付
 * @Depend：  （支付无css依赖）
 *            "https://res.wx.qq.com/open/js/jweixin-1.0.0.js"
 *
 * Created by JuKun on 2017/4/5.
 */
import api from '../util/util';
export default function upOrder(Obj) {
  const XHRList = {
    upOrderStatusUrl:'/mcall/cms/pay/order/v1/update/'
  };
  let _data ={
    orderId: Obj.orderId                             //   string  是  订单ID
  };
  class upOrderStatus{
    constructor(){
      this.init();
    }
    init(){
      Obj.outTradeNo = parseInt(Obj.isTest) == 1 ? "" : Obj.outTradeNo;
      switch (parseInt(Obj.operationType)) {    //1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
        case 1:
          //预支付
          _data.outTradeNo = Obj.outTradeNo; //微信支付订单号
          break;
        case 2:
          //2-已支付
          _data.status = Obj.status;               //订单状态
          _data.payTime = Obj.payTime;             //支付时间
          _data.outTradeNo = Obj.outTradeNo;       //微信支付订单Id
          _data.orderType = Obj.orderType;         //订单类型
          _data.orderSourceId = Obj.orderSourceId;       //订单资源ID
          break;
        case 3:
          //3-支付失败
          _data.status = Obj.status;               //订单状态
          _data.outTradeNo = Obj.outTradeNo;       //微信支付订单ID
          _data.orderType = Obj.orderType;         //订单类型
          _data.orderSourceId = Obj.orderSourceId;       //订单资源ID
          break;
        case 4:
          //4-取消
          _data.status = Obj.status;                             //订单状态
          _data.orderType = Obj.orderType;                       //订单类型    '订单类型1-咨询2-手术3-门诊预约',
          _data.orderSourceId = Obj.orderSourceId;               //订单资源ID  '来源id，对应咨询id,手术单id，门诊预约id',
          if (Obj.charge && Obj.charge == "true") {
            _data.outTradeNo = Obj.outTradeNo;             //拒绝描述
            _data.refundReason = Obj.refundReason;             //拒绝描述
            _data.refundReasonDesc = Obj.refundReasonDesc;     //拒绝原因描述
          }
          break;
        case 5:
          //5-退款
          _data.status = Obj.status;                         //订单状态
          _data.outRefundNo = Obj.outRefundNo;               //退款单号
          _data.refundAmount = Obj.refundAmount;             //退款金额
          _data.refundTime = Obj.refundTime;                 //退款时间 （微信是否返回，未返回拿系统当前时间）
          break;
        case 6:
          //6-已完成
          _data.status = Obj.status;         //订单状态
          break;
      }
      //手术单更新手术类型 （2-合作医院手术 3-公立医院手术）
      if (Obj.orderType == 2) {
        _data.reservationStatus = Obj.reservationStatus;
      }
      api.ajax({
        url:XHRList.upOrderStatusUrl,
        method: "POST",
        data:_data,
        done(data){
          Obj.callBack(data);
        },
        fail(err){
          Obj.errorCallBack();
        }
      });
    }
  }
  new upOrderStatus(Obj);
}
