const obj = {
  abc: 123,
  on(type, callback) {
    callback.call(this)
  },
}

function cb() {
  console.log('this', this)
}

obj.on('message', cb)
