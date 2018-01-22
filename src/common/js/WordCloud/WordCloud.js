/**
 * @Desc：文字云
 * @Usage:
 * @Notify：为了美观考虑，高度最好小于宽度，毕竟文字是横向排列的。
 * @Depend：
 *
 * 配置示例：
 * #canvas{
      width: 100%;
      height: 800px;
      background-color: rgb(240, 240, 240);
      position: relative;
    }

 <div id="canvas"></div>
 <canvas id="data"></canvas>
 * Created by YangYuxi on 2017/8/21.
 */


export default class WordCloud {
  constructor(param){
    this.param=param;
    this.start();
  }
  //开始
  start() {
    let tagCanvas = document.getElementById('canvas');
    let center = this.getCenterPoint(tagCanvas);
    let cellSpace = 20;
    let maxRadius = this.param.getMaxRadius(tagCanvas, cellSpace);
    let data = ["格罗姆·地狱咆哮", "伊利丹·怒风", "陈·风暴烈酒", "泰兰德·语风", "沃金", "沃金", "沃金", "沃金", "沃金", "沃金", "沃金", "沃金", "沃金"];
    let drawArray = [];
    let tempDrawPositionArray = [];
    for ( j = 0; j < data.length / 2; j++) {
      let data1 = [];
      data1[j] = data[j];
    }
    for ( z = 0; z < data.length / 2; z++) {
      let data2 = [];
      data2[z] = data[z + data.length / 2]
    }
    for ( i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let textInfo = this.getTextInfo(dataItem);
      let drawPosition = null;
      if (i != 0) {
        drawPosition = (textInfo, maxRadius, center, cellSpace, drawArray);
      }
      else {
        //canvas中心文字样式以及定位
        textInfo = this.getTextInfo(dataItem, {fontSize: 60});
        drawPosition = this.getDrawPosition(
          textInfo,
          maxRadius,
          [center[0] - (textInfo.width / 2), center[1] - (textInfo.height / 2)],
          cellSpace,
          drawArray
        );
      }
      if (drawPosition) {
        tempDrawPositionArray.push([drawPosition, textInfo, tagCanvas]);
      }
    }
    let timer = setInterval(function () {
      let textItem = tempDrawPositionArray.shift();
      if (textItem) {
        this.drawText(textItem[0], textItem[1], textItem[2]);
      }
      else {
        clearInterval(timer);
      }
    }, 0);
  }
    //获取中心店坐标
    getCenterPoint(DOMElement)
    {
      let rect = DOMElement.getBoundingClientRect();
      let rectTop = rect.top;
      let rectLeft = rect.left;
      let ngx = Math.ceil(rectLeft + rect.width);
      let ngy = Math.ceil(rectTop + rect.height);
      let center = [(ngx / 2) + rectLeft, (ngy / 2) + rectTop];
      return center;
    }
    //获取最大半径
    getMaxRadius(DOMElement, cellSpace)
    {
      let cellSpace = cellSpace || 1;
      let rect = DOMElement.getBoundingClientRect();
      let ngx = Math.ceil(rect.width / cellSpace);
      let ngy = Math.ceil(rect.height / cellSpace);
      let maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));
      return maxRadius;
    }
    //获取圆上每个点坐标
    getPointsAtRadius(radius, center, offsetY, multiple)
    {
      let T = radius * 8;
      let t = T;
      let points = [];
      let offsetY = offsetY || 5;
      let multiple = multiple || 30;

      if (radius === 0) {
        points.push([center[0], center[1]]);
      }
      while (t) {
        points.push(
          [
            center[0] + (radius * multiple) * Math.cos((t * 2 * Math.PI) / T),
            center[1] + (radius * multiple) * Math.sin((t * 2 * Math.PI) / T) * offsetY,
          ]
        );
        t = t - 1;
      }
      return points;
    }
    //获取文本的宽和高
    getTextInfo(word, userCSS)
    {
      let fontSize = this.getRandomFontSize();
      if (userCSS) {
        fontSize = userCSS.fontSize;
      }
      // 通过canvas的API来获取文本的各种信息
      let fcanvas = document.createElement('canvas');
      let fctx = fcanvas.getContext('2d');
      fctx.font = 'normal ' + fontSize + 'px PingFangSC-Medium';
      // 通过canvas的measureText方法获取文本 像素级别的宽度
      let fw = fctx.measureText(word).width;
      // 通过字体大小获取高度
      let fh = fontSize;
      return {
        width: Math.ceil(fw),
        height: fh,
        word: word,
        fontSize: fontSize
      }
    }
    //判断两个矩形是否相交
    isCorssRect(array1, array2)
    {
      let Xa1 = array1[0][0];
      let Ya1 = array1[0][1];
      let Xa2 = array1[1][0];
      let Ya2 = array1[1][1];

      let Xb1 = array2[0][0];
      let Yb1 = array2[0][1];
      let Xb2 = array2[1][0];
      let Yb2 = array2[1][1];

      let Xc1 = Math.max(Xa1, Xb1);
      let Yc1 = Math.max(Ya1, Yb1);
      let Xc2 = Math.min(Xa2, Xb2);
      let Yc2 = Math.min(Ya2, Yb2);

      return (Xc1 <= Xc2 && Yc1 <= Yc2);
    }
    // 获取随机文字的透明度
    getRandomOpacity()
    {
      let arr = [0.5, 0.15, 0.19, 0.28, 0.3];
      let res = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        let j = Math.floor(Math.random() * arr.length);
        res[i] = arr[j];
        arr.splice(j, 1);
      }
      return res[0];
    }
    //获取随机文字大小
    getRandomFontSize()
    {
      let arr = [40, 45, 56, 60];
      let res = [];
      for ( i = 0, len = arr.length; i < len; i++) {
        let j = Math.floor(Math.random() * arr.length);
        res[i] = arr[j];
        arr.splice(j, 1);
      }
      return res[0];
    }
    // fuck the word
    drawText(position, textInfo, canvas)
    {
      let span = document.createElement('span');
      let styleRules = {
        'position': 'absolute',
        'display': 'block',
        'font': 'normal' + ' ' + textInfo.fontSize + 'px ' + 'PingFangSC-Medium',
        'left': position[0] + 'px',
        'top': position[1] + 'px',
        'width': textInfo.width + 'px',
        'height': textInfo.height + 'px',
        'lineHeight': 1,
        'opacity': this.getRandomOpacity(),
      };
      span.textContent = textInfo.word;
      for ( cssProp in styleRules) {
        span.style[cssProp] = styleRules[cssProp];
      }
      canvas.appendChild(span);
    }
    // 获取文本的左上右下坐标，
    getTopLeft(topLeft, textInfo)
    {
      let left1 = topLeft[0];
      let top1 = topLeft[1];
      return [
        [left1, top1],
        [left1 + textInfo[0], top1 + textInfo[1]]
      ];
    }
    // 获取可安置的坐标
    getDrawPosition(textInfo, maxRadius, center, cellSpace, drawArray)
    {
      let textInfo_width = textInfo.width + 30;
      let textInfo_height = textInfo.height + 10;
      let cellSpace = cellSpace || 10;
      for ( i = 0; i < maxRadius; i++) {
        let points = this.getPointsAtRadius(i, center, 0.64, cellSpace);
        pointsLoop:
          for ( j = 0; j < points.length; j++) {
            let topLeft = this.getTopLeft(points[j], [textInfo_width, textInfo_height]);
            // 是否和已存的文字碰撞
            for ( z = 0; z < drawArray.length; z++) {
              if (this.isCorssRect(topLeft, drawArray[z])) {
                continue pointsLoop;
              }

            }
            drawArray.push(topLeft);
            return points[j];
          }
      }
      return null;
    }
}

