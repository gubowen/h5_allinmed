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
    data: {customerId:"1492410302004"},
    beforeSend: function () {

    },
    timeout: 20000,
    done(data) {
      console.log(data);
      if(data.responseObject.responseStatus){
        state.logUrl = data.responseObject.responseData.headUrl;
        state.customerName = data.responseObject.responseData.nickName;

      }
    },
    fail(err){

    }
  })
}
getCustomerInfo();


export default  state;
