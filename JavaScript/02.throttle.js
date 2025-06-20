function throttle(fn, delay) {
  let timer
  return (...args) => {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

function abc() {
  console.log('abc')
}

const abc1 = throttle(abc, 100)
