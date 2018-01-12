/*/**
 * @D/esc：多图上传
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2018/1/11.
 */

import ajax from "../util/ajax";
import net from "../util/net";
import imageCompress from "../imgCompress/toCompress";
export default function upLoadMultImg(param, loadBefor, loading, loadEnd) {
  let _files = param.files;
  //图片大小处理
  _imgSizeCheck(param, (num) => {
    //图片大小溢出
    loadBefor(num);
  })

}

function _imgSizeCheck(param, overSize) {
  let _files = param.files;
  for (let i = 0; i < _files.length; i++) {
    if (_files[i].size > 1024 * 1024 * 10) {
      overSize(i);
    } else {
      param.filesObj.push(_files[i]); //保存文件对象
      param.filesObjAll.unshift(_files[i]); //保存文件对象（不清空）
      //图片压缩处理
      let reader = new FileReader();
      reader.readAsDataURL(_files[i]);
      reader.onload = oFREvent => {
        imageCompress({
            imgSrc: oFREvent.target.result,
            quality: 0.8,
            file: _files[i]
          },
          base64 => {
            param.base64Arr.push(base64); //保存压缩图片
            param.base64ArrAll.unshift(base64); //保存压缩图片
            if (i == _files.length - 1) {
              this.upLoadPic(
                param.filesObj[param.uploadIndex],
                param.type,
                param.index,
                param.base64Arr[param.uploadIndex]
              );
            }
          }
        );
      };
    }
  }
}
