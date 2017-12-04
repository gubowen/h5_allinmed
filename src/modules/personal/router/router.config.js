/*
* create By ZhangHeng on 2017/12/4
*/
import bindAccount from "../components/bindAccount.vue"
import personalIndex from "../components/personalIndex.vue"
import changePsw from "../components/changePsw.vue"


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
      path:"*",
      redirect:"/personalIndex"
    }
  ]
};
