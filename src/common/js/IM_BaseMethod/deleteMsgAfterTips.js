/**
 * @Desc：消息撤回后...发送提示
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/11/28.
 */

import IMBaseMethods from "./IM_BaseMethod";
import {
  readonly
} from "core-decorators";


export default class DeleteMsgAfterTips extends IMBaseMethods {
  constructor(nimObj, targetAccount, customParam) {
    super(nimObj)
    this.targetAccount = targetAccount;
    this.customParam=customParam;
  }

  @readonly
  sendDeleteTips() {
    const that = this;
    return new Promise((resolve, reject) => {
        console.log(that.customParam)
      this.nimObj.sendCustomMsg({
        scene: "p2p",
        to: that.targetAccount,
        custom: that.customParam || JSON.stringify({}),
        content: JSON.stringify({
          type: "deleteMsgTips",
          data: {
            from: that.customParam.patientName || "患者",
            deleteMsg: that.customParam.deleteMsg || {}
          }
        }),
        done(error, msg) {
          if (!error) {
            resolve(error,msg);
          } else {
            reject(error, msg)
          }
        }
      });
    })
  }
}
