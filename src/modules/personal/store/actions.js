
const  actions = {
  outLogin:({commit,state})=>{
    commit("changeLoginOnOff");
  },
  changePhoneNum:({commit,state},num)=>{
    commit("changePhoneNum",num);
  },
  getValidCode:({commit,state})=>{
      commit("getValidCode");
    }
};
export  default  actions;
