/**
 * @Desc：云信环境变量适配
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/10/9.
 */

import api from "common/js/util/util";

export default function nimEnv(){
  const env=api.getCookie("env");
  const host=window.location.host;
  let nimKey="";


  if (host==="m9.allinmed.cn"&&env==="online"){
      /*
      * m1线上测试环境
      * 使用云信测试账号
      * */
    nimKey="936722025b6a7fda857cb990fd4ca3ec";
  }else{
    /*
    * 其余任何环境
    * 使用正式账号
    *
    * 注意，该key任何人员不允许修改
    * */
    nimKey="50c93d2ab7e207fd83231a245c07bfbc";
  }
  return nimKey;
}
