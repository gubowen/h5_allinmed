/**
 * @Desc：消息撤回
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

export default class deleteMessage extends IMBaseMethods {
  constructor(nimObj, msg) {
    super(nimObj);
    this.msg = msg;
  }

  @readonly
  deleteMessage() {
    const that=this;
    return new Promise((resolve, reject) => {
      console.log(that.nimObj)
      console.log('正在撤回消息', that.msg)
      that.nimObj.deleteMsg({
        msg: that.msg,
        done(error) {
          if (!error) {
            console.log("撤回消息成功.....");
            resolve(that.msg)
          } else {
            console.log("撤回失败.....");
            reject(error, that.msg)
          }
        }
      })
    })
  }
}
