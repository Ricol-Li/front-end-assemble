function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

function abc() {
  console.log('abc')
}
const abc1 = debounce(abc, 100)

abc1()
abc1()
abc1()
abc1()
abc1()
