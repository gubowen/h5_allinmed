/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/11/20.
 */

export default function ImageCompress(param,compressFn) {
  const image = new Image();
  image.src = param.imgSrc;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let finalBase64 = "";
    canvas.width = param.width;
    canvas.height = param.height;


    ctx.drawImage(image, 0, 0, param.width, param.height);
    finalBase64 = canvas.toDataURL('image/jpeg', param.quality);
    console.log(finalBase64);
    compressFn && compressFn(convertBase64UrlToBlob(finalBase64));
  }
}
function convertBase64UrlToBlob(urlData){

  var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob( [ab] , {type : 'image/png'});
}
// class ImageCompress {
//   constructor(param) {
//     this.config = param || {
//       imgSrc: "",
//       quality: 1,
//       width: 1280,
//       height: 500
//     };

//     this.createImage();
//   }

//   createCanvas(image) {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = this.config.width;
//     canvas.height = this.config.height;

//     this.operateImage(canvas,ctx,image)
//   }


//   createImage() {
//     const image = new Image();
//     image.src = this.config.imgSrc;
//     alert(5)
//     image.onload = () => {
//       this.createCanvas(image)
//     }
//   }

//   operateImage(canvas, ctx,image) {
//     let finalBase64 = "";
//     ctx.drawImage(image, 0, 0, this.config.width, this.config.height);
//     finalBase64 = canvas.toDataURL('image/jpeg', this.quality);
//     console.log(finalBase64);
//   }
// }
