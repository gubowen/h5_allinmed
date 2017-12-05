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
  }
};
export default getters;
