/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/11/20.
 */

import changeDirection from "./changeFileDirection";
export default function ImageCompress(param, compressFn) {
  const image = new Image();
  image.src = param.imgSrc;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let finalBase64 = "";

    let compressParam=getRatioSize(image,param);
    if(navigator.userAgent.toLowerCase().includes("iphone")){
      changeDirection(canvas,ctx,param,compressParam,image,()=>{
        finalBase64 = canvas.toDataURL("image/jpeg",0.9);
        compressFn && compressFn(finalBase64);
      }) 
    }
  }
}

function getRatioSize(image,param){
  let _param={
    width:param.width||1920,
    height:param.height||1440
  }
  console.log(_param)
  const ratio=image.width/image.height;
  let compressParam={
    width:0,
    height:0
  };
  if (ratio>=1){ //宽图...宽度大于高度
    if (image.width>_param.width){
      compressParam={
        width:_param.width,
        height:_param.width/ratio
      }
    }else{
      compressParam={
        width:image.width,
        height:image.height
      }
    }
  }else if (ratio<1){//长图...高度大于宽度
    if (image.height>_param.height){
      compressParam={
        width:_param.height*ratio,
        height:_param.height
      }
    }else{
      compressParam={
        width:image.width,
        height:image.height
      }
    }
  }
  return compressParam;
}