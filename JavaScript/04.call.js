/**
 * * call 实现
 *
 */
Function.prototype.myCall = function (context, ...args) {
  context = context || window
  // 设置唯一key
  const uniqueId = Symbol()
  //
  context[uniqueId] = this
  const result = context[uniqueId](...args)
  delete context[uniqueId]
  return result
}

function greet(...args) {
  console.log(`${args},${this.name}`)
}

const person = {
  name: 'Alice',
}

greet.call(person, 'Call Hello', 'Call Hello2')

greet.myCall(person, 'MyCall Hello', 'MyCall Hello2')
