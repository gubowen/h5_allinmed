import api from 'common/js/util/util';
const xhrUrl = {
  logOutUrl:'/mcall/customer/send/code/v1/logout/'
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
      console.log(data);
      if(data&&data.responseObject&&data.responseObject.responseStatus){
        status.loginOnOff = false;

      }
    },
    fail(err){

    }
  })
}
const mutaions = {
  changeLoginOnOff(state,data){
      //state.loginOnOff = false;
      logOut(state);
    }
};
export default mutaions;
