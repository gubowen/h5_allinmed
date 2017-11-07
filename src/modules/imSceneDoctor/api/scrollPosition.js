/**
 * @Desc：滑动位置定位
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/9/29.
 */
export default function scrollPosition(element) {
  const ele = element[element.length - 1],
    topHeight = ele.$el.offsetTop;
  document.documentElement.scrollTop = topHeight;

}
