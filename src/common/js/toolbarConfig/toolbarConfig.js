/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 2018/1/3.
 */

import api from "common/js/util/util";


export default function getToolBarConfig(){
  const XHRList="/mcall/comm/data/tool/v1/getMapList/";
  let deviceType=navigator.userAgent.toLowerCase().includes("iphone")?"IOS":"Android";

  return new Promise((resolve,reject)=>{
    api.ajax({
      url:XHRList,
      method:"POST",
      data:{
        deviceType,
        sortType:1,
        visitSiteId:api.getSiteId()
      },
      done(res){
        resolve(res);
      },
      fail(err){
        reject(err);
      }
    })
  })
}
