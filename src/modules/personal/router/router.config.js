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
      path:"/followWechat",
      component:followWechat
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
      path:"*",
      redirect:"/personalIndex"
    }
  ]
};
