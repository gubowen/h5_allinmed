import api from 'common/js/util/util';
const  xhrUrl = {
  "customerInfo":"/mcall/patient/customer/unite/v1/getPatientInfo/",
  loginState:"/mcall/patient/customer/unite/v1/checkSession/"
}
const state = {
  loginUrl:"/mLogin.html",
  loginOnOff:true,//获取登录状态
  customerPhoneNum:'',//用户原本的手机号
  phoneNum:"",//用户当前修改的手机号
  phoneError:"",//手机号错误提示
  weixinName:"",//用户微信昵称
  weixinState:true,//微信绑定状态
  customerName:"",//用户名
  logUrl:"",//头像
  codeNum:10,//一天可以发送多少次验证码，
  codeNumId:"",//更改手机号的时候，既传验证码，也需要验证码id
  customerId:localStorage.getItem("userId"),//用户id
  loadingOnOff:false,
  codeState:false//获取验证码是路由跳转，在浏览器可以通过历史按钮触发，填坑
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
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        let imgUrl = require("../../../common/image/img00/avatar.png");
        state.logUrl = (data.responseObject.responseData.headUrl.length)?(data.responseObject.responseData.headUrl):imgUrl;
        state.customerName = (data.responseObject.responseData.nickName.length)?(data.responseObject.responseData.nickName):(localStorage.getItem("mobile"));
        state.weixinName = data.responseObject.responseData.uniteNickname;
        state.customerId = data.responseObject.responsePk;
        state.weixinState = (parseInt(data.responseObject.responseData.uniteFlagWeixin,10)===1);
        state.customerPhoneNum = (data.responseObject.responseData.mobile)?parseInt(data.responseObject.responseData.mobile,10):(parseInt(localStorage.getItem("mobile"),10));

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
      // console.log(data);
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        // console.log("用户已登录");//如果用户已经登录开始请求用户的个人信息
        state.loginOnOff = true;
        getCustomerInfo();
      }else{
        state.loginOnOff = false;
        state.weixinState = false;
      }
    },
    fail(err){

    }
  })
}
//getCustomerInfo();
checkLoginState();//逻辑起点，检查用户的登录状态，检查后获取用户的个人信息



export default  state;
