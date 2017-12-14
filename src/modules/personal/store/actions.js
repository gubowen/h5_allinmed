
const  actions = {
  outLogin:({commit,state})=>{
    commit("changeLoginOnOff");
  },
  changePhoneNum:({commit,state},num)=>{
    commit("changePhoneNum",num);
  },
  getValidCode:({commit,state})=>{
      commit("getValidCode");
    },
  changeCodeState:({commit,state},status)=>{
    commit("changeCodeState",status);
  },
  showLoading:({commit,state})=>{
    commit("showLoading");
  },
  hideLoading:({commit,state})=>{
    commit("hideLoading");
  },
  changeIsExistPwd:({commit,state})=>{
    commit("changeIsExistPwd");
  }
};
export  default  actions;
