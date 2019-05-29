/**
 * 该工具包与数值运算相关
 */



// 判断数值是否是数值或纯数值字符串
export function isPureNumber (num) {
  let isNaN = Number.isNaN
  if (isNaN(parseFloat(num)) || isNaN(Number(num))) {
    return false
  }
  return true
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
 *
 * @param {number} val 需要保留的位数，接受数值或纯数值字符串,且数值范围为 0 ~ 17
 */
function toFixed2 (val) {
  let valType = type(val)
  if (!(valType === 'number' || valType === 'string' && !Number.isNaN(Number(val)))) throw new Error('保留位数必须为数值或纯数值字符串!')
  if (!Number.isInteger(Number(val))) throw new Error('保留位数必须是整数!')
  if (Number(val) < 0 || Number(val) > 17) throw new Error('保留位数范围应为 0 ~ 17!')

  let digit = Number(val)
  let floatNum = toDicimal(this + '') // 将指数数值转为小数处理
  let [integer, dicimal = ''] = floatNum.split('.')
  if (dicimal.length <= digit) {
    // 保留位数大于小数位数，后面补0
    return integer + (digit === 0 ? '' : '.') + dicimal.padEnd(digit, '0')
  } else {
    // 保留位数小于小数位数，四舍五入

    // 保留0位小数时
    let next = dicimal.substr(digit, 1)
    let carryValue = Number(next) >= 5 ? 1 : 0
    if (digit === 0) {
      return Number(integer) + carryValue
    }

    // 非保留0位小数
    let before = dicimal.substr(0, digit)
    let carriedNum = Number(before) + carryValue
    return integer + '.' + carriedNum
  }
}

Number.prototype.toFixed2 = toFixed2

