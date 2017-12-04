/*
* create By ZhangHeng on 2017/12/4
*/
import bindAccount from "../components/bindAccount.vue"
import personalIndex from "../components/personalIndex.vue"


export default {
  routes: [
    {
      path:"/personalIndex",
      component:personalIndex
    },
    {
      path:"/catalog",
      component:Catalog
    },
    {
      path:"/related",
      component:Related
    },
    {
      path:"*",
      redirect:"/catalog"
    }
  ]
};
