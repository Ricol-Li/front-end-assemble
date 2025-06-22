const express = require('express')
const app = express()

// 引入 ws 模块
const WebSocket = require('ws').Server
const prot = 3001

// 创建一个服务
const server = new WebSocket(
  {
    port: prot,
  },
  () => {
    console.log('服务启动成功')
  }
)

function connectionHandler(ws) {
  console.log('有新的连接')
  ws.send(
    JSON.stringify({
      ModeCode: 'message',
      message: '欢迎链接到 Websocket服务器',
    })
  )
  // 接收客户端发送的消息
  ws.on('message', messageHandler)

  // 监听客户端出错
  ws.on('error', errorHandler)

  // 监听客户端关闭
  ws.on('close', closeHandler)
}

function messageHandler(data) {
  const parseData = JSON.parse(data.toString())
  console.log('收到客户端的消息：', parseData)

  // 服务端心跳检查
  const { ModeCode } = parseData
  switch (ModeCode) {
    case 'message':
      console.log('收到普通的消息', parseData)
      break
    // 收到的是心跳检查的消息，再回传给客户端
    case 'heart_beat':
      console.log('收到心跳检查，并返回客户端数据，保证连接正常')
      this.send(JSON.stringify(parseData))
      break
  }
}
function sendMessage(ws, message) {
  if (ws.readyState === ws.OPEN) {
    ws.send(message)
  }
}
function errorHandler(err) {
  console.log('服务端出错：', err)
}

function closeHandler() {
  console.log('服务端关闭')
}

server.on('connection', connectionHandler)
