Function.prototype.myApply = function (context, ...args) {
  console.log('args', args)
  context = context || window
  const uniqueId = Symbol()
  context[uniqueId] = this
  const result = context[uniqueId](...args)

  delete context[uniqueId]

  return result
}

function greet(message) {
  console.log(`${message},${this.name}`)
}

const person = {
  name: 'Alice',
}

greet.apply(person, ['Apply Hello'])
greet.myApply(person, ['MyApply Hello'])
