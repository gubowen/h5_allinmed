import api from 'common/js/util/util';
const xhrUrl = {
  logOutUrl:'/mcall/patient/customer/unite/v1/logout/',
  sendPhoneCode:"/mcall/customer/send/code/v1/create/"
}
const logOut = (status) =>{
  let _this = this;
  api.ajax({
    url: xhrUrl.logOutUrl,
    method: "POST",
    data: {},
    beforeSend: function () {

    },
    timeout: 20000,
    done(data) {
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        localStorage.removeItem("hasCloseAttention");
        localStorage.removeItem("userId");
        localStorage.setItem("backUrl",window.location.href);
        status.loginOnOff = false;
        status.customerName = '';
      }
    },
    fail(err){

    }
  })
}
const mutaions = {
  showLoading(state){
    state.loadingOnOff = true;
  },
  hideLoading(state){
    state.loadingOnOff = false;
  },
  changeLoginOnOff(state,data){
      logOut(state);
    },
  changePhoneNum(state,num){
    state.phoneNum = num;
  },
  changeCodeState(state,status){
    state.codeState = status;
  },
  changeIsExistPwd(state){
    state.isExistPwd = true;
  },
  getValidCode(state){
    let param = {
      typeId: 2,//	string	是	1-修改/重置密码2-账号验证(绑定手机、手机号注册)3-手机快捷登录4-老患者报到5-短信通知
      accountType: 0,//	string	是	账号类型,0手机 1邮箱
      siteId: 21,//	string	是	站点id 21-M站		21
      userType: 1,//	string	是	用户类型 0-医生用户 1-患者用户
      operateType: 2,//	string	是	1-绑定手机 2－修改手机号 3-手机号找回p密码 5-手机号注册 8-手机号快捷登录 9-老患者报到 16-患者注册
      account: state.phoneNum,//	string	是	账号
      codeLength: 4,//	string	是	验证码长度
    }
    let changePhoneNum = ()=>{
      api.ajax({
        url: xhrUrl.sendPhoneCode,
        method: "POST",
        data: param,
        beforeSend: function () {
            state.loadingOnOff = true;
        },
        timeout: 20000,
        done(data) {
          state.loadingOnOff = true;
          if(data&&data.responseObject&&data.responseObject.responseStatus){
            state.codeNum = parseInt(data.responseObject.responseData.codeNum,10);
            state.codeNumId = data.responseObject.responsePk;
          }else{
            if(data.responseObject.responseCode==='0B0006'){
              state.phoneError = '0B0006';
              let resetTimer = setTimeout(function(){
                state.phoneError = '000000';
              },500);
            }
            if(data.responseObject.responseCode==='SMS0003'){
              state.codeNum  = -1;
            }
          }
        },
        fail(err){

        }
      })
    }
    changePhoneNum();
  }
};
export default mutaions;
