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
 * es6兼容性建议通过 can i use 网站查询，目前开发建议支持：chrome >= 51; firefox >= 54; edge >= 15; safari >= 10; opera >= 38
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

/**
 * 判断版本号大小
 * 本质是：从左到右，第一个不相同的值比较大小
 */
export function compareVersion(v1, v2) {
  let v1Arr = v1.split('.'), v2Arr = v2.split('.')
  let maxlen = Math.max(v1Arr.length, v2Arr.length)
  let index = 0
  // 返回值 v1 > v2: -1 || v1 = v2 : 0 || v1 < v2 : -1
  let v1ltV2 = -1, v1eqV2 = 0, v1gtV2 = 1
  while (v1Arr[index] === v2Arr[index]) {
    // 当超过数组最大长度时，代表版本号相同
    if (++index === maxlen) return v1eqV2
  }
  if (v1Arr[index] === undefined) return v1ltV2
  if (v2Arr[index] === undefined) return v1gtV2
  let version1 = parseInt(v1Arr[index])
  let version2 = parseInt(v2Arr[index])
  return (version1 > version2) ? v1gtV2 :
    (version1 < version2) ? v1ltV2 : v1eqV2
}

// 各浏览器兼容版本
const bvMap = {
  chrome: '51',
  firefox: '54',
  edge: '15',
  safari: '10',
  opera: '38'
}
/**
 * 判断浏览器以及版本号是否符合要求
 */
export function isCompatible () {
  let bAndV = getBrowserAndVersion().split(':')
  console.log('bAndV =>', bAndV)
  return !(compareVersion(bAndV[1], bvMap[bAndV[0]]) === -1)
}
