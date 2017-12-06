import api from 'common/js/util/util';
const  xhrUrl = {
  "customerInfo":"/mcall/patient/customer/unite/v1/getPatientInfo/"
}
const state = {
  loginOnOff:true,//获取登录状态
  customerPhoneNum:18210589196,
  jumpUrl:{"bindWeixin":"0","linkUs":"0","aboutAllinmed":"0","focusWexin":"0"},
  weixinName:"这是一个用户",
  weixinState:false,
  customerName:"",
  logUrl:""
};
const getCustomerInfo = () =>{
  let _this = this;
  api.ajax({
    url: xhrUrl.customerInfo,
    method: "POST",
    data: {customerId:"1509944590525"},
    beforeSend: function () {

    },
    timeout: 20000,
    done(data) {
      console.log(data);
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        state.logUrl = data.responseObject.responseData.headUrl;
        state.customerName = data.responseObject.responseData.nickName;
        state.weixinName = data.responseObject.responseData.nickName;
        state.weixinState = (parseInt(data.responseObject.responseData.uniteFlagWeixin,10)===1);
        state.customerPhoneNum = parseInt(data.responseObject.responseData.mobile,10);

      }
    },
    fail(err){

    }
  })
}
getCustomerInfo();


export default  state;
