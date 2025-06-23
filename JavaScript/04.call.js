/**
 * * call 实现
 *
 */
Function.prototype.myCall = function (context, ...args) {
  context = context || window

  const uniqueId = Symbol()
}
