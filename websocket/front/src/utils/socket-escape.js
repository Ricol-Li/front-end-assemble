/**
 * * 未封装的客户端 websocket 链接
 *
 */

// 1. 实例化
let ws = new WebSocket('http://localhost:3001')
// 2.open
ws.onopen = function () {
  console.log('连接成功')

  // 客户端给服务端发送数据

  send({ ModeCode: 'message', message: 'hello world' })
}

function send(message) {
  ws.send(JSON.stringify(message))
}
// 3.message
ws.onmessage = function (e) {
  // 服务端给客户端发送的数据
  console.log('服务端给客户端发送的数据', e.data)
}
// 4.close
ws.onclose = function () {
  console.log('连接关闭')
}
// 5.error
ws.onerror = function () {
  console.log('连接错误')
}
