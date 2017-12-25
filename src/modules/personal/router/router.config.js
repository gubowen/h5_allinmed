/*
* create By ZhangHeng on 2017/12/4
*/
import bindAccount from "../components/bindAccount.vue"
import personalIndex from "../components/personalIndex.vue"
import changePsw from "../components/changePsw.vue"
import changePhone from "../components/bindPhone.vue"
import followWechat from "components/followWechat";
import contactUs from "components/contactUs";
import aboutAllinmed from "components/aboutAllinmed";
import verificationCode from "../components/verificationCode";
import createPsw from "../components/createPsw";

export default {
  routes: [
    {
      path:"/personalIndex",
      component:personalIndex
    },
    {
      path:"/bindAccount",
      component:bindAccount
    },
    {
      path:"/changePsw",
      component:changePsw
    },
    {
      path:"/createPsw",
      component:createPsw
    },
    {
      path:"/followWechat",
      component:followWechat
    },
    {
      path:"/verificationCode",
      component:verificationCode
    },
    {
      path:"/aboutAllinmed",
      component:aboutAllinmed
    },
    {
      path:"/contactUs",
      component:contactUs
    },
    {
      path:"/changePhone",
      component:changePhone
    },
    {
      path:"/feedback",
      component:feedback
    },
    {
      path:"*",
      redirect:"/personalIndex"
    }
  ]
};
