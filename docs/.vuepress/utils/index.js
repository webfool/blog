/**
 * 函数节流
 * @param {待预约函数} fn
 * @param {预约时间} wait
 */
export function throttle (fn, wait) {
  let timeout
  return function () {
    if (timeout) return
    let args = arguments
    timeout = setTimeout(() => {
      fn.apply(this, args)
      timeout = null
    }, wait)
  }
}

/**
 * 函数防抖
 * @param {待预约函数} fn
 * @param {预约时间} wait
 */
export function debounce (fn, wait) {
  let timer
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 兼容性获取body直接子元素的scrollTop
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