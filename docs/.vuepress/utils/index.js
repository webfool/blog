// 二次导出
export * from './number'
export * from './browser'
export * from './position'
export * from './designPattern'

/**
 * 主文件包含常用功能：节流、防抖、去重、深拷贝、类型判断、数组扁平化
 */

/**
 * 【函数节流】：首次非立即执行
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
 * 【函数节流】：首次立即执行
 * @param {*} fn
 * @param {*} wait
 */
export function throttle2 (fn, wait) {
  let lastTime = undefined

  return function () {
    let now = new Date().getTime()
    if (lastTime && now - lastTime < wait) return
    lastTime = now
    fn.apply(this, arguments)
  }
}

/**
 * 【函数防抖】
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
 * 【数组去重】
 * @param {Array} arr 待去重数组
 * 注意：undefined === undefined  |  null === null  |  NaN !== NaN
 * indexOf 内部是通过 === 进行判断的
 */

// 方法一：（NaN 会被去重，并保留一个）
export function unique1 (arr) {
  return [...new Set(arr)]
}

// 方法二：（NaN 会被忽略）
export function unique2 (arr) {
  return arr.filter((item, index, arrry) => arrry.indexOf(item) === index)
}

/**
 * 【深拷贝】
 */

export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

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

// 【类型判断】
export function type (obj) {
  let class2type = {}
  'Object Array Function Date Error RegExp Null Undefined String Number Boolean Symbol'.split(' ').forEach(item => {
    class2type[`[object ${item}]`] = item.toLowerCase()
  })

  return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] : typeof obj
}

/**
 * 【数组扁平化】
 * {Array} arr 待扁平化数组
 * 该方法主要利用 concat的特点，参数为数组时，合并的是数组里的值
 */
export function flatten (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr
}

/**
 * 【函数柯里化】
 * @param {Function} fn
 */
export function curry (fn, ...args) {
  return fn.length <= args.length ?  fn(...args) : curry.bind(null, fn, ...args)
}

/**
 * 【偏函数】先传一部分参数，再传剩余的，支持占位符
 */
function partial (fn) {
  let args = [].slice.call(arguments, 1)

  return function () {
    let position = 0  // 填充位置
    args.forEach((arg, index) => {
      args[index] = arg === partial.PLACEHOLDER ? arguments[position++] : arg
    })

    args = args.concat([].slice.call(arguments, position))
    return fn.apply(this, args)
  }
}

partial.PLACEHOLDER = {}
export { partial }

/**
 * 【惰性函数】：判断只需一次，接下来使用方式不变时，考虑惰性函数
 * 此函数只作为该思想的一个例子
 */
export function lazyDate () {
  let date = Math.random() > 0.5 ? new Date('1995-10-11') : new Date('1995-9-13')

  lazyDate = function () {
    return date
  }

  return lazyDate()
}

/**
 * 【记忆函数】：生成一个能记忆传参和计算数据的函数
 */
export function memorize (fn) {
  let cache = {}

  return function () {
    let key = JSON.stringify([].slice.call(arguments))

    if (!cache[key]) {
      cache[key] = fn.apply(this, arguments)
    }

    return cache[key]
  }
}

/**
 * 【函数组合】：将多个函数组合成一个函数，函数从右向左执行
 */
export function compose () {
  let args = arguments
  return args.length === 1 ? function () {
    let result = args[0].apply(this, arguments)
    let i = args.length - 1
    while (i--) result = args[i].call(this, result)
    return result
  } : arg => arg
}

/**
 * 【函数组合】：ES6 写法
 * 注意：reduce 函数传参空数组报错，只有一个参数则直接返回该参数
 */
export function compose2 (...funcs) {
  if (funcs.length === 0) return arg => arg
  return funcs.reduce((f1, f2) => (...args) => f1(f2(...args)))
}

/**
 * 【数组乱序】
 */
export function shuffle (arr) {
  let i = arr.length
  while(i) {
    let j = Math.floor(Math.random() * i);
    arr[j] = [arr[i - 1], arr[i - 1] = arr[j]][0]
    i--
  }
  return arr
}

/**
 * 【排序】：支持纯数组或对象数组排序
 * @param {Object} config
 * source: 排序原数组     direction: 排序方向，asc（正序）或 desc（倒序）     property: 对象数组排序时的排序属性
 */
export function sort (config) {
  let defaultCfg = { direction: 'asc' }
  let {source, direction, property } = Object.assign({}, defaultCfg, config)

  let dir = direction.toUpperCase()
  if (dir !== 'ASC' && dir !== 'DESC') return source

  let sortArr = [...source]
  sortArr.sort(function (p1, p2) {
    let a = property ? p1[property] : p1
    let b = property ? p2[property] : p2

    if (typeof a === 'number' && typeof b === 'number') return dir === 'ASC' ? (a - b) : (b - a)
    if (typeof a === 'number' && typeof b === 'string') return dir === 'ASC' ? -1 : 1
    if (typeof a === 'string' && typeof b === 'number') return dir === 'ASC' ? 1 : -1
    return dir === 'ASC' ? a.localeCompare(b) : b.localeCompare(a)
  })

  return sortArr
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

