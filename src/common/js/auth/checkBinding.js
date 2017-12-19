/**
 * @Desc：获取微信是否绑定其他账号
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Wangjingrong on 17/12/7.
 */

import ajax from "common/js/util/ajax";

const XHRList = {
  checkBinding: "/mcall/patient/customer/unite/v1/getMapList/"
}

export default class Checkbinding {
  constructor() {

  }

  getMessage(phNum) {
    return new Promise((resolve, reject) => {
      ajax({
        url: XHRList.checkBinding,
        method: "post",
        data: {
          mobile:phNum,
          isValid:1
        },
        timeout: 10000,
        done(res) {
          debugger
          if(res&&res.responseObjectresponseData&&res.responseObjectresponseData.dataList){
            debugger
            resolve(res.responseObjectresponseData.dataList.uniteFlagWeixin);
          }else{
            reject("数据错误");
          }
        }
      })
    });

  }
}


