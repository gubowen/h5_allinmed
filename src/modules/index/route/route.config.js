import FollowWeChat from "components/followWechat";
import MHome from "../components/mHome";

export default [{
    path: "/",
    redirect: "/home"
  }, {
    path: "/followWeChat",
    name: "followWeChat",
    component: FollowWeChat,
    meta: {
      keepAlive: true
    }
  },{
    path: "/home",
    name: "home",
    component: MHome,
    meta: {
      keepAlive: true
    },
},{
  path: "*",
  redirect: "/home"
}, ]
