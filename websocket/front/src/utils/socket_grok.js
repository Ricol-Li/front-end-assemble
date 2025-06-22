class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url
    this.options = {
      reconnectInterval: 3000, // 重连间隔时间（毫秒）
      maxReconnectAttempts: 5, // 最大重连次数
      heartbeatInterval: 30000, // 心跳间隔时间（毫秒）
      ...options,
    }

    this.ws = null
    this.reconnectAttempts = 0
    this.isConnected = false
    this.heartbeatTimer = null
    this.messageCallbacks = new Map()
    this.eventListeners = new Map()
  }

  // 初始化连接
  connect() {
    if (this.isConnected) return

    try {
      this.ws = new WebSocket(this.url)
      this._setupEventListeners()
    } catch (error) {
      console.error('WebSocket初始化失败:', error)
      this._reconnect()
    }
  }

  // 设置事件监听
  _setupEventListeners() {
    this.ws.onopen = () => {
      console.log('WebSocket连接已建立')
      this.isConnected = true
      this.reconnectAttempts = 0
      this._startHeartbeat()
      this._emit('open')
    }

    this.ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data)
        this._handleMessage(data)
      } catch (error) {
        console.error('消息解析失败:', error)
        this._emit('message', event.data)
      }
    }

    this.ws.onclose = event => {
      console.log('WebSocket连接已关闭:', event)
      this.isConnected = false
      this._stopHeartbeat()
      this._emit('close', event)
      this._reconnect()
    }

    this.ws.onerror = error => {
      console.error('WebSocket发生错误:', error)
      this._emit('error', error)
    }
  }

  // 处理接收到的消息
  _handleMessage(data) {
    if (data.type && this.messageCallbacks.has(data.type)) {
      this.messageCallbacks.get(data.type)(data)
    }
    this._emit('message', data)
  }

  // 发送消息
  send(data) {
    if (!this.isConnected || this.ws.readyState !== WebSocket.OPEN) {
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

  // 注册消息类型回调
  onMessageType(type, callback) {
    this.messageCallbacks.set(type, callback)
  }

  // 移除消息类型回调
  offMessageType(type) {
    this.messageCallbacks.delete(type)
  }

  // 注册事件监听
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set())
    }
    this.eventListeners.get(event).add(callback)
  }

  // 移除事件监听
  off(event, callback) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).delete(callback)
    }
  }

  // 触发事件
  _emit(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => callback(data))
    }
  }

  // 开始心跳
  _startHeartbeat() {
    this._stopHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'heartbeat', data: 'ping' })
    }, this.options.heartbeatInterval)
  }

  // 停止心跳
  _stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // 重连逻辑
  _reconnect() {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      console.error('达到最大重连次数，停止重连')
      this._emit('reconnectFailed')
      return
    }

    this.reconnectAttempts++
    console.log(`第${this.reconnectAttempts}次重连尝试...`)

    setTimeout(() => {
      this.connect()
    }, this.options.reconnectInterval)
  }

  // 关闭连接
  close() {
    this._stopHeartbeat()
    this.isConnected = false
    this.reconnectAttempts = this.options.maxReconnectAttempts

    if (this.ws) {
      this.ws.close()
    }
  }

  // 获取连接状态
  getStatus() {
    return {
      isConnected: this.isConnected,
      readyState: this.ws ? this.ws.readyState : WebSocket.CLOSED,
      reconnectAttempts: this.reconnectAttempts,
    }
  }
}

// 使用示例
/*
const wsClient = new WebSocketClient('ws://example.com', {
    reconnectInterval: 5000,
    maxReconnectAttempts: 10
});

// 注册事件
wsClient.on('open', () => console.log('连接成功'));
wsClient.on('message', data => console.log('收到消息:', data));
wsClient.on('close', () => console.log('连接关闭'));
wsClient.on('error', error => console.log('发生错误:', error));

// 注册特定消息类型回调
wsClient.onMessageType('chat', data => {
    console.log('收到聊天消息:', data);
});

// 发送消息
wsClient.send({
    type: 'chat',
    content: 'Hello, WebSocket!'
});

// 连接
wsClient.connect();
*/

export default WebSocketClient
