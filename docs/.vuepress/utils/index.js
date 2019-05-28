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
  // 返回值 （v1 > v2）: 1 || （v1 = v2） : 0 || （v1 < v2） : -1
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

// 各浏览器兼容最小版本
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

export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

/**
 * 深拷贝
 */
export function deepClone (obj, hash = new WeakMap()) {
  if (!isObject(obj) && !isArray(obj)) return obj
  if (hash.has(obj)) return hash.get(obj)

  let deepObj = Array.isArray(obj) ? [] : {}
  hash.set(obj, deepObj)

  for (let key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    if (isObject(obj[key]) || isArray(obj[key])) {
      deepObj[key] = deepClone(obj[key], hash)
    } else {
      deepObj[key] = obj[key]
    }
  }
  return deepObj
}

// 类型判断
export function type (obj) {
  let class2type = {}
  'Object Array Function Date Error RegExp Null Undefined String Number Boolean Symbol'.split(' ').forEach(item => {
    class2type[`[object ${item}]`] = item.toLowerCase()
  })

  return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] : typeof obj
}

/**
 * 参数格式化为数字：
 *  数字保持不变、纯数字字符串转数字、其它按0处理
 */ 
export function format2Num (val) {
  let valType = type(val)
  if (valType === 'number') return val
  if (valType === 'string' && !Number.isNaN(Number(val))) return Number(val)
  return 0
}


export function getFullNum(num){
  //处理非数字
  if(isNaN(num)){return num};
  
  //处理不需要转换的数字
  var str = ''+num;
  if(!/e/i.test(str)){return num;};
  
  return (num).toFixed(18).replace(/\.?0+$/, "");
}
/**
 * 
 * @param {number} val 需要保留的位数，接受数值或纯数值字符串,且数值范围为 0 ~ 17
 */
export function toFixed (val) {
  let valType = type(val)
  if (!(valType === 'number' || valType === 'string' && !Number.isNaN(Number(val)))) throw new Error('保留位数必须为数值或纯数值字符串!')
  if (!Number.isInteger(Number(val))) throw new Error('保留位数必须是整数!')
  if (Number(val) < 0 || Number(val) > 17) throw new Error('保留位数范围应为 0 ~ 17!')

  let digit = Number(val)
  let dicmalNum = toDicimal(this) // 将指数数值转为小数处理

  
}

// 将数值转为定点表示法
export function toDicimal (num) {
  if (!/e/.test(num)) return num

  // 开始对指数数值进行转化
  let numSplit = num.toString().split('e')
  let [float, exponent] = numSplit
  let sign = float.indexOf('-') !== -1 ? '-' : ''  // 确定符号
  float = float.replace(/-/, '')  // 将负号清除
  let [integer, dicimal] = float.split('.')
  let exp_num = Number(exponent)

  // 指数小于0
  if (exp_num < 0) {
    if (integer.length > Number(exponent.slice(1))) {
      return sign + integer.slice(0, exp_num) + '.' + integer.slice(exp_num) + (dicimal || '')
    } else {
      return sign + '0.' + integer.padStart(-exp_num, '0') + (dicimal || '')
    }
  }

  // 指数大于等于0
  else {
    dicimal = dicimal || ''
    if (dicimal.length > exp_num) {
      return sign + integer + dicimal.slice(0, exp_num) + '.' + dicimal.slice(exp_num)
    } else {
      return sign + integer + dicimal.padEnd(exp_num, '0')
    }
  }
}

/**
 * ArrayBuffer 转字符串
 * 注：js 中用两个字节表示一个字符，默认采用的是utf-16编码
 */
export function ab2Str (buf) {
  // < 512个字符，可以用fromCharCode直接转
  if (buf && buf.byteLength < 1024) {
    return String.fromCharCode.apply(null, new Uint16Array(buf))  // 此处注意用apply，因为fromCharCode接受单个或多个unicode编码
  }

  // >= 512个字符，建议一个个转换
  let bufView = new Uint16Array(buf)
  let strArr = bufView.map(code => String.fromCharCode(code))
  return strArr.join('')
}

/**
 * 字符串转 ArrayBuffer
 */
export function str2ab (str) {
  let codeArr = str.split('').map(char => char.charCodeAt(0))
  let bufView = new Uint16Array(codeArr)
  return bufView.buffer
}