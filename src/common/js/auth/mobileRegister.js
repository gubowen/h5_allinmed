/**
 * @Desc：手机号注册
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 17/12/08.
 */

import api from "common/js/util/util";
const XHRList = {
  registerUrl: "/mcall/patient/customer/unite/v1/mobileRegister/"
};
export default class MobileRegister {
  constructor() {

  }

  registerInit(param) {
    return new Promise((resolve, reject) => {
      api.ajax({
        url: XHRList.registerUrl,
        method: "POST",
        data: {
          account: param.account, //账号（手机号）
          password: param.password, // 密码
          validCode: param.validCode, //验证码
          siteId:api.getSiteId(),
          codeId:param.codeId,// 验证码主键
          optType:1,//操作类型，默认传1
        //   operateType:param.operateType, //1-绑定手机 2－修改手机号 3-手机号找回p密码 5-手机号注册 8-手机号快捷登录 9-老患者报到 16-患者注册
          typeId: 2//1-修改/重置密码2-账号验证(绑定手机、手机号注册)3-手机快捷登录4-老患者报到5-短信通知	
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