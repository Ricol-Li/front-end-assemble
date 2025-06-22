export default class Socket {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
  }

  ModeCode = {
    MSG: 'message',
    HEART_BEAT: 'heart_beat',
  }

  ws = null

  webSocketState = false // websocket连接状态

  heartBeat = {
    time: 5 * 1000, // 心跳检查间隔时间
    timeout: 3 * 1000, // 心跳超时间隔时间
    reconnect: 10 * 1000, // 断线重连时间
    maxReconnectTimes: 3, // 断线重连最大次数
  }
  reconnectTimes = 0 // 断线重连次数
  reconnectTimer = null // 断线重连时间器

  connectWebSocket() {
    this.ws = new WebSocket(this.wsUrl)
    this.init()
  }

  init() {
    this.ws.addEventListener('open', () => {
      // 链接状态设置为 True
      this.webSocketState = true
      this.reconnectTimes = 0
      // 启动心跳检测
      this.heartBeat && this.heartBeat.time
        ? this.startHeartBeat(this.heartBeat.time)
        : ''
      console.log('连接成功，并开启心跳检查')
    })

    this.ws.addEventListener('message', e => {
      const data = JSON.parse(e.data)
      switch (data.ModeCode) {
        case this.ModeCode.MSG:
          console.log('服务端响应普通消息', data)
          break
        case this.ModeCode.HEART_BEAT:
          this.webSocketState = true
          console.log('服务端响应心跳检查', data)
          break
      }
    })

    this.ws.addEventListener('close', () => {
      this.webSocketState = false
      console.log('断开了链接')
    })

    this.ws.addEventListener('error', e => {
      this.webSocketState = false
      this.reconnectWebSocket() // 重连
      console.log('链接错误', e)
    })
  }
  send(data) {
    if (!this.webSocketState || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket未连接，无法发送消息')
      return false
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      this.ws.send(message)
      return true
    } catch (error) {
      console.error('消息发送失败:', error)
      return false
    }
  }

  startHeartBeat(time = this.heartBeat.time) {
    this.heartBeatTimer = setTimeout(() => {
      this.send(
        JSON.stringify({
          ModeCode: this.ModeCode.HEART_BEAT,
          msg: new Date(),
        })
      )
      // 延时等待服务端响应，判断是否连线成功
      this.waitingServer()
    }, time)
  }

  // 延时等待服务端响应
  waitingServer() {
    this.webSocketState = false
    setTimeout(() => {
      if (this.webSocketState) {
        this.startHeartBeat(this.heartBeat.time)
        return
      }
      console.log('心跳无响应，已经断线，连接次数：', this.reconnectTimes)
      try {
        this.ws.close()
      } catch (e) {
        console.log('链接已经关闭')
      }
      this.reconnectWebSocket()
    }, this.heartBeat.timeout)
  }

  reconnectWebSocket() {
    if (this.reconnectTimes >= this.heartBeat.maxReconnectTimes) {
      console.log('重连次数已达上限，停止重连')
      clearInterval(this.heartBeat.timer)
      return
    }
    this.reconnectTimes++
    this.reconnectTimer = setTimeout(() => {
      this.reconnectWs()
    }, this.heartBeat.reconnect)
  }

  reconnectWs() {
    if (!this.ws) {
      // 第一次执行初始化
      this.connectWebSocket()
    }
    // 防止多个 websocket 同时执行
    if (this.ws && this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.ws = null
      this.reconnectWebSocket()
    }
  }
}
