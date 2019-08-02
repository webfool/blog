/**
 * 该工具包模拟一些原生方法的实现
 */

 /**
  * 【call】模拟实现
  */
 Function.prototype.call2 = function (context) {
   context = context || window
   context.fn = this
   let result = context.fn(...[...arguments].slice(1))
   delete context.fn
   return result
 }

 /**
  * 【apply】模拟实现
  */
 Function.prototype.apply2 = function (context) {
   context = context || window
   context.fn = this
   let args = arguments[1] || []
   let result = context.fn(...args)
   delete context.fn
   return result
 }

 /**
  * 【bind】模拟实现，功能：
  * 执行：先绑定 this指向和部分参数，再给返回函数传剩余参数
  * new实例：先绑定部分参数，再 new 返回函数，并传剩余值
  */
 Function.prototype.bind2 = function (context) {
  let self = this
  let args = [...arguments].slice(1)

  let fn =  function () {
    let bindArgs = args.concat(Array.prototype.slice.call(arguments))
    return self.apply(this instanceof fn ? this : context, bindArgs)
  }

  // 原型式继承
  function MidFn () {}
  MidFn.prototype = this.prototype
  fn.prototype = new MidFn()
  // 也可以采用如下方式：
  // fn.prototype = Object.create(this.prototype)

  return fn
}

export function newObj () {
  let Constructor = [].shift.call(arguments)
  let obj = Object.create(Constructor.prototype)
  let result = Constructor.apply(obj, arguments)
  let type = typeof result
  return ((type === 'object' && result !== null) || type === 'function') ? result : obj
}