/**
 * @Desc：验证码登录
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 17/12/08.
 */

import api from "common/js/util/util";
const XHRList = {
  sendCodeUrl: "/mcall/customer/send/code/v1/create/"
};
export default class SendCode {
  constructor() {

  }

  sendInit(param) {
    return new Promise((resolve, reject) => {
      api.ajax({
        url: XHRList.sendCodeUrl,
        method: "POST",
        data: {
          userType: 1,
          account: param.account, //账号
          accountType:0, //账号类型,0手机 1邮箱
          operateType:param.operateType, //1-绑定手机 2－修改手机号 3-手机号找回p密码 5-手机号注册 8-手机号快捷登录 9-老患者报到 16-患者注册
          codeLength:4,
          visitSiteId:api.getSiteId(),
          typeId: param.typeId //1-修改/重置密码2-账号验证(绑定手机、手机号注册)3-手机快捷登录4-老患者报到5-短信通知	
        },
        timeout: 10000,
        done(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
          throw new Error(err);
        }
      })
    })
  }
}