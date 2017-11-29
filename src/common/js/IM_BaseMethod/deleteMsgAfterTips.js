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
    this.customParam = customParam;
  }

  @readonly
  sendDeleteTips() {
    const that = this;
    return new Promise((resolve, reject) => {
        that.nimObj.sendCustomMsg({
        scene: "p2p",
        to: that.targetAccount,
        custom: JSON.stringify(that.customParam) || JSON.stringify({}),
        content: JSON.stringify({
          type: "deleteMsgTips",
          data: {
            from: that.customParam.patientName || "患者",
            deleteMsg: that.customParam.deleteMsg || {}
          }
        }),
        done(tipsError, tipsMsg) {
            
          if (!tipsError) {
            console.log(tipsError,tipsMsg)
            resolve(tipsMsg);
          } else {
            reject(tipsError, tipsMsg)
          }
        }
      });
    })
  }
}
