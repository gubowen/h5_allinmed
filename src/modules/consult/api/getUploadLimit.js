/**
 * @Desc：上传图片数量限制
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 17/12/25.
 */

import api from "common/js/util/util";
const XHRList = {
  validLogin: "/mcall/comm/data/tool/v1/getMapList/"
};
export default class GetUploadLimit {
  constructor() {

  }

  getDataInit() {
    return new Promise((resolve, reject) => {
      api.ajax({
        url: XHRList.validLogin,
        method: "POST",
        data: {
            deviceType: "WEB",
            sortType: 1,
            visitSiteId: api.getSiteId(),
        },
        timeout: 10000,
        done(res) {
          resolve(res);
        },
        fail(err) {
          if (err) {
            reject(err);
            throw new Error(err);
          }
        }
      })
    })
  }
}
