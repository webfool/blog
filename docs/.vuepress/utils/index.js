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

/**
 * 获取浏览器类型以及版本号
 * 经测试：ie11以下(不包括11)均不支持es6语法，所以需要采用普通语法
 * 目前开发建议支持：chrome >= 50;  firefox ; edge; safari >= 12;
 * 函数返回值为 {浏览器}:{版本号}
 */
export function getBrowserAndVersion () {
  var ug = window.navigator.userAgent.toLowerCase()
  var browser = {}
  var s
  (s = ug.match(/rv:([\d\.]+)\) like gecko/)) ? browser.ie = s[1] :
  (s = ug.match(/msie ([\d\.]+)/)) ? browser.ie = s[1] :
  (s = ug.match(/edge\/([\d\.]+)/)) ? browser.edge = s[1] :
  (s = ug.match(/firefox\/([\d\.]+)/)) ? browser.firefox = s[1] :
  (s = ug.match(/(?:opera|opr).([\d\.]+)/)) ? browser.opera = s[1] :
  (s = ug.match(/chrome\/([\d\.]+)/)) ? browser.chrome = s[1] :
  (s = ug.match(/version\/([\d\.]+).*safari/)) ? browser.safari = s[1] : 0

  var bAndV = ''
  for (var key in browser) {
    bAndV += key + ':' + browser[key]
  }
  return bAndV
}