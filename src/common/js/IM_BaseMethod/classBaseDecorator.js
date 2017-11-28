/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/11/28.
 */

 export default function override(method){
     return function (target){
        target.prototype[method]=method;
     }
 }