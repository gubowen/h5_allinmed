/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/11/20.
 */


export default function ImageCompress(param, compressFn) {
  const image = new Image();
  image.src = param.imgSrc;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let finalBase64 = "";

    let compressParam=getRatioSize(image,param);
    canvas.width = compressParam.width;
    canvas.height = compressParam.height;


    ctx.drawImage(image, 0, 0, compressParam.width, compressParam.height);
    finalBase64 = canvas.toDataURL(param.quality);
    console.log(finalBase64)
    compressFn && compressFn(finalBase64);
  }
}

function getRatioSize(image,param){
  const ratio=image.width/image.height;
  let compressParam={
    width:0,
    height:0
  };
  if (image.width>param.width){
      compressParam={
        width:param.width,
        height:param.width/ratio
      }
  }else if (image.height>param.height){
    compressParam={
      width:param.height/ratio,
      height:param.height
    }
  }else{
    compressParam={
      width:image.width,
      height:image.height
    }
  }

  return compressParam;
}