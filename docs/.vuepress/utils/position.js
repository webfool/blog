/**
 * 该工具包与获取元素位置信息相关
 */

/**
 * 兼容性获取body垂直滚动距离scrollTop
 */
export function getScrollTop () {
  let scrollTop = 0
  if (typeof window.pageYOffset === 'number') { // 除IE678外，其它浏览器都支持 pageYOffset
    scrollTop = window.pageYOffset
  } else if (document.documentElement.scrollTop) { // IE678分两种模式: quirk和非quirk，非quirk模式取 document.documentElement.scrollTop
    scrollTop = document.documentElement.scrollTop
  } else if (document.body.scrollTop) { // quirk模式取 document.body.scrollTop
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

/**
 * 获取元素相对于 body或 (position: fixed) 的祖先元素的偏移位置
 *
 * offsetParent：当前元素最近的经过定位(除 static)的元素，fixed元素的 offsetParent为 null
 * offsetLeft：左边框相对于 offsetParent左边框的距离
 * offsetTop：上边框相对于 offsetParent上边框的距离
 */
export function getEleOffset (el) {
  let offsetLeft = el.offsetLeft
  let offsetTop = el.offsetTop

  let currentEl = el
  while(currentEl.offsetParent) {
    offsetLeft += currentEl.offsetParent.offsetLeft
    offsetTop += currentEl.offsetParent.offsetTop
    currentEl = currentEl.offsetParent
  }

  return {offsetLeft, offsetTop}
}