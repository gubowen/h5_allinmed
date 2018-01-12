/**
 * @Desc：IOS拍照图片旋转至正确方向
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/12/06.
 */
import EXIF from "exif-js";
export default function changeDirection(canvas, ctx, param, sizeParam, image, fn) {
  let orientation = null;
  console.log(param.file)
  EXIF.getData(param.file, function () {
    EXIF.getAllTags(this);
    orientation = EXIF.getTag(this, 'Orientation');
    console.log(orientation)
    switch (orientation) {
      case 1:
      case 0:
      case undefined:
        canvas.width = sizeParam.width;
        canvas.height = sizeParam.height;
        ctx.drawImage(image, 0, 0, sizeParam.width, sizeParam.height);
        break;
      case 6:
        console.log('需要顺时针（向左）90度旋转');
        rotateImg(sizeParam, image, 'left', canvas, ctx);
        break;
      case 8:
        console.log('需要顺时针（向右）90度旋转');
        rotateImg(sizeParam, image, 'right', canvas, ctx);
        break;
      case 3:
        console.log('需要180度旋转');
        rotateImg(sizeParam, image, 'right', canvas, ctx); //转两次
        rotateImg(sizeParam, image, 'right', canvas, ctx);
        break;
    }
    fn && fn();
  });
}

function rotateImg(sizeParam, img, direction, canvas, ctx) {

  let min_step = 0;
  let max_step = 3;

  if (img == null) {
    return;
  }

  let height = sizeParam.height;
  let width = sizeParam.width;

  let step = 2;
  if (step == null) {
    step = min_step;
  }
  if (direction == 'right') {
    step++;
    //旋转到原位置，即超过最大值
    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  }

  const degree = step * 90 * Math.PI / 180;
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height, width, height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height, width, height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0, width, height);
      break;
  }
}
