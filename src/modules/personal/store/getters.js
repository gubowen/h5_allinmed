const getters = {
  loginOnOff(state){
        return state.loginOnOff;
    },
  customerPhoneNum(state){
    return state.customerPhoneNum;
  },
  jumpUrl(state){
    return state.jumpUrl;
  },
  weixinName(state){
    return state.weixinName;
  },
  weixinState(state){
    return state.weixinState;
  },
  customerName(state){
    return state.customerName;
  },
  logUrl(state){
    return state.logUrl;
  },
  customerId(state){
    return state.customerId;
  },
  codeNum(state){
    return state.codeNum;
  },
  loadingOnOff(state){
    return state.loadingOnOff;
  },
  phoneError(state){
    return state.phoneError;
  },
  codeState(state){
    return state.codeState;
  },
  loginUrl(state){
    return state.loginUrl;
  }
};
export default getters;
