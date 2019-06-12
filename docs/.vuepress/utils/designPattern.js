/**
 * 该工具包主要是一些常用设计模式
 */

// 【装饰者模式】特点：前后绑定的函数与原函数接受相同参数，并绑定相同 this, 返回值保持不变
Function.prototype.before = function (beforeFn) {
  let _self = this
  return function () {
    beforeFn.apply(this, arguments)
    return _self.apply(this, arguments)
   }
}

Function.prototype.after = function (afterFn) {
  let _self = this
  return function () {
    let val = _self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return val
  }
}