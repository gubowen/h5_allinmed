/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 2018/1/15.
 */


export default function () {
  let result="";
  if (window.location.host.includes("allinmed")){
    result="production";
  }else{
    result="development";
  }
  return result;
}
