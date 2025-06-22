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
  ws.send('欢迎链接到 Websocket服务器')
  // 接收客户端发送的消息
  ws.on('message', messageHandler)

  // 监听客户端出错
  ws.on('error', errorHandler)

  // 监听客户端关闭
  ws.on('close', closeHandler)
}

function messageHandler(data) {
  // const parseData = JSON.parse(data)
  const message = Buffer.isBuffer(data) ? data.toString() : data
  console.log('收到客户端的消息：', message)
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
