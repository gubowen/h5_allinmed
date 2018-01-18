/**
 * @Desc：判断手指滑动方向
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 2018/1/18.
 */
export default class TouchmoveDirection {
  constructor(fn) {
    this.startx = 0;
    this.starty = 0;
    this.touchScreen();
    this.leaveScreen(fn);
  }

  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }

  getDirection(startx, starty, endx, endy) {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    const angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }

    return result;
  }

  touchScreen() {
    document.addEventListener("touchstart", (e) => {
      this.startx = e.touches[0].pageX;
      this.starty = e.touches[0].pageY;
    }, false);
  }

  leaveScreen(fn) {
    document.addEventListener("touchmove", (e) => {
      let endx = e.changedTouches[0].pageX;
      let endy = e.changedTouches[0].pageY;
      const direction = this.getDirection(this.startx, this.starty, endx, endy);
      switch (direction) {
        case 0:
          fn(0);
          break;
        case 1:
          fn("up");
          break;
        case 2:
          fn("down");
          break;
        case 3:
          fn("left");
          break;
        case 4:
          fn("right");
          break;
        default:
      }
    }, false);
  }
}
