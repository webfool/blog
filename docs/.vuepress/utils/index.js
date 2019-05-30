// 二次导出
export * from './number'
export * from './browser'
export * from './position'

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

