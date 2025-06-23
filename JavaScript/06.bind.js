/**
 * * bind函数不会立即调用
 * * newFunc = func.bind(thisArg, arg1, arg2, ...)
 * * 需要存储this对象，因为要返回一个新函数
 */

Function.prototype.myBind = function (context, ...args) {
  const _this = this
  return function (...newArgs) {
    const allArgs = args.concat(newArgs)
    console.log('allArgs', allArgs)
    return _this.apply(context, allArgs)
  }
}

const person = {
  name: 'Alice',
}

function greet(message, ...args) {
  console.log(`${message}, ${args}, ${this.name}`)
}

const myBoundGreet = greet.myBind(person, 'Hello', 'Hello2')

myBoundGreet('Hello3')
