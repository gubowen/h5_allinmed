import api from 'common/js/util/util';
const  xhrUrl = {
  "customerInfo":"/mcall/patient/customer/unite/v1/getPatientInfo/",
  loginState:"/mcall/patient/customer/unite/v1/checkSession/"
}
const state = {
  loginOnOff:true,//获取登录状态
  customerPhoneNum:'',
  weixinName:"",
  weixinState:false,
  customerName:"",
  logUrl:"",
  customerId:1509944590525
};
const getCustomerInfo = () =>{
  let _this = this;
  api.ajax({
    url: xhrUrl.customerInfo,
    method: "POST",
    data: {customerId:state.customerId},
    beforeSend: function () {

    },
    timeout: 20000,
    done(data) {
      console.log(data);
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        state.logUrl = data.responseObject.responseData.headUrl;
        state.customerName = data.responseObject.responseData.nickName;
        state.weixinName = data.responseObject.responseData.uniteNickname;
        state.customerId = data.responseObject.responsePk;
        state.weixinState = (parseInt(data.responseObject.responseData.uniteFlagWeixin,10)===1);
        state.customerPhoneNum = parseInt(data.responseObject.responseData.mobile,10);

      }
    },
    fail(err){

    }
  })
}
const checkLoginState = () =>{
  let _this = this;
  api.ajax({
    url: xhrUrl.loginState,
    method: "POST",
    data: {},
    beforeSend: function () {

    },
    timeout: 20000,
    done(data) {
      console.log(data);
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        console.log("用户已登录");//如果用户已经登录开始请求用户的个人信息
        state.loginOnOff = true;
        getCustomerInfo();
      }else{
        //state.loginOnOff = false;
      }
    },
    fail(err){

    }
  })
}
//getCustomerInfo();
checkLoginState();//检查用户的登录状态



export default  state;
