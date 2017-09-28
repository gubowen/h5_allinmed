/**
 * @Desc：创建订单
 * @Usage:   createOrders({
                  data:data,        //data为Object 参考下面给出格式
                  backCreateSuccess:function(_data){
                      //创建订单成功  （手术必选）
                  },
                  backCreateError:function(_data){
                      //创建订单失败  (必选)
                  },
                  wxPaySuccess:function(_data){
                      //支付成功回调  (问诊/门诊类型 必选)

                  },
                  wxPayError:function(_data){
                      //支付失败回调  (问诊/门诊类型 必选)

                  }
              });
 data={
                     caseId:'',                         //  string  是  caseId
                     patientCustomerId:'1489998682602', //	string	是	患者所属用户id
                     patientId:'1491471348694',         // 	string	是	患者id
                     doctorId:'1234567890123',          //	string	是	医生id
                     orderType:'2',                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
                     orderSourceId:'1493697450391',     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
                     orderSourceType:'',                //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需

                     orderAmount:0.01,                  //	string	否	订单金额  （单位/元 保留两位小数）
                     status:'1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中

                     body:'唯医互联网骨科医院线下预约手术支付',   //   string  否  订单描述 （微信支付展示用）
                     isCharge:"true"                    //   string  是  true-收费  false-免费
               }

 * @Notify：
 * @Depend： "/js/modules/module.wxPay.wx_pay.js"
 *
 * Created by JuKun on 2017/5/15.
 * Fixed to ECMAScript6 by qiangkailiang on 2017/08/18
 */
import api from "../util/util";
import pay from "./pay";
export default function createOrders(Obj){
  const XHRList={
    createOrder:"/mcall/cms/pay/order/v1/create/",    //创建订单
    updateOrder:"/mcall/cms/pay/order/v1/update/"     //更新订单
  };
  class CreateOrders {
    constructor(){
      this.init();
    }
    init(){
      this.firstLoad();
      console.log(Obj);
    }
    firstLoad(){
      const that = this;
      this.createOrderData={
        caseId:Obj.data.caseId,                       //	string	是	caseId
        patientCustomerId:Obj.data.patientCustomerId, //	string	是	患者所属用户id
        patientId:Obj.data.patientId,                 // 	string	是	患者id
        doctorId:Obj.data.doctorId,                   //	string	是	医生id
        orderType:Obj.data.orderType,                 //	string	是	订单类型  1-咨询2-手术3-门诊预约
        orderSourceId:Obj.data.orderSourceId,         //	string	是	来源id，  对应咨询id,手术单id，门诊预约id
        orderSourceType:Obj.data.orderSourceType,     //	string	是	来源类型  1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊1-普通2-专家3-特需
        visitSiteId:'17'                              //	string	是	站点
      };
      if(Obj.data.isCharge=="true"){
        this.createOrderData.orderAmount=Obj.data.orderAmount;   //	string	是	订单金额
        this.createOrderData.status='1';                         //	string	是	订单状态1-待支付2-已支付3-已完成4-已取消5-退款中
      }else{
        this.createOrderData.status='2';
      }
      //创建支付订单
      api.ajax({
        url:XHRList.createOrder,
        method: "POST",
        data:this.createOrderData,
        done(data){
          if (data&&data.responseObject&&data.responseObject.responsePk){
            //创建订单成功
            that.orderId=data.responseObject.responsePk;       //订单号
            that.orderSuccess({
              orderId:data.responseObject.responsePk
            });
          }else{
            //创建订单失败
            Obj.backCreateError();    //失败回调
          }
        },
        fail(err){

        }
      });
    }
    orderSuccess (){
      let that = this;
      // 订单类型  1-咨询 2-手术 3-门诊预约
      switch (parseInt(Obj.data.orderType)){
        case 1:
        case 3:
          if(Obj.data.isCharge==="true"){
            this.goWxPay();
          }else{
            Obj.backCreateSuccess(this.orderId);  //成功回调
          }
          break;
        case 2:
          Obj.backCreateSuccess(this.orderId);  //成功回调
          break;
      }
    }
    //去微信支付
    goWxPay(){
      const that= this;
      pay({
        isTest:0, //0-线上 1-线下
        orderId:this.orderId,             //订单ID
        orderType:Obj.data.orderType,            //	string	是	订单类型  1-咨询2-手术3-门诊预约
        orderSourceId:Obj.data.orderSourceId,    //	string	是	来源id，  对应咨询id,手术单id，门诊预约id
        total_fee: Obj.data.orderAmount,   //订单总金额
        body: Obj.data.body,               //订单描述
        callBack: function (data) {
          if(data.responseStatus ==="true"){
            Obj.wxPaySuccess();        //支付成功回调
          }else{
            Obj.wxPayError();          //支付失败回调
          }
        }
      })
    }
  }
  new CreateOrders(Obj);
};
